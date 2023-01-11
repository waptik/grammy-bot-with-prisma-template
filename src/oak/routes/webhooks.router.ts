import { Router } from 'oak';

import { grammy } from '~grammy/bot.ts';
import { webhookCallback } from '~grammy/deps.ts';
import { tokens } from '@utils/constants.ts';

export const webhooksRouter = new Router();

webhooksRouter.post(`/telegram/${tokens.tg}`, webhookCallback(grammy, 'oak'));
