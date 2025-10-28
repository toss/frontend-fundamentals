# ESLint/TSC 파싱 콜스택 오버플로우 디버깅

<br/>
<ContributorHeader name="윤민석" githubUrl="https://github.com/black7375" avatar="https://ca.slack-edge.com/E01JAGTHP8R-U085U98PY31-d26c07fac97e-512" />


## 진단하기

TDS Desktop 마이그레이션 작업 중, `Codegen`으로 자동 생성된 결과로 매우 긴 코드를 작성했더니
파싱 콜스택이 터지는 문제가 발생했어요. ESLint와 TypeScript 컴파일러(tsc)가 모두 동작하지 않았고, 빌드조차 실패하는 상황이었어요.

### 문제의 심각성
- 로컬 개발 환경에서 ESLint 실행 불가
- TypeScript 컴파일 실패
- CI 빌드 파이프라인도 동일한 에러로 실패
- 작업이 완전히 막혀버리는 상황

에러 메시지는 전형적인 콜스택 오버플로우(`Call Stack Overflow`) 형태였어요. JavaScript 엔진이
`AST(Abstract Syntax Tree)`를 파싱하는 과정에서 재귀 호출 깊이가 너무 깊어져서 스택 메모리가
고갈된 거예요.

## 재현하기

### 문제가 발생한 코드 패턴

약 560개의 메서드를 한 줄의 체이닝으로 연결한 빌더 패턴 코드였어요:

```jsx
// 문제가 되는 코드 (560개 체이닝)
const result = builder
.method1()
.method2()
.method3()
// ... (560개 계속)
.method560();
```

이런 매우 긴 체이닝 코드를 ESLint와 TypeScript가 파싱하려고 할 때, AST를 생성하는 과정에서
재귀 호출이 너무 깊어져서 JavaScript 엔진의 콜스택 제한에 도달한 거예요.


### 재현 조건
- Codegen으로 자동 생성된 대량의 메서드 체이닝 (560개)
- ESLint 실행 시
- TypeScript 컴파일 시
- 로컬 환경과 CI 환경 모두에서 동일하게 발생

## 수정하기

체이닝을 한 줄로 연결하는 대신, 변수를 나눠서 할당하고 이어서 진행하는 방식으로 해결했어요.

```jsx
// 수정 전: 560개를 한 줄로 체이닝 (콜스택 오버플로우)
const result = builder
.method1()
.method2()
// ... (560개)
.method560();

// 수정 후: 5개의 변수로 분할 (각각 약 100개씩)
const step1 = builder
.method1()
.method2()
// ... (100개)
.method100();

const step2 = step1
.method101()
.method102()
// ... (100개)
.method200();

const step3 = step2
.method201()
// ... (100개)
.method300();

const step4 = step3
.method301()
// ... (100개)
.method400();

const result = step4
.method401()
// ... (160개)
.method560();
```

이렇게 변수를 5개로 나누어서 각각 100여개씩 할당하고 이어가는 방식으로 변경하니, ESLint와
TypeScript 컴파일러가 정상적으로 동작했어요.

## 재발방지하기

### Codegen 결과물의 크기 제한 필요

자동으로 코드를 생성하는 도구를 사용할 때는 결과물의 크기나 복잡도에 제한을 두어야 해요. 특히
메서드 체이닝처럼 재귀적으로 파싱되는 패턴은 일정 개수 이상이 되면 툴링(ESLint, TSC 등)이
처리하지 못할 수 있어요. `Codegen` 설정에서 한 블록당 최대 개수를 100개 정도로 제한하고, 그
이상은 자동으로 변수를 분할하도록 하는 것이 좋아요.

### "체이닝 = 만능"이 아님

빌더 패턴의 메서드 체이닝은 가독성과 편의성을 제공하지만, 무한정 길어질 수 있는 것은
아니에요. JavaScript/TypeScript의 파서는 `AST`를 생성할 때 재귀적으로 동작하기 때문에, 너무
깊은 체이닝은 콜스택 한계에 도달할 수 있어요. "현대 컴퓨터가 참 나약하다"고 농담할 수 있지만,
실제로는 설계상의 한계예요.