import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * 에듀테크 테마 버튼 스타일 변형(Variant) 정의
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_5px_0_0_#4338CA] hover:bg-primary/90 active:translate-y-1 active:shadow-none",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[0_5px_0_0_#B91C1C] hover:bg-destructive/90 active:translate-y-1 active:shadow-none",
        outline:
          "border-2 border-border bg-background hover:bg-muted hover:text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[0_5px_0_0_#D97706] hover:bg-secondary/90 active:translate-y-1 active:shadow-none",
        ghost: "hover:bg-muted hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        accent:
          "bg-accent text-accent-foreground shadow-[0_5px_0_0_#0F766E] hover:bg-accent/90 active:translate-y-1 active:shadow-none",
      },
      size: {
        default: "h-12 px-6 py-2 text-base",
        sm: "h-9 rounded-xl px-4 text-xs",
        lg: "h-14 rounded-2xl px-8 text-lg",
        icon: "h-11 w-11 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/**
 * 버튼 컴포넌트의 Props 인터페이스
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Slot을 사용하여 자식 요소를 루트 엘리먼트로 렌더링할지 여부 */
  asChild?: boolean;
}

/**
 * 초·중학생 맞춤형 입체 버튼 컴포넌트
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
