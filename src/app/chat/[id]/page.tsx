import React from 'react';

const ChatIdPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return <div>hello from {id} chat</div>;
};

export default ChatIdPage;
