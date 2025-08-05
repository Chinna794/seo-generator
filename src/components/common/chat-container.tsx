'use client';
import React from 'react';
import { Chat } from 'components/chat';
import { ChatTabs } from 'components/chats-tabs';
import { ChatHolder } from 'components/chat/chat-holder';
import { Messages } from 'components/chat/messages';
import { useMatchRoute } from 'hooks/use-match-route';
import { AppRoutes } from 'constants/routes';

export function ChatContainer() {
  const { isSameRoute } = useMatchRoute(AppRoutes.Chat);

  return (
    <section className="grid flex-1 grid-cols-4 gap-8">
      <ChatTabs />
      <div className="relative col-span-3 flex h-full flex-col">
        <div className="flex min-h-0 flex-1 flex-col">{isSameRoute ? <ChatHolder /> : <Messages />}</div>
        <Chat />
      </div>
    </section>
  );
}
