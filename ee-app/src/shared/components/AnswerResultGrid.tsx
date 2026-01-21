import type { AnswerEvaluation } from "@/shared/utils/evaluate-answers";

interface Props {
  detail: AnswerEvaluation[];
}

const choices = ["A", "B", "C", "D"];

export default function AnswerResultGrid({ detail }: Props) {
  return (
    <div className="grid grid-cols-2 gap-16 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {detail.map(({ index, expectedChar, actualChar }) => (
        <div key={index} className="flex flex-col items-center space-y-2">
          <span className="m-4 text-sm text-gray-500">Câu {index}</span>
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
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${bg} ${text} ${border}`}
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
