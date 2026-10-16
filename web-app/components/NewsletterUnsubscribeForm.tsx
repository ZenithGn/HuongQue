'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { CheckCircle2, AlertCircle, MailX } from 'lucide-react';
import {
  confirmUnsubscribeAction,
  type UnsubscribeState,
} from '@/lib/actions/newsletter';

const initialState: UnsubscribeState = { success: false, message: '' };

const INVALID_MESSAGE = 'Link hủy đăng ký không hợp lệ hoặc đã được sử dụng.';

/**
 * Trang /huy-dang-ky cần một cú bấm xác nhận thay vì hủy ngay khi mở link:
 * tránh việc email client/bot prefetch link làm khách bị hủy đăng ký ngoài ý muốn.
 */
export function NewsletterUnsubscribeForm({ token }: { token: string | null }) {
  const [state, formAction, isPending] = useActionState(confirmUnsubscribeAction, initialState);

  const done = state.message !== '' && state.success;
  const failed = state.message !== '' && !state.success;

  if (done || failed) {
    return (
      <div
        className={`rounded-3xl border p-8 sm:p-10 space-y-6 text-center ${
          done ? 'bg-[#34d399]/10 border-[#34d399]/40' : 'bg-[#2a0707]/40 border-[#a33b20]/60'
        }`}
      >
        <div
          className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center border ${
            done
              ? 'bg-[#34d399]/10 border-[#34d399]/40 text-[#34d399]'
              : 'bg-[#861b1b]/10 border-[#a33b20]/50 text-rose-400'
          }`}
        >
          {done ? <CheckCircle2 className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#f3dfae]">
            {done ? 'Đã Hủy Đăng Ký Nhận Tin' : 'Không Thể Hủy Đăng Ký'}
          </h1>
          <p
            className={`text-sm leading-relaxed ${
              done ? 'text-[#34d399]/90' : 'text-rose-200/90'
            }`}
          >
            {state.message}
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-[#c59a4b] text-[#120401] font-bold text-xs uppercase tracking-wider hover:bg-[#d4af37] transition-colors"
          >
            Về trang chủ
          </Link>
          <Link
            href="/san-pham"
            className="px-6 py-3 rounded-xl border border-[#5c2b12] text-[#c9b69a] font-semibold text-xs hover:bg-[#180702] transition-colors"
          >
            Xem quà Tết
          </Link>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="rounded-3xl border border-[#a33b20]/60 bg-[#2a0707]/40 p-8 sm:p-10 space-y-6 text-center">
        <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center border border-[#a33b20]/50 bg-[#861b1b]/10 text-rose-400">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-serif font-black text-[#f3dfae]">Không Thể Hủy Đăng Ký</h1>
        <p className="text-sm text-rose-200/90">{INVALID_MESSAGE}</p>
        <div className="p-4 rounded-2xl bg-[#120401]/60 border border-[#5c2b12] text-left text-xs text-[#c9b69a] space-y-2">
          <p className="flex items-start gap-2">
            <MailX className="w-4 h-4 text-[#c59a4b] shrink-0 mt-0.5" />
            <span>
              Nếu bạn vẫn nhận được email ngoài ý muốn, hãy liên hệ{' '}
              <a href="mailto:lienhe@huongque.vn" className="text-[#c59a4b] hover:underline">
                lienhe@huongque.vn
              </a>{' '}
              hoặc hotline 0901 000 000 để được hỗ trợ xóa dữ liệu theo Nghị định 13/2023.
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-[#5c2b12] bg-[#180702]/70 p-8 sm:p-10 space-y-6 text-center">
      <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center border border-[#5c2b12]/50 bg-[#c59a4b]/10 text-[#c59a4b]">
        <MailX className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#f3dfae]">
          Xác Nhận Hủy Đăng Ký
        </h1>
        <p className="text-sm text-[#c9b69a] leading-relaxed">
          Bạn sắp ngừng nhận email khuyến mãi quà Tết từ Hương Quê. Bấm nút bên dưới để hoàn tất.
        </p>
      </div>

      <form action={formAction} className="pt-2">
        <input type="hidden" name="token" value={token} />
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-3 rounded-xl bg-[#861b1b] text-rose-50 font-bold text-xs uppercase tracking-wider hover:bg-[#861b1b] transition-colors disabled:opacity-50"
        >
          {isPending ? 'Đang xử lý…' : 'Xác nhận hủy đăng ký'}
        </button>
      </form>

      <p className="text-[11px] text-[#a98a5f]">
        Nếu bạn đổi ý, chỉ cần đóng trang này — đăng ký của bạn vẫn được giữ nguyên.
      </p>
    </div>
  );
}
