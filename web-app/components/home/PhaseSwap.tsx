'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { tetPhase, type TetPhase } from '@/lib/tet';

interface PhaseSwapProps {
  /** Trạng thái do server tính, để bản render đầu khớp với HTML đã gửi đi. */
  initialPhase: TetPhase;
  /** Nội dung khi còn nhận được đơn giao kịp Tết. */
  open: ReactNode;
  /** Nội dung khi đã qua hạn chốt. */
  closed: ReactNode;
}

/**
 * Đổi nội dung theo TRẠNG THÁI HẠN CHỐT sống.
 *
 * Vì sao cần component này: `app/(shop)/page.tsx` là Server Component, nên mọi câu chữ phụ thuộc
 * thời gian ở đó chỉ được tính **một lần** lúc server render. Khách để tab mở qua thời điểm hạn
 * chốt thì bảng điều khiển (client, tự tính lại mỗi phút) đã chuyển sang "đã qua hạn", trong khi
 * phần còn lại của trang vẫn mời "Chọn hộp quà giao kịp Tết" — trang tự nói hai điều trái nhau.
 *
 * Component này tính lại cùng nhịp 60 giây đó, nên toàn trang đổi trạng thái cùng lúc.
 */
export function PhaseSwap({ initialPhase, open, closed }: PhaseSwapProps) {
  const [phase, setPhase] = useState<TetPhase>(initialPhase);

  useEffect(() => {
    const refresh = () => setPhase(tetPhase());
    refresh();
    const id = window.setInterval(refresh, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return <>{phase === 'da-qua-han' ? closed : open}</>;
}
