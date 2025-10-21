import { useEffect, useMemo, useState } from "react";

import { shuffleArray } from "@/shared/utils/shuffle";

/**
 * Hook tùy chỉnh để quản lý bài tập
 * @param data Dữ liệu câu hỏi
 * @param randomizeQuestion Tùy chọn xáo trộn câu hỏi
 * @param randomizeAnswer Tùy chọn xáo trộn đáp án
 * @param getAnswers Hàm lấy mảng đáp án từ câu hỏi
 * @param getCorrectIndex Hàm lấy chỉ số đáp án đúng từ câu hỏi
 * @returns Đối tượng chứa câu hỏi đã xử lý, đáp án người dùng và điểm số
 */

export function useExercise<T>({
  data = [],
  randomizeQuestion = false,
  randomizeAnswer = false,
  getAnswers,
  getCorrectIndex,
}: {
  data?: T[];
  randomizeQuestion?: boolean;
  randomizeAnswer?: boolean;
  getAnswers?: (item: T) => any[]; // cách lấy mảng đáp án
  getCorrectIndex?: (item: T) => number; // cách lấy index đúng
}) {
  // --- Trộn câu hỏi
  const questions = useMemo(() => {
    let q = [...data];
    if (randomizeQuestion) q = shuffleArray(q);
    return q.map((item) => {
      if (!randomizeAnswer || !getAnswers) return item;

      // Nếu có hàm getAnswers thì trộn cả phần đáp án
      const answers = getAnswers(item);
      const correctIndex = getCorrectIndex ? getCorrectIndex(item) : -1;

      if (!answers || correctIndex === -1) return item;

      const indexed = answers.map((a, i) => ({ a, i }));
      const shuffled = shuffleArray(indexed);
      const newAnswers = shuffled.map((s) => s.a);
      const newCorrectIndex = shuffled.findIndex((s) => s.i === correctIndex);

      return {
        ...item,
        shuffledAnswers: newAnswers,
        shuffledCorrectIndex: newCorrectIndex,
      };
    });
  }, [data, randomizeQuestion, randomizeAnswer, getAnswers, getCorrectIndex]);

  // --- Quản lý state đáp án
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  useEffect(() => {
    setAnswers(new Array(questions.length).fill(null));
  }, [questions]);

  // --- Tính điểm
  const [score, setScore] = useState(0);
  useEffect(() => {
    if (!getCorrectIndex) return;
    let correctCount = 0;
    questions.forEach((q: any, i) => {
      const correct =
        randomizeAnswer && q.shuffledCorrectIndex !== undefined
          ? q.shuffledCorrectIndex
          : getCorrectIndex(q);
      if (answers[i] === correct) correctCount++;
    });
    setScore((correctCount / questions.length) * 10);
  }, [answers, questions, getCorrectIndex, randomizeAnswer]);

  return {
    questions,
    answers,
    setAnswers,
    score,
  };
}
