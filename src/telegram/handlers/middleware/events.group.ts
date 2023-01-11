import { getErrorFromUnknown } from "@utils/errors.ts";
import { getFullName } from "@utils/grammy.ts";
import { GrammyContext } from "~grammy/context.ts";
import { Composer } from "~grammy/deps.ts";
import { handleNewChatMemberMessage } from "~grammy/helpers/handleNewChatMembers.ts";
import { deleteMessageSafe } from "~grammy/helpers/deleteMessageSafe.ts";

const composer = new Composer<GrammyContext>();

const groupEvents = composer.filter((ctx) => ctx.hasChatType(["group", "supergroup"]));

// events for bot in group
groupEvents.on("my_chat_member", async (ctx, next) => {
    // get status of the bot, switch between status and log the message
    const status = ctx.myChatMember.new_chat_member.status;

    console.log({ from: ctx.from, status });

    switch (status) {
        case "left":
        case "kicked":
            await ctx.reply(
                `I have been removed from the group. Please add me back to the group to continue using the bot.`,
            );

            break;

        case "member":
            await ctx.api.sendMessage(
                ctx.chat.id,
                `Thanks for adding me to the group. Please make me an admin to continue using me.`,
            );
            break;

        case "administrator":
            await ctx.api.sendMessage(
                ctx.chat.id,
                `Yay! I am an admin now. Please connect me to a company to continue using me.\n If you have a valid connection code, send /connect [code] to get started.\nOr, send /get_code as a private message to generate a new connection code`,
            );
            break;

        default:
            console.log(`Unknown status: ${status}`);

            break;
    }

    return next();
});

groupEvents.on(":new_chat_members", handleNewChatMemberMessage);

groupEvents.on("chat_member", async (ctx, next) => {
    const newUser = ctx.update.chat_member.new_chat_member.user;

    const status = ctx.chatMember.new_chat_member.status;

    const DELETE_STATUS = ["left"];

    if (![...DELETE_STATUS, "member"].includes(status)) {
        return;
    }

    if (DELETE_STATUS.includes(status)) {
        await ctx.api.sendMessage(ctx.chat.id, `See ya, ${newUser.first_name}!`);
        return next();
    }

    await ctx.reply(`Welcome ${getFullName(newUser)}`);
    return next();
});

// delete left message
groupEvents.on(":left_chat_member", (ctx, next) => {
    try {
        deleteMessageSafe(ctx);
        return;
    } catch (e) {
        const error = getErrorFromUnknown(e);
        console.log("Failed to delete message");
    }
    return next();
});

export default groupEvents;
