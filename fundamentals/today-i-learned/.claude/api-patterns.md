# API 레이어 패턴 및 모범 사례

## 핵심 원칙

### 1. 도메인별 응집성

- 관련 타입과 API 함수는 같은 파일에 위치
- 예: `src/api/remote/user.ts`에 `GitHubUser` 타입과 `fetchUserProfile` 함수

### 2. 원본 데이터 우선

- GitHub API 응답을 불필요하게 변환하지 않음
- 실제 API 스펙과 타입이 정확히 일치해야 함
- 클라이언트에서 필요한 변환만 최소한으로 수행

### 3. 계층별 책임 분리

**GraphQL 계층** (`src/api/graphql/`)

```typescript
// ✅ 좋은 예: 순수 쿼리 정의
export const GET_DISCUSSIONS_QUERY = `
  query GetDiscussions($owner: String!, $repo: String!) {
    repository(owner: $owner, name: $repo) {
      discussions(first: 10) {
        nodes { id, title, body }
      }
    }
  }
`;

// ❌ 나쁜 예: 비즈니스 로직 포함
export const getDiscussionsWithProcessing = (data) => {
  return processDiscussions(data); // 이 계층의 책임이 아님
}
```

**Remote 계층** (`src/api/remote/`)

```typescript
// ✅ 좋은 예: API 함수 + 도메인 타입
export interface GitHubDiscussion {
  id: string;
  title: string;
  author: GitHubAuthor;
  // GitHub API 원본 필드명 사용
}

export async function fetchDiscussions({
  owner,
  repo,
  accessToken
}: DiscussionsParams): Promise<GitHubDiscussion[]> {
  const data = await graphqlRequest(GET_DISCUSSIONS_QUERY, {
    owner, repo
  }, accessToken);
  
  return data.data?.repository?.discussions?.nodes || [];
}
```

**Hooks 계층** (`src/api/hooks/`)

```typescript
// ✅ 좋은 예: React Query 최적화 + 간단한 인터페이스
export function useDiscussions({
  owner = ENV_CONFIG.GITHUB_OWNER,
  repo = ENV_CONFIG.GITHUB_REPO,
  enabled = true
} = {}) {
  const { user } = useAuth();

  return useQuery({
    queryKey: DISCUSSIONS_QUERY_KEYS.list({ owner, repo }),
    queryFn: () => fetchDiscussions({
      owner,
      repo,
      accessToken: user?.accessToken
    }),
    enabled,
    staleTime: 1000 * 60 * 5, // 5분
    retry: 2
  });
}
```

## 타입 관리 전략

### 도메인별 타입 배치

```typescript
// src/api/remote/user.ts
export interface GitHubUser {
  id: number;           // GitHub API 원본 스펙
  login: string;
  avatar_url: string;   // snake_case 유지
  public_repos: number;
}

// src/api/remote/discussions.ts  
export interface GitHubDiscussion {
  id: string;
  title: string;
  author: GitHubAuthor; // 공통 타입 재사용
}
```

### 공통 타입 활용

```typescript
// src/types/index.ts - 여러 도메인에서 재사용되는 타입
export interface GitHubAuthor {
  login: string;
  avatarUrl: string;
}

// src/api/types.ts - API 레이어 공통 타입
export interface ApiResponse<T> {
  data?: T;
  status: number;
  error?: string;
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor?: string;
}
```

## Query Key 관리

### 중앙 집중화된 관리

```typescript
export const DISCUSSIONS_QUERY_KEYS = {
  all: ['discussions'] as const,
  lists: () => [...DISCUSSIONS_QUERY_KEYS.all, 'list'] as const,
  list: (params: Partial<DiscussionsParams>) => 
    [...DISCUSSIONS_QUERY_KEYS.lists(), params] as const,
  infinite: (params: Partial<InfiniteParams>) =>
    [...DISCUSSIONS_QUERY_KEYS.all, 'infinite', params] as const,
} as const;
```

### 효율적인 무효화

```typescript
// ✅ 좋은 예: 계층적 무효화
queryClient.invalidateQueries({
  queryKey: DISCUSSIONS_QUERY_KEYS.all // 모든 discussions 쿼리 무효화
});

// ✅ 더 구체적인 무효화
queryClient.invalidateQueries({
  queryKey: DISCUSSIONS_QUERY_KEYS.lists() // list 쿼리들만 무효화
});
```

## 에러 처리 패턴

### API 함수에서의 에러 처리

```typescript
export async function fetchUserProfile({
  accessToken
}: FetchUserProfileParams): Promise<GitHubUser | null> {
  try {
    const response = await fetch('/api/github/me', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    return await response.json(); // 원본 데이터 반환
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    return null; // 실패 시 null 반환
  }
}
```

### React Query 훅에서의 에러 처리

```typescript
export function useUserProfile() {
  const { user } = useAuth();

  return useQuery({
    queryKey: USER_QUERY_KEYS.profile(),
    queryFn: () => {
      if (!user?.accessToken) {
        throw new Error('User not authenticated');
      }
      return fetchUserProfile({ accessToken: user.accessToken });
    },
    enabled: !!user?.accessToken,
    retry: 1, // 인증 에러는 재시도 제한
    staleTime: 1000 * 60 * 30
  });
}
```

## 성능 최적화 패턴

### 적절한 캐싱 전략

```typescript
// 사용자 데이터: 자주 변경되지 않음
staleTime: 1000 * 60 * 30, // 30분
gcTime: 1000 * 60 * 60,    // 1시간

// 게시글 목록: 중간 빈도
staleTime: 1000 * 60 * 5,  // 5분  
gcTime: 1000 * 60 * 30,    // 30분

// 실시간 데이터: 자주 업데이트
staleTime: 1000 * 60 * 2,  // 2분
gcTime: 1000 * 60 * 10,    // 10분
```

### 무한 스크롤 최적화

```typescript
export function useInfiniteDiscussions() {
  return useInfiniteQuery({
    queryKey: DISCUSSIONS_QUERY_KEYS.infinite(params),
    queryFn: ({ pageParam }) => fetchInfiniteDiscussions({
      ...params,
      after: pageParam
    }),
    getNextPageParam: (lastPage) => 
      lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : undefined,
    initialPageParam: null as string | null
  });
}
```

## 금지 사항

### ❌ 하지 말아야 할 것들

1. **불필요한 index.ts 파일 생성**

   ```typescript
   // ❌ 피해야 할 패턴
   // src/api/index.ts - 불필요한 추상화
   export * from './remote/discussions';
   export * from './hooks/useDiscussions';
   ```

2. **API 응답 과도한 변환**

   ```typescript
   // ❌ 피해야 할 패턴  
   return {
     id: userData.id,
     displayName: userData.name, // 불필요한 필드명 변경
     profileImage: userData.avatar_url,
     repoCount: userData.public_repos
   };
   ```

3. **계층 책임 혼재**

   ```typescript
   // ❌ GraphQL 파일에 React Query 로직
   export const useDiscussionsQuery = () => {
     return useQuery(/* ... */); // 잘못된 위치
   }
   ```

### ✅ 권장 사항

1. **직접 import 사용**

   ```typescript
   import { fetchDiscussions } from '@/api/remote/discussions';
   import { useDiscussions } from '@/api/hooks/useDiscussions';
   ```

2. **원본 API 응답 활용**

   ```typescript
   // GitHub API 응답을 그대로 사용
   return userData; // 변환하지 않음
   ```

3. **계층별 명확한 분리**
   - GraphQL: 쿼리 정의만
   - Remote: API 함수 + 타입
   - Hooks: React Query 설정
