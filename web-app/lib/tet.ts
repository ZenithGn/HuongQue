/**
 * Mốc chốt đơn Tết — dữ liệu vận hành, không phải câu chữ marketing.
 *
 * Vì sao là hằng số chứ không phải thư viện lịch âm: PRODUCT.md chốt ràng buộc
 * "Tránh thêm dependency mới khi có thể", nên ngày âm lịch được tra một lần rồi ghi lại
 * kèm ngày dương tương ứng. KHÔNG tự suy diễn ngày cho năm khác — muốn đổi năm thì phải
 * tra lại lịch và sửa đúng ở đây.
 *
 * Nguồn (tra ngày 2026-10-16): lịch vạn niên tháng 1/2027 — ngày 27/01/2027 là
 * 20 tháng Chạp, và 31/01/2027 là 24 tháng Chạp (tháng Chạp thiếu, 29 ngày).
 * Suy ra: 25 tháng Chạp = 01/02/2027 và mùng 1 Tết = 06/02/2027.
 * https://baonghean.vn/am-duong-lich-ngay-27-thang-1-nam-2027.html
 */

export interface TetCutoff {
  /** Ngày âm lịch, dạng người Việt đọc. */
  lunar: string;
  /** Mốc dương lịch tương ứng, ISO kèm offset giờ Việt Nam. */
  iso: string;
  /** Mốc này áp dụng cho ai. */
  scope: string;
  /** Tên ngắn để hiển thị trên trục thời gian. */
  short: string;
}

export const TET_2027 = {
  year: 2027,
  canChi: 'Đinh Mùi',
  ongTao: {
    lunar: '23 tháng Chạp',
    iso: '2027-01-30T00:00:00+07:00',
    scope: 'Ông Táo về trời',
    short: 'Ông Táo',
  },
  lienTinh: {
    lunar: '20 tháng Chạp',
    iso: '2027-01-27T00:00:00+07:00',
    // Viết thường vì chuỗi này luôn nằm GIỮA câu ("áp dụng cho …"). Đừng hạ chữ bằng
    // .toLowerCase() ở chỗ hiển thị — làm vậy sẽ phá danh từ riêng của mốc nội thành.
    scope: 'tỉnh, thành khác trên toàn quốc',
    short: 'Chốt liên tỉnh',
  },
  noiThanh: {
    lunar: '25 tháng Chạp',
    iso: '2027-02-01T00:00:00+07:00',
    scope: 'Hà Nội · Đà Nẵng · TP. Hồ Chí Minh',
    short: 'Chốt nội thành',
  },
  tetDay: {
    lunar: 'Mùng 1 Tết',
    iso: '2027-02-06T00:00:00+07:00',
    scope: 'Tết Nguyên Đán Đinh Mùi',
    short: 'Mùng 1 Tết',
  },
} as const satisfies Record<string, unknown>;

/** Hai cửa sổ chốt đơn khách thật sự phải chọn giữa. */
export type DeliveryWindowId = 'lien_tinh' | 'noi_thanh';

export interface DeliveryWindow extends TetCutoff {
  id: DeliveryWindowId;
  /** Nhãn ngắn cho nút chọn. */
  label: string;
}

/**
 * Thứ tự cố ý: liên tỉnh trước vì đây là hạn **chặt hơn**, chốt sớm hơn 5 ngày.
 * Mặc định của giao diện là mốc chặt nhất, để không ai bị hứa quá.
 */
export const DELIVERY_WINDOWS: readonly DeliveryWindow[] = [
  {
    id: 'lien_tinh',
    label: 'Liên tỉnh',
    lunar: TET_2027.lienTinh.lunar,
    iso: TET_2027.lienTinh.iso,
    scope: TET_2027.lienTinh.scope,
    short: TET_2027.lienTinh.short,
  },
  {
    id: 'noi_thanh',
    label: 'Nội thành',
    lunar: TET_2027.noiThanh.lunar,
    iso: TET_2027.noiThanh.iso,
    scope: TET_2027.noiThanh.scope,
    short: TET_2027.noiThanh.short,
  },
] as const;

/** Ngày theo giờ Việt Nam, dạng YYYY-MM-DD — không phụ thuộc múi giờ của máy chạy. */
export function vnDateKey(value: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(value);
}

/**
 * Số ngày còn lại tính theo **ngày lịch Việt Nam** (không phải chênh lệch giờ),
 * nên "hôm nay 16/10" tới "27/01" luôn là một con số nguyên ổn định trong ngày.
 */
export function daysUntil(iso: string, now: Date = new Date()): number {
  const target = new Date(iso);
  if (Number.isNaN(target.getTime())) return 0;
  const from = Date.parse(`${vnDateKey(now)}T00:00:00Z`);
  const to = Date.parse(`${vnDateKey(target)}T00:00:00Z`);
  return Math.round((to - from) / 86_400_000);
}

export type CutoffState = 'open' | 'last_day' | 'closed';

export function cutoffState(days: number): CutoffState {
  if (days < 0) return 'closed';
  if (days === 0) return 'last_day';
  return 'open';
}

/**
 * Trạng thái của CẢ TRANG, không phải của một cửa sổ: còn nơi nào nhận được đơn giao kịp Tết không.
 *
 * Lấy hạn **muộn nhất** (nội thành) làm mốc, vì sau mốc đó thì không nơi nào còn kịp nữa. Đây là
 * điều kiện để trang thôi hứa "giao kịp Tết" — nếu thiếu nó, sang tháng 2/2027 trang chủ vẫn
 * mời khách "Chọn hộp quà giao kịp Tết" trong khi hạn đã qua.
 */
export type TetPhase = 'dang-nhan' | 'da-qua-han';

export function tetPhase(now: Date = new Date()): TetPhase {
  return daysUntil(TET_2027.noiThanh.iso, now) < 0 ? 'da-qua-han' : 'dang-nhan';
}

/** Số ngày để hiển thị: không bao giờ âm, vì giao diện không được hiện "-5 ngày còn lại". */
export function daysRemaining(days: number): number {
  return Math.max(0, days);
}

/** "27/01/2027" theo giờ Việt Nam. */
export function formatCutoffDate(iso: string): string {
  return new Intl.DateTimeFormat('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(iso));
}

/** "Thứ Tư" theo giờ Việt Nam. */
export function formatCutoffWeekday(iso: string): string {
  return new Intl.DateTimeFormat('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    weekday: 'long',
  }).format(new Date(iso));
}
