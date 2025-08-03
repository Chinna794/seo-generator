import { cn } from 'lib/utils';
import React from 'react';

export const HighlightSpan = ({
  children,
  className,
  as,
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) => {
  const Component = as || 'span';
  return (
    <Component className={cn('text-neutral-700 transition hover:text-neutral-500', className)}>{children}</Component>
  );
};
