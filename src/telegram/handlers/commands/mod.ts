import { Composer } from "grammy";

import { GrammyContext } from "~grammy/context.ts";

import { isPrivate } from "~grammy/helpers/forGroups.ts";
import help from "./help.ts";
import start from "./start.ts";
import convo from "./convo.ts";
import drop from "./drop.ts";

const composer = new Composer<GrammyContext>();

composer.filter(isPrivate).use(start, convo, help, drop);

export const listOfCommands: Array<{ command: string; description: string }> = [
    { command: "start", description: "Start the bot" },
    { command: "help", description: "How to get help" },
    { command: "cancel", description: "Cancel a current operation" },
    {
        command: "convo",
        description: "To test conversations",
    },
];

export default composer;
