'use client';
import React from 'react';
import { Chat } from 'components/chat';
import { ChatTabs } from 'components/chats-tabs';
import { ChatHolder } from 'components/chat/chat-holder';
import { usePathname } from 'next/navigation';
import { Messages } from 'components/chat/messages';
import { ScrollShadow } from '@heroui/react';

export function ChatContainer() {
  const pathname = usePathname();
  const isRootRoute = '/' === pathname;

  return (
    <section className="grid grid-cols-[250px_1fr] gap-8">
      <ChatTabs />
      <ScrollShadow hideScrollBar>
        <div className="relative flex h-[700px] w-full flex-col justify-between">
          {isRootRoute ? <ChatHolder /> : <Messages />}
          <Chat />
        </div>
      </ScrollShadow>
    </section>
  );
}
