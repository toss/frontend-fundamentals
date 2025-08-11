import type { GitHubDiscussion } from "../types";

export const mockDiscussions: GitHubDiscussion[] = [
  {
    id: "mock-1",
    title: "React Query로 무한스크롤 구현하기",
    body: "오늘 React Query의 useInfiniteQuery를 사용해서 무한스크롤을 구현해봤습니다. Intersection Observer API와 함께 사용하면 정말 깔끔하게 구현할 수 있더라구요!\n\n주요 포인트:\n1. useInfiniteQuery의 getNextPageParam 설정\n2. Intersection Observer로 스크롤 감지\n3. 에러 처리 및 로딩 상태 관리\n\n다음에는 가상화(Virtualization)도 추가해볼 예정입니다.",
    author: {
      login: "frontend-dev",
      avatarUrl: "https://avatars.githubusercontent.com/u/1?v=4"
    },
    createdAt: "2024-06-22T10:30:00Z",
    updatedAt: "2024-06-22T10:30:00Z",
    reactions: {
      totalCount: 12
    },
    comments: {
      totalCount: 3
    },
    category: {
      name: "Today I Learned"
    }
  },
  {
    id: "mock-2",
    title: "CSS Grid와 Flexbox 조합 사용법",
    body: "CSS Grid와 Flexbox를 함께 사용할 때의 베스트 프랙티스를 정리해봤습니다.\n\n• Grid: 2차원 레이아웃 (전체 페이지 구조)\n• Flexbox: 1차원 레이아웃 (컴포넌트 내부 정렬)\n\n실제 프로젝트에서 이 조합을 사용하니 훨씬 깔끔한 코드가 나오네요!",
    author: {
      login: "css-master",
      avatarUrl: "https://avatars.githubusercontent.com/u/2?v=4"
    },
    createdAt: "2024-06-22T09:15:00Z",
    updatedAt: "2024-06-22T09:15:00Z",
    reactions: {
      totalCount: 8
    },
    comments: {
      totalCount: 5
    },
    category: {
      name: "Today I Learned"
    }
  },
  {
    id: "mock-3",
    title: "TypeScript 5.0의 새로운 기능들",
    body: "TypeScript 5.0에서 추가된 기능들을 써보고 있는데, 특히 const assertion이 정말 유용하더라구요.\n\n새로운 기능들:\n- Decorators 정식 지원\n- const Type Parameters\n- Multiple Config Files\n- 성능 개선\n\n마이그레이션도 생각보다 어렵지 않았습니다!",
    author: {
      login: "ts-enthusiast",
      avatarUrl: "https://avatars.githubusercontent.com/u/3?v=4"
    },
    createdAt: "2024-06-22T08:45:00Z",
    updatedAt: "2024-06-22T08:45:00Z",
    reactions: {
      totalCount: 15
    },
    comments: {
      totalCount: 7
    },
    category: {
      name: "Today I Learned"
    }
  },
  {
    id: "mock-4",
    title: "Vite와 Webpack 번들 크기 비교",
    body: "같은 프로젝트를 Vite와 Webpack으로 빌드해보고 결과를 비교해봤습니다.\n\n결과:\n- Vite: 빌드 시간 50% 단축\n- 번들 크기: 거의 동일\n- HMR 속도: Vite가 압도적으로 빠름\n\n개발 경험 측면에서 Vite가 확실히 우세네요.",
    author: {
      login: "build-optimizer",
      avatarUrl: "https://avatars.githubusercontent.com/u/4?v=4"
    },
    createdAt: "2024-06-21T16:20:00Z",
    updatedAt: "2024-06-21T16:20:00Z",
    reactions: {
      totalCount: 23
    },
    comments: {
      totalCount: 12
    },
    category: {
      name: "Today I Learned"
    }
  },
  {
    id: "mock-5",
    title: "Web Accessibility 체크리스트",
    body: "웹 접근성 감사를 진행하면서 만든 체크리스트를 공유합니다.\n\n핵심 포인트:\n✅ 시맨틱 HTML 사용\n✅ 키보드 네비게이션 지원\n✅ 색상 대비비 4.5:1 이상\n✅ 스크린 리더 호환성\n✅ 포커스 표시 명확히\n\naxe-core와 Lighthouse를 함께 사용하면 대부분의 이슈를 찾을 수 있어요.",
    author: {
      login: "a11y-advocate",
      avatarUrl: "https://avatars.githubusercontent.com/u/5?v=4"
    },
    createdAt: "2024-06-21T14:10:00Z",
    updatedAt: "2024-06-21T14:10:00Z",
    reactions: {
      totalCount: 19
    },
    comments: {
      totalCount: 8
    },
    category: {
      name: "Today I Learned"
    }
  }
];

// 무한스크롤 테스트를 위한 페이지네이션 시뮬레이션
export function getMockDiscussionsPage(page = 0, pageSize = 10) {
  const start = page * pageSize;
  const end = start + pageSize;
  const discussions = mockDiscussions.slice(start, end);

  return {
    discussions,
    hasNextPage: end < mockDiscussions.length,
    endCursor: discussions.length > 0 ? `cursor-${end}` : null
  };
}

// 더 많은 목업 데이터를 생성하는 함수
export function generateMoreMockData(count = 20): GitHubDiscussion[] {
  const additionalData: GitHubDiscussion[] = [];
  const topics = [
    "React Hooks 심화 학습",
    "Node.js 성능 최적화",
    "GraphQL vs REST API",
    "Micro Frontend 아키텍처",
    "WebAssembly 첫 경험",
    "CSS-in-JS 라이브러리 비교",
    "Testing Library 활용법",
    "Docker 컨테이너 최적화",
    "Progressive Web App 구현",
    "Serverless 함수 개발"
  ];

  for (let i = 0; i < count; i++) {
    const topic = topics[i % topics.length];
    const dayOffset = Math.floor(i / 2);
    const date = new Date();
    date.setDate(date.getDate() - dayOffset);

    additionalData.push({
      id: `mock-${mockDiscussions.length + i + 1}`,
      title: `${topic} - ${i + 1}번째 경험`,
      body: `${topic}에 대해 학습하고 실습해본 내용을 정리합니다.\n\n주요 내용:\n- 기본 개념 이해\n- 실제 구현 경험\n- 트러블슈팅 과정\n- 배운 점과 앞으로의 계획\n\n다음에는 더 깊이 있는 내용으로 돌아오겠습니다!`,
      author: {
        login: `developer-${(i % 10) + 1}`,
        avatarUrl: `https://avatars.githubusercontent.com/u/${(i % 10) + 6}?v=4`
      },
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
      reactions: {
        totalCount: Math.floor(Math.random() * 30) + 1
      },
      comments: {
        totalCount: Math.floor(Math.random() * 15)
      },
      category: {
        name: "Today I Learned"
      }
    });
  }

  return additionalData;
}

// 초기 목업 데이터에 추가 데이터 결합
export const allMockDiscussions = [
  ...mockDiscussions,
  ...generateMoreMockData(25)
];
