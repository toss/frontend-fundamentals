/**
 * Minimal Tailwind config for the new UI reset-first approach.
 * - No theme variables
 * - No plugins
 * - No dark mode presets
 * Pages/components should style themselves with utilities.
 *
 * If you need to expand the theme later, extend here conservatively.
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      // 기본: ~767px (모바일)
      // tablet starts at 768px
      md: "768px",
      // desktop starts at 1024px
      lg: "1024px"
    },
    extend: {
      fontFamily: {
        'sans': ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Malgun Gothic', '맑은 고딕', 'sans-serif'],
        'pretendard': ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Malgun Gothic', '맑은 고딕', 'sans-serif']
      }
    }
  },
  plugins: []
};
