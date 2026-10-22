import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, ShoppingBag } from 'lucide-react';

import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { getCartAction } from '@/lib/actions/cart';
import { getCurrentUser } from '@/lib/auth';
import type { CheckoutFormValues } from '@/lib/validations/checkout';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Thanh toán – Hương Quê',
  description: 'Điền thông tin người nhận và chọn phương thức thanh toán cho đơn quà Tết.',
};

interface ThanhToanPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ThanhToanPage({ searchParams }: ThanhToanPageProps) {
  const params = await searchParams;
  const couponFromUrl = typeof params.coupon === 'string' ? params.coupon : '';

  const [auth, cartResult] = await Promise.all([
    getCurrentUser(),
    getCartAction(couponFromUrl || undefined),
  ]);

  const cart = cartResult.ok && cartResult.cart ? cartResult.cart : null;
  const profile = auth?.profile ?? null;
  const hasUnavailable = Boolean(cart?.items.some((item) => !item.available));

  const initialValues: CheckoutFormValues = {
    recipientName: profile?.full_name ?? '',
    recipientPhone: profile?.phone ?? '',
    customerEmail: profile?.email ?? auth?.user.email ?? '',
    province: '',
    shippingAddress: '',
    note: '',
    giftMessage: '',
    couponCode: cart?.coupon?.valid && cart.coupon.code ? cart.coupon.code : couponFromUrl,
    paymentMethod: 'cod',
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-8 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#c59a4b]">
          Bước 2 / 2
        </span>
        <h1 className="font-serif text-3xl font-black text-[#f3dfae] sm:text-4xl">
          Thanh toán đơn quà Tết
        </h1>
        <p className="text-sm text-[#c9b69a]">
          Kiểm tra kỹ tên và số điện thoại người nhận để quà Tết đến đúng tay.
        </p>
      </header>

      {!cart || cart.items.length === 0 ? (
        <div className="rounded-3xl border border-[#5c2b12] bg-[#180702]/60 p-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#c59a4b]/10 text-[#c59a4b]">
            <ShoppingBag className="h-8 w-8" />
          </div>
          <h2 className="mt-4 font-serif text-2xl font-bold text-[#f3dfae]">
            Chưa có sản phẩm để thanh toán
          </h2>
          {/* Bỏ vế "Giỏ hàng của bạn đang trống": thẻ h2 ngay trên đã nói đúng điều đó. Giữ lại
              phần DUY NHẤT thêm thông tin — làm gì tiếp. */}
          <p className="mt-2 text-sm text-[#c9b69a]">
            Hãy chọn vài hộp quà Tết rồi quay lại bước này.
          </p>
          <Link
            href="/san-pham"
            className="mt-6 inline-flex rounded-xl bg-[#c59a4b] px-6 py-3 text-sm font-bold text-[#120401] hover:bg-[#d4af37]"
          >
            Chọn hộp quà Tết
          </Link>
        </div>
      ) : hasUnavailable ? (
        <div className="rounded-3xl border border-[#a33b20]/60 bg-[#2a0707]/40 p-8">
          <p className="flex items-center gap-2 font-serif text-xl font-bold text-[#e08a8a]">
            <AlertTriangle className="h-5 w-5" />
            Chưa thể thanh toán
          </p>
          <p className="mt-2 text-sm text-[#e08a8a]">
            Một số sản phẩm trong giỏ đã hết hàng hoặc vượt tồn kho. Vui lòng điều chỉnh số lượng
            trong giỏ hàng trước khi đặt.
          </p>
          <Link
            href="/gio-hang"
            className="mt-5 inline-flex rounded-xl border border-[#a33b20]/60 px-5 py-2.5 text-sm font-semibold text-[#e08a8a] hover:bg-[#2a0707]/50"
          >
            Quay lại giỏ hàng
          </Link>
        </div>
      ) : (
        <CheckoutForm
          initialValues={initialValues}
          cart={cart}
          isLoggedIn={Boolean(auth)}
        />
      )}
    </div>
  );
}
