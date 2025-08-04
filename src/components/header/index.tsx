import React from 'react';
import Image from 'next/image';
import { Card, CardBody } from '@heroui/react';
import { Navigation } from './navigation';

export function Header() {
  return (
    <Card as="header" fullWidth className="mt-6 h-fit">
      <CardBody>
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-2">
            <Image src="/favicon.svg" alt="Seo Generator Logo" width={25} height={25} />
            <h1 className="text-xl font-semibold">Seo Generator</h1>
          </div>
          <Navigation />
        </div>
      </CardBody>
    </Card>
  );
}
