type AnswerEvaluation = {
  index: number;
  expected: string;
  actual: string;
  isCorrect: boolean;
  point: number;
  awarded: number;
};

type EvaluateOptions = {
  caseSensitive?: boolean;
  padChar?: string;
  weights?: number[];
  defaultWeight?: number;
  totalScore?: number;
  roundTo?: number;
};

function roundAcademic(value: number, decimalPlaces = 2): number {
  const multiplier = Math.pow(10, decimalPlaces);
  return Math.round(value * multiplier) / multiplier;
}

export default function evaluateAnswer(
  correct: string,
  user: string,
  options: EvaluateOptions = {}
): {
  score: number;
  total: number;
  percentage: number;
  detail: AnswerEvaluation[];
} {
  const {
    caseSensitive = false,
    padChar = " ",
    weights,
    defaultWeight,
    totalScore,
    roundTo = 2,
  } = options;

  const maxLength = Math.max(correct.length, user.length, weights?.length ?? 0);

  const computedDefaultWeight =
    weights === undefined &&
    defaultWeight === undefined &&
    totalScore !== undefined
      ? totalScore / maxLength
      : defaultWeight ?? 1;

  const result: AnswerEvaluation[] = [];
  let score = 0;
  let total = 0;

  for (let i = 0; i < maxLength; i++) {
    let expected = correct[i] ?? padChar;
    let actual = user[i] ?? padChar;

    if (!caseSensitive) {
      expected = expected.toUpperCase();
      actual = actual.toUpperCase();
    }

    const isCorrect = expected === actual;
    const point = weights?.[i] ?? computedDefaultWeight;
    const awarded = isCorrect ? point : 0;

    score += awarded;
    total += point;

    result.push({
      index: i + 1,
      expected,
      actual,
      isCorrect,
      point: roundAcademic(point, roundTo),
      awarded: roundAcademic(awarded, roundTo),
    });
  }

  return {
    score: roundAcademic(score, roundTo),
    total: roundAcademic(total, roundTo),
    percentage: roundAcademic((score / total) * 100, roundTo),
    detail: result,
  };
}
