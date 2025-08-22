// User Types
export interface User {
  id: string;
  name: string;
  username: string;
  avatar?: string;
}

// Post Types
export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  category: string;
  tags: string[];
  stats: {
    upvotes: number;
    hearts: number;
    comments: number;
    shares: number;
  };
  isOwn?: boolean;
}

// Challenge Types
export interface ChallengeDay {
  day: number;
  date: string;
  status: "completed" | "today" | "pending";
  streak?: number;
}

export interface MonthlyChallenge {
  year: number;
  month: number;
  days: ChallengeDay[];
}

// Popular Post Types
export interface PopularPost {
  id: string;
  title: string;
  author: User;
  excerpt: string;
  rank: number;
}

// Filter Types
export interface Category {
  id: string;
  name: string;
  selected: boolean;
}

export type SortOption = "newest" | "popular" | "trending";

// Event Handlers
export interface PostInputProps {
  user: User;
  onSubmit: (data: { title: string; content: string }) => void;
  placeholder?: string;
}

export interface FilterSectionProps {
  categories: Category[];
  sortOption: SortOption;
  onCategoryChange: (categoryId: string) => void;
  onSortChange: (option: SortOption) => void;
}

export interface PostListProps {
  posts: Post[];
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onShare: (postId: string) => void;
  onUpvote: (postId: string) => void;
}

export interface MonthlyChallengeProps {
  challenge: MonthlyChallenge;
  onDayClick?: (day: number) => void;
}

export interface WeeklyTop5Props {
  posts: PopularPost[];
  weekInfo: string;
}

// Comment Types
export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  stats: {
    upvotes: number;
    replies: number;
  };
  parentId?: string;
  replies?: Comment[];
}

export interface CommentInputProps {
  onSubmit: (content: string) => void;
  placeholder?: string;
  isReply?: boolean;
  parentId?: string;
}

export interface CommentProps {
  comment: Comment;
  onUpvote: (commentId: string) => void;
  onReply: (commentId: string, content: string) => void;
  depth?: number;
}

export interface CommentListProps {
  comments: Comment[];
  onUpvote: (commentId: string) => void;
  onReply: (commentId: string, content: string) => void;
}

export interface PostDetailProps {
  post: Post;
  comments: Comment[];
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onShare: (postId: string) => void;
  onUpvote: (postId: string) => void;
  onCommentUpvote: (commentId: string) => void;
  onReply: (commentId: string, content: string) => void;
  onNewComment: (content: string) => void;
}
