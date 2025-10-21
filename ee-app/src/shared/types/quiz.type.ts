// Dạng tối ưu lưu trong JSON
export interface QuizDataCompact {
  t: string;
  q: { q: string; o: string[]; a: number }[];
}
