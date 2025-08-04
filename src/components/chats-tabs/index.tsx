'use client';
import React from 'react';
import { Button, Kbd } from '@heroui/react';
import { useChatTabsStore } from 'store/chat-tabs-store';
import { FiEdit } from 'react-icons/fi';
import { HighlightSpan } from 'components/common/highlight-span';
import { ChatItem } from './chat-item';
import Link from 'next/link';
import { AppRoutes } from 'constants/routes';
import { useMatchRoute } from 'hooks/use-match-route';

export const ChatTabs = () => {
  const { chats } = useChatTabsStore();
  const { isSameRoute } = useMatchRoute(AppRoutes.Chat);

  return (
    <div className="pt-4">
      <HighlightSpan as="p" className="mb-2">
        All my generations
      </HighlightSpan>
      <Button
        as={Link}
        className="group my-2 transition"
        startContent={<FiEdit />}
        endContent={<Kbd keys={['command', 'shift']}>O</Kbd>}
        variant="shadow"
        color={isSameRoute ? 'secondary' : 'default'}
        href={AppRoutes.Chat}
      >
        New Chat
      </Button>

      <ul className="mt-4 space-y-4">
        {chats.map((chat) => (
          <ChatItem chat={chat} key={chat.id} />
        ))}
      </ul>
    </div>
  );
};
