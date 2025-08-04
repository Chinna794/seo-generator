import React from 'react';

export const seoPrompts = [
  'Describe your page in one concise sentence for the meta description.',
  'What title do you want to display in search results and on the browser tab?',
  'Add an Open Graph image URL that represents your page when shared.',
  'What keywords best describe your page content? Separate them with commas.',
  'Specify the canonical URL for this page (to avoid duplicate content).',
  'Which language and region is this page intended for? (e.g., en_US, es_MX)',
  'What is the main purpose or topic of your page?',
  'Who is the author or organization behind this page?',
  'Add your Twitter handle for attribution in Twitter Cards.',
  'What type of content is this? (e.g., article, website, product)',
  "Write a compelling description to increase your page's click-through rate.",
  'What headline would attract users when they see your page shared on social media?',
  'Send a message to create your perfect SEO',
];

export function useRotatingPrompt(prompts: string[] = seoPrompts, intervalMs = 10000): string {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % prompts.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [prompts, intervalMs]);

  return prompts[index];
}
