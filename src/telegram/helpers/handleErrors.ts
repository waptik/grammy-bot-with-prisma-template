import { getErrorFromUnknown } from '@utils/errors.ts';

export function handleErrorMessage(e: Error) {
	const error = getErrorFromUnknown(e);

	const hasReply = error.message.startsWith('reply:');
	const message = hasReply
		? error.message.replace('reply:', '')
		: `⛔ An error occurred⛔ : \n<b>${error.name}</b> - <b>${error.message}</b>. \nPlease try again later.
		`;
	return message;
}
