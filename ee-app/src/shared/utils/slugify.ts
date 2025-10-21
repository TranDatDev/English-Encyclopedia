/**
 * Hàm chuyển đổi chuỗi thành dạng slug
 * @param str Chuỗi đầu vào
 * @returns Chuỗi đã được slugify
 */

export default function slugify(str: string): string {
  return str
    .normalize("NFD") // tách dấu khỏi chữ
    .replace(/[\u0300-\u036f]/g, "") // bỏ dấu
    .replace(/đ/g, "d") // đ -> d
    .replace(/Đ/g, "d") // Đ -> d
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // chỉ giữ a-z, số, space, -
    .replace(/\s+/g, "-") // space -> -
    .replace(/-+/g, "-") // nhiều - thành 1
    .replace(/^-+|-+$/g, ""); // bỏ - ở đầu/cuối
}
