'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ProductMegaMenu } from '@/components/ProductMegaMenu';
import type { ProductMenuData } from '@/lib/types';

interface NavLinksProps {
  isAuthenticated: boolean;
  productMenu: ProductMenuData;
  isHomepage?: boolean;
}

export function NavLinks({ isAuthenticated, productMenu, isHomepage = false }: NavLinksProps) {
  const pathname = usePathname();
  const [productsOpen, setProductsOpen] = useState(false);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const [menuTop, setMenuTop] = useState(64);
  const productsRef = useRef<HTMLDivElement>(null);
  const productsButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);
  const productsMenuId = 'desktop-product-mega-menu';

  useEffect(() => {
    // Mount the portal only after hydration so server and first client markup match.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPortalTarget(document.body);
  }, []);

  const openMenu = () => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
    const header = productsRef.current?.closest('header');
    if (header) setMenuTop(Math.ceil(header.getBoundingClientRect().bottom));
    setProductsOpen(true);
  };

  const scheduleClose = () => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      setProductsOpen(false);
      closeTimer.current = null;
    }, 180);
  };

  const closeMenu = () => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
    setProductsOpen(false);
  };

  useEffect(() => {
    if (!productsOpen) return;

    function onPointerDown(event: PointerEvent) {
      const target = event.target;
      if (
        target instanceof Node &&
        !productsRef.current?.contains(target) &&
        !menuRef.current?.contains(target)
      ) {
        closeMenu();
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeMenu();
        productsButtonRef.current?.focus();
      }
    }

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [productsOpen]);

  useEffect(() => () => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
  }, []);

  const navItems = [
    { name: 'Giới thiệu', href: '/cau-chuyen', isActive: pathname === '/cau-chuyen' },
    ...(isAuthenticated
      ? [{ name: 'Đơn hàng', href: '/tai-khoan/don-hang', isActive: pathname.startsWith('/tai-khoan/don-hang') }]
      : [{ name: 'Tra cứu đơn', href: '/tra-cuu-don', isActive: pathname === '/tra-cuu-don' }]),
  ];
  const idleLinkStyle = isHomepage
    ? 'text-[#fff1d1] drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] hover:text-[#ffdc83]'
    : 'text-[#c9b69a]/80 hover:text-[#f3dfae]';
  const activeLinkStyle = isHomepage
    ? 'font-bold text-[#ffdf91] drop-shadow-[0_1px_4px_rgba(0,0,0,1)]'
    : 'font-bold text-[#f3dfae] drop-shadow-[0_0_8px_rgba(243,223,174,0.4)]';
  const homepageFocusStyle = isHomepage
    ? 'focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3dfae]'
    : '';

  const megaMenu = !portalTarget
    ? null
    : createPortal(
      <div
        ref={menuRef}
        id={productsMenuId}
        aria-label="Khám phá sản phẩm"
        aria-hidden={!productsOpen}
        onMouseEnter={openMenu}
        onMouseLeave={scheduleClose}
        style={{ top: `${menuTop}px`, maxHeight: `calc(100dvh - ${menuTop}px - 1rem)` }}
        className={`fixed left-1/2 z-[60] hidden w-[calc(100vw-2rem)] max-w-[960px] -translate-x-1/2 overflow-y-auto overscroll-contain rounded-2xl border border-[#5c2b12] bg-[#180702] text-[#f3dfae] shadow-[0_18px_45px_rgba(0,0,0,0.45)] transition-[opacity,transform,visibility] duration-200 ease-out lg:block ${productsOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0 pointer-events-none'}`}
      >
        <ProductMegaMenu data={productMenu} onNavigate={closeMenu} />
      </div>,
      portalTarget,
    );

  return (
    <>
      <nav aria-label="Điều hướng chính" className={`hidden min-w-0 flex-wrap items-center gap-x-4 gap-y-0 rounded-full px-4 lg:flex font-medium text-xs tracking-wide xl:gap-x-5 xl:px-5 xl:text-sm ${isHomepage ? 'border border-[#c59a4b]/35 bg-[#120401]/35 shadow-[0_6px_24px_rgba(0,0,0,0.25)] backdrop-blur-[2px]' : ''}`}>
        <Link
          href="/"
          aria-current={pathname === '/' ? 'page' : undefined}
          className={`relative inline-flex min-h-11 items-center whitespace-nowrap transition-all duration-300 ${homepageFocusStyle} ${pathname === '/'
            ? activeLinkStyle
            : idleLinkStyle
            }`}
        >
          Trang Chủ
          {pathname === '/' && <span className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full bg-gradient-to-r from-[#c59a4b] via-[#f3dfae] to-[#c59a4b] shadow-[0_0_10px_#c59a4b]" />}
        </Link>

        <div
          ref={productsRef}
          className="relative inline-flex min-h-11 items-center"
          onMouseEnter={openMenu}
          onMouseLeave={scheduleClose}
          onFocus={openMenu}
          onBlur={(event) => {
            const next = event.relatedTarget;
            if (
              !(next instanceof Node && event.currentTarget.contains(next)) &&
              !(next instanceof Node && menuRef.current?.contains(next))
            ) scheduleClose();
          }}
        >
          <Link
            href="/san-pham"
            aria-current={pathname.startsWith('/san-pham') ? 'page' : undefined}
            className={`relative inline-flex min-h-11 items-center whitespace-nowrap transition-all duration-300 ${homepageFocusStyle} ${pathname.startsWith('/san-pham')
              ? activeLinkStyle
              : idleLinkStyle
              }`}
          >
            Sản Phẩm
            {pathname.startsWith('/san-pham') && <span className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full bg-gradient-to-r from-[#c59a4b] via-[#f3dfae] to-[#c59a4b] shadow-[0_0_10px_#c59a4b]" />}
          </Link>
          <button
            ref={productsButtonRef}
            type="button"
            aria-label="Mở mega menu sản phẩm"
            aria-haspopup="true"
            aria-expanded={productsOpen}
            aria-controls={productsMenuId}
            onClick={openMenu}
            className={`ml-1 inline-flex h-8 w-7 items-center justify-center transition-colors ${isHomepage ? 'text-[#fff1d1] drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] hover:text-[#ffdc83]' : 'text-[#c9b69a]/80 hover:text-[#f3dfae]'} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37]`}
          >
            <ChevronDown aria-hidden className={`h-3.5 w-3.5 transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

      {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={item.isActive ? 'page' : undefined}
            className={`relative inline-flex min-h-11 items-center whitespace-nowrap transition-all duration-300 ${homepageFocusStyle} ${item.isActive
              ? activeLinkStyle
              : idleLinkStyle
              }`}
          >
            {item.name}
            {item.isActive && <span className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full bg-gradient-to-r from-[#c59a4b] via-[#f3dfae] to-[#c59a4b] shadow-[0_0_10px_#c59a4b]" />}
          </Link>
        ))}
      </nav>
      {megaMenu}
    </>
  );
}
