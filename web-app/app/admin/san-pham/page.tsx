import Link from 'next/link';
import { listCategoriesAdmin, listProductsAdmin } from '@/lib/actions/admin/data';
import {
  ADMIN_PAGE_SIZE,
  paginateAdmin,
  parseAdminPage,
} from '@/lib/actions/admin/pagination';
import { toggleProductActiveAction } from '@/lib/actions/admin/products';
import { AdminPagination } from '@/components/admin/AdminPagination';
import { ConfigNotice } from '@/components/admin/ConfigNotice';
import { adminCardClass, adminInputClass, SectionTitle } from '@/components/admin/FormBits';
import { formatNumber, formatVND } from '@/lib/format';
import { Plus, Search } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = { title: 'Sản phẩm – Quản trị Hương Quê' };

/** `searchParams` của A02: bộ lọc + `trang` (phân trang phía server). */
type ProductsSearchParams = { trang?: string; q?: string; danh_muc?: string };

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<ProductsSearchParams>;
}) {
  const params = await searchParams;
  const keyword = (params.q ?? '').trim().toLowerCase();
  const categoryFilter = params.danh_muc ?? 'all';

  const [products, categories] = await Promise.all([
    listProductsAdmin(),
    listCategoriesAdmin(),
  ]);

  const categoryNameById = new Map(categories.map((c) => [c.category_id, c.name]));

  const filtered = products.filter((product) => {
    if (categoryFilter !== 'all' && String(product.category_id) !== categoryFilter) return false;
    if (!keyword) return true;
    return (
      product.name.toLowerCase().includes(keyword) ||
      product.slug.toLowerCase().includes(keyword)
    );
  });

  // Lọc trước rồi mới cắt trang: "tổng N" là số sản phẩm khớp bộ lọc.
  const page = paginateAdmin(filtered, parseAdminPage(params.trang), ADMIN_PAGE_SIZE);

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <SectionTitle
          code="A02"
          title="Sản phẩm & tồn kho"
          description={`${formatNumber(page.total)} / ${formatNumber(products.length)} sản phẩm khớp bộ lọc · trang ${page.page}/${page.totalPages}. Ẩn sản phẩm thay vì xóa khi đã có đơn hàng.`}
        />
        <Link
          href="/admin/san-pham/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#c59a4b] text-[#120401] text-xs font-bold hover:bg-[#d4af37] transition-colors"
        >
          <Plus className="w-4 h-4" /> Thêm sản phẩm
        </Link>
      </div>

      <ConfigNotice />

      <form method="get" className={`${adminCardClass} flex flex-col sm:flex-row gap-3`}>
        <div className="relative flex-1">
          <input
            type="search"
            name="q"
            defaultValue={params.q ?? ''}
            placeholder="Tìm theo tên hoặc slug…"
            className={`${adminInputClass} pl-9`}
          />
          <Search className="w-4 h-4 text-[#a98a5f] absolute left-3 top-2.5" />
        </div>
        <select name="danh_muc" defaultValue={categoryFilter} className={`${adminInputClass} sm:w-64`}>
          <option value="all">Tất cả danh mục</option>
          {categories.map((category) => (
            <option key={category.category_id} value={String(category.category_id)}>
              {category.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-[#210c04] text-[#f3dfae] text-xs font-semibold hover:bg-[#381a0b] transition-colors"
        >
          Lọc
        </button>
      </form>

      <div className={`${adminCardClass} overflow-x-auto`}>
        <table className="w-full text-left text-xs text-[#c9b69a]">
          <thead className="uppercase font-mono tracking-wider text-[#c9b69a] border-b border-[#5c2b12]">
            <tr>
              <th className="py-3 pr-4">Ảnh</th>
              <th className="py-3 pr-4">Sản phẩm</th>
              <th className="py-3 pr-4">Danh mục</th>
              <th className="py-3 pr-4 text-right">Giá bán</th>
              <th className="py-3 pr-4 text-right">Tồn kho</th>
              <th className="py-3 pr-4">Trạng thái</th>
              <th className="py-3 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#381a0b]">
            {page.rows.length === 0 && (
              <tr>
                <td colSpan={7} className="py-8 text-center text-[#a98a5f]">
                  Không có sản phẩm nào khớp bộ lọc.
                </td>
              </tr>
            )}
            {page.rows.map((product) => (
              <tr key={product.product_id} className="hover:bg-[#210c04]/40 transition-colors">
                <td className="py-3 pr-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      product.thumbnail_url ||
                      'https://i.pinimg.com/736x/22/1f/04/221f049c7d6b71722f484f5cf37978ca.jpg'
                    }
                    alt={product.name}
                    className="w-11 h-11 rounded-xl object-cover border border-[#5c2b12]"
                  />
                </td>
                <td className="py-3 pr-4">
                  <p className="font-semibold text-[#f3dfae]">{product.name}</p>
                  <p className="text-[11px] text-[#a98a5f] font-mono">/{product.slug}</p>
                </td>
                <td className="py-3 pr-4">{categoryNameById.get(product.category_id) ?? '—'}</td>
                <td className="py-3 pr-4 text-right font-mono text-[#c59a4b]">
                  {formatVND(product.price)}
                </td>
                <td className="py-3 pr-4 text-right font-mono">
                  {formatNumber(product.stock)} {product.unit}
                </td>
                <td className="py-3 pr-4">
                  {product.is_active ? (
                    <span className="px-2 py-0.5 rounded-full bg-[#34d399]/10 text-[#34d399] border border-[#34d399]/40 text-[11px]">
                      Đang bán
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-[#210c04] text-[#c9b69a] text-[11px]">
                      Đã ẩn
                    </span>
                  )}
                </td>
                <td className="py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/san-pham/${product.product_id}`}
                      className="px-3 py-1.5 rounded-xl bg-[#210c04] hover:bg-[#381a0b] text-[#f3dfae] font-medium"
                    >
                      Sửa
                    </Link>
                    <form action={toggleProductActiveAction}>
                      <input type="hidden" name="product_id" value={String(product.product_id)} />
                      <input
                        type="hidden"
                        name="next_active"
                        value={product.is_active ? 'false' : 'true'}
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 rounded-xl border border-[#5c2b12] hover:bg-[#210c04] text-[#c9b69a] font-medium"
                      >
                        {product.is_active ? 'Ẩn' : 'Hiện'}
                      </button>
                    </form>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <AdminPagination
          page={page.page}
          totalItems={page.total}
          pageSize={ADMIN_PAGE_SIZE}
          basePath="/admin/san-pham"
          params={params}
          itemLabel="sản phẩm"
        />
      </div>
    </div>
  );
}
