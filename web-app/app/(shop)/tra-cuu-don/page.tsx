import Link from 'next/link';
import { AlertCircle, PackageSearch, Search } from 'lucide-react';
import { lookupGuestOrder } from '@/lib/actions/customer-orders';
import { OrderDetailView } from '@/components/orders/OrderDetailView';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Tra cứu đơn hàng – Hương Quê',
  description:
    'Khách vãng lai tra cứu tình trạng đơn quà Tết bằng mã đơn hàng và số điện thoại đặt hàng.',
};

interface TraCuuDonPageProps {
  searchParams: Promise<{ ma?: string; sdt?: string }>;
}

/**
 * Tra cứu đơn cho khách vãng lai: mã đơn + SĐT, không cần đăng nhập.
 * Dùng form GET thuần (không cần JS) -> hoạt động tốt trên mobile;
 * việc tra cứu chạy trong Server Action `lookupGuestOrder` -> RPC `get_order_detail(code, phone)`.
 */
export default async function TraCuuDonPage({ searchParams }: TraCuuDonPageProps) {
  const params = await searchParams;
  const ma = (params.ma ?? '').trim();
  const sdt = (params.sdt ?? '').trim();
  const submitted = ma.length > 0 || sdt.length > 0;

  const result = submitted ? await lookupGuestOrder(ma, sdt) : null;

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-3 border-b border-[#5c2b12] pb-6">
        <h1 className="flex items-center gap-2 font-serif text-2xl font-black text-[#f3dfae] sm:text-3xl">
          <PackageSearch className="h-6 w-6 text-[#c59a4b]" />
          Tra cứu đơn hàng
        </h1>
        <p className="text-xs text-[#c9b69a] sm:text-sm">
          Nhập <span className="font-semibold text-[#c59a4b]">mã đơn hàng</span> và{' '}
          <span className="font-semibold text-[#c59a4b]">số điện thoại</span> đã dùng khi đặt hàng
          để theo dõi tình trạng đơn. Không cần đăng nhập.
        </p>
      </div>

      {/* Form tra cứu (GET thuần — chạy được cả khi không có JavaScript) */}
      <form
        action="/tra-cuu-don"
        method="get"
        className="space-y-4 rounded-2xl border border-[#5c2b12] bg-[#180702]/80 p-5 sm:p-6"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="ma"
              className="block text-xs font-semibold uppercase tracking-wide text-[#c9b69a]"
            >
              Mã đơn hàng <span className="text-[#e08a8a]">*</span>
            </label>
            <input
              id="ma"
              name="ma"
              type="text"
              required
              defaultValue={ma}
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              placeholder="VD: HQ20270101000123"
              className="w-full rounded-xl border border-[#5c2b12] bg-[#120401] px-3 py-2.5 font-mono text-sm text-[#f3dfae] placeholder:text-[#a98a5f] focus:border-[#c59a4b]/60 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="sdt"
              className="block text-xs font-semibold uppercase tracking-wide text-[#c9b69a]"
            >
              Số điện thoại đặt hàng <span className="text-[#e08a8a]">*</span>
            </label>
            <input
              id="sdt"
              name="sdt"
              type="tel"
              required
              inputMode="numeric"
              autoComplete="tel"
              defaultValue={sdt}
              placeholder="VD: 0901234567"
              className="w-full rounded-xl border border-[#5c2b12] bg-[#120401] px-3 py-2.5 font-mono text-sm text-[#f3dfae] placeholder:text-[#a98a5f] focus:border-[#c59a4b]/60 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#c59a4b] px-4 py-3 text-sm font-semibold text-[#120401] transition-colors hover:bg-[#d4af37] sm:w-auto"
        >
          <Search className="h-4 w-4" />
          Tra cứu đơn hàng
        </button>
      </form>

      {/* Kết quả */}
      {submitted && result && !result.ok && (
        <div className="flex items-start gap-3 rounded-2xl border border-[#a33b20]/60 bg-[#2a0707]/40 px-4 py-3.5">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#e08a8a]" />
          <div className="text-xs text-[#e08a8a]">
            <p className="text-sm font-semibold">
              {result.message ?? 'Không tìm thấy đơn hàng'}
            </p>
            <p className="mt-0.5 text-[#e08a8a]/80">
              Vui lòng kiểm tra lại mã đơn hàng và số điện thoại. Nếu vẫn không tra cứu được, hãy
              liên hệ hotline của Hương Quê để được hỗ trợ.
            </p>
          </div>
        </div>
      )}

      {submitted && result?.ok && result.order && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#34d399]/40 bg-[#34d399]/10 px-4 py-3.5">
            <p className="text-sm font-semibold text-[#34d399]">
              Đã tìm thấy đơn hàng của bạn.
            </p>
            <p className="text-[11px] text-[#34d399]/80">
              Thông tin cá nhân được ẩn bớt khi tra cứu không đăng nhập.
            </p>
          </div>

          <OrderDetailView order={result.order} variant="guest" />
        </div>
      )}

      {/* Gợi ý khi chưa tra cứu */}
      {!submitted && (
        <div className="rounded-2xl border border-[#5c2b12] bg-[#180702]/60 px-4 py-4 text-xs text-[#c9b69a]">
          <p className="font-semibold text-[#c9b69a]">Bạn chưa nhận được mã đơn hàng?</p>
          <p className="mt-1">
            Mã đơn hàng được gửi trong email xác nhận sau khi đặt hàng thành công. Bạn cũng có thể{' '}
            <Link href="/dang-nhap" className="font-medium text-[#c59a4b] hover:text-[#c59a4b]">
              đăng nhập
            </Link>{' '}
            để xem toàn bộ đơn hàng trong mục{' '}
            <Link
              href="/tai-khoan/don-hang"
              className="font-medium text-[#c59a4b] hover:text-[#c59a4b]"
            >
              Đơn hàng của tôi
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}
