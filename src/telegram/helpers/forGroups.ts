import { GrammyContext } from "~grammy/context.ts";
import { NextFunction } from "~grammy/deps.ts";

// a function to check if the user is an admin or the creator of the group
export const isAdmin = async (context: GrammyContext, who: "maker" | "admin" | "admins" = "admins") => {
    const chatMember = await context.getChatMember(context.from?.id as number);
    const users: typeof chatMember.status[] = [];

    switch (who) {
        case "admin":
            users.push("administrator");
            break;

        case "maker":
            users.push("creator");
            break;

        default:
            users.push("administrator", "creator");
            break;
    }

    return users.includes(chatMember.status);
};

export const isGroup = (context: GrammyContext) => {
    return context.hasChatType(["group", "supergroup"]);
};
export const isPrivate = (context: GrammyContext) => {
    return context.hasChatType("private");
};

// an exported function to notify the user that they are not an admin of the group
// after checking their role in the group
export const notifyNotAdmin = async (context: GrammyContext, next?: NextFunction) => {
    const isUserAdmin = await isAdmin(context);
    if (!isUserAdmin) {
        await context.reply(`You are not an admin of this group. Only admins can use this command.`);
        return;
    }

    if (next) await next();
};

// an exported function to notify the user that they are not an admin of the group
// after checking their role as creator in the group
export const notifyNotCreator = async (context: GrammyContext, next?: NextFunction) => {
    const isUserAdmin = await isAdmin(context, "maker");
    if (!isUserAdmin) {
        await context.reply(`You are not the creator of this group. Only the Creator can use this command.`);
        return;
    }

    if (next) await next();
};
