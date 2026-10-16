'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Loader2,
  RefreshCw,
  XCircle,
} from 'lucide-react';

import { trackPurchase } from '@/lib/analytics';
import { formatVND } from '@/lib/format';
import type { PaymentStatusView } from '@/lib/validations/checkout';

/**
 * C07 – Polling trạng thái thanh toán PayOS.
 * Poll /api/payos/status mỗi 3 giây, tối đa 20 lần (~60 giây).
 */

type Phase = 'checking' | 'paid' | 'placed' | 'pending' | 'cancelled' | 'failed';

const POLL_INTERVAL_MS = 3000;
const MAX_ATTEMPTS = 20;

interface PaymentResultProps {
  orderCode: string;
  phone?: string;
  /** PayOS trả khách về với ?huy=1 (khách bấm huỷ trên trang thanh toán). */
  cancelled: boolean;
}

export function PaymentResult({ orderCode, phone, cancelled }: PaymentResultProps) {
  const [phase, setPhase] = useState<Phase>(cancelled ? 'cancelled' : 'checking');
  const [status, setStatus] = useState<PaymentStatusView | null>(null);
  const [manualChecking, setManualChecking] = useState(false);

  const attemptsRef = useRef(0);
  const trackedRef = useRef(false);
  const aliveRef = useRef(true);

  const applyStatus = useCallback((data: PaymentStatusView): boolean => {
    setStatus(data);

    const paymentStatus = String(data.payment_status ?? '').toLowerCase();
    const orderStatus = String(data.status ?? '').toLowerCase();
    const paymentMethod = String(data.payment_method ?? '').toLowerCase();

    if (paymentStatus === 'paid') {
      setPhase('paid');
      return true;
    }
    if (paymentStatus === 'failed') {
      setPhase('failed');
      return true;
    }
    if (orderStatus === 'cancelled') {
      setPhase('cancelled');
      return true;
    }
    // Đơn COD không bao giờ có payment_status = 'paid' — đặt hàng thành công là kết thúc.
    if (paymentMethod === 'cod') {
      setPhase('placed');
      return true;
    }
    if (orderStatus === 'confirmed' || orderStatus === 'shipping' || orderStatus === 'completed') {
      setPhase('paid');
      return true;
    }

    setPhase('pending');
    return false;
  }, []);

  /** Trả về true khi trạng thái đã "kết thúc" (không cần poll tiếp). */
  const fetchStatus = useCallback(async (): Promise<boolean> => {
    const params = new URLSearchParams({ order: orderCode });
    if (phone) params.set('phone', phone);

    try {
      const response = await fetch(`/api/payos/status?${params.toString()}`, {
        cache: 'no-store',
      });
      if (!response.ok) return false;
      const data = (await response.json()) as PaymentStatusView;
      if (!data || typeof data !== 'object') return false;
      return applyStatus(data);
    } catch {
      return false;
    }
  }, [applyStatus, orderCode, phone]);

  // Polling tự động.
  useEffect(() => {
    aliveRef.current = true;

    if (cancelled) {
      return () => {
        aliveRef.current = false;
      };
    }

    let timer: ReturnType<typeof setTimeout> | undefined;

    const tick = async () => {
      if (!aliveRef.current) return;
      attemptsRef.current += 1;

      const terminal = await fetchStatus();
      if (!aliveRef.current || terminal) return;

      if (attemptsRef.current >= MAX_ATTEMPTS) {
        /**
         * Hết ~60 giây poll mà DB vẫn chưa thấy thanh toán ⇒ nhiều khả năng webhook
         * không tới được server. Đối soát thẳng với PayOS một lần rồi đọc lại DB.
         */
        try {
          const params = new URLSearchParams({ order: orderCode });
          if (phone) params.set('phone', phone);
          await fetch(`/api/payos/reconcile?${params.toString()}`, { cache: 'no-store' });
          if (await fetchStatus()) return;
        } catch {
          // Bỏ qua: bên dưới sẽ hiện trạng thái "chưa nhận được thanh toán" + nút kiểm tra lại.
        }

        setPhase((current) => (current === 'checking' ? 'pending' : current));
        return;
      }
      timer = setTimeout(tick, POLL_INTERVAL_MS);
    };

    void tick();

    return () => {
      aliveRef.current = false;
      if (timer) clearTimeout(timer);
    };
  }, [cancelled, fetchStatus]);

  // GA4 purchase – đúng một lần cho mỗi mã đơn (COD: ghi nhận khi đặt hàng thành công).
  useEffect(() => {
    if ((phase !== 'paid' && phase !== 'placed') || trackedRef.current) return;
    trackedRef.current = true;
    trackPurchase({ orderCode, total: Number(status?.total ?? 0) });
  }, [phase, orderCode, status]);

  async function handleRecheck() {
    setManualChecking(true);
    attemptsRef.current = 0;

    /**
     * Bước 1: yêu cầu server ĐỐI SOÁT với PayOS (chữa trường hợp webhook không tới được).
     * Bước 2: đọc lại trạng thái trong DB — nhưng KHÔNG bao giờ tự đánh dấu đã trả tiền
     * từ kết quả gọi API ở client; chỉ RPC `record_payos_result` mới được xác nhận.
     */
    try {
      const params = new URLSearchParams({ order: orderCode });
      if (phone) params.set('phone', phone);
      await fetch(`/api/payos/reconcile?${params.toString()}`, { cache: 'no-store' });
    } catch {
      // Bỏ qua: bước đọc lại DB bên dưới vẫn cho biết trạng thái thật.
    }

    const terminal = await fetchStatus();
    if (!terminal) setPhase('pending');
    setManualChecking(false);
  }

  const orderHref = `/tai-khoan/don-hang/${encodeURIComponent(orderCode)}`;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-3xl border border-[#5c2b12] bg-[#180702]/80 p-8 text-center shadow-xl">
        {phase === 'checking' && (
          <>
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-[#c59a4b]" />
            <h1 className="mt-4 font-serif text-2xl font-bold text-[#f3dfae]">
              Đang kiểm tra thanh toán…
            </h1>
            <p className="mt-2 text-sm text-[#c9b69a]">
              Hệ thống đang chờ xác nhận từ PayOS cho đơn{' '}
              <span className="font-mono text-[#c59a4b]">{orderCode}</span>.
            </p>
          </>
        )}

        {phase === 'paid' && (
          <>
            <CheckCircle2 className="mx-auto h-12 w-12 text-[#34d399]" />
            <h1 className="mt-4 font-serif text-2xl font-bold text-[#34d399]">
              Thanh toán thành công!
            </h1>
            <p className="mt-2 text-sm text-[#c9b69a]">
              Cảm ơn bạn đã đặt quà Tết tại Hương Quê. Đơn{' '}
              <span className="font-mono text-[#c59a4b]">{orderCode}</span> đã được xác nhận
              {status?.total ? ` với tổng tiền ${formatVND(Number(status.total))}` : ''}.
            </p>
            <p className="mt-2 text-xs text-[#c9b69a]">
              Email xác nhận đã được gửi tới hộp thư của bạn.
            </p>
          </>
        )}

        {phase === 'placed' && (
          <>
            <CheckCircle2 className="mx-auto h-12 w-12 text-[#34d399]" />
            <h1 className="mt-4 font-serif text-2xl font-bold text-[#34d399]">
              Đặt hàng thành công!
            </h1>
            <p className="mt-2 text-sm text-[#c9b69a]">
              Đơn <span className="font-mono text-[#c59a4b]">{orderCode}</span> đã được ghi nhận
              {status?.total ? ` với tổng tiền ${formatVND(Number(status.total))}` : ''}. Bạn sẽ
              thanh toán khi nhận hàng (COD).
            </p>
            <p className="mt-2 text-xs text-[#c9b69a]">
              Hương Quê sẽ gọi xác nhận trước khi giao quà Tết.
            </p>
          </>
        )}

        {phase === 'pending' && (
          <>
            <Clock className="mx-auto h-12 w-12 text-[#c59a4b]" />
            <h1 className="mt-4 font-serif text-2xl font-bold text-[#f3dfae]">
              Chưa nhận được thanh toán
            </h1>
            <p className="mt-2 text-sm text-[#c9b69a]">
              Đơn <span className="font-mono text-[#c59a4b]">{orderCode}</span> vẫn đang chờ thanh
              toán. Nếu bạn đã chuyển khoản, vui lòng đợi thêm ít phút hoặc bấm kiểm tra lại.
            </p>
          </>
        )}

        {phase === 'cancelled' && (
          <>
            <XCircle className="mx-auto h-12 w-12 text-[#c9b69a]" />
            <h1 className="mt-4 font-serif text-2xl font-bold text-[#f3dfae]">
              Giao dịch chưa hoàn tất
            </h1>
            <p className="mt-2 text-sm text-[#c9b69a]">
              Bạn đã rời trang thanh toán PayOS nên đơn{' '}
              <span className="font-mono text-[#c59a4b]">{orderCode}</span> chưa được thanh toán.
              Bạn có thể kiểm tra lại nếu đã chuyển khoản.
            </p>
          </>
        )}

        {phase === 'failed' && (
          <>
            <AlertTriangle className="mx-auto h-12 w-12 text-[#e08a8a]" />
            <h1 className="mt-4 font-serif text-2xl font-bold text-[#e08a8a]">
              Thanh toán không thành công
            </h1>
            <p className="mt-2 text-sm text-[#c9b69a]">
              Giao dịch cho đơn <span className="font-mono text-[#c59a4b]">{orderCode}</span> bị
              đánh dấu lỗi. Vui lòng liên hệ hotline 0901 000 000 để được hỗ trợ.
            </p>
          </>
        )}

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {phase !== 'paid' && phase !== 'placed' && (
            <button
              type="button"
              onClick={handleRecheck}
              disabled={manualChecking}
              className="inline-flex items-center gap-2 rounded-xl bg-[#c59a4b] px-5 py-3 text-sm font-bold text-[#120401] hover:bg-[#d4af37] disabled:opacity-60"
            >
              {manualChecking ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Kiểm tra lại
            </button>
          )}

          {(phase === 'paid' || phase === 'placed') && (
            <Link
              href={orderHref}
              className="inline-flex items-center gap-2 rounded-xl bg-[#c59a4b] px-5 py-3 text-sm font-bold text-[#120401] hover:bg-[#d4af37]"
            >
              Xem đơn hàng
            </Link>
          )}

          <Link
            href="/san-pham"
            className="inline-flex items-center gap-2 rounded-xl border border-[#5c2b12] px-5 py-3 text-sm font-semibold text-[#f3dfae] hover:border-[#c59a4b]/50 hover:text-[#c59a4b]"
          >
            Tiếp tục mua quà Tết
          </Link>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-[#a98a5f]">
        Cần tra cứu đơn? Dùng{' '}
        <Link href="/tra-cuu-don" className="text-[#c59a4b] hover:text-[#c59a4b]">
          trang tra cứu đơn hàng
        </Link>{' '}
        với mã đơn và số điện thoại.
      </p>
    </div>
  );
}
