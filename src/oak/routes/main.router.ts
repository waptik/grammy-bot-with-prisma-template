import { Router } from "oak";

import { grammy } from "~grammy/bot.ts";
import { webhookCallback } from "~grammy/deps.ts";

import { isDev } from "@utils/constants.ts";

export const mainRouter = new Router();

mainRouter.get("", (ctx) => {
    ctx.response.body = "hello world";
});

/**
 * Prevent indexation from search engines
 * (out of 'production' environment)
 */
mainRouter.get("/robots.txt", ({ response }) => {
    response.headers.set("Content-Type", "text/plain");
    if (isDev || Deno.env.get("ROBOTS_DISALLOW")) {
        response.body = "User-agent: *\nDisallow: /";
    } else {
        response.body = "User-agent: *\nAllow: /";
    }
});

mainRouter.post("/father", webhookCallback(grammy, "oak"));
