import { GrammyContext } from "~grammy/context.ts";
import { Menu } from "menu";

export const demoConversationMenu = new Menu<GrammyContext>("demo-conversation-menu").text("Continue", async (ctx) => {
    await ctx.replyWithChatAction("typing");

    await ctx.conversation.enter("askForName");
});
