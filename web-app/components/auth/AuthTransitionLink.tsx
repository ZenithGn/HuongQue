'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type AuthTransitionLinkProps = {
  href: string;
  direction: 'forward' | 'back';
  className?: string;
  children: React.ReactNode;
};

export default function AuthTransitionLink({
  href,
  direction,
  className,
  children,
}: AuthTransitionLinkProps) {
  const router = useRouter();
  const timer = useRef<number | null>(null);

  return (
    <Link
      href={href}
      className={className}
      onNavigate={(event) => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const root = document.documentElement;
        if (reduceMotion) {
          delete root.dataset.authRouteState;
          delete root.dataset.authRouteDirection;
          return;
        }

        if (root.dataset.authRouteState === 'exit') {
          event.preventDefault();
          return;
        }

        event.preventDefault();
        root.dataset.authRouteDirection = direction;
        root.dataset.authRouteState = 'exit';
        timer.current = window.setTimeout(() => {
          router.push(href);
        }, 220);
      }}
    >
      {children}
    </Link>
  );
}
