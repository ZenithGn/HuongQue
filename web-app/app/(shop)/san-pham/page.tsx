import Link from 'next/link';
import { getCategories, searchProducts } from '@/lib/products';
import { ProductGrid } from '@/components/ProductGrid';
import { Filter, SlidersHorizontal, Check, RotateCcw } from 'lucide-react';

interface SanPhamPageProps {
  searchParams: Promise<{
    mien?: string;
    danh_muc?: string;
    gia_min?: string;
    gia_max?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function SanPhamPage({ searchParams }: SanPhamPageProps) {
  const params = await searchParams;
  const currentMien = params.mien || 'all';
  const currentCategory = params.danh_muc || 'all';
  const currentSort = params.sort || 'newest';
  const currentPage = Number(params.page) || 1;

  const [categories, searchResult] = await Promise.all([
    getCategories(),
    searchProducts(params),
  ]);

  const { products, total, totalPages } = searchResult;
  const isOutOfRangePage = products.length === 0 && currentPage > 1;

  function buildFilterUrl(newParams: Record<string, string | number | undefined>) {
    const merged = { ...params, ...newParams };
    const query = new URLSearchParams();
    Object.entries(merged).forEach(([k, v]) => {
      if (v !== undefined && v !== '' && v !== 'all') {
        query.set(k, String(v));
      }
    });
    return `/san-pham${query.toString() ? `?${query.toString()}` : ''}`;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 text-[#f3dfae]">
      {/* Header & Page Title */}
      <div className="space-y-2 border-b border-[#5c2b12]/60 pb-6">
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-[#f3dfae] tracking-tight">
          Tất Cả Đặc Sản & Quà Tết
        </h1>
        <p className="text-xs sm:text-sm text-[#c9b69a]">
          Tìm thấy <span className="text-[#c59a4b] font-bold">{total}</span> sản phẩm đặc sắc ba miền sẵn sàng phục vụ dịp Tết.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside className="space-y-6">
          <div className="p-5 rounded-2xl bg-[#180702]/90 border border-[#5c2b12]/50 space-y-6 shadow-2xl backdrop-blur-sm">

            {/* Header Bộ Lọc */}
            <div className="flex items-center justify-between pb-3 border-b border-[#381a0b]">
              <div className="flex items-center gap-2 text-[#f3dfae] font-serif font-bold text-sm tracking-wide">
                <Filter className="w-4 h-4 text-[#c49a52]" />
                <span>BỘ LỌC SẢN PHẨM</span>
              </div>
            </div>

            {/* 1. VÙNG MIỀN */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c49a52] block px-1">
                VÙNG MIỀN
              </label>
              <div className="flex flex-col gap-1.5 text-xs">
                {[
                  { id: 'all', label: 'Tất cả vùng miền' },
                  { id: 'bac', label: 'Đặc sản Miền Bắc' },
                  { id: 'trung', label: 'Đặc sản Miền Trung' },
                  { id: 'nam', label: 'Đặc sản Miền Nam' },
                  { id: 'ba_mien', label: 'Hộp quà Ba Miền' },
                ].map((item) => {
                  const isActive = currentMien === item.id;
                  return (
                    <Link
                      key={item.id}
                      href={buildFilterUrl({ mien: item.id, page: 1 })}
                      className={`group relative flex items-center justify-between rounded-xl px-3.5 py-2.5 font-medium transition-all duration-300 ${isActive
                          ? 'bg-gradient-to-r from-[#b8863b] via-[#d4af37] to-[#b8863b] text-[#120401] font-bold shadow-[0_0_15px_rgba(212,175,55,0.35)] scale-[1.02]'
                          : 'bg-[#210c04]/40 text-[#c9b69a] border border-[#5c2b12]/30 hover:border-[#c59a4b]/50 hover:bg-[#2b1005] hover:text-[#f3dfae] hover:translate-x-1'
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] transition-colors ${isActive ? 'text-[#120401]' : 'text-[#c49a52]'}`}>
                          ✦
                        </span>
                        <span>{item.label}</span>
                      </div>
                      {isActive && <Check className="w-3.5 h-3.5 text-[#120401]" />}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* 2. DANH MỤC */}
            <div className="space-y-2 pt-3 border-t border-[#381a0b]">
              <label className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c49a52] block px-1">
                DANH MỤC
              </label>
              <div className="flex flex-col gap-1.5 text-xs">
                <Link
                  href={buildFilterUrl({ danh_muc: 'all', page: 1 })}
                  className={`group relative flex items-center justify-between rounded-xl px-3.5 py-2.5 font-medium transition-all duration-300 ${currentCategory === 'all'
                      ? 'bg-gradient-to-r from-[#b8863b] via-[#d4af37] to-[#b8863b] text-[#120401] font-bold shadow-[0_0_15px_rgba(212,175,55,0.35)] scale-[1.02]'
                      : 'bg-[#210c04]/40 text-[#c9b69a] border border-[#5c2b12]/30 hover:border-[#c59a4b]/50 hover:bg-[#2b1005] hover:text-[#f3dfae] hover:translate-x-1'
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] transition-colors ${currentCategory === 'all' ? 'text-[#120401]' : 'text-[#c49a52]'}`}>
                      ✦
                    </span>
                    <span>Tất cả danh mục</span>
                  </div>
                  {currentCategory === 'all' && <Check className="w-3.5 h-3.5 text-[#120401]" />}
                </Link>

                {categories.map((cat) => {
                  const isActive = currentCategory === cat.slug;
                  return (
                    <Link
                      key={cat.slug}
                      href={buildFilterUrl({ danh_muc: cat.slug, page: 1 })}
                      className={`group relative flex items-center justify-between rounded-xl px-3.5 py-2.5 font-medium transition-all duration-300 ${isActive
                          ? 'bg-gradient-to-r from-[#b8863b] via-[#d4af37] to-[#b8863b] text-[#120401] font-bold shadow-[0_0_15px_rgba(212,175,55,0.35)] scale-[1.02]'
                          : 'bg-[#210c04]/40 text-[#c9b69a] border border-[#5c2b12]/30 hover:border-[#c59a4b]/50 hover:bg-[#2b1005] hover:text-[#f3dfae] hover:translate-x-1'
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] transition-colors ${isActive ? 'text-[#120401]' : 'text-[#c49a52]'}`}>
                          ✦
                        </span>
                        <span>{cat.name}</span>
                      </div>
                      {isActive && <Check className="w-3.5 h-3.5 text-[#120401]" />}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* 3. KHOẢNG GIÁ */}
            <div className="space-y-2 pt-3 border-t border-[#381a0b]">
              <label className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c49a52] block px-1">
                KHOẢNG GIÁ
              </label>
              <div className="flex flex-col gap-1.5 text-xs">
                {[
                  { label: 'Tất cả mức giá', min: undefined, max: undefined },
                  { label: 'Dưới 100.000₫', min: undefined, max: 100000 },
                  { label: '100.000₫ – 300.000₫', min: 100000, max: 300000 },
                  { label: '300.000₫ – 600.000₫', min: 300000, max: 600000 },
                  { label: 'Trên 600.000₫ (Hộp VIP)', min: 600000, max: undefined },
                ].map((item, idx) => {
                  const isActive =
                    String(params.gia_min || '') === String(item.min || '') &&
                    String(params.gia_max || '') === String(item.max || '');

                  return (
                    <Link
                      key={idx}
                      href={buildFilterUrl({
                        gia_min: item.min,
                        gia_max: item.max,
                        page: 1,
                      })}
                      className={`group relative flex items-center justify-between rounded-xl px-3.5 py-2.5 font-medium transition-all duration-300 ${isActive
                          ? 'bg-gradient-to-r from-[#b8863b] via-[#d4af37] to-[#b8863b] text-[#120401] font-bold shadow-[0_0_15px_rgba(212,175,55,0.35)] scale-[1.02]'
                          : 'bg-[#210c04]/40 text-[#c9b69a] border border-[#5c2b12]/30 hover:border-[#c59a4b]/50 hover:bg-[#2b1005] hover:text-[#f3dfae] hover:translate-x-1'
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] transition-colors ${isActive ? 'text-[#120401]' : 'text-[#c49a52]'}`}>
                          ✦
                        </span>
                        <span>{item.label}</span>
                      </div>
                      {isActive && <Check className="w-3.5 h-3.5 text-[#120401]" />}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Nút Xóa Tất Cả */}
            <div className="pt-2 border-t border-[#381a0b]">
              <Link
                href="/san-pham"
                className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl border border-[#5c2b12]/60 bg-[#210c04]/50 text-xs font-medium text-[#c49a52] hover:bg-[#381a0b] hover:text-[#f3dfae] hover:border-[#c59a4b] transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Xóa bộ lọc</span>
              </Link>
            </div>

          </div>
        </aside>

        {/* Product Grid & Sorting */}
        <section className="lg:col-span-3 space-y-6">
          {/* Top Sort Bar */}
          <div className="p-4 rounded-2xl bg-[#180702]/90 border border-[#5c2b12]/50 flex flex-wrap items-center justify-between gap-4 text-xs shadow-lg backdrop-blur-sm">
            <span className="text-[#c9b69a]">
              Trang <strong className="text-[#f3dfae]">{currentPage}</strong> / {totalPages || 1}
            </span>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#c49a52]" />
              <span className="text-[#c9b69a] font-medium">Sắp xếp:</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'newest', label: 'Mới nhất' },
                  { id: 'price-asc', label: 'Giá tăng dần' },
                  { id: 'price-desc', label: 'Giá giảm dần' },
                  { id: 'featured', label: 'Nổi bật' },
                ].map((s) => {
                  const isSortActive = currentSort === s.id;
                  return (
                    <Link
                      key={s.id}
                      href={buildFilterUrl({ sort: s.id, page: 1 })}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${isSortActive
                          ? 'bg-gradient-to-r from-[#b8863b] to-[#d4af37] text-[#120401] font-bold shadow-[0_0_10px_rgba(212,175,55,0.4)] scale-105'
                          : 'bg-[#210c04]/40 text-[#c9b69a] hover:text-[#f3dfae] border border-[#5c2b12]/40 hover:border-[#78502a]'
                        }`}
                    >
                      {s.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Grid list */}
          {isOutOfRangePage ? (
            <div className="py-12 text-center space-y-4 bg-[#180702]/80 rounded-2xl border border-dashed border-[#5c2b12] p-8 shadow-inner">
              <h3 className="text-lg font-serif font-bold text-[#f3dfae]">
                Không còn sản phẩm ở trang này
              </h3>
              <p className="text-xs text-[#c9b69a] max-w-md mx-auto leading-relaxed">
                Trang <strong className="text-[#c59a4b]">{currentPage}</strong> đã vượt quá danh sách
                hiện có (tổng {total} sản phẩm). Hãy quay lại trang đầu để xem đầy đủ bộ sưu tập quà Tết.
              </p>
              <Link
                href={buildFilterUrl({ page: 1 })}
                className="inline-block text-xs font-bold px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#b8863b] to-[#d4af37] text-[#120401] hover:brightness-110 transition-all uppercase tracking-wider shadow"
              >
                Về trang 1
              </Link>
            </div>
          ) : (
            <ProductGrid products={products} />
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              {Array.from({ length: totalPages }).map((_, index) => {
                const pageNum = index + 1;
                const isPageActive = currentPage === pageNum;
                return (
                  <Link
                    key={pageNum}
                    href={buildFilterUrl({ page: pageNum })}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${isPageActive
                        ? 'bg-gradient-to-r from-[#b8863b] to-[#d4af37] text-[#120401] shadow-[0_0_12px_rgba(212,175,55,0.4)] scale-110'
                        : 'bg-[#180702]/80 border border-[#5c2b12]/50 text-[#c9b69a] hover:bg-[#210c04] hover:text-[#f3dfae] hover:border-[#78502a]'
                      }`}
                  >
                    {pageNum}
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}