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
  chats: [
    {
      id: '12390-1203812908390123',
      name: 'Test 1',
      description: 'Some chat',
      messages: [
        {
          content: 'message test',
          id: '234234092309482398423908423',
          author: 'me',
          createdAt: new Date().toISOString(),
        },
        {
          content: 'message test 2',
          id: '23423409230948239842asf42343908423',
          author: 'me',
          createdAt: new Date().toISOString(),
        },
        {
          content: 'message test 3',
          id: '2342340923094823984sfsdfasdfsadf23908423',
          author: 'me',
          createdAt: new Date().toISOString(),
        },
        {
          content: 'message test 4',
          id: '234234092309482398412312323908423',
          author: 'me',
          createdAt: new Date().toISOString(),
        },
        {
          content: 'message test 5',
          id: '2342340923094823984asfasfasdfasfasasdf23908423',
          author: 'me',
          createdAt: new Date().toISOString(),
        },
        {
          content: 'message test 6',
          id: '2342340923094sadsdsd823984asfasfasdfasfasasdf23908423',
          author: 'me',
          createdAt: new Date().toISOString(),
        },
        {
          content: 'message test 7',
          id: '2342340923094sadsdssdfsdsdfd823984asfasfasdfasfasasdf23908423',
          author: 'me',
          createdAt: new Date().toISOString(),
        },
      ],
    },
  ],
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
