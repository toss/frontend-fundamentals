# 프로젝트 구조 규칙

## 디렉토리 구조

```
src/
├── api/             # API 레이어 (체계적 분리)
│   ├── client.ts    # GraphQL/REST 클라이언트
│   ├── graphql/     # GraphQL 쿼리 정의
│   ├── remote/      # API 함수와 도메인별 타입
│   ├── hooks/       # React Query 훅들
│   └── types.ts     # API 공통 타입
├── components/      # 컴포넌트 (기능별 분류)
│   ├── layout/      # 레이아웃 컴포넌트
│   ├── post/        # 게시글 관련
│   ├── profile/     # 프로필 관련
│   └── ui/          # 공통 UI 컴포넌트
├── hooks/           # 도메인별 커스텀 hooks
├── types/           # 공통 타입 정의
├── contexts/        # React Context
├── constants/       # 상수 정의
└── styles/          # 스타일 토큰
```

## 파일 명명 규칙

- 컴포넌트: PascalCase (Button.tsx)
- hooks: camelCase + use 접두어 (useAuth.ts)
- 유틸리티: camelCase (utils.ts)
- 상수: UPPER_SNAKE_CASE

## API 레이어 구조 원칙

### 도메인별 분리

- `src/api/remote/` - 각 도메인별 API 함수와 타입
- `src/api/graphql/` - GraphQL 쿼리/뮤테이션 정의
- `src/api/hooks/` - React Query 훅들
- `src/api/types.ts` - API 공통 타입 (PageInfo, ApiResponse 등)

### 타입 배치 원칙

- **도메인별 타입**: 관련 API 함수와 같은 파일에 위치
  - 예: `GitHubUser`, `GitHubDiscussion`
- **공통 타입**: `src/types/index.ts`에 위치  
  - 예: `GitHubAuthor`, UI 컴포넌트 타입
- **API 공통 타입**: `src/api/types.ts`에 위치
  - 예: `PageInfo`, `ApiResponse`

### GitHub API 원본 데이터 사용

- API 응답을 불필요하게 변환하지 않고 원본 그대로 사용
- 타입 정의는 실제 API 스펙과 정확히 일치시키기
- 예: `/api/github/me` 응답 → `avatar_url`, `public_repos` 등

## 내보내기 규칙

- API 레이어는 직접 import (불필요한 index.ts 생성 금지)
- 순환 의존성을 피합니다
