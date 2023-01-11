import type { ParseModeFlavor } from "https://deno.land/x/grammy_parse_mode@1.5.0/hydrate.ts";
import type { Context, Conversation, ConversationFlavor, SessionFlavor } from "./deps.ts";

export interface GrammySession {
    id?: string;
}

export type GrammyContext = SessionFlavor<GrammySession> & ConversationFlavor & ParseModeFlavor<Context>;

export type GrammyConversation = Conversation<GrammyContext>;
