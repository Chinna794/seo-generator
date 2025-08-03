import React from 'react';
import { Metadata } from 'next';
import './globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Roboto } from 'next/font/google';
import { Providers } from './providers';
import { cn } from '@heroui/react';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Seo Generator - Generate, Edit and Preview your SEO',
  description:
    'A web page made with Typescript and React (On Next.js) to generate, edit and preview your Meta tags in the easiest way',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(roboto.variable, 'dark')}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
