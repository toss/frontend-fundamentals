**Today I Learned 프로젝트 인수인계 가이드**

## 📝 새로 진행한 작업 상세

### 1. GitHub API 실제 연동 구현 ✅

- **환경변수 설정**: `VITE_USE_MOCK_DATA=false`로 변경하여 실제 API 사용
- **저장소 변경**: `toss/frontend-fundamentals` → `al-bur/test` 저장소로 변경
- **GraphQL 쿼리 수정**: `categoryName` 파라미터 오류 해결
  - GitHub API에서 `discussions` 필드가 `categoryName` 파라미터를 지원하지 않는 문제 발견
  - 서버 사이드에서 클라이언트 사이드 필터링으로 변경
- **환경별 API 호출 분기**: localhost와 production 환경에 따른 API 호출 방식 구현
  - 로컬: GitHub API 직접 호출 (`VITE_GITHUB_TOKEN` 사용)
  - 프로덕션: `/api/github` 라우트 사용 (`READ_GITHUB_DISCUSSION_ACCESS_TOKEN` 사용)

### 2. TIL 게시물 작성 기능 구현 ✅

- **React Hook Form 설치**: `yarn add react-hook-form`
- **CreatePost 컴포넌트 생성**: 트위터 스타일의 게시물 작성 UI
  - `useController`와 `useWatch` 활용한 고급 폼 관리
  - 실시간 글자 수 카운터 (500자 제한)
  - 키보드 단축키 지원 (⌘ + Enter)
  - focus/blur 상태에 따른 UI 변화
- **useCreateDiscussion 훅 생성**: GitHub API를 통한 Discussion 생성
  - Repository ID 조회 → Category ID 조회 → Discussion 생성 3단계 프로세스
  - React Query를 활용한 상태 관리 및 캐시 무효화
- **App.tsx 통합**: 메인 페이지 상단에 작성 컴포넌트 배치

### 3. 인기글 섹션 완전 구현 ✅ **NEW**

- **PopularSection 컴포넌트**: 메인 페이지 상단 인기글 섹션 구현
  - 캐러셀 형태의 인기글 표시
  - 자동 슬라이드 기능 (5초 간격)
  - 네비게이션 버튼 (이전/다음)
  - 인디케이터 점으로 현재 위치 표시
- **PopularCard 컴포넌트**: 개별 인기글 카드 UI
  - 인기도 점수 계산 (좋아요 수 + 댓글 수 \* 2)
  - 트렌딩 배지 표시
  - 상대 시간 표시 (예: "2시간 전")
  - 좋아요/댓글 버튼 인터랙션
- **usePopularDiscussions 훅**: 인기글 데이터 페칭
  - 목업 데이터와 실제 GitHub API 전환 가능
  - 인기도 기준 정렬 (좋아요 + 댓글 수)
  - React Query 캐싱 및 에러 처리

### 4. 좋아요 기능 완전 구현 ✅ **NEW**

- **useReactions 훅 세트**: GitHub Reactions API 완전 연동
  - `useToggleReaction`: 좋아요 토글 기능
  - `useUserReactionStatus`: 사용자 좋아요 상태 확인
  - Optimistic Update로 즉시 UI 반영
- **PostCard 좋아요 기능**: 실제 GitHub API 연동
  - 좋아요 수 실시간 표시
  - 좋아요 상태에 따른 버튼 스타일 변경
  - 로딩 상태 및 에러 처리
- **GitHub GraphQL 쿼리**: Reactions 관련 쿼리 구현
  - `addReaction`: 좋아요 추가
  - `removeReaction`: 좋아요 제거
  - 현재 사용자 정보 조회

### 5. 코드 리팩토링 및 최적화 ✅

- **중복 코드 제거**: 로컬/프로덕션 환경 분기 로직이 중복되는 문제 해결
- **GitHub API 유틸 함수 분리**: `src/utils/github.ts` 생성
  - `fetchGithub()`: 환경별 API 호출 통합 함수
  - `handleGraphQLResponse()`: GraphQL 응답 처리 및 에러 핸들링 통합
- **useInfiniteDiscussions 리팩토링**: 유틸 함수 활용으로 코드 간소화
- **useCreateDiscussion 리팩토링**: 100+ 라인에서 50 라인으로 단축

### 6. UI/UX 대폭 개선 ✅ **ENHANCED**

- **레이아웃 크기 통일**: CreatePost와 PostList 모두 `max-width: 800px` 적용
- **CreatePost 컴팩트화**:
  - 아바타 크기: `40px` → `36px`
  - 패딩: `16px` → `12px 16px` (상하 패딩 줄임)
  - 헤더 gap: `12px` → `10px`
  - 아이콘 크기: `20px` → `18px`
- **PostList border 문제 해결**:
  - 기존: 컨테이너 전체에 border + min-height로 인한 UI 문제
  - 개선: 개별 PostCard에 border 적용, 첫/마지막 카드에 둥근 모서리
  - 모바일에서는 좌우 border 제거하여 전체 너비 활용
- **Header 컴포넌트 개선**:
  - 한국어 subtitle 적용 ("오늘 배운 것들을 공유해보세요")
  - 테마 토글 버튼 개선
- **다크/라이트 모드 완전 구현**:
  - 수동 설정 우선순위 (html.light, html.dark 클래스)
  - 시스템 설정 자동 감지
  - 테마 변경 시 콘솔 로그 및 디버깅 정보

### 7. 기술적 개선사항 ✅

- **타입 안전성**: React Hook Form 타입 정의 추가
- **에러 핸들링**: GraphQL 에러 응답 처리 로직 구현
- **상태 관리**: React Query를 활용한 optimistic update 구현
- **접근성**: 키보드 네비게이션 및 단축키 지원
- **성능 최적화**: 컴포넌트 메모이제이션 및 불필요한 리렌더링 방지

## 🔧 새로 생성된 파일들

### 게시물 작성 관련

- **`src/components/post/CreatePost.tsx`**: React Hook Form 기반 게시물 작성 컴포넌트
- **`src/components/post/CreatePost.css`**: 트위터/Threads 스타일 디자인
- **`src/hooks/useCreateDiscussion.ts`**: GitHub Discussions 생성 로직

### 인기글 섹션 관련 **NEW**

- **`src/components/post/PopularSection.tsx`**: 인기글 섹션 메인 컴포넌트
- **`src/components/post/PopularSection.css`**: 인기글 섹션 스타일링
- **`src/components/post/PopularCard.tsx`**: 개별 인기글 카드 컴포넌트
- **`src/components/post/PopularCard.css`**: 인기글 카드 스타일링
- **`src/hooks/usePopularDiscussions.ts`**: 인기글 데이터 페칭 훅

### 좋아요 기능 관련 **NEW**

- **`src/hooks/useReactions.ts`**: GitHub Reactions API 연동 훅 세트

### 공통 유틸리티

- **`src/utils/github.ts`**: 재사용 가능한 GitHub API 유틸 함수

## 🐛 해결한 문제들

1. **GraphQL categoryName 오류**: GitHub API 스펙 변경으로 인한 파라미터 지원 중단
2. **환경별 API 분기**: 로컬과 프로덕션에서 다른 API 호출 방식
3. **코드 중복**: 동일한 로직이 여러 파일에 반복되는 문제
4. **UI 레이아웃**: 게시물이 적을 때 불필요하게 긴 border 문제
5. **컴포넌트 크기**: CreatePost와 PostList의 width 불일치
6. **좋아요 기능**: 실제 GitHub API 연동 및 상태 관리 **NEW**
7. **인기글 표시**: 캐러셀 UI 및 인기도 계산 로직 **NEW**
8. **테마 전환**: 수동 설정과 시스템 설정 충돌 문제 **NEW**

## 🔄 다음 개발자를 위한 가이드

### 우선 작업 항목

1. **댓글 시스템**: `src/utils/github.ts` 활용하여 Comments GraphQL 구현
2. **상세 페이지**: React Router 추가 및 게시물 상세보기 구현
3. **내정보 페이지**: 사용자 프로필 및 게시물 관리 기능

### 개발 패턴

- **GitHub API 호출**: `fetchGithub()` 함수 사용
- **폼 관리**: React Hook Form + useController 패턴
- **스타일링**: VitePress 변수 시스템 유지
- **상태 관리**: React Query v5 활용
- **좋아요 기능**: `useToggleReaction` 훅 패턴 참고
- **인기글 표시**: `usePopularDiscussions` 훅 패턴 참고

### 참고할 구현 패턴

- **컴포넌트 구조**: PopularSection → PopularCard 패턴
- **훅 설계**: useReactions의 여러 훅 조합 패턴
- **에러 처리**: handleGraphQLResponse 유틸 함수 활용
- **UI 상태**: 로딩/에러/빈 상태 처리 패턴

> **다음 작업자**: 핵심 기능들이 완성되었으니 `src/utils/github.ts`와 기존 훅들을 적극 활용해서 댓글 시스템과 상세 페이지를 구현해주세요! 특히 `useReactions` 패턴을 참고하면 댓글 기능도 비슷하게 구현할 수 있을 것입니다.
