import { grammy } from '../bot.ts';
import { GrammyContext } from '../context.ts';

export async function deleteMessageSafe(ctx: GrammyContext) {
	try {
		await ctx.deleteMessage();
	} catch (err) {
		// report(err, deleteMessageSafe.name);
	}
}

export async function deleteMessageSafeWithBot(
	chatId: number,
	messageId: number,
) {
	try {
		await grammy.api.deleteMessage(chatId, messageId);
	} catch (err) {
		// report(err, deleteMessageSafeWithBot.name);
	}
}
