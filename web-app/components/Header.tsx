import Link from 'next/link';
import { getSessionState } from '@/lib/auth';
import { logoutAction } from '@/lib/actions/auth';
import { headers } from 'next/headers';
import { SearchBox } from '@/components/SearchBox';
import { NavLinks } from '@/components/NavLinks';
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
    <header className="sticky top-0 z-50 bg-[#120401]/95 backdrop-blur-md border-b border-[#5c2b12] text-amber-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">

          {/* 1. Logo & Slogan */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-9 h-9 rounded-full border border-[#c59a4b] bg-gradient-to-b from-[#2b1005] to-[#120401] flex items-center justify-center text-[#e8cf9b] shadow-md shadow-amber-950/40 group-hover:border-[#e0b966] group-hover:scale-105 transition-all">
              <LogoIcon className="w-5 h-5 text-[#c49a52] group-hover:text-[#e8cf9b] transition-colors" />
            </div>
            <div>
              <span className="text-lg font-serif font-bold tracking-wider text-[#f3dfae] group-hover:text-amber-200 transition-colors block leading-none">
                HƯƠNG QUÊ
              </span>
              <span className="block text-[8px] text-[#c9b69a] font-sans tracking-[0.18em] uppercase mt-0.5">
                Tinh Hoa Quà Việt
              </span>
            </div>
          </Link>

          {/* 2. Navigation Links */}
          <NavLinks isAuthenticated={isAuthenticated} />

          {/* 3. SearchBox & User Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="relative">
              <SearchBox />
            </div>

            <Link
              href="/gio-hang"
              className="p-2 rounded-full hover:bg-[#2b1408] text-[#f3dfae] transition-colors relative shrink-0"
              title="Giỏ hàng của bạn"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
            </Link>

            {isAdmin && (
              <Link
                href="/admin"
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 text-stone-950 font-semibold text-[10px] tracking-wide shadow hover:brightness-110 transition-all shrink-0"
              >
                <Shield className="w-3 h-3" />
                <span>Quản Trị</span>
              </Link>
            )}

            {sessionUnknown ? (
              <div
                className="flex items-center gap-1 ml-1 pl-2 border-l border-[#5c2b12] text-[11px] text-[#c9b69a]/80 shrink-0"
                title="Đang kết nối phiên đăng nhập..."
              >
                <Loader2 className="w-3 h-3 animate-spin text-amber-500" />
                <span className="hidden sm:inline">Kết nối…</span>
              </div>
            ) : user ? (
              <div className="flex items-center gap-1.5 ml-1 pl-2 border-l border-[#5c2b12] shrink-0">
                <div className="text-right hidden xl:block">
                  <p className="text-xs text-[#f3dfae] font-semibold truncate max-w-[110px]">
                    {profile?.full_name || user.email}
                  </p>
                  <p className="text-[9px] text-[#c9b69a]/60">
                    {isAdmin ? 'Quản trị viên' : 'Khách hàng'}
                  </p>
                </div>
                <Link
                  href="/tai-khoan"
                  className="p-1.5 rounded-lg border border-[#78502a] hover:bg-[#2b1408] text-[#f3dfae] transition-all shrink-0"
                  title="Tài khoản của tôi"
                >
                  <UserIcon className="w-4 h-4" />
                </Link>
                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#78502a] hover:bg-[#2b1408] text-[#f3dfae] text-xs font-medium transition-all shrink-0"
                    title="Đăng xuất"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span className="hidden xl:inline">Đăng xuất</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 ml-1 pl-2 border-l border-[#5c2b12] shrink-0">
                <Link
                  href="/dang-nhap"
                  className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#f3dfae] hover:bg-[#2b1408] transition-colors whitespace-nowrap"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/dang-ky"
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#c59a4b] text-[#120401] hover:bg-[#cca154] shadow-sm transition-all whitespace-nowrap"
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