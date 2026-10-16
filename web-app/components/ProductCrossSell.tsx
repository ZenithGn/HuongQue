import Link from 'next/link';
import { ArrowUpRight, PackagePlus, TrendingUp } from 'lucide-react';
import { formatVND } from '@/lib/format';
import type { CrossSellProduct, UpsellProduct } from '@/lib/products';

interface ProductCrossSellProps {
  items: CrossSellProduct[];
  /** true khi dữ liệu lấy từ sản phẩm cùng danh mục thay vì RPC mua kèm. */
  isCategoryFallback?: boolean;
}

/** C04 – "Thường mua kèm" (RPC `product_cross_sell`, rỗng thì fallback cùng danh mục). */
export function ProductCrossSell({ items, isCategoryFallback = false }: ProductCrossSellProps) {
  if (items.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        {/* Nhãn cũ "Gợi ý combo tiết kiệm" vừa lặp lại đúng điều thẻ h2 dưới đã nói, vừa HỨA SAI:
            module này chỉ liệt kê món khách hay mua kèm (RPC `product_cross_sell`), không có giảm
            giá nào. Nên nó biến mất. Nhánh fallback giữ nhãn vì ở đó có thông tin thật: danh sách
            này là sản phẩm cùng danh mục, KHÔNG phải dữ liệu mua kèm. */}
        {isCategoryFallback && (
          <span className="text-xs font-bold uppercase tracking-wider text-[#c59a4b]">
            Cùng danh mục
          </span>
        )}
        <h2 className="text-xl font-serif font-bold text-[#f3dfae] flex items-center gap-2">
          <PackagePlus className="w-5 h-5 text-[#c59a4b]" />
          Thường Được Mua Kèm
        </h2>
        <p className="text-xs text-[#c9b69a]">
          {isCategoryFallback
            ? 'Các hộp quà cùng nhóm đang được khách chọn nhiều trong mùa Tết này.'
            : 'Khách thường thêm những món này vào cùng đơn để hộp quà thêm đủ đầy.'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.product_id}
            className="group flex flex-col bg-[#180702]/90 rounded-2xl border border-[#5c2b12] hover:border-[#c59a4b]/50 transition-all overflow-hidden"
          >
            <Link
              href={`/san-pham/${item.slug}`}
              className="relative aspect-square w-full overflow-hidden bg-[#120401] block"
            >
              <img
                src={item.thumbnail_url || 'https://i.pinimg.com/736x/4d/6d/0d/4d6d0d7d20eb3df7f8ba748fef844944.jpg'}
                alt={item.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              {item.times_bought_together > 0 && (
                <span className="absolute bottom-3 left-3 flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded bg-[#2a0707]/90 text-[#c59a4b] border border-[#5c2b12]/40">
                  <TrendingUp className="w-3 h-3" />
                  {item.times_bought_together} lượt mua kèm
                </span>
              )}
            </Link>

            <div className="p-4 flex flex-col flex-1 justify-between gap-3">
              <h3 className="font-serif font-bold text-sm text-[#f3dfae] line-clamp-2 leading-snug">
                <Link href={`/san-pham/${item.slug}`} className="hover:text-[#c59a4b] transition-colors">
                  {item.name}
                </Link>
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold font-mono text-[#c59a4b]">{formatVND(item.price)}</span>
                <Link
                  href={`/san-pham/${item.slug}`}
                  className="text-[11px] font-semibold px-2.5 py-1.5 rounded-lg bg-[#c59a4b]/15 text-[#c59a4b] hover:bg-[#c59a4b] hover:text-[#120401] transition-all flex items-center gap-1"
                >
                  Xem <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ProductUpsellProps {
  items: UpsellProduct[];
}

/** C04 – "Nâng cấp hộp quà" (RPC `product_upsell`). */
export function ProductUpsell({ items }: ProductUpsellProps) {
  if (items.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <span className="text-xs font-bold uppercase tracking-wider text-[#c59a4b]">
          Nâng cấp hộp quà
        </span>
        <h2 className="text-xl font-serif font-bold text-[#f3dfae]">
          Lên Đời Hộp Quà Cao Cấp Hơn
        </h2>
        <p className="text-xs text-[#c9b69a]">
          Chỉ thêm một khoản nhỏ để hộp quà thêm sang trọng, phù hợp biếu đối tác và người thân.
        </p>
      </div>

      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.product_id}
            className="flex items-center gap-4 p-4 rounded-2xl bg-[#180702]/70 border border-[#5c2b12] hover:border-[#c59a4b]/40 transition-colors"
          >
            <Link
              href={`/san-pham/${item.slug}`}
              className="w-16 h-16 rounded-xl overflow-hidden bg-[#120401] shrink-0"
            >
              <img
                src={item.thumbnail_url || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&auto=format&fit=crop&q=80'}
                alt={item.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </Link>

            <div className="flex-1 min-w-0">
              <h3 className="font-serif font-bold text-sm text-[#f3dfae] truncate">
                <Link href={`/san-pham/${item.slug}`} className="hover:text-[#c59a4b] transition-colors">
                  {item.name}
                </Link>
              </h3>
              <p className="text-xs text-[#c9b69a] mt-1">
                Giá nâng cấp:{' '}
                <span className="text-[#c59a4b] font-semibold">
                  {item.price_difference > 0 ? `+${formatVND(item.price_difference)}` : 'Không đổi'}
                </span>
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className="text-sm font-bold font-mono text-[#c59a4b] block">{formatVND(item.price)}</span>
              <Link
                href={`/san-pham/${item.slug}`}
                className="text-[11px] font-semibold text-[#c59a4b] hover:text-[#c59a4b] inline-flex items-center gap-1"
              >
                Xem hộp quà <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
