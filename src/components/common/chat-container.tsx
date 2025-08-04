'use client';
import React from 'react';
import { Chat } from 'components/chat';
import { ChatTabs } from 'components/chats-tabs';
import { ChatHolder } from 'components/chat/chat-holder';
import { Messages } from 'components/chat/messages';
import { ScrollShadow } from '@heroui/react';
import { useMatchRoute } from 'hooks/use-match-route';
import { AppRoutes } from 'constants/routes';

export function ChatContainer() {
  const { isSameRoute } = useMatchRoute(AppRoutes.Chat);

  return (
    <section className="grid grid-cols-[250px_1fr] gap-8">
      <ChatTabs />
      <ScrollShadow hideScrollBar>
        <div className="relative flex h-[700px] max-h-dvh w-full flex-col justify-between">
          {isSameRoute ? <ChatHolder /> : <Messages />}
          <Chat />
        </div>
      </ScrollShadow>
    </section>
  );
}
