import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * 둥근 모서리와 부드러운 그림자를 가진 에듀 카드 래퍼 컴포넌트
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-3xl border-2 border-border/80 bg-card text-card-foreground shadow-edu transition-all",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

/**
 * 카드의 상단 헤더 영역
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-2 p-6 md:p-8", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

/**
 * 카드의 제목 타이포그래피 (H3)
 */
const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl md:text-2xl font-extrabold leading-tight tracking-tight text-foreground",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

/**
 * 카드의 부가 설명 문구
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm md:text-base text-muted-foreground leading-relaxed", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

/**
 * 카드의 본문 콘텐츠 영역
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0 md:p-8 md:pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

/**
 * 카드의 하단 버튼/액션 영역
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0 md:p-8 md:pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
