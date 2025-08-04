import React from 'react';
import Image from 'next/image';
import { Card, CardBody, Link } from '@heroui/react';
import { Navigation } from './navigation';
import NextLink from 'next/link';
import { AppRoutes } from 'constants/routes';

export function Header() {
  return (
    <Card as="header" fullWidth className="mt-6 h-fit">
      <CardBody>
        <div className="flex items-center justify-between">
          <Link
            className="flex items-center justify-start gap-2"
            href={AppRoutes.Root}
            isBlock
            as={NextLink}
            color="foreground"
          >
            <Image src="/favicon.svg" alt="Seo Generator Logo" width={25} height={25} />
            <h1 className="text-xl font-semibold">Seo Generator</h1>
          </Link>
          <Navigation />
        </div>
      </CardBody>
    </Card>
  );
}
