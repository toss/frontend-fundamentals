import type {
  User,
  Post,
  Category,
  MonthlyChallenge,
  PopularPost,
  SortOption
} from "./types";

// Mock Users
export const mockUsers: User[] = [
  {
    id: "1",
    name: "User Kim",
    username: "user1234",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "2",
    name: "User Han",
    username: "user1234",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "3",
    name: "Soyeon Han",
    username: "user1234",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "4",
    name: "User Park",
    username: "user1234",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: "5",
    name: "User Jung",
    username: "user1234",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  }
];

// Current User (for post input)
export const currentUser = mockUsers[0];

// Mock Categories
export const mockCategories: Category[] = [
  { id: "all", name: "All", selected: true },
  { id: "seongji", name: "성지", selected: false },
  { id: "review", name: "코드리뷰", selected: false },
  { id: "discussion", name: "토론", selected: false }
];

// Mock Posts
export const mockPosts: Post[] = [
  {
    id: "1",
    title: "조건부 렌더링 처리, 다들 어떻게 처리하시나요?",
    content:
      "안녕하세요! 리액트로 코드를 작성하다 보면 조건부 렌더링을 할 일이 정말 많죠. 저는 보통 AND 논리 연산자(&&)나 삼항 연산자(?:)를 이용해서 조건부 렌더링을 처리하곤 하는데요. 최근 회사 코드를 살펴보다가, 아래처럼 선언적인 방식으로 조건부 ...",
    author: mockUsers[0],
    createdAt: "2024-08-07T10:00:00Z",
    category: "Suggest New Strategy",
    tags: ["성지", "Ongoing reviews", "가독성"],
    stats: {
      upvotes: 1300,
      hearts: 1000000,
      comments: 22,
      shares: 31
    },
    isOwn: false
  },
  {
    id: "2",
    title: "조건부 렌더링 처리, 다들 어떻게 처리하시나요?",
    content:
      "안녕하세요! 리액트로 코드를 작성하다 보면 조건부 렌더링을 할 일이 정말 많죠. 저는 보통 AND 논리 연산자(&&)나 삼항 연산자(?:)를 이용해서 조건부 렌더링을 처리하곤 하는데요. 최근 회사 코드를 살펴보다가, 아래처럼 선언적인 방식으로 조건부 ...",
    author: mockUsers[1],
    createdAt: "2024-08-07T09:00:00Z",
    category: "A vs B",
    tags: ["Changes requested", "컨벤션"],
    stats: {
      upvotes: 1300,
      hearts: 1000000,
      comments: 22,
      shares: 31
    },
    isOwn: false
  },
  {
    id: "3",
    title: "조건부 렌더링 처리, 다들 어떻게 처리하시나요?",
    content:
      "안녕하세요! 리액트로 코드를 작성하다 보면 조건부 렌더링을 할 일이 정말 많죠. 저는 보통 AND 논리 연산자(&&)나 삼항 연산자(?:)를 이용해서 조건부 렌더링을 처리하곤 하는데요. 최근 회사 코드를 살펴보다가, 아래처럼 선언적인 방식으로 조건부 ...",
    author: mockUsers[2],
    createdAt: "2024-08-07T08:00:00Z",
    category: "Code Smell",
    tags: ["결합도", "Ongoing reviews", "기여"],
    stats: {
      upvotes: 1300,
      hearts: 1000000,
      comments: 22,
      shares: 31
    },
    isOwn: true
  },
  {
    id: "4",
    title: "조건부 렌더링 처리, 다들 어떻게 처리하시나요?",
    content:
      "안녕하세요! 리액트로 코드를 작성하다 보면 조건부 렌더링을 할 일이 정말 많죠. 저는 보통 AND 논리 연산자(&&)나 삼항 연산자(?:)를 이용해서 조건부 렌더링을 처리하곤 하는데요. 최근 회사 코드를 살펴보다가, 아래처럼 선언적인 방식으로 조건부 ...",
    author: mockUsers[3],
    createdAt: "2024-08-07T07:00:00Z",
    category: "Open Forum",
    tags: ["성지", "설계"],
    stats: {
      upvotes: 1300,
      hearts: 1000000,
      comments: 22,
      shares: 31
    },
    isOwn: false
  }
];

// Mock Monthly Challenge
export const mockChallenge: MonthlyChallenge = {
  year: 2025,
  month: 8,
  days: [
    { day: 1, date: "2025-08-01", status: "completed", streak: 1 },
    { day: 2, date: "2025-08-02", status: "completed", streak: 2 },
    { day: 3, date: "2025-08-03", status: "completed", streak: 3 },
    { day: 4, date: "2025-08-04", status: "completed", streak: 4 },
    { day: 5, date: "2025-08-05", status: "completed", streak: 5 },
    { day: 6, date: "2025-08-06", status: "completed", streak: 6 },
    { day: 7, date: "2025-08-07", status: "today" },
    ...Array.from({ length: 24 }, (_, i) => ({
      day: i + 8,
      date: `2025-08-${String(i + 8).padStart(2, "0")}`,
      status: "pending" as const
    }))
  ]
};

// Mock Popular Posts
export const mockPopularPosts: PopularPost[] = [
  {
    id: "p1",
    title: "조건부 렌더링 처리, 다들 어떻게 처리하시나요?",
    author: mockUsers[0],
    excerpt:
      "안녕하세요! 리액트로 코드를 작성하다 보면 조건부 렌더링을 할 일이 정말 ...",
    rank: 1
  },
  {
    id: "p2",
    title: "조건부 렌더링 처리, 다들 어떻게 처리하시나요?",
    author: { id: "anonymous", name: "Anonymous", username: "anonymous" },
    excerpt:
      "안녕하세요! 리액트로 코드를 작성하다 보면 조건부 렌더링을 할 일이 정말 ...",
    rank: 2
  },
  {
    id: "p3",
    title: "조건부 렌더링 처리, 다들 어떻게 처리하시나요?",
    author: mockUsers[1],
    excerpt:
      "안녕하세요! 리액트로 코드를 작성하다 보면 조건부 렌더링을 할 일이 정말 ...",
    rank: 3
  },
  {
    id: "p4",
    title: "조건부 렌더링 처리, 다들 어떻게 처리하시나요?",
    author: mockUsers[4],
    excerpt:
      "안녕하세요! 리액트로 코드를 작성하다 보면 조건부 렌더링을 할 일이 정말 ...",
    rank: 4
  },
  {
    id: "p5",
    title: "조건부 렌더링 처리, 다들 어떻게 처리하시나요?",
    author: mockUsers[0],
    excerpt:
      "안녕하세요! 리액트로 코드를 작성하다 보면 조건부 렌더링을 할 일이 정말 ...",
    rank: 5
  }
];
