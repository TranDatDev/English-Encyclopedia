import { useEffect,useState } from "react";

import type { QuizDataCompact } from "@/shared/types/quiz.type";

export default function JsonSection({ content }: { content: QuizDataCompact }) {
  // Config
  const [isRandom, setIsRandom] = useState(false);
  const maxVal = Math.min(100, content.q.length);
  const [questionCount, setQuestionCount] = useState(maxVal);
  const [countdown, setCountdown] = useState<number | null>(null);

  // Quiz states
  const [questions, setQuestions] = useState<QuizDataCompact["q"]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Time tracking
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [lastAnswerTime, setLastAnswerTime] = useState<number>(0);
  const [questionTimes, setQuestionTimes] = useState<(number | null)[]>([]);

  // Start quiz
  const handleStart = () => {
    let list = [...content.q];
    if (isRandom) list.sort(() => Math.random() - 0.5);
    if (questionCount > 0) list = list.slice(0, questionCount);

    setQuestions(list);
    setAnswers(Array(list.length).fill(-1));
    setTimeLeft(countdown ?? null);
    setScore(null);
    setHasSubmitted(false);
    setIsStarted(true);

    // Reset time tracking
    setElapsedTime(0);
    setLastAnswerTime(0);
    setQuestionTimes(Array(list.length).fill(null));
  };

  // Submit
  const handleSubmit = () => {
    const result = questions.reduce(
      (s, q, i) => s + (answers[i] === q.a ? 1 : 0),
      0
    );
    setScore(result);
    setHasSubmitted(true);
  };

  // Reset
  const handleReset = () => {
    setIsStarted(false);
    setHasSubmitted(false);
    setScore(null);
    setTimeLeft(null);
    setAnswers([]);
    setQuestions([]);
    setElapsedTime(0);
    setLastAnswerTime(0);
    setQuestionTimes([]);
  };

  // Countdown
  useEffect(() => {
    if (!isStarted || hasSubmitted || timeLeft === null || timeLeft <= 0)
      return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);
    return () => clearInterval(timer);
  }, [isStarted, timeLeft, hasSubmitted]);

  // Auto submit when timeout
  useEffect(() => {
    if (timeLeft === 0 && !hasSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, hasSubmitted]);

  // Elapsed time (tổng thời gian làm)
  useEffect(() => {
    if (!isStarted || hasSubmitted) return;
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isStarted, hasSubmitted]);

  // Handle select
  const handleSelect = (i: number, oi: number) => {
    setAnswers((prev) => {
      const arr = [...prev];
      arr[i] = oi;
      return arr;
    });

    // Ghi lại thời gian lần đầu chọn câu
    setQuestionTimes((prev) => {
      const arr = [...prev];
      if (arr[i] === null) {
        const now = elapsedTime;
        arr[i] = now - lastAnswerTime; // thời gian làm câu này
        setLastAnswerTime(now);
      }
      return arr;
    });
  };

  if (!isStarted) {
    // Config screen
    return (
      <section className="padding-x-default my-20">
        <div className="mx-auto px-[10vw] py-[5vh] h-[50vh] bg-white shadow rounded">
          <h1 className="text-xl font-bold mb-4">
            {content.t} (Ma trận đề {content.q.length} câu)
          </h1>
          <div className="flex items-center">
            <div className="mb-4 flex-1">
              <label className="block mb-1 font-semibold">Ngẫu nhiên</label>
              <input
                type="checkbox"
                checked={isRandom}
                onChange={(e) => setIsRandom(e.target.checked)}
              />
            </div>
            <div className="mb-4 flex-1">
              <label className="block mb-1 font-semibold">Số câu:</label>
              <input
                type="number"
                min={1}
                max={Math.min(100, content.q.length)}
                value={questionCount}
                onChange={(e) => {
                  let val = Number(e.target.value);
                  const maxVal = Math.min(100, content.q.length);

                  if (val > maxVal) val = maxVal;
                  if (val < 1) val = 1;

                  setQuestionCount(val);
                }}
                className="border px-2 py-1 rounded"
              />
            </div>
            <div className="mb-4 flex-1">
              <label className="block mb-1 font-semibold">Thời gian</label>
              <input
                type="number"
                min={1}
                value={countdown ?? ""}
                onChange={(e) =>
                  setCountdown(e.target.value ? Number(e.target.value) : null)
                }
                className="border px-2 py-1 rounded"
                list="time-options"
              />
              <datalist id="time-options">
                <option value={10} label="10 giây" />
                <option value={20} label="20 giây" />
                <option value={30} label="30 giây" />
                <option value={60} label="1 phút" />
                <option value={120} label="2 phút" />
                <option value={300} label="5 phút" />
                <option value={600} label="10 phút" />
                <option value={900} label="15 phút" />
                <option value={1200} label="20 phút" />
                <option value={1800} label="30 phút" />
                <option value={3600} label="1 giờ" />
              </datalist>
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleStart}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Bắt đầu làm
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Results
  const times = questionTimes.filter((t): t is number => t !== null);
  const completed = times.length;
  const avgTime =
    completed > 0
      ? (times.reduce((s, t) => s + t, 0) / completed).toFixed(2)
      : "0";

  return (
    <section className="padding-x-default my-20">
      <div className="mx-auto px-[10vw] py-[5vh] bg-white shadow rounded">
        <h1 className="text-xl font-bold mb-4">{content.t}</h1>
        {timeLeft !== null && !hasSubmitted && (
          <p className="mb-4 font-semibold text-red-600">
            Thời gian còn lại: {timeLeft}s
          </p>
        )}

        {questions.map((q, i) => (
          <div key={i} className="mb-6 p-4 rounded shadow bg-gray-100">
            <p className="font-semibold mb-2">
              {i + 1}. {q.q}
            </p>
            {q.o.map((opt, oi) => {
              const isCorrect = hasSubmitted && q.a === oi;
              const isUserChoice = hasSubmitted && answers[i] === oi;
              return (
                <label
                  key={oi}
                  className={`block ${
                    isCorrect
                      ? "text-green-600 font-semibold"
                      : isUserChoice && q.a !== oi
                      ? "text-red-600 font-semibold"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name={`q-${i}`}
                    checked={answers[i] === oi}
                    onChange={() => handleSelect(i, oi)}
                    className="mr-2"
                    disabled={hasSubmitted}
                  />
                  {opt}
                </label>
              );
            })}
          </div>
        ))}

        {!hasSubmitted ? (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Nộp bài
          </button>
        ) : (
          <div className="mt-4">
            <p className="font-bold">
              Bạn đúng {score}/{questions.length} câu
            </p>
            <p>Tổng thời gian: {elapsedTime}s</p>
            <p>
              Hoàn thành: {completed}/{questions.length} câu
            </p>
            <p>Tốc độ trung bình: {avgTime} giây/câu</p>
            <div className="mt-2">
              <p className="font-bold">Thời gian từng câu:</p>
              <ul className="list-disc ml-6">
                {questions.map((q, i) => {
                  const t = questionTimes[i];
                  const isCorrect = answers[i] === q.a;
                  let feedback = "";

                  if (t !== null) {
                    if (isCorrect) {
                      if (t <= 15) feedback = "Rất nhanh và chính xác 👏";
                      else if (t <= 30)
                        feedback = "Tốc độ tốt, làm chắc chắn 👍";
                      else
                        feedback =
                          "Đúng nhưng hơi chậm – cần cải thiện tốc độ ⏱️";
                    } else {
                      if (t <= 15)
                        feedback = "Nhanh nhưng ẩu – cần cẩn thận hơn ⚠️";
                      else if (t <= 30)
                        feedback = "Sai – cần ôn tập lại kiến thức 📚";
                      else
                        feedback = "Vừa chậm vừa sai – nên luyện tập thêm 💡";
                    }
                  }

                  return (
                    <li key={i}>
                      Câu {i + 1}:{" "}
                      {t !== null ? `${t} giây – ${feedback}` : "chưa làm"}
                    </li>
                  );
                })}
              </ul>
            </div>
            <button
              onClick={handleReset}
              className="mt-2 px-4 py-2 bg-gray-500 text-white rounded"
            >
              Làm lại
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
