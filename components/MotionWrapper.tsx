"use client";

import React from "react";
import { motion, AnimatePresence, type Variants, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * 모션 래퍼에서 지원하는 애니메이션 종류 타입
 */
export type MotionVariantType =
  | "fadeIn"          // 부드러운 페이드인
  | "slideUp"         // 아래에서 위로 슬라이드
  | "slideLeft"       // 오른쪽에서 왼쪽으로 슬라이드 (다음 질문)
  | "slideRight"      // 왼쪽에서 오른쪽으로 슬라이드 (이전 질문)
  | "scaleUp"         // 통통 튀며 확대 등장
  | "cardPop"         // 살짝 작아졌다가 쫀득하게 커지는 팝 효과
  | "mentorReveal"    // 멘토 카드가 신비롭게 빛나며 등장하는 효과
  | "staggerContainer"; // 자식 요소들이 순차적으로 나타나는 컨테이너

/**
 * 사전 정의된 Framer Motion 애니메이션 프리셋 딕셔너리
 */
const motionVariants: Record<MotionVariantType, Variants> = {
  // 1. 단순 페이드인
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  },

  // 2. 아래에서 위로 등장
  slideUp: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.25 } },
  },

  // 3. 오른쪽에서 왼쪽으로 슬라이드 (다음 문항)
  slideLeft: {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
    },
    exit: { opacity: 0, x: -50, transition: { duration: 0.25 } },
  },

  // 4. 왼쪽에서 오른쪽으로 슬라이드 (이전 문항)
  slideRight: {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
    },
    exit: { opacity: 0, x: 50, transition: { duration: 0.25 } },
  },

  // 5. 통통 튀며 확대 등장 (버튼, 아이콘)
  scaleUp: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  },

  // 6. 카드 팝 효과 (질문 선택지, 결과 배지)
  cardPop: {
    hidden: { opacity: 0, scale: 0.92, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 22 },
    },
    exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.2 } },
  },

  // 7. 멘토 카드 신비로운 등장 (타임머신 회전 + 스케일 + 스프링)
  mentorReveal: {
    hidden: { opacity: 0, y: 40, scale: 0.88, rotateX: 10 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 220,
        damping: 18,
        mass: 0.9,
      },
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
  },

  // 8. 자식 요소 순차 노출 컨테이너
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  },
};

/**
 * MotionWrapper 기본 Props 인터페이스
 */
export interface MotionWrapperProps extends HTMLMotionProps<"div"> {
  /** 적용할 애니메이션 변형 종류 */
  variant?: MotionVariantType;
  /** 시작 지연 시간 (초 단위) */
  delay?: number;
  /** 애니메이션 지속 시간 (초 단위, 커스텀 필요 시) */
  duration?: number;
  /** 추가 Tailwind 클래스 */
  className?: string;
  /** 자식 컴포넌트 */
  children: React.ReactNode;
}

/**
 * 에듀테크 서비스 공통 애니메이션 래퍼 컴포넌트
 */
export function MotionWrapper({
  variant = "slideUp",
  delay = 0,
  duration,
  className,
  children,
  ...props
}: MotionWrapperProps) {
  const selectedVariant = motionVariants[variant];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={selectedVariant}
      transition={{
        delay,
        ...(duration ? { duration } : {}),
      }}
      className={cn("w-full", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * 퀴즈 질문 전환을 부드럽게 처리하는 전용 슬라이드 래퍼 Props
 */
export interface QuestionMotionProps {
  /** 현재 질문의 고유 키 (문항 번호 등) */
  questionKey: string | number;
  /** 이동 방향 ('next': 다음 질문, 'prev': 이전 질문) */
  direction?: "next" | "prev";
  /** 자식 질문 카드 컴포넌트 */
  children: React.ReactNode;
  /** 추가 Tailwind 클래스 */
  className?: string;
}

/**
 * [질문 전용] 문항이 바뀔 때 좌우로 부드럽게 슬라이드되는 인터랙티브 컴포넌트
 */
export function QuestionMotion({
  questionKey,
  direction = "next",
  children,
  className,
}: QuestionMotionProps) {
  const slideVariants: Variants = {
    initial: (dir: "next" | "prev") => ({
      opacity: 0,
      x: dir === "next" ? 40 : -40,
      scale: 0.98,
    }),
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1], // 부드러운 감속 큐빅 베지어
      },
    },
    exit: (dir: "next" | "prev") => ({
      opacity: 0,
      x: dir === "next" ? -40 : 40,
      scale: 0.98,
      transition: {
        duration: 0.25,
        ease: "easeIn",
      },
    }),
  };

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={questionKey}
        custom={direction}
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={cn("w-full", className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * 멘토 카드 전용 등장 애니메이션 Props
 */
export interface MentorCardMotionProps {
  /** 국내/해외 멘토 카드의 딜레이 순서 (0, 1 등) */
  index?: number;
  /** 자식 멘토 카드 컴포넌트 */
  children: React.ReactNode;
  /** 추가 Tailwind 클래스 */
  className?: string;
}

/**
 * [결과 화면 전용] 시공간을 넘어온 멘토 카드가 웅장하게 떠오르는 애니메이션 컴포넌트
 */
export function MentorCardMotion({
  index = 0,
  children,
  className,
}: MentorCardMotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.9, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.2 + index * 0.18,
        type: "spring",
        stiffness: 180,
        damping: 16,
      }}
      whileHover={{
        y: -6,
        scale: 1.015,
        transition: { duration: 0.2 },
      }}
      className={cn("w-full transform-gpu", className)}
    >
      {children}
    </motion.div>
  );
}

/**
 * 통통 튀는 아이콘이나 뱃지용 펄스 효과 컴포넌트
 */
export function BouncyWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}
