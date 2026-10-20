import Link from 'next/link';
import { getSessionState } from '@/lib/auth';
import { logoutAction } from '@/lib/actions/auth';
import { headers } from 'next/headers';
import { SearchBox } from '@/components/SearchBox';
import { NavLinks } from '@/components/NavLinks';
import { MobileNav } from '@/components/MobileNav';
import {
  ShoppingBag,
  User as UserIcon,
  Shield,
  LogOut,
  Loader2,
} from 'lucide-react';

// Biểu tượng Logo Mẫu 1 (Cánh Sen & Dấu Ấn Cổ Truyền)
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

export async function Header() {
  // Lấy đường dẫn hiện tại từ header do middleware đặt
  const headersList = await headers();
  const pathname = headersList.get('x-current-path') || '';

  // NẾU ĐANG Ở TRANG ĐĂNG NHẬP HOẶC ĐĂNG KÝ -> ẨN LUÔN HEADER NÀY ĐI
  // Chỉ kiểm tra pathname hiện tại (KHÔNG dùng referer vì referer trỏ tới trang trước,
  // khiến header biến mất sau khi đăng nhập xong redirect về trang chủ).
  if (pathname.startsWith('/dang-nhap') || pathname.startsWith('/dang-ky')) {
    return null;
  }

  const session = await getSessionState();
  const isAuthenticated = session.status === 'authenticated';
  const user = isAuthenticated ? session.auth.user : null;
  const profile = isAuthenticated ? session.auth.profile : null;
  const isAdmin = profile?.role === 'admin';
  const sessionUnknown = session.status === 'unavailable';

  return (
    <header className="sticky top-0 z-50 bg-[#120401]/95 backdrop-blur-md border-b border-[#5c2b12] text-[#f3dfae] shadow-lg safe-x">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 xl:px-8">
        {/* `min-h-16` thay cho `h-16`: ở cỡ chữ thường header vẫn đúng 64px, nhưng khi khách tăng
            cỡ chữ mặc định của trình duyệt thì nó cao lên thay vì đẩy cả trang rộng ra (đo được
            trước khi sửa: 2376px ở cỡ chữ gấp đôi).
            `flex-wrap` để hàng này xuống dòng khi hết chỗ, nhờ đó nav được trọn một hàng riêng
            thay vì bị bóp thành cột dọc 440px. Khe của nav ở `lg` đã được nới nên ở cỡ chữ
            thường hàng vẫn một hàng suốt từ 1024px trở lên — con số này có đo, không phải đoán. */}
        <div className="flex flex-wrap items-center justify-between min-h-16 gap-x-3 gap-y-0.5 py-1">

          {/* 1. Logo & Slogan */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group min-h-11">
            <div className="w-9 h-9 rounded-full border border-[#c59a4b] bg-gradient-to-b from-[#2b1005] to-[#120401] flex items-center justify-center text-[#e8cf9b] shadow-md shadow-black/40 group-hover:border-[#d4af37] group-hover:scale-105 transition-all shrink-0">
              <LogoIcon className="w-5 h-5 text-[#c49a52] group-hover:text-[#f3dfae] transition-colors" />
            </div>
            <div>
              <span className="text-lg font-serif font-bold tracking-wider text-[#f3dfae] group-hover:text-[#d4af37] transition-colors block leading-none">
                HƯƠNG QUÊ
              </span>
              {/* Ở dải `lg` (1024–1279) header phải nhường chỗ cho nav + tìm kiếm + giỏ + tài khoản;
                  khẩu hiệu trở lại từ `xl`. Đây là chỗ đo được, không phải phỏng đoán. */}
              <span className="mt-0.5 hidden font-sans text-xs uppercase tracking-[0.14em] text-[#c9b69a] sm:block lg:hidden xl:block">
                Tinh Hoa Quà Việt
              </span>
            </div>
          </Link>

          {/* 2. Navigation Links */}
          <NavLinks isAuthenticated={isAuthenticated} />

          {/* 3. SearchBox & User Actions */}
          <div className="flex items-center gap-1 xl:gap-2 shrink-0">
            <MobileNav isAuthenticated={isAuthenticated} />

            <div className="hidden sm:block relative">
              <SearchBox />
            </div>

            <Link
              href="/gio-hang"
              aria-label="Giỏ hàng của bạn"
              className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#f3dfae] transition-colors hover:bg-[#2b1408]"
              title="Giỏ hàng của bạn"
            >
              <ShoppingBag className="w-5 h-5" aria-hidden />
            </Link>

            {isAdmin && (
              <Link
                href="/admin"
                className="hidden sm:inline-flex min-h-11 items-center gap-1 px-3 rounded-full bg-gradient-to-r from-[#b8863b] to-[#d4af37] text-[#120401] font-semibold text-xs tracking-wide shadow hover:brightness-110 transition-all shrink-0"
              >
                <Shield className="w-3 h-3" aria-hidden />
                <span>Quản Trị</span>
              </Link>
            )}

            {sessionUnknown ? (
              <div
                className="flex items-center gap-1 ml-1 pl-2 border-l border-[#5c2b12] text-xs text-[#c9b69a] shrink-0"
                title="Đang kết nối phiên đăng nhập..."
              >
                <Loader2 className="w-3 h-3 animate-spin text-[#c59a4b]" aria-hidden />
                <span className="hidden sm:inline">Kết nối…</span>
              </div>
            ) : user ? (
              <div className="flex items-center gap-1.5 ml-1 pl-2 border-l border-[#5c2b12] shrink-0">
                <div className="text-right hidden xl:block">
                  <p className="text-xs text-[#f3dfae] font-semibold truncate max-w-[110px]">
                    {profile?.full_name || user.email}
                  </p>
                  <p className="text-xs text-[#c9b69a]">
                    {isAdmin ? 'Quản trị viên' : 'Khách hàng'}
                  </p>
                </div>
                <Link
                  href="/tai-khoan"
                  aria-label="Tài khoản của tôi"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#78502a] text-[#f3dfae] transition-all hover:bg-[#2b1408]"
                  title="Tài khoản của tôi"
                >
                  <UserIcon className="w-4 h-4" aria-hidden />
                </Link>
                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="inline-flex min-h-11 items-center gap-1 rounded-xl border border-[#78502a] px-3 text-xs font-medium text-[#f3dfae] transition-all hover:bg-[#2b1408] shrink-0"
                    title="Đăng xuất"
                  >
                    <LogOut className="w-3.5 h-3.5" aria-hidden />
                    <span className="hidden xl:inline">Đăng xuất</span>
                  </button>
                </form>
              </div>
            ) : (
              // Dưới 640px, cụm Đăng nhập/Đăng ký làm tràn header (nút Đăng ký bị cắt) —
              // hai lối vào này được chuyển vào drawer của MobileNav.
              <div className="hidden items-center gap-1.5 border-l border-[#5c2b12] pl-2 ml-1 shrink-0 sm:flex">
                <Link
                  href="/dang-nhap"
                  className="inline-flex min-h-11 items-center whitespace-nowrap rounded-xl px-2 xl:px-3 text-xs font-medium text-[#f3dfae] transition-colors hover:bg-[#2b1408]"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/dang-ky"
                  className="inline-flex min-h-11 items-center whitespace-nowrap rounded-xl bg-[#c59a4b] px-3 xl:px-3.5 text-xs font-semibold text-[#120401] shadow-sm transition-all hover:bg-[#cca154]"
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}