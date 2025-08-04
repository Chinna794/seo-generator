import React from 'react';
import { navigationLinks } from './links';
import { NavigationItem } from './navigation-item';

export const Navigation = () => {
  return (
    <ul role="navigation" className="flex items-center gap-4">
      {navigationLinks.map((link) => (
        <NavigationItem key={link.title} link={link} />
      ))}
    </ul>
  );
};
