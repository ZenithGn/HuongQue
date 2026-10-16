'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { registerAction, ActionResponse } from '@/lib/actions/auth';
import {
  User,
  Mail,
  Phone,
  Lock,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  UserPlus,
} from 'lucide-react';

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
const HINT_CLASS = 'text-[11px] text-[#c9b69a] pl-1';

export default function DangKyPage() {
  const [state, formAction, isPending] = useActionState(registerAction, initialState);

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
          Đăng Ký Thành Viên
        </h1>
        <p className="text-xs text-[#c9b69a]">
          Tạo tài khoản để nhận ưu đãi Tết và lưu sổ địa chỉ giao quà
        </p>
      </div>

      {/* Thông báo thành công */}
      {state?.success && state.message && (
        <div className="mb-5 p-3.5 rounded-xl bg-[#34d399]/10 border border-[#34d399]/40 text-[#34d399] text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-[#34d399]" />
          <span>{state.message}</span>
        </div>
      )}

      {/* Thông báo lỗi server */}
      {!state?.success && state?.message && (
        <div className="mb-5 p-3.5 rounded-xl bg-[#2a0707]/80 border border-[#a33b20]/80 text-rose-300 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{state.message}</span>
        </div>
      )}

      {/* Form Nhập Liệu */}
      <form action={formAction} className="space-y-5">
        {/* Họ và tên */}
        <div className="space-y-1.5">
          <label className={LABEL_CLASS} htmlFor="register-fullname">
            Họ và tên
          </label>
          <div className="relative">
            <div className={ICON_CLASS}>
              <User className="w-4 h-4" />
            </div>
            <input
              id="register-fullname"
              type="text"
              name="fullName"
              required
              autoComplete="name"
              placeholder="Nguyễn Văn An"
              className={INPUT_CLASS}
            />
          </div>
          {state?.fieldErrors?.fullName && (
            <p className="text-[11px] text-rose-400 pl-1">{state.fieldErrors.fullName[0]}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className={LABEL_CLASS} htmlFor="register-email">
            Địa chỉ Email
          </label>
          <div className="relative">
            <div className={ICON_CLASS}>
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="register-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="an.nguyen@vidu.vn"
              className={INPUT_CLASS}
            />
          </div>
          {state?.fieldErrors?.email && (
            <p className="text-[11px] text-rose-400 pl-1">{state.fieldErrors.email[0]}</p>
          )}
        </div>

        {/* Số điện thoại */}
        <div className="space-y-1.5">
          <label className={LABEL_CLASS} htmlFor="register-phone">
            Số điện thoại nhận hàng
          </label>
          <div className="relative">
            <div className={ICON_CLASS}>
              <Phone className="w-4 h-4" />
            </div>
            <input
              id="register-phone"
              type="tel"
              name="phone"
              required
              autoComplete="tel"
              inputMode="numeric"
              placeholder="0912345678"
              className={INPUT_CLASS}
            />
          </div>
          {state?.fieldErrors?.phone ? (
            <p className="text-[11px] text-rose-400 pl-1">{state.fieldErrors.phone[0]}</p>
          ) : (
            <p className={HINT_CLASS}>10 số, bắt đầu bằng 0 — dùng để liên hệ giao quà Tết.</p>
          )}
        </div>

        {/* Mật khẩu */}
        <div className="space-y-1.5">
          <label className={LABEL_CLASS} htmlFor="register-password">
            Mật khẩu
          </label>
          <div className="relative">
            <div className={ICON_CLASS}>
              <Lock className="w-4 h-4" />
            </div>
            <input
              id="register-password"
              type="password"
              name="password"
              required
              autoComplete="new-password"
              placeholder="••••••••"
              className={INPUT_CLASS}
            />
          </div>
          {state?.fieldErrors?.password ? (
            <p className="text-[11px] text-rose-400 pl-1">{state.fieldErrors.password[0]}</p>
          ) : (
            <p className={HINT_CLASS}>Tối thiểu 8 ký tự, có cả chữ và số.</p>
          )}
        </div>

        {/* Xác nhận mật khẩu */}
        <div className="space-y-1.5">
          <label className={LABEL_CLASS} htmlFor="register-confirm">
            Xác nhận mật khẩu
          </label>
          <div className="relative">
            <div className={ICON_CLASS}>
              <ShieldCheck className="w-4 h-4" />
            </div>
            <input
              id="register-confirm"
              type="password"
              name="confirmPassword"
              required
              autoComplete="new-password"
              placeholder="••••••••"
              className={INPUT_CLASS}
            />
          </div>
          {state?.fieldErrors?.confirmPassword && (
            <p className="text-[11px] text-rose-400 pl-1">{state.fieldErrors.confirmPassword[0]}</p>
          )}
        </div>

        {/* Nút Đăng ký */}
        <button
          type="submit"
          disabled={isPending}
          className="group w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#b8863b] via-[#d4af37] to-[#b8863b] text-[#120401] font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:brightness-110 hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <UserPlus className="w-4 h-4" />
          <span>{isPending ? 'Đang tạo tài khoản...' : 'Đăng ký ngay'}</span>
        </button>
      </form>

      {/* Chuyển hướng tới Đăng nhập */}
      <div className="mt-8 pt-6 border-t border-[#381a0b] text-center text-xs text-[#c9b69a]">
        Đã có tài khoản quà Tết?{' '}
        <Link
          href="/dang-nhap"
          className="font-bold text-[#c59a4b] hover:text-[#f3dfae] hover:underline transition-colors inline-flex items-center gap-1"
        >
          Đăng nhập ngay <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
