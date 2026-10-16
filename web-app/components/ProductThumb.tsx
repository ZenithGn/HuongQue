'use client';

import { useEffect, useRef, useState } from 'react';

interface ProductThumbProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  /** Nhãn hiện ở ô dự phòng khi ảnh lỗi hoặc chưa có ảnh. */
  fallbackLabel?: string;
}

/**
 * Ảnh sản phẩm có phương án dự phòng.
 *
 * Vì sao cần: PRODUCT.md ghi rõ **chưa có ảnh chụp sản phẩm thật** — mọi ảnh hiện tại là ảnh
 * Unsplash dùng tạm, và thực tế đã có ít nhất một URL trả 404 (`photo-1607344645866…` của
 * "Hộp quà Tết Tinh Hoa Bắc Bộ"). Ảnh hỏng cho ra một ô đen rỗng, đọc như lỗi kỹ thuật.
 *
 * Ô dự phòng vẽ bằng chính vật liệu Sơn Mài và **nói thẳng** rằng ảnh đang cập nhật, thay vì
 * giả vờ có ảnh.
 */
export function ProductThumb({ src, alt, className = '', fallbackLabel }: ProductThumbProps) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Ảnh 404 có thể lỗi **trước khi React hydrate**, lúc đó `onError` chưa được gắn và sự kiện
  // error trôi mất — ô đen nằm lại vĩnh viễn. Vì vậy kiểm tra thêm một lần lúc mount.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setFailed(true);
    }
  }, [src]);

  if (!src || failed) {
    return (
      <span
        role="img"
        aria-label={`${alt} — ảnh đang cập nhật`}
        className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#3a1c0b] via-[#180702] to-[#2b1005] ${className}`}
      >
        <span
          aria-hidden
          className="font-serif text-2xl leading-none text-[#c59a4b]/70"
        >
          HƯƠNG QUÊ
        </span>
        {fallbackLabel ? (
          <span className="px-3 text-center text-xs leading-snug text-[#c9b69a]">
            {fallbackLabel}
          </span>
        ) : null}
        <span className="text-xs text-[#c9b69a]">Ảnh đang cập nhật</span>
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- ảnh placeholder Unsplash, next.config chưa khai báo remotePatterns
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
