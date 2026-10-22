import type { Metadata } from 'next';
import Link from 'next/link';
import { Truck, PackageCheck, Clock, MapPin, Wallet, AlertTriangle } from 'lucide-react';
import { DELIVERY_WINDOWS, formatCutoffDate } from '@/lib/tet';

// Lấy từ CÙNG nguồn với trang chủ. Trước đây trang này tự viết "16h ngày 27 Tết âm lịch" — một
// hạn muộn hơn hẳn hai mốc vận hành thật, tức là một lời hứa sai. Dùng chung hằng số thì hai
// trang không thể lệch nhau nữa, kể cả khi mốc Tết được cập nhật cho năm sau.
const LIEN_TINH = DELIVERY_WINDOWS[0];
const NOI_THANH = DELIVERY_WINDOWS[1];

export const metadata: Metadata = {
  title: 'Vận chuyển & giao nhận quà Tết | Hương Quê',
  description:
    'Phí vận chuyển cố định 30.000đ, miễn phí cho đơn từ 500.000đ. Thời gian giao quà Tết theo miền Bắc – Trung – Nam.',
};

const REGION_TIMES = [
  {
    region: 'Miền Bắc',
    detail:
      'Nội thành Hà Nội: giao trong ngày hoặc 1 ngày làm việc (đặt trước 16h). Các tỉnh thành miền Bắc: 1–2 ngày làm việc.',
  },
  {
    region: 'Miền Trung',
    detail:
      'Nội thành Đà Nẵng, Huế: 1–2 ngày làm việc. Các tỉnh miền Trung còn lại: 2–3 ngày làm việc.',
  },
  {
    region: 'Miền Nam',
    detail:
      'Nội thành TP. Hồ Chí Minh: 1–2 ngày làm việc. Các tỉnh miền Nam và miền Tây: 2–3 ngày làm việc.',
  },
  {
    region: 'Khu vực xa / vùng sâu',
    detail:
      'Huyện đảo, vùng sâu vùng xa: 3–5 ngày làm việc. Hương Quê sẽ gọi xác nhận trước nếu địa chỉ nằm ngoài vùng phục vụ của đối tác giao hàng.',
  },
];

export default function VanChuyenPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <header className="space-y-3 border-b border-[#5c2b12] pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-[#c59a4b]">
          Chính sách mua hàng
        </span>
        <h1 className="text-3xl font-serif font-black text-[#f3dfae]">Vận Chuyển &amp; Giao Nhận</h1>
        <p className="text-sm text-[#c9b69a] leading-relaxed">
          Hương Quê giao quà Tết toàn quốc bằng đơn vị vận chuyển có bọc chống sốc chuyên dụng cho hộp
          quà. Mọi đơn hàng đều được đóng gói kín, dán niêm phong và có thể đồng kiểm khi nhận hàng.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-serif font-bold text-[#f3dfae] flex items-center gap-2">
          <Wallet className="w-5 h-5 text-[#c59a4b]" />
          Phí vận chuyển
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-[#180702]/70 border border-[#5c2b12] space-y-1">
            <span className="text-xs text-[#c9b69a] block">Mức phí áp dụng</span>
            <span className="text-2xl font-bold font-mono text-[#c59a4b]">30.000₫</span>
            <p className="text-xs text-[#c9b69a]">Cố định cho mọi đơn hàng, mọi tỉnh thành.</p>
          </div>
          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#861b1b] via-[#180702] to-[#381a0b] border border-[#5c2b12]/40 space-y-1">
            <span className="text-xs text-[#c59a4b]/80 block">Ưu đãi miễn phí vận chuyển</span>
            <span className="text-2xl font-bold font-mono text-[#c59a4b]">0₫</span>
            <p className="text-xs text-[#f3dfae]/80">Miễn phí với đơn hàng từ 500.000₫ trở lên.</p>
          </div>
        </div>
        <p className="text-xs text-[#c9b69a] leading-relaxed">
          Phí vận chuyển được hiển thị rõ ở bước giỏ hàng và thanh toán trước khi bạn xác nhận đặt hàng;
          không phát sinh thêm bất kỳ khoản phí nào khác.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-serif font-bold text-[#f3dfae] flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#c59a4b]" />
          Thời gian giao hàng theo miền
        </h2>
        <div className="space-y-3">
          {REGION_TIMES.map((item) => (
            <div key={item.region} className="p-4 rounded-2xl bg-[#180702]/70 border border-[#5c2b12] space-y-1.5">
              <h3 className="text-sm font-bold text-[#f3dfae] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#c59a4b]" />
                {item.region}
              </h3>
              <p className="text-xs text-[#c9b69a] leading-relaxed pl-6">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-serif font-bold text-[#f3dfae] flex items-center gap-2">
          <Truck className="w-5 h-5 text-[#c59a4b]" />
          Quy trình giao nhận
        </h2>
        <ol className="space-y-2 text-xs text-[#c9b69a]">
          <li className="p-3 rounded-xl bg-[#180702]/60 border border-[#5c2b12] leading-relaxed">
            <strong className="text-[#f3dfae]">1. Xác nhận đơn:</strong> ngay sau khi đặt hàng, bạn nhận
            email xác nhận kèm mã đơn và tổng tiền.
          </li>
          <li className="p-3 rounded-xl bg-[#180702]/60 border border-[#5c2b12] leading-relaxed">
            <strong className="text-[#f3dfae]">2. Đóng gói:</strong> hộp quà được bọc chống sốc, dán niêm
            phong và kèm thiệp chúc Tết nếu bạn đã nhập lời chúc.
          </li>
          <li className="p-3 rounded-xl bg-[#180702]/60 border border-[#5c2b12] leading-relaxed">
            <strong className="text-[#f3dfae]">3. Bàn giao vận chuyển:</strong> bạn nhận mã vận đơn và có
            thể tra cứu trạng thái tại trang{' '}
            <Link href="/tra-cuu-don" className="text-[#c59a4b] hover:underline">
              Tra cứu đơn hàng
            </Link>
            .
          </li>
          <li className="p-3 rounded-xl bg-[#180702]/60 border border-[#5c2b12] leading-relaxed">
            <strong className="text-[#f3dfae]">4. Đồng kiểm khi nhận:</strong> với đơn COD, bạn được kiểm
            tra số lượng, tình trạng hộp bên ngoài cùng nhân viên giao hàng trước khi thanh toán.
          </li>
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-serif font-bold text-[#f3dfae] flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-[#c59a4b]" />
          Lưu ý mùa cao điểm Tết
        </h2>
        <ul className="space-y-2 text-xs text-[#c9b69a]">
          <li className="p-3 rounded-xl bg-[#180702]/60 border border-[#5c2b12] leading-relaxed">
            <strong className="text-[#c59a4b]">Hạn chốt đơn để giao kịp Tết:</strong> nội thành Hà Nội,
            Đà Nẵng và TP. Hồ Chí Minh — trước{' '}
            <strong className="text-[#c59a4b]">
              {NOI_THANH.lunar} ({formatCutoffDate(NOI_THANH.iso)})
            </strong>
            . Liên tỉnh — trước{' '}
            <strong className="text-[#c59a4b]">
              {LIEN_TINH.lunar} ({formatCutoffDate(LIEN_TINH.iso)})
            </strong>
            . Đơn đặt sau hạn đó vẫn nhận được, nhưng sẽ tới sau Tết.
          </li>
          <li className="p-3 rounded-xl bg-[#180702]/60 border border-[#5c2b12] leading-relaxed">
            Thời gian giao có thể chậm hơn 1–2 ngày trong các ngày cận Tết do quá tải của đơn vị vận
            chuyển; Hương Quê sẽ chủ động thông báo nếu đơn của bạn bị ảnh hưởng.
          </li>
          <li className="p-3 rounded-xl bg-[#180702]/60 border border-[#5c2b12] leading-relaxed">
            Vui lòng cung cấp số điện thoại người nhận còn hoạt động. Sau 3 lần liên hệ không thành công,
            đơn sẽ được lưu tại bưu cục gần nhất trong 5 ngày.
          </li>
        </ul>
      </section>

      <section className="rounded-2xl bg-[#180702]/70 border border-[#5c2b12] p-6 space-y-3">
        <h2 className="text-lg font-serif font-bold text-[#f3dfae] flex items-center gap-2">
          <PackageCheck className="w-5 h-5 text-[#c59a4b]" />
          Hư hỏng trong quá trình vận chuyển
        </h2>
        <p className="text-xs sm:text-sm text-[#c9b69a] leading-relaxed">
          Nếu hộp quà bị móp méo, rách hoặc hư hỏng khi tới tay người nhận, Hương Quê đổi mới hoặc bồi
          hoàn — khách khiếu nại <strong className="text-[#c59a4b]">trong 24 giờ</strong>, kèm ảnh.
          Hàng đã mở hoặc đã dùng thì không đổi trả. Xem chi tiết tại{' '}
          <Link href="/chinh-sach-doi-tra" className="text-[#c59a4b] hover:underline">
            Chính sách đổi trả &amp; hoàn tiền
          </Link>
          .
        </p>
        <p className="text-xs text-[#c9b69a]">
          Cần hỗ trợ gấp? Gọi hotline <strong className="text-[#c59a4b]">0901 000 000</strong> hoặc email{' '}
          <a href="mailto:lienhe@huongque.vn" className="text-[#c59a4b] hover:underline">
            lienhe@huongque.vn
          </a>
          .
        </p>
      </section>
    </div>
  );
}
