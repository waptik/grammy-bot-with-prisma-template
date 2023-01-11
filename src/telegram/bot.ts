import { hydrateReply } from "https://deno.land/x/grammy_parse_mode@1.5.0/hydrate.ts";
import { parseMode } from "https://deno.land/x/grammy_parse_mode@1.5.0/transformer.ts";
import { limit as rateLimit } from "https://deno.land/x/grammy_ratelimiter@v1.1.6/mod.ts";
import { GrammyContext, GrammySession } from "./context.ts";

import { tokens } from "@utils/constants.ts";

import commands, { listOfCommands } from "~grammy/handlers/commands/mod.ts";
import conversationComposer from "~grammy/handlers/conversations/mod.ts";
import groupEvents from "~grammy/handlers/middleware/events.group.ts";
import ping from "~grammy/handlers/middleware/ping.ts";
import { Bot, conversations, GrammyError, HttpError, session } from "./deps.ts";
import { demoConversationMenu } from "./handlers/menu/demo-conversation.ts";
import { isPrivate } from "./helpers/forGroups.ts";

export const grammy = new Bot<GrammyContext>(tokens.tg, {});

// Plugins

grammy.api.config.use(parseMode("HTML"));
grammy.use(rateLimit());
grammy.use(hydrateReply<GrammyContext>);

// custom middlewares
grammy.use(ping);
grammy.use(groupEvents);

grammy.use(
    session({
        initial: (): GrammySession => ({}),
        getSessionKey: (ctx) => ctx.from?.id?.toString(),
    }),
);
grammy.use(conversations());

grammy.use(conversationComposer);
// menus
grammy.filter(isPrivate).use(demoConversationMenu);
grammy.use(commands);
// --- End menus

grammy.api
    .setMyCommands(listOfCommands)
    .then(() => {
        console.log("commands have been uploaded to BotFather");
    })
    .catch((e) => console.error("Failed to upload commands to bot", e));

grammy.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof GrammyError) {
        console.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
        console.error("Could not contact Telegram:", e);
    } else {
        console.error("Unknown error:", e);
    }
});
