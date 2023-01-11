import { Composer } from "grammy";
import { GrammyContext } from "~grammy/context.ts";
import { demoConversationMenu } from "~grammy/handlers/menu/demo-conversation.ts";
import { handleErrorMessage } from "~grammy/helpers/handleErrors.ts";

const convoCommands = new Composer<GrammyContext>();

convoCommands.command("convo", async (ctx) => {
    try {
        await ctx.replyWithChatAction("typing");

        await ctx.reply(
            `<b>Demo conversation</b>.
			\nYou are about to start a demo conversation.`,
            {
                disable_web_page_preview: true,
                reply_markup: demoConversationMenu,
            },
        );
    } catch (e) {
        const msg = handleErrorMessage(e);
        await ctx.reply(msg);
    }
});

export default convoCommands;
