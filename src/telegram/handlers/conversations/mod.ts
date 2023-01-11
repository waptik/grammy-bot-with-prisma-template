import { GrammyContext } from "~grammy/context.ts";
import { Composer } from "~grammy/deps.ts";
import { isPrivate } from "~grammy/helpers/forGroups.ts";
import demoConversation from "./demo.conversation.ts";

const conversationComposer = new Composer<GrammyContext>();
// everywhere

// Only in private chats
conversationComposer.filter(isPrivate).use(demoConversation);

export default conversationComposer;
