---
name: Hương Quê
description: "Sơn Mài Đêm Giao Thừa — quà Tết ba miền, ấm và trang trọng"
colors:
  brass-leaf: "#c59a4b"
  brass-deep: "#b8863b"
  gold-struck: "#d4af37"
  festival-red: "#861b1b"
  festival-red-edge: "#a33b20"
  lacquer-black: "#120401"
  lacquer-card: "#180702"
  canh-gian: "#210c04"
  vo-trau: "#5c2b12"
  go-huong: "#381a0b"
  kem-giay-do: "#f3dfae"
  may-kho: "#c9b69a"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "3rem"
    fontWeight: 900
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "1.875rem"
    fontWeight: 800
    lineHeight: 1.25
  title:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.4
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.25em"
  input:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  xl: "12px"
  "2xl": "16px"
  "3xl": "24px"
  full: "9999px"
spacing:
  gutter: "16px"
  section: "64px"
  card: "32px"
  field: "10px"
components:
  button-primary:
    backgroundColor: "{colors.brass-deep}"
    textColor: "{colors.lacquer-black}"
    rounded: "{rounded.xl}"
    padding: "12px 32px"
  button-primary-hover:
    backgroundColor: "{colors.gold-struck}"
    textColor: "{colors.lacquer-black}"
    rounded: "{rounded.xl}"
    padding: "12px 32px"
  button-ghost:
    backgroundColor: "{colors.go-huong}"
    textColor: "{colors.kem-giay-do}"
    rounded: "{rounded.xl}"
    padding: "12px 32px"
  input-field:
    backgroundColor: "{colors.lacquer-black}"
    textColor: "{colors.kem-giay-do}"
    rounded: "{rounded.xl}"
    padding: "10px 16px"
    height: "42px"
  card-surface:
    backgroundColor: "{colors.lacquer-card}"
    textColor: "{colors.kem-giay-do}"
    rounded: "{rounded.2xl}"
    padding: "32px"
  chip-region:
    backgroundColor: "{colors.canh-gian}"
    textColor: "{colors.brass-leaf}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
---

# Design System: Hương Quê

> **Ghi chú phạm vi:** bản này ghi lại hệ thị giác **trước** vòng thiết kế lại trang chủ (12/2026) — nó là bản tham chiếu để phần giữ lại là quyết định, và là **anti-reference** cho phần sẽ thay. Token trong frontmatter là nguồn chuẩn.

## Overview

**Creative North Star: "Sơn Mài Đêm Giao Thừa"**

Hệ này mô phỏng một tấm sơn mài đặt trong đêm: nền nâu gần đen (#120401), chữ kem giấy dó (#f3dfae), và điểm nhấn lá mạ (#c59a4b) xuất hiện ở đúng những chỗ cần bàn tay người thợ — viền card, nhãn, nút. Mật độ dày: trang chủ có 13 khối, chữ nhỏ (10–12px) là chuẩn chứ không phải ngoại lệ. Chất liệu là **kim loại trên gỗ**, không phải giấy trắng.

Tính khí: **ấm · trang trọng · thủ công**. Hệ nói tiếng Việt của quà biếu — "hộp quà", "ba miền", "biếu sếp" — không dùng từ vựng thương mại điện tử. Mọi bề mặt dùng chung một mực nền tối; thứ tạo nhịp là **độ sáng của vàng**, không phải màu mới.

Vật liệu có hai tầng và điều đó là cố ý: **nền sơn mài** cho phần thương hiệu (header, footer, hero, trang auth) và **bề mặt nội dung** cho phần vận hành (giỏ, thanh toán, tài khoản, quản trị). Điều **không** cố ý — và bị cấm từ đây — là tầng thứ ba: bảng màu xám `stone-*`/`amber-*` mặc định của Tailwind đang lẫn vào các card sản phẩm và khu quản trị.

**Key Characteristics:**
- Nền nâu sơn mài gần đen, chữ kem giấy dó, điểm lá mạ; không có màu thứ tư nào ngoài đỏ lễ hội.
- Playfair Display (serif, 700–900) cho mọi tiêu đề; Inter cho mọi thứ còn lại.
- Bo góc lớn và nhất quán: `rounded-xl` (12px) là mặc định, `2xl` (16px) cho card.
- Bóng mềm offset lớn cho card + **vệt sáng gradient 1px** ở đỉnh card như ánh kim loại.
- Chữ in hoa giãn ký tự (`tracking-[0.25em]`) làm nhãn; nút in hoa, đậm, giãn.
- Ảnh hiện tại **đều là placeholder** (Pinterest/Unsplash) — hệ phải đứng vững khi chưa có ảnh thật.

## Colors

Bảng màu là **kim loại trên gỗ**: bốn sắc nâu làm nền, ba sắc vàng làm điểm nhấn, một sắc đỏ chỉ để báo hiệu.

### Primary
- **Lá Mạ** (#c59a4b): vàng chủ đạo của thương hiệu. Viền card, icon trong ô nhập, chữ link, nhãn in hoa, viền focus. Đây là màu "bàn tay thợ".
- **Vàng Thếp** (#d4af37): vàng sáng nhất, chỉ dùng cho **điểm đỉnh** — giữa gradient nút chính, vệt sáng trên đỉnh card. Xuất hiện 14 lần, luôn ở vai trò điểm nhấn.
- **Vàng Nén** (#b8863b): vàng tối hai đầu gradient nút chính; cũng là nền badge VIP.

### Secondary
- **Đỏ Lễ Hội** (#861b1b) và viền **Đỏ Son** (#a33b20): chỉ dùng cho **khối mời đăng ký** và cảnh báo. Đây là màu bão hoà nhất hệ, nên bị giới hạn ở một khối mỗi trang — hiện tại nó đang nằm giữa đường mua ở trang chủ, đó là lỗi bố cục, không phải lỗi màu.

### Neutral
- **Nâu Sơn Mài** (#120401): nền toàn hệ, cũng là nền ô nhập. Dùng 35 lần — nhiều thứ hai sau chữ kem.
- **Cánh Gián** (#210c04): nền khối nổi trong trang (lưới sản phẩm, khối câu chuyện).
- **Nâu Card** (#180702): nền card có bóng (card auth, card biểu mẫu).
- **Vỏ Trấu** (#5c2b12): **mọi đường viền 1px** của hệ. Không dùng xám cho viền.
- **Gỗ Hương** (#381a0b): nền nút phụ/ghost, đường phân cách trong card.
- **Kem Giấy Dó** (#f3dfae): chữ chính, **và** chữ trên nền nút tối. Sắc `#e8cf9b` trước đây đã **gộp vào token này** — cùng họ, chênh ~4% độ sáng nên không đáng là token riêng. Dùng nhiều nhất hệ (61 lần).
- **Mây Khô** (#c9b69a): chữ phụ, nhãn ô nhập, mô tả.

### Named Rules
**The One-World Rule.** Bề mặt thương hiệu chỉ dùng bảng màu sơn mài. Nếu bạn chạm vào một bề mặt đang dùng `stone-*`/`amber-*` mặc định của Tailwind, hãy **chuyển nó sang token ở đây**, đừng mở rộng thêm bảng màu thứ ba.

**Đã trả toàn bộ (vòng đồng bộ 12/2026).** 48 file, **1413 chỗ**, 121 lớp Tailwind mặc định đã được chuyển sang token. Kiểm lại bằng `grep` cho `(bg|text|border|from|via|to|ring|shadow|divide|placeholder|accent|fill|stroke)-(stone|amber|red|emerald|green|yellow|orange|zinc|neutral|gray|slate)-\d{2,3}` trên `app` + `components`: **0 kết quả**. Vòng trang chủ trước đó (12/2026) đã trả `app/layout.tsx`, `components/{Header,Footer,ProductCard,SearchBox,Toaster,NewsletterForm,AddToCartButton}.tsx`.

Bảng ánh xạ là tường minh và chạy lại được: **`.impeccable/tools/sync-palette.mjs`** (chạy không cờ = chỉ báo cáo; `--write` mới ghi). Đọc bảng đó là biết mỗi lớp cũ đi về đâu, nên lần drift sau không phải đoán.

Ba chỗ **cố ý không theo bảng**, ghi lại để không ai "sửa" nhầm:
- **`#34d399` cho trạng thái thành công.** DESIGN.md không có token thành công; `components/Toaster.tsx` đã dùng sắc này từ vòng trang chủ, nên bảng ánh xạ lục về đúng nó thay vì đẻ token thứ tư.
- **`#e08a8a` / `#a33b20` / `#2a0707` cho trạng thái lỗi.** Đây là bộ ba `app/error.tsx` đã dùng (chữ / viền / nền), không phải Đỏ Lễ Hội — Đỏ Lễ Hội là tín hiệu bán hàng, không phải màu lỗi.
- **`#78502a` cho viền bậc sáng hơn** (`border-stone-600` cũ). Sắc này đã có sẵn trong mã; chưa phải token chính thức của hệ — nếu số chỗ dùng tăng thì nên nâng thành token.

**The Rationed Gold Rule.** Vàng là kim loại, không phải sơn. Ba sắc vàng cộng lại không vượt ~10% diện tích một màn hình; chỗ nào cũng vàng thì không chỗ nào là vàng.

**The Red-Is-A-Signal Rule.** Đỏ lễ hội không bao giờ là màu trang trí hay màu nền của khối bán hàng. Nó đánh dấu *một* lời mời hoặc *một* cảnh báo mỗi màn hình.

## Typography

**Display Font:** Playfair Display (fallback Georgia, serif) — biến `--font-serif`, subset `vietnamese` + `latin`
**Body Font:** Inter (fallback system-ui) — biến `--font-sans`, subset `vietnamese` + `latin`

**Character:** Serif có chân đậm làm giọng nói, sans trung tính làm hơi thở. Playfair gánh toàn bộ phần "trang trọng"; Inter gánh toàn bộ phần "đọc được". Không có font thứ ba.

### Hierarchy
- **Display** (900, `text-4xl → xl:text-6xl`, line-height 1.15, tracking `-0.025em`): chỉ h1 hero. Một trang một lần.
- **Headline** (800, `text-2xl → sm:text-3xl`, 1.25): tiêu đề khối (h2).
- **Title** (700, `text-lg → sm:text-xl`, 1.4): tiêu đề trong card (h3).
- **Body** (400, `text-xs` = 12px, 1.6): mặc định của hệ. Chữ 12px là **chuẩn**, không phải chữ nhỏ.
- **Label** (700, `text-[10px]`, `tracking-[0.25em]`, IN HOA): nhãn khối, nhãn ô nhập, nút.

### Named Rules
**The 12px Floor Rule.** Không chữ nào mang thông tin được nhỏ hơn 12px. Hiện có `text-[8px]`, `text-[10px]`, `text-[11px]` ở nhãn và phụ đề — đây là nợ, và mọi chỗ chạm vào phải nâng lên sàn 12px (chỉ trang trí thuần như dấu ✦ được giữ 10px).

**The 16px Input Floor Rule.** Trên thiết bị cảm ứng, **mọi ô nhập chữ phải đạt 16px** — đây là ngoại lệ duy nhất và bắt buộc của sàn 12px, không phải chuyện thẩm mỹ. iOS Safari **tự phóng to khung nhìn** khi focus vào ô nhập dưới 16px, và trang bị đẩy lệch ngay lúc khách chạm vào ô đầu tiên. Vì persona chính của Hương Quê duyệt và đặt quà bằng điện thoại, đây là lỗi bố cục chứ không phải chi tiết nhỏ. Quy tắc nằm ở **một chỗ** trong `app/globals.css` dưới `@media (pointer: coarse)` — một quy tắc của nền tảng, không phải của từng màn. Ô tick, radio, range và color được miễn: chúng không kích hoạt phóng to. Trên con trỏ chính xác (chuột), ô nhập giữ nguyên mật độ dày của hệ.

**The One-Eyebrow Rule.** Tối đa **một** nhãn in hoa cấp trang — và trang chủ hiện có **không nhãn nào** (vòng 12/2026): tiêu đề tự đứng, còn dịp Tết nằm trong chính dòng dẫn. Sàn craft cấm hẳn kicker đặt trên tiêu đề, nên đây không phải chỗ để dựng lại. Các trang khác vẫn còn eyebrow — nợ.

**The Opacity-Above-70 Rule.** Chữ dùng `text-[#c9b69a]/60` ở 9–11px đạt ~2,7–4,2:1, dưới ngưỡng AA. Chữ dưới 14px dùng màu **đặc** (Mây Khô), không dùng opacity.

**The Brass-Is-Structure Rule.** Vàng là **cấu trúc**, kem là **nội dung**. Cụ thể:
- **h1** giữ Kem Giấy Dó `#f3dfae` — giọng của chính trang, chỉ một lần mỗi trang.
- **h2 (tiêu đề mục)** dùng Lá Mạ `#c59a4b` (7,4:1) — đây là thứ tách mục, và trước đây hệ thiếu nó: h2 cùng họ kem với `<p>` nên chỉ phân biệt được bằng cỡ chữ, đọc không ra mục.
- **h3 (tiêu đề trong card/khối con)** trở lại Kem Giấy Dó — nội dung, không phải cấu trúc.
- **`<p>` và mọi chữ phụ** giữ Mây Khô `#c9b69a`.
- **Đỏ lễ hội KHÔNG BAO GIỜ là màu tiêu đề.** Ngoài việc phá *The Red-Is-A-Signal Rule*, nó còn hỏng tương phản: `#861b1b` trên `#120401` chỉ **2,10:1**, dưới cả sàn chữ lớn 3:1.

Kèm theo đó là **nhịp nền xen kẽ**: các mục nằm trên hai nền luân phiên — nền gốc `#120401` và dải nổi `#180702` có `border-y` Vỏ Trấu. Bỏ một khối khỏi trang thì **phải dựng lại nhịp này**, nếu không hai mục cùng nền sẽ dính vào nhau và mất cảm giác phân mục dù tiêu đề đã đổi màu.

## Layout

Khung nội dung `max-w-7xl` (1280px) với gutter `px-4 sm:px-6 lg:px-8`. Nhịp dọc giữa các khối là `space-y-16` (64px) — **đều tuyệt đối**, không khối nào được nổi hơn bằng khoảng cách; đây là điểm yếu đã ghi nhận, nhịp cần được phá bằng tương phản mật độ chứ không phải thêm khoảng trắng.

Hero dùng lưới 12 cột (`grid-cols-1 lg:grid-cols-12`) chia **7/5**: cột 7 là chữ, cột 5 là card sản phẩm. Đây là quyết định bố cục tốt nhất của hệ và nên được giữ ở những bề mặt còn dùng hero. **Trang chủ (12/2026) không dùng hero nữa**: nó mở bằng trục chốt đơn toàn khổ — xem *Signature — Trục chốt đơn Tết*. Nhịp dọc ở đó cũng **không** còn `space-y-16` đều tăm tắp: mật độ đổi theo khối (dải dữ liệu dày → lưới hộp quà thưa → sổ tra cứu vừa → đánh giá lắng → khối kết chậm).

**Điểm gãy `lg` (1024px) là điểm gãy nguy hiểm:** navigation desktop là `hidden lg:flex`, và **đã có bản thay thế** dưới 1024px là drawer `components/MobileNav.tsx` (12/2026). Mọi thay đổi ở layout vẫn phải kiểm ở 1023px.

Trang auth là ngoại lệ: cột đơn `max-w-md` (448px) căn giữa theo chiều dọc, không có header/footer.

Mật độ: cao. Chiều cao khối hard-code (`h-[280px]`, `h-[320px]`, `aspect-[1.25/1]`) làm vỡ bố cục khi zoom 200% hoặc khi cỡ chữ hệ thống tăng.

## Elevation & Depth

**Nâng bằng bóng mềm cộng với ánh kim.** Hệ dùng bóng **có offset và blur lớn** cho card, và một **vệt sáng gradient 1px** ở đỉnh card để tạo cảm giác mặt kim loại bắt sáng. Đây là bóng **cấu trúc** (tách card khỏi nền), không phải trang trí.

Hệ **cũng** đang dùng halo lệch 0 màu (nút `0 0 15px`) — chúng chỉ được phép ở vai trò **phản hồi trạng thái** (hover/focus), không được đặt ở trạng thái nghỉ.

### Shadow Vocabulary
- **Card nổi** (`box-shadow: 0 10px 40px rgba(0,0,0,0.8)`): card auth và card biểu mẫu; kèm `backdrop-blur-md`.
- **Vệt sáng đỉnh card** (`1px` cao, `linear-gradient(90deg, transparent, #c59a4b99, transparent)`): dấu hiệu "mặt kim loại"; chỉ ở đỉnh, chỉ 1px.
- **Halo nút** (`0 0 15px rgba(212,175,55,0.3)` → hover `0 0 20px rgba(212,175,55,0.5)`): chỉ trên nút chính, chỉ ở hover/focus.
- **Halo logo** (`0 0 15px rgba(197,154,75,0.25)` → hover `0 0 20px rgba(243,223,174,0.4)`): vòng tròn logo hoa mai ở trang auth.

### Named Rules
**The Offset-Or-State Rule.** Không có bóng nào lệch 0 ở trạng thái nghỉ. Bóng lệch 0 chỉ hợp lệ như phản hồi hover/focus, hoặc là vệt sáng 1px ở đỉnh card.

## Shapes

Ngôn ngữ hình học là **bo tròn lớn và nhất quán**. `rounded-xl` (12px) là mặc định cho mọi thứ tương tác — nút, ô nhập, chip, tile. `rounded-2xl` (16px) dành cho card và khối nội dung. `rounded-3xl` (24px) chỉ cho khung lớn. `rounded-full` cho vòng tròn logo, badge vùng miền, chip nhãn.

Không dùng bán kính dưới 12px (`rounded-sm`, `rounded-md`, `rounded-lg`) — **không dùng góc nhọn**; bán kính nhỏ làm lệch ngôn ngữ hình học của hệ.

Viền: **1px, luôn là Vỏ Trấu** (#5c2b12). Không có viền trái/phải màu dày — dấu hiệu báo lỗi dùng **nền đỏ tối + viền đỏ 1px**, không dùng thanh màu bên hông.

## Components

Cảm giác chung: **trang trọng và chắc tay** — nút dày, chữ in hoa giãn, phản hồi rõ, không có chuyển động trang trí.

### Buttons
- **Shape:** bo 12px (`rounded-xl`), chữ in hoa 12px đậm, giãn `tracking-wider`.
- **Primary:** gradient ngang ba điểm `#b8863b → #d4af37 → #b8863b`, chữ Nâu Sơn Mài (#120401), padding `py-3 px-4`, kèm halo vàng. Đây là hành động duy nhất mỗi khối.
- **Hover / Focus:** `brightness-110` + halo tăng (halo **chỉ ở hover**, không đặt ở trạng thái nghỉ); trạng thái chờ đổi nhãn ("Đang xác thực…"). **Không** hạ `opacity` khi chờ/disabled: hạ opacity kéo tương phản chữ xuống dưới ngưỡng AA — thay bằng nền tối + chữ Mây Khô cho trạng thái hết hàng, và giữ nguyên độ tương phản cho trạng thái đang xử lý.
- **Secondary:** nền trong suốt, viền 1px Vỏ Trấu, chữ Kem Giấy Dó; hover viền Lá Mạ.
- **Ghost / Icon:** chỉ icon 16–18px, màu Mây Khô → Lá Mạ khi hover; **bắt buộc có `aria-label`** (hai link giỏ hàng và tài khoản ở header hiện chỉ có `title`).

### Chips
- **Style:** nền Cánh Gián (#210c04), chữ Lá Mạ, viền Vỏ Trấu 50%, `rounded-full`, chữ 11px đậm in hoa.
- **State:** badge **vùng miền** (Bắc/Trung/Nam) và badge **VIP** dùng cùng công thức; badge trên ảnh phải dùng **nền đặc**, không dùng `amber-600/90` trên ảnh (hiện đạt 1,99–2,65:1).

### Cards / Containers
- **Corner Style:** `rounded-2xl` (16px); khung lớn `3xl`.
- **Background:** Nâu Card (#180702) trên khối auth; **Cánh Gián** (#210c04) cho khối nổi trong trang.
- **Shadow Strategy:** xem *Elevation & Depth* — bóng offset lớn + vệt sáng đỉnh.
- **Border:** 1px Vỏ Trấu (#5c2b12), đôi khi giảm còn 50–80% opacity.
- **Internal Padding:** `p-6` (24px) cho card nhỏ, `p-8` (32px) cho card biểu mẫu.

### Inputs / Fields
- **Style:** nền Nâu Sơn Mài (#120401) — tối hơn nền card một bậc, để ô nhập "khoét vào" mặt sơn; viền 1px Vỏ Trấu; bo 12px; chữ Kem Giấy Dó 12px; **icon Lá Mạ ở trái, cách 14px**; padding trái `pl-10`.
- **Focus:** viền đổi sang Lá Mạ + `ring-1` cùng màu. Không đổi nền.
- **Error / Disabled:** lỗi hiện là **dòng chữ 12px đỏ bên dưới ô**, không đổi viền; **không** hạ `opacity` khi disabled — hạ opacity kéo tương phản chữ xuống dưới AA, thay bằng nền Nâu Sơn Mài giữ nguyên và chữ Mây Khô đặc.
- **Caret:** `caret-[#d4af37]` — con trỏ cũng thuộc hệ.
- **Placeholder:** phải đạt ≥4,5:1; dùng #a98a5f trên nền #120401 (~6,2:1). **Không** dùng #78502a (chỉ ~2,8:1).

### Navigation
- **Style:** header cao 64px, nền Nâu Sơn Mài 95% + blur, viền dưới Vỏ Trấu; logo hoa mai `rounded-full` viền Lá Mạ; chữ nav 12–14px, mục đang chọn có **gạch chân gradient vàng 2,5px** kèm halo.
- **States:** mặc định Mây Khô → hover Kem Giấy Dó → active có gạch vàng.
- **Mobile treatment:** **đã có (12/2026)** — `components/MobileNav.tsx`, một drawer `lg:hidden` mở từ nút có `aria-expanded`/`aria-controls`, đóng bằng Esc hoặc chạm vùng nền, tự đóng khi đổi trang (trạng thái mở gắn với `pathname`, không dùng effect). Danh sách giữ đúng các mục của `NavLinks` (≤5), cộng lối vào **tìm kiếm** và **giỏ hàng**. Vì header dưới 640px bị tràn, cụm **Đăng nhập/Đăng ký** và ô tìm kiếm chỉ hiện từ `sm` trở lên; hai lối vào đăng nhập được chuyển vào drawer.

### Order Status Badge
- **Shape:** viên thuốc `rounded-full`, viền 1px, `px-2.5 py-1`, chữ 11px đậm, `inline-flex` + `whitespace-nowrap`; trạng thái lạ rơi về xám.
- **Năm trạng thái dùng lớp màu NGỮ NGHĨA** (không thuộc bảng sơn mài — xem *The One-World Rule*): *Chờ thanh toán* hổ phách · *Đã xác nhận* xanh dương · *Đang giao hàng* chàm · *Hoàn tất* lục bảo · *Đã hủy* xám. Lớp này chỉ mã hoá trạng thái, **không bao giờ dùng trang trí**.
- **Nguồn duy nhất:** `ORDER_STATUS_STYLES` + `orderStatusLabel()` ở `lib/format.ts`; `components/orders/OrderStatusBadge.tsx` là component thuần (không hook) nên dùng được ở cả Server và Client.
- **Nợ phải trả khi chạm vào:** chữ **11px** (dưới sàn 12px) và cặp *Đã hủy* (`stone-400` trên `stone-800`) chỉ đạt **~3,2:1**. Sửa: nâng lên 12px và ≥4,5:1.

### Toast
- **Shape:** card `rounded-xl`, viền 1px theo tông, nền `stone-900/95` + `backdrop-blur`, `p-3 pl-4`, bóng `shadow-xl`; icon 16px góc trên trái, tiêu đề 14px đậm, mô tả 12px tối đa 2 dòng, nút đóng ở cuối.
- **Vị trí:** cố định góc trên-phải (`top-20 right-4`, `z-[60]`), xếp dọc, rộng `min(20rem, 100vw - 2rem)`. Vùng chứa `pointer-events-none`, từng toast `pointer-events-auto` — nên toast **không chặn click** vào trang.
- **Tông:** *thành công* viền lục bảo 40% + icon `#34d399`; *lỗi / cảnh báo* viền hổ phách 50% + icon `#fbbf24`.
- **Chuyển động:** trượt ngang 8px + mờ dần trong 200ms ease-out; tự ẩn sau 3,5s; vùng chứa có `aria-live="polite"`, nút đóng có `aria-label`.
- **Đã trả (12/2026):** thanh màu 4px ở cạnh trái đã bị **bỏ hẳn**, thay bằng **vệt sáng 1px ở đỉnh** như card sơn mài. Tông chuyển sang token: *thành công* viền `#34d399` 40% + icon `#34d399`; *lỗi* viền `#a33b20` + icon `#e08a8a`; nền `#180702`/95. Không còn `stone-*`/`amber-*` trong toast.

### Signature — Card auth sơn mài (đăng nhập / đăng ký)
Card `max-w-md`, nền #180702, viền Vỏ Trấu, bóng `0 10px 40px rgba(0,0,0,0.8)`, `backdrop-blur-md`, cộng **vệt sáng vàng 1px** ở đỉnh; bên trên là logo hoa mai (SVG vẽ tay, vòng tròn viền vàng, hover đổi sang Kem Giấy Dó). Đây là bề mặt **thể hiện hệ rõ nhất** — mọi component mới nên được đối chiếu với nó.

### Signature — Trục chốt đơn Tết (trang chủ)

Trang chủ không mở bằng một hero; nó mở bằng **một công cụ**: `components/home/CheckoutWindow.tsx`.

- **Trục thời gian có một chỗ ngắt tỉ lệ.** Đoạn dẫn nén hơn 100 ngày chờ thành một thanh gạch chéo có nhãn "HÔM NAY … · N ngày để chọn quà", rồi một dấu ngắt `//` mở sang **10 ngày cuối** được vẽ **đúng tỉ lệ thật** (20 tháng Chạp 27/01 → 23 tháng Chạp 30/01 → 25 tháng Chạp 01/02 → Mùng 1 06/02). Vì đó mới là khoảng khách thật sự phải quyết.
- **Chọn nơi nhận là hành động, không phải bộ lọc.** Hai nút Liên tỉnh / Nội thành đổi *mốc áp dụng*, số ngày còn lại và ghim đang được tô sáng. Mốc đang xem mang chữ "· đang xem" cộng ghim vàng đặc có halo — khác biệt về **hình dạng**, không chỉ sắc độ.
- **Một hành động chính duy nhất** mỗi màn: nút gradient vàng "Chốt đơn giao kịp Tết".
- **Đỏ lễ hội xuất hiện đúng một lần** trên cả trang: ghim Mùng 1 Tết ở cuối trục.
- **Nguồn của mọi con số:** `lib/tet.ts`. Ngày âm lịch được tra một lần và lưu kèm ngày dương (kèm nguồn trong chú thích), **không** kéo thêm thư viện lịch âm; số ngày tính theo ngày lịch giờ Việt Nam và được tính lại ở máy khách mỗi phút để trang mở qua đêm không hứa sai. Không tự suy diễn ngày cho năm khác.
- **Số liệu và đánh giá lấy từ DB, không viết tay.** `getCatalogFacts()` đếm sản phẩm / danh mục / miền / đánh giá; tổng đánh giá cộng từ `products.rating_count` vì bảng `reviews` chỉ GRANT cho `authenticated` (khách vãng lai đếm trực tiếp sẽ ra 0). `getRecentReviews()` chỉ lấy đánh giá sinh từ đơn đã hoàn tất.
- **Ảnh hỏng có đường lui:** `components/ProductThumb.tsx` thay ảnh lỗi bằng ô dự phòng vẽ bằng vật liệu Sơn Mài và nói thẳng "Ảnh đang cập nhật". Nó kiểm tra cả lúc mount, vì ảnh 404 có thể lỗi **trước khi React hydrate** và sự kiện `error` sẽ trôi mất.
- **Trạng thái thời gian là hợp đồng, không phải chi tiết.** `tetPhase()` trong `lib/tet.ts` trả `dang-nhan` / `da-qua-han`, lấy hạn **muộn nhất** (nội thành) làm mốc. Khi `da-qua-han`, trang **phải thôi hứa giao kịp Tết**: h1, dòng dẫn, CTA ở cả first viewport lẫn khối kết, và dòng về phương thức thanh toán đều đổi. Số ngày hiển thị luôn đi qua `daysRemaining()` — không bao giờ hiện "-2480 ngày". Cửa sổ đã đóng tự nói "Đã qua hạn chốt" ngay trên nút chọn, và khi chỉ một cửa sổ đóng thì dòng chính sách chỉ sang cửa sổ còn mở. Đây là thứ dễ quên nhất khi dựng một trang lấy hạn chót làm lõi.

## Adaptation

Khách chính của Hương Quê **duyệt và đặt quà bằng điện thoại, trong lúc gấp** (PRODUCT.md). Nên
điện thoại là bối cảnh gốc, không phải bản thu nhỏ của desktop; desktop là bản mở rộng.

**Vùng chạm — đo, không đoán.** Sàn 44px đặt **trong lớp gốc** cho mọi thứ thật sự là nút: nút
thêm vào giỏ, CTA chính, ô nhập, nút biểu tượng ở header (menu/giỏ/tìm kiếm), link đăng nhập.
Riêng **hàng liên kết điều hướng phụ** (chân trang, link sản phẩm dưới đánh giá) chỉ nở ra khi con
trỏ là thô — `.tap-target` / `.tap-row` trong `globals.css`, trong `@media (pointer: coarse)`.
Kéo chúng lên 44px ở desktop sẽ làm chân trang rỗng và khó quét. **Bề rộng màn hình không cho biết
thiết bị trỏ**, nên luật đặt ở `pointer`, không ở breakpoint.

**Safe area.** `app/layout.tsx` khai `viewportFit: 'cover'` — thiếu nó thì mọi `env(safe-area-inset-*)`
đều bằng 0. `.safe-x` cho header, `.safe-bottom` cho drawer mobile. Không bao giờ đặt
`userScalable: false`.

**Landscape ngắn.** `@media (orientation: landscape) and (max-height: 520px)` ẩn `.hide-short-landscape`
(dòng dẫn nhập, vốn lặp lại điều nút chọn nơi nhận đã nói). Không ẩn thông tin ngày tháng.

**Thứ tự nội dung đổi theo bề rộng, không theo thiết bị.** Trên màn hẹp, bảng điều khiển chốt đơn
đứng **trước** trục thời gian, và trong bảng đó ô **hành động** đứng trước ô **giải thích** — vì
người dùng điện thoại phải chạm được nút chốt đơn trong màn đầu. Ở `lg` thứ tự trở lại: trục →
mốc áp dụng → hành động.

**Điểm gãy.** 640 (`sm`), 768, 1024 (`lg`), 1280 (`xl`). Nội dung quyết định điểm gãy, không phải
danh sách thiết bị. Một chỗ đã đo được và phải nhớ: **header desktop cần ~1125px chiều rộng nội
dung**, nên ở dải `lg` (1024–1279) nó phải siết lại — nav dùng chữ `text-xs` và `gap-4`, khẩu hiệu
dưới logo ẩn đi, `px-4` thay vì `px-8` — rồi mở hết ở `xl`. Trước khi siết, header tràn ngang tới
1189px và cả trang bị cuộn ngang ở 1024–1189px.

**Nhịp dọc.** Trang chủ dùng **dải nền xen kẽ** (nền gốc `#120401` ↔ dải `#180702` có `border-y`), nên các mục tiếp giáp nhau và nhịp đến từ **tương phản mật độ**, không từ khoảng trắng giữa các khối. Chiều cao đo được: 771 / 112 / 1251 / 484 / 425 / 547 — chênh nhau hơn 10 lần. Đừng "cân đối" chúng bằng cách thêm padding cho đều.

**Bảng điều khiển chốt đơn có ba ô ngang nhau.** Ba ô phải cao bằng nhau vì lưới kéo giãn; vì vậy **ô nào cao nhất sẽ quyết định chiều cao cả bảng**, và mọi nội dung thừa phải nằm ở **dải đáy** chứ không nằm trong một ô. Ghi chú phương thức thanh toán và link "Phí giao hàng & hạn chốt Tết" sống ở dải đáy; khi chúng còn nằm trong ô, ô hành động cao 216px và đẩy 81px trống sang ô chọn nơi nhận. Sau khi tách: lưới 160px, khoảng trống ba ô 25/20/28.

## Do's and Don'ts
### Do:
- **Do** dùng token ở frontmatter; nền #120401, chữ #f3dfae, viền #5c2b12, điểm nhấn #c59a4b.
- **Do** dùng Playfair Display cho tiêu đề và Inter cho mọi thứ khác; giữ `fontFamily` qua biến `--font-serif` / `--font-sans`.
- **Do** bo 12px cho mọi thứ tương tác và 16px cho card; giữ `rounded-sm/md` ở mức ~0.
- **Do** in hoa + `tracking-[0.25em]` cho nhãn, và in hoa cho nút.
- **Do** giữ icon Lá Mạ ở trái trong ô nhập, và `caret-[#d4af37]`.
- **Do** dùng icon từ một thư viện duy nhất (lucide-react) với stroke nhất quán; icon-only phải có `aria-label` + tooltip.
- **Do** nâng chữ mang thông tin lên sàn 12px và bỏ opacity `/60` ở chữ nhỏ.
- **Do** để mỗi khối có **một** hành động chính; mọi hành động khác là link chữ hoặc ghost.
- **Do** dùng đúng 5 cặp màu trạng thái đã có cho badge đơn hàng; không tự chế màu trạng thái mới.
- **Do** giữ toast ở góc trên-phải, `pointer-events-none` ở vùng chứa, và `aria-live="polite"`.

### Don't:
- **Don't** thêm bảng màu thứ ba (`stone-*`/`amber-*` mặc định của Tailwind) — chuyển sang token, đừng mở rộng.
- **Don't** dùng xám cho viền hoặc cho chữ phụ trên nền nâu; viền là Vỏ Trấu, chữ phụ là Mây Khô.
- **Don't** dùng gradient cho chữ, hay nền gradient ngoài nút chính.
- **Don't** dùng kính mờ (`backdrop-blur`) như trang trí — nó chỉ thuộc card nổi trên ảnh/nền.
- **Don't** đặt thanh màu dày ở cạnh trái/phải card hay alert. **Đã trả:** toast từng có thanh 4px ở cạnh trái, giờ chỉ còn một vạch `h-px` ở đỉnh (`components/Toaster.tsx`).
- **Don't** dùng bóng lệch 0 ở trạng thái nghỉ, và không dùng bóng cứng lệch khối (neobrutalist).
- **Don't** đặt nhãn in hoa (eyebrow) trên tiêu đề — sàn craft cấm hẳn kiểu này; trang chủ đã bỏ sạch, các trang khác còn nợ.
- **Don't** dùng emoji hoặc glyph Unicode thay icon.
- **Don't** đặt đỏ lễ hội giữa đường mua, và không dùng nó làm nền khối bán hàng.
- **Don't** dùng chữ 8–11px cho nội dung mang thông tin, và không hard-code chiều cao px cho khối chứa nội dung động.

## Trạng thái có ghi chú (không phải nợ)

- **`getActiveBanners()` trong `lib/products.ts` không có người gọi.** Đây là trạng thái có chủ ý, không phải bỏ sót: khối "Đang chạy" đã được gỡ khỏi trang chủ theo yêu cầu, nhưng màn `/admin/banner` vẫn ghi vào bảng `banners`. Xoá hàm đọc trong khi màn ghi còn đó sẽ làm hệ mất tính mạch lạc theo hướng khác. Cần một quyết định sản phẩm — giữ, chuyển sang `/san-pham`, hay bỏ cả đôi — trước khi đụng vào.
