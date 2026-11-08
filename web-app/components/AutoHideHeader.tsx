'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

export function AutoHideHeader({
  children,
  homepage = false,
}: {
  children: ReactNode;
  homepage?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let previousY = window.scrollY;
    let direction = 0;
    let directionDistance = 0;
    let frame = 0;

    const updateVisibility = () => {
      frame = 0;
      const currentY = Math.max(0, window.scrollY);
      const delta = currentY - previousY;
      previousY = currentY;

      if (currentY === 0) {
        direction = 0;
        directionDistance = 0;
        setVisible(true);
        return;
      }

      const header = containerRef.current;
      const menu = document.getElementById('desktop-product-mega-menu');
      const interactionOpen = Boolean(
        header?.querySelector('[aria-expanded="true"]') ||
        (menu && menu.getAttribute('aria-hidden') === 'false') ||
        (header && document.activeElement instanceof Node && header.contains(document.activeElement)),
      );
      if (interactionOpen) {
        direction = 0;
        directionDistance = 0;
        setVisible(true);
        return;
      }

      if (delta === 0) return;
      const nextDirection = delta > 0 ? 1 : -1;
      if (nextDirection !== direction) {
        direction = nextDirection;
        directionDistance = 0;
      }
      directionDistance += Math.abs(delta);

      // Ignore tiny wheel/touch jitter, but reveal on the first deliberate upward movement.
      if (direction < 0 && directionDistance >= 2) setVisible(true);
      if (direction > 0 && directionDistance >= 8) setVisible(false);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateVisibility);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`z-50 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${homepage ? 'fixed inset-x-0 top-0' : 'sticky top-0'} ${visible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      {children}
    </div>
  );
}
