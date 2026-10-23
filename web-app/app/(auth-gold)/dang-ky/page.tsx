'use client';

import { useActionState, useState } from 'react';
import Link from 'next/link';
import { registerAction, ActionResponse } from '@/lib/actions/auth';
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
  Phone,
  UserRound,
} from 'lucide-react';

const initialState: ActionResponse = { success: false };

const inputClass =
  'w-full rounded-xl border border-[#d9cbb5] bg-white/85 px-4 py-2.5 text-base text-[#29170f] placeholder:text-[#806f5e] caret-[#861b1b] transition-colors focus:border-[#861b1b] focus:outline-none focus:ring-2 focus:ring-[#861b1b]/20';

export default function DangKyPage() {
  const [state, formAction, isPending] = useActionState(registerAction, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <main
      className="auth-scene auth-scene-register fixed inset-0 z-[100] isolate flex min-h-0 items-start justify-center overflow-x-hidden overflow-y-auto bg-[#2a1309] px-4 pb-6 pt-20 text-[#29170f] selection:bg-[#861b1b]/20 selection:text-[#29170f] sm:px-6 sm:pb-8 sm:pt-20"
    >
      <AuthPageTransition name="auth-register">
        <div aria-hidden="true" className="auth-page-backdrop absolute inset-0" style={{
        backgroundImage:
          "linear-gradient(90deg, rgb(40 19 9 / 18%), rgb(40 19 9 / 8%) 48%, rgb(40 19 9 / 20%)), linear-gradient(180deg, rgb(38 19 10 / 10%), transparent 34%, rgb(38 19 10 / 14%)), url('/images/register-background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center 52%',
        backgroundRepeat: 'no-repeat',
        }} />
      </AuthPageTransition>
      <Link
        href="/"
        className="absolute left-5 top-5 z-10 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/50 bg-[#fffaf0]/85 px-4 text-sm font-semibold text-[#502c1b] shadow-[0_4px_16px_rgba(43,20,8,0.12)] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#861b1b] sm:left-8 sm:top-8"
      >
        <ArrowRight className="h-4 w-4 rotate-180" aria-hidden="true" />
        Về trang chủ
      </Link>

      <AuthPageTransition name="auth-register">
      <section
        aria-labelledby="register-title"
        className="auth-entry-card relative z-10 mx-auto w-full max-w-[440px] rounded-2xl border border-white/70 bg-[#fffaf0]/95 px-6 py-6 shadow-[0_18px_55px_rgba(43,20,8,0.28)] sm:px-9 sm:py-7"
      >
        <header className="mb-5 text-center">
          <AuthBrand />
          <h1 id="register-title" className="font-serif text-[1.8rem] font-bold leading-tight tracking-[-0.02em] text-[#301a12]">
            Tạo tài khoản
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#634b39]">
            Tham gia Hương Quê để khám phá những giá trị truyền thống.
          </p>
        </header>

        {state?.success && state.message && (
          <div role="status" className="mb-4 flex gap-2.5 rounded-xl border border-emerald-800/20 bg-emerald-50 px-3.5 py-3 text-sm leading-5 text-emerald-900">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{state.message}</span>
          </div>
        )}

        {!state?.success && state?.message && (
          <div role="alert" className="mb-4 flex gap-2.5 rounded-xl border border-[#a33b20]/30 bg-[#fcece5] px-3.5 py-3 text-sm leading-5 text-[#702414]">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{state.message}</span>
          </div>
        )}

        <form action={formAction} className="space-y-3.5">
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-[#38251a]" htmlFor="register-fullname">
              Họ và tên
            </label>
            <div className="relative">
              <UserRound className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#76502f]" aria-hidden="true" />
              <input
                id="register-fullname"
                type="text"
                name="fullName"
                required
                autoComplete="name"
                placeholder="Nguyễn Văn An"
                aria-invalid={Boolean(state?.fieldErrors?.fullName)}
                aria-describedby={state?.fieldErrors?.fullName ? 'register-fullname-error' : undefined}
                className={`${inputClass} pl-11`}
              />
            </div>
            {state?.fieldErrors?.fullName && (
              <p id="register-fullname-error" className="pl-1 text-sm text-[#702414]">
                {state.fieldErrors.fullName[0]}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-[#38251a]" htmlFor="register-email">
              Địa chỉ email
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#76502f]" aria-hidden="true" />
              <input
                id="register-email"
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="ten@vidu.vn"
                aria-invalid={Boolean(state?.fieldErrors?.email)}
                aria-describedby={state?.fieldErrors?.email ? 'register-email-error' : undefined}
                className={`${inputClass} pl-11`}
              />
            </div>
            {state?.fieldErrors?.email && (
              <p id="register-email-error" className="pl-1 text-sm text-[#702414]">
                {state.fieldErrors.email[0]}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-[#38251a]" htmlFor="register-phone">
              Số điện thoại
            </label>
            <div className="relative">
              <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#76502f]" aria-hidden="true" />
              <input
                id="register-phone"
                type="tel"
                name="phone"
                required
                autoComplete="tel"
                inputMode="numeric"
                placeholder="0912345678"
                aria-invalid={Boolean(state?.fieldErrors?.phone)}
                aria-describedby={state?.fieldErrors?.phone ? 'register-phone-error' : 'register-phone-hint'}
                className={`${inputClass} pl-11`}
              />
            </div>
            {state?.fieldErrors?.phone ? (
              <p id="register-phone-error" className="pl-1 text-sm text-[#702414]">
                {state.fieldErrors.phone[0]}
              </p>
            ) : (
              <p id="register-phone-hint" className="pl-1 text-xs leading-5 text-[#634b39]">
                10 chữ số, bắt đầu bằng 0.
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-[#38251a]" htmlFor="register-password">
              Mật khẩu
            </label>
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#76502f]" aria-hidden="true" />
              <input
                id="register-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                autoComplete="new-password"
                placeholder="Tối thiểu 8 ký tự"
                aria-invalid={Boolean(state?.fieldErrors?.password)}
                aria-describedby={state?.fieldErrors?.password ? 'register-password-error' : 'register-password-hint'}
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
            {state?.fieldErrors?.password ? (
              <p id="register-password-error" className="pl-1 text-sm text-[#702414]">
                {state.fieldErrors.password[0]}
              </p>
            ) : (
              <p id="register-password-hint" className="pl-1 text-xs leading-5 text-[#634b39]">
                Tối thiểu 8 ký tự, có chữ và số.
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-[#38251a]" htmlFor="register-confirm">
              Xác nhận mật khẩu
            </label>
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#76502f]" aria-hidden="true" />
              <input
                id="register-confirm"
                type={showConfirmation ? 'text' : 'password'}
                name="confirmPassword"
                required
                autoComplete="new-password"
                placeholder="Nhập lại mật khẩu"
                aria-invalid={Boolean(state?.fieldErrors?.confirmPassword)}
                aria-describedby={state?.fieldErrors?.confirmPassword ? 'register-confirm-error' : undefined}
                className={`${inputClass} pl-11 pr-12`}
              />
              <button
                type="button"
                aria-label={showConfirmation ? 'Ẩn mật khẩu xác nhận' : 'Hiện mật khẩu xác nhận'}
                aria-pressed={showConfirmation}
                onClick={() => setShowConfirmation((visible) => !visible)}
                className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-lg text-[#634b39] transition-colors hover:bg-[#f2e8d8] hover:text-[#4a2418] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#861b1b]"
              >
                {showConfirmation ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
              </button>
            </div>
            {state?.fieldErrors?.confirmPassword && (
              <p id="register-confirm-error" className="pl-1 text-sm text-[#702414]">
                {state.fieldErrors.confirmPassword[0]}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#861b1b] px-4 py-3 text-sm font-bold text-[#fff9ed] shadow-[0_6px_16px_rgba(95,25,18,0.22)] transition-colors hover:bg-[#6f1416] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#861b1b] focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60"
          >
            {isPending ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
                Đang tạo tài khoản...
              </>
            ) : (
              <>Tạo tài khoản <ArrowRight className="h-4 w-4" aria-hidden="true" /></>
            )}
          </button>
        </form>

        <div className="mt-5 border-t border-[#dfd2bf] pt-4 text-center text-sm leading-6 text-[#634b39]">
          Đã có tài khoản?{' '}
          <AuthTransitionLink
            href="/dang-nhap"
            direction="back"
            className="font-bold text-[#7a271e] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#861b1b]"
          >
            Đăng nhập
          </AuthTransitionLink>
        </div>
      </section>
      </AuthPageTransition>
    </main>
  );
}

