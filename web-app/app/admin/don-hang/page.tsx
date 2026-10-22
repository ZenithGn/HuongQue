import Link from 'next/link';
import {
  getOrderDetail,
  getOrderItemsForOrders,
  listOrdersPaged,
  type OrderFilters,
} from '@/lib/actions/admin/data';
import {
  ADMIN_PAGE_SIZE,
  buildAdminQuery,
  parseAdminPage,
} from '@/lib/actions/admin/pagination';
import { AdminPagination } from '@/components/admin/AdminPagination';
import { ConfigNotice } from '@/components/admin/ConfigNotice';
import { OrderActionPanel } from '@/components/admin/OrderActionPanel';
import { OrderStatusBadge } from '@/components/orders/OrderStatusBadge';
import {
  Alert,
  SectionTitle,
  adminCardClass,
  adminInputClass,
} from '@/components/admin/FormBits';
import {
  ORDER_STATUS_LABELS,
  PAYMENT_METHOD_LABELS,
  formatDateTime,
  formatNumber,
  formatTimeLeft,
  formatVND,
  orderStatusLabel,
  paymentMethodLabel,
  paymentStatusLabel,
} from '@/lib/format';
import { ChevronDown, Search } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Đơn hàng – Quản trị Hương Quê' };

const STATUS_OPTIONS = ['pending_payment', 'confirmed', 'shipping', 'completed', 'cancelled'];
const METHOD_OPTIONS = ['cod', 'payos', 'bank_transfer'];

/** `searchParams` của A05: bộ lọc + `trang` (phân trang) + `id` (đơn đang mở). */
type OrdersSearchParams = {
  trang?: string;
  trang_thai?: string;
  phuong_thuc?: string;
  tu_ngay?: string;
  den_ngay?: string;
  q?: string;
  id?: string;
};

function needsManualRefund(note: string | null): boolean {
  if (!note) return false;
  return /hoàn tiền|nhận tiền sau khi đơn đã hủy/i.test(note);
}

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<OrdersSearchParams>;
}) {
  const params = await searchParams;
  const filters: OrderFilters = {
    status: params.trang_thai ?? 'all',
    method: params.phuong_thuc ?? 'all',
    from: params.tu_ngay,
    to: params.den_ngay,
    keyword: params.q,
  };

  const { data: page, error, needsServiceRole } = await listOrdersPaged(
    filters,
    parseAdminPage(params.trang)
  );
  const orders = page.rows;
  const { itemsByOrderId, error: itemError } = await getOrderItemsForOrders(
    orders.flatMap((order) => (order.id ? [order.id] : []))
  );

  const selectedId = params.id ? Number(params.id) : null;
  const detail =
    selectedId && Number.isInteger(selectedId) && selectedId > 0
      ? await getOrderDetail(selectedId)
      : null;
  const activeFilterCount = [
    params.trang_thai && params.trang_thai !== 'all',
    params.phuong_thuc && params.phuong_thuc !== 'all',
    params.tu_ngay,
    params.den_ngay,
  ].filter(Boolean).length;
  const hasFilters = Boolean(params.q || activeFilterCount);

  return (
    <div className="w-full min-w-0 space-y-5">
      <SectionTitle
        code="A05"
        title="Quản lý đơn hàng"
        description="Tìm đơn, xem nhanh sản phẩm và xử lý trạng thái hoặc đối soát PayOS."
      />

      <ConfigNotice />
      {error && !needsServiceRole ? <Alert tone="error">{error}</Alert> : null}
      {itemError ? <Alert tone="warning">{itemError} Danh sách vẫn hiển thị; mở mã đơn để thử tải lại chi tiết.</Alert> : null}

      <form method="get" className={`${adminCardClass} space-y-4`}>
        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="relative min-w-0 flex-1" htmlFor="orders-search">
            <span className="sr-only">Tìm mã đơn, tên người nhận hoặc số điện thoại</span>
            <input
              id="orders-search"
              type="search"
              name="q"
              defaultValue={params.q ?? ''}
              placeholder="Mã đơn, tên người nhận hoặc số điện thoại…"
              className={`${adminInputClass} h-11 pl-10`}
            />
            <Search className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-[#a98a5f]" aria-hidden="true" />
          </label>
          <button
            type="submit"
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#c59a4b] px-5 text-sm font-bold text-[#120401] transition-colors hover:bg-[#d4af37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3dfae]"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            Tìm đơn
          </button>
        </div>

        <div className="border-t border-[#5c2b12] pt-3">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs font-semibold text-[#f3dfae]">Bộ lọc đơn hàng</p>
            {hasFilters ? (
              <p className="text-xs text-[#c9b69a]" role="status">
                Đang áp dụng {Number(Boolean(params.q)) + activeFilterCount} tiêu chí
              </p>
            ) : null}
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(145px,1fr)_minmax(145px,1fr)_minmax(145px,1fr)_minmax(145px,1fr)_auto]">
            <label className="block min-w-0">
              <span className="mb-1.5 block text-xs font-medium text-[#c9b69a]">Trạng thái</span>
              <select name="trang_thai" defaultValue={filters.status} className={`${adminInputClass} h-10`}>
                <option value="all">Mọi trạng thái</option>
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>{ORDER_STATUS_LABELS[status] ?? status}</option>
                ))}
              </select>
            </label>
            <label className="block min-w-0">
              <span className="mb-1.5 block text-xs font-medium text-[#c9b69a]">Thanh toán</span>
              <select name="phuong_thuc" defaultValue={filters.method} className={`${adminInputClass} h-10`}>
                <option value="all">Mọi phương thức</option>
                {METHOD_OPTIONS.map((method) => (
                  <option key={method} value={method}>{PAYMENT_METHOD_LABELS[method] ?? method}</option>
                ))}
              </select>
            </label>
            <label className="block min-w-0">
              <span className="mb-1.5 block text-xs font-medium text-[#c9b69a]">Từ ngày</span>
              <input type="date" name="tu_ngay" defaultValue={params.tu_ngay ?? ''} className={`${adminInputClass} h-10`} />
            </label>
            <label className="block min-w-0">
              <span className="mb-1.5 block text-xs font-medium text-[#c9b69a]">Đến ngày</span>
              <input type="date" name="den_ngay" defaultValue={params.den_ngay ?? ''} className={`${adminInputClass} h-10`} />
            </label>
            <div className="flex items-end gap-2 sm:col-span-2 xl:col-span-1">
              <button
                type="submit"
                className="h-10 flex-1 rounded-xl border border-[#c59a4b]/70 bg-[#210c04] px-4 text-xs font-bold text-[#f3dfae] transition-colors hover:bg-[#381a0b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59a4b]"
              >
                Áp dụng lọc
              </button>
              {hasFilters ? (
                <Link
                  href="/admin/don-hang"
                  className="inline-flex h-10 items-center justify-center rounded-xl border border-[#5c2b12] px-3 text-xs font-medium text-[#c9b69a] transition-colors hover:bg-[#210c04] hover:text-[#f3dfae] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59a4b]"
                >
                  Xóa lọc
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </form>

      {detail ? (
        <section id="order-detail" className={`${adminCardClass} min-w-0 scroll-mt-4`} aria-label="Chi tiết đơn hàng">
          {detail.errors.length > 0 ? (
            <Alert tone="warning">
              <ul className="list-inside list-disc space-y-0.5">{detail.errors.map((message) => <li key={message}>{message}</li>)}</ul>
            </Alert>
          ) : null}
          {!detail.order ? (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-[#c9b69a]">Không tìm thấy đơn hàng này.</p>
              <Link href={`/admin/don-hang${buildAdminQuery(params, { id: undefined })}`} className="text-sm font-semibold text-[#c59a4b] underline underline-offset-4 hover:text-[#d4af37]">Quay lại danh sách</Link>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#5c2b12] pb-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-mono text-lg font-bold text-[#f3dfae]">{detail.order.code}</h3>
                    <OrderStatusBadge status={detail.order.status} />
                  </div>
                  <p className="mt-1 text-xs text-[#c9b69a]">Đặt {formatDateTime(detail.order.createdAt)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-right font-mono text-lg font-bold tabular-nums text-[#c59a4b]">{formatVND(detail.order.total)}</p>
                  <Link href={`/admin/don-hang${buildAdminQuery(params, { id: undefined })}`} className="rounded-lg border border-[#5c2b12] px-3 py-2 text-xs font-semibold text-[#c9b69a] hover:bg-[#210c04] hover:text-[#f3dfae]" aria-label="Đóng chi tiết đơn hàng">Đóng</Link>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-x-6 gap-y-2 border-b border-[#5c2b12] py-3 text-xs sm:grid-cols-2 lg:grid-cols-4">
                <p><span className="text-[#a98a5f]">Người nhận</span><br /><span className="font-semibold text-[#f3dfae]">{detail.order.customerName}</span></p>
                <p><span className="text-[#a98a5f]">Điện thoại</span><br /><span className="text-[#f3dfae]">{detail.order.customerPhone}</span></p>
                <p><span className="text-[#a98a5f]">Khu vực</span><br /><span className="text-[#f3dfae]">{detail.order.province}</span></p>
                <p><span className="text-[#a98a5f]">Thanh toán</span><br /><span className="text-[#f3dfae]">{paymentMethodLabel(detail.order.paymentMethod)} · {paymentStatusLabel(detail.order.paymentStatus)}</span></p>
                {detail.order.status === 'pending_payment' && detail.order.expiresAt ? (
                  <p className="sm:col-span-2 lg:col-span-4"><span className="text-[#a98a5f]">Hạn thanh toán</span> <span className="font-semibold text-[#c59a4b]">{formatTimeLeft(detail.order.expiresAt)}</span></p>
                ) : null}
              </div>

              <div className="grid min-w-0 grid-cols-1 gap-5 pt-4 xl:grid-cols-[minmax(0,1.5fr)_minmax(300px,0.9fr)]">
                <div className="min-w-0 space-y-4">
                  <div>
                    <h4 className="mb-2 text-sm font-bold text-[#c59a4b]">Sản phẩm · {detail.items.length}</h4>
                    <div className="overflow-hidden rounded-xl border border-[#5c2b12]">
                      <div className="hidden grid-cols-[minmax(0,1fr)_64px_120px_130px] gap-3 bg-[#120401]/60 px-3 py-2 text-xs font-semibold text-[#c9b69a] sm:grid">
                        <span>Sản phẩm</span><span className="text-right">SL</span><span className="text-right">Đơn giá</span><span className="text-right">Thành tiền</span>
                      </div>
                      {detail.items.length === 0 ? (
                        <p className="px-3 py-4 text-sm text-[#c9b69a]">Không có dòng sản phẩm để hiển thị.</p>
                      ) : detail.items.map((item, index) => (
                        <div key={`${item.productId ?? 'x'}-${index}`} className="grid grid-cols-2 gap-x-3 gap-y-1 border-t border-[#381a0b] px-3 py-2.5 text-xs first:border-t-0 sm:grid-cols-[minmax(0,1fr)_64px_120px_130px] sm:items-center sm:gap-3">
                          <p className="col-span-2 min-w-0 font-medium text-[#f3dfae] sm:col-span-1">{item.name}</p>
                          <p className="text-[#c9b69a] sm:text-right"><span className="sm:hidden">SL </span>{item.quantity}</p>
                          <p className="text-right font-mono tabular-nums text-[#c9b69a]">{formatVND(item.unitPrice)}</p>
                          <p className="text-right font-mono font-semibold tabular-nums text-[#c59a4b]">{formatVND(item.subtotal)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <details className="group rounded-xl border border-[#5c2b12] bg-[#120401]/35">
                      <summary className="cursor-pointer list-none px-3 py-2.5 text-xs font-semibold text-[#f3dfae] marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#c59a4b]">
                        <span className="flex items-center justify-between">Lịch sử trạng thái <span className="flex items-center gap-1 text-[#c9b69a]">{detail.history.length} bản ghi <ChevronDown className="h-4 w-4 text-[#c59a4b] transition-transform group-open:rotate-180" aria-hidden="true" /></span></span>
                      </summary>
                      <div className="border-t border-[#5c2b12] px-3 py-3">
                        {detail.history.length === 0 ? <p className="text-xs text-[#c9b69a]">Chưa có lịch sử.</p> : (
                          <ol className="space-y-2">
                            {detail.history.map((entry, index) => (
                              <li key={`${entry.createdAt ?? 'x'}-${index}`} className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1 border-b border-[#381a0b] pb-2 last:border-0 last:pb-0">
                                <div className="min-w-0"><p className="text-xs font-semibold text-[#f3dfae]">{orderStatusLabel(entry.status)}{needsManualRefund(entry.note) ? <span className="ml-2 rounded-full border border-[#5c2b12] bg-[#381a0b] px-2 py-0.5 text-xs text-[#c59a4b]">Cần hoàn tiền thủ công</span> : null}</p>{entry.note ? <p className="mt-0.5 text-xs text-[#c9b69a]">{entry.note}</p> : null}</div>
                                <time className="shrink-0 text-xs text-[#c9b69a]">{formatDateTime(entry.createdAt)}</time>
                              </li>
                            ))}
                          </ol>
                        )}
                      </div>
                    </details>
                    <details className="group rounded-xl border border-[#5c2b12] bg-[#120401]/35">
                      <summary className="cursor-pointer list-none px-3 py-2.5 text-xs font-semibold text-[#f3dfae] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#c59a4b]">
                        <span className="flex items-center justify-between">Nhật ký thanh toán <span className="flex items-center gap-1 text-[#c9b69a]">{detail.payments.length} bản ghi <ChevronDown className="h-4 w-4 text-[#c59a4b] transition-transform group-open:rotate-180" aria-hidden="true" /></span></span>
                      </summary>
                      <div className="space-y-2 border-t border-[#5c2b12] px-3 py-3">
                        {detail.payments.length === 0 ? <p className="text-xs text-[#c9b69a]">Chưa có bản ghi thanh toán.</p> : detail.payments.map((payment, index) => (
                          <div key={`${payment.id ?? 'x'}-${index}`} className={`rounded-lg border px-3 py-2 text-xs ${payment.isSuccess ? 'border-[#34d399]/40 bg-[#34d399]/10 text-[#34d399]' : 'border-[#a33b20]/60 bg-[#2a0707]/40 text-rose-200'}`}>
                            <p className="font-semibold">{paymentMethodLabel(payment.provider)} · {formatVND(payment.amount)} · {payment.isSuccess ? 'Thành công' : 'Sai số tiền / thất bại'}</p>
                            <p className="mt-1 break-words">{payment.reference ?? 'Không có mã giao dịch'} · {formatDateTime(payment.createdAt)}</p>
                          </div>
                        ))}
                      </div>
                    </details>
                  </div>
                </div>

                <div className="min-w-0">
                  <h4 className="mb-2 text-sm font-bold text-[#c59a4b]">Thao tác quản trị</h4>
                  <div className="rounded-xl border border-[#5c2b12] bg-[#120401]/50 p-3 sm:p-4">
                    <OrderActionPanel
                      orderId={detail.order.id ?? 0}
                      currentStatus={detail.order.status}
                      paymentMethod={detail.order.paymentMethod}
                      hasPayosCode={Boolean(detail.order.payosOrderCode)}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      ) : null}

      <section className={`${adminCardClass} min-w-0`} aria-label="Danh sách đơn hàng">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-bold text-[#f3dfae]">{formatNumber(page.total)} đơn hàng khớp bộ lọc</h3>
          <p className="text-xs text-[#c9b69a]">Trang {page.page}/{page.totalPages} · {page.from}–{page.to} trên {page.total}</p>
        </div>

        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full table-fixed text-left text-xs text-[#c9b69a]">
            <colgroup><col className="w-[14%]" /><col className="w-[12%]" /><col className="w-[17%]" /><col className="w-[29%]" /><col className="w-[16%]" /><col className="w-[12%]" /></colgroup>
            <thead className="border-b border-[#5c2b12] text-xs font-semibold text-[#c9b69a]">
              <tr><th className="py-2.5 pr-3">Đơn hàng</th><th className="py-2.5 pr-3">Thời gian</th><th className="py-2.5 pr-3">Người nhận</th><th className="py-2.5 pr-3">Sản phẩm</th><th className="py-2.5 pr-3">Trạng thái</th><th className="py-2.5 text-right">Tổng tiền</th></tr>
            </thead>
            <tbody className="divide-y divide-[#381a0b]">
              {orders.length === 0 ? <tr><td colSpan={6} className="py-10 text-center text-sm text-[#c9b69a]">Không có đơn hàng nào khớp bộ lọc. Thử đổi từ khóa hoặc xóa bớt điều kiện lọc.</td></tr> : orders.map((order, index) => {
                const key = order.id ?? `${order.code}-${index}`;
                const items = order.id ? itemError ? [] : itemsByOrderId[String(order.id)] ?? [] : [];
                return (
                  <tr key={key} className="align-top transition-colors hover:bg-[#210c04]/45">
                    <td className="py-3 pr-3">
                      {order.id ? <Link href={`/admin/don-hang${buildAdminQuery(params, { id: order.id })}#order-detail`} className="font-mono font-semibold text-[#c59a4b] underline-offset-4 hover:text-[#d4af37] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59a4b]">{order.code}</Link> : <span className="font-mono text-[#f3dfae]">{order.code}</span>}
                      {order.payosOrderCode ? <p className="mt-1 break-all text-xs text-[#c9b69a]">PayOS #{order.payosOrderCode}</p> : null}
                    </td>
                    <td className="py-3 pr-3 text-xs leading-5 text-[#c9b69a]">{formatDateTime(order.createdAt)}</td>
                    <td className="py-3 pr-3">
                      <p className="break-words font-medium text-[#f3dfae]">{order.customerName}</p>
                      <p className="mt-0.5 break-words text-xs text-[#c9b69a]">{order.customerPhone}</p>
                      <p className="text-xs text-[#c9b69a]">{order.province}</p>
                    </td>
                    <td className="py-3 pr-3">
                      {itemError ? <p className="text-xs text-[#c9b69a]">Thông tin sản phẩm chưa khả dụng.</p> : items.length === 0 ? <p className="text-xs text-[#c9b69a]">Chưa có dòng sản phẩm.</p> : (
                        <details className="group">
                          <summary className="cursor-pointer list-none rounded-md text-xs text-[#f3dfae] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59a4b]">
                            <span className="block truncate font-medium" title={items[0].name}>{items[0].name}</span>
                            <span className="mt-1 inline-flex max-w-full items-center gap-1 text-xs text-[#c9b69a]"><span>{items.length > 1 ? `+ ${items.length - 1} sản phẩm khác` : `${items[0].quantity} sản phẩm`}</span><ChevronDown className="h-3.5 w-3.5 text-[#c59a4b] transition-transform group-open:rotate-180" aria-hidden="true" /></span>
                          </summary>
                          <div className="mt-2 space-y-1.5 rounded-lg border border-[#5c2b12] bg-[#120401]/70 p-2.5">
                            {items.map((item, itemIndex) => <div key={`${item.productId ?? 'x'}-${itemIndex}`} className="flex items-start justify-between gap-3 text-xs"><span className="min-w-0 break-words text-[#f3dfae]">{item.name} <span className="whitespace-nowrap text-[#c9b69a]">× {item.quantity}</span></span><span className="shrink-0 font-mono tabular-nums text-[#c59a4b]">{formatVND(item.subtotal)}</span></div>)}
                          </div>
                        </details>
                      )}
                    </td>
                    <td className="py-3 pr-3"><OrderStatusBadge status={order.status} /><p className="mt-1 text-xs text-[#c9b69a]">{paymentMethodLabel(order.paymentMethod)} · {paymentStatusLabel(order.paymentStatus)}</p></td>
                    <td className="py-3 text-right font-mono font-semibold tabular-nums text-[#c59a4b]">{formatVND(order.total)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="space-y-3 lg:hidden">
          {orders.length === 0 ? <p className="rounded-xl border border-[#5c2b12] px-4 py-8 text-center text-sm text-[#c9b69a]">Không có đơn hàng nào khớp bộ lọc. Thử đổi từ khóa hoặc xóa bớt điều kiện lọc.</p> : orders.map((order, index) => {
            const key = order.id ?? `${order.code}-${index}`;
            const items = order.id ? itemError ? [] : itemsByOrderId[String(order.id)] ?? [] : [];
            return (
              <article key={key} className="min-w-0 rounded-xl border border-[#5c2b12] bg-[#120401]/35 p-3 sm:p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="min-w-0">
                    {order.id ? <Link href={`/admin/don-hang${buildAdminQuery(params, { id: order.id })}#order-detail`} className="break-all font-mono text-sm font-bold text-[#c59a4b] underline-offset-4 hover:text-[#d4af37] hover:underline">{order.code}</Link> : <p className="break-all font-mono text-sm font-bold text-[#f3dfae]">{order.code}</p>}
                    <p className="mt-1 text-xs text-[#c9b69a]">{formatDateTime(order.createdAt)}</p>
                  </div>
                  <OrderStatusBadge status={order.status} />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
                  <p className="min-w-0"><span className="text-[#c9b69a]">Người nhận</span><br /><span className="break-words font-medium text-[#f3dfae]">{order.customerName}</span><br /><span className="break-all text-[#c9b69a]">{order.customerPhone}</span></p>
                  <p className="text-right"><span className="text-[#c9b69a]">Tổng tiền</span><br /><span className="font-mono font-semibold tabular-nums text-[#c59a4b]">{formatVND(order.total)}</span><br /><span className="text-[#c9b69a]">{paymentMethodLabel(order.paymentMethod)} · {paymentStatusLabel(order.paymentStatus)}</span></p>
                </div>
                <div className="mt-3 border-t border-[#381a0b] pt-3">
                  <p className="mb-1 text-xs text-[#c9b69a]">Sản phẩm</p>
                  {itemError ? <p className="text-xs text-[#c9b69a]">Thông tin sản phẩm chưa khả dụng.</p> : items.length === 0 ? <p className="text-xs text-[#c9b69a]">Chưa có dòng sản phẩm.</p> : <details className="group">
                    <summary className="flex cursor-pointer list-none items-start text-xs text-[#f3dfae]"><span className="min-w-0 break-words font-medium">{items[0].name}</span><span className="ml-1 shrink-0 text-[#c9b69a]">{items.length > 1 ? `+ ${items.length - 1} sản phẩm khác` : `· SL ${items[0].quantity}`}</span><ChevronDown className="ml-1 h-4 w-4 shrink-0 text-[#c59a4b] transition-transform group-open:rotate-180" aria-hidden="true" /></summary>
                    <ul className="mt-2 space-y-1.5 rounded-lg border border-[#5c2b12] bg-[#120401]/60 p-2.5">{items.map((item, itemIndex) => <li key={`${item.productId ?? 'x'}-${itemIndex}`} className="flex items-start justify-between gap-3 text-xs"><span className="min-w-0 break-words text-[#f3dfae]">{item.name} <span className="whitespace-nowrap text-[#c9b69a]">× {item.quantity}</span></span><span className="shrink-0 font-mono tabular-nums text-[#c59a4b]">{formatVND(item.subtotal)}</span></li>)}</ul>
                  </details>}
                </div>
                {order.id ? <Link href={`/admin/don-hang${buildAdminQuery(params, { id: order.id })}#order-detail`} className="mt-3 inline-flex min-h-10 w-full items-center justify-center rounded-lg border border-[#c59a4b]/60 px-3 text-xs font-semibold text-[#f3dfae] transition-colors hover:bg-[#210c04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59a4b]">Xem và xử lý đơn</Link> : null}
              </article>
            );
          })}
        </div>

        <AdminPagination
          page={page.page}
          totalItems={page.total}
          pageSize={ADMIN_PAGE_SIZE}
          basePath="/admin/don-hang"
          // Giữ nguyên bộ lọc nhưng bỏ đơn đang mở khi chuyển trang.
          params={{ ...params, id: undefined }}
          itemLabel="đơn hàng"
        />
      </section>
    </div>
  );
}
