import { AppLayout } from 'components/common/app-layout';
import { ChatContainer } from 'components/common/chat-container';
import React from 'react';

const ChatIdPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  console.log(params);
  return (
    <AppLayout className="">
      <ChatContainer />
    </AppLayout>
  );
};

export default ChatIdPage;
