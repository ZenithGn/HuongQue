'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { requestResetAction, ActionResponse } from '@/lib/actions/auth';
import { Mail, AlertCircle, CheckCircle2, ArrowLeft, KeyRound } from 'lucide-react';

const initialState: ActionResponse = { success: false };

export default function QuenMatKhauPage() {
  const [state, formAction, isPending] = useActionState(requestResetAction, initialState);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-serif font-black text-[#f3dfae]">Quên Mật Khẩu</h2>
        <p className="text-xs text-[#c9b69a]">
          Nhập email đã đăng ký, chúng tôi sẽ gửi link đặt lại mật khẩu
        </p>
      </div>

      {state?.message && (
        <div
          className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
            state.success
              ? 'bg-[#34d399]/10 border-[#34d399]/40 text-[#34d399]'
              : 'bg-[#2a0707]/80 border-[#a33b20] text-rose-300'
          }`}
        >
          {state.success ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#34d399] mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
          )}
          <span>{state.message}</span>
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#c9b69a] block">Địa chỉ Email</label>
          <div className="relative">
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="ten@vidu.vn"
              className="w-full px-4 py-2.5 pl-10 rounded-xl bg-[#120401] border border-[#5c2b12] text-[#f3dfae] placeholder-[#a98a5f] focus:outline-none focus:border-[#c59a4b] text-xs transition-colors"
            />
            <Mail className="w-4 h-4 text-[#a98a5f] absolute left-3.5 top-3" />
          </div>
          {state?.fieldErrors?.email && (
            <p className="text-[11px] text-rose-400">{state.fieldErrors.email[0]}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#b8863b] to-[#d4af37] text-[#120401] font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#c59a4b]/20 disabled:opacity-50"
        >
          <KeyRound className="w-4 h-4" />
          <span>{isPending ? 'Đang gửi...' : 'Gửi link đặt lại'}</span>
        </button>
      </form>

      <div className="text-center pt-2 border-t border-[#5c2b12] text-xs text-[#c9b69a]">
        <Link
          href="/dang-nhap"
          className="text-[#c59a4b] font-semibold hover:underline inline-flex items-center gap-1"
        >
          <ArrowLeft className="w-3 h-3" /> Về trang đăng nhập
        </Link>
      </div>
    </div>
  );
}
