import { useEffect, useState } from "react";

/**
 * Hook tùy chỉnh để quản lý bộ đếm thời gian cho bài tập
 * @param initialSeconds Số giây ban đầu
 * @param isActive  Trạng thái hoạt động của bộ đếm thời gian (mặc định: true)
 * @returns  Đối tượng chứa thời gian còn lại, trạng thái chạy, và các hàm điều khiển bộ đếm thời gian
 */

export function useTimer(initialSeconds: number, isActive = true) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [running, setRunning] = useState(isActive);

  useEffect(() => {
    if (!running) return;
    if (secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [running, secondsLeft]);

  const reset = () => setSecondsLeft(initialSeconds);
  const pause = () => setRunning(false);
  const resume = () => setRunning(true);

  return { secondsLeft, running, reset, pause, resume };
}
