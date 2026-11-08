import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowRight, Gift, HeartHandshake, PackageCheck, ShieldCheck } from 'lucide-react';
import {
  DELIVERY_WINDOWS,
  TET_2027,
  cutoffState,
  daysUntil,
  formatCutoffDate,
} from '@/lib/tet';

const REGIONS = [
  {
    name: 'Miền Bắc',
    caption: 'Nét tinh tế truyền thống',
    image: '/images/featured-specialty-north.png',
    alt: 'Mâm đặc sản và trà trong không gian ấm cúng, gợi nét ẩm thực miền Bắc',
  },
  {
    name: 'Miền Trung',
    caption: 'Hương vị đậm đà',
    image: '/images/featured-specialty-central.png',
    alt: 'Mâm món ngon miền Trung với sắc vị đậm đà',
  },
  {
    name: 'Miền Nam',
    caption: 'Sắc vị phong phú',
    image: '/images/featured-specialty-south.png',
    alt: 'Đặc sản miền Nam với trái cây và món quà quê',
  },
] as const;

const REGIONAL_SCENES = [
  { image: '/images/region-north.png', alt: 'Nương chè xanh giữa núi đồi miền Bắc', caption: 'Miền Bắc' },
  { image: '/images/region-central.png', alt: 'Phố cổ bên sông trong ánh chiều miền Trung', caption: 'Miền Trung' },
  { image: '/images/region-south.png', alt: 'Sông nước và hàng dừa miền Nam', caption: 'Miền Nam' },
] as const;

const VALUES = [
  {
    icon: Gift,
    title: 'Tuyển chọn đặc sản',
    body: 'Tập trung vào đặc sản ba miền và định hướng xây dựng những hộp quà Tết có sự kết hợp hài hòa giữa các sản phẩm.',
  },
  {
    icon: PackageCheck,
    title: 'Chỉn chu trong trao tặng',
    body: 'Chú trọng cách kết hợp sản phẩm và hình thức đóng gói, để món quà phù hợp với những dịp biếu tặng quan trọng.',
  },
  {
    icon: ShieldCheck,
    title: 'Ưu tiên sự an tâm',
    body: 'Giúp khách hàng lựa chọn và đặt quà thuận tiện, đồng thời cung cấp thông tin về thời hạn đặt hàng để chủ động kế hoạch giao quà dịp Tết.',
  },
] as const;

const GIFT_NEEDS = [
  {
    title: 'Quà Tết gia đình',
    body: 'Gửi lời chúc năm mới và sự quan tâm đến những người thân yêu.',
  },
  {
    title: 'Quà Tết đối tác',
    body: 'Lựa chọn hộp quà trang trọng để thể hiện sự trân trọng trong các mối quan hệ công việc.',
  },
  {
    title: 'Quà Tết doanh nghiệp',
    body: 'Hướng đến nhu cầu đặt quà số lượng lớn cho nhân viên, khách hàng và đối tác.',
  },
] as const;

function DeadlineStatus({ iso }: { iso: string }) {
  const remaining = daysUntil(iso);
  const state = cutoffState(remaining);

  if (state === 'closed') return <>Đã qua hạn</>;
  if (state === 'last_day') return <>Hạn chốt hôm nay</>;
  return <>Còn {remaining} ngày</>;
}

export default function CauChuyenPage() {
  const allDeadlinesPassed = DELIVERY_WINDOWS.every((window) => daysUntil(window.iso) < 0);

  return (
    <div className="overflow-hidden bg-[#120401] text-[#f3dfae]">
      <section aria-labelledby="about-title" className="relative isolate border-b border-[#5c2b12]">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_78%_20%,rgba(197,154,75,0.12),transparent_48%)]" />
        <div className="mx-auto grid w-full max-w-[1280px] items-center gap-8 px-4 pb-12 pt-12 sm:px-6 sm:pb-16 lg:grid-cols-[0.88fr_1.12fr] lg:gap-12 lg:px-8 lg:pb-20 lg:pt-16">
          <div className="max-w-[590px]">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#d4af37] sm:text-sm">
              Về Hương Quê
            </p>
            <h1 id="about-title" className="font-serif text-4xl font-black leading-[1.08] tracking-[-0.025em] text-[#f3dfae] sm:text-5xl xl:text-6xl">
              HƯƠNG QUÊ
              <span className="mt-3 block text-2xl font-bold leading-tight tracking-normal text-[#c59a4b] sm:text-3xl xl:text-4xl">
                Tinh Hoa Quà Tết Ba Miền
              </span>
            </h1>
            <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-[#c9b69a] sm:text-[17px]">
              <p>
                Mỗi món quà Tết không chỉ mang theo hương vị quê nhà, mà còn gửi gắm sự quan tâm và những lời chúc tốt đẹp đến người nhận.
              </p>
              <p>
                Hương Quê mang đặc sản ba miền Bắc – Trung – Nam vào những hộp quà được tuyển chọn và đóng gói chỉn chu, để mỗi món quà trao đi đều thể hiện tấm lòng của người tặng.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/san-pham?danh_muc=hop-qua-tet"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#b8863b] via-[#d4af37] to-[#b8863b] px-5 py-3 text-sm font-bold uppercase tracking-wide text-[#120401] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f3dfae]"
              >
                Khám phá bộ sưu tập <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
              <Link
                href="#dac-san-ba-mien"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#78502a] bg-[#180702]/70 px-5 py-3 text-sm font-semibold text-[#f3dfae] transition hover:border-[#c59a4b] hover:bg-[#210c04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d4af37]"
              >
                Tìm hiểu đặc sản ba miền <ArrowDown aria-hidden className="h-4 w-4 text-[#c59a4b]" />
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#5c2b12] bg-[#180702] shadow-[0_20px_60px_rgba(0,0,0,0.38)] lg:aspect-[1.16/1]">
            <Image
              src="/images/hero-tet-gift-box.png"
              alt="Hộp quà Tết Hương Quê cùng các món đặc sản được bày biện trang trọng"
              fill
              priority
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="object-cover object-[64%_center]"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#120401]/50 via-transparent to-transparent" />
            <p className="absolute bottom-4 left-4 rounded-full border border-[#c59a4b]/50 bg-[#120401]/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#f3dfae] backdrop-blur-sm sm:bottom-5 sm:left-5">
              Tinh hoa quà Tết ba miền
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="story-title" className="border-b border-[#5c2b12] bg-[#180702]">
        <div className="mx-auto grid w-full max-w-[1160px] items-center gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_0.92fr] lg:gap-14 lg:px-8 lg:py-20">
          <div className="relative aspect-[5/4] overflow-hidden rounded-2xl border border-[#5c2b12] bg-[#120401]">
            <Image
              src="/images/featured-gift-box.png"
              alt="Mâm quà quê với bánh trái, trà và đặc sản được chuẩn bị để sum họp ngày Tết"
              fill
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 id="story-title" className="max-w-lg font-serif text-3xl font-bold leading-tight text-[#f3dfae] sm:text-4xl">
              Gửi hương vị quê nhà,<br />trao trọn yêu thương
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-[#c9b69a]">
              <p>
                Tết là dịp để mỗi người trở về với những điều thân thuộc, dành thời gian cho gia đình và gửi lời tri ân đến những người đã đồng hành cùng mình.
              </p>
              <p>
                Từ ý nghĩa ấy, Hương Quê hướng đến việc kết nối những đặc sản của ba miền trong những hộp quà Tết được chuẩn bị chỉn chu. Mỗi lựa chọn không chỉ hướng đến hương vị, mà còn chú trọng cách kết hợp sản phẩm và hình thức trao tặng.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="dac-san-ba-mien" aria-labelledby="regions-title" className="scroll-mt-24">
        <div className="mx-auto w-full max-w-[1280px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 id="regions-title" className="font-serif text-3xl font-bold text-[#f3dfae] sm:text-4xl">
              Ba miền hương vị – Một tấm lòng Việt
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#c9b69a]">
              Mỗi vùng đất Việt Nam đều mang những nét riêng trong văn hóa ẩm thực và quà biếu. Hương Quê lấy ba miền Bắc – Trung – Nam làm trục chính để giới thiệu đặc sản và gợi ý những lựa chọn quà Tết phù hợp.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-5">
            {REGIONS.map((region) => (
              <article key={region.name} className="group relative isolate min-h-[390px] overflow-hidden rounded-2xl border border-[#5c2b12] bg-[#180702] sm:min-h-[430px]">
                <Image
                  src={region.image}
                  alt={region.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="-z-20 object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-[#120401]/95 via-[#120401]/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d4af37]">Đặc sản tuyển chọn</p>
                  <h3 className="mt-2 font-serif text-2xl font-bold text-[#f3dfae] sm:text-3xl">{region.name}</h3>
                  <p className="mt-1 text-sm text-[#f3dfae]">{region.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="values-title" className="border-y border-[#5c2b12] bg-[#180702]">
        <div className="mx-auto w-full max-w-[1160px] px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="max-w-2xl">
            <h2 id="values-title" className="font-serif text-3xl font-bold leading-tight text-[#f3dfae] sm:text-4xl">
              Món quà chỉn chu từ khâu<br className="hidden sm:block" /> lựa chọn đến khi trao tay
            </h2>
          </div>
          <div className="mt-8 grid gap-7 md:grid-cols-3 md:gap-6">
            {VALUES.map(({ icon: Icon, title, body }, index) => (
              <article key={title} className="border-t border-[#78502a] pt-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#5c2b12] bg-[#120401] text-[#c59a4b]">
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  <span className="font-serif text-sm font-bold text-[#c59a4b]">0{index + 1}</span>
                </div>
                <h3 className="mt-4 font-serif text-xl font-bold text-[#f3dfae]">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#c9b69a]">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="gift-needs-title">
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-9 px-4 py-14 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:px-8 lg:py-20">
          <div>
            <h2 id="gift-needs-title" className="font-serif text-3xl font-bold leading-tight text-[#f3dfae] sm:text-4xl">
              Mỗi món quà,<br />một cách gửi gắm tình cảm
            </h2>
            <div className="mt-6 divide-y divide-[#381a0b] border-y border-[#381a0b]">
              {GIFT_NEEDS.map((need) => (
                <div key={need.title} className="py-4 first:pt-5 last:pb-5">
                  <h3 className="font-serif text-lg font-bold text-[#f3dfae]">{need.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-[#c9b69a]">{need.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 grid-rows-2 gap-3 sm:gap-4">
            {REGIONAL_SCENES.map((scene, index) => (
              <figure key={scene.image} className={`relative min-h-40 overflow-hidden rounded-xl border border-[#5c2b12] bg-[#180702] sm:min-h-52 ${index === 0 ? 'row-span-2' : ''}`}>
                <Image
                  src={scene.image}
                  alt={scene.alt}
                  fill
                  sizes="(min-width: 1024px) 26vw, 50vw"
                  className="object-cover"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#120401]/80 to-transparent" />
                <figcaption className="absolute bottom-3 left-3 font-serif text-base font-bold text-[#f3dfae] sm:bottom-4 sm:left-4 sm:text-lg">
                  {scene.caption}
                </figcaption>
              </figure>
            ))}
            <p className="col-span-2 px-1 text-xs leading-relaxed text-[#c9b69a]">
              Cảnh sắc ba miền là nguồn cảm hứng cho những món quà mang hương vị quê nhà.
            </p>
          </div>
        </div>
      </section>

      <section id="dat-qua-giao-hang" aria-labelledby="delivery-title" className="border-y border-[#5c2b12] bg-[#180702]">
        <div className="mx-auto w-full max-w-[1160px] px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <div>
              <h2 id="delivery-title" className="font-serif text-3xl font-bold text-[#f3dfae] sm:text-4xl">
                Đặt món quà,<br />đong đầy an tâm
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#c9b69a]">
                Phí vận chuyển là 30.000₫ cho mỗi đơn và miễn phí với đơn từ 500.000₫. Có thể thanh toán khi nhận hàng (COD) hoặc qua chuyển khoản/QR PayOS.
              </p>
              <Link href="/van-chuyen" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#d4af37] underline decoration-[#5c2b12] underline-offset-4 transition hover:text-[#f3dfae] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f3dfae]">
                Xem thông tin vận chuyển <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-2xl border border-[#5c2b12] bg-[#120401] p-5 sm:p-6">
              <h3 className="font-serif text-xl font-bold text-[#f3dfae]">Hạn đặt để xử lý giao dịp Tết {TET_2027.year}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#c9b69a]">
                {allDeadlinesPassed
                  ? 'Các mốc đặt hàng để xử lý giao trước Tết đã qua; đơn mới vẫn có thể đặt nhưng dự kiến giao sau Tết.'
                  : 'Mốc đặt hàng được tính theo nơi nhận. Đơn sau thời hạn tương ứng vẫn có thể đặt nhưng dự kiến giao sau Tết.'}
              </p>
              <dl className="mt-5 divide-y divide-[#381a0b] border-y border-[#381a0b]">
                {DELIVERY_WINDOWS.map((window) => (
                  <div key={window.id} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                    <div>
                      <dt className="font-semibold text-[#f3dfae]">{window.label}</dt>
                      <dd className="mt-1 text-sm text-[#c9b69a]">Trước {window.lunar} ({formatCutoffDate(window.iso)})</dd>
                    </div>
                    <dd className={`text-sm font-semibold ${cutoffState(daysUntil(window.iso)) === 'closed' ? 'text-[#c9b69a]' : 'text-[#d4af37]'}`}>
                      <DeadlineStatus iso={window.iso} />
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-xs leading-relaxed text-[#c9b69a]">
                Đây là thời hạn xử lý đơn theo quy định hiện tại, không phải cam kết giao hàng tuyệt đối. Chi tiết phí và điều kiện xem tại trang vận chuyển.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="about-cta-title" className="relative isolate px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div aria-hidden className="absolute inset-x-[8%] top-0 -z-10 h-px bg-gradient-to-r from-transparent via-[#c59a4b]/70 to-transparent" />
        <div className="mx-auto max-w-4xl rounded-2xl border border-[#5c2b12] bg-[radial-gradient(ellipse_at_top,rgba(197,154,75,0.12),transparent_70%),#180702] px-5 py-10 text-center shadow-[0_16px_45px_rgba(0,0,0,0.25)] sm:px-10 sm:py-12">
          <HeartHandshake aria-hidden className="mx-auto h-8 w-8 text-[#c59a4b]" />
          <h2 id="about-cta-title" className="mt-4 font-serif text-3xl font-bold leading-tight text-[#f3dfae] sm:text-4xl">
            Trao tinh hoa Việt, gửi trọn yêu thương
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#c9b69a]">
            Hãy cùng Hương Quê khám phá những hương vị quê nhà và tìm món quà phù hợp để gửi trao lời chúc tốt đẹp trong dịp năm mới.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/san-pham" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#b8863b] via-[#d4af37] to-[#b8863b] px-6 py-3 text-sm font-bold uppercase tracking-wide text-[#120401] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f3dfae]">
              Khám phá sản phẩm <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
            <Link href="/san-pham?danh_muc=hop-qua-tet" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#78502a] bg-[#120401]/70 px-6 py-3 text-sm font-semibold text-[#f3dfae] transition hover:border-[#c59a4b] hover:bg-[#210c04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d4af37]">
              Xem hộp quà Tết
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
