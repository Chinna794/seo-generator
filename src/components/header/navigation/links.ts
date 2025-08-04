import { GitHubLight } from 'components/icons/github-light';
import { LinkedInLight } from 'components/icons/linkedin-light';
import { IconType } from 'react-icons';

export type NavigationLink = {
  title: string;
  url: string;
  icon: IconType;
};

export const navigationLinks: NavigationLink[] = [
  {
    title: 'Github',
    url: 'https://github.com/mrluisfer/seo-generator',
    icon: GitHubLight,
  },
  {
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/mrluisfer/',
    icon: LinkedInLight,
  },
];
