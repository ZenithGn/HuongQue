'use client';

/**
 * Nút "Hủy đơn" (chỉ render khi đơn ở trạng thái `pending_payment` hoặc `confirmed`).
 *
 * Có bước xác nhận + lý do trước khi gọi Server Action `cancelOrderAction`.
 * Chỉ mã đơn được gửi lên; `order_id` và `payos_order_code` do server tự đọc lại từ DB.
 */

import { useActionState, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, Loader2, Trash2, X } from 'lucide-react';
import { cancelOrderAction, type CancelOrderState } from '@/lib/actions/customer-orders';

const MAX_REASON_LENGTH = 300;

export function CancelOrderDialog({ orderCode }: { orderCode: string }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('');
  const router = useRouter();

  const [state, formAction, isPending] = useActionState<CancelOrderState | null, FormData>(
    cancelOrderAction,
    null
  );

  useEffect(() => {
    if (state?.status === 'success') {
      router.refresh();
    }
  }, [state, router]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-xl border border-[#a33b20]/70 bg-[#2a0707]/40 px-4 py-2.5 text-sm font-semibold text-[#e08a8a] transition-colors hover:bg-[#2a0707]/60"
      >
        <Trash2 className="h-4 w-4" />
        Hủy đơn
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-[#120401]/80 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Xác nhận hủy đơn hàng"
            onClick={(event) => event.stopPropagation()}
            className="w-full rounded-t-3xl border border-[#5c2b12] bg-[#180702] p-5 shadow-2xl sm:max-w-md sm:rounded-2xl sm:p-6"
          >
            {state?.status === 'success' ? (
              <div className="space-y-4">
                <h2 className="font-serif text-lg font-bold text-[#34d399]">Đã hủy đơn hàng</h2>
                <p className="text-sm text-[#c9b69a]">
                  Đơn <span className="font-mono text-[#c59a4b]">{orderCode}</span> đã được hủy.
                  {reason ? ` Lý do: ${reason}` : ''}
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-full rounded-xl bg-[#210c04] px-4 py-2.5 text-sm font-semibold text-[#f3dfae] transition-colors hover:bg-[#381a0b]"
                >
                  Đóng
                </button>
              </div>
            ) : (
              <form action={formAction} className="space-y-4">
                <input type="hidden" name="orderCode" value={orderCode} />

                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 rounded-full bg-[#2a0707]/70 p-2 text-[#e08a8a]">
                      <AlertTriangle className="h-4 w-4" />
                    </span>
                    <div>
                      <h2 className="font-serif text-lg font-bold text-[#f3dfae]">
                        Xác nhận hủy đơn
                      </h2>
                      <p className="mt-0.5 text-xs text-[#c9b69a]">
                        Đơn <span className="font-mono text-[#c59a4b]">{orderCode}</span>
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Đóng"
                    className="rounded-lg p-1.5 text-[#c9b69a] transition-colors hover:bg-[#210c04] hover:text-[#f3dfae]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <p className="rounded-xl border border-[#5c2b12]/50 bg-[#381a0b]/30 px-3 py-2.5 text-xs text-[#c59a4b]">
                  Hành động này không thể hoàn tác. Nếu đơn đã tạo link thanh toán PayOS, link đó
                  cũng sẽ được hủy.
                </p>

                <div className="space-y-2">
                  <label
                    htmlFor="cancel-reason"
                    className="block text-xs font-semibold uppercase tracking-wide text-[#c9b69a]"
                  >
                    Lý do hủy (không bắt buộc)
                  </label>
                  <textarea
                    id="cancel-reason"
                    name="reason"
                    rows={3}
                    maxLength={MAX_REASON_LENGTH}
                    value={reason}
                    onChange={(event) => setReason(event.target.value)}
                    placeholder="Ví dụ: Tôi muốn đổi số lượng / đổi địa chỉ giao hàng…"
                    className="w-full resize-none rounded-xl border border-[#5c2b12] bg-[#120401] px-3 py-2.5 text-sm text-[#f3dfae] placeholder:text-[#a98a5f] focus:border-[#c59a4b]/60 focus:outline-none"
                  />
                  <p className="text-right text-[11px] text-[#a98a5f]">
                    {reason.length}/{MAX_REASON_LENGTH} ký tự
                  </p>
                </div>

                {state?.status === 'error' && state.message && (
                  <p className="rounded-xl border border-[#a33b20]/60 bg-[#2a0707]/40 px-3 py-2.5 text-xs text-[#e08a8a]">
                    {state.message}
                  </p>
                )}

                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-2.5 text-sm font-medium text-[#c9b69a] transition-colors hover:bg-[#210c04]"
                  >
                    Giữ đơn
                  </button>
                  <button
                    type="submit"
                    disabled={isPending}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#861b1b] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#861b1b] disabled:cursor-not-allowed disabled:bg-[#381a0b]"
                  >
                    {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                    Xác nhận hủy đơn
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
