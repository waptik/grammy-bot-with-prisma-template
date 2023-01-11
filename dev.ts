#!/usr/bin/env -S deno run -A --allow-write --watch=routes/,main.ts

import '$std/dotenv/load.ts';
import { green } from '$std/fmt/colors.ts';

import { error } from '@utils/error.ts';
import { gte } from './deps.ts';
import { grammy } from './src/telegram/bot.ts';

const MIN_DENO_VERSION = '1.25.0';

export function ensureMinDenoVersion() {
	// Check that the minimum supported Deno version is being used.
	if (!gte(Deno.version.deno, MIN_DENO_VERSION)) {
		let message =
			`Deno version ${MIN_DENO_VERSION} or higher is required. Please update Deno.\n\n`;

		if (Deno.execPath().includes('homebrew')) {
			message +=
				'You seem to have installed Deno via homebrew. To update, run: `brew upgrade deno`\n';
		} else {
			message += 'To update, run: `deno upgrade`\n';
		}

		error(message);
	}
}

async function dev(base: string, entrypoint: string) {
	ensureMinDenoVersion();

	entrypoint = new URL(entrypoint, base).href;

	await import(entrypoint);
}

grammy.catch(console.error);

grammy.start({
	drop_pending_updates: true,
	allowed_updates: [
		'callback_query',
		'inline_query',
		'message',
		'chat_member',
		'my_chat_member',
	],
	onStart: ({ username }) => console.log(`${green(username)} started.`),
});

Deno.addSignalListener('SIGINT', () => grammy.stop());
Deno.addSignalListener('SIGTERM', () => grammy.stop());

await dev(import.meta.url, './main.ts');
