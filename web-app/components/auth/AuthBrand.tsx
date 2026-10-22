import Link from 'next/link';

export default function AuthBrand() {
  return (
    <Link
      href="/"
      aria-label="Hương Quê – về trang chủ"
      className="mx-auto mb-5 inline-flex items-center gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#861b1b] focus-visible:ring-offset-4"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#b8863b]/60 bg-[#861b1b] text-[#fff2d3] shadow-[0_5px_12px_rgba(93,25,14,0.18)]">
        <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          <path
            d="M12 3c-1.5 3-4 4.5-7 4.5 3 3 4.5 5.5 4.5 8.5 3-1.5 5.5-1.5 8.5 0 0-3 1.5-5.5 4.5-8.5-3 0-5.5-1.5-7-4.5z"
            fill="currentColor"
            fillOpacity=".22"
          />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      </span>
      <span className="text-left">
        <span className="block font-serif text-xl font-bold tracking-wide text-[#4a2418]">HƯƠNG QUÊ</span>
        <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#76502f]">
          Tinh Hoa Quà Tết Ba Miền
        </span>
      </span>
    </Link>
  );
}
