'use client';
import { useParams } from 'next/navigation';
import React from 'react';
import { useChatTabsStore } from 'store/chat-tabs-store';
import { Message } from './message';

export const Messages = () => {
  const params = useParams<{ id: string }>();
  const { chats } = useChatTabsStore();
  const chat = chats.find((chat) => chat.id === params?.id);

  if (!chat) {
    return (
      <div className="grid size-full place-items-center">
        <p className="text-center text-xl font-semibold text-neutral-600">No messages registered!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 pt-12">
      {chat.messages?.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};
