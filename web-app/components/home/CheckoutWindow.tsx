'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, CalendarClock, MapPin, PackageCheck } from 'lucide-react';
import {
  DELIVERY_WINDOWS,
  TET_2027,
  cutoffState,
  daysRemaining,
  daysUntil,
  formatCutoffDate,
  formatCutoffWeekday,
  tetPhase,
  vnDateKey,
  type DeliveryWindowId,
  type TetPhase,
} from '@/lib/tet';

interface CheckoutWindowProps {
  /** Số ngày còn lại do server tính, để HTML đầu tiên đúng cả khi chưa có JS. */
  initialDays: Record<DeliveryWindowId, number>;
  /** Trạng thái cả trang do server tính — để bản render đầu không hứa sai. */
  initialPhase: TetPhase;
  /** Nhãn "hôm nay" do server tính theo giờ Việt Nam. */
  initialTodayKey: string;
}

/**
 * Công cụ chốt đơn — điểm nhấn của trang chủ.
 *
 * Trục thời gian cố ý có **một chỗ ngắt tỉ lệ**: 100+ ngày chờ được nén thành một đoạn dẫn,
 * còn 10 ngày cuối (20 → 25 tháng Chạp và mùng 1 Tết) được phóng to theo đúng tỉ lệ.
 * Vì đó mới là khoảng thời gian khách thật sự phải quyết.
 */
export function CheckoutWindow({ initialDays, initialPhase, initialTodayKey }: CheckoutWindowProps) {
  const [windowId, setWindowId] = useState<DeliveryWindowId>('lien_tinh');
  const [days, setDays] = useState<Record<DeliveryWindowId, number>>(initialDays);
  const [todayKey, setTodayKey] = useState(initialTodayKey);
  const [phase, setPhase] = useState<TetPhase>(initialPhase);

  // Số ngày là dữ liệu sống: tính lại khi lên máy khách và mỗi phút, để trang mở qua đêm
  // vẫn không hứa sai một ngày nào. Trạng thái cả trang cũng tính lại theo cùng nhịp.
  useEffect(() => {
    const refresh = () => {
      setTodayKey(vnDateKey());
      setDays({
        lien_tinh: daysUntil(TET_2027.lienTinh.iso),
        noi_thanh: daysUntil(TET_2027.noiThanh.iso),
      });
      setPhase(tetPhase());
    };
    refresh();
    const id = window.setInterval(refresh, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const active = useMemo(
    () => DELIVERY_WINDOWS.find((w) => w.id === windowId) ?? DELIVERY_WINDOWS[0],
    [windowId],
  );

  const activeDays = days[active.id] ?? 0;
  const state = cutoffState(activeDays);
  const activeDaysShown = daysRemaining(activeDays);
  const pageClosed = phase === 'da-qua-han';

  /** Đoạn phóng to: 20 tháng Chạp (27/01) → mùng 1 Tết (06/02), chia theo tỉ lệ thật.
      Nếu cấu hình ngày bị đặt sai (span ≤ 0) thì rơi về vị trí 0 thay vì chia cho 0 ra NaN. */
  const zoomStations = useMemo(() => {
    const start = new Date(TET_2027.lienTinh.iso).getTime();
    const end = new Date(TET_2027.tetDay.iso).getTime();
    const span = end - start;
    const pos = (iso: string) => {
      if (!Number.isFinite(span) || span <= 0) return 0;
      const ratio = ((new Date(iso).getTime() - start) / span) * 100;
      return Number.isFinite(ratio) ? Math.min(100, Math.max(0, ratio)) : 0;
    };

    return [
      { ...TET_2027.lienTinh, id: 'lien_tinh' as const, pos: 0 },
      { ...TET_2027.ongTao, id: 'ong_tao' as const, pos: pos(TET_2027.ongTao.iso) },
      { ...TET_2027.noiThanh, id: 'noi_thanh' as const, pos: pos(TET_2027.noiThanh.iso) },
      { ...TET_2027.tetDay, id: 'tet' as const, pos: 100 },
    ];
  }, []);

  const todayLabel = useMemo(() => {
    const [y, m, d] = todayKey.split('-');
    return `${d}/${m}/${y}`;
  }, [todayKey]);

  const verdict =
    state === 'closed'
      ? 'Đã qua hạn chốt'
      : state === 'last_day'
        ? 'Hôm nay là ngày cuối'
        : 'Còn kịp Tết';

  return (
    <section className="relative border-b border-[#5c2b12] bg-[#120401] overflow-hidden">
      {/* vệt sáng kim loại ở đỉnh khối */}
      <div
        aria-hidden
        className="absolute inset-x-[10%] top-0 h-px bg-gradient-to-r from-transparent via-[#c59a4b]/60 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-14">
        <h1 className="max-w-3xl font-serif text-3xl font-bold leading-[1.12] tracking-tight text-[#f3dfae] sm:text-4xl lg:text-5xl">
          {pageClosed ? (
            <>
              Đã qua hạn chốt
              <br className="hidden sm:block" /> giao trước Tết
            </>
          ) : (
            <>
              Chốt trước hạn này,
              <br className="hidden sm:block" /> quà mới kịp tới tay
            </>
          )}
        </h1>

        {/* Văn xuôi đọc bằng 16px (sàn thường của web), không phải 14px như trước. Câu cũng được
            rút ngắn: vế "chọn nơi nhận bên dưới…" là điều chính cái nút ngay dưới đã nói, nên
            bỏ nó trả lại chiều cao cho 320px — nơi cỡ chữ tăng mà nút chính vẫn phải trong màn đầu. */}
        <p className="hide-short-landscape mt-3 max-w-xl text-base leading-relaxed text-[#c9b69a]">
          {pageClosed ? (
            <>
              Tết Nguyên Đán {TET_2027.canChi} {TET_2027.year}. Hạn nhận đơn giao kịp trước Tết đã
              khép lại — quà vẫn đặt được, nhưng sẽ tới sau Tết.
            </>
          ) : (
            <>
              Tết Nguyên Đán {TET_2027.canChi} {TET_2027.year}. Hạn chốt tính theo nơi nhận, không
              theo ngày bạn đặt.
            </>
          )}
        </p>

        {/* Trên điện thoại, bảng điều khiển (chọn nơi nhận + hành động chính) được đưa LÊN TRƯỚC
            trục thời gian: persona chính duyệt bằng điện thoại, nên hành động không được nằm
            dưới màn hình đầu. Ở desktop thứ tự vẫn là trục rồi mới tới bảng điều khiển. */}
        <div className="mt-6 flex flex-col gap-10 lg:mt-10 lg:gap-0">
        {/* ------------------------------------------------ trục thời gian */}
        <div className="order-2 lg:order-1">
          {/* Đoạn dẫn: toàn bộ quãng chờ, nén lại.
              Dưới `md`, thanh này xuống hẳn một dòng riêng và chạy hết khổ — nếu để chung hàng,
              nhãn `shrink-0` sẽ ép nó còn ~40px và ẩn dụ "quãng chờ bị nén" biến mất.

              KHÔNG còn dấu `//` và nhãn "phóng to": đó là lời giải thích cho CÁCH VẼ biểu đồ,
              không phải thông tin người mua cần — và cả khối đó mang `aria-hidden` nên nó chỉ
              phục vụ mắt. Hai đoạn đã tự khác nhau bằng vật liệu (thanh mảnh gạch chéo ở đây,
              đường lá mạ có ghim và ngày ở dưới), nên không cần câu chữ nào giải thích tỉ lệ. */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <div className="shrink-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f3dfae]">
                {pageClosed ? 'Hạn đã qua' : `Hôm nay ${todayLabel}`}
              </p>
              <p className="text-xs text-[#c9b69a]">
                {pageClosed ? `từ ${todayLabel}` : `còn ${activeDaysShown} ngày`}
              </p>
            </div>

            <div
              aria-hidden
              className="order-last h-2 min-w-0 basis-full rounded-full border border-[#5c2b12] bg-[#210c04] md:order-none md:flex-1 md:basis-auto"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(115deg, rgba(92,43,18,0.55) 0 2px, transparent 2px 9px)',
              }}
            />
          </div>

          {/* Đoạn phóng to theo tỉ lệ thật: 27/01 → 06/02 */}
          <div className="relative mt-6 hidden h-32 md:block">
            <div
              aria-hidden
              className="absolute inset-x-0 top-[54px] h-[3px] rounded-full bg-gradient-to-r from-[#5c2b12] via-[#c59a4b] to-[#861b1b]"
            />

            {zoomStations.map((s) => {
              const isActive = s.id === active.id;
              const isTet = s.id === 'tet';
              const isCutoff = s.id === 'lien_tinh' || s.id === 'noi_thanh';
              return (
                <div key={s.id} className="absolute top-0 -translate-x-1/2" style={{ left: `${s.pos}%` }}>
                  {/* ghim: mốc đang xem phải khác biệt rõ rệt, không chỉ khác sắc độ */}
                  <div
                    aria-hidden
                    className={[
                      'mx-auto mt-[46px] h-[19px] w-[19px] rotate-45 border-2',
                      isTet
                        ? 'border-[#f3dfae] bg-[#861b1b]'
                        : isActive
                          ? 'border-[#f3dfae] bg-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.7)]'
                          : isCutoff
                            ? 'border-[#c59a4b] bg-[#120401]'
                            : 'border-[#5c2b12] bg-[#120401]',
                    ].join(' ')}
                  />
                  <div className="mt-4 min-h-[4.25rem] w-[168px] text-center">
                    {isCutoff && (
                      <p
                        className={[
                          'text-xs font-bold uppercase tracking-[0.16em]',
                          isActive ? 'text-[#d4af37]' : 'text-[#c59a4b]',
                        ].join(' ')}
                      >
                        {s.short}
                        {isActive ? ' · đang xem' : ''}
                      </p>
                    )}
                    <p className="mt-1 font-serif text-lg font-bold leading-none text-[#f3dfae]">
                      {formatCutoffDate(s.iso).slice(0, 5)}
                    </p>
                    <p className="mt-1 text-xs text-[#c9b69a]">{s.lunar}</p>
                    {isCutoff && (
                      <p className="mt-0.5 text-xs text-[#c9b69a]">
                        {cutoffState(days[s.id] ?? 0) === 'closed' ? (
                          'đã qua hạn'
                        ) : (
                          <>
                            còn{' '}
                            <span className="font-semibold text-[#f3dfae]">
                              {daysRemaining(days[s.id] ?? 0)}
                            </span>{' '}
                            ngày
                          </>
                        )}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bản dọc cho màn hẹp: cùng dữ liệu, xếp thành cột có mốc */}
          <ol className="mt-6 space-y-0 md:hidden">
            {zoomStations.map((s) => {
              const isActive = s.id === active.id;
              const isCutoff = s.id === 'lien_tinh' || s.id === 'noi_thanh';
              return (
                <li key={s.id} className="flex gap-3 border-t border-[#381a0b] py-3 first:border-t-0">
                  <span
                    aria-hidden
                    className={[
                      'mt-1 h-3 w-3 shrink-0 rotate-45 border',
                      s.id === 'tet'
                        ? 'border-[#f3dfae] bg-[#861b1b]'
                        : isActive
                          ? 'border-[#f3dfae] bg-[#d4af37]'
                          : 'border-[#c59a4b] bg-transparent',
                    ].join(' ')}
                  />
                  <div className="min-w-0 flex-1">
                    {/* Với mốc Mùng 1 Tết, `short` và `lunar` trùng nhau — in cả hai sẽ ra
                        "Mùng 1 Tết · Mùng 1 Tết". Chỉ ghép khi hai chuỗi thật sự khác. */}
                    <p className="text-xs text-[#c9b69a]">
                      {s.short === s.lunar ? s.short : `${s.short} · ${s.lunar}`}
                    </p>
                    <p className="font-serif text-base font-bold text-[#f3dfae]">
                      {formatCutoffWeekday(s.iso)}, {formatCutoffDate(s.iso)}
                    </p>
                  </div>
                  {isCutoff && (
                    <p className="shrink-0 text-xs text-[#c9b69a]">
                      {cutoffState(days[s.id] ?? 0) === 'closed' ? (
                        'đã qua hạn'
                      ) : (
                        <>
                          còn{' '}
                          <span className="font-semibold text-[#f3dfae]">
                            {daysRemaining(days[s.id] ?? 0)}
                          </span>{' '}
                          ngày
                        </>
                      )}
                    </p>
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        {/* ------------------------------------------------ bảng điều khiển */}
        <div className="order-1 mt-0 overflow-hidden rounded-2xl border border-[#5c2b12] bg-[#5c2b12] lg:order-2 lg:mt-10">
        <div className="grid grid-cols-1 gap-px lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_minmax(0,0.9fr)]">
          {/* 1. nơi nhận */}
          <div className="order-1 bg-[#180702] p-4 lg:p-5">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#c9b69a]">
              <MapPin aria-hidden className="h-4 w-4 text-[#c59a4b]" />
              Quà gửi tới đâu?
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {DELIVERY_WINDOWS.map((w) => {
                const selected = w.id === active.id;
                return (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => setWindowId(w.id)}
                    aria-pressed={selected}
                    className={[
                      'rounded-xl border px-3 py-3 text-left transition-colors duration-200',
                      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4af37]',
                      selected
                        ? 'border-[#c59a4b] bg-[#120401] shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                        : 'border-[#5c2b12] bg-[#120401] hover:border-[#78502a]',
                    ].join(' ')}
                  >
                    <span className="block text-sm font-bold text-[#f3dfae]">{w.label}</span>
                    <span className="mt-1 block text-xs leading-snug text-[#c9b69a]">{w.scope}</span>
                    {/* Cửa sổ đã đóng phải tự nói ra, thay vì để người dùng chọn rồi mới biết. */}
                    {cutoffState(days[w.id] ?? 0) === 'closed' ? (
                      <span className="mt-1 block text-xs font-semibold text-[#e08a8a]">
                        Đã qua hạn chốt
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. hành động — trên màn hẹp ô này được đưa LÊN trước ô giải thích (order-2): người
              dùng điện thoại phải chạm được nút chốt đơn trong màn đầu, còn phần giải thích
              dài (thứ trong tuần, phạm vi, ghi chú COD) đọc sau cũng không mất gì. */}
          <div className="order-2 flex flex-col justify-center gap-2 bg-[#180702] p-4 sm:gap-3 lg:order-3 lg:p-5">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-4xl font-bold leading-none text-[#d4af37] sm:text-5xl">
                {activeDaysShown}
              </span>
              <span className="text-xs uppercase tracking-[0.16em] text-[#c9b69a]">
                {state === 'closed' ? (
                  'ngày đã qua'
                ) : (
                  <>
                    ngày
                    <br />
                    còn lại
                  </>
                )}
              </span>
            </div>
            {/* Hành động phải khớp sự thật: sau khi hết hạn giao kịp Tết thì không được mời
                "chọn hộp quà giao kịp Tết" nữa. Halo vàng chỉ ở hover — The Offset-Or-State Rule. */}
            {pageClosed ? (
              <Link
                href="/san-pham"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#c59a4b] bg-[#210c04] px-3 py-3 text-xs font-bold uppercase tracking-wider text-[#f3dfae] transition-colors hover:border-[#d4af37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3dfae] sm:px-5"
              >
                <PackageCheck aria-hidden className="h-4 w-4" />
                Xem toàn bộ sản phẩm
              </Link>
            ) : (
              <Link
                href="/san-pham?danh_muc=hop-qua-tet"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#b8863b] via-[#d4af37] to-[#b8863b] px-3 py-3 text-center text-xs font-bold uppercase tracking-wider text-[#120401] transition hover:brightness-110 hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3dfae] sm:px-5"
              >
                <PackageCheck aria-hidden className="h-4 w-4 shrink-0" />
                Chọn hộp quà giao kịp Tết
              </Link>
            )}
          </div>

          {/* 3. phán quyết — phần giải thích, xuống dưới nút trên màn hẹp */}
          <div className="order-3 bg-[#210c04] p-4 lg:order-2 lg:p-5">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#c9b69a]">
              <CalendarClock aria-hidden className="h-4 w-4 text-[#c59a4b]" />
              Hạn chốt
            </p>
            <p
              className={[
                'mt-3 font-serif text-2xl font-bold leading-tight',
                state === 'closed' ? 'text-[#c9b69a]' : 'text-[#f3dfae]',
              ].join(' ')}
            >
              {verdict}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#c9b69a]">
              {active.lunar} — <span className="font-semibold text-[#f3dfae]">{formatCutoffDate(active.iso)}</span>
              <br />
              {formatCutoffWeekday(active.iso)}, áp dụng cho {active.scope}
            </p>
          </div>
        </div>

        {/* Dải đáy: ghi chú và link phụ của CẢ bảng, không phải của riêng ô nào.
            Chúng nằm ở đây vì hai lý do đo được: (1) trong ô hẹp 457px ghi chú xuống 3 dòng và
            để lại 40px trống; (2) chúng chính là thứ khiến ô "hành động" cao nhất, kéo cả ba ô
            lên 216px và đẩy 81px trống sang ô chọn nơi nhận. Đưa xuống đây thì ô cao nhất còn
            khoảng 115px và khoảng trống gần như hết. */}
        {/* `border-t` để mọi vạch chia bên trong bảng đều là cùng một đường 1px lá mạ — nếu
            không, dải đáy cùng màu #180702 với ô hành động phía trên sẽ dính vào nó. */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-[#5c2b12] bg-[#180702] px-4 py-2 lg:px-5">
          {state === 'closed' ? (
            <p className="max-w-3xl text-sm leading-relaxed text-[#e08a8a]">
              Nơi nhận này đã quá hạn chốt — quà vẫn đặt được nhưng sẽ tới sau Tết.
              {!pageClosed
                ? ' Nếu quà gửi trong Hà Nội, Đà Nẵng hoặc TP. Hồ Chí Minh, chọn “Nội thành” để xem hạn còn lại.'
                : ''}
            </p>
          ) : (
            <p className="max-w-3xl text-sm leading-relaxed text-[#c9b69a]">
              Đơn trả tiền khi nhận hàng, hoặc chuyển khoản/QR, đặt trước hạn này đều được xếp giao
              kịp Tết.
            </p>
          )}
          <Link
            href="/van-chuyen"
            className="ml-auto inline-flex min-h-11 shrink-0 items-center justify-center gap-1 text-xs font-semibold text-[#c9b69a] transition-colors hover:text-[#f3dfae]"
          >
            Phí vận chuyển &amp; hạn chốt Tết
            <ArrowRight aria-hidden className="h-3.5 w-3.5" />
          </Link>
        </div>
        </div>
        </div>
      </div>
    </section>
  );
}
