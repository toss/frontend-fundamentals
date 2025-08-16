# 개발 원칙

## TDD 및 커밋 규칙

### TDD 주기 (필수)

1. **Red**: 실패하는 테스트 작성
2. **Green**: 테스트를 통과하는 최소한의 코드 구현  
3. **Refactor**: 테스트가 통과하는 상태에서 코드 개선

### 구조적/행위적 변경 분리 (필수)

- **구조적 변경**: 이름 변경, 메서드 추출, 파일 이동 등
- **행위적 변경**: 실제 기능 추가/수정
- **절대 같은 커밋에 섞지 않음**

### 커밋 규칙

- 모든 테스트가 통과할 때만 커밋
- 컴파일러/린터 경고 해결 후 커밋
- `--no-verify` 사용 금지
- 구조적 변경을 먼저, 행위적 변경을 나중에

## Import 규칙 (필수)

### 절대 경로 필수

```typescript
// ✅ 올바른 import
import { Button } from "@/components/shared/ui/Button";
import { PostCard } from "@/components/features/discussions/PostCard";

// ❌ 절대 금지
import { Button } from "../../components/shared/ui/Button";
```

### 페이지 내부만 상대 경로 허용

```typescript
// ✅ 같은 페이지 내부에서만 허용
import { CreatePost } from "./components/CreatePost";
```

## 타입 안전성

### TypeScript 에러 0개 유지

- 모든 TypeScript 에러 해결 후 진행
- `any` 타입 사용 금지
- 가능한 한 strict 타입 사용

### API 타입 정의

- GitHub API 원본 응답 구조 그대로 사용
- 불필요한 데이터 변환 금지
- 실제 API 스펙과 정확히 일치하는 타입

## 컴포넌트 리팩토링

### 이동 판단 기준

1. **사용 빈도**: 2곳 이상에서 사용 → `shared/` 또는 `features/`
2. **비즈니스 로직**: 도메인 지식 포함 → `features/[domain]/`
3. **순수 UI**: 비즈니스 로직 없음 → `shared/ui/`
4. **페이지 특화**: 특정 페이지만 → `pages/[page]/components/`

### 리팩토링 절차

1. 컴포넌트 사용처 확인: `grep -r "ComponentName" src/`
2. 적절한 위치 결정
3. 파일 이동 및 import 경로 업데이트
4. 빌드 성공 및 기능 정상 동작 확인

## 에러 처리

### 중앙화된 에러 처리

- `useErrorHandler` 훅 사용
- 타입별 에러 핸들러 제공 (API, Auth, Network, Validation)
- 사용자 친화적 메시지 표시

### 실패 처리

- 낙관적 업데이트 사용
- 실패 시 이전 상태로 롤백
- 적절한 로딩 및 에러 상태 표시
