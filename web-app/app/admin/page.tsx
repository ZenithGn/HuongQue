import Link from 'next/link';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { ConfigNotice } from '@/components/admin/ConfigNotice';
import { Alert, adminCardClass } from '@/components/admin/FormBits';
import { getDashboardData } from '@/lib/actions/admin/data';
import { formatNumber, formatVND } from '@/lib/format';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Tổng quan – Quản trị Hương Quê' };

const numberOrDash = (value: number | null) =>
  value === null ? '—' : formatNumber(value);

function shortVND(value: number) {
  return `${new Intl.NumberFormat('vi-VN', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)}₫`;
}

function formatDateKey(dateKey: string) {
  const [year, month, day] = dateKey.split('-');
  return year && month && day ? `${day}/${month}/${year}` : dateKey;
}

export default async function AdminDashboardPage() {
  const { summary, daily, topProducts, dailyError, errors } = await getDashboardData();
  const revenueDays = daily.slice(-30);
  const totalRevenue = dailyError === null
    ? revenueDays.reduce((sum, point) => sum + point.revenue, 0)
    : null;
  const totalOrders = dailyError === null
    ? revenueDays.reduce((sum, point) => sum + point.orderCount, 0)
    : null;
  const averageOrderValue = totalOrders !== null && totalOrders > 0 && totalRevenue !== null
    ? Math.round(totalRevenue / totalOrders)
    : null;
  const maxRevenue = revenueDays.reduce((max, point) => Math.max(max, point.revenue), 0);
  const dateRange = revenueDays.length
    ? `${formatDateKey(revenueDays[0].dateKey)} – ${formatDateKey(revenueDays[revenueDays.length - 1].dateKey)}`
    : '30 ngày gần nhất';

  return (
    <div className="mx-auto max-w-7xl space-y-6 lg:space-y-7">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold tracking-[-0.02em] text-[#f3dfae] sm:text-3xl">
            Tổng quan hệ thống
          </h1>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-[#c9b69a]">
            Doanh thu, nhịp đơn hàng và những việc cần xử lý.
          </p>
        </div>
        <p className="text-xs font-medium text-[#c9b69a]">
          Kỳ thống kê: <span className="text-[#f3dfae]">{dateRange}</span>
          <span className="text-[#a98a5f]"> · giờ Việt Nam</span>
        </p>
      </header>

      <ConfigNotice />

      {errors.length > 0 && (
        <Alert tone="warning">
          <p className="mb-1 font-semibold">Một số số liệu chưa tải được</p>
          <ul className="list-inside list-disc space-y-0.5">
            {errors.map((message) => <li key={message}>{message}</li>)}
          </ul>
        </Alert>
      )}

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        <section
          aria-labelledby="revenue-title"
          className={`${adminCardClass} space-y-5 xl:col-span-8`}
        >
          <div className="flex flex-col gap-4 border-b border-[#5c2b12] pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="revenue-title" className="text-base font-bold text-[#f3dfae]">
                Doanh thu theo ngày
              </h2>
              <p className="mt-1 text-xs text-[#c9b69a]">
                Đơn đã xác nhận, đang giao hoặc hoàn tất · {revenueDays.length} ngày
              </p>
            </div>
            <div className="sm:text-right">
              <p className="text-xs font-medium text-[#c9b69a]">Tổng doanh thu kỳ này</p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-[#f3dfae] sm:text-3xl">
                {totalRevenue === null ? '—' : formatVND(totalRevenue)}
              </p>
            </div>
          </div>

          {dailyError ? (
            <p className="py-8 text-center text-sm text-[#c9b69a]">
              Không thể tải dữ liệu doanh thu lúc này.
            </p>
          ) : revenueDays.length === 0 ? (
            <p className="py-8 text-center text-sm text-[#c9b69a]">
              Chưa có dữ liệu doanh thu trong kỳ này.
            </p>
          ) : (
            <>
              <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3">
                <div
                  aria-hidden="true"
                  className="flex h-40 flex-col justify-between pb-5 text-right text-xs tabular-nums text-[#c9b69a]"
                >
                  <span>{shortVND(maxRevenue)}</span>
                  <span>{shortVND(maxRevenue / 2)}</span>
                  <span>0₫</span>
                </div>
                <div className="relative min-w-0">
                  <div aria-hidden="true" className="absolute inset-x-0 top-0 flex h-40 flex-col justify-between pb-5">
                    <span className="border-t border-[#5c2b12]/80" />
                    <span className="border-t border-dashed border-[#5c2b12]/70" />
                    <span className="border-t border-[#5c2b12]" />
                  </div>
                  <div
                    role="img"
                    aria-label={`Biểu đồ doanh thu trong ${revenueDays.length} ngày. Tổng ${formatVND(totalRevenue)}.`}
                    className="relative flex h-40 items-end gap-[3px] pb-5 sm:gap-1"
                  >
                    {revenueDays.map((point) => {
                      const height = maxRevenue > 0
                        ? point.revenue === 0 ? 1.5 : Math.max(4, (point.revenue / maxRevenue) * 100)
                        : 1.5;
                      return (
                        <div
                          key={point.dateKey}
                          title={`${formatDateKey(point.dateKey)} · ${formatVND(point.revenue)} · ${formatNumber(point.orderCount)} đơn`}
                          className={`relative z-10 min-w-0 flex-1 rounded-t-[3px] ${point.revenue === maxRevenue && maxRevenue > 0 ? 'bg-[#d4af37]' : 'bg-[#b8863b]'}`}
                          style={{ height: `${height}%` }}
                        />
                      );
                    })}
                  </div>
                  <div
                    aria-hidden="true"
                    className="grid grid-cols-[repeat(30,minmax(0,1fr))] text-xs tabular-nums text-[#c9b69a]"
                    style={{ gridTemplateColumns: `repeat(${revenueDays.length}, minmax(0, 1fr))` }}
                  >
                    {revenueDays.map((point, index) => {
                      const showLabel = index === 0 || index === revenueDays.length - 1 || index % 5 === 0;
                      return (
                        <span key={point.dateKey} className="min-w-0 whitespace-nowrap">
                          {showLabel ? point.label : ''}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              <details className="group border-t border-[#5c2b12] pt-4">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-[#f3dfae] marker:content-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59a4b] [&::-webkit-details-marker]:hidden">
                  <span>Bảng doanh thu theo ngày</span>
                  <span className="flex items-center gap-2 text-xs font-medium text-[#c9b69a]">
                    {revenueDays.length} ngày
                    <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
                  </span>
                </summary>
                <div className="mt-3 max-h-80 overflow-y-auto rounded-xl border border-[#5c2b12]">
                  <table className="w-full text-left text-sm text-[#c9b69a]">
                    <caption className="sr-only">Doanh thu và số đơn theo từng ngày trong kỳ thống kê</caption>
                    <thead className="sticky top-0 bg-[#180702] text-xs font-semibold text-[#c9b69a]">
                      <tr>
                        <th scope="col" className="px-3 py-2.5">Ngày</th>
                        <th scope="col" className="px-3 py-2.5 text-right">Doanh thu</th>
                        <th scope="col" className="px-3 py-2.5 text-right">Đơn hàng</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#381a0b]">
                      {revenueDays.map((point) => (
                        <tr key={point.dateKey}>
                          <th scope="row" className="px-3 py-2.5 font-medium text-[#f3dfae]">
                            {formatDateKey(point.dateKey)}
                          </th>
                          <td className="px-3 py-2.5 text-right tabular-nums">{formatVND(point.revenue)}</td>
                          <td className="px-3 py-2.5 text-right tabular-nums">{formatNumber(point.orderCount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
            </>
          )}
        </section>

        <aside className="flex flex-col gap-5 xl:col-span-4">
          <section aria-labelledby="snapshot-title" className={`${adminCardClass} space-y-4`}>
            <h2 id="snapshot-title" className="text-base font-bold text-[#f3dfae]">Chỉ số trong kỳ</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="min-w-0 border-r border-[#5c2b12] pr-3">
                <p className="text-xs leading-5 text-[#c9b69a]">Đơn hàng</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-[#f3dfae]">
                  {totalOrders === null ? '—' : formatNumber(totalOrders)}
                </p>
              </div>
              <div className="min-w-0">
                <p className="text-xs leading-5 text-[#c9b69a]">Giá trị đơn trung bình</p>
                <p className="mt-1 break-words text-lg font-bold tabular-nums text-[#f3dfae]">
                  {averageOrderValue === null ? '—' : formatVND(averageOrderValue)}
                </p>
              </div>
            </div>
            {totalOrders === 0 && (
              <p className="text-xs leading-5 text-[#c9b69a]">Chưa có đơn đủ điều kiện ghi nhận doanh thu trong kỳ.</p>
            )}
          </section>

          <section aria-labelledby="attention-title" className={`${adminCardClass} space-y-3`}>
            <div className="flex items-center justify-between gap-3">
              <h2 id="attention-title" className="text-base font-bold text-[#f3dfae]">Cần theo dõi</h2>
              <span className="text-xs text-[#c9b69a]">Trạng thái hiện tại</span>
            </div>
            <Link
              href="/admin/don-hang"
              className="group flex min-h-[60px] items-center justify-between gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-[#210c04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59a4b]"
            >
              <span>
                <span className="block text-sm font-semibold text-[#f3dfae]">Đơn cần xử lý</span>
                <span className="mt-0.5 block text-xs text-[#c9b69a]">Đã xác nhận hoặc đang giao</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="text-xl font-bold tabular-nums text-[#d4af37]">{numberOrDash(summary.ordersNeedingAction)}</span>
                <ArrowUpRight className="h-4 w-4 text-[#c9b69a] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
            <Link
              href="/admin/don-hang?trang_thai=pending_payment"
              className="group flex min-h-[60px] items-center justify-between gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-[#210c04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59a4b]"
            >
              <span>
                <span className="block text-sm font-semibold text-[#f3dfae]">Chờ thanh toán</span>
                <span className="mt-0.5 block text-xs text-[#c9b69a]">Mở danh sách đơn chưa thanh toán</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="text-xl font-bold tabular-nums text-[#d4af37]">{numberOrDash(summary.pendingPaymentOrders)}</span>
                <ArrowUpRight className="h-4 w-4 text-[#c9b69a] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          </section>
        </aside>
      </div>

      <section aria-labelledby="top-products-title" className={`${adminCardClass} space-y-4`}>
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 id="top-products-title" className="text-base font-bold text-[#f3dfae]">
              Sản phẩm bán chạy
            </h2>
            <p className="mt-1 text-xs text-[#c9b69a]">Xếp theo số lượng bán trong 30 ngày gần nhất</p>
          </div>
          <Link
            href="/admin/san-pham"
            className="inline-flex min-h-11 items-center gap-1 rounded-lg px-2 text-xs font-semibold text-[#c59a4b] hover:text-[#d4af37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59a4b]"
          >
            Quản lý sản phẩm <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {topProducts.length === 0 ? (
          <p className="py-5 text-sm text-[#c9b69a]">Chưa có dữ liệu bán hàng trong kỳ.</p>
        ) : (
          <>
            <ol className="space-y-1 sm:hidden">
              {topProducts.map((product, index) => (
                <li key={`${product.name}-${index}`} className="border-t border-[#5c2b12] py-3 first:border-0 first:pt-0">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 w-6 shrink-0 text-xs font-semibold tabular-nums text-[#c59a4b]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 flex-1">
                      {product.productId !== null ? (
                        <Link href={`/admin/san-pham/${product.productId}`} className="break-words text-sm font-semibold text-[#f3dfae] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59a4b]">
                          {product.name}
                        </Link>
                      ) : (
                        <p className="break-words text-sm font-semibold text-[#f3dfae]">{product.name}</p>
                      )}
                      <div className="mt-1.5 flex flex-wrap justify-between gap-x-4 gap-y-1 text-xs text-[#c9b69a]">
                        <span>Đã bán <strong className="font-semibold tabular-nums text-[#f3dfae]">{formatNumber(product.quantity)}</strong></span>
                        <span className="font-semibold tabular-nums text-[#c59a4b]">{formatVND(product.revenue)}</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            <div className="hidden overflow-x-auto sm:block">
              <table className="w-full min-w-[520px] text-left text-sm text-[#c9b69a]">
                <caption className="sr-only">Năm sản phẩm bán chạy nhất trong 30 ngày gần nhất</caption>
                <thead className="border-b border-[#5c2b12] text-xs font-semibold text-[#c9b69a]">
                  <tr>
                    <th scope="col" className="py-3 pr-4">#</th>
                    <th scope="col" className="py-3 pr-4">Sản phẩm</th>
                    <th scope="col" className="py-3 pr-4 text-right">Đã bán</th>
                    <th scope="col" className="py-3 text-right">Doanh thu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#381a0b]">
                  {topProducts.map((product, index) => (
                    <tr key={`${product.name}-${index}`}>
                      <td className="py-3 pr-4 tabular-nums text-[#c59a4b]">{String(index + 1).padStart(2, '0')}</td>
                      <td className="py-3 pr-4 font-medium text-[#f3dfae]">
                        {product.productId !== null ? (
                          <Link href={`/admin/san-pham/${product.productId}`} className="underline-offset-4 hover:text-[#d4af37] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59a4b]">
                            {product.name}
                          </Link>
                        ) : product.name}
                      </td>
                      <td className="py-3 pr-4 text-right tabular-nums">{formatNumber(product.quantity)}</td>
                      <td className="py-3 text-right font-semibold tabular-nums text-[#c59a4b]">{formatVND(product.revenue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
