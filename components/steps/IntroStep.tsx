"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Compass, AlertCircle } from "lucide-react";

/**
 * 학년 선택 옵션 목록
 */
const GRADE_OPTIONS = [
  { label: "초등 4학년", value: "초등학교 4학년", short: "초4" },
  { label: "초등 5학년", value: "초등학교 5학년", short: "초5" },
  { label: "초등 6학년", value: "초등학교 6학년", short: "초6" },
  { label: "중학교 1학년", value: "중학교 1학년", short: "중1" },
  { label: "중학교 2학년", value: "중학교 2학년", short: "중2" },
  { label: "중학교 3학년", value: "중학교 3학년", short: "중3" },
];

interface IntroStepProps {
  /** 시작하기 버튼 클릭 시 호출되는 콜백 */
  onStart: (userName: string, grade: string) => void;
  /** 초기 전달 가능한 기본 이름 */
  defaultName?: string;
  /** 초기 전달 가능한 기본 학년 */
  defaultGrade?: string;
}

/**
 * [화면 1: 시작 화면] 이름 및 학년 입력 후 테스트를 시작하는 컴포넌트
 */
export function IntroStep({
  onStart,
  defaultName = "",
  defaultGrade = "초등학교 6학년",
}: IntroStepProps) {
  const [userName, setUserName] = useState<string>(defaultName);
  const [selectedGrade, setSelectedGrade] = useState<string>(defaultGrade);
  const [hasError, setHasError] = useState<boolean>(false);

  // 시작 버튼 클릭 핸들러
  const handleStartClick = () => {
    const trimmed = userName.trim();
    if (!trimmed) {
      setHasError(true);
      return;
    }
    setHasError(false);
    onStart(trimmed, selectedGrade);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-lg mx-auto"
    >
      <Card className="border-2 border-primary/25 shadow-edu overflow-hidden bg-card/95 backdrop-blur-md">
        {/* 상단 비주얼 헤더 */}
        <div className="relative pt-8 pb-4 text-center bg-gradient-to-b from-primary/10 via-primary/5 to-transparent px-6">
          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [0, -2, 2, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3.5,
              ease: "easeInOut",
            }}
            className="w-20 h-20 mx-auto mb-3 rounded-3xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-4xl shadow-lg shadow-primary/30"
          >
            🚀
          </motion.div>

          <div className="inline-flex items-center gap-1.5 mb-2">
            <Badge variant="amber" className="px-3 py-1 font-bold">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              초·중학생 맞춤형 MBTI 진로 탐색
            </Badge>
          </div>

          <CardTitle className="text-2xl md:text-3xl font-black text-foreground word-keep-all leading-tight">
            나만의 미래 직업 &amp; <br />
            <span className="text-primary underline decoration-secondary decoration-wavy decoration-2">
              역사 속 인생 멘토
            </span>{" "}
            찾기
          </CardTitle>

          <CardDescription className="mt-2 text-sm md:text-base font-medium">
            시공간 타임머신을 타고 나와 꼭 맞는 미래 직업과 <br className="hidden sm:inline" />
            역사 속 위인 롤모델을 만나보세요!
          </CardDescription>
        </div>

        <CardContent className="space-y-6 pt-4 px-6 md:px-8">
          {/* 이름 / 별명 입력 폼 */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                👤 <span>탐험가 이름 (또는 별명)</span>
              </span>
              <span className="text-xs text-muted-foreground font-normal">최대 8자</span>
            </label>

            <motion.div
              animate={hasError ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              <Input
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                  if (hasError && e.target.value.trim()) setHasError(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleStartClick();
                }}
                maxLength={8}
                placeholder="예: 멋진 우주비행사 길동이"
                className={`text-base font-semibold ${
                  hasError
                    ? "border-destructive focus-visible:ring-destructive/30"
                    : "border-border"
                }`}
              />
            </motion.div>

            {hasError && (
              <p className="text-xs text-destructive font-bold flex items-center gap-1 pt-0.5">
                <AlertCircle className="w-3.5 h-3.5" />
                이름이나 별명을 한 글자 이상 입력해줘!
              </p>
            )}
          </div>

          {/* 학년 선택 칩 */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground flex items-center gap-1.5">
              🎓 <span>현재 학년을 골라줘:</span>
            </label>

            <div className="grid grid-cols-3 gap-2">
              {GRADE_OPTIONS.map((g) => {
                const isSelected = selectedGrade === g.value;
                return (
                  <button
                    key={g.value}
                    type="button"
                    onClick={() => setSelectedGrade(g.value)}
                    className={`h-11 rounded-xl text-sm font-bold transition-all select-none border-2 flex items-center justify-center ${
                      isSelected
                        ? "bg-primary text-primary-foreground border-primary shadow-sm scale-[1.02]"
                        : "bg-muted/40 hover:bg-muted text-foreground border-transparent hover:border-border"
                    }`}
                  >
                    {g.short}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 시작 버튼 */}
          <div className="pt-2">
            <Button
              onClick={handleStartClick}
              size="lg"
              className="w-full text-lg font-black tracking-wide"
            >
              <Compass className="w-5 h-5 mr-1" />
              시공간 탐험 출발하기! 🚀
            </Button>
          </div>

          {/* 부가 안내 */}
          <div className="text-center text-xs font-semibold text-muted-foreground flex items-center justify-center gap-3">
            <span>⏱️ 약 3분 소요</span>
            <span>•</span>
            <span>📝 총 12문항 (2지선다)</span>
            <span>•</span>
            <span>🎯 100% 무료</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
