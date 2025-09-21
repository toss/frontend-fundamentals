import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // CSS 레이어 접두사
  preflight: true,

  // CSS 파일 생성 옵션
  emitPackage: true,

  // 스타일 적용할 파일 경로
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // 제외할 파일
  exclude: [],

  // 테마 설정
  theme: {
    extend: {
      // Tailwind와 동일한 브레이크포인트 설정
      breakpoints: {
        md: "768px",
        lg: "1024px"
      },

      // 폰트 설정
      tokens: {
        fonts: {
          pretendard: {
            value: "Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Malgun Gothic', '맑은 고딕', sans-serif"
          },
          sans: {
            value: "Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Malgun Gothic', '맑은 고딕', sans-serif"
          }
        },

        // 색상 토큰 (필요시 추가)
        colors: {
          border: {
            default: { value: "rgba(201,201,201,0.4)" },
            divider: { value: "rgba(201,201,201,0.4)" }
          },
          text: {
            muted: { value: "rgba(0,0,0,0.6)" },
            light: { value: "rgba(0,0,0,0.4)" }
          }
        }
      }
    }
  },

  // 출력 설정
  outdir: "styled-system",

  // JSX 프레임워크
  jsxFramework: "react",

  // 스타일 props
  jsxStyleProps: "minimal"
});