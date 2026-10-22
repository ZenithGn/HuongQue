'use client';

import { useActionState, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { loginAction, ActionResponse } from '@/lib/actions/auth';
import AuthBrand from '@/components/auth/AuthBrand';
import AuthPageTransition from '@/components/auth/AuthPageTransition';
import AuthTransitionLink from '@/components/auth/AuthTransitionLink';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from 'lucide-react';

const initialState: ActionResponse = { success: false };

const inputClass =
  'w-full rounded-xl border border-[#d9cbb5] bg-white/85 px-4 py-3 text-base text-[#29170f] placeholder:text-[#806f5e] caret-[#861b1b] transition-colors focus:border-[#861b1b] focus:outline-none focus:ring-2 focus:ring-[#861b1b]/20';

export default function DangNhapPage() {
  const searchParams = useSearchParams();
  const nextParam = searchParams.get('next') || '/';
  const justRegistered = searchParams.get('registered') === '1';
  const linkError = searchParams.get('error');
  const [state, formAction, isPending] = useActionState(loginAction, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main
      className="login-scene fixed inset-0 z-[100] isolate flex min-h-0 items-center justify-center overflow-x-hidden overflow-y-auto bg-[#2a1309] px-4 py-6 text-[#29170f] selection:bg-[#861b1b]/20 selection:text-[#29170f] sm:px-6 sm:py-8"
    >
      <AuthPageTransition name="auth-login">
        <div aria-hidden="true" className="auth-page-backdrop absolute inset-0" style={{
        backgroundImage:
          "linear-gradient(90deg, rgb(40 19 9 / 18%), rgb(40 19 9 / 8%) 48%, rgb(40 19 9 / 20%)), linear-gradient(180deg, rgb(38 19 10 / 10%), transparent 34%, rgb(38 19 10 / 14%)), url('/images/login-background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center 54%',
        backgroundRepeat: 'no-repeat',
        }} />
      </AuthPageTransition>

      <Link
        href="/"
        className="absolute left-5 top-5 z-10 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/50 bg-[#fffaf0]/85 px-4 text-sm font-semibold text-[#502c1b] shadow-[0_4px_16px_rgba(43,20,8,0.12)] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#861b1b] sm:left-8 sm:top-8"
      >
        <span aria-hidden="true">←</span> Về trang chủ
      </Link>

      <AuthPageTransition name="auth-login">
      <section
        aria-labelledby="login-title"
        className="login-card auth-entry-card relative z-10 w-full max-w-[420px] rounded-2xl border border-white/70 bg-[#fffaf0]/95 px-6 py-7 shadow-[0_18px_55px_rgba(43,20,8,0.28)] sm:px-9 sm:py-8"
      >
        <header className="mb-7 text-center">
          <AuthBrand />
          <h1 id="login-title" className="font-serif text-[1.85rem] font-bold leading-tight tracking-[-0.02em] text-[#301a12]">
            Đăng nhập
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#634b39]">
            Chào mừng bạn trở lại. Cùng chuẩn bị món quà Tết thật trọn vẹn.
          </p>
        </header>

        {justRegistered && (
          <div role="status" className="mb-5 flex gap-2.5 rounded-xl border border-emerald-800/20 bg-emerald-50 px-3.5 py-3 text-sm leading-5 text-emerald-900">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            <span>Đăng ký thành công! Hãy đăng nhập bằng thông tin vừa tạo.</span>
          </div>
        )}

        {linkError && (
          <div role="alert" className="mb-5 flex gap-2.5 rounded-xl border border-[#a33b20]/30 bg-[#fcece5] px-3.5 py-3 text-sm leading-5 text-[#702414]">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>Link xác nhận không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập hoặc yêu cầu link mới.</span>
          </div>
        )}

        {state?.message && !state.success && (
          <div role="alert" className="mb-5 flex gap-2.5 rounded-xl border border-[#a33b20]/30 bg-[#fcece5] px-3.5 py-3 text-sm leading-5 text-[#702414]">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{state.message}</span>
          </div>
        )}

        {state?.success && state.message && (
          <div role="status" className="mb-5 flex gap-2.5 rounded-xl border border-emerald-800/20 bg-emerald-50 px-3.5 py-3 text-sm leading-5 text-emerald-900">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{state.message}</span>
          </div>
        )}

        <form action={formAction} className="space-y-5">
          <input type="hidden" name="next" value={nextParam} />

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#38251a]" htmlFor="login-email">
              Địa chỉ email
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#76502f]" aria-hidden="true" />
              <input
                id="login-email"
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="ten@vidu.vn"
                aria-invalid={Boolean(state?.fieldErrors?.email)}
                aria-describedby={state?.fieldErrors?.email ? 'login-email-error' : undefined}
                className={`${inputClass} pl-11`}
              />
            </div>
            {state?.fieldErrors?.email && (
              <p id="login-email-error" className="pl-1 text-sm text-[#702414]">{state.fieldErrors.email[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <label className="block text-sm font-semibold text-[#38251a]" htmlFor="login-password">
                Mật khẩu
              </label>
              <AuthTransitionLink
                href="/quen-mat-khau"
                direction="forward"
                className="rounded text-sm font-semibold text-[#7a271e] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#861b1b]"
              >
                Quên mật khẩu?
              </AuthTransitionLink>
            </div>
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#76502f]" aria-hidden="true" />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                autoComplete="current-password"
                placeholder="Nhập mật khẩu"
                aria-invalid={Boolean(state?.fieldErrors?.password)}
                aria-describedby={state?.fieldErrors?.password ? 'login-password-error' : undefined}
                className={`${inputClass} pl-11 pr-12`}
              />
              <button
                type="button"
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                aria-pressed={showPassword}
                onClick={() => setShowPassword((visible) => !visible)}
                className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-[#634b39] transition-colors hover:bg-[#f2e8d8] hover:text-[#4a2418] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#861b1b]"
              >
                {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
              </button>
            </div>
            {state?.fieldErrors?.password && (
              <p id="login-password-error" className="pl-1 text-sm text-[#702414]">{state.fieldErrors.password[0]}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#861b1b] px-4 py-3 text-sm font-bold text-[#fff9ed] shadow-[0_6px_16px_rgba(95,25,18,0.22)] transition-colors hover:bg-[#6f1416] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#861b1b] focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60"
          >
            {isPending ? (
              <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" /> Đang xác thực...</>
            ) : (
              <>Đăng nhập <ArrowRight className="h-4 w-4" aria-hidden="true" /></>
            )}
          </button>
        </form>

        <div className="mt-6 flex items-start justify-center gap-2 border-t border-[#dfd2bf] pt-5 text-center text-sm leading-6 text-[#634b39]">
          <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-[#76502f]" aria-hidden="true" />
          <span>
            Chưa có tài khoản?{' '}
            <AuthTransitionLink href="/dang-ky" direction="forward" className="font-bold text-[#7a271e] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#861b1b]">
              Đăng ký ngay
            </AuthTransitionLink>
          </span>
        </div>
      </section>
      </AuthPageTransition>
    </main>
  );
}

