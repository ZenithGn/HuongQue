import Link from 'next/link';
import Image from 'next/image';
import {
  getCatalogFacts,
  getCategories,
  getGiftBoxes,
  getRecentReviews,
} from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';
import { CheckoutWindow } from '@/components/home/CheckoutWindow';
import { HomeHero } from '@/components/home/HomeHero';
import { PhaseSwap } from '@/components/home/PhaseSwap';
import { ArrowRight, PackageCheck, ShieldCheck, Star, Truck, Undo2 } from 'lucide-react';
import {
  DELIVERY_WINDOWS,
  TET_2027,
  daysRemaining,
  daysUntil,
  formatCutoffDate,
  tetPhase,
  vnDateKey,
} from '@/lib/tet';

export const dynamic = 'force-dynamic';

const REGION_CARDS = [
  {
    id: 'bac',
    name: 'Miền Bắc',
    description: 'Hương vị thanh tao, tinh tế.',
    image: '/images/region-north.png',
    detailImage: '/images/featured-specialty-north.png',
  },
  {
    id: 'trung',
    name: 'Miền Trung',
    description: 'Đậm đà, mộc mạc.',
    image: '/images/region-central.png',
    detailImage: '/images/featured-specialty-central.png',
  },
  {
    id: 'nam',
    name: 'Miền Nam',
    description: 'Ngọt lành, phóng khoáng.',
    image: '/images/region-south.png',
    detailImage: '/images/featured-specialty-south.png',
  },
] as const;

export default async function HomePage() {
  const [giftBoxes, categories, facts] = await Promise.all([
    getGiftBoxes(4),
    getCategories(),
    getCatalogFacts(),
  ]);

  const reviews = await getRecentReviews(giftBoxes, 3);

  const initialDays = {
    lien_tinh: daysUntil(TET_2027.lienTinh.iso),
    noi_thanh: daysUntil(TET_2027.noiThanh.iso),
  };
  const phase = tetPhase();

  return (
    <div className="bg-[#120401] pb-8">
      <HomeHero />

      {/* Lịch giao ngay sau hero; các lựa chọn và ngày hạn vẫn đến từ lib/tet.ts. */}
      <CheckoutWindow
        initialDays={initialDays}
        initialPhase={phase}
        initialTodayKey={vnDateKey()}
      />

      {/* Dải dịch vụ và số liệu được đọc từ chính sách/dữ liệu đang có. */}
      <section aria-labelledby="dieu-kien-chot" className="border-b border-[#5c2b12] bg-[#180702]">
        <h2 id="dieu-kien-chot" className="sr-only">
          Điều kiện chốt đơn
        </h2>
        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-2 gap-x-6 gap-y-5 px-4 py-6 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            {
              icon: Truck,
              title: 'Phí vận chuyển 30.000₫ toàn quốc',
              body: 'Miễn phí cho đơn từ 500.000₫.',
            },
            {
              icon: Undo2,
              title: 'Báo lỗi trong 24 giờ',
              body: 'Lỗi, hư hỏng do vận chuyển hoặc giao sai — cần ảnh. Hàng đã mở không đổi trả.',
            },
            {
              icon: PackageCheck,
              // Phân biệt "chưa có hàng" với "đọc lỗi": khi mất kết nối DB, "0 món · 0 nhóm ·
              // 0 miền" là một lời nói sai, không phải một trạng thái rỗng.
              title: facts.ok
                ? `${facts.products.toLocaleString('vi-VN')} món · ${facts.categories} nhóm · ${facts.regions} miền`
                : 'Chưa đọc được số liệu kho',
              body: facts.ok
                ? 'Đặc sản OCOP tuyển chọn, đóng sẵn thành hộp theo vùng.'
                : 'Đang kết nối lại kho sản phẩm. Danh sách bên dưới vẫn xem được.',
            },
            {
              icon: ShieldCheck,
              title: facts.ok
                ? `${facts.reviews.toLocaleString('vi-VN')} đánh giá đã xác thực`
                : 'Đánh giá tạm ẩn',
              body: facts.ok ? 'Chỉ tính từ đơn đã giao xong.' : 'Chưa tải được đánh giá từ hệ thống.',
            },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex gap-3">
              <Icon aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-[#c59a4b]" />
              <div>
                <p className="text-base font-semibold text-[#f3dfae]">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-[#c9b69a]">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bộ sưu tập minh họa ở tiêu đề tách biệt với ảnh, giá và nội dung sản phẩm thật bên dưới. */}
      <section aria-labelledby="hop-qua" className="mx-auto w-full max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="hop-qua" className="font-serif text-2xl font-bold text-[#c59a4b] sm:text-3xl 2xl:text-4xl">
              Tinh hoa quà Tết ba miền
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-[#c9b69a]">
              Những món quà được tuyển chọn từ đặc sản ba miền.
            </p>
          </div>
          <div className="flex shrink-0 items-center">
            <Link
              href="/san-pham?danh_muc=hop-qua-tet"
              className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-[#c59a4b] transition-colors hover:text-[#f3dfae]"
            >
              Xem tất cả sản phẩm
              <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {giftBoxes.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-4 2xl:gap-6">
            {giftBoxes.map((product) => (
              <ProductCard key={product.product_id} product={product} imageAspect="landscape" />
            ))}
          </div>
        ) : (
          <p className="mt-8 rounded-2xl border border-[#5c2b12] bg-[#180702] p-6 text-sm text-[#c9b69a]">
            Chưa đọc được danh sách hộp quà. Xem toàn bộ sản phẩm tại{' '}
            <Link href="/san-pham" className="font-semibold text-[#c59a4b] underline">
              trang sản phẩm
            </Link>
            .
          </p>
        )}
      </section>

      <section aria-labelledby="tra-cuu" className="border-y border-[#5c2b12] bg-[#180702]">
        <div className="mx-auto w-full max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
          <h2 id="tra-cuu" className="font-serif text-2xl font-bold text-[#c59a4b] sm:text-3xl 2xl:text-4xl">
            Khám phá đặc sản ba miền
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 xl:gap-5">
            {REGION_CARDS.map((region) => (
              <Link
                key={region.id}
                href={`/san-pham?mien=${region.id}`}
                aria-label={`Khám phá đặc sản ${region.name}`}
                className="group relative isolate flex min-h-[330px] overflow-hidden rounded-2xl border border-[#5c2b12] bg-[#210c04] p-5 transition-colors hover:border-[#c59a4b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f3dfae] sm:min-h-[390px] sm:p-6"
              >
                <Image
                  src={region.image}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="-z-20 object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[#120401] via-[#120401]/35 to-transparent" />
                <div className="mt-auto flex w-full items-end justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#f3dfae] sm:text-3xl">{region.name}</h3>
                    <p className="mt-2 text-sm text-[#f3dfae]">{region.description}</p>
                    <span className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#d4af37]">
                      Khám phá đặc sản <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                  <Image
                    src={region.detailImage}
                    alt={`Ảnh minh họa đặc sản ${region.name}`}
                    width={120}
                    height={150}
                    className="h-24 w-20 shrink-0 rounded-xl border border-[#f3dfae]/60 object-cover shadow-lg sm:h-32 sm:w-24"
                  />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-[#5c2b12] pt-5 sm:flex-row sm:items-start sm:gap-8">
            <h3 className="shrink-0 font-serif text-lg font-bold text-[#f3dfae]">Theo danh mục</h3>
            {categories.length > 0 ? (
              <ul className="flex flex-wrap gap-2.5">
                {categories.map((category) => (
                  <li key={category.category_id}>
                    <Link
                      href={`/san-pham?danh_muc=${category.slug}`}
                      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#5c2b12] px-4 py-2 text-sm font-medium text-[#c9b69a] transition-colors hover:border-[#c59a4b] hover:text-[#f3dfae]"
                    >
                      {category.name}
                      <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 text-[#c59a4b]" />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-[#c9b69a]">Danh mục đang tải. Xem toàn bộ tại <Link href="/san-pham" className="text-[#d4af37] underline">trang sản phẩm</Link>.</p>
            )}
          </div>
        </div>
      </section>

      {/* 6. Khách đã mua nói gì — đánh giá thật, nhịp lắng (nền gốc, đứng giữa hai dải) */}
      {reviews.length > 0 ? (
        <section aria-labelledby="danh-gia" className="mx-auto w-full max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8">
          <h2 id="danh-gia" className="font-serif text-2xl font-bold text-[#c59a4b] sm:text-3xl 2xl:text-4xl">
            Khách đã nhận hàng nói gì
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-[#c9b69a]">
            Ba đánh giá gần đây, mỗi cái từ một hộp quà khác nhau. Cả {facts.reviews} đánh giá đều
            chỉ đến từ đơn đã giao xong.
          </p>

          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {reviews.map((review) => (
              <li
                key={review.review_id}
                className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#5c2b12] bg-[#210c04] p-6"
              >
                <div
                  aria-hidden
                  className="absolute inset-x-[12%] top-0 h-px bg-gradient-to-r from-transparent via-[#c59a4b]/60 to-transparent"
                />
                <div>
                  {/* Sao vẽ bằng icon, không dùng ký tự ★ (luật: không dùng glyph Unicode
                      thay cho hệ icon) */}
                  <p
                    className="flex items-center gap-0.5"
                    aria-label={`${review.rating} trên 5 sao`}
                  >
                    {[1, 2, 3, 4, 5].map((step) => (
                      <Star
                        key={step}
                        aria-hidden
                        className={
                          step <= review.rating
                            ? 'h-3.5 w-3.5 fill-[#d4af37] text-[#d4af37]'
                            : 'h-3.5 w-3.5 text-[#5c2b12]'
                        }
                      />
                    ))}
                  </p>
                  <blockquote className="mt-3 text-base italic leading-relaxed text-[#c9b69a]">
                    “{review.comment}”
                  </blockquote>
                </div>
                <div className="mt-5 border-t border-[#381a0b] pt-4">
                  <p className="text-sm font-semibold text-[#f3dfae]">{review.reviewer_name}</p>
                  <Link
                    href={`/san-pham/${review.productSlug}`}
                    className="tap-row mt-1 block text-sm text-[#c9b69a] underline decoration-[#5c2b12] underline-offset-2 transition-colors hover:text-[#f3dfae]"
                  >
                    {review.productName}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* 7. Câu chuyện + hai mốc chốt đơn — khối kết, nhịp chậm nhất, trên dải nền */}
      <section aria-labelledby="cau-chuyen" className="border-t border-[#5c2b12] bg-[#180702]">
        <div className="mx-auto w-full max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-10">
          <div>
            <h2
              id="cau-chuyen"
              className="font-serif text-3xl font-bold leading-tight text-[#c59a4b] sm:text-4xl 2xl:text-5xl"
            >
              Từ những vùng quê, mang hương vị Việt đến mọi nhà
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#c9b69a]">
              Hương Quê tuyển chọn đặc sản OCOP ba miền, đóng sẵn thành hộp chỉn chu và giữ đúng một
              lời hứa: quà phải tới trước Tết. Khách không phải tự ghép món, chỉ cần chọn người nhận.
            </p>

            {/* Số đo được từ DB — không còn "500+ sản phẩm" hay "50K+ khách hàng".
                Khi DB không đọc được thì nói thẳng, không hiện ba số 0 như một sự thật. */}
            {facts.ok ? (
              <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-[#5c2b12] py-6">
                {[
                  { value: facts.products.toLocaleString('vi-VN'), label: 'món đang bán' },
                  { value: facts.categories.toLocaleString('vi-VN'), label: 'nhóm hàng' },
                  { value: facts.regions.toLocaleString('vi-VN'), label: 'miền có hàng' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="block font-serif text-3xl font-bold text-[#f3dfae]">
                        {stat.value}
                      </span>
                      <span className="mt-1 block text-sm text-[#c9b69a]">{stat.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-8 border-y border-[#5c2b12] py-6 text-sm text-[#c9b69a]">
                Chưa đọc được số liệu kho lúc này — phần chữ phía trên vẫn đúng, chỉ các con số tạm ẩn.
              </p>
            )}

            <Link
              href="/cau-chuyen"
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[#5c2b12] bg-[#210c04] px-5 py-3 text-sm font-semibold text-[#f3dfae] transition-colors hover:border-[#c59a4b]"
            >
              Đọc câu chuyện Hương Quê
              <ArrowRight aria-hidden className="h-4 w-4 text-[#c59a4b]" />
            </Link>
          </div>

          {/* Khối kết: hai mốc chốt đơn. Bản tin đã có ở chân trang nên không lặp lại ở đây —
              một trang chỉ nên có một điểm thu email. */}
          <div className="rounded-2xl border border-[#5c2b12] bg-[#180702] p-6">
            <h3 className="font-serif text-xl font-bold text-[#f3dfae]">
              Hai mốc chốt đơn Tết {TET_2027.canChi}
            </h3>
            <dl className="mt-5 divide-y divide-[#381a0b] border-y border-[#381a0b]">
              {DELIVERY_WINDOWS.map((deliveryWindow) => (
                <div key={deliveryWindow.id} className="py-4">
                  <dt className="flex items-baseline justify-between gap-3">
                    <span className="font-serif text-base font-bold text-[#f3dfae]">
                      {deliveryWindow.label}
                    </span>
                    <span className="font-serif text-base font-bold text-[#c59a4b]">
                      {formatCutoffDate(deliveryWindow.iso)}
                    </span>
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-[#c9b69a]">
                    {deliveryWindow.lunar} · {deliveryWindow.scope} ·{' '}
                    <PhaseSwap
                      initialPhase={phase}
                      open={
                        initialDays[deliveryWindow.id] < 0 ? (
                          <span className="font-semibold text-[#e08a8a]">đã qua hạn</span>
                        ) : (
                          <>
                            còn{' '}
                            <span className="font-semibold text-[#f3dfae]">
                              {daysRemaining(initialDays[deliveryWindow.id])}
                            </span>{' '}
                            ngày
                          </>
                        )
                      }
                      closed={<span className="font-semibold text-[#e08a8a]">đã qua hạn</span>}
                    />
                  </dd>
                </div>
              ))}
            </dl>

            {/* Hai dòng phí giao hàng / bồi hoàn đã có ở dải dữ liệu đầu trang. Ở đây chỉ nói
                điều khối này thực sự nói: hai hạn chốt. Mỗi ý chỉ nói một lần. */}

            <PhaseSwap
              initialPhase={phase}
              open={
                <Link
                  href="/san-pham?danh_muc=hop-qua-tet"
                  className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#c59a4b] bg-[#210c04] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#f3dfae] transition-colors hover:border-[#d4af37]"
                >
                  Chọn hộp quà giao kịp Tết
                  <ArrowRight aria-hidden className="h-4 w-4 text-[#c59a4b]" />
                </Link>
              }
              closed={
                <Link
                  href="/san-pham"
                  className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#c59a4b] bg-[#210c04] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#f3dfae] transition-colors hover:border-[#d4af37]"
                >
                  Xem toàn bộ sản phẩm
                  <ArrowRight aria-hidden className="h-4 w-4 text-[#c59a4b]" />
                </Link>
              }
            />
          </div>
        </div>
        </div>
      </section>
    </div>
  );
}
