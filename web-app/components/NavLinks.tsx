'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinksProps {
  isAuthenticated: boolean;
}

export function NavLinks({ isAuthenticated }: NavLinksProps) {
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Trang Chủ',
      href: '/',
      isActive: pathname === '/',
    },
    {
      // Mục "Quà Tết Ba Miền" đã bỏ khỏi navbar: bộ lọc `mien=ba_mien` vẫn còn trong
      // sidebar của /san-pham, nên không mất đường vào — chỉ bớt một mục trùng đích.
      name: 'Tất Cả Sản Phẩm',
      href: '/san-pham',
      isActive: pathname === '/san-pham',
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
    // Siết nhịp ở `lg` (1024–1279) rồi mở lại ở `xl`: cộng tất cả phần tử của header, dải đó chỉ
    // vừa khi nav dùng chữ nhỏ hơn và khoảng cách hẹp hơn. `min-h-11` giữ sàn vùng chạm 44px.
    //
    // `flex-wrap` + `min-w-0`: khi khách tăng cỡ chữ mặc định của trình duyệt (WCAG 1.4.4), chữ
    // phình gấp đôi và nav không còn vừa một hàng. Trước đây nó đẩy cả trang rộng ra 2376px và
    // sinh thanh cuộn ngang; giờ nó tự xuống dòng. Xuống dòng thì mất chút mỹ quan, tràn ngang
    // thì mất nội dung — chọn cái đầu.
    <nav className="hidden lg:flex min-w-0 flex-wrap items-center gap-x-3 gap-y-0 xl:gap-x-6 font-medium text-xs xl:text-sm tracking-wide">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`relative inline-flex min-h-11 items-center transition-all duration-300 whitespace-nowrap ${item.isActive
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