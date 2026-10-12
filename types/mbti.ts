/**
 * MBTI 4대 차원 지표
 */
export type MbtiDimension = "EI" | "SN" | "TF" | "JP";

/**
 * 개별 질문의 선택지 인터페이스
 */
export interface QuestionOption {
  label: "A" | "B";
  text: string;
  score: "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";
}

/**
 * 12개 질문 문항 인터페이스
 */
export interface QuestionItem {
  id: number;
  dimension: MbtiDimension;
  question: string;
  options: QuestionOption[];
}

/**
 * 추천 미래 직업 인터페이스
 */
export interface CareerItem {
  title: string;
  desc: string;
}

/**
 * 역사 속 멘토 인물 인터페이스
 */
export interface RoleModelItem {
  name: string;
  title: string;
  quote: string;
  lesson: string;
}

/**
 * 16개 MBTI 결과 상세 데이터 인터페이스
 */
export interface MbtiResultProfile {
  type: string;
  nickname: string;
  headline: string;
  description: string;
  growthTip: string;
  careers: CareerItem[];
  roleModels: {
    domestic: RoleModelItem;
    international: RoleModelItem;
  };
}

/**
 * 전체 MBTI 테스트 데이터셋 구조
 */
export interface MbtiDataset {
  testMeta: {
    title: string;
    target: string;
    version: string;
    totalQuestions: number;
  };
  questions: QuestionItem[];
  results: Record<string, MbtiResultProfile>;
}

/**
 * 학생 사용자 프로필 정보
 */
export interface StudentProfile {
  name: string;
  grade: string;
}
