/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import { Application, etag } from 'oak';
import { bold, yellow } from '$std/fmt/colors.ts';
import { oakCors } from 'https://deno.land/x/cors@v1.2.2/mod.ts';

import { router } from '@/oak/routes/mod.ts';
import * as middlewares from '@/oak/middlewares/mod.ts';
import { grammy } from '~grammy/bot.ts';
import { Context } from '@/types/oak/context.ts';
import { botUrl, tokens } from '@utils/constants.ts';

const port = 8080;

const app = new Application<Context>();

// use middlewares
app.use(oakCors());
app.use(etag.factory());
app.use(middlewares.loggerMiddleware());
app.use(middlewares.errorMiddleware());
app.use(middlewares.timingMiddleware());

// routes
app.use(router.routes());

app.use(middlewares.notFound404Middleware());

app.addEventListener('listen', async ({ hostname, port, serverType }) => {
	console.log(bold(`Start listening on `) + yellow(`${hostname}:${port}`));

	//
	if (botUrl) {
		const webhookInfo = await grammy.api.getWebhookInfo();
		const webhookUrl = `${botUrl}/webhooks/telegram/${tokens.tg}`;

		console.info(`existing webhook info fetched: ${webhookInfo.url}`);

		if (webhookInfo.url !== webhookUrl) {
			console.info('deleting existing webhook');
			await grammy.api.deleteWebhook();
			console.info('existing webhook deleted');

			console.info(`setting new webhook to: ${webhookUrl}`);
			await grammy.api.setWebhook(webhookUrl);
			console.info(`bot webhook set to: ${webhookUrl}`);
		}
	}

	// see https://github.com/oakserver/oak/issues/483#issuecomment-1060109388
	app.addEventListener('error', (e) => {
		console.error('Oak.error', e.error);
		console.error('Oak.filename', e.filename);
		console.error('Oak.message', e.message);
	});

	console.log(bold('  using HTTP server: ' + yellow(serverType)));
});

await app.listen({
	hostname: 'localhost',
	port,
});
