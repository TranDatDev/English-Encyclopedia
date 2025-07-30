export default function slugify(str: string): string {
  // normalize chữ tiếng Việt/accent, loại bỏ dấu
  const slug = str
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // remove diacritics
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // giữ chữ thường, số, space, dấu -
    .replace(/\s+/g, "-") // space thành -
    .replace(/-+/g, "-") // nhiều - thành 1 -
    .replace(/^-+|-+$/g, ""); // xóa - ở đầu/cuối
  return slug;
}
