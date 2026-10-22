'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

/**
 * Error boundary toàn cục.
 *
 * Dùng cho trường hợp `requireUser()`/`requireAdmin()` NÉM `AuthUnavailableError`
 * (không đọc được phiên do mạng chậm/timeout). Đây KHÔNG phải đăng xuất:
 * người dùng vẫn giữ nguyên phiên, chỉ cần bấm "Thử lại".
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const isAuthUnavailable = error.name === 'AuthUnavailableError';

  useEffect(() => {
    console.error('[app/error]', error.name, error.message);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#120401] px-4 py-10 text-[#f3dfae]">
      <div className="w-full max-w-lg space-y-5 rounded-3xl border border-[#5c2b12] bg-[#180702] p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#a33b20] bg-[#2a0707] text-[#e08a8a]">
          <AlertCircle aria-hidden className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-2xl font-bold text-[#c59a4b]">
            {isAuthUnavailable ? 'Chưa kết nối được máy chủ xác thực' : 'Đã xảy ra lỗi'}
          </h1>
          <p className="text-sm leading-relaxed text-[#c9b69a]">
            {isAuthUnavailable
              ? 'Kết nối tới Supabase đang chậm hoặc chập. Bạn VẪN ĐANG ĐĂNG NHẬP — chỉ cần thử lại, không cần đăng nhập lại.'
              : 'Vui lòng thử lại. Nếu lỗi lặp lại, hãy gọi hotline 0901 000 000.'}
          </p>
          {/* Mã lỗi chỉ hiện cho ca xác thực, và chỉ như thông tin phụ — không bao giờ là
              câu chính, vì người mua quà Tết không đọc mã lỗi. */}
          {isAuthUnavailable && error.message ? (
            <p className="font-mono text-xs text-[#c9b69a]">{error.message}</p>
          ) : null}
        </div>

        <div className="flex flex-col justify-center gap-3 pt-1 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#b8863b] via-[#d4af37] to-[#b8863b] px-5 py-3 text-sm font-bold text-[#120401] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3dfae]"
          >
            <RefreshCw aria-hidden className="h-4 w-4" /> Thử lại
          </button>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#5c2b12] px-5 py-3 text-sm font-semibold text-[#f3dfae] transition-colors hover:border-[#c59a4b]"
          >
            <Home aria-hidden className="h-4 w-4" /> Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
