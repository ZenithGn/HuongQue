import Link from 'next/link';
import { ArrowLeft, SearchX } from 'lucide-react';
import { getOrderDetailForUser } from '@/lib/actions/customer-orders';
import { OrderDetailView } from '@/components/orders/OrderDetailView';

export const dynamic = 'force-dynamic';

interface DonHangDetailPageProps {
  params: Promise<{ code: string }>;
}

/** C13 — Chi tiết đơn hàng của người dùng đã đăng nhập. */
export default async function DonHangDetailPage({ params }: DonHangDetailPageProps) {
  const { code } = await params;
  const result = await getOrderDetailForUser(code);

  if (!result.ok || !result.order) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-[#5c2b12] bg-[#180702]/80 px-6 py-14 text-center">
          <span className="rounded-full bg-[#210c04] p-3 text-[#c9b69a]">
            <SearchX className="h-6 w-6" />
          </span>
          <div>
            <h1 className="font-serif text-xl font-bold text-[#f3dfae]">
              {result.message ?? 'Không tìm thấy đơn hàng'}
            </h1>
            <p className="mt-1 text-xs text-[#c9b69a]">
              Đơn hàng không tồn tại hoặc không thuộc tài khoản của bạn.
            </p>
          </div>
          <Link
            href="/tai-khoan/don-hang"
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#c59a4b] px-4 py-2.5 text-sm font-semibold text-[#120401] transition-colors hover:bg-[#d4af37]"
          >
            <ArrowLeft className="h-4 w-4" />
            Về danh sách đơn hàng
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <nav className="flex flex-wrap items-center gap-2 text-xs text-[#c9b69a]">
        <Link href="/" className="hover:text-[#c59a4b]">
          Trang chủ
        </Link>
        <span>/</span>
        <Link href="/tai-khoan/don-hang" className="hover:text-[#c59a4b]">
          Đơn hàng của tôi
        </Link>
        <span>/</span>
        <span className="font-mono font-medium text-[#c59a4b]">{result.order.orderCode}</span>
      </nav>

      <Link
        href="/tai-khoan/don-hang"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-[#c9b69a] transition-colors hover:text-[#c59a4b]"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Quay lại danh sách
      </Link>

      <OrderDetailView order={result.order} variant="owner" />
    </div>
  );
}
