'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';

interface SearchBoxProps {
  /** Cho phép tuỳ biến khung ngoài (navbar dùng mặc định). */
  className?: string;
}

/** Khung panel đo từ đáy header: `left`/`right` lấy đúng padding ngang của header. */
interface Anchor {
  top: number;
  left: number;
  right: number;
}

const FALLBACK_HEADER_HEIGHT = 64;

/**
 * Ô tìm kiếm trên navbar.
 *
 * Vì sao KHÔNG mở rộng tại chỗ: bản trước tăng `width: 0 → 16rem` ngay trong hàng header.
 * Ở 1024–1440px hàng đó đã kín chỗ, nên 256px mới làm cả hàng flex phải xuống dòng: header
 * cao 65px → 99px, nav bị đẩy lệch phải và icon kính lúp rơi xuống hàng dưới nằm tận mép trái
 * (đo được: toggle x=112, input x=160, y=50). Navbar "rối" đúng như ảnh người dùng gửi.
 *
 * Cách sửa: panel tìm kiếm được PORTAL ra `body` và định vị `fixed` ngay dưới header, phủ lên
 * nội dung trang. Nó không chiếm chỗ trong hàng header nên navbar đứng yên tuyệt đối, và cũng
 * không phụ thuộc `absolute` (header có `backdrop-blur-md` — `backdrop-filter` khác `none` biến
 * header thành containing block, khiến toạ độ `absolute` giải sai như đã ghi ở MobileNav).
 *
 * Đóng khi: bấm Esc, bấm ra ngoài, bấm nút X, hoặc submit xong.
 */
export function SearchBox({ className = '' }: SearchBoxProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  // Khung panel đo từ đáy header; `null` = chưa đo, dùng giá trị mặc định của header.
  const [anchor, setAnchor] = useState<Anchor | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelId = useId();

  const closeSearch = useCallback(() => setOpen(false), []);

  /**
   * Đo đáy header + lề ngang để panel thẳng hàng với navbar, ở mọi bề rộng màn hình.
   * Đây là một effect "đồng bộ với hệ thống ngoài": đo DOM thật rồi ghi kết quả vào state.
   */
  useEffect(() => {
    // Panel đã unmount khi `open` = false nên không cần reset `anchor` (tránh setState vô ích).
    if (!open) return;

    function measure() {
      const header = containerRef.current?.closest('header');
      if (!header) {
        setAnchor({ top: FALLBACK_HEADER_HEIGHT, left: 0, right: 0 });
        return;
      }
      const rect = header.getBoundingClientRect();
      const styles = getComputedStyle(header);
      // Header đang sticky: khi cuộn, đáy của nó có thể nằm trên mép màn hình.
      setAnchor({
        top: Math.max(rect.bottom, 0),
        left: parseFloat(styles.paddingLeft) || 0,
        right: parseFloat(styles.paddingRight) || 0,
      });
    }

    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, { passive: true });
    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure);
    };
  }, [open]);

  // Tự focus vào ô nhập khi panel mở. Đây là việc "điều khiển hệ thống ngoài" — focus của
  // trình duyệt — nên hợp lệ trong effect; KHÔNG setState ở đây để tránh render dây chuyền.
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
  }, [open]);

  // Đóng khi bấm Esc hoặc click ra ngoài vùng search (nút mở nằm trong containerRef nên
  // click vào chính nó do nhánh onClick xử lý, không bị coi là "ngoài").
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }

    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (containerRef.current?.contains(target)) return;
      if (panelRef.current?.contains(target)) return;
      setOpen(false);
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handlePointerDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handlePointerDown);
    };
  }, [open]);

  function handleToggle() {
    if (open) {
      setOpen(false);
      return;
    }
    // Mở lại thì hiện lại từ khóa đang lọc trên URL (trang /san-pham đọc `q`),
    // hoặc từ khóa của lần tìm trước trong cùng phiên.
    setKeyword((prev) => prev || searchParams.get('q') || '');
    setOpen(true);
  }

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

  const searchForm = (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-4 sm:px-6 lg:px-8"
    >
      <Search className="h-4 w-4 shrink-0 text-[#c59a4b]" aria-hidden />

      <input
        ref={inputRef}
        type="search"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        maxLength={100}
        placeholder="Tìm quà Tết, đặc sản…"
        aria-label="Từ khóa tìm kiếm sản phẩm"
        className="min-h-11 w-full min-w-0 rounded-xl border border-[#5c2b12] bg-[#120401] px-3.5 py-2 text-sm text-[#f3dfae] caret-[#d4af37] transition-colors placeholder:text-[#a98a5f] focus:border-[#c59a4b] focus:outline-none"
      />

      <button
        type="submit"
        className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#b8863b] to-[#d4af37] px-3.5 text-xs font-semibold tracking-wide text-[#120401] shadow transition-all hover:brightness-110"
      >
        <Search className="h-3.5 w-3.5" aria-hidden />
        <span className="hidden sm:inline">Tìm kiếm</span>
      </button>

      <button
        type="button"
        onClick={closeSearch}
        aria-label="Đóng ô tìm kiếm"
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[#c9b69a] transition-colors hover:bg-[#210c04] hover:text-[#f3dfae]"
      >
        <X className="h-4 w-4" aria-hidden />
      </button>
    </form>
  );

  return (
    <div ref={containerRef} className={`flex items-center ${className}`}>
      <button
        ref={toggleRef}
        type="button"
        onClick={handleToggle}
        aria-label={open ? 'Đóng ô tìm kiếm' : 'Tìm kiếm đặc sản quà Tết'}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        title="Tìm kiếm đặc sản quà Tết"
        className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors ${open
            ? 'bg-[#2b1408] text-[#f3dfae]'
            : 'text-[#c9b69a] hover:bg-[#210c04] hover:text-[#f3dfae]'
          }`}
      >
        <Search className="h-5 w-5" aria-hidden />
      </button>

      {typeof document !== 'undefined' && open
        ? createPortal(
          <>
            {/*
              Vùng bấm-để-đóng: phủ toàn trang nhưng CHỪA lại đúng dải header, nhờ vậy navbar
              (logo, nav, giỏ hàng, tài khoản) vẫn bấm được trong lúc ô tìm kiếm đang mở.
            */}
            <div
              aria-hidden
              onClick={closeSearch}
              className="fixed inset-x-0 bottom-0 z-40 cursor-default bg-[#120401]/70 backdrop-blur-[2px]"
              style={{ top: anchor?.top ?? FALLBACK_HEADER_HEIGHT }}
            />

            <div
              ref={panelRef}
              id={panelId}
              role="dialog"
              aria-label="Tìm kiếm sản phẩm"
              style={{
                // `anchor` đo được ngay trong effect đầu tiên; trước đó dùng đáy header mặc định
                // — KHÔNG ẩn panel, vì phần tử `visibility: hidden` không nhận được focus.
                top: anchor?.top ?? FALLBACK_HEADER_HEIGHT,
                left: anchor?.left ?? 0,
                right: anchor?.right ?? 0,
              }}
              className="fixed z-50 border-b border-[#5c2b12] bg-[#180702]/98 shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
            >
              {searchForm}
            </div>
          </>,
          document.body
        )
        : null}
    </div>
  );
}
