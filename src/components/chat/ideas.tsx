'use client';
import { Button, ScrollShadow } from '@heroui/react';
import React from 'react';
import { motion } from 'motion/react';
import { promptIdeas, PropmtIdea } from 'constants/prompt-ideas';
import { useMatchRoute } from 'hooks/use-match-route';
import { AppRoutes } from 'constants/routes';

export const ChatIdeas = ({
  messageValue,
  onClickIdeaAction,
}: {
  messageValue: string;
  onClickIdeaAction: (idea: PropmtIdea) => void;
}) => {
  const { isSameRoute } = useMatchRoute(AppRoutes.Chat);

  const search = messageValue.trim().toLowerCase();

  const ideasFiltered = promptIdeas.filter(
    (idea) => idea.title.toLowerCase().includes(search) || idea.description.toLowerCase().includes(search),
  );

  if (!isSameRoute) {
    return null;
  }

  return (
    <motion.div>
      <ScrollShadow hideScrollBar className="flex flex-nowrap gap-2" orientation="horizontal">
        <div className="flex gap-2">
          {ideasFiltered.map(({ title, description }, index) => (
            <Button
              key={index}
              className="flex h-14 flex-col items-start gap-0"
              variant="flat"
              onPress={() => onClickIdeaAction({ title, description })}
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
