import Link from 'next/link';
import { getCategories, getFeaturedProducts, getActiveBanners } from '@/lib/products';
import { getCurrentUser } from '@/lib/auth';
import { ProductCard } from '@/components/ProductCard';
import { NewsletterForm } from '@/components/NewsletterForm';
import { Sparkles, Gift, ArrowRight, ShieldCheck, Truck, Clock } from 'lucide-react';

export const dynamic = 'force-dynamic';

const FALLBACK_HERO_IMAGE =
  'https://i.pinimg.com/736x/37/b8/2c/37b82cdb07a2d5c31d69eccef0c1e89b.jpg';

export default async function HomePage() {
  const auth = await getCurrentUser();
  const user = auth?.user;

  const [categories, featuredProducts, banners] = await Promise.all([
    getCategories(),
    getFeaturedProducts(),
    getActiveBanners(),
  ]);

  const heroBanner = banners.length > 0 ? banners[0] : null;
  const heroImage = heroBanner?.image_url || FALLBACK_HERO_IMAGE;
  const heroTitle = heroBanner?.title || 'Hộp Quà Tết Thịnh Vượng (Hộp Gỗ Sơn Mài VIP)';
  const heroSubtitle =
    heroBanner?.subtitle ||
    'Bộ sản phẩm Hương Quê: Hộp sơn mài Thái Bồ, Mắc ca Đắk Nông và Bình Trưng Trống, món quà nguyên chất ngày Tết.';
  const heroHref = heroBanner?.link_url || '/san-pham';
  const isExternalHeroLink = /^https?:\/\//i.test(heroHref);
  const heroLinkClass =
    'text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1';

  return (
    <div className="space-y-16 pb-20">

      {/* 1. HERO BANNER - SỬ DỤNG ẢNH NỀN HIỂN THỊ CHUẨN */}
      <section
        className="relative overflow-hidden text-[#f3dfae] border-b border-[#5c2b12] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(23, 7, 2, 0.92) 0%, rgba(23, 7, 2, 0.85) 50%, rgba(23, 7, 2, 0.75) 100%), url('https://i.pinimg.com/1200x/85/05/d3/8505d30976439c37be8735801d3fb49c.jpg')`
        }}
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Cột trái: Nội dung chữ */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Nhãn chương trình */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#78502a] bg-[#210c04]/90 px-4 py-1.5 text-[11px] text-[#e8cf9b]">
                <span className="text-[#c49a52]">◆</span>
                <span className="font-semibold tracking-wider uppercase">
                  QUÀ TẾT 2027 · KẾT TINH NGHÌN NĂM, VÙNG XA GỬI GẮM TRĂM THỨ QUÀ
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl xl:text-6xl font-bold leading-[1.15] tracking-tight text-[#f3dfae]">
                Gói Trọn Nghĩa Tình,
                <br />
                Đậm Đà Vị Tết Ba Miền
              </h1>

              <p className="max-w-2xl mx-auto lg:mx-0 text-xs sm:text-sm leading-relaxed text-[#c9b69a]">
                Tuyển chọn những thức quà OCOP từ Bắc tới Nam: Trà Thái Nguyên, Mắc ca Đắk Nông, Bánh pía Sóc Trăng... gửi gắm lời chúc năm mới PHÚ SANG - THỊNH VƯỢNG.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/san-pham"
                  className="inline-flex items-center gap-2 rounded-sm bg-[#b8863b] px-6 py-3.5 text-xs sm:text-sm font-bold text-[#120401] transition hover:bg-[#cca154] uppercase tracking-wider"
                >
                  <Gift className="w-4 h-4" />
                  Khám phá Quà Tết
                </Link>

                <Link
                  href="/san-pham?mien=ba_mien"
                  className="inline-flex items-center gap-2 border border-[#78502a] bg-[#210c04]/80 px-6 py-3.5 text-xs sm:text-sm font-semibold text-[#e8cf9b] transition hover:bg-[#381a0b]"
                >
                  Hộp quà Ba miền
                </Link>
              </div>

              {/* Cam kết nhỏ bên dưới */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#381a0b] text-xs text-[#c9b69a]">
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <span className="text-[#c49a52] font-bold">✦</span>
                  <span>100% Chính Hãng<br /><span className="text-[10px] text-[#c9b69a]/60">OCOP & Làng nghề</span></span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <span className="text-[#c49a52] font-bold">✦</span>
                  <span>Thiết Kế Đẳng Cấp<br /><span className="text-[10px] text-[#c9b69a]/60">Sang trọng, tinh tế</span></span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <span className="text-[#c49a52] font-bold">✦</span>
                  <span>Giao Hàng Toàn Quốc<br /><span className="text-[10px] text-[#c9b69a]/60">Đóng gói cẩn thận</span></span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <span className="text-[#c49a52] font-bold">✦</span>
                  <span>Hỗ Trợ 24/7<br /><span className="text-[10px] text-[#c9b69a]/60">Tư vấn tận tâm</span></span>
                </div>
              </div>
            </div>

            {/* Cột phải: Card sản phẩm nổi bật */}
            <div className="lg:col-span-5 relative">
              <div className="relative overflow-hidden border border-[#78502a] bg-[#210c04] shadow-2xl">
                <div className="absolute top-3 left-3 z-20 bg-[#a33b20] text-white text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider">
                  SẢN PHẨM VIP
                </div>

                <img
                  src={heroImage}
                  alt={heroTitle}
                  className="h-[280px] sm:h-[320px] w-full object-cover"
                />

                <div className="p-5 space-y-3 bg-[#1c0a03]">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c49a52]">
                    HỘP QUÀ TẾT THỊNH VƯỢNG
                  </span>

                  <h2 className="font-serif text-lg sm:text-xl font-bold text-[#f3dfae]">
                    {heroTitle}
                  </h2>

                  <p className="text-xs leading-relaxed text-[#c9b69a]">
                    {heroSubtitle}
                  </p>

                  <div className="flex items-center justify-between border-t border-[#381a0b] pt-3">
                    <span className="text-[11px] text-[#c9b69a]/70">
                      Set quà tặng doanh nghiệp
                    </span>

                    {isExternalHeroLink ? (
                      <a
                        href={heroHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={heroLinkClass}
                      >
                        Xem ngay <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <Link href={heroHref} className={heroLinkClass}>
                        Xem ngay <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* 2. CAM KẾT HƯƠNG QUÊ */}
      <section className="hq-benefits max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
          {[
            { icon: ShieldCheck, title: '100% Chính Gốc', desc: 'Đặc sản OCOP tuyển chọn' },
            { icon: Gift, title: 'Quà Tặng Tinh Tế', desc: 'Trao gửi trọn nghĩa tình' },
            { icon: Truck, title: 'Giao Hàng Toàn Quốc', desc: 'Đóng gói cẩn thận' },
            { icon: Clock, title: 'Tận Tâm Phục Vụ', desc: 'Tư vấn chọn quà phù hợp' },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-center gap-3 border-b border-amber-900/40 py-5"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-amber-700/50 bg-amber-500/10 text-amber-400">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-amber-100">{title}</h4>
                <p className="mt-1 text-[10px] sm:text-xs text-stone-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. DANH MỤC ĐẶC SẢN VÙNG MIỀN */}
      <section className="hq-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-amber-500">
              Tinh hoa ba miền
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-amber-100">
              Đặc Sản Vùng Miền
            </h2>
          </div>
          <Link
            href="/san-pham"
            className="shrink-0 text-xs text-amber-400 hover:text-amber-200"
          >
            Xem tất cả →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {categories.slice(0, 5).map((cat) => (
            <Link
              key={cat.category_id}
              href={`/san-pham?danh_muc=${cat.slug}`}
              className="group overflow-hidden border border-amber-900/40 bg-[#291006] transition-all duration-300 hover:-translate-y-1 hover:border-amber-600/70"
            >
              <div className="aspect-[1.25/1] overflow-hidden">
                <img
                  src={
                    cat.image_url ||
                    'https://i.pinimg.com/736x/22/1f/04/221f049c7d6b71722f484f5cf37978ca.jpg'
                  }
                  alt={cat.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between gap-2 px-3 py-3">
                <h3 className="text-xs sm:text-sm font-serif font-semibold text-amber-100">
                  {cat.name}
                </h3>
                <span className="text-amber-500">↗</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. SẢN PHẨM NỔI BẬT */}
      <section className="hq-featured max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-amber-500">
              Được tuyển chọn dành riêng cho bạn
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-amber-100">
              Tết Nối Bật & Bán Chạy
            </h2>
            <p className="mt-2 text-xs text-stone-400">
              Những thức quà mang đậm hương vị quê nhà.
            </p>
          </div>
          <Link
            href="/san-pham?sort=featured"
            className="text-xs text-amber-400 hover:text-amber-200"
          >
            Khám phá bộ sưu tập →
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {featuredProducts.slice(0, 8).map((product) => (
            <div
              key={product.product_id}
              className="min-w-0 overflow-hidden border border-amber-900/40 bg-[#210c04] transition-colors hover:border-amber-700/70"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
      {/* 5. CHỌN QUÀ THEO NHU CẦU */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#c49a52]">
              ✦ QUÀ THEO MỤC ĐÍCH
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#f3dfae]">
              Chọn quà đúng người, đúng lúc
            </h2>
          </div>
          <Link href="/san-pham" className="shrink-0 text-xs text-[#c49a52] hover:text-[#e8cf9b] flex items-center gap-1">
            Đến hương quà gợi ý cho bạn <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-2xl overflow-hidden bg-[#180702] p-2">
          {[
            {
              title: 'Quà Tết Biếu Sếp & Đối Tác',
              desc: 'Hộp quà cao cấp, sang trọng, phù hợp biếu tặng dịp Tết',
              sub: 'Quà từ 580.000đ',
              image: 'https://i.pinimg.com/736x/37/b8/2c/37b82cdb07a2d5c31d69eccef0c1e89b.jpg',
              href: '/san-pham?mien=ba_mien',
            },
            {
              title: 'Quà Gia Đình & Ông Bà',
              desc: 'Đặc sản vùng miền quen thuộc, gói trọn yêu thương sum vầy',
              sub: 'Quà từ 299.000đ',
              image: 'https://i.pinimg.com/736x/97/ca/86/97ca868f8eb8d96e6053311bc873bdfb.jpg',
              href: '/san-pham',
            },
            {
              title: 'Quà Nhân Viên Doanh Nghiệp',
              desc: 'Đặt số lượng lớn, thiết kế bao bì riêng, giao hàng đúng hạn',
              sub: 'Liên hệ báo giá',
              image: 'https://i.pinimg.com/736x/83/f9/42/83f942c2e2242f86f6141149e8134efc.jpg',
              href: '/san-pham',
            },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group relative rounded-xl overflow-hidden border border-[#5c2b12] bg-[#210c04] transition duration-300 hover:border-[#78502a] hover:scale-[1.01]"
            >
              <div className="aspect-[1.7/1] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-base font-bold text-[#f3dfae]">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#c9b69a] min-h-[36px]">{item.desc}</p>
                <div className="mt-4 flex items-center justify-between border-t border-[#381a0b] pt-3 text-[11px] text-[#c49a52]">
                  <span>{item.sub}</span>
                  <span>➔</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. BANNER ĐĂNG KÝ HỘI VIÊN */}
      {!user && (
        <section className="bg-[#861b1b] border-y border-[#a33b20] py-12 px-4 sm:px-6 lg:px-8 my-16">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#f3dfae]">
              ĐẶC QUYỀN HỘI VIÊN
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-snug">
              Đăng Ký Tài Khoản Nhận Ngay Ưu Đãi Giảm 10% Cho Đơn Hàng Đầu Tiên
            </h2>
            <p className="text-xs sm:text-sm text-red-100/80 max-w-2xl mx-auto">
              Nhận thông báo sớm nhất về các set quà Tết giới hạn, lịch trình giao hàng dịp Tết và mã giảm giá VIP chuyển mẫu phí.
            </p>

            <form className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 max-w-xl mx-auto pt-2">
              <input
                type="email"
                placeholder="nh.nguyen@fpt.edu.vn"
                className="w-full sm:w-80 bg-white text-stone-900 px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-stone-400"
              />
              <button
                type="submit"
                className="w-full sm:w-auto bg-[#1a0802] hover:bg-[#2b1005] text-[#e8cf9b] font-bold px-6 py-3 text-xs uppercase tracking-wider transition-colors shrink-0"
              >
                ĐĂNG KÝ NHẬN ƯU ĐÃI
              </button>
            </form>
          </div>
        </section>
      )}

      {/* 7. CÂU CHUYỆN HƯƠNG QUÊ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Ảnh bên trái */}
          <div className="lg:col-span-5 relative">
            <div className="relative border border-[#5c2b12] bg-[#210c04] p-2">
              <img
                src="https://i.pinimg.com/1200x/fc/f2/fb/fcf2fb6dea48bc3e4fa71d6a47b71486.jpg"
                alt="Hương Quê Showroom"
                className="w-full h-[320px] sm:h-[400px] object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-[#180702]/90 border border-[#5c2b12] p-4 backdrop-blur-sm">
                <p className="text-[10px] uppercase tracking-widest text-[#c49a52]">HÀ NỘI I TP. HỒ CHÍ MINH I CẦN THƠ</p>
                <p className="font-serif text-sm font-bold text-[#f3dfae] mt-1">Showroom & Kho giao hàng</p>
              </div>
            </div>
          </div>

          {/* Nội dung bên phải */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c49a52]">
              ✦ CÂU CHUYỆN HƯƠNG QUÊ
            </p>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#f3dfae] leading-tight">
              Từ những vùng quê, mang hương vị Việt đến mọi nhà
            </h2>

            <p className="text-xs sm:text-sm leading-relaxed text-[#c9b69a]">
              Hương Quê được thành lập với sứ mệnh kết nối tinh hoa đặc sản ba miền đến tay người tiêu dùng. Mỗi sản phẩm đều được tuyển chọn kỹ lưỡng từ các nhà sản xuất uy tín, đạt chuẩn OCOP, đóng gói trang trọng để xúng đáng làm quà tặng ý nghĩa.
            </p>

            {/* Thống kê 3 cột */}
            <div className="grid grid-cols-3 gap-4 border-y border-[#5c2b12] py-6 my-6">
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-[#f3dfae]">500+</p>
                <p className="text-[10px] sm:text-xs text-[#c9b69a] mt-1">Sản phẩm OCOP</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-[#f3dfae]">63</p>
                <p className="text-[10px] sm:text-xs text-[#c9b69a] mt-1">Tỉnh thành</p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-[#f3dfae]">50K+</p>
                <p className="text-[10px] sm:text-xs text-[#c9b69a] mt-1">Khách hàng tin tưởng</p>
              </div>
            </div>

            <Link
              href="/cau-chuyen"
              className="inline-flex items-center gap-2 border border-[#78502a] bg-[#210c04] px-5 py-3 text-xs font-semibold text-[#e8cf9b] hover:bg-[#381a0b] transition"
            >
              Tìm hiểu thêm về chúng tôi ➔
            </Link>
          </div>

        </div>
      </section>

      {/* 8. HỖ TRỢ KHÁCH HÀNG (3 CỘT TRUNG TÂM) */}


      {/* 9. ĐÁNH GIÁ KHÁCH HÀNG (CARD BÌNH CHỌN) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
        <div className="mb-8 text-center space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c49a52]">
            ✦ KHÁCH HÀNG NÓI VỀ CHÚNG TÔI ✦
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#f3dfae]">
            Hàng trăm gia đình tin chọn Hương Quê
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              name: 'Chị Nguyễn Lưu Bình',
              role: 'Giám đốc MKT - Hà Nội',
              avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
              desc: 'Đặt hộp quà Tết cho công ty, hơn 200 hộp. Hương Quê giao đúng hẹn, bao bì rất đẹp. Sếp và đồng nghiệp ai cũng khen. Món quà thực sự chất lượng!',
            },
            {
              name: 'Anh Trần Minh Tuấn',
              role: 'Kỹ sư - TP. Hồ Chí Minh',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
              desc: 'Mua hộp quà Tết biếu bố mẹ ở quê. Trà Thái Nguyên, bánh pía Sóc Trăng - đúng hương vị quê nhà. Bố mẹ thích lắm, khen con biết chọn quà vừa ngon vừa ý nghĩa!',
            },
            {
              name: 'Chị Lê Thị Hoa',
              role: 'Giáo viên - Đà Nẵng',
              avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
              desc: 'Ấn tượng từ khâu tư vấn cho đến thiệp đính kèm hộp quà. Rất chu đáo. Tôi nhận được quà đúng thời gian, đóng gói cẩn thận. Chắc chắn Hương Quê sẽ luôn là sự lựa chọn số 1 của tôi!',
            },
          ].map((item) => (
            <div
              key={item.name}
              className="border border-[#5c2b12] bg-[#210c04] p-6 flex flex-col justify-between"
            >
              <div>
                <div className="text-amber-400 text-xs tracking-widest mb-3">★★★★★</div>
                <p className="text-xs leading-relaxed text-[#c9b69a] italic">
                  “{item.desc}”
                </p>
              </div>

              <div className="flex items-center gap-3 border-t border-[#381a0b] pt-4 mt-6">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-9 h-9 rounded-full object-cover border border-[#78502a]"
                />
                <div>
                  <p className="text-xs font-bold text-[#f3dfae]">{item.name}</p>
                  <p className="text-[10px] text-[#c9b69a]/60">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* 9. BẢN TIN HƯƠNG QUÊ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 border border-amber-900/40 bg-[#210c04] p-6 sm:p-10">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-500">
              Bản tin Hương Quê
            </p>
            <h2 className="mt-3 font-serif text-2xl text-amber-100">
              Nhận Tin Mới, Ưu Đãi Mới
            </h2>
            <p className="mt-3 text-xs leading-6 text-stone-400">
              Đăng ký email để cập nhật bộ sưu tập quà tặng, đặc sản theo mùa
              và các chương trình ưu đãi mới nhất.
            </p>
          </div>
          <div className="border border-amber-900/40 bg-[#180800] p-5">
            <NewsletterForm />
          </div>
        </div>
      </section>

    </div>
  );
}
