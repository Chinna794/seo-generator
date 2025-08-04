'use client';
import React from 'react';
import { Button, Divider, Kbd } from '@heroui/react';
import { useChatTabsStore } from 'store/chat-tabs-store';
import { FiEdit } from 'react-icons/fi';
import { HighlightSpan } from 'components/common/highlight-span';
import { ChatItem } from './chat-item';
import { useRouter } from 'next/navigation';

export const ChatTabs = () => {
  const { chats } = useChatTabsStore();
  const router = useRouter();

  const handleStartNewChat = () => {};

  return (
    <div className="pt-4">
      <HighlightSpan as="p" className="mb-2">
        All my generations
      </HighlightSpan>
      <Divider />
      <Button
        onPress={handleStartNewChat}
        fullWidth
        className="group my-2 transition"
        startContent={<FiEdit />}
        endContent={<Kbd keys={['command', 'shift']}>O</Kbd>}
        variant="shadow"
        color="secondary"
        onPressChange={() => router.push('/')}
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
