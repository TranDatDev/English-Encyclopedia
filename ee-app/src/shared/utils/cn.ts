import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 *
 * @param inputs Một mảng gồm các lớp tiện tích của Tailwind CSS cần kết hợp
 * @returns  các lớp tiện tích của Tailwind CSS đã được kết hợp và tối ưu hoá
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
