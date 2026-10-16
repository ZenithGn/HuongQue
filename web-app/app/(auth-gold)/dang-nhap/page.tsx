'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { loginAction, ActionResponse } from '@/lib/actions/auth';
import { Mail, Lock, AlertCircle, ArrowRight, LogIn, CheckCircle2 } from 'lucide-react';

const initialState: ActionResponse = {
  success: false,
};

const CARD_CLASS =
  'w-full max-w-md rounded-2xl border border-[#5c2b12]/80 bg-[#180702]/90 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-md relative overflow-hidden text-[#f3dfae]';

// Placeholder dùng tông vàng nâu sáng (#a98a5f) để đạt tương phản ≥4.5:1 trên nền #120401.
const INPUT_CLASS =
  'w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#120401]/90 border border-[#5c2b12] text-xs text-[#f3dfae] placeholder-[#a98a5f] caret-[#d4af37] focus:outline-none focus:border-[#c59a4b] focus:ring-1 focus:ring-[#c59a4b] transition-all';

const LABEL_CLASS = 'block text-xs font-medium text-[#c9b69a]';
const ICON_CLASS = 'absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#c49a52]';

export default function DangNhapPage() {
  const searchParams = useSearchParams();
  const nextParam = searchParams.get('next') || '/';
  const justRegistered = searchParams.get('registered') === '1';
  const linkError = searchParams.get('error');

  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <div className={CARD_CLASS}>
      {/* Viền sáng ánh kim tinh tế phía trên */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#c59a4b]/60 to-transparent"
        aria-hidden="true"
      />

      {/* Header Form */}
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-2xl font-serif font-black text-[#f3dfae] tracking-tight">
          Đăng Nhập Tài Khoản
        </h1>
        <p className="text-xs text-[#c9b69a]">
          Đăng nhập để theo dõi đơn hàng và nhận ưu đãi Tết độc quyền
        </p>
      </div>

      {/* Thông báo đăng ký thành công */}
      {justRegistered && (
        <div className="mb-5 p-3.5 rounded-xl bg-[#34d399]/10 border border-[#34d399]/40 text-[#34d399] text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-[#34d399]" />
          <span>Đăng ký thành công! Hãy đăng nhập bằng thông tin vừa tạo.</span>
        </div>
      )}

      {/* Thông báo lỗi link xác nhận */}
      {linkError && (
        <div className="mb-5 p-3.5 rounded-xl bg-[#2a0707]/80 border border-[#a33b20]/80 text-rose-300 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>
            Link xác nhận không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập hoặc yêu cầu link mới.
          </span>
        </div>
      )}

      {/* Thông báo lỗi server/xác thực */}
      {state?.message && !state.success && (
        <div className="mb-5 p-3.5 rounded-xl bg-[#2a0707]/80 border border-[#a33b20]/80 text-rose-300 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{state.message}</span>
        </div>
      )}

      {/* Thông báo thành công từ server */}
      {state?.success && state.message && (
        <div className="mb-5 p-3.5 rounded-xl bg-[#34d399]/10 border border-[#34d399]/40 text-[#34d399] text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-[#34d399]" />
          <span>{state.message}</span>
        </div>
      )}

      {/* Form Nhập Liệu */}
      <form action={formAction} className="space-y-5">
        <input type="hidden" name="next" value={nextParam} />

        {/* Ô nhập Email */}
        <div className="space-y-1.5">
          <label className={LABEL_CLASS} htmlFor="login-email">
            Địa chỉ Email
          </label>
          <div className="relative">
            <div className={ICON_CLASS}>
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="login-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="ten@vidu.vn"
              className={INPUT_CLASS}
            />
          </div>
          {state?.fieldErrors?.email && (
            <p className="text-[11px] text-rose-400 pl-1">{state.fieldErrors.email[0]}</p>
          )}
        </div>

        {/* Ô nhập Mật khẩu */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className={LABEL_CLASS} htmlFor="login-password">
              Mật khẩu
            </label>
            <Link
              href="/quen-mat-khau"
              className="text-[11px] text-[#c49a52] hover:text-[#f3dfae] hover:underline transition-colors"
            >
              Quên mật khẩu?
            </Link>
          </div>
          <div className="relative">
            <div className={ICON_CLASS}>
              <Lock className="w-4 h-4" />
            </div>
            <input
              id="login-password"
              type="password"
              name="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className={INPUT_CLASS}
            />
          </div>
          {state?.fieldErrors?.password && (
            <p className="text-[11px] text-rose-400 pl-1">{state.fieldErrors.password[0]}</p>
          )}
        </div>

        {/* Nút Đăng nhập */}
        <button
          type="submit"
          disabled={isPending}
          className="group w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#b8863b] via-[#d4af37] to-[#b8863b] text-[#120401] font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:brightness-110 hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <LogIn className="w-4 h-4" />
          <span>{isPending ? 'Đang xác thực...' : 'Đăng nhập ngay'}</span>
        </button>
      </form>

      {/* Chuyển hướng tới Đăng ký */}
      <div className="mt-8 pt-6 border-t border-[#381a0b] text-center text-xs text-[#c9b69a]">
        Chưa có tài khoản quà Tết?{' '}
        <Link
          href="/dang-ky"
          className="font-bold text-[#c59a4b] hover:text-[#f3dfae] hover:underline transition-colors inline-flex items-center gap-1"
        >
          Đăng ký ngay <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
