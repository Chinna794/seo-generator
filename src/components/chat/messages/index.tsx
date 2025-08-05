import { useParams } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import { useChatTabsStore } from 'store/chat-tabs-store';
import { Message } from './message';
import { ScrollShadow } from '@heroui/react';

export const Messages = () => {
  const params = useParams<{ id: string }>();
  const { chats } = useChatTabsStore();
  const chat = chats.find((chat) => chat.id === params?.id);

  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat?.messages?.length]);

  if (!chat) {
    return (
      <div className="grid size-full place-items-center">
        <p className="text-center text-xl font-semibold text-neutral-600">No messages registered!</p>
      </div>
    );
  }

  return (
    <ScrollShadow className="flex h-[600px] min-h-0 flex-col gap-4 pt-8" hideScrollBar>
      {chat.messages?.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      <div ref={endOfMessagesRef} className="h-0" />
    </ScrollShadow>
  );
};
