# 개발 원칙

## 프로젝트 설정

### 패키지 매니저

- **Yarn Berry 사용**: 이 프로젝트는 npm 대신 Yarn Berry를 사용합니다
- 모든 의존성 설치 및 스크립트 실행은 yarn 사용
- `yarn install`, `yarn dev`, `yarn build` 등

### 모노레포 구조

- **상위 레포지토리 의존성**: 모노레포 형태로 상위 레포의 Yarn Berry 설정을 따름
- 의존성 해결은 워크스페이스 루트에서 관리됨
- 개별 패키지 작업 시에도 상위 yarn 설정을 참조

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

## 로직 분리 원칙

### 분리 기준

- 20줄+ 복잡한 로직
- 재사용 가능한 로직
- 테스트 필요한 비즈니스 로직

### 분리 위치

- `src/lib/utils.ts`: 범용 유틸리티
- `src/hooks/`: 커스텀 훅
- `src/api/services/`: API 로직

### 원칙

- **컴포넌트**: UI 렌더링만
- **유틸리티**: 순수 함수로 비즈니스 로직
- **사이드 이펙트**: 훅으로 분리

### 과도한 분리 지양

- 3-5줄 간단한 로직은 그대로
- 한 번만 사용되는 로직은 신중히 판단

## 코드 가독성 원칙 (필수)

### 자명한 코드 작성

- **주석 없이도 읽힐 수 있는 코드**: 함수명, 변수명으로 의도 표현
- **과도한 주석 완전 금지**: 설명성 주석, 섹션 구분 주석 사용 금지
- **의미 있는 네이밍**: 목적과 역할이 명확한 이름 사용

### 주석 사용 기준 (매우 제한적)

**유일하게 허용되는 경우:**

- 복잡한 알고리즘의 수학적/논리적 근거
- 외부 API의 버그나 제약사항
- 성능상 반직관적 구현의 이유

**절대 금지:**

```typescript
// ❌ 금지: 섹션 구분
// === API 관련 함수들 ===

// ❌ 금지: 코드 설명
// 사용자 정보를 가져오는 함수
function getUserInfo() {}

// ❌ 금지: TODO 주석
// TODO: 나중에 리팩토링

// ❌ 금지: 인라인 설명
const userId = user.id; // 사용자 ID
```

**올바른 예시:**

```typescript
// ✅ 허용: 외부 제약사항
// GitHub API rate limit: 5000/hour
const GITHUB_API_DELAY = 200;

// ✅ 허용: 복잡한 비즈니스 로직
// Levenshtein distance for fuzzy search
function calculateEditDistance() {}
```

### 리팩토링 원칙

#### 관심사 분리 (Separation of Concerns)

- **비즈니스 로직**: 커스텀 훅으로 분리
- **UI 로직**: 순수 컴포넌트로 분리
- **스타일링**: 래퍼 컴포넌트로 격리
- **유틸리티**: 순수 함수로 분리

#### 컴포넌트 구조

```typescript
// ✅ 좋은 구조
function useBusinessLogic() {
  // 상태 관리 + 이벤트 핸들링
}

function StyledWrapper({ children }) {
  // Tailwind 클래스만 담당
}

function PureComponent({ data, handlers }) {
  // 순수 UI 렌더링만
}
```

#### 단일 책임 원칙

- 각 함수/컴포넌트는 하나의 명확한 책임만 가짐
- 기능별로 작은 단위로 분해
- 재사용 가능한 단위로 구성

### 테스트 코드 가독성

- 테스트 이름: 영어로 행동 중심 작성
- `describe`/`it`에서 무엇을 테스트하는지 명확히 표현
- Given-When-Then 구조 사용
