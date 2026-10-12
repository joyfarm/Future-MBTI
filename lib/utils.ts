import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind CSS 클래스명을 병합하고 충돌을 해결하는 공통 유틸리티 함수
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
