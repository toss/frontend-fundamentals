# 프로젝트 구조

## 디렉토리 구조

```
src/
├── api/             # API 레이어 (3-tier 분리)
│   ├── client.ts    # GraphQL/REST 클라이언트
│   ├── graphql/     # GraphQL 쿼리 정의
│   ├── remote/      # API 함수와 도메인별 타입
│   └── hooks/       # React Query 훅들
├── components/      # 컴포넌트 (응집도별 분류)
│   ├── shared/      # 재사용 가능 컴포넌트
│   │   ├── ui/      # Button, Input, LoadingSpinner, Toast
│   │   ├── layout/  # Header, Layout, Sidebar
│   │   └── common/  # UserAvatar, ErrorBoundary
│   └── features/    # 도메인별 공유 컴포넌트
│       └── discussions/  # PostCard, PopularCard, LoginPrompt
├── pages/           # 페이지별 컴포넌트
│   ├── timeline/
│   │   └── components/  # CreatePost, PostList, CategoryTabs
│   └── profile/
│       └── components/  # ProfileHeader, MyStreak, ContributionGraph
├── hooks/           # 도메인별 커스텀 hooks
├── types/           # 공통 타입 정의
├── contexts/        # React Context
├── constants/       # 상수 정의
└── lib/             # 유틸리티 함수
```

## 컴포넌트 분류 원칙

### shared/ui/ - 순수 UI 컴포넌트

- 비즈니스 로직 없음
- props만으로 동작하는 순수 함수
- 어디서든 사용 가능

### shared/layout/ - 레이아웃 컴포넌트  

- 페이지 전체 구조 담당
- 여러 페이지에서 공통 사용
- 인증 등 글로벌 로직 포함 가능

### shared/common/ - 공통 기능 컴포넌트

- 특정 도메인에 속하지 않는 공통 기능
- 여러 곳에서 재사용되는 유틸리티성

### features/[domain]/ - 도메인별 공유 컴포넌트

- 특정 도메인 지식 포함
- 여러 페이지에서 재사용
- 비즈니스 로직 포함

### pages/[page]/components/ - 페이지 전용 컴포넌트

- 특정 페이지에서만 사용
- 해당 페이지와 강하게 결합
- 재사용 가능성 낮음

## API 레이어 구조

### 도메인별 분리

- `remote/` - 각 도메인별 API 함수와 타입
- `graphql/` - GraphQL 쿼리/뮤테이션 정의  
- `hooks/` - React Query 훅들

### GitHub API 원본 데이터 사용

- API 응답을 불필요하게 변환하지 않고 원본 그대로 사용
- 타입 정의는 실제 API 스펙과 정확히 일치
- 예: `/api/github/me` 응답 → `avatar_url`, `public_repos` 등
