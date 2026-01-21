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
import type { ExerciseSet, StressData } from "@/shared/types/exercise.type";
import { shuffleArray } from "@/shared/utils/shuffle";

const StressExercise: React.FC<{
  exercise: ExerciseSet<StressData>;
  randomize?: boolean;
}> = ({ exercise, randomize = false }) => {
  const { title, data = [] } = exercise;

  // Xáo trộn dữ liệu
  const shuffledData = useMemo(() => {
    return randomize ? shuffleArray(data) : data;
  }, [data, randomize]);

  // Khởi tạo câu trả lời
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  useEffect(() => {
    setAnswers(new Array(shuffledData.length).fill(null));
  }, [shuffledData]);

  // Nhãn lựa chọn
  const optionLabels = ["A", "B", "C", "D"];

  // Hook phát âm
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
    answers.forEach((ans, index) => {
      if (ans === shuffledData[index][3]) {
        score += 1;
      }
    });
    setPoint((score / shuffledData.length) * 10);
  }, [answers, shuffledData]);
  return (
    <ExerciseLayout>
      <ExerciseLayoutLeft>
        <StressExerciseTutorial title={title || ""} />
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
          ([words, ipaList, stressPos, correctIndex, explanation], qIndex) => {
            const userChose =
              answers[qIndex] !== null && answers[qIndex] !== undefined;

            return (
              <section
                key={qIndex}
                id={`question-${qIndex + 1}`}
                className="mb-8 flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-md"
              >
                <h2 className="mb-4 font-semibold text-gray-800">
                  {qIndex + 1}. Chọn từ có trọng âm khác:
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
                            {optionLabels[i]}. {word}
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
                              text={word}
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
                      {ipaList[correctIndex]} (âm {stressPos[correctIndex]})
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
          correctIndexExtractor={(item) => item[3]}
          optionLabels={optionLabels}
          point={point}
        />
      </ExerciseLayoutRight>
    </ExerciseLayout>
  );
};

export default StressExercise;

const StressExerciseTutorial = ({ title }: { title: string }) => (
  <section>
    {title && <h1 className="text-xl font-bold text-blue-800">{title}</h1>}

    <div className="mt-6">
      <h2 className="mb-3 text-lg font-semibold text-gray-700">Hướng dẫn</h2>
      <p className="text-sm text-gray-600">
        Với mỗi câu, hãy chọn từ có trọng âm khác với các từ còn lại.
      </p>
    </div>

    <div className="mt-6">
      <h2 className="mb-3 text-lg font-semibold text-gray-700">
        Mẹo và thủ thuật
      </h2>
      <ul className="list-inside list-disc text-sm text-gray-600">
        <li className="mb-2">
          Với các từ có 2 âm tiết, chú ý loại từ vì nó ảnh hưởng đến vị trí
          trọng âm.
        </li>
        <li className="mb-2">
          Với từ có 3 âm tiết trở lên, để ý tiền tố và hậu tố — chúng thường
          không mang trọng âm.
        </li>
      </ul>
    </div>
  </section>
);
