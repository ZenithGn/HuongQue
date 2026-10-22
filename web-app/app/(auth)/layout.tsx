'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === '/quen-mat-khau') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#120401] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial from-[#861b1b]/40 via-[#120401] to-[#120401] pointer-events-none" />

      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-[#c59a4b] text-[#120401] font-bold flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 fill-[#120401]" />
          </div>
          <span className="text-2xl font-serif font-black tracking-wider text-[#c59a4b]">
            HƯƠNG QUÊ
          </span>
        </Link>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-[#180702]/90 py-8 px-6 shadow-2xl rounded-3xl border border-[#5c2b12] sm:px-10 backdrop-blur-md">
          {children}
        </div>
      </div>
    </div>
  );
}
