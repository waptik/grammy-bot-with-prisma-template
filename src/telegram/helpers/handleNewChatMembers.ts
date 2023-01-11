import { grammy } from '../bot.ts';
import { GrammyContext } from '../context.ts';
import { deleteMessageSafe } from './deleteMessageSafe.ts';

export function handleNewChatMemberMessage(ctx: GrammyContext) {
	if ('message' in ctx) {
		if (ctx.message?.new_chat_members) {
			// Send help message if added this bot to the group
			const addedUsernames = ctx.message.new_chat_members
				.map((member) => member.username)
				.filter((username) => !!username);

			if (addedUsernames.includes(grammy.botInfo.username)) {
				return;
			}
			// Check if needs to delete message right away
			deleteMessageSafe(ctx);
			return;
		}
	}
}
