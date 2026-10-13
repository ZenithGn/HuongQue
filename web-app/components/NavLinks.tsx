'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface NavLinksProps {
  isAuthenticated: boolean;
}

export function NavLinks({ isAuthenticated }: NavLinksProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const mien = searchParams.get('mien');

  const navItems = [
    {
      name: 'Trang Chủ',
      href: '/',
      isActive: pathname === '/',
    },
    {
      name: 'Tất Cả Sản Phẩm',
      href: '/san-pham',
      // SỬA TẠI ĐÂY: Dù có mien=bac/trung/nam thì vẫn tính là đang ở trang Sản Phẩm
      isActive: pathname === '/san-pham' && mien !== 'ba_mien',
    },
    {
      name: 'Quà Tết Ba Miền',
      href: '/san-pham?mien=ba_mien',
      isActive: pathname === '/san-pham' && mien === 'ba_mien',
    },
    {
      name: 'Câu chuyện Hương Quê',
      href: '/cau-chuyen',
      isActive: pathname === '/cau-chuyen',
    },
    ...(isAuthenticated
      ? [
        {
          name: 'Đơn hàng',
          href: '/tai-khoan/don-hang',
          isActive: pathname.startsWith('/tai-khoan/don-hang'),
        },
      ]
      : [
        {
          name: 'Tra cứu đơn',
          href: '/tra-cuu-don',
          isActive: pathname === '/tra-cuu-don',
        },
      ]),
  ];

  return (
    <nav className="hidden lg:flex items-center gap-6 font-medium text-xs sm:text-sm tracking-wide">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`relative py-2.5 transition-all duration-300 whitespace-nowrap ${item.isActive
            ? 'text-[#f3dfae] font-bold drop-shadow-[0_0_8px_rgba(243,223,174,0.4)]'
            : 'text-[#c9b69a]/80 hover:text-[#f3dfae]'
            }`}
        >
          {item.name}


          {item.isActive && (
            <span className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full bg-gradient-to-r from-[#c59a4b] via-[#f3dfae] to-[#c59a4b] shadow-[0_0_10px_#c59a4b] transition-all duration-300" />
          )}
        </Link>
      ))}
    </nav>
  );
}