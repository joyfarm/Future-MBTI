"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { QuestionMotion } from "@/components/MotionWrapper";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import type { QuestionItem } from "@/types/mbti";

interface QuizStepProps {
  /** 전체 질문 문항 목록 */
  questions: QuestionItem[];
  /** 현재 질문 인덱스 (0부터 시작) */
  currentIndex: number;
  /** 사용자가 지금까지 선택한 답변 목록 */
  answers: string[];
  /** 선택지 클릭 시 호출되는 핸들러 (점수, 다음 인덱스) */
  onSelectOption: (score: string) => void;
  /** 이전 질문으로 되돌아가는 핸들러 */
  onPrev: () => void;
}

/**
 * 문항 번호에 따른 차원별 단계 타이틀 반환
 */
function getStepInfo(index: number) {
  if (index < 3) {
    return { step: "STEP 1", title: "에너지와 친구 관계 탐험", variant: "violet" as const };
  }
  if (index < 6) {
    return { step: "STEP 2", title: "상상과 생각 방식 탐험", variant: "amber" as const };
  }
  if (index < 9) {
    return { step: "STEP 3", title: "고민 상담과 마음의 선택", variant: "coral" as const };
  }
  return { step: "STEP 4", title: "숙제와 생활 계획 탐험", variant: "mint" as const };
}

/**
 * [화면 2: 질문 화면] 12문항을 순차적으로 풀이하는 컴포넌트
 */
export function QuizStep({
  questions,
  currentIndex,
  answers,
  onSelectOption,
  onPrev,
}: QuizStepProps) {
  const currentQ = questions[currentIndex];
  const total = questions.length;
  const currentStepInfo = getStepInfo(currentIndex);

  // 선택 클릭 즉시 피드백을 주기 위한 로컬 상태
  const [selectedLabel, setSelectedLabel] = useState<"A" | "B" | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const handleOptionClick = (score: string, label: "A" | "B") => {
    if (isTransitioning) return;
    setSelectedLabel(label);
    setIsTransitioning(true);

    // 0.3초간 선택 강조 효과 후 다음 문항 이동
    setTimeout(() => {
      onSelectOption(score);
      setSelectedLabel(null);
      setIsTransitioning(false);
    }, 280);
  };

  const progressPercentage = Math.round(((currentIndex + 1) / total) * 100);

  return (
    <div className="w-full max-w-lg mx-auto space-y-4">
      {/* 상단 컨트롤 바 (이전 버튼 + 진행률 게이지) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm font-bold">
          {currentIndex > 0 ? (
            <button
              type="button"
              onClick={onPrev}
              disabled={isTransitioning}
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors py-1 px-2 rounded-lg hover:bg-muted font-bold text-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>이전 질문</span>
            </button>
          ) : (
            <span className="text-xs text-muted-foreground">시작 단계</span>
          )}

          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-primary">
              Q{currentIndex + 1} / {total}
            </span>
            <span className="text-xs bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">
              {progressPercentage}%
            </span>
          </div>
        </div>

        {/* 프로그레스 바 */}
        <Progress value={progressPercentage} className="h-3" />
      </div>

      {/* 질문 카드 (Framer Motion 전환 효과) */}
      <QuestionMotion questionKey={currentQ.id} direction="next">
        <Card className="border-2 border-primary/20 shadow-edu bg-card/95 backdrop-blur-md overflow-hidden">
          <CardContent className="p-6 md:p-8 space-y-6">
            {/* 상단 스텝 뱃지 */}
            <div className="flex items-center justify-between">
              <Badge variant={currentStepInfo.variant} className="text-xs font-bold">
                {currentStepInfo.step} • {currentStepInfo.title}
              </Badge>
              <span className="text-xs text-muted-foreground font-semibold">
                선택지 중 하나를 콕 찍어줘!
              </span>
            </div>

            {/* 질문 본문 */}
            <h2 className="text-xl md:text-2xl font-black text-foreground word-keep-all leading-snug">
              {currentQ.question}
            </h2>

            {/* A/B 2지선다형 카드 버튼 */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((option) => {
                const isSelected = selectedLabel === option.label;

                return (
                  <div
                    key={option.label}
                    onClick={() => handleOptionClick(option.score, option.label)}
                    className={`group cursor-pointer p-4 md:p-5 rounded-2xl border-2 transition-all duration-200 select-none flex items-start gap-3.5 transform active:scale-[0.98] ${
                      isSelected
                        ? "border-primary bg-primary/15 shadow-edu ring-2 ring-primary/40 -translate-y-1"
                        : "border-border hover:border-primary/40 bg-card hover:bg-muted/40 hover:-translate-y-0.5"
                    }`}
                  >
                    {/* 선택지 A/B 라벨 인디케이터 */}
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-base flex-shrink-0 transition-colors ${
                        isSelected
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                      }`}
                    >
                      {isSelected ? <CheckCircle2 className="w-5 h-5" /> : option.label}
                    </div>

                    {/* 선택지 텍스트 */}
                    <p className="text-sm md:text-base font-semibold text-foreground pt-1.5 leading-relaxed word-keep-all">
                      {option.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </QuestionMotion>
    </div>
  );
}
