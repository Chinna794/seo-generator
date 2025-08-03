import { Chat } from 'type/chat';
import { create } from 'zustand';

export type ChatTabsStore = {
  chats: Array<Chat>;
  addNewChat: (chat: Chat) => void;
};

export const useChatTabsStore = create<ChatTabsStore>((set) => ({
  chats: [],
  addNewChat: (newChat) => {
    set(({ chats }) => ({ chats: [...chats, newChat] }));
  },
}));
