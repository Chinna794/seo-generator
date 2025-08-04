'use client';
import { Card, CardBody, CardFooter } from '@heroui/react';
import { HighlightSpan } from 'components/common/highlight-span';
import { cn } from 'lib/utils';
import React from 'react';
import { MessageType } from 'type/chat';
import { format } from 'date-fns';
import { FaPencil, FaCheck } from 'react-icons/fa6';
import { MessageAction } from './message-action';
import { LuCopy } from 'react-icons/lu';
import { messageLimit } from 'constants/message';
import { IoClose } from 'react-icons/io5';
import { useChatTabsStore } from 'store/chat-tabs-store';
import { useParams } from 'next/navigation';

type MessageProps = {
  message: MessageType;
  onEdit?: (newContent: string) => void;
};

export const Message = ({ message, onEdit }: MessageProps) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [messageValue, setMessageValue] = React.useState(message.content ?? '');

  const params = useParams<{ id: string }>();
  const { editMessage } = useChatTabsStore();

  const isAuthor = message.author === 'me';

  const handleCancelEdit = () => {
    setMessageValue(message.content ?? '');
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    if (!params.id) return;
    if (messageValue.trim() && messageValue !== message.content) {
      onEdit?.(messageValue.trim());
    }
    setIsEditing(false);
    editMessage(params.id, message.id, messageValue);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content ?? '');
    } catch {
      window.prompt('Copy to clipboard: Ctrl+C, Enter', message.content ?? '');
    }
  };

  return (
    <div className={cn('group flex', isEditing ? 'w-[400px]' : 'w-[350px]', isAuthor ? 'flex-col self-end' : '')}>
      <Card isHoverable>
        <CardBody>
          {isEditing ? (
            <textarea
              placeholder="Send a message to create your perfect SEO"
              className="resize-none outline-none"
              rows={3}
              value={messageValue}
              onChange={(e) => setMessageValue(e.target.value)}
              maxLength={messageLimit}
              name="message"
              autoFocus
            />
          ) : (
            <pre className="font-roboto break-words whitespace-pre-wrap">{message.content}</pre>
          )}
        </CardBody>
        <CardFooter>
          <div className="text-xs">
            <HighlightSpan>{format(message.createdAt, 'MM/dd/yyyy')}</HighlightSpan>
          </div>
        </CardFooter>
      </Card>
      <div className="mt-2 flex items-center justify-end gap-2 opacity-0 transition group-hover:opacity-100">
        {isEditing ? (
          <>
            <MessageAction label="Cancel" onPress={handleCancelEdit} color="danger">
              <IoClose />
            </MessageAction>
            <MessageAction label="Save" disabled={!messageValue.length} onPress={handleSaveEdit} color="success">
              <FaCheck />
            </MessageAction>
          </>
        ) : (
          <>
            <MessageAction label="Copy" onPress={handleCopy} color="secondary">
              <LuCopy />
            </MessageAction>
            {isAuthor && (
              <MessageAction label="Edit" onPress={() => setIsEditing(true)} color="primary">
                <FaPencil />
              </MessageAction>
            )}
          </>
        )}
      </div>
    </div>
  );
};
