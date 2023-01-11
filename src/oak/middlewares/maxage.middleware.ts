import { Middleware } from 'oak';

export const maxAge = (maxAge = 60): Middleware => {
	return async (ctx, next) => {
		ctx.response.headers.set('Cache-Control', `public, max-age=${maxAge}`);
		await next();
	};
};
