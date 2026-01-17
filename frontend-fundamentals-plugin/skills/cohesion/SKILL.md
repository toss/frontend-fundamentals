---
name: cohesion
description: 코드 리뷰나 작성 시 관련 파일이 여러 디렉토리에 흩어져 있거나, 매직 넘버가 여러 곳에 중복되어 있거나, 하나의 기능을 수정하려면 여러 디렉토리를 수정해야 할 때 사용하세요.
---

# 응집도

함께 수정되는 코드는 함께 있어야 해요. 관련된 로직은 한 곳에 모여 있어야 해요.

## 적용 시점

- 같은 상수/값이 여러 파일에 반복될 때
- 하나의 기능을 수정하려면 5개 이상의 디렉토리를 수정해야 할 때
- 관련된 타입, Hook, 컴포넌트가 서로 다른 폴더 계층에 있을 때
- import 경로가 여러 관련 없는 디렉토리를 가로지를 때

## 핵심 패턴: 함께 수정되는 파일을 같은 디렉토리에 두기

파일을 종류별로 나누면 어떤 코드가 어떤 코드를 참조하는지 쉽게 확인할 수 없어요.

❌ 개선 전:
```
src/
├── components/UserForm.tsx
├── hooks/useUserValidation.ts
├── utils/userHelpers.ts
├── types/userTypes.ts
└── api/userApi.ts
```

✅ 개선 후:
```
src/
├── components   // 전체 프로젝트에서 사용되는 코드
├── hooks
├── utils
└── domains
    └── User     // User 도메인에서만 사용되는 코드
        ├── UserForm.tsx
        ├── useUserValidation.ts
        ├── userHelpers.ts
        ├── types.ts
        └── api.ts
```

함께 수정되는 코드 파일을 하나의 디렉토리 아래에 두면, 코드 사이의 의존 관계를 파악하기 쉬워요.

## 핵심 패턴: 매직 넘버 없애기

같은 숫자가 여러 곳에 있으면, 한쪽만 수정되어 서비스가 조용히 깨질 수 있어요.

❌ 개선 전:
```tsx
// Pagination.tsx
const pages = Math.ceil(total / 20);

// useItems.ts
const offset = (page - 1) * 20;

// api.ts
const limit = params.limit || 20;
```

✅ 개선 후:
```tsx
// constants.ts
export const PAGE_SIZE = 20;

// 모든 파일에서 PAGE_SIZE를 import해서 사용
import { PAGE_SIZE } from './constants';
```

## 빠른 참조

| 코드 냄새 | 개선 방법 |
|----------|----------|
| 같은 매직 넘버가 3곳 이상 | 공유 상수로 추출 |
| 기능이 `components/`, `hooks/`, `utils/`, `types/`를 모두 수정함 | `domains/featureName/`으로 함께 배치 |
| 긴 상대 경로 `../../..` | 파일들을 더 가까이 배치해야 함 |
| 비즈니스 로직 복사-붙여넣기 | 도메인 폴더 내 공유 모듈로 추출 |
| 사용하는 곳과 멀리 떨어진 타입 정의 | 타입을 사용하는 코드와 함께 배치 |

## 중복 코드가 괜찮을 때

전략적 중복은 다음 경우에 허용돼요:
- 두 기능이 앞으로 다르게 발전할 가능성이 높을 때
- 결합으로 인해 원하지 않는 의존성이 생길 때
- "공유" 코드가 매우 단순할 때 (5줄 미만)

## 피해야 할 것

- 단순히 비슷하다는 이유로 관련 없는 코드를 억지로 합치지 마세요
- 깊게 중첩된 폴더 계층을 만들지 마세요
- 3번 이상 사용되기 전에 섣불리 추상화하지 마세요

참고: https://frontend-fundamentals.com/code-quality/cohesive/
