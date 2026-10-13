import Link from 'next/link';
import { Gift, Award, Sparkles, HeartHandshake, Compass } from 'lucide-react';

export default function CauChuyenPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-[#f3dfae]">
      
      {/* 1. Tiêu đề chính & Giới thiệu chung */}
      <div className="text-center space-y-4 max-w-3xl mx-auto border-b border-[#5c2b12]/60 pb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#78502a] bg-[#210c04]/90 px-4 py-1.5 text-[11px] text-[#e8cf9b]">
          <span className="text-[#c49a52]">✦</span>
          <span className="font-semibold tracking-widest uppercase">
            CÂU CHUYỆN THƯƠNG HIỆU · HƯƠNG QUÊ
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#f3dfae] tracking-tight leading-tight">
          Kết Tinh Tinh Hoa Ẩm Thực Ba Miền,<br />
          Gói Trọn Nghĩa Tình Mùa Tết
        </h1>

        <p className="text-sm sm:text-base text-[#c9b69a] leading-relaxed">
          Hương Quê ra đời từ niềm khát khao tôn vinh những giá trị truyền thống, làng nghề và nông sản OCOP Việt Nam. Mỗi hộp quà Tết không đơn thuần là món quà biếu tặng, mà là câu chuyện về văn hóa, sự tỉ mỉ và tấm lòng tri ân sâu sắc.
        </p>
      </div>

      {/* 2. Sứ mệnh & Tầm nhìn */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4 p-8 rounded-2xl bg-[#180702]/90 border border-[#5c2b12]/50 shadow-2xl">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#b8863b] to-[#d4af37] text-[#120401] flex items-center justify-center font-bold shadow">
            <Compass className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-serif font-bold text-[#f3dfae]">Sứ Mệnh Của Chúng Tôi</h2>
          <p className="text-xs sm:text-sm text-[#c9b69a] leading-relaxed">
            Kết nối trực tiếp người tiêu dùng với những đặc sản tinh túy nhất từ các vùng miền đất nước. Chúng tôi cam kết mang đến các sản phẩm 100% chính hãng, đạt chuẩn OCOP, an toàn sức khỏe và mang đậm dấu ấn bản sắc văn hóa Việt.
          </p>
        </div>

        <div className="space-y-4 p-8 rounded-2xl bg-[#180702]/90 border border-[#5c2b12]/50 shadow-2xl">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#b8863b] to-[#d4af37] text-[#120401] flex items-center justify-center font-bold shadow">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-serif font-bold text-[#f3dfae]">Tầm Nhìn 2027 & Tương Lai</h2>
          <p className="text-xs sm:text-sm text-[#c9b69a] leading-relaxed">
            Trở thành thương hiệu quà Tết cao cấp hàng đầu được các cá nhân và doanh nghiệp lớn tin tưởng lựa chọn. Hương Quê không ngừng đổi mới thiết kế, nâng tầm giá trị nông sản Việt vươn xa.
          </p>
        </div>
      </div>

      {/* 3. Giá trị cốt lõi */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-serif font-bold text-[#f3dfae]">Giá Trị Cốt Lõi</h3>
          <p className="text-xs text-[#c9b69a]">Những nguyên tắc định hình nên chất lượng và uy tín của Hương Quê</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#180702]/80 border border-[#5c2b12]/40 text-center space-y-3 hover:border-[#c59a4b] transition-all">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#210c04] border border-[#78502a] flex items-center justify-center text-[#c59a4b]">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-base text-[#f3dfae]">Chất Lượng Thượng Hạng</h4>
            <p className="text-xs text-[#c9b69a] leading-relaxed">
              Tuyển chọn khắt khe từ nguồn nguyên liệu tự nhiên, quy trình chế biến đạt chuẩn vệ sinh an toàn thực phẩm.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#180702]/80 border border-[#5c2b12]/40 text-center space-y-3 hover:border-[#c59a4b] transition-all">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#210c04] border border-[#78502a] flex items-center justify-center text-[#c59a4b]">
              <Gift className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-base text-[#f3dfae]">Tinh Tế Trong Thiết Kế</h4>
            <p className="text-xs text-[#c9b69a] leading-relaxed">
              Bao bì hộp quà mang đậm phong cách truyền thống kết hợp hiện đại, sang trọng và đẳng cấp cho quà biếu doanh nghiệp.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#180702]/80 border border-[#5c2b12]/40 text-center space-y-3 hover:border-[#c59a4b] transition-all">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#210c04] border border-[#78502a] flex items-center justify-center text-[#c59a4b]">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h4 className="font-serif font-bold text-base text-[#f3dfae]">Tận Tâm Phục Vụ</h4>
            <p className="text-xs text-[#c9b69a] leading-relaxed">
              Đội ngũ tư vấn chuyên nghiệp, hỗ trợ thiết kế logo doanh nghiệp, chính sách chiết khấu linh hoạt và giao hàng toàn quốc.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Lời kêu gọi hành động */}
      <div className="p-10 rounded-2xl bg-gradient-to-b from-[#210c04] to-[#120401] border border-[#78502a] text-center space-y-6 shadow-2xl relative overflow-hidden">
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#f3dfae]">
          Sẵn Sàng Gửi Trao Món Quà Ý Nghĩa Nhất?
        </h3>
        <p className="text-xs sm:text-sm text-[#c9b69a] max-w-xl mx-auto leading-relaxed">
          Khám phá ngay bộ sưu tập Quà Tết 2027 độc quyền từ Hương Quê để dành tặng người thân, đối tác và đồng nghiệp.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/san-pham"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#b8863b] to-[#d4af37] text-[#120401] font-bold text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-lg"
          >
            Khám Phá Bộ Sưu Tập Quà Tết
          </Link>
          <Link
            href="/lien-he"
            className="px-6 py-3 rounded-xl border border-[#78502a] bg-[#180702] text-[#e8cf9b] font-semibold text-xs sm:text-sm hover:bg-[#381a0b] transition-all"
          >
            Liên Hệ Tư Vấn Doanh Nghiệp
          </Link>
        </div>
      </div>

    </div>
  );
}