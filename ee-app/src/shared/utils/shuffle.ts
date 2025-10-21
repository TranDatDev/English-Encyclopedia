/**
 * Hoán đổi thứ tự phần tử trong mảng (Fisher–Yates shuffle)
 * @param array Mảng đầu vào
 * @returns Mảng mới đã được xáo trộn
 */
export function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
