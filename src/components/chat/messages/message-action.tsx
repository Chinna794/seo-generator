import { Button, ButtonProps, Tooltip } from '@heroui/react';
import { cn } from 'lib/utils';
import React from 'react';

export const MessageAction = ({
  children,
  className,
  label,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  label: string;
} & ButtonProps) => {
  return (
    <Tooltip content={label} placement="bottom">
      <Button size="sm" isIconOnly variant="faded" className={cn(className)} {...props}>
        {children}
      </Button>
    </Tooltip>
  );
};
