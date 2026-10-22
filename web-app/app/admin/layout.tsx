import Link from 'next/link';
import { requireAdmin } from '@/lib/auth';
import { logoutAction } from '@/lib/actions/auth';
import { AdminSidebarNav } from '@/components/admin/AdminSidebarNav';
import { LogOut, Shield } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // SERVER GUARD BẮT BUỘC:
  // - Chưa đăng nhập  -> /dang-nhap?next=/admin
  // - Không phải admin -> về trang chủ
  // Quyền vẫn được kiểm tra lại trong từng Server Action admin và trong database (RLS/RPC).
  const auth = await requireAdmin('/admin');
  const profile = auth.profile;

  return (
    <div className="min-h-screen bg-[#120401] flex flex-col md:flex-row text-[#f3dfae]">
      <aside className="w-full md:w-64 bg-[#180702] border-r border-[#5c2b12] flex flex-col justify-between shrink-0">
        <div>
          <div className="p-6 border-b border-[#5c2b12]">
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#c59a4b] text-[#120401] flex items-center justify-center font-bold">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif font-black tracking-wider text-[#c59a4b] text-base block">
                  HƯƠNG QUÊ
                </span>
                <span className="text-[10px] text-[#c59a4b] font-mono tracking-widest uppercase">
                  ADMIN PORTAL
                </span>
              </div>
            </Link>
          </div>

          <AdminSidebarNav />
        </div>

        <div className="p-4 border-t border-[#5c2b12] space-y-3">
          <div className="px-3 py-2 rounded-xl bg-[#120401]/70 border border-[#5c2b12] text-xs">
            <p className="text-[#c59a4b] font-semibold truncate">
              {profile?.full_name || auth.user.email}
            </p>
            <p className="text-[10px] text-[#c9b69a]">Quyền: Quản trị viên</p>
          </div>

          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-[#5c2b12] hover:bg-[#2a0707]/80 hover:text-rose-300 text-[#c9b69a] text-xs font-medium transition-colors"
              title="Đăng xuất khỏi trang quản trị"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Đăng xuất</span>
            </button>
          </form>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-[#5c2b12] px-6 sm:px-8 flex items-center justify-between bg-[#180702]/50 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs text-[#c9b69a]">
            <span>Bảng điều khiển</span>
            <span>/</span>
            <span className="text-[#c59a4b] font-medium">Trung tâm Quản trị</span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#34d399]/10 border border-[#34d399]/40 text-[#34d399] text-[11px] font-medium">
            <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
            RLS đang bật
          </span>
        </header>

        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
