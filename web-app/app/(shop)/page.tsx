import Link from 'next/link';
import {
  getCatalogFacts,
  getCategories,
  getGiftBoxes,
  getRecentReviews,
} from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';
import { CheckoutWindow } from '@/components/home/CheckoutWindow';
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

/** Trục "ba miền" — dùng đúng enum `region` của DB, không bịa thêm giá trị lọc. */
const REGION_ENTRIES = [
  {
    id: 'bac',
    label: 'Vị Bắc',
    note: 'Trà Thái Nguyên · ô mai Hà Nội · bánh cốm',
  },
  {
    id: 'trung',
    label: 'Vị Trung',
    note: 'Mè xửng Huế · cà phê Buôn Ma Thuột · mắc ca',
  },
  {
    id: 'nam',
    label: 'Vị Nam',
    note: 'Mứt dừa Bến Tre · bánh pía Sóc Trăng · hạt điều',
  },
  {
    id: 'ba_mien',
    label: 'Ba Miền',
    note: 'Hộp quà gộp cả ba miền, chọn sẵn',
  },
] as const;

export default async function HomePage() {
  const [giftBoxes, categories, facts] = await Promise.all([
    getGiftBoxes(6),
    getCategories(),
    getCatalogFacts(),
  ]);

  const reviews = await getRecentReviews(giftBoxes, 3);

  const initialDays = {
    lien_tinh: daysUntil(TET_2027.lienTinh.iso),
    noi_thanh: daysUntil(TET_2027.noiThanh.iso),
  };
  const tightest = DELIVERY_WINDOWS[0];
  const phase = tetPhase();

  return (
    <div className="bg-[#120401] pb-20">
      {/* 1. Công cụ chốt đơn — trục thời gian + chọn nơi nhận + hành động chính */}
      <CheckoutWindow
        initialDays={initialDays}
        initialPhase={phase}
        initialTodayKey={vnDateKey()}
      />

      {/* 2. Dải dữ liệu thật — mật độ dày, cao thấp */}
      <section aria-labelledby="dieu-kien-chot" className="border-b border-[#5c2b12] bg-[#180702]">
        <h2 id="dieu-kien-chot" className="sr-only">
          Điều kiện chốt đơn
        </h2>
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-5 px-4 py-6 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            {
              icon: Truck,
              title: 'Phí vận chuyển 30.000₫ toàn quốc',
              body: 'Miễn phí cho đơn từ 500.000₫.',
            },
            {
              icon: Undo2,
              title: 'Bồi hoàn trong 24 giờ',
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

      {/* 3. Hộp quà còn kịp — mật độ cao, nhịp rộng */}
      <section aria-labelledby="hop-qua" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="hop-qua" className="font-serif text-2xl font-bold text-[#c59a4b] sm:text-3xl">
              Hộp quà đang còn hàng
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-[#c9b69a]">
              <PhaseSwap
                initialPhase={phase}
                open={`Đặt hôm nay, hạn sớm nhất là ${tightest.lunar} (${formatCutoffDate(tightest.iso)}) cho ${tightest.scope}. Mọi hộp dưới đây đều giao kịp nếu chốt trước hạn đó.`}
                closed={`Hạn giao trước Tết đã qua. ${giftBoxes.length} hộp quà vẫn đặt được, nhưng sẽ tới sau Tết.`}
              />
            </p>
          </div>
          <Link
            href="/san-pham?danh_muc=hop-qua-tet"
            className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-sm font-semibold text-[#c59a4b] transition-colors hover:text-[#f3dfae]"
          >
            Xem tất cả hộp quà
            <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>

        {giftBoxes.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
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

      {/* 5. Xem theo nhóm hoặc theo miền — sổ tra cứu, mật độ vừa.
          Đây là DẢI NỀN xen kẽ: sau khi bỏ khối banner, nhịp nền phải được dựng lại thủ công,
          nếu không hai khối cùng nền sẽ dính vào nhau và mất cảm giác phân mục. */}
      <section aria-labelledby="tra-cuu" className="border-y border-[#5c2b12] bg-[#180702]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 id="tra-cuu" className="font-serif text-2xl font-bold text-[#c59a4b] sm:text-3xl">
          Tìm theo nhóm hàng hoặc theo miền
        </h2>

        {/* `min-w-0` trên MỤC LƯỚI, không chỉ trên các span bên trong. Mục lưới mặc định là
            `min-width: auto`, nên nó nở theo min-content của con — và con có một span `truncate`
            (`white-space: nowrap`), tức min-content bằng cả chuỗi. Đo được: ở cỡ chữ gấp đôi và
            bề rộng 768, cột này rộng 865px và đẩy cả trang ra 913px. */}
        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-[#f3dfae]">Nhóm hàng</h3>
            {categories.length > 0 ? (
              <ul className="mt-4 divide-y divide-[#381a0b] border-y border-[#381a0b]">
                {categories.map((category) => (
                  <li key={category.category_id}>
                    <Link
                      href={`/san-pham?danh_muc=${category.slug}`}
                      className="group flex items-baseline justify-between gap-4 py-3.5 transition-colors"
                    >
                      {/* `min-w-0` + `break-words`: tên nhóm dài phải xuống dòng chứ không được
                          đẩy hàng rộng ra ngoài khung. */}
                      <span className="min-w-0 break-words font-serif text-base font-bold text-[#f3dfae] transition-colors group-hover:text-[#d4af37]">
                        {category.name}
                      </span>
                      <span className="hidden min-w-0 flex-1 truncate text-xs text-[#c9b69a] sm:block">
                        {category.description}
                      </span>
                      <ArrowRight
                        aria-hidden
                        className="h-4 w-4 shrink-0 text-[#c59a4b] transition-transform group-hover:translate-x-0.5"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 border-y border-[#381a0b] py-3.5 text-xs text-[#c9b69a]">
                Chưa tải được danh mục. Xem toàn bộ sản phẩm tại{' '}
                <Link href="/san-pham" className="font-semibold text-[#c59a4b] underline">
                  trang sản phẩm
                </Link>
                .
              </p>
            )}
          </div>

          <div className="min-w-0">
            <h3 className="text-sm font-bold text-[#f3dfae]">Ba miền</h3>
            <ul className="mt-4 divide-y divide-[#381a0b] border-y border-[#381a0b]">
              {REGION_ENTRIES.map((region) => {
                const count = facts.regionCounts[region.id] ?? 0;
                return (
                  <li key={region.id}>
                    <Link
                      href={`/san-pham?mien=${region.id}`}
                      className="group flex items-baseline justify-between gap-4 py-3.5 transition-colors"
                    >
                      <span className="min-w-0 break-words font-serif text-base font-bold text-[#f3dfae] transition-colors group-hover:text-[#d4af37]">
                        {region.label}
                      </span>
                      <span className="hidden min-w-0 flex-1 truncate text-xs text-[#c9b69a] sm:block">
                        {region.note}
                      </span>
                      <span className="shrink-0 text-xs tabular-nums text-[#c9b69a]">
                        {count > 0 ? `${count.toLocaleString('vi-VN')} món` : '—'}
                      </span>
                      <ArrowRight
                        aria-hidden
                        className="h-4 w-4 shrink-0 text-[#c59a4b] transition-transform group-hover:translate-x-0.5"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        </div>
      </section>

      {/* 6. Khách đã mua nói gì — đánh giá thật, nhịp lắng (nền gốc, đứng giữa hai dải) */}
      {reviews.length > 0 ? (
        <section aria-labelledby="danh-gia" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 id="danh-gia" className="font-serif text-2xl font-bold text-[#c59a4b] sm:text-3xl">
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
                  <p className="text-xs font-semibold text-[#f3dfae]">{review.reviewer_name}</p>
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
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <div>
            <h2
              id="cau-chuyen"
              className="font-serif text-3xl font-bold leading-tight text-[#c59a4b] sm:text-4xl"
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
                      <span className="mt-1 block text-xs text-[#c9b69a]">{stat.label}</span>
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
