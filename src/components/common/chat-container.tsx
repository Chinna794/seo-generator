'use client';
import React from 'react';
import { Chat } from 'components/chat';
import { ChatTabs } from 'components/chats-tabs';
import { ChatHolder } from 'components/chat/chat-holder';
import { usePathname } from 'next/navigation';
import { Messages } from 'components/chat/messages';

export function ChatContainer() {
  const pathname = usePathname();
  const isRootRoute = '/' === pathname;

  return (
    <section className="grid h-full grid-cols-[250px_1fr] gap-8">
      <ChatTabs />
      <div className="relative flex h-full flex-col justify-between">
        {isRootRoute ? <ChatHolder /> : <Messages />}
        <Chat />
      </div>
    </section>
  );
}
