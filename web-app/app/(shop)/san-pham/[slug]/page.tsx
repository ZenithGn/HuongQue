import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  getProductBySlug,
  getProductImages,
  getProductReviews,
  getCrossSellProducts,
  getUpsellProducts,
  getProductsByCategory,
  getBestSellingProducts,
  type CrossSellProduct,
} from '@/lib/products';
import { asNumber, formatVND } from '@/lib/format';
import { ProductCard } from '@/components/ProductCard';
import { ProductReviews } from '@/components/ProductReviews';
import { ProductCrossSell, ProductUpsell } from '@/components/ProductCrossSell';
import { ProductPurchasePanel } from '@/components/ProductPurchasePanel';
import { ViewItemTracker } from '@/components/ViewItemTracker';
import { ProductGallery } from './ProductGallery';
import {
  MapPin,
  Building,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

const FALLBACK_IMAGE =
  'https://i.pinimg.com/736x/22/1f/04/221f049c7d6b71722f484f5cf37978ca.jpg';

interface SanPhamDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: SanPhamDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Không tìm thấy sản phẩm | Hương Quê',
      description: 'Sản phẩm bạn tìm kiếm không tồn tại hoặc đã ngừng kinh doanh.',
    };
  }

  const description =
    product.short_description ||
    (product.description ? product.description.slice(0, 160) : `${product.name} – đặc sản quà Tết Hương Quê.`);

  return {
    title: `${product.name} | Hương Quê`,
    description,
    openGraph: {
      title: product.name,
      description,
      type: 'website',
      images: product.thumbnail_url
        ? [{ url: product.thumbnail_url, alt: product.name }]
        : [{ url: FALLBACK_IMAGE, alt: product.name }],
    },
  };
}

export default async function SanPhamDetailPage({ params }: SanPhamDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  // Bắt buộc: Trả về 404 khi slug không tồn tại hoặc sản phẩm is_active = false
  if (!product || !product.is_active) {
    notFound();
  }

  const [storedImages, reviews, crossSellFromRpc, upsellItems, relatedProducts] = await Promise.all([
    getProductImages(product.product_id),
    getProductReviews(product.product_id, 10),
    getCrossSellProducts(product.product_id),
    getUpsellProducts(product.product_id),
    getBestSellingProducts(4),
  ]);

  // Thư viện ảnh: product_images nếu có, luôn fallback về thumbnail_url.
  const galleryImages =
    storedImages.length > 0
      ? storedImages
      : [product.thumbnail_url || FALLBACK_IMAGE];

  // "Thường mua kèm": RPC rỗng thì lấy sản phẩm cùng danh mục.
  let crossSellItems: CrossSellProduct[] = crossSellFromRpc;
  let isCategoryFallback = false;

  if (crossSellItems.length === 0 && product.category_id) {
    const sameCategory = await getProductsByCategory(product.category_id, product.product_id, 4);
    crossSellItems = sameCategory.map((item) => ({
      product_id: item.product_id,
      name: item.name,
      slug: item.slug,
      price: item.price,
      thumbnail_url: item.thumbnail_url,
      times_bought_together: 0,
    }));
    isCategoryFallback = crossSellItems.length > 0;
  }

  const discountPercent =
    product.compare_at_price && product.compare_at_price > product.price
      ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
      : null;

  const regionNames: Record<string, string> = {
    bac: 'Miền Bắc',
    trung: 'Miền Trung',
    nam: 'Miền Nam',
    ba_mien: 'Ba Miền Hội Tụ',
  };

  const ratingAvg = asNumber(product.rating_avg, 5);
  const inStock = product.stock > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* GA4 view_item – không gửi email/SĐT */}
      <ViewItemTracker
        productId={product.product_id}
        name={product.name}
        price={product.price}
        categoryName={product.category?.name ?? null}
      />

      {/* Breadcrumb */}
      <nav className="text-xs text-[#c9b69a] flex items-center gap-2">
        <Link href="/" className="hover:text-[#c59a4b]">
          Trang chủ
        </Link>
        <span>/</span>
        <Link href="/san-pham" className="hover:text-[#c59a4b]">
          Sản phẩm
        </Link>
        {product.category && (
          <>
            <span>/</span>
            <Link
              href={`/san-pham?danh_muc=${product.category.slug}`}
              className="hover:text-[#c59a4b]"
            >
              {product.category.name}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-[#c59a4b] font-medium truncate max-w-[200px] sm:max-w-none">
          {product.name}
        </span>
      </nav>

      {/* Main Product Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Product Gallery */}
        <div className="lg:col-span-6">
          <ProductGallery
            images={galleryImages}
            productName={product.name}
            discountPercent={discountPercent}
          />
        </div>

        {/* Right: Details & Order Box */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#c59a4b]/10 text-[#c59a4b] border border-[#c59a4b]/30">
                {regionNames[product.region] || 'Đặc sản vùng miền'}
              </span>
              {product.category && (
                <Link
                  href={`/san-pham?danh_muc=${product.category.slug}`}
                  className="text-xs font-medium px-3 py-1 rounded-full bg-[#180702] text-[#c9b69a] border border-[#5c2b12] hover:border-[#c59a4b]/40 transition-colors"
                >
                  {product.category.name}
                </Link>
              )}
              {product.is_featured && (
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#861b1b]/10 text-[#e08a8a] border border-[#a33b20]/30">
                  Quà Tết Tiêu Biểu
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-[#f3dfae] leading-tight">
              {product.name}
            </h1>

            {/* Rating & Sold count */}
            <div className="flex items-center gap-4 text-xs text-[#c9b69a] pt-1">
              <div className="flex items-center gap-1 text-[#c59a4b] font-bold">
                <Star className="w-4 h-4 fill-[#c59a4b]" />
                <span>{ratingAvg.toFixed(1)}</span>
                <span className="text-[#a98a5f] font-normal">({product.rating_count} đánh giá)</span>
              </div>
              <span>•</span>
              <div>
                Đã bán <strong className="text-[#f3dfae]">{product.sold_count}</strong> {product.unit}
              </div>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-5 rounded-2xl bg-[#180702]/90 border border-[#5c2b12] flex items-baseline gap-4">
            <div className="text-3xl font-bold font-mono text-[#c59a4b]">
              {formatVND(product.price)}
            </div>
            {product.compare_at_price && (
              <div className="text-sm text-[#a98a5f] line-through">
                {formatVND(product.compare_at_price)}
              </div>
            )}
            <div className="text-xs text-[#c9b69a]">/ 1 {product.unit}</div>
          </div>

          {/* Key Attributes */}
          <div className="grid grid-cols-2 gap-4 py-3 border-y border-[#5c2b12]/80 text-xs">
            <div className="space-y-1">
              <span className="text-[#a98a5f] block">Xuất xứ tỉnh/thành:</span>
              <span className="font-semibold text-[#f3dfae] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#c59a4b]" />
                {product.origin || 'Việt Nam'}
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[#a98a5f] block">Cơ sở sản xuất / Đối tác:</span>
              <span className="font-semibold text-[#f3dfae] flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-[#c59a4b]" />
                {product.producer || 'Hương Quê OCOP'}
              </span>
            </div>
          </div>

          {/* Stock status indicator */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#c9b69a]">Tình trạng tồn kho:</span>
            {inStock ? (
              <span className="flex items-center gap-1.5 font-semibold text-[#34d399]">
                <CheckCircle2 className="w-4 h-4" />
                Còn {product.stock} {product.unit}
              </span>
            ) : (
              <span className="flex items-center gap-1.5 font-semibold text-rose-500">
                <XCircle className="w-4 h-4" />
                Hết hàng
              </span>
            )}
          </div>

          {/* Quantity selector + Add to cart (nút tự vô hiệu hoá khi hết hàng) */}
          <ProductPurchasePanel
            productId={product.product_id}
            stock={product.stock}
            price={product.price}
            unit={product.unit}
          />

          {/* Guarantees */}
          <div className="p-4 rounded-2xl bg-[#180702]/40 border border-[#5c2b12]/80 space-y-2 text-xs text-[#c9b69a]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#c59a4b]" />
              <span>Cam kết chuẩn vệ sinh ATTP, không chất bảo quản độc hại</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#c59a4b]" />
              <span>Miễn phí vận chuyển cho đơn từ 500.000₫ – phí cố định 30.000₫</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#c59a4b]" />
              <span>
                Đổi trả trong 48h nếu hộp quà hư hỏng –{' '}
                <Link href="/chinh-sach-doi-tra" className="text-[#c59a4b] hover:underline">
                  xem chính sách
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="space-y-4 pt-10 border-t border-[#5c2b12]">
        <h2 className="text-xl font-serif font-bold text-[#f3dfae]">
          Mô Tả Chi Tiết &amp; Ý Nghĩa Ngày Tết
        </h2>
        <div className="prose prose-invert max-w-none text-[#c9b69a] text-sm leading-relaxed space-y-4">
          <p>{product.description || product.short_description}</p>
          <p>
            Tết Nguyên Đán là thời khắc sum họp linh thiêng của gia đình Việt. Những món quà biếu không
            chỉ chứa đựng hương vị tinh túy của đất trời mà còn là thông điệp yêu thương, lời chúc vẹn
            tròn trao gửi tới người thân, bạn bè và đối tác.
          </p>
        </div>
      </div>

      {/* Reviews */}
      <div className="pt-10 border-t border-[#5c2b12]">
        <ProductReviews
          reviews={reviews}
          ratingAvg={ratingAvg}
          ratingCount={product.rating_count}
        />
      </div>

      {/* Cross-sell */}
      {crossSellItems.length > 0 && (
        <div className="pt-10 border-t border-[#5c2b12]">
          <ProductCrossSell items={crossSellItems} isCategoryFallback={isCategoryFallback} />
        </div>
      )}

      {/* Upsell */}
      {upsellItems.length > 0 && (
        <div className="pt-10 border-t border-[#5c2b12]">
          <ProductUpsell items={upsellItems} />
        </div>
      )}

      {/* Related Products */}
      <div className="space-y-6 pt-10 border-t border-[#5c2b12]">
        <h2 className="text-xl font-serif font-bold text-[#f3dfae]">
          Đặc Sản Bán Chạy Có Thể Bạn Quan Tâm
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts
            .filter((p) => p.product_id !== product.product_id)
            .slice(0, 4)
            .map((p) => (
              <ProductCard key={p.product_id} product={p} />
            ))}
        </div>
      </div>
    </div>
  );
}
