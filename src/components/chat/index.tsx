'use client';
import { Button, Card, CardBody, Kbd, Tooltip } from '@heroui/react';
import { HighlightSpan } from 'components/common/highlight-span';
import { useParams } from 'next/navigation';
import React from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { IoIosAttach } from 'react-icons/io';
import { HiTemplate } from 'react-icons/hi';
import { useChatTabsStore } from 'store/chat-tabs-store';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';
import { MessageType } from 'type/chat';
import { messageLimit } from 'constants/message';
import { useRotatingPrompt } from 'hooks/use-rotating-placeholders';
import { ChatTextarea } from './chat-textarea';
import { useMatchRoute } from 'hooks/use-match-route';
import { AppRoutes } from 'constants/routes';
import { Icon } from '@iconify/react';
import { cn } from 'lib/utils';
import { PromptInput } from 'components/prompt-input';
import { ChatIdeas } from './ideas';
import { OSType, useDetectOS } from 'hooks/use-detect-os';

export function Chat() {
  const [messageValue, setMessageValue] = React.useState('');
  const { addNewChat, addMessage } = useChatTabsStore();
  const { isSameRoute } = useMatchRoute(AppRoutes.Chat);
  const router = useRouter();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const params = useParams<{ id: string }>();
  const rotatingPlaceholder = useRotatingPrompt();
  const { os } = useDetectOS();

  const formRef = React.useRef<HTMLFormElement>(null);

  const handleChangeMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setMessageValue(newValue);
  };

  const handleSubmitMessage = (event: React.FormEvent) => {
    event.preventDefault();
    const newMessage: MessageType = {
      author: 'me',
      content: messageValue,
      createdAt: new Date().toISOString(),
      id: nanoid(),
    };
    if (isSameRoute) {
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

  const handleAttachFile = () => {
    fileInputRef.current?.click();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const isEnter = event.key === 'Enter';
    const isMac = os === OSType.MacOS;
    const isWin = os === OSType.Windows;
    const isValid = !!messageValue;

    // Mac: Option(Alt) + Enter | Windows: Ctrl + Enter
    const shouldSubmit = isEnter && isValid && ((isMac && event.altKey) || (isWin && event.ctrlKey));

    if (shouldSubmit) {
      event.preventDefault();
      formRef.current?.requestSubmit?.();
    }
  };

  // eslint-disable-next-line no-constant-condition
  if (true) {
    return (
      <div className="flex w-full flex-col gap-4">
        <ChatIdeas messageValue={messageValue} setMessageValue={setMessageValue} />
        <form
          className="flex w-full flex-col items-start rounded-medium bg-default-100 transition-colors hover:bg-default-200/70"
          onSubmit={handleSubmitMessage}
          ref={formRef}
        >
          <PromptInput
            classNames={{
              inputWrapper: '!bg-transparent shadow-none',
              innerWrapper: 'relative',
              input: 'pt-1 pl-2 pb-6 !pr-10 text-medium',
            }}
            onKeyDown={handleKeyDown}
            endContent={
              <div className="flex items-end gap-2">
                <Tooltip
                  content={
                    <div className="flex items-center gap-1">
                      <Kbd keys={[os === OSType.MacOS ? 'alt' : 'ctrl', 'enter']} />
                      Send Message
                    </div>
                  }
                  showArrow={true}
                >
                  <Button
                    isIconOnly
                    color={!messageValue ? 'default' : 'primary'}
                    isDisabled={!messageValue}
                    radius="lg"
                    size="sm"
                    variant="solid"
                    type="submit"
                  >
                    <Icon
                      className={cn(
                        '[&>path]:stroke-[2px]',
                        !messageValue ? 'text-default-600' : 'text-primary-foreground',
                      )}
                      icon="solar:arrow-up-linear"
                      width={20}
                    />
                  </Button>
                </Tooltip>
              </div>
            }
            minRows={3}
            radius="lg"
            value={messageValue}
            variant="flat"
            onValueChange={(value) => setMessageValue(value)}
          />
          <div className="flex w-full items-center justify-between gap-2 overflow-auto px-4 pb-4">
            <div className="flex w-full gap-1 md:gap-3">
              <Button
                size="sm"
                startContent={<Icon className="text-default-500" icon="solar:paperclip-linear" width={18} />}
                variant="flat"
              >
                Attach
              </Button>
              <Button
                size="sm"
                startContent={<Icon className="text-default-500" icon="solar:soundwave-linear" width={18} />}
                variant="flat"
              >
                Voice Commands
              </Button>
              <Button
                size="sm"
                startContent={<Icon className="text-default-500" icon="solar:notes-linear" width={18} />}
                variant="flat"
              >
                Templates
              </Button>
            </div>
            <p className="py-1 text-tiny text-default-400">{messageValue.length}/2000</p>
          </div>
        </form>
      </div>
    );
  }

  return (
    <Card className="sticky bottom-[10px] m-0 flex-none shadow-2xl">
      <CardBody>
        <form ref={formRef} onSubmit={handleSubmitMessage}>
          <div className="grid grid-cols-[1fr_50px]">
            <ChatTextarea
              placeholder={rotatingPlaceholder}
              rows={4}
              value={messageValue}
              onChange={handleChangeMessage}
              maxLength={messageLimit}
              name="message"
              // onKeyDown={handleKeyDown}
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
                  variant="ghost"
                >
                  Attach File
                </Button>
              </div>
              <div>
                <Button type="button" startContent={<HiTemplate className="size-5" />} size="sm" variant="ghost">
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
