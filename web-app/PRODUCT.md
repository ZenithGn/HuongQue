# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Chính — khách mua lẻ (B2C).** Cá nhân mua quà Tết để biếu gia đình, người thân, đối tác,
  cấp trên. Tình huống: sắm sửa cận Tết, thời gian gấp, thường duyệt bằng điện thoại.
  Việc phải hoàn thành: chọn được hộp quà / đặc sản phù hợp người nhận, đặt nhanh, biết chắc
  đơn giao kịp trước Tết, và theo dõi được đơn.
- **Phụ — doanh nghiệp / đơn vị đặt quà số lượng lớn.** Nhu cầu in logo, hoá đơn VAT, chiết khấu
  sỉ. Nhu cầu này **đã hiện diện trong nội dung website** (khối "Đặt Quà Doanh Nghiệp" ở footer)
  nhưng **chưa có luồng B2B riêng** trong hệ thống: hiện chỉ là lời mời gọi hotline.
- **Phụ — quản trị viên.** Một người vận hành: sản phẩm & tồn kho, danh mục, đơn hàng, mã giảm giá,
  banner, đối soát thanh toán. Không có đội kỹ thuật túc trực.
- **Phụ — khách vãng lai (không tài khoản).** Vẫn đặt hàng được (không bắt buộc đăng nhập) và vẫn
  tra cứu được đơn bằng **mã đơn + số điện thoại**.

## Product Purpose

Webstore quà Tết và đặc sản ba miền: bán hộp quà Tết đóng gói chỉn chu cùng đặc sản vùng miền,
giao toàn quốc. Sản phẩm tồn tại để một người bận rộn chốt được món quà Tết tươm tất trong vài
phút, và để người bán vận hành được mùa cao điểm mà không cần can thiệp kỹ thuật.

Thành công nghĩa là: đơn Tết được chốt và **giao đúng hạn**, tiền và tồn kho luôn khớp sự thật,
và người quản trị xử lý được mọi bất thường (kể cả đối soát thanh toán, hoàn tiền) bằng tay.

## Positioning

Tuyển chọn **đặc sản OCOP ba miền** (Bắc – Trung – Nam), đóng thành **hộp quà cao cấp**, kèm cam kết
**giao đúng Tết**. Điểm bán không nằm ở giá rẻ hay giao nhanh, mà ở việc chọn sẵn – đóng gói – và
bảo đảm kịp dịp: người mua không phải tự ghép món hay lo quà đến muộn.

## Operating Context

- **Mùa vụ.** Cao điểm là cận Tết Nguyên Đán. Hạn thanh toán, hạn giao và trạng thái đơn là dữ liệu
  vận hành quan trọng, không phải chi tiết phụ.
- **Hạn chốt đơn để giao kịp Tết (đã chốt).** Nội thành **Hà Nội / Đà Nẵng / TP.HCM: chốt trước
  25 tháng Chạp**. **Liên tỉnh: chốt trước 20 tháng Chạp.** Đây là mốc vận hành dùng cho ghi chú ở
  giỏ hàng, cảnh báo ở bước thanh toán và cho việc huỷ đơn quá hạn — không phải câu chữ marketing.
- **Hậu mãi (đã chốt).** Hàng **đã mở/đã dùng: không đổi trả**. Chỉ **đổi mới hoặc bồi hoàn** khi sản
  phẩm lỗi, hư hỏng do vận chuyển, hoặc giao sai — khách **khiếu nại trong 24 giờ**, kèm ảnh.
- **Thanh toán.** COD và PayOS (chuyển khoản/QR). Đơn PayOS giữ chỗ **15 phút**, hết hạn thì cron
  huỷ đơn và hoàn tồn kho. Xác nhận "đã trả tiền" chỉ đến từ webhook PayOS đã xác thực chữ ký hoặc
  từ bước đối soát chủ động; không bao giờ từ tham số trên URL.
- **Đối soát thủ công là đường chính thức.** Khi webhook không tới được server, admin dùng nút
  "Kiểm tra với PayOS" ở màn đơn hàng; đơn đã huỷ mà khách vẫn trả tiền được đánh dấu để hoàn tiền
  thủ công. Không có cron đối soát tự động trong phạm vi hiện tại.
- **Phí vận chuyển.** Cố định 30.000đ, miễn phí từ 500.000đ (đã chốt, không chia theo vùng).
- **Hạ tầng.** Vercel + Supabase (Postgres/Auth/RLS/RPC), cron qua Vercel, email giao dịch qua Resend,
  GA4 cho `view_item` và `purchase`.
- **Ngôn ngữ & tiền tệ.** Giao diện tiếng Việt; giá niêm yết VND; đơn vị bán tự do (hộp/gói/hũ/500g).
- **Dữ liệu mẫu.** Seed tạo 20 sản phẩm, 60 đơn, 1 admin + 5 khách để demo toàn bộ luồng.

## Capabilities and Constraints

**Đang có (đã chạy thật trên DB):** C01–C14 — trang chủ, danh sách & tìm kiếm sản phẩm, chi tiết sản
phẩm (gallery, tồn kho, mua kèm/nâng cấp, đánh giá), giỏ hàng, thanh toán COD/PayOS, kết quả thanh
toán có polling, đăng ký/đăng nhập/quên–đặt lại mật khẩu, tài khoản, đơn của tôi, chi tiết & huỷ đơn,
đánh giá sản phẩm, tra cứu đơn cho khách vãng lai, bản tin + huỷ đăng ký, các trang tĩnh (FAQ, đổi
trả, bảo mật, vận chuyển). A01–A06 + banner — dashboard, sản phẩm (kèm upload ảnh), danh mục, đơn
hàng (chuyển trạng thái tịnh tiến), mã giảm giá, phân trang.

**Ràng buộc kỹ thuật.** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4; Supabase với
RLS/RPC làm chốt bảo mật; PayOS merchant API v2 dùng chữ ký **HMAC-SHA256** viết tay bằng
`fetch` + `node:crypto`. Quyền hạn chỉ suy ra từ session Supabase + `profiles.role` + `is_admin()`;
service role chỉ ở server. Tránh thêm dependency mới khi có thể.

**Phạm vi đã chốt là KHÔNG làm:** VNPay (toàn bộ), F08 VietQR thủ công, phương thức `bank_transfer`
cùng xác nhận đơn thủ công 24 giờ, live chat (Tawk.to/Crisp), bảng khiếu nại/ticket, giới hạn mã
giảm giá theo từng tài khoản, cron đối soát PayOS tự động, CSP nghiêm ngặt + rate limit (Upstash),
biểu đồ nâng cao trên dashboard, sự kiện GA4 chi tiết, phí ship theo vùng, xuất đơn ra Excel.

**Chưa quyết định (ghi lại, không suy diễn):** luồng B2B thật (báo giá, VAT, in logo) mới chỉ là nội
dung marketing; Cloudinary đã có module cấu hình bằng `CLOUDINARY_URL` nhưng **chưa bật** vì chưa có
khoá, nên upload ảnh hiện vẫn qua Supabase Storage; avatar người dùng chưa có (cần cột
`profiles.avatar_url`).

**Việc phải làm ở nội dung web (đã có chính sách để viết theo):** trang "Chính sách đổi trả" trong web
hiện là nội dung mẫu — phải viết lại đúng chính sách ở mục *Operating Context* (không đổi trả hàng đã
mở; bồi hoàn khi lỗi/hư hỏng do vận chuyển hoặc giao sai; khiếu nại trong 24 giờ kèm ảnh). Mọi chỗ
hiển thị hạn chốt đơn (giỏ hàng, thanh toán) phải dùng đúng 2 mốc đã chốt: nội thành 25 tháng Chạp,
liên tỉnh 20 tháng Chạp.

## Brand Commitments

- Tên thương hiệu **Hương Quê** (viết hoa toàn bộ "HƯƠNG QUÊ" trên nhận diện), tagline
  **"Tinh Hoa Quà Tết Ba Miền"**.
- Trục kể chuyện cố định: **ba miền Bắc – Trung – Nam** (cùng "ba miền" cho hộp quà tổng hợp).
- Điểm liên hệ **MẪU — không phải thông tin thật**: hotline **0901 000 000**, email
  **lienhe@huongque.vn**, địa bàn **Hà Nội • Đà Nẵng • TP. Hồ Chí Minh**. Không được coi các giá trị
  này là thật khi viết nội dung mới.
- **Chưa có thông tin pháp lý** (người dùng đã xác nhận là *chưa có*, không phải quên điền): tên
  công ty / hộ kinh doanh, mã số thuế, địa chỉ trụ sở, người đại diện. Future work **không được bịa**
  và không hỏi lại.

## Evidence on Hand

- **Dữ liệu thật đang chạy:** `huongque_db_full.sql` và `huongque_seed_full.sql` (schema + seed đã
  vá, chạy trên Supabase `nukannouvmnqvcuoumqz`): 20 sản phẩm / 5 danh mục / 60 đơn / 105 dòng hàng /
  35 bản ghi thanh toán / 18 đánh giá / 4 mã giảm giá / 3 banner / 1 admin + 5 khách.
- **Tài khoản demo:** `admin@huongque.vn` / `Admin@123`, khách `an.nguyen@example.com` / `Khach@123`.
- **Tài liệu kiểm chứng:** `PAYOS_MVP_HANDOVER.md` (kết quả kiểm chứng runtime, việc còn lại, rủi ro)
  và hướng dẫn triển khai gốc (nằm ngoài repo).
- **Khoảng trống phải nói rõ — không được bịa:** chưa có **logo chính thức**, chưa có **ảnh chụp sản
  phẩm thật** (mọi ảnh sản phẩm hiện tại là **ảnh Unsplash dùng tạm**, không phải hàng thật của
  Hương Quê), chưa có **chứng nhận OCOP** dạng tệp, chưa có **đánh giá/nhận xét của khách thật**
  ngoài seed, chưa có **số liệu kinh doanh thật**, chưa có **thông tin pháp lý thật** (tên công ty,
  MST, địa chỉ) — nội dung đang có là mẫu. Trạng thái "chưa có" của thông tin pháp lý và của ảnh/logo
  thật đã được **xác nhận là chưa có**, nên đây là sự thật cần ghi, không phải chỗ trống để lấp bằng
  phỏng đoán.

## Product Principles

1. **Quà phải đến đúng Tết.** Mọi quyết định về tồn kho, hạn thanh toán và trạng thái đơn đều phục
   vụ một cam kết: giao kịp trước Tết.
2. **Tiền và tồn kho là sự thật của server.** Giá, giảm giá, số tiền và trạng thái thanh toán chỉ
   được xác nhận ở server/DB (PayOS API + RPC); tham số từ trình duyệt không bao giờ đủ để đánh dấu
   "đã trả tiền".
3. **Khách vãng lai không bị chặn.** Vẫn đặt được hàng và vẫn tra cứu được đơn bằng mã đơn + SĐT.
4. **Người vận hành phải tự xử lý được.** Mọi bất thường (webhook lỡ, sai số tiền, đơn huỷ mà có
   tiền) đều phải có đường xử lý thủ công rõ ràng trong giao diện quản trị.
5. **Ba miền là trục thật**, dùng để phân loại, kể chuyện và gợi ý — không phải bộ lọc trang trí.

## Accessibility & Inclusion

Chưa có chuẩn cụ thể nào được xác nhận (chưa đặt mức WCAG, chưa kiểm định bằng công cụ). Thực tế
vận hành cần lưu ý: phần lớn khách duyệt và đặt quà bằng điện thoại, trong thời gian gấp cận Tết.

---

*Nguồn của bản ghi này — do người dùng xác nhận trực tiếp qua 2 vòng hỏi: người dùng chính (B2C là
chính, B2B là phụ), khác biệt cốt lõi (OCOP ba miền + hộp quà + giao đúng Tết), vị trí tài liệu
(`web-app/PRODUCT.md`), **hạn chốt đơn** (nội thành 25 tháng Chạp / liên tỉnh 20 tháng Chạp),
**chính sách hậu mãi** (không đổi trả hàng đã mở; bồi hoàn khi lỗi/giao sai trong 24 giờ), và việc
**chưa có thông tin pháp lý thật**. Phần còn lại lấy từ bằng chứng trong repo
(`huongque_db_full.sql`, `huongque_seed_full.sql`, mã nguồn `web-app/`, `PAYOS_MVP_HANDOVER.md`) và
chỉ ghi những gì đọc được, không suy diễn thêm. Các mục "chưa quyết định"/"chưa có" là khoảng trống
có thật, không phải chỗ để điền sau bằng phỏng đoán.*
