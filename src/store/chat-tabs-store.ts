import { create } from 'zustand';
import { Chat, MessageType } from 'type/chat';

export type ChatTabsStore = {
  chats: Chat[];
  addNewChat: (chat: Chat) => void;
  addMessage: (chatId: string, message: MessageType) => void;
  editMessage: (chatId: string, messageId: string, newContent: string) => void;
  deleteMessage: (chatId: string, messageId: string) => void;
  deleteChat: (chatId: string) => void;
};

export const useChatTabsStore = create<ChatTabsStore>((set) => ({
  chats: [],
  addNewChat: (chat) => set((state) => ({ chats: [...state.chats, chat] })),
  addMessage: (chatId, message) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId ? { ...chat, messages: [...(chat.messages ?? []), message] } : chat,
      ),
    })),
  editMessage: (chatId, messageId, newContent) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: (chat.messages ?? []).map((msg) =>
                msg.id === messageId ? { ...msg, content: newContent } : msg,
              ),
            }
          : chat,
      ),
    })),
  deleteMessage: (chatId, messageId) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: (chat.messages ?? []).filter((msg) => msg.id !== messageId),
            }
          : chat,
      ),
    })),
  deleteChat: (chatId) =>
    set((state) => ({
      chats: state.chats.filter((chat) => chat.id !== chatId),
    })),
}));
