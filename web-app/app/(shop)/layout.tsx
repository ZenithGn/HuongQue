import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ToastProvider } from '@/components/Toaster';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = (await headers()).get('x-current-path') || '';
  return (
    <ToastProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer wide={pathname === '/'} />
    </ToastProvider>
  );
}
