import React from 'react';
import { NavigationLink } from './links';
import NextLink from 'next/link';
import { Link } from '@heroui/react';

export const NavigationItem = ({ link }: { link: NavigationLink }) => {
  const Icon = link.icon;
  const isExternalUrl = /^(https?:)?\/\//.test(link.url);

  return (
    <li key={link.title}>
      <Link as={NextLink} href={link.url} isBlock color="foreground" className="space-x-2" isExternal={isExternalUrl}>
        <Icon /> <span>{link.title}</span>
      </Link>
    </li>
  );
};
