import type { AppConstants, PostCategory, TabItem } from '@/types';

// === App Configuration ===
export const APP_CONSTANTS: AppConstants = {
  MAX_TITLE_LENGTH: 50,
  TITLE_TRUNCATE_LENGTH: 47,
  TITLE_SUFFIX: '...',
  MAX_CONTENT_LENGTH: 10000, // 10,000자로 확장
  RECENT_ACTIVITY_DAYS: 7,
} as const;

// === Post Categories ===
export const POST_CATEGORIES: Record<PostCategory, string> = {
  latest: '최신글',
  weekly: '주간 인기글',
  'hall-of-fame': '명예의 전당',
} as const;

// === Tab Configuration ===
export const TAB_ITEMS: TabItem[] = [
  {
    id: 'latest',
    label: '최신글',
    icon: 'Clock',
  },
  {
    id: 'weekly',
    label: '주간 인기글',
    icon: 'TrendingUp',
  },
  {
    id: 'hall-of-fame',
    label: '명예의 전당',
    icon: 'Crown',
  },
] as const;

// === Streak Configuration ===
export const STREAK_CONFIG = {
  EMOJI_THRESHOLDS: {
    LEGENDARY: 30,
    MASTER: 14,
    APPRENTICE: 7,
  },
  COLORS: {
    LEGENDARY: 'text-purple-500',
    MASTER: 'text-orange-500',
    APPRENTICE: 'text-red-500',
    BEGINNER: 'text-gray-500',
  },
  EMOJIS: {
    LEGENDARY: '🔥🔥🔥',
    MASTER: '🔥🔥',
    APPRENTICE: '🔥',
    BEGINNER: '💪',
  },
} as const;

// === UI Configuration ===
export const UI_CONFIG = {
  ANIMATION_DURATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
  },
  TOAST: {
    DEFAULT_DURATION: 5000,
  },
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
  },
  Z_INDEX: {
    DROPDOWN: 50,
    STICKY: 40,
    FIXED: 30,
    OVERLAY: 20,
    MODAL: 10,
  },
} as const;

// === Color Palette ===
export const COLORS = {
  PRIMARY: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  BRAND: {
    PRIMARY: '#ff8a80',    // 따뜻한 코럴
    SECONDARY: '#ff5722',  // 진한 오렌지
    ACCENT: '#ffab91',     // 부드러운 피치
  },
  GRAY: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
} as const;

// === Error Messages ===
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '네트워크 연결을 확인해주세요',
  VALIDATION_FAILED: '입력 정보를 확인해주세요',
  CONTENT_TOO_LONG: `내용은 ${APP_CONSTANTS.MAX_CONTENT_LENGTH}자를 초과할 수 없습니다`,
  CONTENT_REQUIRED: '내용을 입력해주세요',
  TITLE_TOO_LONG: `제목은 ${APP_CONSTANTS.MAX_TITLE_LENGTH}자를 초과할 수 없습니다`,
  GENERIC_ERROR: '알 수 없는 오류가 발생했습니다',
} as const;

// === Success Messages ===
export const SUCCESS_MESSAGES = {
  POST_CREATED: '게시물이 성공적으로 작성되었습니다',
  POST_UPDATED: '게시물이 성공적으로 수정되었습니다',
  POST_DELETED: '게시물이 삭제되었습니다',
  LIKE_ADDED: '좋아요를 눌렀습니다',
  LIKE_REMOVED: '좋아요를 취소했습니다',
} as const;

// === Validation Rules ===
export const VALIDATION_RULES = {
  CONTENT: {
    required: true,
    maxLength: APP_CONSTANTS.MAX_CONTENT_LENGTH,
  },
  TITLE: {
    required: true,
    maxLength: APP_CONSTANTS.MAX_TITLE_LENGTH,
  },
} as const;

// === API Endpoints (for future use) ===
export const API_ENDPOINTS = {
  POSTS: '/api/posts',
  COMMENTS: '/api/comments',
  USERS: '/api/users',
  REACTIONS: '/api/reactions',
} as const;

// === Local Storage Keys ===
export const STORAGE_KEYS = {
  THEME: 'til-theme',
  USER_PREFERENCES: 'til-user-preferences',
  DRAFT_POST: 'til-draft-post',
} as const;