"use client";

import { Suspense } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Shell cho 2 trang auth có thiết kế riêng: **đăng nhập** và **đăng ký**.
 *
 * Vì sao tách khỏi `(auth)/layout.tsx`: layout cũ render khối thương hiệu
 * "vòng tròn cam + HƯƠNG QUÊ" nằm TRÊN card, và trang đăng nhập lại tự vẽ thêm
 * một logo hoa mai của riêng nó — thành ra hai logo chồng nhau. Hai trang này
 * không dùng khối cam nữa; nhận diện thương hiệu nằm ở logo hoa mai ngay trên card.
 *
 * Trang **quên mật khẩu** và **đặt lại mật khẩu** vẫn dùng `(auth)/layout.tsx` như cũ.
 *
 * Route group `(auth-gold)` không xuất hiện trong URL: `/dang-nhap` và `/dang-ky` giữ nguyên.
 */
export default function AuthGoldLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="auth-gold-shell min-h-screen bg-[#120401] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#381a0b]/40 via-[#120401] to-[#0a0200] flex flex-col items-center justify-center px-4 py-12 text-[#f3dfae] selection:bg-[#c59a4b]/30 selection:text-[#fff7e0]">
      {pathname !== '/dang-nhap' && pathname !== '/dang-ky' && (
        <Link
          href="/"
          className="group mb-8 flex items-center gap-3 rounded-2xl transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59a4b] focus-visible:ring-offset-4 focus-visible:ring-offset-[#120401]"
        >
        <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#c59a4b]/60 bg-gradient-to-br from-[#381a0b] to-[#120401] p-2 shadow-[0_0_15px_rgba(197,154,75,0.25)] transition-all group-hover:border-[#f3dfae] group-hover:shadow-[0_0_20px_rgba(243,223,174,0.4)]">
          <svg
            className="h-7 w-7 text-[#c59a4b] transition-colors group-hover:text-[#f3dfae]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
            <path
              d="M12 3c-1.5 3-4 4.5-7 4.5 3 3 4.5 5.5 4.5 8.5 3-1.5 5.5-1.5 8.5 0 0-3 1.5-5.5 4.5-8.5-3 0-5.5-1.5-7-4.5z"
              fill="currentColor"
              fillOpacity="0.15"
            />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="font-serif text-2xl font-black tracking-wider text-[#f3dfae] transition-colors group-hover:text-white">
            HƯƠNG QUÊ
          </span>
          <span className="-mt-1 text-[9px] font-medium uppercase tracking-[0.25em] text-[#c59a4b]">
            Tinh Hoa Quà Việt
          </span>
        </div>
        </Link>
      )}

      <Suspense
        fallback={<div className="py-10 text-center text-xs text-[#c9b69a]">Đang tải giao diện...</div>}
      >
        {children}
      </Suspense>
    </div>
  );
}
