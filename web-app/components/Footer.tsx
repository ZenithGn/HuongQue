import Link from 'next/link';
import { ArrowRight, MapPin, Phone } from 'lucide-react';
import { NewsletterForm } from '@/components/NewsletterForm';

// 1. BIỂU TƯỢNG LOGO MẪU 1 (Cánh Sen & Dấu Ấn Cổ Truyền)
function LogoIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" strokeWidth="1" strokeDasharray="1 1.5" />
      <path
        d="M12 4C12 4 8 8 8 13C8 15.2 9.8 17 12 17C14.2 17 16 15.2 16 13C16 8 12 4 12 4Z"
        fill="currentColor"
        fillOpacity="0.2"
      />
      <path d="M12 4C12 4 5 9 5 13.5C5 16 7 18 9.5 18C11.5 18 12 16.5 12 16.5" />
      <path d="M12 4C12 4 19 9 19 13.5C19 16 17 18 14.5 18C12.5 18 12 16.5 12 16.5" />
      <circle cx="12" cy="11" r="1" fill="currentColor" />
    </svg>
  );
}

/**
 * Chân trang.
 *
 * Nội dung đã sửa theo PRODUCT.md:
 * - Bỏ hai địa chỉ đường phố bịa (128 Phố Cổ / 100 Nguyễn Thị Minh Khai) — Hương Quê **chưa có**
 *   thông tin pháp lý thật, nên chỉ ghi địa bàn đã chốt trong Brand Commitments.
 * - Hotline và email là **dữ liệu mẫu**, được dán nhãn đúng như vậy thay vì trình bày như thật.
 * - Link "Đặc sản vùng miền" dùng đúng enum `region` của DB (`bac` / `trung` / `nam` / `ba_mien`);
 *   trước đây có `mien=phuquoc` và `mien=binhphuoc` — giá trị ngoài enum nên bộ lọc âm thầm bỏ qua.
 */
export function Footer() {
  return (
    <footer className="border-t border-[#5c2b12] bg-[#120401] text-[#c9b69a]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* 1. Thương hiệu + thông tin liên hệ (dữ liệu mẫu, có dán nhãn) */}
          <div className="space-y-4">
            <Link href="/" className="group flex min-h-11 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c59a4b] bg-gradient-to-b from-[#2b1005] to-[#120401] text-[#e8cf9b] shadow-md shadow-black/40 transition-all group-hover:border-[#d4af37] group-hover:scale-105">
                <LogoIcon className="h-5 w-5 text-[#c49a52] transition-colors group-hover:text-[#f3dfae]" />
              </div>
              <span className="font-serif text-xl font-bold tracking-wider text-[#f3dfae] transition-colors group-hover:text-[#d4af37]">
                HƯƠNG QUÊ
              </span>
            </Link>

            <p className="text-xs leading-relaxed text-[#c9b69a]">
              Hương Quê tuyển chọn đặc sản OCOP ba miền, đóng sẵn thành hộp quà Tết chỉn chu — để
              người mua không phải tự ghép món và không phải lo quà đến muộn.
            </p>

            <div className="space-y-2 pt-1 text-xs text-[#c9b69a]">
              <p className="flex items-start gap-2">
                <MapPin aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#c49a52]" />
                <span>Địa bàn: Hà Nội · Đà Nẵng · TP. Hồ Chí Minh</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone aria-hidden className="h-3.5 w-3.5 text-[#c49a52]" />
                <strong className="text-[#f3dfae]">0901 000 000</strong>
              </p>
              <p className="text-xs text-[#c9b69a]">
                Hotline và email liên hệ trong bản demo này là <strong className="font-semibold text-[#f3dfae]">dữ liệu mẫu</strong>,
                chưa phải thông tin thật của người bán.
              </p>
            </div>
          </div>

          {/* 2. Đặc sản vùng miền — link dùng đúng enum region */}
          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#c59a4b]">
              Đặc sản vùng miền
            </h2>
            <ul className="space-y-2.5 text-xs text-[#c9b69a]">
              <li>
                <Link href="/san-pham?mien=bac" className="tap-row transition-colors hover:text-[#f3dfae]">
                  Trà Thái Nguyên, ô mai Hà Nội
                </Link>
              </li>
              <li>
                <Link href="/san-pham?mien=trung" className="tap-row transition-colors hover:text-[#f3dfae]">
                  Mè xửng Huế, cà phê Buôn Ma Thuột
                </Link>
              </li>
              <li>
                <Link href="/san-pham?mien=nam" className="tap-row transition-colors hover:text-[#f3dfae]">
                  Bánh pía Sóc Trăng, mứt dừa Bến Tre
                </Link>
              </li>
              <li>
                <Link href="/san-pham?mien=ba_mien" className="tap-row transition-colors hover:text-[#f3dfae]">
                  Hộp quà gộp ba miền
                </Link>
              </li>
              <li>
                <Link
                  href="/san-pham"
                  className="tap-row gap-1 font-semibold text-[#c49a52] transition-colors hover:text-[#f3dfae]"
                >
                  Xem tất cả sản phẩm
                  <ArrowRight aria-hidden className="h-3.5 w-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Hỗ trợ khách hàng */}
          <div>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#c59a4b]">
              Hỗ trợ khách hàng
            </h2>
            <ul className="space-y-2.5 text-xs text-[#c9b69a]">
              <li>
                <Link href="/faq" className="tap-row transition-colors hover:text-[#f3dfae]">
                  Câu hỏi thường gặp (FAQ)
                </Link>
              </li>
              <li>
                <Link href="/van-chuyen" className="tap-row transition-colors hover:text-[#f3dfae]">
                  Phí vận chuyển &amp; hạn chốt Tết
                </Link>
              </li>
              <li>
                <Link href="/chinh-sach-doi-tra" className="tap-row transition-colors hover:text-[#f3dfae]">
                  Chính sách đổi trả & bồi hoàn
                </Link>
              </li>
              <li>
                <Link href="/tra-cuu-don" className="tap-row transition-colors hover:text-[#f3dfae]">
                  Tra cứu đơn
                </Link>
              </li>
              <li>
                <Link href="/lien-he" className="tap-row transition-colors hover:text-[#f3dfae]">
                  Đặt quà doanh nghiệp & số lượng lớn
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Bản tin */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#c59a4b]">
              Nhận tin ưu đãi quà Tết
            </h2>
            <p className="text-xs leading-relaxed text-[#c9b69a]">
              Đăng ký để nhận thông báo sớm về các hộp quà giới hạn và lịch giao hàng dịp Tết.
            </p>

            <NewsletterForm className="space-y-3" />

            {/* Ghi chú "email chỉ dùng để gửi bản tin" đã nằm trong chính form. Ở đây chỉ nói
                phần form không nói: quyền rút lại. Mỗi ý một lần. */}
            <p className="pt-1 text-xs text-[#c9b69a]">Mỗi thư đều kèm link hủy đăng ký.</p>
          </div>

        </div>

        {/* Dòng Copyright dưới cùng */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#5c2b12] pt-6 text-xs text-[#c9b69a] sm:flex-row">
          <p>© 2027 Hương Quê. Tinh hoa quà Tết ba miền.</p>
          <div className="flex items-center gap-4">
            <Link href="/chinh-sach-bao-mat" className="tap-target tap-row transition-colors hover:text-[#f3dfae]">
              Chính sách bảo mật
            </Link>
            <Link href="/lien-he" className="tap-target tap-row transition-colors hover:text-[#f3dfae]">
              Liên hệ
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
