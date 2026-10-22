'use client';

import { useLayoutEffect } from 'react';

type AuthPageTransitionProps = {
  children: React.ReactNode;
  name: 'auth-login' | 'auth-register' | 'auth-forgot-password';
};

export default function AuthPageTransition({ children, name }: AuthPageTransitionProps) {
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (root.dataset.authRouteState !== 'exit') return;
    root.dataset.authRouteState = 'enter';

    const timeout = window.setTimeout(() => {
      delete root.dataset.authRouteState;
      delete root.dataset.authRouteDirection;
    }, 660);

    return () => window.clearTimeout(timeout);
  }, [name]);

  return <>{children}</>;
}
