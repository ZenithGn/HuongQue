'use client';

import Link from 'next/link';
import type { ProductMenuData } from '@/lib/types';

interface ProductMegaMenuProps {
  data: ProductMenuData;
  mobile?: boolean;
  onNavigate?: () => void;
}

export function ProductMegaMenu({ data, mobile = false, onNavigate }: ProductMegaMenuProps) {
  const regionHref = (id: string) => `/san-pham?mien=${encodeURIComponent(id)}`;
  const categoryHref = (slug: string) => `/san-pham?danh_muc=${encodeURIComponent(slug)}`;

  const listClass = 'space-y-1';
  const linkClass = 'flex min-h-10 w-full items-center rounded-lg px-3 py-2 text-left text-sm leading-5 text-[#c9b69a] transition-colors hover:bg-[#2b1408] hover:text-[#f3dfae] focus-visible:bg-[#2b1408] focus-visible:text-[#f3dfae] focus-visible:outline-none';

  const regionSection = (
    <section className="min-w-0 space-y-2" aria-labelledby={mobile ? 'mobile-region-heading' : 'desktop-region-heading'}>
      <h3 id={mobile ? 'mobile-region-heading' : 'desktop-region-heading'} className="px-3 text-xs font-bold uppercase tracking-[0.2em] text-[#c59a4b]">
        Vùng miền
      </h3>
      <ul className={listClass}>
        {data.regions.map((region) => (
          <li key={region.id}>
            <Link href={regionHref(region.id)} onClick={onNavigate} className={linkClass}>
              {region.name}
            </Link>
          </li>
        ))}
        {!data.regions.length && <li className="px-3 py-2 text-sm text-[#c9b69a]">Chưa có dữ liệu vùng miền đang bán.</li>}
      </ul>
    </section>
  );

  const categorySection = (
    <section className="min-w-0 space-y-2" aria-labelledby={mobile ? 'mobile-category-heading' : 'desktop-category-heading'}>
      <h3 id={mobile ? 'mobile-category-heading' : 'desktop-category-heading'} className="px-3 text-xs font-bold uppercase tracking-[0.2em] text-[#c59a4b]">
        Danh mục
      </h3>
      <ul className={listClass}>
        {data.categories.map((category) => (
          <li key={category.slug}>
            <Link href={categoryHref(category.slug)} onClick={onNavigate} className={linkClass}>
              {category.name}
            </Link>
          </li>
        ))}
        {!data.categories.length && <li className="px-3 py-2 text-sm text-[#c9b69a]">Chưa có danh mục đang bán.</li>}
      </ul>
    </section>
  );

  if (mobile) {
    return (
      <div className="grid grid-cols-1 gap-5 border-t border-[#5c2b12] px-2 py-4 sm:grid-cols-2">
        {regionSection}
        {categorySection}
      </div>
    );
  }

  return (
    <div className="grid min-w-0 grid-cols-2 gap-5 p-4 sm:gap-8 sm:p-6">
      <div className="min-w-0 border-r border-[#5c2b12] pr-4 sm:pr-7">{regionSection}</div>
      <div className="min-w-0">{categorySection}</div>
    </div>
  );
}
