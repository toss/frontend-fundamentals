import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ActivityDay } from "@/types";
import { APP_CONSTANTS, STREAK_CONFIG } from "@/constants";

// === Style Utilities ===
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// === Text Utilities ===
export const truncateText = (
  text: string,
  maxLength: number = APP_CONSTANTS.MAX_TITLE_LENGTH,
  suffix: string = APP_CONSTANTS.TITLE_SUFFIX
): string => {
  if (text.length <= maxLength) return text;

  const truncateLength = maxLength - suffix.length;
  return text.substring(0, truncateLength) + suffix;
};

export const generateTitle = (content: string): string => {
  return truncateText(content, APP_CONSTANTS.MAX_TITLE_LENGTH);
};

export const extractTags = (content: string): string[] => {
  const tagRegex = /#[\w가-힣]+/g;
  return content.match(tagRegex)?.map((tag) => tag.slice(1)) || [];
};

export const highlightTags = (content: string): string => {
  return content.replace(
    /#([\w가-힣]+)/g,
    '<span class="text-blue-500 font-medium">#$1</span>'
  );
};

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

// === Streak Utilities ===
export const getStreakLevel = (
  streak: number
): keyof typeof STREAK_CONFIG.EMOJIS => {
  if (streak >= STREAK_CONFIG.EMOJI_THRESHOLDS.LEGENDARY) return "LEGENDARY";
  if (streak >= STREAK_CONFIG.EMOJI_THRESHOLDS.MASTER) return "MASTER";
  if (streak >= STREAK_CONFIG.EMOJI_THRESHOLDS.APPRENTICE) return "APPRENTICE";
  return "BEGINNER";
};

export const getStreakColor = (streak: number): string => {
  const level = getStreakLevel(streak);
  return STREAK_CONFIG.COLORS[level];
};

export const getStreakEmoji = (streak: number): string => {
  const level = getStreakLevel(streak);
  return STREAK_CONFIG.EMOJIS[level];
};

export const generateRecentActivity = (
  days: number = APP_CONSTANTS.RECENT_ACTIVITY_DAYS
): ActivityDay[] => {
  const today = new Date();
  const activities: ActivityDay[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    activities.push({
      date: date.toISOString().split("T")[0],
      hasActivity: Math.random() > 0.3, // 70% chance of activity
      postCount: Math.floor(Math.random() * 3) + 1
    });
  }

  return activities;
};

// === Validation Utilities ===
export const validateContent = (
  content: string
): { isValid: boolean; error?: string } => {
  if (!content.trim()) {
    return { isValid: false, error: "내용을 입력해주세요" };
  }

  if (content.length > APP_CONSTANTS.MAX_CONTENT_LENGTH) {
    return {
      isValid: false,
      error: `내용은 ${APP_CONSTANTS.MAX_CONTENT_LENGTH}자를 초과할 수 없습니다`
    };
  }

  return { isValid: true };
};

export const validateTitle = (
  title: string
): { isValid: boolean; error?: string } => {
  if (!title.trim()) {
    return { isValid: false, error: "제목을 입력해주세요" };
  }

  if (title.length > APP_CONSTANTS.MAX_TITLE_LENGTH) {
    return {
      isValid: false,
      error: `제목은 ${APP_CONSTANTS.MAX_TITLE_LENGTH}자를 초과할 수 없습니다`
    };
  }

  return { isValid: true };
};

// === Array Utilities ===
export const groupBy = <T, K extends keyof any>(
  array: T[],
  keyFn: (item: T) => K
): Record<K, T[]> => {
  return array.reduce(
    (groups, item) => {
      const key = keyFn(item);
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
      return groups;
    },
    {} as Record<K, T[]>
  );
};

export const unique = <T>(array: T[]): T[] => [...new Set(array)];

export const sortBy = <T>(
  array: T[],
  keyFn: (item: T) => any,
  order: "asc" | "desc" = "asc"
): T[] => {
  return [...array].sort((a, b) => {
    const aVal = keyFn(a);
    const bVal = keyFn(b);

    if (order === "asc") {
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    } else {
      return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
    }
  });
};

// === Local Storage Utilities ===
export const storage = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : (defaultValue ?? null);
    } catch {
      return defaultValue ?? null;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn("Failed to save to localStorage:", error);
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn("Failed to remove from localStorage:", error);
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.warn("Failed to clear localStorage:", error);
    }
  }
};

// === Debounce Utility ===
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// === URL Utilities ===
export const createSearchParams = (
  params: Record<string, string | number | boolean>
): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString();
};
