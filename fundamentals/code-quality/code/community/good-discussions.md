# 명예의 전당

GitHub Discussion에 올라온 성지 토론만 모았어요.
코딩 컨벤션, 예측 가능성, 성능 최적화 등 **실무에서 자주 마주치는 고민들**을 깊이 있게 논의한 내용들을 확인해 보세요.

🔗[GitHub에서 보기](https://github.com/toss/frontend-fundamentals/discussions?discussions_q=is%3Aopen+label%3A%22%EC%84%B1%EC%A7%80+%E2%9B%B2%22)

## 🎙️ [조건부 렌더링 처리, 다들 어떻게 처리하시나요?](https://github.com/toss/frontend-fundamentals/discussions/4)

`논리 연산자(&&)`와 `삼항 연산자(?:)`를 활용하는 전통적인 방식,<br/>
혹은 `<If />` 같은 선언적인 컴포넌트를 사용하는 방식. 어떤 접근법이 효과적일까요?

🔥 주요 논점:

- **논리 연산자 vs. 선언적 컴포넌트**: 직관적인 코드 vs. 일관된 패턴 유지
- **TypeScript에서 타입 안전성**: `<If />` 컴포넌트가 타입 좁히기를 방해할 수도?
- **렌더링 성능 고려**: `<If />` 컴포넌트가 Short-circuiting을 보장할까?
- **일관된 컨벤션 유지**: 한 프로젝트에서 다양한 방식이 혼용될 때의 문제

## 🎙️ [전역 상태를 사용하는 기준이 있으신가요?](https://github.com/toss/frontend-fundamentals/discussions/5)

프로젝트에서 `props`를 통해 상태를 전달하는 방식이 유지되고 있지만,  
컴포넌트 계층이 깊어지면서 **"언제 전역 상태를 도입하는 것이 좋을까?"** 라는 고민이 생깁니다.

🔥 주요 논점:

- **전역 상태를 도입할 기준**: props drilling 깊이, 공유하는 상태의 개수, 파생 값 존재 여부
- **전역 vs 지역 상태 구분**: 서버 상태, 라우팅 상태, 폼 상태, UI 상태의 적절한 관리 방법
- **`ContextAPI`는 상태 관리 도구가 아니다?**: Context를 단순히 props drilling 해결책으로 쓰는 것은 위험
- **`Redux` vs `React Query` vs `Zustand/Jotai`**: 전역 상태 라이브러리는 언제 필요할까?

🎯하이라이트:

- 위 토론을 기반으로, @jungpaeng님께서 [문서](https://frontend-fundamentals.com/code-quality/code/examples/item-edit-modal.html)에 직접 기여 해주셨어요.

## 🎙️ ["enum" vs "as const"](https://github.com/toss/frontend-fundamentals/discussions/6)

`enum`과 `as const`, TypeScript에서 어떤 방식을 선택해야 할까요?  
각 방법의 **트리 셰이킹, 런타임 성능, 유지보수성, TypeScript 생태계 방향성** 등을 고려해 논의가 이루어졌습니다.

🔥 주요 논점:

- **`enum` vs. `as const`**: `enum`은 트리 셰이킹이 어렵지만, `as const`는 가독성이 떨어질 수 있음.
- **`const enum`의 inlining 이점**: `const enum`은 inlining을 지원하지만, `isolatedModules` 활성화 시 동작이 달라짐.
- **TypeScript 생태계 변화**: JavaScript 친화적인 타입 시스템 방향으로 변화 중 (`--erasableSyntaxOnly` 옵션 추가 예정).
- **Node.js & TC39의 움직임**: TypeScript 특수 문법의 유지 여부와 표준화 가능성.

## 🎙️ [if문의 return이 간단한 한 줄이라면 어떻게 사용하시나요?](https://github.com/toss/frontend-fundamentals/discussions/41)

`if (A) return null;`  
간단한 조건문에서 return을 한 줄로 작성할지, 중괄호 `{}`를 사용할지 고민되시나요?  
**가독성, 코드 일관성, 유지보수성, Diff 최소화** 등의 측면에서 다양한 의견이 오갔습니다.

🔥 주요 논점:

- **한 줄 vs 중괄호 포함 여부**: 간결한 코드 vs. 통일된 스타일 유지
- **Diff 최소화**: 중괄호 `{}`를 사용하면 코드 수정 시 불필요한 Diff를 줄일 수 있음.
- **시선의 흐름 유지**: 한 줄 스타일은 코드 읽는 흐름이 달라질 수 있음.
- **ESLint, Biome 활용**: 팀 내 스타일을 통일하기 위해 린터 설정을 적극 활용하는 방법.

## 🎙️ [불리언 타입으로의 암묵적 타입변환에 대해 어떻게 생각하시나요?](https://github.com/toss/frontend-fundamentals/discussions/21)

`if (!value)`  
이 코드, 자연스럽게 사용하고 계신가요?  
아니면 `if (value === undefined)`처럼 명시적으로 비교하는 편이신가요?  
불리언 타입으로의 암묵적 타입 변환이 **예측 가능성, 코드 가독성, 오류 가능성** 측면에서 논의되었습니다.

🔥 주요 논점:

- **의도 명확성 vs 간결함**: `if (!value)`는 `"", undefined, null, 0`을 모두 포함하는데, 의도한 조건인지 불분명할 수 있음.
- **예측 가능성 문제**: 불리언이 아닌 값이 조건문에서 암묵적으로 변환되면, 코드 유지보수 시 혼란을 초래할 가능성이 있음.
- **오류 가능성**: 특정 값만 체크해야 하는 경우에는 명시적인 비교 (`=== undefined`, `=== ""`)가 더 안전함.
- **도구 활용**: `isNil(value)`, `isString(value)` 같은 헬퍼 함수를 활용해 코드의 명확성을 높이는 방법도 고려 가능.
