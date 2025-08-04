'use client';
import React from 'react';
import { Button, Divider, Kbd } from '@heroui/react';
import { useChatTabsStore } from 'store/chat-tabs-store';
import { FiEdit } from 'react-icons/fi';
import { HighlightSpan } from 'components/common/highlight-span';
import { ChatItem } from './chat-item';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const ChatTabs = () => {
  const { chats } = useChatTabsStore();
  const pathname = usePathname();
  const isRootRoute = pathname === '/';

  return (
    <div className="pt-4">
      <HighlightSpan as="p" className="mb-2">
        All my generations
      </HighlightSpan>
      <Divider />
      <Button
        as={Link}
        fullWidth
        className="group my-2 transition"
        startContent={<FiEdit />}
        endContent={<Kbd keys={['command', 'shift']}>O</Kbd>}
        variant="shadow"
        color={isRootRoute ? 'secondary' : 'default'}
        href="/"
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
