'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { AlertTriangle, CheckCircle2, X } from 'lucide-react';

/** Tone của toast – quyết định màu viền/icon (emerald = thành công, amber = lỗi/cảnh báo). */
export type ToastTone = 'success' | 'error';

export interface ToastOptions {
  title: string;
  /** Dòng phụ (tên sản phẩm, số lượng trong giỏ, thông báo lỗi…). */
  description?: string;
  tone?: ToastTone;
}

interface ToastItem {
  id: number;
  title: string;
  description?: string;
  tone: ToastTone;
  /** Đang chạy animation trượt ra trước khi bị xoá khỏi DOM. */
  closing: boolean;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

/** Thời gian mỗi toast tự ẩn. */
const TOAST_DURATION_MS = 3500;
/** Thời gian animation trượt ra (khớp duration-200 của card). */
const TOAST_EXIT_MS = 250;

const NOOP_CONTEXT: ToastContextValue = { toast: () => {} };

/**
 * Hook phát toast. Trả về hàm no-op khi component nằm ngoài ToastProvider
 * (ví dụ dùng lại AddToCartButton ở nơi chưa mount provider) để không crash UI.
 */
export function useToast(): ToastContextValue {
  return useContext(ToastContext) ?? NOOP_CONTEXT;
}

/**
 * ToastProvider – mount một lần trong app/(shop)/layout.tsx.
 * Không dùng thư viện ngoài: animation trượt vào/ra bằng Tailwind transition + state.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextIdRef = useRef(0);
  // Mỗi id giữ tối đa 1 timer đang chờ (auto-ẩn hoặc timer xoá sau khi trượt ra).
  const timersRef = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  const dismiss = useCallback((id: number) => {
    const pending = timersRef.current.get(id);
    if (pending) {
      clearTimeout(pending);
      timersRef.current.delete(id);
    }

    // Bật cờ closing -> card chạy transition trượt ra, sau đó mới xoá khỏi DOM.
    setToasts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, closing: true } : item))
    );

    const exitTimer = setTimeout(() => {
      timersRef.current.delete(id);
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, TOAST_EXIT_MS);

    timersRef.current.set(id, exitTimer);
  }, []);

  const toast = useCallback(
    ({ title, description, tone = 'success' }: ToastOptions) => {
      const id = nextIdRef.current + 1;
      nextIdRef.current = id;

      setToasts((prev) => [...prev, { id, title, description, tone, closing: false }]);

      const autoHideTimer = setTimeout(() => dismiss(id), TOAST_DURATION_MS);
      timersRef.current.set(id, autoHideTimer);
    },
    [dismiss]
  );

  // Dọn timer khi provider unmount.
  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      timers.clear();
    };
  }, []);

  const value = useMemo<ToastContextValue>(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed top-20 right-4 z-[60] space-y-2 w-[min(20rem,calc(100vw-2rem))]"
      >
        {toasts.map((item) => (
          <ToastCard key={item.id} item={item} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/**
 * Tông màu chỉ mã hoá **trạng thái** (không dùng trang trí). Lục bảo cho thành công, Đỏ Son cho
 * lỗi — cả hai đều nằm trong lớp ngữ nghĩa đã ghi ở DESIGN.md, không mở bảng màu thứ ba.
 */
const TONE_STYLES: Record<
  ToastTone,
  { Icon: typeof CheckCircle2; border: string; icon: string; hairline: string }
> = {
  success: {
    Icon: CheckCircle2,
    border: 'border-[#34d399]/40',
    icon: 'text-[#34d399]',
    hairline: 'bg-[#34d399]/60',
  },
  error: {
    Icon: AlertTriangle,
    border: 'border-[#a33b20]',
    icon: 'text-[#e08a8a]',
    hairline: 'bg-[#a33b20]',
  },
};

function ToastCard({
  item,
  onDismiss,
}: {
  item: ToastItem;
  onDismiss: (id: number) => void;
}) {
  // Bắt đầu ở trạng thái "trượt ra ngoài" rồi bật sang trạng thái hiển thị ở frame kế tiếp
  // để transition của Tailwind chạy.
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const visible = entered && !item.closing;
  const tone = TONE_STYLES[item.tone];
  const Icon = tone.Icon;

  return (
    <div
      className={`pointer-events-auto relative flex items-start gap-3 overflow-hidden rounded-xl border ${tone.border} bg-[#180702]/95 p-3 pl-4 shadow-xl shadow-black/50 backdrop-blur transition-all duration-200 ease-out ${
        visible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
      }`}
    >
      {/* vệt sáng 1px ở đỉnh thay cho thanh màu dày ở cạnh trái (bị cấm) */}
      <span
        className={`absolute inset-x-[15%] top-0 h-px ${tone.hairline}`}
        aria-hidden="true"
      />

      <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${tone.icon}`} aria-hidden="true" />

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold leading-snug text-[#f3dfae]">{item.title}</p>
        {item.description && (
          <p className="mt-0.5 text-xs leading-relaxed text-[#c9b69a] line-clamp-2">
            {item.description}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => onDismiss(item.id)}
        aria-label="Đóng thông báo"
        className="shrink-0 rounded-xl p-1 text-[#c9b69a] transition-colors hover:bg-[#210c04] hover:text-[#f3dfae]"
      >
        <X className="h-3.5 w-3.5" aria-hidden />
      </button>
    </div>
  );
}
