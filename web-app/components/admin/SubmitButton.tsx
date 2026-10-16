'use client';

import { useFormStatus } from 'react-dom';

/** Nút submit hiển thị trạng thái đang xử lý của form Server Action. */
export function SubmitButton({
  children,
  pendingLabel = 'Đang lưu…',
  className = '',
  variant = 'primary',
  name,
  value,
}: {
  children: React.ReactNode;
  pendingLabel?: string;
  className?: string;
  variant?: 'primary' | 'ghost' | 'danger';
  /** Cho phép nhiều nút trong cùng form: mỗi nút gửi `name=value` khác nhau. */
  name?: string;
  value?: string;
}) {
  const { pending } = useFormStatus();

  const variants: Record<string, string> = {
    primary:
      'bg-[#c59a4b] text-[#120401] hover:bg-[#d4af37] font-bold disabled:bg-[#c59a4b]/50',
    ghost:
      'bg-[#210c04] text-[#f3dfae] hover:bg-[#381a0b] border border-[#5c2b12] font-medium disabled:opacity-50',
    danger:
      'bg-[#2a0707] text-rose-200 hover:bg-[#2a0707] border border-[#a33b20] font-medium disabled:opacity-50',
  };

  return (
    <button
      type="submit"
      name={name}
      value={value}
      disabled={pending}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs transition-colors disabled:cursor-wait ${variants[variant]} ${className}`}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
