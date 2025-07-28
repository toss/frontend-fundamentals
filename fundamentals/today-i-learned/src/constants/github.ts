// GitHub API 페이지네이션 관련 상수
export const PAGE_SIZE = {
  DEFAULT: 50, // 기본 페이지 사이즈 (GitHub API 제한 준수)
  INFINITE_SCROLL: 5 // 무한스크롤용 작은 사이즈
} as const;
