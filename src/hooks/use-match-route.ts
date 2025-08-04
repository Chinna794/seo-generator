'use client';
import { usePathname } from 'next/navigation';

const normalize = (str: string) => str.replace(/\/+$/, '');
export function useMatchRoute(route: string) {
  const pathname = usePathname();
  const isSameRoute = pathname === route;
  const starsWith = normalize(pathname).startsWith(normalize(route));

  return {
    isSameRoute,
    starsWith,
  };
}
