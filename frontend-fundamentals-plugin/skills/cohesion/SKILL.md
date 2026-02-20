---
name: cohesion
description: Use when 한 기능 수정 시 여러 디렉토리를 건드리거나, 같은 숫자/상수가 여러 파일에 흩어져 있거나, import 경로가 `../../..`처럼 길어질 때
---

# 응집도

함께 수정되는 코드는 함께 있어야 한다.

## 핵심 패턴

### 함께 수정되는 파일을 같은 디렉토리에 두기

❌ 종류별 분리 (의존 관계 파악 어려움):
```
src/
├── components/UserForm.tsx
├── hooks/useUserValidation.ts
├── types/userTypes.ts
└── api/userApi.ts
```

✅ 도메인별 배치:
```
src/
├── components/   # 전역 공유
└── domains/User/ # User 관련 코드 모음
    ├── UserForm.tsx
    ├── useUserValidation.ts
    ├── types.ts
    └── api.ts
```

### 매직 넘버 제거

같은 숫자가 여러 곳에 있으면 한쪽만 수정되어 버그 발생.

❌ 분산:
```tsx
// Pagination.tsx
const pages = Math.ceil(total / 20);
// useItems.ts
const offset = (page - 1) * 20;
```

✅ 상수로 통합:
```tsx
export const PAGE_SIZE = 20;
import { PAGE_SIZE } from './constants';
```

## 빠른 참조

| 코드 냄새 | 개선 방법 |
|----------|----------|
| 같은 매직 넘버 3곳 이상 | 공유 상수로 추출 |
| 기능이 `components/`, `hooks/`, `types/` 모두 수정 | `domains/featureName/`으로 배치 |
| 긴 상대 경로 `../../..` | 파일들을 가까이 배치 |
| 타입 정의가 사용처와 멀리 떨어짐 | 사용하는 코드와 함께 배치 |

## 예외: 중복이 나은 경우

- 두 기능이 다르게 발전할 가능성이 높을 때
- 공유 시 원치 않는 의존성이 생길 때
- 공유 코드가 5줄 미만으로 단순할 때

참고: https://frontend-fundamentals.com/code-quality/cohesive/
