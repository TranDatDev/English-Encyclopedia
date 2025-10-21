import type { AnswerEvaluation } from "@/shared/utils/evaluateAnswers";

interface Props {
  detail: AnswerEvaluation[];
}

const choices = ["A", "B", "C", "D"];

export default function AnswerResultGrid({ detail }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-16 p-4">
      {detail.map(({ index, expectedChar, actualChar }) => (
        <div key={index} className="flex flex-col items-center space-y-2">
          <span className="text-sm text-gray-500 m-4">Câu {index}</span>
          <div className="flex gap-1">
            {choices.map((choice) => {
              const isExpected = choice === expectedChar;
              const isSelected = choice === actualChar;

              let bg = "bg-white";
              let text = "text-gray-700";
              let border = "border border-gray-300";

              if (isExpected) {
                bg = "bg-green-500";
                text = "text-white";
                border = "border-green-600";
              } else if (!isExpected && isSelected) {
                bg = "bg-red-500";
                text = "text-white";
                border = "border-red-600";
              }

              return (
                <div
                  key={choice}
                  className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-sm ${bg} ${text} ${border}`}
                >
                  {choice}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
