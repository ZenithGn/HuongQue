import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  ADMIN_PAGE_PARAM,
  ADMIN_PAGE_SIZE,
  buildAdminQuery,
  type SearchParamValue,
} from '@/lib/actions/admin/pagination';
import { formatNumber } from '@/lib/format';

/**
 * Thanh phân trang dùng chung cho MỌI bảng dữ liệu quản trị (A02, A04, A05, A06, F11).
 *
 * Đây là Server Component thuần link (`next/link`), không dùng hook, nên:
 * - phân trang chạy phía server qua `searchParams` (`?trang=2`);
 * - mọi tham số LỌC hiện có (trạng thái / phương thức / từ khóa / khoảng ngày…)
 *   được giữ nguyên khi bấm Trước/Sau;
 * - hoạt động cả trên desktop lẫn mobile (bố cục wrap).
 */
export function AdminPagination({
  page,
  totalItems,
  pageSize = ADMIN_PAGE_SIZE,
  basePath = '',
  params = {},
  pageParam = ADMIN_PAGE_PARAM,
  itemLabel = 'dòng',
  showPageNumbers = false,
  className = '',
}: {
  /** Trang hiện tại (1-based). */
  page: number;
  /** Tổng số dòng sau khi lọc. */
  totalItems: number;
  pageSize?: number;
  /** Đường dẫn trang, ví dụ `/admin/don-hang`. Bỏ trống thì dùng URL tương đối. */
  basePath?: string;
  /** `searchParams` hiện tại để giữ nguyên bộ lọc. */
  params?: Record<string, SearchParamValue>;
  pageParam?: string;
  itemLabel?: string;
  /** Hiện các trang lân cận để đến nhanh trang cụ thể ở danh sách dài. */
  showPageNumbers?: boolean;
  className?: string;
}) {
  const size = pageSize >= 1 ? Math.floor(pageSize) : ADMIN_PAGE_SIZE;
  const totalPages = Math.max(1, Math.ceil(totalItems / size));
  const current = Math.min(Math.max(1, Math.floor(page) || 1), totalPages);
  const from = totalItems === 0 ? 0 : (current - 1) * size + 1;
  const to = Math.min(current * size, totalItems);

  const hrefFor = (target: number) =>
    `${basePath}${buildAdminQuery(params, { [pageParam]: target > 1 ? target : undefined })}`;

  const visiblePages = [...new Set([1, current - 1, current, current + 1, totalPages])]
    .filter((target) => target >= 1 && target <= totalPages)
    .sort((a, b) => a - b)
    .flatMap((target, index, pages) => {
      if (index === 0) return [target];
      const previous = pages[index - 1];
      if (target - previous === 2) return [previous + 1, target];
      if (target - previous > 2) return ['ellipsis', target] as const;
      return [target];
    });

  const navButton =
    'inline-flex min-h-10 min-w-10 items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c59a4b]';

  return (
    <nav
      aria-label="Phân trang"
      className={`flex flex-wrap items-center justify-between gap-3 pt-4 ${className}`}
    >
      <p className="text-xs text-[#c9b69a]">
        Trang <strong className="font-mono text-[#f3dfae]">{current}</strong>/
        <span className="font-mono">{totalPages}</span> · tổng{' '}
        <strong className="font-mono text-[#f3dfae]">{formatNumber(totalItems)}</strong> {itemLabel}
        {totalItems > 0 ? (
          <span className="text-[#c9b69a]">
            {' '}
            (đang xem {formatNumber(from)}–{formatNumber(to)})
          </span>
        ) : null}
      </p>

      <div className="flex flex-wrap items-center justify-end gap-1.5">
        {showPageNumbers
          ? visiblePages.map((target, index) =>
              target === 'ellipsis' ? (
                <span key={`ellipsis-${index}`} aria-hidden="true" className="px-1 text-xs text-[#c9b69a]">…</span>
              ) : (
                <Link
                  key={target}
                  href={hrefFor(target)}
                  aria-current={target === current ? 'page' : undefined}
                  aria-label={`Trang ${target}`}
                  className={`${navButton} px-3 ${target === current
                    ? 'border-[#c59a4b] bg-[#c59a4b] text-[#120401]'
                    : 'border-[#5c2b12] text-[#f3dfae] hover:bg-[#210c04]'
                  }`}
                >
                  {target}
                </Link>
              )
            )
          : null}
        {current > 1 ? (
          <Link
            href={hrefFor(current - 1)}
            rel="prev"
            className={`${navButton} border-[#5c2b12] text-[#f3dfae] hover:bg-[#210c04]`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Trước
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className={`${navButton} border-[#5c2b12] text-[#a98a5f] cursor-not-allowed`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Trước
          </span>
        )}

        {current < totalPages ? (
          <Link
            href={hrefFor(current + 1)}
            rel="next"
            className={`${navButton} border-[#5c2b12] text-[#f3dfae] hover:bg-[#210c04]`}
          >
            Sau
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className={`${navButton} border-[#5c2b12] text-[#a98a5f] cursor-not-allowed`}
          >
            Sau
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        )}
      </div>
    </nav>
  );
}
