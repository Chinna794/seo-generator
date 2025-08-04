'use client';
import { Button, ScrollShadow } from '@heroui/react';
import React from 'react';
import { motion } from 'motion/react';
import { promptIdeas } from 'constants/prompt-ideas';

export const ChatIdeas = ({
  messageValue,
  setMessageValue,
}: {
  messageValue: string;
  setMessageValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const search = messageValue.trim().toLowerCase();

  const ideasFiltered = promptIdeas.filter(
    (idea) => idea.title.toLowerCase().includes(search) || idea.description.toLowerCase().includes(search),
  );

  return (
    <motion.div>
      <ScrollShadow hideScrollBar className="flex flex-nowrap gap-2" orientation="horizontal">
        <div className="flex gap-2">
          {ideasFiltered.map(({ title, description }, index) => (
            <Button
              key={index}
              className="flex h-14 flex-col items-start gap-0"
              variant="flat"
              onPress={() => setMessageValue(`${title} - ${description}`)}
            >
              <p>{title}</p>
              <p className="text-default-500">{description}</p>
            </Button>
          ))}
        </div>
      </ScrollShadow>
    </motion.div>
  );
};
