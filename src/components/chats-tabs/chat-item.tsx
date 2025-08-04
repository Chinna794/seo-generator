import React from 'react';
import { Chat } from 'type/chat';
import { usePathname } from 'next/navigation';
import { cn } from 'lib/utils';
import { Button } from '@heroui/react';
import { HiOutlineChatAlt } from 'react-icons/hi';
import Link from 'next/link';

export function ChatItem({ chat }: { chat: Chat }) {
  const pathname = usePathname();

  const pathFixed = pathname.split('/')[2];
  const isActiveChat = chat.id === pathFixed;

  return (
    <Button
      as={Link}
      href={`/chat/${chat.id}`}
      key={chat.id}
      className={cn('py-1')}
      color={isActiveChat ? 'primary' : 'default'}
      fullWidth
      startContent={<HiOutlineChatAlt />}
    >
      {chat.name}
    </Button>
  );
}
