import { cn } from '@heroui/theme';
import React from 'react';

export function AppLayout({ children, className }: { children: React.ReactNode; className?: string }) {
  return <main className={cn('mx-auto p-12', className)}>{children}</main>;
}
