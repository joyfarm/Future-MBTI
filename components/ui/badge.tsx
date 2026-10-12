import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * 에듀테크 테마 뱃지 스타일 변형(Variant) 정의
 */
const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs md:text-sm font-bold transition-colors select-none shadow-sm",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground border-border",
        accent:
          "border-transparent bg-accent text-accent-foreground hover:bg-accent/80",
        violet:
          "border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-900 dark:bg-indigo-950 dark:text-indigo-300",
        amber:
          "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300",
        mint:
          "border-teal-200 bg-teal-50 text-teal-800 dark:border-teal-900 dark:bg-teal-950 dark:text-teal-300",
        coral:
          "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * 뱃지 컴포넌트 Props 인터페이스
 */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * 학생 친화적인 성향 및 칭찬 뱃지 컴포넌트
 */
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
