import { isHttpError, Middleware, Status } from 'oak';

import { Context } from '@/types/oak/context.ts';

const errorMiddleware = (): Middleware => async (ctx: Context, next) => {
	try {
		await next();
	} catch (err) {
		if (isHttpError(err)) {
			const status = err.status || err.status ||
				Status.InternalServerError;

			ctx.response.status = status;

			const { message, stack } = err;
			if (ctx.request.accepts('json')) {
				ctx.response.body = { message, status, stack };
				ctx.response.type = 'json';
			} else {
				ctx.response.body = `${status} ${message}\n\n${stack ?? ''}`;
				ctx.response.type = 'text/plain';
			}
		} else {
			// if (isDev)
			console.log(err);
			// throw err;
		}
	}
};

export { errorMiddleware };
