import { ORDER_STATUS_STYLES, orderStatusLabel } from '@/lib/format';

/**
 * Nhãn trạng thái đơn hàng (tiếng Việt + màu theo trạng thái).
 * Là component thuần (không hook) nên dùng được ở cả Server và Client Component.
 */
export function OrderStatusBadge({
  status,
  className = '',
}: {
  status: string | null | undefined;
  className?: string;
}) {
  const style =
    ORDER_STATUS_STYLES[status ?? ''] ?? 'bg-[#210c04] text-[#c9b69a] border-[#5c2b12]';

  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-semibold ${style} ${className}`}
    >
      {orderStatusLabel(status)}
    </span>
  );
}
