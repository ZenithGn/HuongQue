import Link from 'next/link';
import { MapPin, Phone } from 'lucide-react';
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

export function Footer() {
  return (
    <footer className="bg-[#120401] text-amber-100/80 border-t border-[#5c2b12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* 1. Brand Info + Thông tin người bán (Đã đổi Logo Mẫu 1) */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full border border-[#c59a4b] bg-gradient-to-b from-[#2b1005] to-[#120401] flex items-center justify-center text-[#e8cf9b] shadow-md shadow-amber-950/40 group-hover:border-[#e0b966] group-hover:scale-105 transition-all shrink-0">
                <LogoIcon className="w-5 h-5 text-[#c49a52] group-hover:text-[#e8cf9b] transition-colors" />
              </div>
              <span className="text-xl font-serif font-bold tracking-wider text-[#f3dfae] group-hover:text-amber-200 transition-colors">
                HƯƠNG QUÊ
              </span>
            </Link>

            <p className="text-xs text-[#c9b69a] leading-relaxed">
              Hương Quê – thương hiệu quà Tết chuyên đặc sản vùng miền Việt Nam. Kết nối tinh hoa ẩm thực ba miền đến món quà tay tổng quà.
            </p>

            <div className="text-xs space-y-2 text-[#c9b69a] pt-1">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#c49a52] shrink-0 mt-0.5" />
                <span>128 Phố Cổ, Hoàn Kiếm, Hà Nội</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#c49a52] shrink-0 mt-0.5" />
                <span>100 Nguyễn Thị Minh Khai, Q.1, TP. HCM</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#c49a52]" />
                <strong className="text-[#f3dfae]">0901 000 000</strong>
              </p>
            </div>
          </div>

          {/* 2. Đặc sản vùng miền */}
          <div>
            <h4 className="text-sm font-semibold text-[#f3dfae] uppercase tracking-wider mb-4">
              ĐẶC SẢN VÙNG MIỀN
            </h4>
            <ul className="space-y-2.5 text-xs text-[#c9b69a]">
              <li>
                <Link href="/san-pham?mien=bac" className="hover:text-amber-200 transition-colors">
                  Trà Thái Nguyên thơm dịu, Cà Phê Đà Lạt
                </Link>
              </li>
              <li>
                <Link href="/san-pham?mien=trung" className="hover:text-amber-200 transition-colors">
                  Bánh pía Sóc Trăng, Mứt sen Huế
                </Link>
              </li>
              <li>
                <Link href="/san-pham?mien=nam" className="hover:text-amber-200 transition-colors">
                  Mẹ xưng trà Thành, Bánh đậu xanh
                </Link>
              </li>
              <li>
                <Link href="/san-pham?mien=phuquoc" className="hover:text-amber-200 transition-colors">
                  Nước mắm Phú Quốc, Muối ớt Tây Ninh
                </Link>
              </li>
              <li>
                <Link href="/san-pham?mien=binhphuoc" className="hover:text-amber-200 transition-colors">
                  Hạt điều Bình Phước, Mắc ca Tây Nguyên
                </Link>
              </li>
              <li>
                <Link href="/san-pham" className="hover:text-amber-200 transition-colors text-[#c49a52]">
                  Xem tất cả sản phẩm →
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Hỗ trợ khách hàng */}
          <div>
            <h4 className="text-sm font-semibold text-[#f3dfae] uppercase tracking-wider mb-4">
              HỖ TRỢ KHÁCH HÀNG
            </h4>
            <ul className="space-y-2.5 text-xs text-[#c9b69a]">
              <li>
                <Link href="/faq" className="hover:text-amber-200 transition-colors">
                  Câu hỏi thường gặp (FAQ)
                </Link>
              </li>
              <li>
                <Link href="/van-chuyen" className="hover:text-amber-200 transition-colors">
                  Hướng dẫn mua hàng & giao nhận
                </Link>
              </li>
              <li>
                <Link href="/chinh-sach-doi-tra" className="hover:text-amber-200 transition-colors">
                  Chính sách đổi trả & hoàn tiền
                </Link>
              </li>
              <li>
                <Link href="/tra-cuu-don" className="hover:text-amber-200 transition-colors">
                  Tra cứu đơn hàng
                </Link>
              </li>
              <li>
                <Link href="/ho-tro-doanh-nghiep" className="hover:text-amber-200 transition-colors">
                  Hỗ trợ doanh nghiệp & số lượng lớn
                </Link>
              </li>
              <li>
                <Link href="/lien-he" className="hover:text-amber-200 transition-colors">
                  Liên hệ chúng tôi
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Bản tin */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[#f3dfae] uppercase tracking-wider">
              NHẮN TIN ƯU ĐÃI QUÀ TẾT
            </h4>
            <p className="text-xs text-[#c9b69a] leading-relaxed">
              Đăng ký để không bỏ lỡ thông báo sớm về quà tết giới hạn, xu hướng đặc quyền và ưu đãi VIP.
            </p>

            <NewsletterForm className="space-y-3" />

            <div className="text-[11px] text-[#c9b69a]/70 pt-1">
              Thông tin của bạn sẽ được bảo mật tuyệt đối với chính sách của Hương Quê. Cam kết không đăng ký nhận thêm nào.
            </div>
          </div>

        </div>

        {/* Dòng Copyright dưới cùng */}
        <div className="mt-12 pt-6 border-t border-[#5c2b12] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#c9b69a]/60">
          <p>© 2027 Hương Quê. Tinh hoa quà Tết ba miền. Cả động lực nhân hiệu tại CSD201.</p>
          <div className="flex items-center gap-4">
            <Link href="/chinh-sach-bao-mat" className="hover:text-amber-200 transition-colors">
              Chính sách bảo mật
            </Link>
            <Link href="/dieu-khoan-su-dung" className="hover:text-amber-200 transition-colors">
              Điều khoản sử dụng
            </Link>
            <Link href="/lien-he" className="hover:text-amber-200 transition-colors">
              Đến đối tác website
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}