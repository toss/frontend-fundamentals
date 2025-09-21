# Claude Code 핵심 규칙

> 이 프로젝트에서 반드시 지켜야 할 핵심 규칙들

## 빌드 툴

Yarn berry를 사용합니다. 모노레포 구조인지라, 상위 폴더의 yarn 및 prettier설정을 사용합니다.

```sh
yarn dev
yarn build
```

## 컴포넌트 구조 (필수)

```text
src/
├── components/
│   ├── shared/ui/       # Button, Input, LoadingSpinner
│   ├── shared/layout/   # Header, Layout, Sidebar
│   ├── shared/common/   # UserAvatar, ErrorBoundary
│   └── features/        # PostCard, LoginPrompt (도메인별)
└── pages/[page]/components/  # CreatePost, WeeklyTop5 (페이지 전용)
```

**분류 기준:**

- **2곳 이상 사용** → `shared/` 또는 `features/`
- **비즈니스 로직 포함** → `features/[domain]/`
- **순수 UI만** → `shared/ui/`
- **페이지 전용** → `pages/[page]/components/`

**리팩토링 판단:**

```bash
# 사용처 확인
grep -r "ComponentName" src/

# 이동 후 import 경로 업데이트
# 빌드 성공 확인
```

## Import 규칙 (필수)

```typescript
// ✅ 절대 경로 필수
import { Button } from "@/components/shared/ui/Button";

// ❌ 상대 경로 금지
import { Button } from "../../components/shared/ui/Button";

// ✅ 페이지 내부만 예외
import { CreatePost } from "./components/CreatePost";
```

## API 구조 (필수)

```text
src/api/
├── client.ts       # GraphQL/REST 클라이언트
├── graphql/        # 쿼리 정의만
├── remote/         # API 함수 + 도메인 타입
└── hooks/          # React Query 훅
```

**3-Layer 분리:**

- **graphql/**: 순수 GraphQL 쿼리 정의
- **remote/**: API 함수 + 도메인별 타입 정의
- **hooks/**: React Query 훅 + 캐시 관리

**GitHub API 원본 사용:**

```typescript
// ✅ 원본 그대로
interface GitHubUser {
  avatar_url: string; // 변환하지 않음
  public_repos: number;
}

// ❌ 변환 금지
interface User {
  avatarUrl: string; // 카멜케이스 변환 금지
  repoCount: number;
}
```

## 개발 원칙 (필수)

**TDD 주기:**

1. **Red**: 실패하는 테스트 작성
2. **Green**: 테스트 통과하는 최소 코드
3. **Refactor**: 테스트 통과 상태에서 개선

**구조적/행위적 변경 분리:**

- **구조적**: 이름변경, 파일이동, 메서드추출
- **행위적**: 실제 기능 추가/수정
- **절대 같은 커밋에 섞지 않음**

**타입 안전성:**

- TypeScript 에러 0개 유지
- `any` 타입 사용 금지
- 모든 에러 해결 후 커밋

## 에러 처리

**중앙화된 에러 처리:**

```typescript
const { handleApiError, handleAuthError } = useErrorHandler();

// API 에러
try {
  await apiCall();
} catch (error) {
  handleApiError(error, "Context");
}
```

**낙관적 업데이트:**

```typescript
// 즉시 UI 업데이트
setLikeCount((prev) => prev + 1);

try {
  await toggleLike(id);
} catch (error) {
  // 실패 시 롤백
  setLikeCount((prev) => prev - 1);
  handleApiError(error);
}
```

## 금지 사항

- `../` 상대 경로 import
- API 응답 불필요한 변환
- 구조+행위 변경 동시 커밋
- `--no-verify` 사용
- `any` 타입 사용
- 실패하는 테스트 무시

---

**이 규칙들은 프로젝트 안정성을 위한 필수 사항입니다.**
