'use client';

/**
 * C14 — Modal đánh giá sản phẩm (1–5 sao + nhận xét ≤ 500 ký tự).
 *
 * Gửi qua Server Action `submitReviewAction` -> RPC `submit_review(p_product_id, p_rating, p_comment)`.
 * Nếu server báo đã đánh giá thì khóa form và hiển thị "Bạn đã đánh giá sản phẩm này".
 */

import { useActionState, useState } from 'react';
import { Star, X, CheckCircle2, Loader2, Send } from 'lucide-react';
import { submitReviewAction, type ReviewActionState } from '@/lib/actions/reviews';

const MAX_COMMENT_LENGTH = 500;

interface ReviewModalProps {
  productId: number;
  productName: string;
  /** Dùng để revalidate cache trang chi tiết đơn (không phải dữ liệu nghiệp vụ). */
  orderCode?: string;
  /** Biết trước từ dữ liệu đơn hàng (nếu RPC trả về danh sách đánh giá). */
  alreadyReviewed?: boolean;
}

export function ReviewModal({
  productId,
  productName,
  orderCode,
  alreadyReviewed = false,
}: ReviewModalProps) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState('');

  const [state, formAction, isPending] = useActionState<ReviewActionState | null, FormData>(
    submitReviewAction,
    null
  );

  const succeeded = state?.status === 'success';
  const locked = alreadyReviewed || succeeded || state?.alreadyReviewed === true;
  const activeStars = hovered || rating;

  function closeModal() {
    setOpen(false);
    setHovered(0);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        disabled={alreadyReviewed}
        className="inline-flex items-center gap-1.5 rounded-lg border border-[#c59a4b]/40 bg-[#c59a4b]/10 px-3 py-1.5 text-xs font-semibold text-[#c59a4b] transition-colors hover:bg-[#c59a4b] hover:text-[#120401] disabled:cursor-not-allowed disabled:border-[#5c2b12] disabled:bg-[#210c04] disabled:text-[#a98a5f]"
      >
        {alreadyReviewed ? (
          <>
            <CheckCircle2 className="h-3.5 w-3.5" />
            Đã đánh giá
          </>
        ) : (
          <>
            <Star className="h-3.5 w-3.5" />
            Đánh giá
          </>
        )}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-[#120401]/80 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={closeModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Đánh giá ${productName}`}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[92vh] w-full overflow-y-auto rounded-t-3xl border border-[#5c2b12] bg-[#180702] p-5 shadow-2xl sm:max-w-lg sm:rounded-2xl sm:p-6"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#5c2b12] pb-4">
              <div>
                <h2 className="font-serif text-lg font-bold text-[#f3dfae]">Đánh giá sản phẩm</h2>
                <p className="mt-0.5 line-clamp-2 text-xs text-[#c9b69a]">{productName}</p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Đóng"
                className="rounded-lg p-1.5 text-[#c9b69a] transition-colors hover:bg-[#210c04] hover:text-[#f3dfae]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {locked ? (
              <div className="space-y-4 pt-5">
                <p className="flex items-center gap-2 rounded-xl border border-[#34d399]/40 bg-[#34d399]/10 px-3 py-3 text-sm text-[#34d399]">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  {state?.alreadyReviewed || alreadyReviewed
                    ? 'Bạn đã đánh giá sản phẩm này.'
                    : state?.message ?? 'Cảm ơn bạn đã đánh giá sản phẩm!'}
                </p>
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full rounded-xl bg-[#210c04] px-4 py-2.5 text-sm font-semibold text-[#f3dfae] transition-colors hover:bg-[#381a0b]"
                >
                  Đóng
                </button>
              </div>
            ) : (
              <form action={formAction} className="space-y-5 pt-5">
                <input type="hidden" name="productId" value={productId} />
                <input type="hidden" name="rating" value={rating} />
                {orderCode ? <input type="hidden" name="orderCode" value={orderCode} /> : null}

                <div className="space-y-2">
                  <span className="block text-xs font-semibold uppercase tracking-wide text-[#c9b69a]">
                    Chất lượng sản phẩm
                  </span>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHovered(star)}
                        onMouseLeave={() => setHovered(0)}
                        aria-label={`${star} sao`}
                        aria-pressed={rating === star}
                        className="rounded-lg p-1 transition-transform hover:scale-110"
                      >
                        <Star
                          className={`h-7 w-7 ${
                            star <= activeStars
                              ? 'fill-[#c59a4b] text-[#c59a4b]'
                              : 'text-[#a98a5f]'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-1 text-xs text-[#c9b69a]">
                      {rating > 0 ? `${rating}/5 sao` : 'Chọn số sao'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor={`review-comment-${productId}`}
                    className="block text-xs font-semibold uppercase tracking-wide text-[#c9b69a]"
                  >
                    Nhận xét của bạn
                  </label>
                  <textarea
                    id={`review-comment-${productId}`}
                    name="comment"
                    rows={4}
                    maxLength={MAX_COMMENT_LENGTH}
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    placeholder="Chia sẻ cảm nhận về hương vị, đóng gói, dịch vụ giao hàng…"
                    className="w-full resize-none rounded-xl border border-[#5c2b12] bg-[#120401] px-3 py-2.5 text-sm text-[#f3dfae] placeholder:text-[#a98a5f] focus:border-[#c59a4b]/60 focus:outline-none"
                  />
                  <p className="text-right text-[11px] text-[#a98a5f]">
                    {comment.length}/{MAX_COMMENT_LENGTH} ký tự
                  </p>
                </div>

                {state?.status === 'error' && state.message && (
                  <p className="rounded-xl border border-[#a33b20]/60 bg-[#2a0707]/40 px-3 py-2.5 text-xs text-[#e08a8a]">
                    {state.message}
                  </p>
                )}

                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-xl px-4 py-2.5 text-sm font-medium text-[#c9b69a] transition-colors hover:bg-[#210c04]"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={isPending || rating === 0}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#c59a4b] px-4 py-2.5 text-sm font-semibold text-[#120401] transition-all hover:bg-[#d4af37] disabled:cursor-not-allowed disabled:bg-[#381a0b] disabled:text-[#c9b69a]"
                  >
                    {isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    Gửi đánh giá
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
