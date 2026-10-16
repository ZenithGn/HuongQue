'use client';

import { useActionState } from 'react';
import { ActionResult, IDLE_RESULT } from '@/lib/actions/admin/result';

type ServerAction = (prev: ActionResult, formData: FormData) => Promise<ActionResult>;

/**
 * Form nhỏ cho các thao tác trên một dòng (đổi trạng thái, xóa, sắp xếp).
 * Dùng chung để mỗi form có state thông báo riêng và luôn hiện lỗi tiếng Việt
 * (ví dụ lỗi khóa ngoại khi xóa danh mục còn sản phẩm).
 */
export function ActionForm({
  action,
  hidden = {},
  children,
  className,
  confirmText,
  tone = 'ghost',
  messageClassName,
}: {
  action: ServerAction;
  hidden?: Record<string, string | number | boolean>;
  children: React.ReactNode;
  className?: string;
  /** Nếu có, hỏi xác nhận trước khi gửi. */
  confirmText?: string;
  tone?: 'ghost' | 'danger';
  messageClassName?: string;
}) {
  const [state, formAction] = useActionState(action, IDLE_RESULT);

  const buttonTone =
    tone === 'danger'
      ? 'border border-[#a33b20] bg-[#2a0707]/70 text-rose-200 hover:bg-[#2a0707]'
      : 'border border-[#5c2b12] text-[#c9b69a] hover:bg-[#210c04]';

  return (
    <form
      action={formAction}
      className={className}
      onSubmit={
        confirmText
          ? (event) => {
              if (!window.confirm(confirmText)) event.preventDefault();
            }
          : undefined
      }
    >
      {Object.entries(hidden).map(([key, value]) => (
        <input key={key} type="hidden" name={key} value={String(value)} />
      ))}
      <div className={className === 'inline' ? 'inline-flex' : undefined}>
        <button type="submit" className={`rounded-lg px-3 py-1.5 text-[11px] font-medium ${buttonTone}`}>
          {children}
        </button>
      </div>
      {state.message ? (
        <p
          className={
            messageClassName ??
            `mt-1 text-[11px] ${state.ok ? 'text-[#34d399]' : 'text-rose-400'}`
          }
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
