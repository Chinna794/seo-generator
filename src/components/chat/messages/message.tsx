import { Card, CardBody, CardFooter } from '@heroui/react';
import { HighlightSpan } from 'components/common/highlight-span';
import { cn } from 'lib/utils';
import React from 'react';
import { MessageType } from 'type/chat';

export const Message = ({ message }: { message: MessageType }) => {
  const isAuthor = message.author === 'me';

  return (
    <Card className={cn('flex w-[300px]', isAuthor ? 'self-end' : '')} isHoverable>
      <CardBody>{message.content}</CardBody>
      <CardFooter>
        <div className="text-xs">
          <HighlightSpan>{message.createdAt}</HighlightSpan>
        </div>
      </CardFooter>
    </Card>
  );
};
