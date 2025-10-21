interface ExerciseSummaryProps<T> {
  title?: string;
  shuffledData: T[];
  answers: (number | null | undefined)[];
  correctIndexExtractor: (item: T) => number;
  optionLabels: string[];
  point: number;
  labelPrefix?: string;
}

export function ExerciseSummary<T>({
  title = "Bảng tổng hợp",
  shuffledData,
  answers,
  correctIndexExtractor,
  optionLabels,
  point,
  labelPrefix = "Câu",
}: ExerciseSummaryProps<T>) {
  return (
    <div>
      {/* Phần bảng tổng hợp */}
      <h3 className="mb-4 text-center font-semibold text-green-800">{title}</h3>
      <div className="grid grid-cols-2 gap-2">
        {shuffledData.map((item, i) => {
          const correctIndex = correctIndexExtractor(item);
          const ans = answers[i];
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
              {labelPrefix} {i + 1}
              {ans !== null && ans !== undefined && (
                <div className="text-xs">
                  Đáp án: {optionLabels[correctIndex]}
                </div>
              )}
            </a>
          );
        })}
      </div>

      {/* Phần điểm số */}
      <div className="mt-6 border-t pt-4 text-center">
        <p className="text-lg font-semibold text-gray-800">Điểm số của bạn:</p>
        <p className="text-3xl font-bold text-blue-600">{point.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default ExerciseSummary;
