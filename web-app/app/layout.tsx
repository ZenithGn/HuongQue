import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['vietnamese', 'latin'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['vietnamese', 'latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Hương Quê – Quà Tết & Đặc Sản Ba Miền Tinh Hoa',
  description: 'Nền tảng quà Tết cao cấp: Hộp quà An Khang, Phúc Lộc, Thịnh Vượng, đặc sản OCOP chính gốc 3 miền Bắc - Trung - Nam sum vầy ngày xuân.',
};

/**
 * `viewportFit: 'cover'` là điều kiện để `env(safe-area-inset-*)` trả về số thật trên máy có
 * notch/góc bo; thiếu nó thì mọi khai báo safe area ở `globals.css` đều bằng 0.
 * Không đặt `maximumScale`/`userScalable: false`: chặn zoom là lỗi tiếp cận.
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#120401',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`dark ${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body
        className="min-h-screen bg-[#120401] text-[#f3dfae] antialiased selection:bg-[#c59a4b] selection:text-[#120401] flex flex-col font-sans"
        suppressHydrationWarning
      >
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
