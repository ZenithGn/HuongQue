import Link from 'next/link';
import { Product } from '@/lib/types';
import { Star, MapPin, Tag } from 'lucide-react';
import { AddToCartButton } from '@/components/AddToCartButton';
import { ProductThumb } from '@/components/ProductThumb';

interface ProductCardProps {
  product: Product;
  /**
   * Dáng khung ảnh. Mặc định `square` cho lưới danh mục; trang chủ truyền `landscape` vì ở đó
   * chỉ có 6 hộp quà cỡ lớn — ảnh vuông 392px làm mỗi card cao 586px và cả khối chiếm 32% trang.
   * Hộp quà cũng vốn rộng hơn cao, nên khung 4:3 cắt đúng dáng hơn.
   */
  imageAspect?: 'square' | 'landscape';
}

const REGION_LABELS: Record<Product['region'], string> = {
  bac: 'Vị Bắc',
  trung: 'Vị Trung',
  nam: 'Vị Nam',
  ba_mien: 'Ba Miền',
};

/**
 * Card sản phẩm — bề mặt nội dung trong hệ Sơn Mài.
 *
 * Một bảng màu duy nhất (The One-World Rule): không còn `stone-*` / `amber-*` mặc định của
 * Tailwind. Nhãn vùng miền dùng **cùng một công thức chip** cho cả bốn miền — phân biệt bằng
 * chữ, không bằng màu, vì bảng Sơn Mài chỉ có ba sắc vàng và một sắc đỏ báo hiệu.
 * Mọi chữ mang thông tin đều đạt sàn 12px và dùng màu đặc (không opacity dưới 70%).
 */
export function ProductCard({ product, imageAspect = 'square' }: ProductCardProps) {
  const discountPercent =
    product.compare_at_price && product.compare_at_price > product.price
      ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
      : null;

  const regionLabel = REGION_LABELS[product.region] ?? 'Đặc sản';

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#5c2b12] bg-[#180702] transition-colors duration-300 hover:border-[#c59a4b]">
      {/* vệt sáng kim loại ở đỉnh card */}
      <div
        aria-hidden
        className="absolute inset-x-[12%] top-0 z-10 h-px bg-gradient-to-r from-transparent via-[#c59a4b]/60 to-transparent"
      />

      {/* Ảnh là link; các nhãn (vùng miền, giảm giá, tồn kho) nằm NGOÀI link và
          `pointer-events-none`. Trước đây chúng nằm trong `<a>` nên tên truy cập của link bị
          nhiễm thành "Ba Miền-10%" — trình đọc màn hình đọc đúng thứ đó thay vì tên sản phẩm. */}
      <div
        className={`relative w-full overflow-hidden bg-[#120401] ${
          imageAspect === 'landscape' ? 'aspect-[4/3]' : 'aspect-square'
        }`}
      >
        <Link
          href={`/san-pham/${product.slug}`}
          aria-label={`Xem ${product.name}`}
          className="block h-full w-full"
        >
          <ProductThumb
            src={product.thumbnail_url}
            alt=""
            fallbackLabel={regionLabel}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <span className="pointer-events-none absolute left-3 top-3 rounded-full border border-[#5c2b12] bg-[#210c04] px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-[#c59a4b]">
          {regionLabel}
        </span>

        {/* Giảm giá không dùng đỏ: theo The Red-Is-A-Signal Rule, đỏ lễ hội chỉ đánh dấu MỘT
            tín hiệu mỗi màn hình (ở đây là mốc Mùng 1 Tết trên trục thời gian). */}
        {discountPercent ? (
          <span className="pointer-events-none absolute right-3 top-3 flex items-center gap-1 rounded-full border border-[#c59a4b] bg-[#120401]/90 px-2.5 py-1 text-xs font-bold text-[#d4af37]">
            <Tag aria-hidden className="h-3.5 w-3.5" />
            -{discountPercent}%
          </span>
        ) : null}

        {product.stock <= 0 ? (
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#120401]/75">
            <span className="rounded-full border border-[#a33b20] bg-[#861b1b] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#f3dfae]">
              Tạm hết hàng
            </span>
          </span>
        ) : product.stock <= 5 ? (
          <span className="pointer-events-none absolute bottom-3 left-3 rounded-full border border-[#5c2b12] bg-[#210c04] px-2.5 py-1 text-xs font-semibold text-[#f3dfae]">
            Chỉ còn {product.stock} {product.unit}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col justify-between gap-3 p-4">
        <div>
          <div className="mb-1.5 flex items-center justify-between gap-2 text-[13px] text-[#c9b69a]">
            <span className="flex min-w-0 items-center gap-1 truncate">
              <MapPin aria-hidden className="h-3.5 w-3.5 shrink-0 text-[#c59a4b]" />
              {product.origin || 'Việt Nam'}
            </span>
            <span className="flex shrink-0 items-center gap-1 font-semibold text-[#c59a4b]">
              <Star aria-hidden className="h-3.5 w-3.5 fill-[#c59a4b]" />
              {product.rating_avg.toFixed(1)}
              <span className="font-normal text-[#c9b69a]">({product.rating_count})</span>
            </span>
          </div>

          {/* `line-clamp-2`: tên sản phẩm dài không được làm card cao thấp khác nhau trong lưới.
              Cỡ 18px để tiêu đề card đứng trên văn xuôi 16px và trên dòng giá 16px. */}
          <h3 className="line-clamp-2 font-serif text-lg font-bold leading-snug text-[#f3dfae] transition-colors group-hover:text-[#d4af37]">
            <Link href={`/san-pham/${product.slug}`}>{product.name}</Link>
          </h3>

          {product.short_description ? (
            <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[#c9b69a]">
              {product.short_description}
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#381a0b] pt-3">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-[#c59a4b]">
                {product.price.toLocaleString('vi-VN')}₫
              </span>
              <span className="text-[13px] text-[#c9b69a]">/{product.unit}</span>
            </div>
            {product.compare_at_price ? (
              <span className="text-[13px] text-[#c9b69a] line-through">
                {product.compare_at_price.toLocaleString('vi-VN')}₫
              </span>
            ) : null}
          </div>

          {/* Chỉ MỘT hành động trong card. Ảnh và tiêu đề đã là link tới trang chi tiết, nên nút
              "Chi tiết" thứ hai là mục tiêu thừa — và ở ~160px nó làm hàng action wrap hai dòng.
              Lớp truyền vào phải tự đổi theo tồn kho: `AddToCartButton` dùng `className ?? …`,
              nên truyền className sẽ ghi đè luôn cả trạng thái hết hàng. */}
          <AddToCartButton
            productId={product.product_id}
            stock={product.stock}
            quantity={1}
            productName={product.name}
            className={
              product.stock <= 0
                ? 'inline-flex min-h-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-[#5c2b12] bg-[#210c04] px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#c9b69a] disabled:cursor-not-allowed'
                : 'inline-flex min-h-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-[#c59a4b] bg-gradient-to-r from-[#b8863b] via-[#d4af37] to-[#b8863b] px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#120401] transition hover:brightness-110 disabled:cursor-not-allowed'
            }
          />
        </div>
      </div>
    </div>
  );
}
