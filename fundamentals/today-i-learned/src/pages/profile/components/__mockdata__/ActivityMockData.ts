import type { GitHubDiscussion } from "@/api/remote/discussions";

export const mockActivityPosts: GitHubDiscussion[] = [
  {
    id: "activity-1",
    title: "React 19의 새로운 기능들 정리",
    body: "React 19에서 새롭게 도입될 기능들을 정리해봤습니다. Server Components의 개선사항, 새로운 훅들, 그리고 성능 최적화에 대해 알아보겠습니다...",
    createdAt: "2024-08-31T09:30:00Z",
    updatedAt: "2024-08-31T15:45:00Z",
    author: {
      login: "user1234",
      avatarUrl: "https://github.com/user1234.png"
    },
    reactions: {
      totalCount: 245
    },
    comments: {
      totalCount: 8,
      nodes: []
    },
    labels: []
  },
  {
    id: "activity-2",
    title: "Tailwind CSS vs Styled Components 비교",
    body: "실제 프로젝트에서 Tailwind CSS와 Styled Components를 모두 사용해본 경험을 바탕으로 각각의 장단점과 사용 시나리오를 비교해봅니다...",
    createdAt: "2024-08-30T15:20:00Z",
    updatedAt: "2024-08-30T18:30:00Z",
    author: {
      login: "user1234",
      avatarUrl: "https://github.com/user1234.png"
    },
    reactions: {
      totalCount: 180
    },
    comments: {
      totalCount: 12,
      nodes: []
    },
    labels: []
  },
  {
    id: "activity-3",
    title: "GraphQL과 REST API 언제 뭘 써야 할까?",
    body: "API 설계 시 GraphQL과 REST 중 어떤 것을 선택해야 할지 고민이 많으시죠? 각각의 특징과 적절한 사용 시점에 대해 정리해봤습니다...",
    createdAt: "2024-08-29T11:45:00Z",
    updatedAt: "2024-09-01T10:15:00Z",
    author: {
      login: "user1234",
      avatarUrl: "https://github.com/user1234.png"
    },
    reactions: {
      totalCount: 320
    },
    comments: {
      totalCount: 18,
      nodes: []
    },
    labels: []
  },
  {
    id: "activity-4",
    title: "Next.js 14 App Router 완전 정복",
    body: "Next.js 14의 App Router를 완전히 마스터해보겠습니다. 라우팅, 레이아웃, 로딩 상태, 에러 처리까지 모든 것을 다룹니다...",
    createdAt: "2024-08-28T14:10:00Z",
    updatedAt: "2024-08-28T14:10:00Z",
    author: {
      login: "user1234",
      avatarUrl: "https://github.com/user1234.png"
    },
    reactions: {
      totalCount: 450
    },
    comments: {
      totalCount: 25,
      nodes: []
    },
    labels: []
  },
  {
    id: "activity-5",
    title: "Zustand vs Redux Toolkit 상태관리 비교",
    body: "복잡한 상태관리가 필요할 때 Zustand와 Redux Toolkit 중 어떤 것을 선택해야 할까요? 실제 사용 경험을 바탕으로 비교해봅니다...",
    createdAt: "2024-08-27T10:30:00Z",
    updatedAt: "2024-08-27T10:30:00Z",
    author: {
      login: "user1234",
      avatarUrl: "https://github.com/user1234.png"
    },
    reactions: {
      totalCount: 380
    },
    comments: {
      totalCount: 22,
      nodes: []
    },
    labels: []
  },
  {
    id: "activity-6",
    title: "React Testing Library 실전 가이드",
    body: "React 컴포넌트 테스트를 위한 Testing Library 사용법을 실전 예제와 함께 설명합니다. 단위 테스트부터 통합 테스트까지...",
    createdAt: "2024-08-26T16:00:00Z",
    updatedAt: "2024-08-26T16:00:00Z",
    author: {
      login: "user1234",
      avatarUrl: "https://github.com/user1234.png"
    },
    reactions: {
      totalCount: 290
    },
    comments: {
      totalCount: 14,
      nodes: []
    },
    labels: []
  },
  {
    id: "activity-7",
    title: "Vite로 개발 환경 최적화하기",
    body: "Create React App 대신 Vite를 사용해서 개발 환경을 최적화하는 방법을 알아보겠습니다. 빌드 속도 개선과 HMR 성능 향상에 대해...",
    createdAt: "2024-08-25T12:15:00Z",
    updatedAt: "2024-08-25T12:15:00Z",
    author: {
      login: "user1234",
      avatarUrl: "https://github.com/user1234.png"
    },
    reactions: {
      totalCount: 210
    },
    comments: {
      totalCount: 9,
      nodes: []
    },
    labels: []
  },
  {
    id: "activity-8",
    title: "TypeScript 고급 타입 활용법",
    body: "TypeScript의 고급 타입 기능들을 실제 프로젝트에서 어떻게 활용할 수 있는지 알아보겠습니다. Conditional Types, Mapped Types 등...",
    createdAt: "2024-08-24T09:45:00Z",
    updatedAt: "2024-08-24T09:45:00Z",
    author: {
      login: "user1234",
      avatarUrl: "https://github.com/user1234.png"
    },
    reactions: {
      totalCount: 340
    },
    comments: {
      totalCount: 16,
      nodes: []
    },
    labels: []
  },
  {
    id: "activity-9",
    title: "Web Accessibility 체크리스트",
    body: "웹 접근성을 개선하기 위한 체크리스트를 만들어봤습니다. WCAG 가이드라인을 바탕으로 실무에서 바로 적용할 수 있는 팁들을 정리했어요...",
    createdAt: "2024-08-23T13:20:00Z",
    updatedAt: "2024-08-23T13:20:00Z",
    author: {
      login: "user1234",
      avatarUrl: "https://github.com/user1234.png"
    },
    reactions: {
      totalCount: 195
    },
    comments: {
      totalCount: 7,
      nodes: []
    },
    labels: []
  },
  {
    id: "activity-10",
    title: "PWA 개발 시작하기",
    body: "Progressive Web App을 처음부터 만드는 방법을 단계별로 설명합니다. Service Worker, Web App Manifest, 오프라인 기능 구현까지...",
    createdAt: "2024-08-22T11:00:00Z",
    updatedAt: "2024-08-22T11:00:00Z",
    author: {
      login: "user1234",
      avatarUrl: "https://github.com/user1234.png"
    },
    reactions: {
      totalCount: 270
    },
    comments: {
      totalCount: 13,
      nodes: []
    },
    labels: []
  },
  {
    id: "activity-11",
    title: "React Hook Form vs Formik 비교",
    body: "폼 라이브러리 선택 시 고려사항들을 정리해봤습니다. React Hook Form과 Formik의 성능, 사용성, 기능을 비교분석합니다...",
    createdAt: "2024-08-21T14:30:00Z",
    updatedAt: "2024-08-21T14:30:00Z",
    author: {
      login: "user1234",
      avatarUrl: "https://github.com/user1234.png"
    },
    reactions: {
      totalCount: 160
    },
    comments: {
      totalCount: 11,
      nodes: []
    },
    labels: []
  },
  {
    id: "activity-12",
    title: "CSS-in-JS vs CSS Modules 성능 비교",
    body: "스타일링 방법론별 성능을 실제 측정해봤습니다. 번들 크기, 런타임 성능, 개발 경험을 종합적으로 비교분석한 결과를 공유합니다...",
    createdAt: "2024-08-20T10:15:00Z",
    updatedAt: "2024-08-20T10:15:00Z",
    author: {
      login: "user1234",
      avatarUrl: "https://github.com/user1234.png"
    },
    reactions: {
      totalCount: 230
    },
    comments: {
      totalCount: 15,
      nodes: []
    },
    labels: []
  }
];