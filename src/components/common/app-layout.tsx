import { cn } from '@heroui/theme';
import { Header } from 'components/header';
import React from 'react';

export function AppLayout({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <main className={cn('container mx-auto overflow-y-hidden', className)}>
      <Header />
      {children}
    </main>
  );
}
