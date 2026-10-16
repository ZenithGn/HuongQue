'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

interface SearchBoxProps {
  /** Cho phép tuỳ biến khung ngoài (navbar dùng mặc định). */
  className?: string;
}

/**
 * Ô tìm kiếm trên navbar: bấm icon để mở (slide width 0 → 16rem kèm opacity),
 * nhập từ khóa rồi Enter (hoặc bấm nút) sẽ điều hướng sang `/san-pham?q=<từ khóa>`
 * — trang `/san-pham` lọc theo `q` qua `searchProducts()` trong `lib/products.ts`.
 *
 * Ô nhập tự focus khi mở, đóng khi bấm Esc hoặc click ra ngoài vùng search.
 */
export function SearchBox({ className = '' }: SearchBoxProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Tự focus vào ô nhập ngay khi mở.
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  // Đóng khi bấm Esc hoặc click ra ngoài vùng search.
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    function handlePointerDown(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handlePointerDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [open]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = keyword.trim();
    if (!query) {
      inputRef.current?.focus();
      return;
    }

    setOpen(false);
    router.push(`/san-pham?q=${encodeURIComponent(query)}`);
  }

  return (
    <div ref={containerRef} className={`flex items-center ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? 'Đóng ô tìm kiếm' : 'Tìm kiếm đặc sản quà Tết'}
        aria-expanded={open}
        title="Tìm kiếm đặc sản quà Tết"
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#c9b69a] transition-colors hover:bg-[#210c04] hover:text-[#f3dfae]"
      >
        <Search className="h-5 w-5" aria-hidden />
      </button>

      <form
        role="search"
        onSubmit={handleSubmit}
        className={`relative flex items-center overflow-hidden transition-all duration-300 ease-out ${
          open ? 'w-40 sm:w-64 opacity-100 ml-1' : 'w-0 opacity-0 ml-0 pointer-events-none'
        }`}
      >
        <input
          ref={inputRef}
          type="search"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          tabIndex={open ? 0 : -1}
          maxLength={100}
          placeholder="Tìm quà Tết, đặc sản…"
          aria-label="Từ khóa tìm kiếm sản phẩm"
          className="min-h-11 w-full min-w-0 rounded-full border border-[#5c2b12] bg-[#120401] px-3.5 py-2 pr-12 text-xs text-[#f3dfae] caret-[#d4af37] transition-colors placeholder:text-[#a98a5f] focus:border-[#c59a4b] focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Tìm kiếm"
          title="Tìm kiếm"
          className="absolute right-0.5 inline-flex h-11 w-11 items-center justify-center rounded-full text-[#c59a4b] transition-colors hover:bg-[#210c04] hover:text-[#f3dfae]"
        >
          <Search className="w-4 h-4" aria-hidden />
        </button>
      </form>
    </div>
  );
}
