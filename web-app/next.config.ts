import type { NextConfig } from 'next';

/**
 * Security headers theo Giai đoạn 9 của tài liệu triển khai.
 * Lưu ý: CSP nghiêm ngặt KHÔNG nằm trong MVP (cần biết đủ nguồn script: GA,
 * Supabase, widget chat) — sẽ thêm sau khi staging ổn định.
 */
const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
];

const nextConfig: NextConfig = {
  // Huy hiệu dev của Next nằm ở góc dưới-trái và che mất nội dung thật trong ảnh chụp kiểm tra.
  // Tắt nó để ảnh dùng làm bằng chứng không lẫn chrome của môi trường phát triển.
  devIndicators: false,
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
