import Link from 'next/link';
import { listCategoriesAdmin, listProductsAdmin } from '@/lib/actions/admin/data';
import { paginateAdmin, parseAdminPage } from '@/lib/actions/admin/pagination';
import { toggleProductActiveAction } from '@/lib/actions/admin/products';
import { AdminPagination } from '@/components/admin/AdminPagination';
import { ConfigNotice } from '@/components/admin/ConfigNotice';
import { adminCardClass, adminInputClass, SectionTitle } from '@/components/admin/FormBits';
import { formatNumber, formatVND } from '@/lib/format';
import { Package, PackageCheck, PackageX, Plus, Search } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Sản phẩm – Quản trị Hương Quê' };

/** `searchParams` của A02: bộ lọc + phân trang + số sản phẩm mỗi trang. */
type ProductsSearchParams = {
  trang?: string;
  q?: string;
  danh_muc?: string;
  per_page?: string;
};

const PAGE_SIZE_OPTIONS = [10, 20, 50] as const;

function getPageSize(raw: string | undefined): number {
  const value = Number(raw);
  return PAGE_SIZE_OPTIONS.includes(value as (typeof PAGE_SIZE_OPTIONS)[number])
    ? value
    : 20;
}

function StockStatus({ stock }: { stock: number }) {
  return stock > 0 ? (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#34d399]/40 bg-[#34d399]/10 px-2.5 py-1 text-xs font-semibold text-[#34d399]">
      <PackageCheck className="h-3.5 w-3.5" aria-hidden="true" /> Còn hàng
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#a33b20]/60 bg-[#2a0707]/40 px-2.5 py-1 text-xs font-semibold text-rose-200">
      <PackageX className="h-3.5 w-3.5" aria-hidden="true" /> Hết hàng
    </span>
  );
}

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<ProductsSearchParams>;
}) {
  const params = await searchParams;
  const keyword = (params.q ?? '').trim().toLowerCase();
  const categoryFilter = params.danh_muc ?? 'all';
  const pageSize = getPageSize(params.per_page);

  const [products, categories] = await Promise.all([listProductsAdmin(), listCategoriesAdmin()]);
  const categoryNameById = new Map(categories.map((category) => [category.category_id, category.name]));

  const filtered = products.filter((product) => {
    if (categoryFilter !== 'all' && String(product.category_id) !== categoryFilter) return false;
    if (!keyword) return true;
    return product.name.toLowerCase().includes(keyword) || product.slug.toLowerCase().includes(keyword);
  });
  // Bộ lọc được áp dụng trước khi cắt trang; paginateAdmin tự kẹp trang sai
  // về trang hợp lệ cuối cùng nếu số kết quả thay đổi.
  const page = paginateAdmin(filtered, parseAdminPage(params.trang), pageSize);

  return (
    <div className="w-full min-w-0 space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SectionTitle
          code="A02"
          title="Sản phẩm & tồn kho"
          description={`${formatNumber(page.total)} / ${formatNumber(products.length)} sản phẩm khớp bộ lọc`}
        />
        <Link
          href="/admin/san-pham/new"
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-[#c59a4b] px-4 py-2.5 text-sm font-bold text-[#120401] transition-colors hover:bg-[#d4af37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3dfae] sm:self-auto"
        >
          <Plus className="h-4 w-4" aria-hidden="true" /> Thêm sản phẩm
        </Link>
      </div>

      <ConfigNotice />

      <form method="get" className={`${adminCardClass} space-y-3`}>
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(220px,0.42fr)_auto]">
          <label htmlFor="product-search" className="relative min-w-0">
            <span className="sr-only">Tìm theo tên hoặc slug sản phẩm</span>
            <input
              id="product-search"
              type="search"
              name="q"
              defaultValue={params.q ?? ''}
              placeholder="Tìm theo tên hoặc slug…"
              className={`${adminInputClass} h-11 pl-10`}
            />
            <Search className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-[#a98a5f]" aria-hidden="true" />
          </label>
          <label htmlFor="product-category" className="min-w-0">
            <span className="sr-only">Lọc theo danh mục</span>
            <select id="product-category" name="danh_muc" defaultValue={categoryFilter} className={`${adminInputClass} h-11`}>
              <option value="all">Tất cả danh mục</option>
              {categories.map((category) => (
                <option key={category.category_id} value={String(category.category_id)}>{category.name}</option>
              ))}
            </select>
          </label>
          <input type="hidden" name="per_page" value={pageSize} />
          <div className="flex gap-2">
            <button
              type="submit"
              className="min-h-11 flex-1 rounded-xl bg-[#210c04] px-5 text-sm font-semibold text-[#f3dfae] transition-colors hover:bg-[#381a0b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59a4b]"
            >
              Tìm và lọc
            </button>
            {keyword || categoryFilter !== 'all' ? (
              <Link
                href={`/admin/san-pham?per_page=${pageSize}`}
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#5c2b12] px-4 text-sm font-medium text-[#c9b69a] transition-colors hover:bg-[#210c04] hover:text-[#f3dfae] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59a4b]"
              >
                Xóa lọc
              </Link>
            ) : null}
          </div>
        </div>
        <p className="text-xs text-[#c9b69a]">Tìm theo tên hoặc slug sản phẩm; Enter để áp dụng. Lọc mới sẽ bắt đầu từ trang đầu.</p>
      </form>

      <section className={`${adminCardClass} min-w-0`} aria-label="Danh sách sản phẩm">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-[#c59a4b]" aria-hidden="true" />
            <h3 className="text-sm font-bold text-[#f3dfae]">Danh sách sản phẩm</h3>
          </div>
          <p className="text-xs text-[#c9b69a]" role="status">
            {page.total === 0 ? 'Không có kết quả' : `Hiển thị ${formatNumber(page.from)}–${formatNumber(page.to)} trong ${formatNumber(page.total)} sản phẩm`}
          </p>
        </div>

        <div className="hidden overflow-x-auto xl:block">
          <table className="w-full min-w-[960px] table-fixed text-left text-sm text-[#c9b69a]">
            <colgroup>
              <col className="w-[64px]" /><col className="w-[28%]" /><col className="w-[15%]" />
              <col className="w-[13%]" /><col className="w-[15%]" /><col className="w-[12%]" /><col className="w-[210px]" />
            </colgroup>
            <thead className="border-b border-[#5c2b12] text-xs font-semibold text-[#c9b69a]">
              <tr>
                <th className="py-3 pr-3">Ảnh</th><th className="py-3 pr-3">Sản phẩm</th><th className="py-3 pr-3">Danh mục</th>
                <th className="py-3 pr-3 text-right">Giá bán</th><th className="py-3 pr-3 text-right">Tồn kho</th><th className="py-3 pr-3">Trạng thái</th><th className="py-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#381a0b]">
              {page.rows.length === 0 ? (
                <tr><td colSpan={7} className="py-10 text-center text-sm text-[#c9b69a]">Không có sản phẩm nào khớp bộ lọc.</td></tr>
              ) : page.rows.map((product) => (
                <tr key={product.product_id} className="transition-colors hover:bg-[#210c04]/40">
                  <td className="py-3 pr-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={product.thumbnail_url || 'https://i.pinimg.com/736x/22/1f/04/221f049c7d6b71722f484f5cf37978ca.jpg'} alt={product.name} className="h-12 w-12 rounded-xl border border-[#5c2b12] object-cover" />
                  </td>
                  <td className="py-3 pr-4">
                    <Link href={`/admin/san-pham/${product.product_id}`} className="font-semibold text-[#f3dfae] underline-offset-4 hover:text-[#d4af37] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59a4b]">{product.name}</Link>
                    <p className="mt-1 break-all font-mono text-xs text-[#c9b69a]">/{product.slug}</p>
                  </td>
                  <td className="py-3 pr-3">{categoryNameById.get(product.category_id) ?? '—'}</td>
                  <td className="py-3 pr-3 text-right font-mono font-semibold tabular-nums text-[#c59a4b]">{formatVND(product.price)}</td>
                  <td className="py-3 pr-3 text-right">
                    <p className="font-mono font-semibold tabular-nums text-[#f3dfae]">{formatNumber(product.stock)} <span className="font-sans font-normal text-[#c9b69a]">{product.unit}</span></p>
                    <div className="mt-1 flex justify-end"><StockStatus stock={product.stock} /></div>
                  </td>
                  <td className="py-3 pr-3">
                    {product.is_active ? <span className="inline-flex rounded-full border border-[#34d399]/40 bg-[#34d399]/10 px-2.5 py-1 text-xs font-semibold text-[#34d399]">Đang bán</span> : <span className="inline-flex rounded-full border border-[#5c2b12] bg-[#210c04] px-2.5 py-1 text-xs font-semibold text-[#c9b69a]">Đã ẩn</span>}
                  </td>
                  <td className="py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/san-pham/${product.product_id}`} className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#210c04] px-3 text-xs font-semibold text-[#f3dfae] transition-colors hover:bg-[#381a0b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59a4b]">Sửa</Link>
                      <form action={toggleProductActiveAction}>
                        <input type="hidden" name="product_id" value={String(product.product_id)} />
                        <input type="hidden" name="next_active" value={product.is_active ? 'false' : 'true'} />
                        <button type="submit" className="inline-flex min-h-10 items-center justify-center rounded-lg border border-[#5c2b12] px-3 text-xs font-semibold text-[#c9b69a] transition-colors hover:bg-[#210c04] hover:text-[#f3dfae] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59a4b]">{product.is_active ? 'Ẩn' : 'Hiện'}</button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-3 xl:hidden">
          {page.rows.length === 0 ? <p className="rounded-xl border border-[#5c2b12] px-4 py-8 text-center text-sm text-[#c9b69a]">Không có sản phẩm nào khớp bộ lọc.</p> : page.rows.map((product) => (
            <article key={product.product_id} className="min-w-0 rounded-xl border border-[#5c2b12] bg-[#120401]/35 p-3 sm:p-4">
              <div className="flex min-w-0 items-start gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.thumbnail_url || 'https://i.pinimg.com/736x/22/1f/04/221f049c7d6b71722f484f5cf37978ca.jpg'} alt={product.name} className="h-14 w-14 shrink-0 rounded-xl border border-[#5c2b12] object-cover" />
                <div className="min-w-0 flex-1">
                  <Link href={`/admin/san-pham/${product.product_id}`} className="break-words text-sm font-semibold text-[#f3dfae] underline-offset-4 hover:text-[#d4af37] hover:underline">{product.name}</Link>
                  <p className="mt-1 break-all font-mono text-xs text-[#c9b69a]">/{product.slug}</p>
                  <p className="mt-1 text-xs text-[#c9b69a]">{categoryNameById.get(product.category_id) ?? '—'}</p>
                </div>
                {product.is_active ? <span className="shrink-0 rounded-full border border-[#34d399]/40 bg-[#34d399]/10 px-2 py-1 text-xs font-semibold text-[#34d399]">Đang bán</span> : <span className="shrink-0 rounded-full border border-[#5c2b12] bg-[#210c04] px-2 py-1 text-xs font-semibold text-[#c9b69a]">Đã ẩn</span>}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 border-t border-[#381a0b] pt-3">
                <div><p className="text-xs text-[#c9b69a]">Giá bán</p><p className="mt-1 font-mono text-sm font-semibold tabular-nums text-[#c59a4b]">{formatVND(product.price)}</p></div>
                <div><p className="text-xs text-[#c9b69a]">Tồn kho</p><div className="mt-1 flex flex-wrap items-center gap-2"><span className="font-mono text-sm font-semibold tabular-nums text-[#f3dfae]">{formatNumber(product.stock)} {product.unit}</span><StockStatus stock={product.stock} /></div></div>
              </div>
              <div className="mt-3 flex gap-2 border-t border-[#381a0b] pt-3">
                <Link href={`/admin/san-pham/${product.product_id}`} className="inline-flex min-h-11 flex-1 items-center justify-center rounded-lg bg-[#210c04] px-3 text-sm font-semibold text-[#f3dfae] hover:bg-[#381a0b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59a4b]">Sửa sản phẩm</Link>
                <form action={toggleProductActiveAction} className="flex-1">
                  <input type="hidden" name="product_id" value={String(product.product_id)} />
                  <input type="hidden" name="next_active" value={product.is_active ? 'false' : 'true'} />
                  <button type="submit" className="min-h-11 w-full rounded-lg border border-[#5c2b12] px-3 text-sm font-semibold text-[#c9b69a] hover:bg-[#210c04] hover:text-[#f3dfae] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59a4b]">{product.is_active ? 'Ẩn sản phẩm' : 'Hiện sản phẩm'}</button>
                </form>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-3 border-t border-[#5c2b12] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <form method="get" className="flex flex-wrap items-center gap-2 sm:ml-auto">
            <input type="hidden" name="q" value={params.q ?? ''} />
            <input type="hidden" name="danh_muc" value={categoryFilter} />
            <label htmlFor="product-page-size" className="text-xs text-[#c9b69a]">Số sản phẩm / trang</label>
            <select id="product-page-size" name="per_page" defaultValue={String(pageSize)} className={`${adminInputClass} h-10 w-24`}>
              {PAGE_SIZE_OPTIONS.map((size) => <option key={size} value={size}>{size}</option>)}
            </select>
            <button type="submit" className="min-h-10 rounded-lg border border-[#5c2b12] px-3 text-xs font-semibold text-[#f3dfae] transition-colors hover:bg-[#210c04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59a4b]">Áp dụng</button>
          </form>
        </div>
        <AdminPagination
          page={page.page}
          totalItems={page.total}
          pageSize={pageSize}
          basePath="/admin/san-pham"
          params={{ ...params, per_page: String(pageSize) }}
          itemLabel="sản phẩm"
          showPageNumbers
        />
      </section>
    </div>
  );
}
