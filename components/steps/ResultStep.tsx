"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MentorCardMotion, MotionWrapper } from "@/components/MotionWrapper";
import {
  Download,
  Share2,
  RotateCcw,
  Sparkles,
  Compass,
  Quote,
  Lightbulb,
  Check,
  Award,
  Calendar,
  CheckCircle2,
  FileCheck,
} from "lucide-react";
import confetti from "canvas-confetti";
import { toPng } from "html-to-image";
import type { MbtiResultProfile } from "@/types/mbti";
import type { MbtiCalculationResult } from "@/lib/calculateMBTI";

interface ResultStepProps {
  /** 학생 이름 */
  userName: string;
  /** 학생 학년 */
  grade: string;
  /** 최종 MBTI 계산 결과 데이터 */
  mbtiResult: MbtiCalculationResult;
  /** 해당 MBTI의 상세 프로필 정보 */
  profile: MbtiResultProfile;
  /** 다시 검사하기 콜백 */
  onRestart: () => void;
}

/**
 * [화면 4: 결과 화면] 학교 과제물 제출 및 소장용 액자 프레임 리포트 카드 컴포넌트
 */
export function ResultStep({
  userName,
  grade,
  mbtiResult,
  profile,
  onRestart,
}: ResultStepProps) {
  const reportRef = useRef<HTMLDivElement>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<string>("");

  // 오늘 날짜 포맷팅 (예: 2026년 10월 12일)
  useEffect(() => {
    const today = new Date();
    const formatted = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
    setCurrentDate(formatted);
  }, []);

  // 결과 화면 진입 시 축하 폭죽 효과 발사 🎉
  useEffect(() => {
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#6366F1", "#FBBF24", "#14B8A6", "#F43F5E"],
      });
    } catch {
      // noop
    }
  }, []);

  // html-to-image를 활용한 고해상도 PNG 파일 다운로드
  const handleDownloadReport = async () => {
    if (!reportRef.current || isDownloading) return;
    setIsDownloading(true);

    try {
      // 폰트 및 스타일 렌더링 안정을 위한 100ms 지연
      await new Promise((resolve) => setTimeout(resolve, 100));

      const dataUrl = await toPng(reportRef.current, {
        cacheBust: true,
        pixelRatio: 2, // 레티나 고해상도 지원
        backgroundColor: "#ffffff",
      });

      const downloadName = `${userName || "학생"}_진로결과.png`;
      const link = document.createElement("a");
      link.download = downloadName;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("리포트 카드 이미지 생성 실패:", err);
      alert("이미지 저장 중 일시적인 오류가 발생했습니다. 브라우저 화면 캡처를 이용해 주세요!");
    } finally {
      setIsDownloading(false);
    }
  };

  // 결과 링크 복사하기 핸들러
  const handleCopyLink = async () => {
    const currentUrl = typeof window !== "undefined" ? window.location.href : "";

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(currentUrl);
      } else {
        // 폴백 텍스트 복사 방식
        const textArea = document.createElement("textarea");
        textArea.value = currentUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch {
      alert("링크 복사에 실패했습니다. 주소창의 URL을 직접 복사해 주세요.");
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 pb-12">
      {/* 🖼️ 학교 제출 & 소장용 진로 리포트 카드 액자 영역 (reportRef) */}
      <MotionWrapper variant="scaleUp">
        <div
          ref={reportRef}
          className="relative bg-white text-slate-800 p-6 md:p-8 rounded-3xl border-4 border-amber-300 shadow-2xl overflow-hidden font-sans"
          style={{
            backgroundImage:
              "radial-gradient(#f1f5f9 1px, transparent 1px), radial-gradient(#f1f5f9 1px, #ffffff 1px)",
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 10px 10px",
          }}
        >
          {/* 고급 상장 액자 내부 이중 테두리선 */}
          <div className="absolute inset-2.5 rounded-2xl border-2 border-dashed border-indigo-200 pointer-events-none" />

          {/* 상단 4개 코너 장식 포인트 */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-amber-400" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-amber-400" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-amber-400" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-amber-400" />

          {/* 리포트 카드 내부 콘텐츠 */}
          <div className="relative z-10 space-y-6">
            {/* 1. 상단 공식 헤더 & 인증 엠블럼 */}
            <div className="text-center space-y-1.5 pb-2 border-b border-indigo-100">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-black">
                <Award className="w-4 h-4 text-amber-500" />
                <span>미래 MBTI 탐험대 • 공식 진로 탐색 리포트</span>
              </div>

              <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight pt-1">
                청소년 진로 &amp; 역사 롤모델 인증서
              </h1>

              {/* 학생 인적사항 및 발급일 배지 */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-xs md:text-sm font-bold text-slate-600">
                <span className="bg-slate-100 px-3 py-1 rounded-lg">
                  🎓 {grade}
                </span>
                <span className="bg-indigo-50 text-indigo-800 px-3 py-1 rounded-lg">
                  👤 <strong className="text-indigo-900 font-extrabold">{userName}</strong> 탐험가
                </span>
                <span className="bg-slate-100 px-3 py-1 rounded-lg flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {currentDate || "2026년"}
                </span>
              </div>
            </div>

            {/* 2. MBTI 유형 및 맞춤 별명 메인 배너 */}
            <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-900 text-white rounded-2xl p-5 md:p-6 text-center shadow-lg space-y-2">
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-0.5 rounded-full text-xs font-bold tracking-wider text-amber-300">
                나만의 성향 키워드
              </div>

              <h2 className="text-2xl md:text-3xl font-black text-amber-300 tracking-tight">
                {profile.nickname}
              </h2>

              <div className="inline-block bg-white text-indigo-900 px-4 py-1 rounded-xl text-lg md:text-xl font-black shadow-inner">
                {profile.type}
              </div>

              <p className="text-xs md:text-sm font-medium text-indigo-100 pt-1 leading-relaxed word-keep-all">
                &ldquo;{profile.headline}&rdquo;
              </p>
            </div>

            {/* 3. 성향 요약 & 성장 꿀팁 */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 md:p-5 space-y-3 text-left">
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700">
                <FileCheck className="w-4 h-4" />
                <span>성향 특성 분석</span>
              </div>
              <p className="text-xs md:text-sm text-slate-700 leading-relaxed word-keep-all font-medium">
                {profile.description}
              </p>

              <div className="pt-2 border-t border-slate-200 flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-slate-600 leading-snug">
                  <strong className="text-amber-800 font-bold">성장 꿀팁: </strong>
                  {profile.growthTip}
                </div>
              </div>
            </div>

            {/* 4. 추천 미래 직업 TOP 2 */}
            <div className="space-y-2 text-left">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-800">
                <Compass className="w-4 h-4 text-indigo-600" />
                <span>{userName} 탐험가에게 꼭 맞는 미래 유망 직업 TOP 2</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {profile.careers.map((career, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-indigo-100 bg-indigo-50/40 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-indigo-700">
                        {idx === 0 ? "🌐 미래 직업 1" : "🕵️ 미래 직업 2"}
                      </span>
                    </div>
                    <h3 className="text-sm font-black text-slate-900">
                      {career.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-snug word-keep-all font-medium">
                      {career.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. 역사 속 인생 멘토 2인 & 명언 */}
            <div className="space-y-2 text-left">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-800">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>시공간을 넘어 만난 나의 역사 속 인생 멘토</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* 국내 멘토 */}
                <div className="p-3.5 rounded-xl border border-indigo-200 bg-white shadow-sm space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                      🇰🇷 국내 멘토
                    </span>
                    <span className="text-[11px] text-slate-500 font-semibold truncate max-w-[130px]">
                      {profile.roleModels.domestic.title}
                    </span>
                  </div>

                  <h4 className="text-sm font-black text-slate-900">
                    {profile.roleModels.domestic.name}
                  </h4>

                  <div className="text-xs text-indigo-900 italic font-semibold border-l-2 border-indigo-500 pl-2 bg-indigo-50/50 py-1 rounded-r-md">
                    &ldquo;{profile.roleModels.domestic.quote}&rdquo;
                  </div>

                  <div className="text-[11px] text-slate-600 font-medium">
                    <strong className="text-indigo-800">배울 점: </strong>
                    {profile.roleModels.domestic.lesson}
                  </div>
                </div>

                {/* 해외 멘토 */}
                <div className="p-3.5 rounded-xl border border-amber-200 bg-white shadow-sm space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md">
                      🌍 해외 멘토
                    </span>
                    <span className="text-[11px] text-slate-500 font-semibold truncate max-w-[130px]">
                      {profile.roleModels.international.title}
                    </span>
                  </div>

                  <h4 className="text-sm font-black text-slate-900">
                    {profile.roleModels.international.name}
                  </h4>

                  <div className="text-xs text-amber-900 italic font-semibold border-l-2 border-amber-500 pl-2 bg-amber-50/50 py-1 rounded-r-md">
                    &ldquo;{profile.roleModels.international.quote}&rdquo;
                  </div>

                  <div className="text-[11px] text-slate-600 font-medium">
                    <strong className="text-amber-800">배울 점: </strong>
                    {profile.roleModels.international.lesson}
                  </div>
                </div>
              </div>
            </div>

            {/* 6. 하단 공식 인증 스탬프 & 과제 제출 안내 */}
            <div className="pt-3 border-t border-indigo-100 flex items-center justify-between text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>학교 진로 포트폴리오 및 탐구 과제 제출용</span>
              </div>
              <div className="font-extrabold text-indigo-900 tracking-wider">
                [Future MBTI 인증]
              </div>
            </div>
          </div>
        </div>
      </MotionWrapper>

      {/* 🚀 하단 액션 버튼 그룹 */}
      <MotionWrapper variant="slideUp" delay={0.25} className="space-y-3 pt-2">
        {/* 핵심 버튼: html-to-image 기반 고해상도 리포트 카드 다운로드 */}
        <Button
          onClick={handleDownloadReport}
          disabled={isDownloading}
          size="lg"
          className="w-full text-base md:text-lg font-black shadow-lg shadow-indigo-500/25 bg-primary hover:bg-primary/95 text-white"
        >
          <Download className="w-5 h-5 mr-1.5" />
          {isDownloading
            ? "고해상도 리포트 카드 생성 중..."
            : `📥 진로 리포트 카드 저장 (고해상도 PNG)`}
        </Button>

        {/* 링크 복사하기 & 다시 테스트하기 */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={handleCopyLink}
            variant="outline"
            size="lg"
            className="w-full font-bold text-sm md:text-base border-2 bg-card hover:bg-muted"
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 mr-1 text-emerald-600 font-black" />
                <span className="text-emerald-700">링크 복사 완료!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 mr-1" />
                결과 링크 복사하기
              </>
            )}
          </Button>

          <Button
            onClick={onRestart}
            variant="ghost"
            size="lg"
            className="w-full font-bold text-sm md:text-base border-2 border-dashed border-border hover:bg-muted"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            다시 테스트하기
          </Button>
        </div>

        {/* 저장 안내 툴팁 */}
        <p className="text-center text-xs text-muted-foreground font-semibold">
          💡 다운로드받은 리포트 카드 파일(<code>{userName || "학생"}_진로결과.png</code>)은 학교 진로 과제나 포트폴리오로 제출할 수 있어요!
        </p>
      </MotionWrapper>
    </div>
  );
}
