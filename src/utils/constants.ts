import { getEnvOrThrow } from "@utils/misc.ts";

export const isDev = typeof Deno.env.get("DENO_DEPLOYMENT_ID") === "undefined" ? true : false;

export const tokens = {
    tg: getEnvOrThrow("TELEGRAM_BOT_TOKEN"),
};

export const botUrl = Deno.env.get("BOT_URL");
