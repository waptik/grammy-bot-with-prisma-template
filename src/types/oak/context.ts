import { Context as OakContext, State } from 'oak';

/**
 * Custom appilication context
 */
export class Context<
	S extends AS = State,
	AS extends State = Record<string, unknown>,
> extends OakContext<S> {}
