import React from 'react';
import { Metadata } from 'next';
import { AppLayout } from 'components/common/app-layout';
import { Header } from 'components/header';
import { ChatContainer } from 'components/common/chat-container';

export const metadata: Metadata = {
  title: 'Seo Generator - Generate, Edit and Preview your SEO',
  description:
    'A web page made with Typescript and React (On Next.js) to generate, edit and preview your Meta tags in the easiest way',
};

export default function Main() {
  return (
    <AppLayout className="container h-screen gap-4 overflow-y-hidden">
      <Header />
      <ChatContainer />
    </AppLayout>
  );
}
