import type { GitHubDiscussion } from "@/api/remote/discussions";

export const mockHallOfFamePosts: GitHubDiscussion[] = [
  {
    id: "1",
    title: "조건부 렌더링 처리, 다들 어떻게 하시나요?",
    body: "안녕하세요! 리액트로 코드를 작성하다 보면 조건부 렌더링을 할 일이 정말 많죠. 저는 보통 AND 논리 연산자(&&)나 삼항 연산자(?:)를 이용해서 조건부 렌더링을 처리하곤 하는데요. 최근 회사 코드를 살펴보다가, 아...",
    createdAt: "2024-08-30T14:00:00Z",
    updatedAt: "2024-08-30T14:00:00Z",
    author: {
      login: "user1234",
      avatarUrl: "https://github.com/user1234.png"
    },
    reactions: {
      totalCount: 1300
    },
    comments: {
      totalCount: 22,
      nodes: []
    },
    labels: [
      {
        name: "성지 ⛲",
        color: "FFD700"
      }
    ]
  },
  {
    id: "2",
    title: "TypeScript 제네릭 활용법",
    body: "TypeScript에서 제네릭을 활용하면 타입 안정성을 보장하면서도 코드의 재사용성을 높일 수 있습니다. 특히 유틸리티 타입들과 함께 사용하면 강력한 타입 시스템을 구축할 수 있어요...",
    createdAt: "2024-08-29T10:30:00Z",
    updatedAt: "2024-08-29T10:30:00Z",
    author: {
      login: "user1234",
      avatarUrl: "https://github.com/user1234.png"
    },
    reactions: {
      totalCount: 890
    },
    comments: {
      totalCount: 15,
      nodes: []
    },
    labels: [
      {
        name: "성지 ⛲",
        color: "FFD700"
      }
    ]
  },
  {
    id: "3",
    title: "React 18의 Concurrent Features 정리",
    body: "React 18에서 도입된 Concurrent Features에 대해 정리해봤습니다. Suspense, useTransition, useDeferredValue 등의 새로운 기능들을 실제 프로젝트에 적용해본 경험을 공유합니다...",
    createdAt: "2024-08-28T16:45:00Z",
    updatedAt: "2024-08-28T16:45:00Z",
    author: {
      login: "user1234",
      avatarUrl: "https://github.com/user1234.png"
    },
    reactions: {
      totalCount: 1520
    },
    comments: {
      totalCount: 28,
      nodes: []
    },
    labels: [
      {
        name: "성지 ⛲",
        color: "FFD700"
      }
    ]
  },
  {
    id: "4",
    title: "웹 성능 최적화 체크리스트",
    body: "프론트엔드 개발에서 성능 최적화는 정말 중요한 부분이죠. 이미지 최적화, 코드 스플리팅, 메모이제이션 등 다양한 기법들을 체크리스트 형태로 정리해봤습니다...",
    createdAt: "2024-08-27T09:15:00Z",
    updatedAt: "2024-08-27T09:15:00Z",
    author: {
      login: "user1234",
      avatarUrl: "https://github.com/user1234.png"
    },
    reactions: {
      totalCount: 2100
    },
    comments: {
      totalCount: 45,
      nodes: []
    },
    labels: [
      {
        name: "성지 ⛲",
        color: "FFD700"
      }
    ]
  },
  {
    id: "5",
    title: "Next.js App Router 마이그레이션 가이드",
    body: "Next.js 13에서 도입된 App Router로 마이그레이션하는 과정을 상세히 정리했습니다. Pages Router에서 App Router로 전환할 때 주의할 점들과 베스트 프랙티스를 공유합니다...",
    createdAt: "2024-08-26T13:20:00Z",
    updatedAt: "2024-08-26T13:20:00Z",
    author: {
      login: "user1234",
      avatarUrl: "https://github.com/user1234.png"
    },
    reactions: {
      totalCount: 970
    },
    comments: {
      totalCount: 18,
      nodes: []
    },
    labels: [
      {
        name: "성지 ⛲",
        color: "FFD700"
      }
    ]
  },
  {
    id: "6",
    title: "CSS Grid vs Flexbox 언제 뭘 써야 할까?",
    body: "CSS Grid와 Flexbox, 둘 다 레이아웃을 위한 강력한 도구지만 각각의 특징과 적절한 사용 시점이 다릅니다. 실제 사례와 함께 언제 어떤 것을 사용해야 하는지 정리해봤어요...",
    createdAt: "2024-08-25T11:30:00Z",
    updatedAt: "2024-08-25T11:30:00Z",
    author: {
      login: "user1234",
      avatarUrl: "https://github.com/user1234.png"
    },
    reactions: {
      totalCount: 750
    },
    comments: {
      totalCount: 12,
      nodes: []
    },
    labels: [
      {
        name: "성지 ⛲",
        color: "FFD700"
      }
    ]
  },
  {
    id: "7",
    title: "JavaScript 비동기 처리 완벽 가이드",
    body: "콜백, Promise, async/await까지! JavaScript의 비동기 처리 방식을 순서대로 정리하고, 각각의 장단점과 사용 시나리오를 실제 코드 예제와 함께 설명합니다...",
    createdAt: "2024-08-24T15:45:00Z",
    updatedAt: "2024-08-24T15:45:00Z",
    author: {
      login: "user1234",
      avatarUrl: "https://github.com/user1234.png"
    },
    reactions: {
      totalCount: 1850
    },
    comments: {
      totalCount: 35,
      nodes: []
    },
    labels: [
      {
        name: "성지 ⛲",
        color: "FFD700"
      }
    ]
  },
  {
    id: "8",
    title: "모던 JavaScript 개발 환경 구축하기",
    body: "Vite, ESLint, Prettier, TypeScript까지! 모던 JavaScript 프로젝트의 개발 환경을 처음부터 끝까지 구축하는 과정을 단계별로 설명합니다...",
    createdAt: "2024-08-23T08:00:00Z",
    updatedAt: "2024-08-23T08:00:00Z",
    author: {
      login: "user1234",
      avatarUrl: "https://github.com/user1234.png"
    },
    reactions: {
      totalCount: 1200
    },
    comments: {
      totalCount: 25,
      nodes: []
    },
    labels: [
      {
        name: "성지 ⛲",
        color: "FFD700"
      }
    ]
  }
];