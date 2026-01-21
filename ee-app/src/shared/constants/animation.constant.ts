/**
 * Cấu hình hoạt ảnh chung cho các thành phần giao diện người dùng.
 * Bao gồm các thông số như độ căng, ma sát, khối lượng, và độ chính xác.
 * Cấu hình kích hoạt hoạt ảnh khi phần tử xuất hiện trong vùng nhìn thấy.
 */
export const ANIMATION_CONFIG = {
  tension: 200,
  friction: 25,
  mass: 1.2,
  clamp: false,
  precision: 0.01,
} as const;

/**
 * Cấu hình kích hoạt hoạt ảnh khi phần tử xuất hiện trong vùng nhìn thấy.
 * Bao gồm các thông số như chỉ kích hoạt một lần, ngưỡng hiển thị, và lề gốc.
 * Các trạng thái hiển thị và ẩn của phần tử với các thuộc tính CSS tương ứng.
 */

export const ANIMATION_TRIGGER_CONFIG = {
  triggerOnce: true,
  threshold: 0.05,
  rootMargin: "0px 0px -5% 0px",
} as const;

/**
 * Trạng thái hiển thị của phần tử với các thuộc tính CSS tương ứng.
 * - IS_VISIBLE: Phần tử hiển thị với độ mờ 1, không dịch chuyển, và không bị mờ.
 */

export const IS_VISIBLE = {
  opacity: 1,
  transform: "translateY(0px) scale(1)",
  filter: "blur(0px)",
};

/**
 * Trạng thái ẩn của phần tử với các thuộc tính CSS tương ứng.
 * - IS_INVISIBLE: Phần tử ẩn với độ mờ 0, dịch chuyển xuống dưới 20px, và bị mờ nhẹ.
 */

export const IS_INVISIBLE = {
  opacity: 0,
  transform: "translateY(20px) scale(0.98)",
  filter: "blur(2px)",
};
