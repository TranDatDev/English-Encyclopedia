/**
 * evaluateAnswer
 * ----------------
 * Hàm đánh giá câu trả lời của người dùng so với đáp án đúng ở mức ký tự (per-character).
 * Hỗ trợ:
 *  - Phân biệt chữ hoa/thường hoặc không (caseSensitive)
 *  - Padding ký tự khi một trong hai chuỗi ngắn hơn (paddingChar)
 *  - Trọng số cho từng vị trí ký tự (weights)
 *  - Trọng số mặc định (defaultWeight)
 *  - Cung cấp tổng điểm mong muốn (totalScore) -> sẽ chia đều cho mỗi ký tự nếu không có weights/defaultWeight
 *  - Làm tròn kết quả theo số chữ số thập phân (roundTo)
 *
 * Trả về:
 *  - score: tổng điểm đạt được (đã làm tròn)
 *  - total: tổng điểm tối đa (đã làm tròn)
 *  - percentage: phần trăm (score/total * 100) (đã làm tròn)
 *  - detail: mảng chi tiết cho từng ký tự (index bắt đầu từ 1) gồm expectedChar, actualChar, isCorrect, weightPoint, awardedPoint
 *
 * Lưu ý:
 *  - Nếu đầu vào rỗng (maxLength === 0) => trả về tất cả bằng 0 và detail rỗng
 *  - Nếu cung cấp totalScore mà maxLength > 0 và không có weights/defaultWeight => defaultWeight = totalScore / maxLength
 *
 * @example
 * const res = evaluateAnswer("ABCD", "ABCF");
 * res.score = 3, res.total = 4, res.percentage = 75, detail[3].isCorrect === true
 *
 * @example (weights / case sensitive)
 * const res2 = evaluateAnswer("HELLO", "Hello", { caseSensitive: true, weights: [2,1,1,1,2], roundTo: 1 });
 *
 * @param correctAnswer - Chuỗi đáp án đúng
 * @param userAnswer - Chuỗi câu trả lời của người dùng
 * @param options - Tuỳ chọn đánh giá
 */

// ------------------------
// Kiểu dữ liệu
// ------------------------
export type AnswerEvaluation = {
  index: number; // vị trí (bắt đầu từ 1)
  expectedChar: string; // ký tự mong đợi (sau padding nếu cần)
  actualChar: string; // ký tự thực tế từ người dùng (sau padding nếu cần)
  isCorrect: boolean; // có đúng hay không
  weightPoint: number; // trọng số (đã làm tròn theo roundTo)
  awardedPoint: number; // điểm được thưởng (đã làm tròn)
};

export type EvaluateOptions = {
  caseSensitive?: boolean; // mặc định false
  paddingChar?: string; // ký tự padding mặc định: ' '
  weights?: number[]; // mảng trọng số theo index
  defaultWeight?: number; // trọng số mặc định cho mỗi ký tự
  totalScore?: number; // tổng điểm mong muốn (nếu muốn chia đều)
  roundTo?: number; // số chữ số thập phân làm tròn (mặc định 2)
};

// ------------------------
// Helper utilities
// ------------------------

/**
 * Làm tròn một số theo decimalPlaces (vd: 2 => 2 chữ số thập phân)
 */
function roundToDecimal(value: number, decimalPlaces = 2): number {
  const multiplier = Math.pow(10, decimalPlaces);
  return Math.round(value * multiplier) / multiplier;
}

/**
 * Tính trọng số mặc định khi:
 *  - Không có weights
 *  - Không có defaultWeight
 *  - totalScore được cung cấp
 *
 * Nếu không thỏa điều kiện trên sẽ trả về defaultWeight (nếu có) hoặc 1.
 */
function getComputedDefaultWeight(
  weights: number[] | undefined,
  defaultWeight: number | undefined,
  totalScore: number | undefined,
  maxLength: number
): number {
  if (!weights && defaultWeight === undefined && totalScore !== undefined) {
    // maxLength > 0 được đảm bảo trước khi gọi
    return totalScore / maxLength;
  }
  return defaultWeight ?? 1;
}

/**
 * So sánh 2 ký tự theo tùy chọn caseSensitive.
 * Trả về isCorrect và awarded (chưa làm tròn).
 */
function compareChars(
  expected: string,
  actual: string,
  weight: number,
  caseSensitive: boolean
): { isCorrect: boolean; awarded: number } {
  const left = caseSensitive ? expected : expected.toUpperCase();
  const right = caseSensitive ? actual : actual.toUpperCase();
  const isCorrect = left === right;
  const awarded = isCorrect ? weight : 0;
  return { isCorrect, awarded };
}

// ------------------------
// Hàm chính (không export trực tiếp ở dòng khai báo) -> export ở cuối file
// ------------------------

export function evaluateAnswer(
  correctAnswer: string,
  userAnswer: string,
  options: EvaluateOptions = {}
): {
  score: number;
  total: number;
  percentage: number;
  detail: AnswerEvaluation[];
} {
  const {
    caseSensitive = false,
    paddingChar = " ",
    weights,
    defaultWeight,
    totalScore,
    roundTo = 2,
  } = options;

  // Xác định độ dài cần so sánh (số ký tự lớn nhất giữa 2 chuỗi hoặc length của weights nếu có)
  const maxLength = Math.max(
    correctAnswer.length,
    userAnswer.length,
    weights?.length ?? 0
  );

  // Nếu không có ký tự nào => trả về ngay
  if (maxLength === 0) {
    return {
      score: 0,
      total: 0,
      percentage: 0,
      detail: [],
    };
  }

  // Tính default weight (nếu cần). Hàm helper giả định maxLength > 0.
  const computedDefaultWeight = getComputedDefaultWeight(
    weights,
    defaultWeight,
    totalScore,
    maxLength
  );

  const detail: AnswerEvaluation[] = [];
  let scoreRaw = 0; // cộng dồn chưa làm tròn
  let totalRaw = 0; // cộng dồn chưa làm tròn

  for (let i = 0; i < maxLength; i++) {
    // Lấy ký tự (nếu thiếu thì dùng paddingChar)
    const expectedChar = correctAnswer[i] ?? paddingChar;
    const actualChar = userAnswer[i] ?? paddingChar;

    // Trọng số thô cho vị trí i
    const weightPointRaw = weights?.[i] ?? computedDefaultWeight;

    // So sánh
    const { isCorrect, awarded } = compareChars(
      expectedChar,
      actualChar,
      weightPointRaw,
      caseSensitive
    );

    // Cộng dồn (dùng giá trị thô để tránh sai số do làm tròn từng bước)
    scoreRaw += awarded;
    totalRaw += weightPointRaw;

    // Đưa vào detail (lưu phiên bản đã làm tròn theo yêu cầu hiển thị)
    detail.push({
      index: i + 1,
      expectedChar,
      actualChar,
      isCorrect,
      weightPoint: roundToDecimal(weightPointRaw, roundTo),
      awardedPoint: roundToDecimal(awarded, roundTo),
    });
  }

  const score = roundToDecimal(scoreRaw, roundTo);
  const total = roundToDecimal(totalRaw, roundTo);
  const percentage =
    totalRaw === 0 ? 0 : roundToDecimal((scoreRaw / totalRaw) * 100, roundTo);

  return { score, total, percentage, detail };
}

export default evaluateAnswer;
