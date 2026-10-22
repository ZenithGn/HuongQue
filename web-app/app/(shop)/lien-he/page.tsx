import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Building2, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { DELIVERY_WINDOWS, TET_2027, formatCutoffDate } from '@/lib/tet';

export const metadata: Metadata = {
  title: 'Liên hệ Hương Quê | Quà Tết & đặc sản ba miền',
  description:
    'Hotline, email và địa bàn phục vụ của Hương Quê. Nhận đặt quà doanh nghiệp số lượng lớn qua hotline.',
};

/**
 * Trang liên hệ.
 *
 * Vì sao trang này tồn tại: footer và trang câu chuyện đã trỏ tới `/lien-he` từ trước, nhưng route
 * chưa từng được dựng — nên cả hai chỗ đó đều 404. Nội dung ở đây chỉ nói những gì PRODUCT.md đã
 * xác nhận, và **dán nhãn rõ** phần là dữ liệu mẫu; không bịa địa chỉ, không bịa thời gian phản hồi.
 */
export default function LienHePage() {
  const lienTinh = DELIVERY_WINDOWS[0];
  const noiThanh = DELIVERY_WINDOWS[1];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="border-b border-[#5c2b12] pb-6">
        {/* Kem, không phải lá mạ — The Brass-Is-Structure Rule: h1 là kem, chỉ h2 mới lá mạ. */}
        <h1 className="font-serif text-3xl font-bold text-[#f3dfae] sm:text-4xl">
          Liên hệ Hương Quê
        </h1>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-[#c9b69a]">
          Cần hỏi trước khi đặt, cần đặt số lượng lớn, hay cần hỗ trợ một đơn đang giao — dùng một
          trong các đường dưới đây.
        </p>
      </header>

      {/* Nhịp dọc theo ƯU TIÊN, không phải cho khác đi: câu trả lời (các đường liên hệ) bám sát
          lời dẫn; việc phụ (đặt doanh nghiệp, hạn chốt) ở khoảng giữa; và điều hướng sang trang
          khác — thứ không phải câu trả lời — được thở nhiều nhất. Trước đây cả bốn khoảng đều
          đúng 40px, nên bốn khối mang bốn mức ưu tiên khác nhau trông nặng như nhau. */}
      <section aria-labelledby="duong-lien-he" className="mt-8">
        <h2 id="duong-lien-he" className="font-serif text-2xl font-bold text-[#c59a4b]">
          Đường liên hệ
        </h2>

        <dl className="mt-6 divide-y divide-[#381a0b] border-y border-[#381a0b]">
          <div className="flex gap-4 py-4">
            <Phone aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-[#c59a4b]" />
            <div className="min-w-0">
              <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[#c9b69a]">
                Hotline
              </dt>
              <dd className="mt-1">
                {/* `tap-target` chỉ có tác dụng khi phần tử là flex/grid — `min-height` không
                    tác động lên `display: inline`. Số điện thoại là hành động số một của trang
                    này, mà trên điện thoại nó chỉ cao 24px nếu thiếu hai lớp này. */}
                <a
                  href="tel:0901000000"
                  className="tap-target inline-flex items-center font-serif text-lg font-bold text-[#f3dfae] transition-colors hover:text-[#d4af37]"
                >
                  0901 000 000
                </a>
                <span className="mt-1 block text-sm leading-relaxed text-[#c9b69a]">
                  Nhanh nhất cho việc đặt quà doanh nghiệp và cho đơn đang giao.
                </span>
              </dd>
            </div>
          </div>

          <div className="flex gap-4 py-4">
            <Mail aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-[#c59a4b]" />
            <div className="min-w-0">
              <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[#c9b69a]">Email</dt>
              <dd className="mt-1">
                <a
                  href="mailto:lienhe@huongque.vn"
                  className="tap-target inline-flex items-center font-serif text-lg font-bold text-[#f3dfae] transition-colors hover:text-[#d4af37]"
                >
                  lienhe@huongque.vn
                </a>
                <span className="mt-1 block text-sm leading-relaxed text-[#c9b69a]">
                  Gửi kèm mã đơn nếu bạn đang hỏi về một đơn cụ thể.
                </span>
              </dd>
            </div>
          </div>

          <div className="flex gap-4 py-4">
            <MapPin aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-[#c59a4b]" />
            <div className="min-w-0">
              <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[#c9b69a]">
                Địa bàn phục vụ
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-[#f3dfae]">
                Hà Nội · Đà Nẵng · TP. Hồ Chí Minh, và giao tỉnh qua đối tác vận chuyển.
                <span className="mt-1 block text-[#c9b69a]">
                  Hương Quê chưa công bố địa chỉ cửa hàng.
                </span>
              </dd>
            </div>
          </div>
        </dl>

        {/* Cùng cách nói với chân trang: nói thẳng cái gì là dữ liệu mẫu. */}
        <p className="mt-4 text-sm leading-relaxed text-[#c9b69a]">
          Hotline và email ở trên là <strong className="font-semibold text-[#f3dfae]">dữ liệu mẫu</strong>{' '}
          của bản demo này, chưa phải thông tin thật của người bán.
        </p>
      </section>

      <section aria-labelledby="doanh-nghiep" className="mt-12 border-t border-[#5c2b12] pt-8">
        <h2
          id="doanh-nghiep"
          className="flex items-center gap-2 font-serif text-2xl font-bold text-[#c59a4b]"
        >
          <Building2 aria-hidden className="h-5 w-5" />
          Đặt quà doanh nghiệp
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-[#c9b69a]">
          Đặt số lượng lớn, in logo lên hộp và xuất hoá đơn VAT: hiện <strong className="font-semibold text-[#f3dfae]">nhận
          qua hotline</strong>, chưa có luồng đặt riêng trên website. Gọi và cho biết số lượng, ngày
          cần nhận và tỉnh thành giao hàng.
        </p>
      </section>

      <section aria-labelledby="han-chot" className="mt-12 border-t border-[#5c2b12] pt-8">
        <h2
          id="han-chot"
          className="flex items-center gap-2 font-serif text-2xl font-bold text-[#c59a4b]"
        >
          <Clock aria-hidden className="h-5 w-5" />
          Hạn chốt đơn Tết {TET_2027.canChi} {TET_2027.year}
        </h2>
        <dl className="mt-4 divide-y divide-[#381a0b] border-y border-[#381a0b]">
          {[lienTinh, noiThanh].map((w) => (
            <div key={w.id} className="flex flex-wrap items-baseline justify-between gap-x-4 py-4">
              <dt className="font-serif text-base font-bold text-[#f3dfae]">
                {w.label}
                <span className="ml-2 text-sm font-normal text-[#c9b69a]">{w.lunar}</span>
              </dt>
              <dd className="font-serif text-base font-bold text-[#c59a4b]">
                {formatCutoffDate(w.iso)}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="xem-tiep" className="mt-16 border-t border-[#5c2b12] pt-8">
        <h2 id="xem-tiep" className="font-serif text-2xl font-bold text-[#c59a4b]">
          Có thể bạn đang cần
        </h2>
        <ul className="mt-4 space-y-1">
          {[
            { href: '/van-chuyen', label: 'Phí vận chuyển & hạn chốt Tết' },
            { href: '/chinh-sach-doi-tra', label: 'Chính sách đổi trả & bồi hoàn' },
            { href: '/tra-cuu-don', label: 'Tra cứu đơn hàng bằng mã đơn và số điện thoại' },
            { href: '/faq', label: 'Câu hỏi thường gặp' },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="tap-row gap-2 text-base font-semibold text-[#f3dfae] transition-colors hover:text-[#d4af37]"
              >
                {item.label}
                <ArrowRight aria-hidden className="h-4 w-4 shrink-0 text-[#c59a4b]" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
