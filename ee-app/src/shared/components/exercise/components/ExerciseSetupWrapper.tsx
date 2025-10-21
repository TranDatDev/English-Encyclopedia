import React, { useState } from "react";

interface ExerciseSetupWrapperProps<T> {
  Component: React.FC<{
    exercise: T;
    randomize?: boolean;
    oneTryOnly?: boolean;
    timerSeconds?: number;
  }>;
  exercise: T;
  defaultRandomize?: boolean;
  defaultOneTryOnly?: boolean;
  defaultTimerSeconds?: number;
}

export function ExerciseSetupWrapper<T>({
  Component,
  exercise,
}: ExerciseSetupWrapperProps<T>) {
  const [isStarted, setIsStarted] = useState(false);
  const [randomize, setRandomize] = useState(true);
  const [oneTryOnly, setOneTryOnly] = useState(true);
  const [hasTimer, setHasTimer] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState<number | undefined>();
  if (isStarted)
    return (
      <Component
        exercise={exercise}
        randomize={randomize}
        oneTryOnly={oneTryOnly}
        timerSeconds={hasTimer ? timerSeconds : undefined}
      />
    );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="h-[50vh] w-1/2 rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="mb-4 text-2xl font-bold text-blue-700">
          Cài đặt bài tập
        </h1>

        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <span className="font-medium text-gray-700">
              Trộn ngẫu nhiên câu hỏi
            </span>
            <input
              type="checkbox"
              checked={randomize}
              onChange={(e) => setRandomize(e.target.checked)}
            />
          </label>

          <label className="flex items-center justify-between">
            <span className="font-medium text-gray-700">
              Chỉ được chọn 1 lần
            </span>
            <input
              type="checkbox"
              checked={oneTryOnly}
              onChange={(e) => setOneTryOnly(e.target.checked)}
            />
          </label>
          <label className="flex items-center justify-between">
            <span className="font-medium text-gray-700">Bật hẹn giờ</span>
            <input
              type="checkbox"
              checked={hasTimer}
              onChange={(e) => {
                setHasTimer(e.target.checked);
                if (!e.target.checked) {
                  setTimerSeconds(0);
                }
              }}
            />
          </label>
          {hasTimer && (
            <label className="ml-10 flex items-center justify-between">
              <span className="font-medium text-gray-600">
                Thời gian (giây)
              </span>
              <input
                type="number"
                min={10}
                max={3600}
                list="recommended-times"
                value={timerSeconds}
                onChange={(e) => setTimerSeconds(Number(e.target.value))}
                className="w-24 rounded border border-gray-300 p-1 text-center"
              />
              <datalist id="recommended-times">
                <option value="60">1 phút (60s)</option>
                <option value="300">5 phút (300s)</option>
                <option value="600">10 phút (600s)</option>
                <option value="900">15 phút (900s)</option>
              </datalist>
            </label>
          )}
        </div>

        <button
          onClick={() => setIsStarted(true)}
          className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          Bắt đầu làm bài
        </button>
      </div>
    </div>
  );
}
