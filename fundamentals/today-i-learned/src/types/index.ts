export type PostCategory = "latest" | "weekly" | "hall-of-fame";

export interface TabItem<T extends string = PostCategory> {
  id: T;
  label: string;
  icon: React.ReactNode;
  count?: number;
}

// === Streak & Activity Types ===

export interface ActivityDay {
  date: string;
  hasActivity: boolean;
  postCount: number;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  postsThisWeek: number;
  totalPosts: number;
  recentActivity: ActivityDay[];
}

// === Form & Input Types ===

export interface CreatePostData {
  title: string;
  content: string;
  tags?: string[];
}

export interface CreateCommentData {
  postId: string;
  content: string;
  parentId?: string;
}

export interface FormFieldState {
  value: string;
  error?: string;
  touched: boolean;
  dirty: boolean;
}

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean | string;
}

// === UI & Component Types ===

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface NavigationItem {
  label: string;
  href: string;
  isActive?: boolean;
  icon?: React.ReactNode;
}

export type LoadingState = "idle" | "loading" | "success" | "error";

export type Theme = "light" | "dark" | "system";

export interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

// === Error Handling ===

export interface AppError {
  code: string;
  message: string;
  details?: unknown;
  timestamp?: string;
}

// === Utility Types ===

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;

// === Timeline & Sorting Types ===

export type SortOption = "newest" | "realtime" | "hall-of-fame";

export interface ChallengeDay {
  day: number;
  date?: string;
  status: "completed" | "today" | "pending" | "posted";
  streak?: number;
}

export interface MonthlyChallenge {
  year: number;
  month: number;
  days: ChallengeDay[];
}

// === Constants Types ===

export interface AppConstants {
  MAX_TITLE_LENGTH: number;
  TITLE_TRUNCATE_LENGTH: number;
  TITLE_SUFFIX: string;
  MAX_CONTENT_LENGTH: number;
  RECENT_ACTIVITY_DAYS: number;
}
