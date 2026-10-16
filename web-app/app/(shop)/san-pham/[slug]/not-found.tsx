import Link from 'next/link';
import { PackageX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto py-24 px-4 text-center space-y-6">
      <div className="w-20 h-20 mx-auto rounded-full bg-[#2a0707]/80 border border-[#a33b20] text-[#c59a4b] flex items-center justify-center shadow-lg">
        <PackageX className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-serif font-black text-[#f3dfae]">
          Không Tìm Thấy Sản Phẩm
        </h1>
        <p className="text-sm text-[#c9b69a]">
          Sản phẩm bạn đang tìm kiếm hiện không tồn tại hoặc đã tạm ngừng kinh doanh trong mùa Tết này.
        </p>
      </div>

      <div className="pt-4 flex items-center justify-center gap-4">
        <Link
          href="/san-pham"
          className="px-6 py-3 rounded-xl bg-[#c59a4b] text-[#120401] font-bold text-xs uppercase tracking-wider hover:bg-[#d4af37] transition-colors"
        >
          Khám phá sản phẩm khác
        </Link>
        <Link
          href="/"
          className="px-6 py-3 rounded-xl border border-[#5c2b12] text-[#c9b69a] font-semibold text-xs hover:bg-[#180702] transition-colors"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
