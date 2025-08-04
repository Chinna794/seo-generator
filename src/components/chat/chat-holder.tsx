import { HighlightSpan } from 'components/common/highlight-span';
import { TextHoverEffect } from 'components/ui/text-hover-effect';
import React from 'react';

export const ChatHolder = () => {
  return (
    <div className="pt-12">
      <div className="flex h-[16rem] items-center justify-center">
        <TextHoverEffect text="SEO" />
      </div>
      <p className="flex flex-col text-center">
        <HighlightSpan>Start optimizing your website metadata with our smart chat assistant.</HighlightSpan>
        <HighlightSpan>Ask questions, generate SEO tags, or get instant suggestions for your project.</HighlightSpan>
      </p>
    </div>
  );
};
