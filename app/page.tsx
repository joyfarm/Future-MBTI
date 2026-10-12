"use client";

import React, { useState } from "react";
import mbtiDataRaw from "@/data/mbtiData.json";
import type { MbtiDataset } from "@/types/mbti";
import { calculateMBTI, type MbtiCalculationResult } from "@/lib/calculateMBTI";
import { IntroStep } from "@/components/steps/IntroStep";
import { QuizStep } from "@/components/steps/QuizStep";
import { LoadingStep } from "@/components/steps/LoadingStep";
import { ResultStep } from "@/components/steps/ResultStep";
import { AnimatePresence } from "framer-motion";
import { Compass, Sparkles } from "lucide-react";

const mbtiData = mbtiDataRaw as MbtiDataset;

/**
 * 테스트 진행 단계 열거형
 */
type StepType = "intro" | "quiz" | "loading" | "result";

export default function CareerMbtiPage() {
  // [1] 상태 관리
  const [currentStep, setCurrentStep] = useState<StepType>("intro");
  const [userName, setUserName] = useState<string>("");
  const [grade, setGrade] = useState<string>("초등학교 6학년");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [mbtiResult, setMbtiResult] = useState<MbtiCalculationResult | null>(null);

  // [2] 시작하기 핸들러 (Intro -> Quiz)
  const handleStart = (inputName: string, inputGrade: string) => {
    setUserName(inputName);
    setGrade(inputGrade);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setCurrentStep("quiz");
  };

  // [3] 선택지 클릭 핸들러 (Quiz -> 다음 질문 or Loading)
  const handleSelectOption = (score: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = score;
    setAnswers(updatedAnswers);

    const nextIndex = currentQuestionIndex + 1;

    // 마지막 12번째 문항까지 모두 답한 경우
    if (nextIndex >= mbtiData.questions.length) {
      // MBTI 계산
      const result = calculateMBTI(updatedAnswers);
      setMbtiResult(result);
      setCurrentStep("loading");
    } else {
      setCurrentQuestionIndex(nextIndex);
    }
  };

  // [4] 이전 질문으로 되돌아가기 핸들러
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // [5] 2초 로딩 완료 핸들러 (Loading -> Result)
  const handleLoadingFinish = () => {
    setCurrentStep("result");
  };

  // [6] 다시 검사하기 핸들러 (Result -> Intro 완전 초기화)
  const handleRestart = () => {
    setUserName("");
    setGrade("초등학교 6학년");
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setMbtiResult(null);
    setCurrentStep("intro");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-background via-indigo-50/20 to-background dark:via-indigo-950/20">
      {/* 상단 미니 네비게이션 헤더 */}
      <header className="w-full border-b border-border/60 bg-card/70 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 select-none">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-white font-black text-sm shadow-sm">
              <Compass className="w-4 h-4" />
            </div>
            <span className="font-black text-sm md:text-base tracking-tight text-foreground">
              미래 MBTI 탐험대
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground bg-muted/60 px-2.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            <span>역사 속 멘토 찾기</span>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 영역 (유기적 단계별 렌더링) */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 md:py-12">
        <AnimatePresence mode="wait">
          {currentStep === "intro" && (
            <IntroStep
              key="intro"
              onStart={handleStart}
              defaultName={userName}
              defaultGrade={grade}
            />
          )}

          {currentStep === "quiz" && (
            <QuizStep
              key="quiz"
              questions={mbtiData.questions}
              currentIndex={currentQuestionIndex}
              answers={answers}
              onSelectOption={handleSelectOption}
              onPrev={handlePrevQuestion}
            />
          )}

          {currentStep === "loading" && (
            <LoadingStep
              key="loading"
              userName={userName}
              onFinish={handleLoadingFinish}
              durationMs={2000}
            />
          )}

          {currentStep === "result" && mbtiResult && (
            <ResultStep
              key="result"
              userName={userName}
              grade={grade}
              mbtiResult={mbtiResult}
              profile={mbtiData.results[mbtiResult.mbti] || mbtiData.results["ISTJ"]}
              onRestart={handleRestart}
            />
          )}
        </AnimatePresence>
      </main>

      {/* 하단 푸터 */}
      <footer className="w-full border-t border-border/40 py-6 text-center text-xs text-muted-foreground font-medium">
        <div className="max-w-2xl mx-auto px-4 space-y-1">
          <p>© 2026 Future MBTI Career Explorer • 초·중등 진로 탐색 에듀테크 콘텐츠</p>
          <p className="opacity-75">
            본 테스트는 초·중등생의 즐거운 진로 탐색과 자아 성장을 돕기 위해 기획되었습니다.
          </p>
        </div>
      </footer>
    </div>
  );
}
