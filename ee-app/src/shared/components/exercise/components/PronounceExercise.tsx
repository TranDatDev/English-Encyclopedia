import { useEffect, useMemo, useState } from "react";

import {
  ExercisePronounceSettings,
  ExerciseSimpleSpeak,
  ExerciseSummary,
} from "@/shared/components/exercise";
import { usePronounce } from "@/shared/hooks/usePronounce";
import {
  ExerciseLayout,
  ExerciseLayoutLeft,
  ExerciseLayoutMain,
  ExerciseLayoutRight,
} from "@/shared/layouts/ExerciseLayout";
import type { ExerciseSet, PronounceData } from "@/shared/types/exercise.type";
import { shuffleArray } from "@/shared/utils/shuffle";

const PronounceExercise: React.FC<{
  exercise: ExerciseSet<PronounceData>;
  randomize?: boolean;
}> = ({ exercise, randomize = false }) => {
  const { title, data = [] } = exercise;

  // Xáo trộn câu hỏi nếu được yêu cầu
  const shuffledData = useMemo(() => {
    if (!randomize) return data;
    return shuffleArray(data);
  }, [data, randomize]);

  const [answers, setAnswers] = useState<(number | null)[]>([]);
  useEffect(() => {
    setAnswers(new Array(shuffledData.length).fill(null));
  }, [shuffledData]);

  // Thứ tự nhãn đáp án cho từng câu hỏi
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

  const [point, setPoint] = useState(0);
  useEffect(() => {
    let score = 0;
    answers.forEach((ans, i) => {
      if (ans === shuffledData[i][2]) score++;
    });
    setPoint((score / shuffledData.length) * 10);
  }, [answers, shuffledData]);

  return (
    <ExerciseLayout>
      <ExerciseLayoutLeft>
        <PronounceExerciseTutorial title={title || ""} />
        <ExercisePronounceSettings
          volume={volume}
          rate={rate}
          preference={preference}
          onVolumeChange={handleChangeVolume}
          onRateChange={handleChangeRate}
          onPreferenceChange={handleChangePreference}
        />
      </ExerciseLayoutLeft>

      <ExerciseLayoutMain>
        <h1 className="pb-8 text-xl font-bold italic dark:text-white">
          Choose the word whose underlined part is pronounced differently from
          that of the others by clicking the corresponding letter A, B, C, or D.
        </h1>
        <section className="bg-white-900 dark:bg-black-900 border-black-100 dark:border-white-100 mb-8 rounded-lg border py-4 shadow-lg dark:text-white">
          {shuffledData.map(
            ([words, ipaList, correctIndex, explanation], qIndex) => {
              const userChose =
                answers[qIndex] !== null && answers[qIndex] !== undefined;

              return (
                <section className="p-2 lg:p-8">
                  <div
                    key={qIndex}
                    id={`question-${qIndex + 1}`}
                    className="flex items-center justify-between"
                  >
                    <h2 className="text-black-800 dark:text-white-800 py-4 font-semibold lg:p-0">
                      {qIndex + 1}.
                    </h2>

                    <div className="grid w-full grid-cols-2 gap-2 lg:grid-cols-4">
                      {words.map((word, i) => {
                        const isSelected = answers[qIndex] === i;
                        const isCorrect = i === correctIndex;

                        return (
                          <div className="flex flex-col px-4" key={i}>
                            <button
                              onClick={() => {
                                const newAns = [...answers];
                                newAns[qIndex] = i;
                                setAnswers(newAns);
                              }}
                              className={`flex cursor-pointer flex-col items-center rounded-lg border px-4 py-3 font-medium transition ${
                                isSelected
                                  ? isCorrect
                                    ? "text-white-900 dark:text-black-900 bg-green-500"
                                    : "bg-red-500 text-white dark:text-black"
                                  : "bg-white-900 dark:bg-black-900 dark:hover:bg-black-800 border-gray-400 hover:bg-white"
                              }`}
                            >
                              <span>
                                {optionLabels[i]}.{" "}
                                {word.split(/(_[^_]+_)/g).map((part, j) =>
                                  part.startsWith("_") && part.endsWith("_") ? (
                                    <span
                                      key={j}
                                      className="font-bold underline"
                                    >
                                      {part.slice(1, -1)}
                                    </span>
                                  ) : (
                                    <span key={j}>{part}</span>
                                  ),
                                )}
                              </span>
                              {userChose && (
                                <p className="mt-1 text-sm text-gray-700 italic">
                                  {ipaList[i]}
                                </p>
                              )}
                            </button>

                            {userChose && (
                              <div className="mx-auto mt-2">
                                <ExerciseSimpleSpeak
                                  text={words[i].replace(/_/g, "")}
                                  volume={volume}
                                  rate={rate}
                                  preference={preference}
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {userChose && (
                    <div className="text-center">
                      <span className="mx-4 font-semibold text-gray-800">
                        Đáp án đúng: {optionLabels[correctIndex]} —{" "}
                        {words[correctIndex]}
                      </span>
                      <span className="mx-4 mt-1 text-sm text-gray-700 italic">
                        {ipaList[correctIndex]}
                      </span>
                      {explanation && (
                        <span className="mx-4 mt-3 text-gray-700 italic">
                          {explanation}, khác với các từ còn lại.
                        </span>
                      )}
                    </div>
                  )}
                </section>
              );
            },
          )}
        </section>
      </ExerciseLayoutMain>
      <ExerciseLayoutRight>
        <ExerciseSummary
          shuffledData={shuffledData}
          answers={answers}
          correctIndexExtractor={(item) => item[2]}
          optionLabels={optionLabels}
          point={point}
        />
      </ExerciseLayoutRight>
    </ExerciseLayout>
  );
};

export default PronounceExercise;

const PronounceExerciseTutorial = ({ title }: { title: string }) => {
  return (
    <section>
      {title && <h1 className="text-xl font-bold text-blue-800">{title}</h1>}
      <div className="mt-6">
        <h2 className="mb-3 text-lg font-semibold text-gray-700">Hướng dẫn</h2>
        <p className="text-sm text-gray-600">
          Chọn từ có âm phát âm khác so với các từ còn lại trong nhóm.
        </p>
      </div>
      <div className="mt-6">
        <h2 className="mb-3 text-lg font-semibold text-gray-700">
          Mẹo luyện âm
        </h2>
        <ul className="list-inside list-disc text-sm text-gray-600">
          <li className="mb-2">Nghe kỹ âm đầu và âm chính của mỗi từ.</li>
          <li className="mb-2">
            Chú ý các cặp âm dễ nhầm như /iː/ và /ɪ/, /θ/ và /ð/.
          </li>
          <li className="mb-2">
            Nhấn phát lại nhiều lần để cảm nhận sự khác biệt.
          </li>
        </ul>
      </div>
    </section>
  );
};
