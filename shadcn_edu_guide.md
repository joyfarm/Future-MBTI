# 🎨 [Next.js + Shadcn/ui] 초·중등 에듀테크 맞춤형 디자인 시스템 가이드

> **작성자**: 에듀테크 서비스 전문 UI/UX 디자이너 & 프런트엔드 엔지니어  
> **환경**: Next.js 14+ (App Router), TypeScript, Tailwind CSS, Shadcn/ui  
> **콘셉트**: **"Cosmic Discovery" (따뜻함과 호기심이 공존하는 우주 탐험 테마)**

---

## 🧭 1. 디자인 철학 및 UI/UX 원칙 (초·중등 타깃)

초등학교 4~6학년 및 중학생 타깃의 에듀테크 서비스는 성인용 비즈니스 툴(B2B SaaS)과는 완전히 다른 UX 문법이 필요합니다.

| 디자인 원칙 | 적용 가이드 | 기대 효과 |
| :--- | :--- | :--- |
| **Friendly & Soft (둥근 조형미)** | 기본 모서리 라운드를 `rounded-2xl` ~ `rounded-3xl`로 넉넉하게 적용 | 경계가 부드러워 심리적 안정감과 친근감 제공 |
| **Vibrant & Warm (생동감 있는 색채)** | 채도가 높고 경쾌한 바이올렛(우주)과 선명한 앰버 옐로우(별빛/에너지)의 조화 | 학습 및 테스트 집중도 향상, 시각적 피로도 최소화 |
| **Thumb-friendly (시원한 터치 영역)** | 버튼 및 카드 높이를 최소 `h-12(48px)` 이상으로 확대 | 모바일/태블릿 터치 실수 방지 및 높은 조작성 |
| **Micro Delight (살아있는 인터랙션)** | 마우스 오버 및 터치 시 탄성 있는 스프링/젤리 효과 및 네온 글로우 | 능동적인 클릭 유도 및 몰입도 극대화 |

---

## 🛠️ 2. Shadcn/ui 초기화 및 컴포넌트 설치 CLI

### 2.1 Shadcn/ui 초기화 (`init`)
Next.js 14+ App Router 프로젝트 루트에서 다음 명령어를 실행합니다.

```bash
# 최신 Shadcn/ui CLI 초기화
npx shadcn@latest init
```

> **추천 설정 옵션 (CLI 프롬프트 입력값)**:
> - Which style would you like to use? `Default`
> - Which color would you like to use as base color? `Slate` (아래 설정에서 커스텀 HSL로 덮어씌움)
> - Do you want to use CSS variables for colors? `yes`
> - Where is your global CSS file? `app/globals.css`
> - Configure the import alias for components: `@/components`
> - Configure the import alias for utils: `@/lib/utils`

---

### 2.2 필수 컴포넌트 7종 일괄 설치 CLI
요청하신 필수 컴포넌트 7개(`Button`, `Card`, `Progress`, `Radio Group`, `Input`, `Select`, `Badge`)와 아이콘 라이브러리(`lucide-react`)를 한 번에 설치합니다.

```bash
# 필수 컴포넌트 7종 일괄 설치
npx shadcn@latest add button card progress radio-group input select badge

# 초·중등생 친화적인 귀여운 아이콘용 라이브러리 설치
npm install lucide-react
```

#### 개별 설치 시 명령어 참조
```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add progress
npx shadcn@latest add radio-group
npx shadcn@latest add input
npx shadcn@latest add select
npx shadcn@latest add badge
```

---

## 🌈 3. 초·중등생 친화적 컬러 팔레트 & Tailwind 설정

학생들의 눈이 편안하면서도 호기심을 자극하도록, **신비로운 우주 바이올렛(Primary)**, **따뜻하고 활기찬 썬샤인 옐로우/오렌지(Secondary)**, **상쾌한 에너지 민트(Accent)**로 구성된 HSL 컬러 토큰 시스템을 정의합니다.

### 3.1 `app/globals.css` 설정 (CSS Variables)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* [배경 & 기본 텍스트] 따뜻한 크림빛 화이트 & 또렷한 소프트 블랙 */
    --background: 240 30% 98%;           /* 부드러운 밀크 화이트 (#F8F9FD) */
    --foreground: 228 35% 15%;           /* 가독성 높은 딥 네이비 (#1A1E36) */

    /* [카드 & 팝오버] 몽글몽글한 화이트 글래스 */
    --card: 0 0% 100%;
    --card-foreground: 228 35% 15%;
    --popover: 0 0% 100%;
    --popover-foreground: 228 35% 15%;

    /* [Primary] 신비로운 탐험 인디고-바이올렛 (핵심 액션, CTA 버튼) */
    --primary: 252 82% 60%;              /* 생동감 넘치는 일렉트릭 바이올렛 (#6366F1) */
    --primary-foreground: 0 0% 100%;

    /* [Secondary] 활기찬 썬샤인 앰버 (포인트 뱃지, 강조 영역) */
    --secondary: 38 96% 56%;             /* 따뜻한 골든 앰버 (#FBBF24) */
    --secondary-foreground: 28 80% 16%;  /* 짙은 브라운 텍스트 */

    /* [Accent] 상쾌한 민트 터콰이즈 (게이지 바, 성공, 칭찬 효과) */
    --accent: 168 76% 46%;               /* 청량한 네온 민트 (#14B8A6) */
    --accent-foreground: 0 0% 100%;

    /* [Muted] 자극 없는 소프트 파스텔 그레이 */
    --muted: 240 20% 93%;
    --muted-foreground: 240 10% 45%;

    /* [Border & Input] 둥글고 부드러운 테두리선 */
    --border: 240 18% 88%;
    --input: 240 18% 88%;
    --ring: 252 82% 60%;

    /* [Destructive] 친절한 코랄 레드 */
    --destructive: 0 84% 63%;
    --destructive-foreground: 0 0% 100%;

    /* [Border Radius] 초·중등생 친화적인 둥글둥글한 라운드 */
    --radius: 1.25rem;                   /* 20px (기본값) */
  }

  .dark {
    /* [다크 모드 - 우주 정거장 테마] 신비롭고 아늑한 딥 스페이스 */
    --background: 232 40% 10%;           /* 깊은 우주 네이비 (#0F1123) */
    --foreground: 210 40% 98%;

    --card: 233 36% 14%;                 /* 살짝 밝은 우주선 내부 (#161933) */
    --card-foreground: 210 40% 98%;
    --popover: 233 36% 14%;
    --popover-foreground: 210 40% 98%;

    --primary: 252 88% 68%;              /* 밤하늘 속 밝게 빛나는 바이올렛 (#818CF8) */
    --primary-foreground: 0 0% 100%;

    --secondary: 38 96% 58%;             /* 별빛 골든 앰버 */
    --secondary-foreground: 28 80% 16%;

    --accent: 168 76% 52%;               /* 형광 민트 오로라 */
    --accent-foreground: 232 40% 10%;

    --muted: 233 25% 22%;
    --muted-foreground: 233 15% 70%;

    --border: 233 25% 24%;
    --input: 233 25% 24%;
    --ring: 252 88% 68%;

    --destructive: 0 75% 60%;
    --destructive-foreground: 0 0% 100%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground antialiased;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}
```

---

### 3.2 `tailwind.config.ts` 설정 파일

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Pretendard", "SUIT", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        /* [에듀테크 전용 시맨틱 토큰] */
        edu: {
          violet: "#6366F1",
          amber: "#FBBF24",
          mint: "#14B8A6",
          coral: "#F43F5E",
          sky: "#38BDF8",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
        "3xl": "1.75rem", /* 28px: 질문 카드 및 모달용 */
      },
      boxShadow: {
        edu: "0 10px 25px -5px rgba(99, 102, 241, 0.15), 0 8px 10px -6px rgba(99, 102, 241, 0.1)",
        "edu-hover": "0 20px 30px -10px rgba(99, 102, 241, 0.25), 0 10px 15px -5px rgba(99, 102, 241, 0.15)",
        card: "0 4px 20px 0 rgba(0, 0, 0, 0.05)",
      },
      keyframes: {
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", filter: "drop-shadow(0 0 12px rgba(251, 191, 36, 0.6))" },
          "50%": { opacity: "0.8", filter: "drop-shadow(0 0 4px rgba(251, 191, 36, 0.2))" },
        },
      },
      animation: {
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

---

## 🧩 4. 필수 컴포넌트 커스텀 구현 예시 (Edu-Tech 특화)

Shadcn/ui 기본 컴포넌트를 초·중학생 맞춤형으로 튜닝한 실전 코드 가이드입니다.

### 4.1 `Button` - 탄성 있는 입체 버튼 (Bounce & Shadow)
단조로운 플랫 버튼 대신, 누르고 싶어지는 입체감(하단 그림자)과 클릭 시 쫀득한 피드백을 부여합니다.

```tsx
// components/edu/EduButton.tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EduButtonProps extends React.ComponentProps<typeof Button> {
  variantType?: "primary" | "secondary" | "accent";
}

export function EduButton({
  children,
  className,
  variantType = "primary",
  ...props
}: EduButtonProps) {
  const colorStyles = {
    primary: "bg-primary hover:bg-primary/90 text-white shadow-[0_6px_0_0_#4338CA] active:translate-y-1.5 active:shadow-none",
    secondary: "bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-[0_6px_0_0_#D97706] active:translate-y-1.5 active:shadow-none",
    accent: "bg-accent hover:bg-accent/90 text-white shadow-[0_6px_0_0_#0F766E] active:translate-y-1.5 active:shadow-none",
  };

  return (
    <Button
      className={cn(
        "h-14 px-8 text-lg font-bold rounded-2xl transition-all duration-150 transform",
        colorStyles[variantType],
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
```

---

### 4.2 `Card` - 말랑말랑한 퀴즈 질문 카드
테두리를 넉넉한 `rounded-3xl`로 깎고, 은은한 컬러 보더를 주어 집중력을 높입니다.

```tsx
// components/edu/QuestionCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface QuestionCardProps {
  step: string;
  question: string;
  children: React.ReactNode;
}

export function QuestionCard({ step, question, children }: QuestionCardProps) {
  return (
    <Card className="rounded-3xl border-2 border-primary/20 shadow-edu bg-white/95 dark:bg-card/95 backdrop-blur-sm overflow-hidden">
      <CardHeader className="pb-3 text-center">
        <div className="flex justify-center mb-2">
          <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 px-4 py-1 text-sm font-semibold rounded-full">
            {step}
          </Badge>
        </div>
        <CardTitle className="text-xl md:text-2xl font-bold leading-relaxed text-foreground word-keep-all">
          {question}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-2">
        {children}
      </CardContent>
    </Card>
  );
}
```

---

### 4.3 `Progress` - 반짝이는 젤리 게이지 바
민트색 그라데이션과 통통 튀는 애니메이션으로 진행 상황을 시각화합니다.

```tsx
// components/edu/EduProgress.tsx
import { Progress } from "@/components/ui/progress";

interface EduProgressProps {
  current: number;
  total: number;
}

export function EduProgress({ current, total }: EduProgressProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center text-sm font-bold">
        <span className="text-primary flex items-center gap-1.5">
          🚀 <span>탐험 진행률</span>
        </span>
        <span className="text-muted-foreground font-extrabold bg-muted px-2.5 py-0.5 rounded-full text-xs">
          {current} / {total} ({percentage}%)
        </span>
      </div>
      <div className="relative h-4 w-full bg-muted rounded-full overflow-hidden p-0.5">
        <div
          className="h-full bg-gradient-to-r from-primary via-indigo-400 to-accent rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(20,184,166,0.5)]"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
```

---

### 4.4 `Radio Group` - 2지선다 인터랙티브 선택지 카드
라디오 버튼의 조그만 동그라미를 누르는 대신, 카드 전체를 터치 가능한 커다란 선택지로 변경합니다.

```tsx
// components/edu/QuizOptionCard.tsx
import { cn } from "@/lib/utils";

interface QuizOptionCardProps {
  label: "A" | "B";
  text: string;
  isSelected: boolean;
  onSelect: () => void;
}

export function QuizOptionCard({ label, text, isSelected, onSelect }: QuizOptionCardProps) {
  return (
    <div
      onClick={onSelect}
      className={cn(
        "cursor-pointer p-5 rounded-2xl border-2 transition-all duration-200 select-none",
        "flex items-start gap-4 transform active:scale-[0.98]",
        isSelected
          ? "border-primary bg-primary/10 shadow-edu ring-2 ring-primary/40 -translate-y-1"
          : "border-border hover:border-primary/40 bg-card hover:bg-muted/40 hover:-translate-y-0.5"
      )}
    >
      <div
        className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-lg flex-shrink-0 transition-colors",
          isSelected
            ? "bg-primary text-white shadow-md"
            : "bg-muted text-muted-foreground"
        )}
      >
        {label}
      </div>
      <p className="text-base md:text-lg font-medium leading-snug pt-1 text-foreground">
        {text}
      </p>
    </div>
  );
}
```

---

### 4.5 `Input` & `Select` - 학생 친화적 이름 & 학년 입력 폼
초점(Focus)이 갈 때 산뜻한 네온 링과 굵은 폰트를 적용합니다.

```tsx
// components/edu/StudentProfileForm.tsx
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function StudentProfileForm() {
  return (
    <div className="space-y-4">
      {/* 닉네임 / 이름 입력창 */}
      <div className="space-y-1.5 text-left">
        <label className="text-sm font-bold text-foreground flex items-center gap-1">
          👤 <span>탐험가 이름 (또는 별명)</span>
        </label>
        <Input
          placeholder="예: 우주대장 길동이"
          maxLength={8}
          className="h-13 text-base rounded-2xl border-2 border-border focus-visible:ring-primary focus-visible:border-primary px-4 font-semibold"
        />
      </div>

      {/* 학년 선택 드롭다운 */}
      <div className="space-y-1.5 text-left">
        <label className="text-sm font-bold text-foreground flex items-center gap-1">
          🎓 <span>현재 학년</span>
        </label>
        <Select defaultValue="e6">
          <SelectTrigger className="h-13 rounded-2xl border-2 border-border focus:ring-primary text-base font-semibold px-4">
            <SelectValue placeholder="학년을 골라줘!" />
          </SelectTrigger>
          <SelectContent className="rounded-2xl border-2 border-border">
            <SelectItem value="e4" className="rounded-xl py-2.5 font-medium">초등학교 4학년</SelectItem>
            <SelectItem value="e5" className="rounded-xl py-2.5 font-medium">초등학교 5학년</SelectItem>
            <SelectItem value="e6" className="rounded-xl py-2.5 font-medium">초등학교 6학년</SelectItem>
            <SelectItem value="m1" className="rounded-xl py-2.5 font-medium">중학교 1학년</SelectItem>
            <SelectItem value="m2" className="rounded-xl py-2.5 font-medium">중학교 2학년</SelectItem>
            <SelectItem value="m3" className="rounded-xl py-2.5 font-medium">중학교 3학년</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
```

---

### 4.6 `Badge` - 칭찬 뱃지 & 성향 태그
귀여운 파스텔톤 배경과 이모지를 결합한 태그 뱃지입니다.

```tsx
// components/edu/EduBadge.tsx
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface EduBadgeProps {
  emoji?: string;
  label: string;
  color?: "violet" | "amber" | "mint" | "coral";
}

export function EduBadge({ emoji, label, color = "violet" }: EduBadgeProps) {
  const styles = {
    violet: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300 border-indigo-200",
    amber: "bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border-amber-200",
    mint: "bg-teal-100 text-teal-800 dark:bg-teal-950/70 dark:text-teal-300 border-teal-200",
    coral: "bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 border-rose-200",
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        "px-3.5 py-1 text-sm font-bold rounded-full border flex items-center gap-1.5 shadow-sm inline-flex",
        styles[color]
      )}
    >
      {emoji && <span>{emoji}</span>}
      <span>{label}</span>
    </Badge>
  );
}
```

---

## 🔤 5. 추천 타이포그래피 (한글 웹폰트)

초·중학생의 가독성을 높이기 위해 자소의 형태가 또렷하고 둥글며, 행간(Line-height)이 여유로운 폰트를 권장합니다.

```tsx
// app/layout.tsx (Pretendard 웹폰트 적용 예시)
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "나만의 미래 직업 & 역사 롤모델 찾기 | MBTI 진로 탐험",
  description: "초·중학생 맞춤형 MBTI로 재미있게 미래 직업과 역사 속 멘토를 찾아보세요!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="font-sans min-h-screen bg-background selection:bg-primary/20 selection:text-primary">
        <main className="max-w-md md:max-w-xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
```

---

## 🚀 6. 결론 및 빠른 개발 체크리스트

1. [ ] `npx shadcn@latest init` 실행 후 기본 템플릿 세팅
2. [ ] `npx shadcn@latest add button card progress radio-group input select badge` 컴포넌트 설치
3. [ ] `app/globals.css` 및 `tailwind.config.ts`에 본 문서의 **Cosmic Discovery HSL 토큰** 복사
4. [ ] `career_mbti_content.md`의 JSON 데이터셋을 `lib/mbtiData.json`으로 임포트하여 화면 구성
