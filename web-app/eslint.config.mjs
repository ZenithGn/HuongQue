import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Thư mục nháp đã được `.gitignore` loại (`.tmp-*/`), nhưng ESLint không đọc .gitignore nên
    // vẫn lint chúng — hai script PayOS dùng `require()` vì thế thành 2 lỗi cứng chặn `npx eslint`.
    ".tmp-*/**",
    // Công cụ sinh bằng chứng của phiên thiết kế (chạy trong trình duyệt, không thuộc bundle).
    ".impeccable/**",
  ]),
]);

export default eslintConfig;
