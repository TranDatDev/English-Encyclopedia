import { useEffect, useMemo, useState } from "react";

import { ExerciseSimpleSpeak } from "@/shared/components/exercise/components/ExerciseSimpleSpeak";
import { usePronounce } from "@/shared/hooks/usePronounce";
import { useTimer } from "@/shared/hooks/useTimer";
import {
  ExerciseLayout,
  ExerciseLayoutLeft,
  ExerciseLayoutMain,
  ExerciseLayoutRight,
} from "@/shared/layouts/ExerciseLayout";
import type {
  ExerciseSet,
  MultipleChoiceData,
} from "@/shared/types/exercise.type";

const MultipleChoiceExercise: React.FC<{
  exercise?: ExerciseSet<MultipleChoiceData>;
  randomize?: boolean;
  oneTryOnly?: boolean;
  timerSeconds?: number;
}> = ({
  exercise,
  randomize = false,
  oneTryOnly = false,
  timerSeconds = 0,
}) => {
  const { title, data = [] } = exercise || { title: "", data: [] };

  // Shuffle nếu bật randomize
  const shuffledData = useMemo(() => {
    if (!randomize) return data;
    const copy = [...data];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }, [data, randomize]);

  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  useEffect(() => {
    setUserAnswers(new Array(shuffledData.length).fill(null));
  }, [shuffledData]);

  const optionLabels = ["A", "B", "C", "D"];

  // Hook tùy chỉnh phát âm trên browser
  const {
    volume,
    rate,
    preference,
    handleChangeRate,
    handleChangeVolume,
    handleChangePreference,
  } = usePronounce();

  // Tính điểm
  const [point, setPoint] = useState(0);
  useEffect(() => {
    let score = 0;
    userAnswers.forEach((ans, index) => {
      if (ans === shuffledData[index][2]) score++;
    });
    setPoint((score / shuffledData.length) * 10);
  }, [userAnswers, shuffledData]);

  const hasTimer = timerSeconds !== undefined && timerSeconds > 0;
  const { secondsLeft } = useTimer(timerSeconds, hasTimer);
  const isTimeUp = hasTimer && secondsLeft <= 0;
  return (
    <ExerciseLayout>
      <ExerciseLayoutLeft>
        <section>
          {title && (
            <h1 className="mb-4 text-xl font-bold text-blue-800">{title}</h1>
          )}
          <h2 className="mt-4 mb-2 text-lg font-semibold text-gray-700">
            Hướng dẫn
          </h2>
          <p className="text-sm text-gray-600">
            Chọn đáp án đúng nhất để hoàn thành câu. Sau khi chọn, hệ thống sẽ
            hiển thị kết quả và giải thích.
          </p>

          <h2 className="mt-6 mb-2 text-lg font-semibold text-gray-700">
            Mẹo và thủ thuật
          </h2>
          <ul className="list-inside list-disc text-sm text-gray-600">
            <li className="mb-2">Hãy đọc kỹ câu hỏi để xác định ngữ cảnh.</li>
            <li className="mb-2">
              Lắng nghe phát âm để phân biệt các từ dễ gây nhầm lẫn.
            </li>
            <li className="mb-2">Dùng các dấu hiệu ngữ pháp để loại trừ.</li>
          </ul>
          {hasTimer && (
            <div className="mb-4 flex justify-end">
              <div
                className={`rounded-xl px-4 py-2 font-semibold text-white ${
                  secondsLeft <= 10 ? "bg-red-500" : "bg-blue-600"
                }`}
              >
                {!isTimeUp && hasTimer ? (
                  <>Thời gian còn lại: {secondsLeft}s</>
                ) : (
                  "Hết thời gian!"
                )}
              </div>
            </div>
          )}
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold text-gray-700">
            Cài đặt phát âm
          </h2>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Âm lượng: {Math.round(volume * 100)}%
            </label>
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.05"
              value={volume}
              onChange={handleChangeVolume}
              className="w-full"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Tốc độ: {rate.toFixed(2)}x
            </label>
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.05"
              value={rate}
              onChange={handleChangeRate}
              className="w-full"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Ưu tiên giọng:
            </label>
            <select
              value={preference}
              onChange={handleChangePreference}
              className="w-full rounded border border-gray-300 p-2"
            >
              <option value="bre-m">Anh-Anh Nam (British Male)</option>
              <option value="bre-f">Anh-Anh Nữ (British Female)</option>
              <option value="ame-m">Anh-Mỹ Nam (American Male)</option>
              <option value="ame-f">Anh-Mỹ Nữ (American Female)</option>
            </select>
          </div>
        </section>
      </ExerciseLayoutLeft>

      <ExerciseLayoutMain>
        {shuffledData.map(
          ([sentence, options, correctIndex, explanation], qIndex) => {
            const userChose =
              userAnswers[qIndex] !== null && userAnswers[qIndex] !== undefined;
            const opts = options.split("/");

            return (
              <section
                key={qIndex}
                id={`question-${qIndex + 1}`}
                className="mb-8 flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-md"
              >
                <h2 className="md:text-md mb-4 font-semibold text-gray-800 lg:text-lg">
                  {qIndex + 1}.{" "}
                  {sentence
                    .replace("~", "..........")
                    .replace("Ø", "")
                    .split(/(_.*?_)/)
                    .map((part, i) =>
                      part.startsWith("_") && part.endsWith("_") ? (
                        <span key={i} className="font-bold underline">
                          {part.slice(1, -1)}
                        </span>
                      ) : (
                        part
                      ),
                    )}
                </h2>
                <ExerciseSimpleSpeak
                  text={sentence.replace("~", "______")}
                  volume={volume}
                  rate={rate}
                  preference={preference}
                />

                <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {opts.map((opt, i) => {
                    const isSelected = userAnswers[qIndex] === i;
                    const isCorrect = i === correctIndex;
                    return (
                      <div key={i} className="flex flex-col">
                        <button
                          disabled={
                            isTimeUp ||
                            (oneTryOnly && userAnswers[qIndex] !== null)
                          }
                          onClick={() => {
                            if (isTimeUp) return;
                            if (oneTryOnly && userAnswers[qIndex] !== null)
                              return;
                            const newAns = [...userAnswers];
                            newAns[qIndex] = i;
                            setUserAnswers(newAns);
                          }}
                          className={`flex flex-col items-center rounded-lg border px-4 py-3 font-medium transition ${
                            isSelected
                              ? isCorrect
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white"
                              : oneTryOnly && userAnswers[qIndex] !== null
                                ? "cursor-not-allowed bg-gray-200 text-gray-400"
                                : isTimeUp
                                  ? "cursor-not-allowed bg-gray-300 text-gray-500"
                                  : "border-gray-400 bg-white hover:bg-gray-100"
                          }`}
                        >
                          <span>
                            {optionLabels[i]}. {opt}
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </div>

                {userChose && (
                  <div className="mt-4">
                    <p className="font-semibold text-gray-800">
                      Đáp án đúng: {optionLabels[correctIndex]} —{" "}
                      {opts[correctIndex]}
                    </p>
                    <p className="mt-2 text-sm text-gray-700 italic">
                      Câu hoàn chỉnh:{" "}
                      {sentence
                        .replace("~", opts[correctIndex])
                        .replace(/\([^)]*\)/g, "") // loại bỏ mọi nội dung trong dấu ()
                        .replace(/\s{2,}/g, " ") // xóa khoảng trắng thừa
                        .trim()}
                      <ExerciseSimpleSpeak
                        text={sentence
                          .replace("~", opts[correctIndex])
                          .replace(/\([^)]*\)/g, "") // loại bỏ mọi nội dung trong dấu ()
                          .replace(/\s{2,}/g, " ") // xóa khoảng trắng thừa
                          .trim()}
                        volume={volume}
                        rate={rate}
                        preference={preference}
                      />
                    </p>
                    {explanation && (
                      <p className="mt-3 text-gray-700 italic">{explanation}</p>
                    )}
                  </div>
                )}
              </section>
            );
          },
        )}
      </ExerciseLayoutMain>

      <ExerciseLayoutRight>
        <section>
          <div>
            <h3 className="mb-4 text-center font-semibold text-green-800">
              Bảng tổng hợp
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {shuffledData.map(([_, __, correctIndex], i) => {
                const ans = userAnswers[i];
                let bg = "bg-gray-200 text-gray-700";
                if (ans !== null && ans !== undefined) {
                  bg =
                    ans === correctIndex
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white";
                }
                return (
                  <a
                    key={i}
                    href={`#question-${i + 1}`}
                    className={`block rounded p-2 text-center text-sm font-medium ${bg} transition-transform hover:scale-105`}
                  >
                    <div>Câu {i + 1}</div>
                    {ans !== null && (
                      <div className="text-xs">
                        Đáp án: {optionLabels[correctIndex]}
                      </div>
                    )}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="mt-6 border-t pt-4 text-center">
            <p className="text-lg font-semibold text-gray-800">
              Điểm số của bạn:
            </p>
            <p className="text-3xl font-bold text-blue-600">
              {point.toFixed(2)}
            </p>
          </div>
        </section>
      </ExerciseLayoutRight>
    </ExerciseLayout>
  );
};

export default MultipleChoiceExercise;
