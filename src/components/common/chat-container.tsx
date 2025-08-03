import React from 'react';
import { Chat } from 'components/chat';
import { ChatTabs } from 'components/chats-tabs';

export function ChatContainer() {
  return (
    <section className="grid h-full grid-cols-[250px_1fr] gap-8">
      <ChatTabs />
      <Chat />
    </section>
  );
}
