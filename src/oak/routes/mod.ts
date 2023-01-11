import { Router } from 'oak';

import { Context } from '@/types/oak/context.ts';

import { mainRouter } from './main.router.ts';
import { webhooksRouter } from './webhooks.router.ts';

const router: Router<Context> = new Router<Context>();

router.use(mainRouter.routes());
router.use('/webhooks', webhooksRouter.routes());

export { router };
