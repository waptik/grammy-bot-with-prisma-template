import { validate, ValidationErrors, ValidationRules } from 'validasaur';
import { httpErrors, Middleware } from 'oak';

import { Context } from '@/types/oak/context.ts';

/**
 * get single error message from errors
 */
const getErrorMessage = (errors: ValidationErrors): string | undefined => {
	for (const attr in errors) {
		const attrErrors = errors[attr];
		for (const rule in attrErrors) {
			return attrErrors[rule] as string;
		}
	}
};

/**
 * request validation middleware
 * validate request body with given validation rules
 */
const requestValidator = (
	{ bodyRules }: { bodyRules: ValidationRules },
): Middleware => {
	return async (ctx: Context, next) => {
		/** get request body */
		const request = ctx.request;
		const result = request.body({ type: 'json' });
		const body = await result.value;

		if (!body) {
			throw new httpErrors.BadRequest('Request body cannot be empty');
		}

		/** check rules */
		const [isValid, errors] = await validate(body, bodyRules);
		if (!isValid) {
			/** if error found, throw bad request error */
			const message = getErrorMessage(errors);
			throw new httpErrors.BadRequest(message);
		}

		await next();
	};
};

export { requestValidator };
