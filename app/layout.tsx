import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "나만의 미래 직업 & 역사 롤모델 찾기 | 초·중학생 MBTI 진로 탐색",
  description:
    "초·중학생 맞춤형 MBTI로 재미있게 나의 성향을 알아보고, 4차 산업혁명 미래 직업과 역사 속 위인 롤모델을 찾아보세요!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
        {children}
      </body>
    </html>
  );
}
