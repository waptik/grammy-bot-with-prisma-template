import { GrammyContext, GrammyConversation } from "~grammy/context.ts";
import { Composer, createConversation } from "~grammy/deps.ts";
import { handleErrorMessage } from "~grammy/helpers/handleErrors.ts";

async function askForName(convo: GrammyConversation, ctx: GrammyContext) {
    try {
        await ctx.reply("What's your full name?");
        const name = await convo.form.text();

        await ctx.reply(`Your full name is: <b>${name}</b>`);
    } catch (e) {
        const message = handleErrorMessage(e);
        await ctx.reply(message);
    }
}

const demoConversation = new Composer<GrammyContext>();

demoConversation.use(createConversation(askForName));

export default demoConversation;
