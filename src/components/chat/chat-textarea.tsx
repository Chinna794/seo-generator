import React, { ChangeEvent } from 'react';

import { motion, AnimatePresence, HTMLMotionProps } from 'motion/react';

export function ChatTextarea({
  value,
  onChange,
  placeholder,
  ...props
}: HTMLMotionProps<'textarea'> & {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div className="relative w-full">
      <motion.textarea
        {...props}
        value={value}
        onChange={onChange}
        className="relative z-10 min-h-[100px] w-full resize-none bg-transparent pt-2 pl-2 outline-none"
      />
      <AnimatePresence>
        {!value && (
          <motion.div
            key={placeholder}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none absolute top-2 left-2 z-20 text-neutral-400 select-none"
          >
            {placeholder}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
