'use client';
import { Button, Card, CardBody, Kbd, Tooltip } from '@heroui/react';
import { HighlightSpan } from 'components/common/highlight-span';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { IoIosAttach } from 'react-icons/io';
import { HiTemplate } from 'react-icons/hi';
import { useChatTabsStore } from 'store/chat-tabs-store';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';
import { MessageType } from 'type/chat';
import { messageLimit } from 'constants/message';

export function Chat() {
  const [messageValue, setMessageValue] = React.useState('');

  const { addNewChat, addMessage } = useChatTabsStore();
  const pathname = usePathname();
  const router = useRouter();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const params = useParams<{ id: string }>();

  const handleChangeMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setMessageValue(newValue);
  };

  const handleSubmitMessage = (event: React.FormEvent) => {
    event.preventDefault();
    const isRootRoute = '/' === pathname;
    const newMessage: MessageType = {
      author: 'me',
      content: messageValue,
      createdAt: new Date().toISOString(),
      id: nanoid(),
    };
    if (isRootRoute) {
      const chatId = nanoid();
      addNewChat({
        id: chatId,
        name: messageValue,
      });
      addMessage(chatId, newMessage);
      router.push(`/chat/${chatId}`);
    } else if (params.id) {
      addMessage(params.id, newMessage);
    }
    setMessageValue('');
  };

  // Handler for the button to trigger file input click
  const handleAttachFile = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="m-0 mb-12 flex-none">
      <CardBody>
        <form onSubmit={handleSubmitMessage}>
          <div className="grid grid-cols-[1fr_50px]">
            <textarea
              placeholder="Send a message to create your perfect SEO"
              className="resize-none outline-none"
              rows={4}
              value={messageValue}
              onChange={handleChangeMessage}
              maxLength={messageLimit}
              name="message"
            />
            <Tooltip content={<Kbd keys={['alt', 'enter']} />} showArrow={true}>
              <Button isIconOnly color={!messageValue ? 'default' : 'primary'} type="submit" disabled={!messageValue}>
                <FaArrowUp />
              </Button>
            </Tooltip>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="sr-only"
                  tabIndex={-1}
                  name="file"
                  accept=".html,.js,.jsx,.tsx,image/png,image/jpeg"
                />
                <Button
                  type="button"
                  startContent={<IoIosAttach className="size-5 rotate-45" />}
                  size="sm"
                  onPress={handleAttachFile}
                  variant="faded"
                >
                  Attach File
                </Button>
              </div>
              <div>
                <Button type="button" startContent={<HiTemplate className="size-5" />} size="sm" variant="faded">
                  Templates
                </Button>
              </div>
            </div>
            <HighlightSpan>
              {messageValue.length} / {messageLimit}
            </HighlightSpan>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
