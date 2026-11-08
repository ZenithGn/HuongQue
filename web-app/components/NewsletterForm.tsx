'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { Mail, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { subscribeNewsletterAction, type NewsletterActionState } from '@/lib/actions/newsletter';

const initialState: NewsletterActionState = {
  success: false,
  status: 'error',
  message: '',
};

interface NewsletterFormProps {
  /** Cho phép tuỳ biến khung ngoài (trang chủ dùng khối lớn, footer dùng khối nhỏ). */
  className?: string;
  heading?: string;
  description?: string;
}

/**
 * F06 – Form đăng ký nhận bản tin.
 * Checkbox đồng ý nhận email là BẮT BUỘC (yêu cầu pháp lý – Nghị định 13/2023).
 *
 * Hệ thị giác: bề mặt Sơn Mài. Thành công và lỗi phân biệt bằng **icon + câu chữ**, không bằng
 * một bảng màu thứ ba — nền vẫn là Nâu Card, chỉ viền và mực đổi tông. Mọi chữ mang thông tin
 * đạt sàn 12px và dùng màu đặc.
 */
export function NewsletterForm({ className = '', heading, description }: NewsletterFormProps) {
  const [state, formAction, isPending] = useActionState(subscribeNewsletterAction, initialState);

  const hasMessage = Boolean(state?.message);
  const isSuccess = state?.success === true;

  return (
    <div className={className || 'space-y-4'}>
      {heading && (
        <div className="space-y-1">
          <h3 className="font-serif text-lg font-bold text-[#f3dfae]">{heading}</h3>
          {description && <p className="text-xs leading-relaxed text-[#c9b69a]">{description}</p>}
        </div>
      )}

      {hasMessage && (
        <div
          role="status"
          aria-live="polite"
          className={[
            'flex items-start gap-2.5 rounded-xl border p-3.5 text-xs',
            isSuccess
              ? 'border-[#c59a4b] bg-[#210c04] text-[#f3dfae]'
              : 'border-[#a33b20] bg-[#2a0707] text-[#e08a8a]',
          ].join(' ')}
        >
          {isSuccess ? (
            <CheckCircle2 aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-[#c59a4b]" />
          ) : (
            <AlertCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-[#e08a8a]" />
          )}
          <span>{state.message}</span>
        </div>
      )}

      <form action={formAction} className="space-y-3">
        <div className="space-y-1">
          <label htmlFor="newsletter-email" className="block text-xs font-semibold text-[#c9b69a]">
            Địa chỉ email
          </label>
          <div className="relative">
            <input
              id="newsletter-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              maxLength={254}
              placeholder="an.nguyen@vidu.vn"
              /* Lỗi phải được NỐI với ô nhập và được CÔNG BỐ, không chỉ hiện ra bằng màu:
                 trước đây trình đọc màn hình không hề biết có lỗi, cũng không biết lỗi thuộc ô nào. */
              aria-invalid={state?.fieldErrors?.email ? true : undefined}
              aria-describedby={state?.fieldErrors?.email ? 'newsletter-email-error' : undefined}
              className="min-h-11 w-full rounded-xl border border-[#5c2b12] bg-[#120401] py-2.5 pl-10 pr-4 text-xs text-[#f3dfae] caret-[#d4af37] transition-colors placeholder:text-[#a98a5f] focus:border-[#c59a4b] focus:outline-none"
            />
            <Mail aria-hidden className="absolute left-3.5 top-3 h-4 w-4 text-[#c59a4b]" />
          </div>
          {state?.fieldErrors?.email && (
            <p id="newsletter-email-error" role="alert" className="text-xs text-[#e08a8a]">
              {state.fieldErrors.email[0]}
            </p>
          )}
        </div>

        <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-[#c9b69a]">
          {/* Ô tick là điều kiện pháp lý bắt buộc: nâng lên 20px và để cả nhãn làm vùng chạm,
              vì bản thân ô 16px là mục tiêu quá nhỏ cho ngón tay. */}
          <input
            type="checkbox"
            name="consent"
            required
            aria-invalid={state?.fieldErrors?.consent ? true : undefined}
            aria-describedby={state?.fieldErrors?.consent ? 'newsletter-consent-error' : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-[#c59a4b]"
          />
          <span>
            Tôi đồng ý nhận email ưu đãi, bộ sưu tập quà Tết và lịch giao hàng từ Hương Quê. Tôi có thể hủy đăng ký bất cứ lúc nào.
          </span>
        </label>
        {state?.fieldErrors?.consent && (
          <p id="newsletter-consent-error" role="alert" className="text-xs text-[#e08a8a]">
            {state.fieldErrors.consent[0]}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="min-h-11 w-full rounded-xl bg-gradient-to-r from-[#b8863b] via-[#d4af37] to-[#b8863b] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#120401] transition-all hover:brightness-110 hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] disabled:cursor-not-allowed"
        >
          {isPending ? 'Đang đăng ký…' : 'Đăng ký nhận tin'}
        </button>
      </form>

      <p className="flex items-start gap-1.5 text-xs text-[#c9b69a]">
        <Info aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#c59a4b]" />
        <span>
          Email chỉ dùng để gửi bản tin khuyến mãi. Xem chi tiết tại{' '}
          <Link href="/chinh-sach-bao-mat" className="text-[#c59a4b] underline decoration-[#5c2b12] underline-offset-2 hover:text-[#f3dfae]">
            Chính sách bảo mật
          </Link>
          .
        </span>
      </p>
    </div>
  );
}
