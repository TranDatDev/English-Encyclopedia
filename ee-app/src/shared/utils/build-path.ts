/**
 * Hàm xây dựng đường dẫn từ các phần cơ bản
 * @param base  Chuỗi đường dẫn cơ sở
 * @param sub  Chuỗi phụ mục (nếu có)
 * @param slug Chuỗi slug cần thêm vào đường dẫn (nếu có)
 * @returns Chuỗi đường dẫn hoàn chỉnh
 */

export const buildPath = (base: string, sub?: string, slug?: string) =>
  `${base}${sub ? `/${sub}` : ""}${slug ? `/${slug}` : ""}`;
