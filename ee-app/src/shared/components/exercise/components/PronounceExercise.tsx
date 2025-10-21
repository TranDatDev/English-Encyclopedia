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
import type {
  ExerciseSet,
  PronounceExerciseData,
} from "@/shared/types/exercise.type";
import { shuffleArray } from "@/shared/utils/shuffle";

const PronounceExercise: React.FC<{
  exercise: ExerciseSet<PronounceExerciseData>;
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
        {shuffledData.map(
          ([words, ipaList, correctIndex, explanation], qIndex) => {
            const userChose =
              answers[qIndex] !== null && answers[qIndex] !== undefined;

            return (
              <section
                key={qIndex}
                id={`question-${qIndex + 1}`}
                className="mb-8 flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-md"
              >
                <h2 className="mb-4 font-semibold text-gray-800">
                  {qIndex + 1}. Chọn từ có phát âm khác:
                </h2>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {words.map((word, i) => {
                    const isSelected = answers[qIndex] === i;
                    const isCorrect = i === correctIndex;

                    return (
                      <div className="flex w-full flex-col" key={i}>
                        <button
                          onClick={() => {
                            const newAns = [...answers];
                            newAns[qIndex] = i;
                            setAnswers(newAns);
                          }}
                          className={`flex cursor-pointer flex-col items-center rounded-lg border px-4 py-3 font-medium transition ${
                            isSelected
                              ? isCorrect
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white"
                              : "border-gray-400 bg-white hover:bg-gray-100"
                          }`}
                        >
                          <span>
                            {optionLabels[i]}.{" "}
                            {word.split(/(_[^_]+_)/g).map((part, j) =>
                              part.startsWith("_") && part.endsWith("_") ? (
                                <span key={j} className="font-bold underline">
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

                {userChose && (
                  <div className="mt-4">
                    <p className="font-semibold text-gray-800">
                      Đáp án đúng: {optionLabels[correctIndex]} —{" "}
                      {words[correctIndex]}
                    </p>
                    <p className="mt-1 text-sm text-gray-700 italic">
                      {ipaList[correctIndex]}
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
