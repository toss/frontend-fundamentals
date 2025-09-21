# API 패턴 및 구조

## 3-Layer API 아키텍처

### Layer 1: GraphQL Queries (`api/graphql/`)

```typescript
// ✅ 순수 GraphQL 쿼리 정의만
export const DISCUSSIONS_QUERY = gql`
  query GetDiscussions($first: Int!, $after: String) {
    repository(owner: "owner", name: "repo") {
      discussions(first: $first, after: $after) {
        nodes {
          id
          title
          body
          author {
            login
            avatarUrl
          }
        }
      }
    }
  }
`;
```

### Layer 2: API Functions (`api/remote/`)

```typescript
// ✅ API 함수 + 도메인 타입 정의
export interface GitHubDiscussion {
  id: string;
  title: string;
  body: string;
  author: GitHubAuthor;
}

export async function fetchDiscussions(
  params: DiscussionsParams
): Promise<DiscussionsResponse> {
  return graphqlRequest(DISCUSSIONS_QUERY, params, accessToken);
}
```

### Layer 3: React Hooks (`api/hooks/`)

```typescript
// ✅ React Query 훅
export function useInfiniteDiscussions(params: UseInfiniteDiscussionsParams) {
  return useInfiniteQuery({
    queryKey: DISCUSSIONS_QUERY_KEYS.infinite(params),
    queryFn: ({ pageParam }) =>
      fetchDiscussions({ ...params, after: pageParam }),
    getNextPageParam: (lastPage) => lastPage.pageInfo.endCursor
  });
}
```

## GitHub API 원본 데이터 원칙

### ✅ 올바른 패턴

```typescript
// GitHub API 응답 그대로 사용
export interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string; // GitHub 원본 필드명
  public_repos: number; // GitHub 원본 필드명
}

// API 함수에서 원본 데이터 반환
export async function fetchUserProfile(): Promise<GitHubUser> {
  const response = await fetch("/api/github/me");
  return response.json(); // 변환 없이 그대로 반환
}
```

### ❌ 잘못된 패턴

```typescript
// 불필요한 데이터 변환
export interface User {
  id: number;
  username: string;
  avatarUrl: string; // 카멜케이스로 변환 ❌
  repoCount: number; // 이름 변경 ❌
}

// 불필요한 변환 함수
function transformUser(githubUser: GitHubUser): User {
  return {
    id: githubUser.id,
    username: githubUser.login,
    avatarUrl: githubUser.avatar_url, // ❌ 변환 불필요
    repoCount: githubUser.public_repos // ❌ 변환 불필요
  };
}
```

## 타입 배치 규칙

### 도메인별 타입 - `api/remote/[domain].ts`

```typescript
// api/remote/discussions.ts
export interface GitHubDiscussion {
  id: string;
  title: string;
  // 관련 API 함수와 함께 위치
}
```

### 공통 UI 타입 - `types/index.ts`

```typescript
// types/index.ts
export interface BaseComponentProps {
  className?: string;
}
```

### API 공통 타입 - `api/types.ts`

```typescript
// api/types.ts
export interface PageInfo {
  hasNextPage: boolean;
  endCursor?: string;
}
```

## Query Key 관리

### 중앙화된 Query Keys

```typescript
// api/hooks/queryKeys.ts
export const DISCUSSIONS_QUERY_KEYS = {
  all: ["discussions"] as const,
  lists: () => [...DISCUSSIONS_QUERY_KEYS.all, "list"] as const,
  infinite: (params: Partial<UseInfiniteDiscussionsParams>) =>
    [...DISCUSSIONS_QUERY_KEYS.lists(), params] as const
};
```

### 타입 안전한 Query Key 사용

```typescript
export function useInfiniteDiscussions(params: UseInfiniteDiscussionsParams) {
  return useInfiniteQuery({
    queryKey: DISCUSSIONS_QUERY_KEYS.infinite(params) // 타입 안전
    // ...
  });
}
```

## 에러 처리 패턴

### API 레이어별 에러 처리

- **GraphQL Layer**: 네트워크 에러만 처리
- **Remote Layer**: API 응답 형식 검증
- **Hooks Layer**: React Query 에러 처리 + 사용자 친화적 메시지

### 일관된 에러 응답

```typescript
export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, any>;
}
```
