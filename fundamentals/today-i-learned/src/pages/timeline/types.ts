export type PostCategory = "latest" | "weekly" | "hall-of-fame";

export interface TabItem<T extends string = PostCategory> {
  id: T;
  label: string;
  icon: React.ReactNode;
  count?: number;
}

export type SortOption = "newest" | "realtime" | "hall-of-fame";

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
