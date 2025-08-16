# 컴포넌트 구조 가이드라인

> 2024-08-16 리팩토링 작업에서 확립된 컴포넌트 구조 원칙

## 핵심 원칙

### 응집도 기반 분류

- **단일 책임**: 각 컴포넌트는 명확한 단일 책임을 가져야 함
- **결합도 최소화**: 컴포넌트 간 의존성을 최소화
- **재사용성 고려**: 실제 재사용 여부에 따른 배치

## 디렉토리 구조

```
src/
├── components/
│   ├── shared/          # 진정한 재사용 가능 컴포넌트
│   │   ├── ui/         # 순수 UI 컴포넌트 (Button, Input 등)
│   │   ├── layout/     # 레이아웃 컴포넌트 (Header, Sidebar 등)
│   │   └── common/     # 공통 기능 컴포넌트 (UserAvatar, ErrorBoundary)
│   └── features/       # 도메인별 공유 컴포넌트
│       └── discussions/ # 토론/게시글 관련 (PostCard, LoginPrompt)
└── pages/              # 페이지별 전용 컴포넌트
    ├── timeline/
    │   └── components/ # CreatePost, PostList, CategoryTabs, WeeklyTop5
    └── profile/
        └── components/ # ProfileHeader, MyStreak, ContributionGraph
```

## 분류 기준

### 1. shared/ui/ - 순수 UI 컴포넌트

**조건:**

- 비즈니스 로직이 전혀 없음
- 프롭스로만 동작하는 순수 함수형 컴포넌트
- 어떤 컨텍스트에서도 사용 가능

**예시:**

```typescript
// ✅ shared/ui/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  children: ReactNode;
}

export function Button({ variant, size, onClick, children }: ButtonProps) {
  return (
    <button 
      className={cn(getVariantStyles(variant), getSizeStyles(size))}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### 2. shared/layout/ - 레이아웃 컴포넌트

**조건:**

- 페이지 전체 구조를 담당
- 여러 페이지에서 공통으로 사용
- 네비게이션, 헤더, 사이드바 등

**예시:**

```typescript
// ✅ shared/layout/Header.tsx
export function Header() {
  const { user, login, logout } = useAuth();
  // 헤더는 여러 페이지에서 공통 사용되지만 
  // 인증 로직을 포함할 수 있음
}
```

### 3. shared/common/ - 공통 기능 컴포넌트

**조건:**

- 특정 도메인에 속하지 않는 공통 기능
- 여러 곳에서 재사용되는 유틸리티성 컴포넌트

**예시:**

```typescript
// ✅ shared/common/UserAvatar.tsx
interface UserAvatarProps {
  user?: GitHubUser | AuthenticatedUser | null;
  size?: 'sm' | 'md' | 'lg';
}

export function UserAvatar({ user, size }: UserAvatarProps) {
  // 사용자 아바타는 여러 곳에서 사용되지만
  // 사용자 관련 로직을 포함
}
```

### 4. features/[domain]/ - 도메인별 공유 컴포넌트

**조건:**

- 특정 도메인 지식을 포함
- 여러 페이지에서 재사용됨
- 해당 도메인의 비즈니스 로직 포함

**예시:**

```typescript
// ✅ features/discussions/PostCard.tsx
interface PostCardProps {
  discussion: GitHubDiscussion;
  onLike?: (id: string) => void;
  onComment?: (id: string) => void;
}

export function PostCard({ discussion, onLike, onComment }: PostCardProps) {
  const { toggleLike } = useToggleReaction();
  // 토론/게시글 도메인 지식을 포함하지만
  // 타임라인과 프로필 페이지에서 모두 사용됨
}
```

### 5. pages/[page]/components/ - 페이지 전용 컴포넌트

**조건:**

- 특정 페이지에서만 사용
- 해당 페이지의 비즈니스 로직과 강하게 결합
- 다른 곳에서 재사용 가능성 낮음

**예시:**

```typescript
// ✅ pages/timeline/components/CreatePost.tsx
export function CreatePost({ onSubmit, isLoading }: CreatePostProps) {
  const { user, isAuthenticated, login } = useAuth();
  const createDiscussionMutation = useCreateDiscussion();
  
  // 타임라인 페이지의 게시글 작성 기능에 특화됨
  // 다른 페이지에서 재사용하기 어려운 구조
}
```

## Import 경로 규칙

### 절대 경로 필수

- 모든 import는 `@/`로 시작
- 상대 경로(`../`) 사용 금지
- 유지보수성과 리팩토링 안정성 향상

```typescript
// ✅ 올바른 import
import { Button } from "@/components/shared/ui/Button";
import { PostCard } from "@/components/features/discussions/PostCard";
import { useAuth } from "@/contexts/AuthContext";

// ❌ 잘못된 import  
import { Button } from "../../components/shared/ui/Button";
import { PostCard } from "../features/discussions/PostCard";
```

### 페이지 내부 컴포넌트만 상대 경로 허용

```typescript
// ✅ 같은 페이지 내부에서만 허용
// pages/timeline/TimelinePage.tsx
import { CreatePost } from "./components/CreatePost";
import { PostList } from "./components/PostList";
```

## 리팩토링 가이드

### 컴포넌트 이동 판단 기준

1. **사용 빈도 확인**

   ```bash
   # 컴포넌트 사용처 검색
   grep -r "ComponentName" src/
   ```

2. **비즈니스 로직 분석**
   - 도메인 특화 로직 포함 → `features/`
   - 순수 UI 로직만 → `shared/ui/`
   - 페이지 특화 로직 → `pages/[page]/components/`

3. **의존성 분석**
   - 특정 Context/Hook 의존 → 해당 도메인에 배치
   - 순수 props만 의존 → `shared/ui/`

### 리팩토링 절차

1. **분석**: 컴포넌트 사용처와 의존성 확인
2. **분류**: 위 기준에 따라 적절한 위치 결정
3. **이동**: 파일 이동 및 import 경로 업데이트
4. **검증**: 빌드 성공 및 기능 정상 동작 확인

### 주의사항

- **한 번에 하나씩**: 여러 컴포넌트를 동시에 이동하지 말 것
- **의존성 체크**: 순환 의존성 발생 방지
- **타입 안전성**: TypeScript 에러 모두 해결 후 진행
- **테스트 확인**: 기존 기능이 정상 동작하는지 확인

## 예외 상황 처리

### 애매한 분류의 컴포넌트

- **기본 원칙**: 더 구체적인 곳에 배치 (features > shared)
- **미래 확장성**: 재사용 가능성을 과대평가하지 말 것
- **실제 사용**: 현재 사용 패턴을 우선 고려

### 대규모 컴포넌트

- **분해 우선**: 단일 책임 원칙에 따라 분해 시도
- **하위 컴포넌트**: 내부에서만 사용되는 컴포넌트는 같은 파일 또는 하위 폴더
- **점진적 개선**: 완벽하지 않아도 현재보다 나은 구조로 개선

이 가이드라인은 실제 프로젝트 경험을 바탕으로 작성되었으며, 프로젝트 성장에 따라 지속적으로 개선해나가야 합니다.
