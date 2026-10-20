'use client';

import { useActionState, useState } from 'react';
import Link from 'next/link';
import { requestResetAction, ActionResponse } from '@/lib/actions/auth';
import AuthBrand from '@/components/auth/AuthBrand';
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle2, Mail } from 'lucide-react';

const initialState: ActionResponse = { success: false };

export default function QuenMatKhauPage() {
  const [state, formAction, isPending] = useActionState(requestResetAction, initialState);
  const [email, setEmail] = useState('');

  return (
    <main
      className="auth-scene auth-forgot-scene fixed inset-0 z-[100] isolate flex min-h-0 items-center justify-center overflow-x-hidden overflow-y-auto px-4 py-6 text-[#29170f] selection:bg-[#861b1b]/20 selection:text-[#29170f] sm:px-6 sm:py-8"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgb(40 19 9 / 18%), rgb(40 19 9 / 8%) 48%, rgb(40 19 9 / 20%)), linear-gradient(180deg, rgb(38 19 10 / 10%), transparent 34%, rgb(38 19 10 / 14%)), url('/images/register-backgruond.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center 52%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <section
        aria-labelledby="forgot-password-title"
        className="auth-forgot-card relative z-10 w-full max-w-[420px] rounded-2xl border border-white/70 bg-[#fffaf0]/95 px-6 py-7 shadow-[0_18px_55px_rgba(43,20,8,0.28)] sm:px-9 sm:py-8"
      >
        <header className="mb-7 text-center">
          <AuthBrand />
          <h1
            id="forgot-password-title"
            className="font-serif text-[1.8rem] font-bold leading-tight tracking-[-0.02em] text-[#301a12]"
          >
            Quên mật khẩu?
          </h1>
          <p className="mx-auto mt-2 max-w-[34ch] text-sm leading-6 text-[#634b39]">
            Đừng lo lắng! Hãy nhập email đã đăng ký để nhận hướng dẫn đặt lại mật khẩu.
          </p>
        </header>

        {state?.success && state.message && (
          <div
            role="status"
            className="mb-5 flex items-start gap-2.5 rounded-xl border border-emerald-800/20 bg-emerald-50 px-3.5 py-3 text-sm leading-5 text-emerald-900"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{state.message}</span>
          </div>
        )}

        {!state?.success && state?.message && !state?.fieldErrors?.email && (
          <div
            role="alert"
            className="mb-5 flex items-start gap-2.5 rounded-xl border border-[#a33b20]/30 bg-[#fcece5] px-3.5 py-3 text-sm leading-5 text-[#702414]"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{state.message}</span>
          </div>
        )}

        <form action={formAction} aria-busy={isPending} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#38251a]" htmlFor="forgot-email">
              Địa chỉ email
            </label>
            <div className="relative">
              <Mail
                className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#76502f]"
                aria-hidden="true"
              />
              <input
                id="forgot-email"
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="ten@vidu.vn"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-invalid={Boolean(state?.fieldErrors?.email)}
                aria-describedby={state?.fieldErrors?.email ? 'forgot-email-error' : undefined}
                className="w-full rounded-xl border border-[#d9cbb5] bg-white/85 px-4 py-3 pl-11 text-base text-[#29170f] caret-[#861b1b] placeholder:text-[#806f5e] transition-colors focus:border-[#861b1b] focus:outline-none focus:ring-2 focus:ring-[#861b1b]/20"
              />
            </div>
            {state?.fieldErrors?.email && (
              <p id="forgot-email-error" className="pl-1 text-sm text-[#702414]">
                {state.fieldErrors.email[0]}
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
                <span
                  className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                  aria-hidden="true"
                />
                Đang gửi...
              </>
            ) : (
              <>Gửi liên kết đặt lại mật khẩu <ArrowRight className="h-4 w-4" aria-hidden="true" /></>
            )}
          </button>
        </form>

        <div className="mt-6 border-t border-[#dfd2bf] pt-5 text-center">
          <Link
            href="/dang-nhap"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-3 text-sm font-semibold text-[#7a271e] underline-offset-4 transition-colors hover:bg-[#f2e8d8] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#861b1b]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Quay lại đăng nhập
          </Link>
        </div>
      </section>
    </main>
  );
}
