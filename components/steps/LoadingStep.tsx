"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Compass, Sparkles, Orbit } from "lucide-react";

interface LoadingStepProps {
  /** 탐험가 학생 이름 */
  userName: string;
  /** 로딩 완료 후 결과 화면으로 이동하는 콜백 */
  onFinish: () => void;
  /** 로딩 지속 시간 (밀리초, 기본값 2000ms) */
  durationMs?: number;
}

/**
 * 단계별 롤링 안내 문구 목록
 */
const getLoadingMessages = (name: string) => [
  { step: 1, icon: "🚀", text: "시공간 타임머신 좌표를 정밀 계산하는 중..." },
  { step: 2, icon: "⏳", text: `${name} 탐험가와 꼭 닮은 역사 속 위인을 찾는 중...` },
  { step: 3, icon: "🛰️", text: "미래 100년 유망 직업 빅데이터를 스캔하는 중..." },
];

/**
 * [화면 3: 로딩 화면] 타임머신 시공간 이동 효과를 2초간 연출하는 컴포넌트
 */
export function LoadingStep({
  userName,
  onFinish,
  durationMs = 2000,
}: LoadingStepProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const messages = getLoadingMessages(userName);

  useEffect(() => {
    // 롤링 텍스트 타이머 간격 (약 650ms마다 교체)
    const stepInterval = Math.floor(durationMs / 3);
    const timer1 = setTimeout(() => setCurrentStepIndex(1), stepInterval);
    const timer2 = setTimeout(() => setCurrentStepIndex(2), stepInterval * 2);

    // 전체 로딩 완료 후 결과 화면으로 이동
    const completeTimer = setTimeout(() => {
      onFinish();
    }, durationMs);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(completeTimer);
    };
  }, [durationMs, onFinish]);

  const currentMessage = messages[currentStepIndex];

  return (
    <div className="w-full max-w-lg mx-auto">
      <Card className="border-2 border-primary/30 shadow-edu bg-card/95 backdrop-blur-md overflow-hidden text-center py-10 px-6">
        <CardContent className="space-y-8 flex flex-col items-center">
          {/* 시공간 웜홀 회전 그래픽 */}
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* 외곽 회전 궤도 */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-primary/40"
            />

            {/* 반대 방향 회전 링 */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute inset-3 rounded-full border-2 border-accent/40"
            />

            {/* 중앙 발광 코어 */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                boxShadow: [
                  "0 0 20px rgba(99, 102, 241, 0.4)",
                  "0 0 40px rgba(99, 102, 241, 0.8)",
                  "0 0 20px rgba(99, 102, 241, 0.4)",
                ],
              }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary via-indigo-500 to-accent flex items-center justify-center text-3xl shadow-xl z-10 text-white"
            >
              <Orbit className="w-10 h-10 animate-spin text-white" />
            </motion.div>
          </div>

          {/* 학생 이름 안내 문구 */}
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/15 text-secondary-foreground text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>시공간 포털 가동 중</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-foreground pt-1">
              <span className="text-primary">{userName}</span> 탐험가의 성향 좌표 분석 중!
            </h3>
          </div>

          {/* 순차 롤링 텍스트 카드 */}
          <div className="w-full bg-muted/50 border border-border rounded-2xl p-4 min-h-[72px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMessage.step}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-2.5 text-sm md:text-base font-bold text-foreground"
              >
                <span className="text-xl">{currentMessage.icon}</span>
                <span>{currentMessage.text}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 하단 점진적 인디케이터 점 3개 */}
          <div className="flex gap-2">
            {[0, 1, 2].map((idx) => (
              <motion.div
                key={idx}
                animate={{
                  scale: currentStepIndex === idx ? [1, 1.3, 1] : 1,
                  backgroundColor:
                    currentStepIndex === idx ? "hsl(var(--primary))" : "hsl(var(--muted))",
                }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-2.5 h-2.5 rounded-full"
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
