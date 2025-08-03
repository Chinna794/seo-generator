'use client';
import React from 'react';
import { Button, Divider, Kbd } from '@heroui/react';
import { useChatTabsStore } from 'store/chat-tabs-store';
import { FiEdit } from 'react-icons/fi';
import { HighlightSpan } from 'components/common/highlight-span';

export const ChatTabs = () => {
  const { chats } = useChatTabsStore();

  const handleStartNewChat = () => {};

  return (
    <div className="pt-4">
      <HighlightSpan as="p" className="mb-2">
        All my generations
      </HighlightSpan>
      <Divider />
      <Button
        onPress={handleStartNewChat}
        className="btn btn-primary group my-2"
        startContent={<FiEdit />}
        endContent={
          <Kbd className="opacity-0 transition-all group-hover:opacity-100" keys={['command', 'shift']}>
            O
          </Kbd>
        }
        variant="shadow"
        color="primary"
      >
        New Chat
      </Button>

      <ul>
        {chats.map((chat) => (
          <li key={chat.id} className="py-1">
            {chat.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
