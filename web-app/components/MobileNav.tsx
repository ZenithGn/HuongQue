'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X } from 'lucide-react';

interface MobileNavProps {
  isAuthenticated: boolean;
}

/**
 * Điều hướng dưới 1024px — lỗ hổng P0 của bản trước: nav desktop là `hidden lg:flex` và
 * **không có bản thay thế**, nên ở 1023px người dùng chỉ còn nút back của trình duyệt.
 *
 * Giữ đúng danh sách mục của NavLinks (≤5 mục) để hai bản không lệch nhau, thêm hành động
 * giỏ hàng vì trên điện thoại đó là đường ngắn nhất tới việc chốt đơn.
 */
export function MobileNav({ isAuthenticated }: MobileNavProps) {
  // Trạng thái mở gắn với pathname hiện tại: đổi trang là menu tự đóng, không cần effect —
  // và tránh được việc gọi setState ngay trong thân effect (gây render dây chuyền).
  const [openPath, setOpenPath] = useState<string | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const mien = searchParams.get('mien');
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const open = openPath === pathname;
  const setOpen = (value: boolean) => setOpenPath(value ? pathname : null);

  const navItems = [
    { name: 'Trang Chủ', href: '/', isActive: pathname === '/' },
    {
      name: 'Tất Cả Sản Phẩm',
      href: '/san-pham',
      isActive: pathname === '/san-pham' && mien !== 'ba_mien',
    },
    {
      name: 'Quà Tết Ba Miền',
      href: '/san-pham?mien=ba_mien',
      isActive: pathname === '/san-pham' && mien === 'ba_mien',
    },
    { name: 'Câu chuyện Hương Quê', href: '/cau-chuyen', isActive: pathname === '/cau-chuyen' },
    isAuthenticated
      ? {
          name: 'Đơn hàng của tôi',
          href: '/tai-khoan/don-hang',
          isActive: pathname.startsWith('/tai-khoan/don-hang'),
        }
      : { name: 'Tra cứu đơn', href: '/tra-cuu-don', isActive: pathname === '/tra-cuu-don' },
  ];

  // Đóng khi bấm Esc.
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpenPath(null);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? 'Đóng menu' : 'Mở menu'}
        className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#5c2b12] text-[#f3dfae] transition-colors hover:border-[#c59a4b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37]"
      >
        {open ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
      </button>

      {/*
        Panel và vùng chạm phải được PORTAL ra `body`, không nằm trong `<header>`.
        Lý do: `Header` có `backdrop-blur-md`, mà `backdrop-filter` khác `none` biến phần tử đó
        thành containing block cho hậu duệ `position: fixed` — nên `inset-0 top-16` sẽ giải theo
        hộp header cao 64px và scrim co lại còn 0 chiều cao, khiến bấm ra ngoài không đóng được.
      */}
      {open
        ? createPortal(
            <>
              {/* vùng chạm để đóng; không chặn click vào phần còn lại của trang */}
              <button
                type="button"
                aria-hidden
                tabIndex={-1}
                onClick={() => setOpen(false)}
                className="fixed inset-0 top-16 z-40 cursor-default bg-[#120401]/75 lg:hidden"
              />

              <nav
                id={panelId}
                aria-label="Điều hướng chính"
                className="fixed inset-x-0 top-16 z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-[#5c2b12] bg-[#180702] px-4 pt-3 shadow-[0_20px_40px_rgba(0,0,0,0.6)] safe-x safe-bottom lg:hidden"
              >
                <ul className="divide-y divide-[#381a0b]">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={item.isActive ? 'page' : undefined}
                        className={[
                          'flex min-h-11 items-center justify-between py-3 text-sm transition-colors',
                          item.isActive
                            ? 'font-bold text-[#f3dfae]'
                            : 'text-[#c9b69a] hover:text-[#f3dfae]',
                        ].join(' ')}
                      >
                        {item.name}
                        {item.isActive ? (
                          <span aria-hidden className="h-[2px] w-8 rounded-full bg-[#c59a4b]" />
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Cụm Đăng nhập/Đăng ký của header ẩn dưới 640px, nên hai lối vào nằm ở đây */}
                {!isAuthenticated ? (
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Link
                      href="/dang-nhap"
                      className="flex items-center justify-center rounded-xl border border-[#5c2b12] px-4 py-3 text-sm font-semibold text-[#f3dfae] transition-colors hover:border-[#78502a]"
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      href="/dang-ky"
                      className="flex items-center justify-center rounded-xl bg-[#c59a4b] px-4 py-3 text-sm font-semibold text-[#120401] transition-colors hover:bg-[#cca154]"
                    >
                      Đăng ký
                    </Link>
                  </div>
                ) : null}

                {/* Ô tìm kiếm của header ẩn dưới 640px, nên đường vào tìm kiếm nằm ở đây */}
                <Link
                  href="/tim-kiem"
                  className="mt-2 flex items-center justify-center rounded-xl border border-[#5c2b12] px-4 py-3 text-sm font-semibold text-[#c9b69a] transition-colors hover:border-[#78502a] hover:text-[#f3dfae]"
                >
                  Tìm quà theo tên hoặc vùng
                </Link>

                <Link
                  href="/gio-hang"
                  className="mt-2 flex items-center justify-center rounded-xl border border-[#c59a4b] px-4 py-3 text-sm font-semibold text-[#f3dfae] transition-colors hover:bg-[#210c04]"
                >
                  Xem giỏ hàng
                </Link>
              </nav>
            </>,
            document.body
          )
        : null}
    </div>
  );
}
