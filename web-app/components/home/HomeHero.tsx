import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/** Hero biên tập: dùng ảnh được cung cấp, còn giá và sản phẩm luôn lấy từ data layer. */
export function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#120401] lg:min-h-[min(820px,92svh)]">
      <div className="absolute inset-0 hidden lg:block">
        <Image
          src="/images/hero-tet-gift-box.png.png"
          alt="Hộp quà Tết Hương Quê với đặc sản ba miền trong không gian sơn mài ấm áp"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[58%_center]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,#120401_0%,rgba(18,4,1,0.96)_20%,rgba(18,4,1,0.78)_38%,rgba(18,4,1,0.14)_69%,rgba(18,4,1,0.05)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#120401] to-transparent"
        />
      </div>

      <div className="relative aspect-[4/3] w-full lg:hidden">
        <Image
          src="/images/hero-tet-gift-box.png.png"
          alt="Hộp quà Tết Hương Quê với đặc sản ba miền trong không gian sơn mài ấm áp"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[64%_center]"
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1536px] px-5 pb-12 pt-8 sm:px-8 lg:flex lg:min-h-[min(820px,92svh)] lg:items-center lg:px-12 lg:pb-20 lg:pt-24 2xl:px-16">
        <div className="max-w-[650px]">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#d4af37] sm:text-sm">
            Tinh hoa đặc sản Việt Nam
          </p>
          <h1 className="font-serif text-[clamp(2.25rem,5.2vw,4.5rem)] font-bold leading-[1.08] tracking-[-0.025em] text-[#f3dfae] sm:text-[clamp(2.75rem,5.2vw,4.5rem)]">
            Trao tinh hoa Việt,
            <br />
            gửi trọn yêu thương
          </h1>
          <p className="mt-5 max-w-[36rem] text-base leading-relaxed text-[#e0c9a3] sm:text-lg">
            Hộp quà Tết và đặc sản ba miền, tuyển chọn kỹ lưỡng, đóng gói chỉn chu, dành cho người
            thân và đối tác.
          </p>
          <Link
            href="/san-pham?danh_muc=hop-qua-tet"
            className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-xl bg-gradient-to-r from-[#b8863b] via-[#d4af37] to-[#b8863b] px-6 py-3 text-sm font-bold uppercase tracking-wider text-[#120401] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f3dfae]"
          >
            Khám phá bộ sưu tập
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
