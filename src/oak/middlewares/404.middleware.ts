import { Middleware, Status } from 'oak';

import { Context } from '@/types/oak/context.ts';

function notFound404Middleware(): Middleware {
	return function loggerMiddleware(ctx: Context) {
		ctx.response.status = Status.NotFound;
		ctx.response.body =
			`<html><body><h1>404 - Not Found</h1><p>Path <code>${ctx.request.url}</code> not found.`;
	};
}

export { notFound404Middleware };
