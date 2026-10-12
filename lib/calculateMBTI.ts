/**
 * MBTI 4대 지표별 점수 집계 인터페이스
 */
export interface DimensionScores {
  E: number;
  I: number;
  S: number;
  N: number;
  T: number;
  F: number;
  J: number;
  P: number;
}

/**
 * 계산 결과 및 차원별 백분율 정보
 */
export interface MbtiCalculationResult {
  mbti: string;
  scores: DimensionScores;
  percentages: {
    E: number;
    I: number;
    S: number;
    N: number;
    T: number;
    F: number;
    J: number;
    P: number;
  };
}

/**
 * 선택된 답변 점수 배열을 바탕으로 MBTI 4글자 유형 및 비율을 계산하는 함수
 * @param answers 각 문항별 획득 점수 목록 (예: ['E', 'I', 'E', 'S', ...])
 * @returns 최종 MBTI 유형 및 세부 점수 통계
 */
export function calculateMBTI(answers: string[]): MbtiCalculationResult {
  const scores: DimensionScores = {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  };

  // 답변별 점수 카운트
  answers.forEach((score) => {
    if (score in scores) {
      scores[score as keyof DimensionScores]++;
    }
  });

  // 각 지표별 3문항 중 비율 계산 (각 차원 합계: 3)
  const calcPercent = (val1: number, val2: number) => {
    const total = val1 + val2 || 1;
    return Math.round((val1 / total) * 100);
  };

  const percentages = {
    E: calcPercent(scores.E, scores.I),
    I: calcPercent(scores.I, scores.E),
    S: calcPercent(scores.S, scores.N),
    N: calcPercent(scores.N, scores.S),
    T: calcPercent(scores.T, scores.F),
    F: calcPercent(scores.F, scores.T),
    J: calcPercent(scores.J, scores.P),
    P: calcPercent(scores.P, scores.J),
  };

  // 4대 지표 판별 (동점일 경우 첫 번째 기본값)
  const first = scores.E >= scores.I ? "E" : "I";
  const second = scores.S >= scores.N ? "S" : "N";
  const third = scores.T >= scores.F ? "T" : "F";
  const fourth = scores.J >= scores.P ? "J" : "P";

  const mbti = `${first}${second}${third}${fourth}`;

  return {
    mbti,
    scores,
    percentages,
  };
}
