'use client';

import { useState, useTransition } from 'react';
import { Check, Loader2, ShoppingCart } from 'lucide-react';

import { addToCartAction } from '@/lib/actions/cart';
import { useToast } from '@/components/Toaster';

interface AddToCartButtonProps {
  productId: number;
  stock: number;
  className?: string;
  /** Số lượng thêm vào giỏ, mặc định 1 (ProductPurchasePanel có thể truyền stepper riêng). */
  quantity?: number;
  /** Tên sản phẩm – chỉ dùng cho nội dung toast, không bắt buộc. */
  productName?: string;
}

/**
 * Nút "Thêm vào giỏ" dùng chung cho ProductCard / C04.
 * Vô hiệu hoá khi hết hàng, hiện trạng thái đang xử lý, báo lỗi tại chỗ và phát toast
 * qua ToastProvider (app/(shop)/layout.tsx).
 */
export function AddToCartButton({
  productId,
  stock,
  className,
  quantity = 1,
  productName,
}: AddToCartButtonProps) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const { toast } = useToast();

  const outOfStock = stock <= 0;
  const disabled = outOfStock || pending;

  function handleAddToCart() {
    setError(null);
    startTransition(async () => {
      const result = await addToCartAction(productId, quantity);
      if (result.ok) {
        setAdded(true);
        setTimeout(() => setAdded(false), 2500);

        const details: string[] = [];
        if (productName) details.push(productName);
        const itemCount = result.cart?.itemCount;
        if (typeof itemCount === 'number' && itemCount > 0) {
          details.push(`Giỏ hàng hiện có ${itemCount} sản phẩm.`);
        }
        toast({
          tone: 'success',
          title: 'Đã thêm vào giỏ',
          description: details.length > 0 ? details.join(' • ') : undefined,
        });
      } else {
        // Trước đây toast nói CÙNG một thất bại hai lần: tiêu đề "Không thêm được vào giỏ" rồi mô tả
        // "Không thêm được sản phẩm vào giỏ hàng", và không chỗ nào nói làm gì tiếp. Giờ tiêu đề nói
        // thất bại một lần, phần mô tả giữ LÝ DO (nếu server có) hoặc LỜI KHUYÊN, và dòng lỗi tại chỗ
        // là câu đầy đủ vì nó đứng một mình.
        const reason = result.error ?? 'Bạn thử lại giúp nhé. Nếu vẫn không được, tải lại trang.';
        setError(`Không thêm được vào giỏ hàng. ${reason}`);
        toast({
          tone: 'error',
          title: 'Không thêm được vào giỏ hàng',
          description: productName ? `${productName} • ${reason}` : reason,
        });
      }
    });
  }

  // Trạng thái chờ giữ nguyên độ tương phản của nút (không hạ opacity): chữ "Đang thêm…"
  // cộng vòng xoay đã đủ báo trạng thái, còn hạ opacity sẽ kéo màu chữ xuống dưới ngưỡng AA.
  // `min-h-11` (44px) là sàn vùng chạm: đây là nút chốt đơn, không được thấp hơn ngón tay.
  const baseClassName =
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all disabled:cursor-not-allowed';

  const stateClassName = outOfStock
    ? 'border border-[#5c2b12] bg-[#210c04] text-[#c9b69a]'
    : 'bg-gradient-to-r from-[#b8863b] via-[#d4af37] to-[#b8863b] text-[#120401] hover:brightness-110 hover:shadow-[0_0_20px_rgba(212,175,55,0.5)]';

  return (
    <div className="flex flex-col gap-1.5">
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={disabled}
        aria-busy={pending}
        className={className ?? `${baseClassName} ${stateClassName}`}
      >
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Đang thêm…
          </>
        ) : outOfStock ? (
          <>
            <ShoppingCart className="h-4 w-4" />
            Tạm hết hàng
          </>
        ) : added ? (
          <>
            <Check className="h-4 w-4" />
            Đã thêm vào giỏ
          </>
        ) : (
          <>
            <ShoppingCart className="h-4 w-4" />
            Thêm vào giỏ
          </>
        )}
      </button>

      {error && (
        <p role="alert" className="text-xs text-[#e08a8a]">
          {error}
        </p>
      )}
    </div>
  );
}
