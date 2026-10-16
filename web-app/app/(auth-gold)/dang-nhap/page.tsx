'use client';

import { useActionState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { loginAction, ActionResponse } from '@/lib/actions/auth';
import { Mail, Lock, AlertCircle, ArrowRight, LogIn, CheckCircle2, Sparkles } from 'lucide-react';

const initialState: ActionResponse = {
  success: false,
};

function LoginForm() {
  const searchParams = useSearchParams();
  const nextParam = searchParams.get('next') || '/';
  const justRegistered = searchParams.get('registered') === '1';
  const linkError = searchParams.get('error');

  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <div className="w-full max-w-md rounded-2xl border border-[#5c2b12]/80 bg-[#180702]/90 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-md relative overflow-hidden text-[#f3dfae]">
      {/* Viền sáng ánh kim tinh tế phía trên */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#c59a4b]/60 to-transparent" />

      {/* Header Form */}
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-[#c49a52] bg-[#210c04] px-3 py-1 rounded-full border border-[#5c2b12]/50">
          <Sparkles className="w-3 h-3 text-[#c59a4b]" />
          <span>Chào Mừng Quý Khách</span>
        </div>
        <h1 className="text-2xl font-serif font-black text-[#f3dfae] tracking-tight">
          Đăng Nhập Tài Khoản
        </h1>
        <p className="text-xs text-[#c9b69a]">
          Đăng nhập để theo dõi đơn hàng và nhận ưu đãi Tết độc quyền
        </p>
      </div>

      {/* Thông báo đăng ký thành công */}
      {justRegistered && (
        <div className="mb-5 p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>Đăng ký thành công! Hãy đăng nhập bằng thông tin vừa tạo.</span>
        </div>
      )}

      {/* Thông báo lỗi link xác nhận */}
      {linkError && (
        <div className="mb-5 p-3.5 rounded-xl bg-red-950/80 border border-red-800/80 text-rose-300 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>Link xác nhận không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập hoặc yêu cầu link mới.</span>
        </div>
      )}

      {/* Thông báo lỗi server/xác thực */}
      {state?.message && !state.success && (
        <div className="mb-5 p-3.5 rounded-xl bg-red-950/80 border border-red-800/80 text-rose-300 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{state.message}</span>
        </div>
      )}

      {/* Thông báo thành công từ server */}
      {state?.success && state.message && (
        <div className="mb-5 p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>{state.message}</span>
        </div>
      )}

      {/* Form Nhập Liệu */}
      <form action={formAction} className="space-y-5">
        <input type="hidden" name="next" value={nextParam} />

        {/* Ô nhập Email */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-[#c9b69a]">
            Địa chỉ Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#c49a52]">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="ten@vidu.vn"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#120401]/90 border border-[#5c2b12] text-xs text-[#f3dfae] placeholder-[#78502a] focus:outline-none focus:border-[#c59a4b] focus:ring-1 focus:ring-[#c59a4b] transition-all"
            />
          </div>
          {state?.fieldErrors?.email && (
            <p className="text-[11px] text-rose-400 pl-1">{state.fieldErrors.email[0]}</p>
          )}
        </div>

        {/* Ô nhập Mật khẩu */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-medium text-[#c9b69a]">
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
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#c49a52]">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#120401]/90 border border-[#5c2b12] text-xs text-[#f3dfae] placeholder-[#78502a] focus:outline-none focus:border-[#c59a4b] focus:ring-1 focus:ring-[#c59a4b] transition-all"
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

export default function DangNhapPage() {
  return (
    <div className="min-h-screen bg-[#120401] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#381a0b]/40 via-[#120401] to-[#0a0200] flex flex-col items-center justify-center px-4 py-12 text-[#f3dfae]">

      {/* LOGO MẪU 1 (Họa tiết Hoa Mai cổ điển) */}
      <Link href="/" className="group flex items-center gap-3 mb-8 transition-transform hover:scale-105">
        <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#c59a4b]/60 bg-gradient-to-br from-[#381a0b] to-[#120401] p-2 shadow-[0_0_15px_rgba(197,154,75,0.25)] group-hover:border-[#f3dfae] group-hover:shadow-[0_0_20px_rgba(243,223,174,0.4)]">
          <svg className="h-7 w-7 text-[#c59a4b] group-hover:text-[#f3dfae] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
            <path d="M12 3c-1.5 3-4 4.5-7 4.5 3 3 4.5 5.5 4.5 8.5 3-1.5 5.5-1.5 8.5 0 0-3 1.5-5.5 4.5-8.5-3 0-5.5-1.5-7-4.5z" fill="currentColor" fillOpacity="0.15" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="font-serif text-2xl font-black tracking-wider text-[#f3dfae] group-hover:text-white transition-colors">
            HƯƠNG QUÊ
          </span>
          <span className="text-[9px] font-medium tracking-[0.25em] text-[#c59a4b] uppercase -mt-1">
            Tinh Hoa Quà Việt
          </span>
        </div>
      </Link>

      {/* Form Đăng Nhập bọc trong Suspense */}
      <Suspense fallback={<div className="text-center py-10 text-[#c9b69a] text-xs">Đang tải giao diện...</div>}>
        <LoginForm />
      </Suspense>

    </div>
  );
}