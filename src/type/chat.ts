export type MessageType = {
  content: string;
  id: string;
  author: 'me' | 'response';
  createdAt: string;
};

export type Chat = {
  id: string;
  name: string;
  description?: string;
  messages?: Array<MessageType>;
};
