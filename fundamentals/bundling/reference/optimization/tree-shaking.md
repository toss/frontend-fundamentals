# 트리셰이킹

트리셰이킹(Tree Shaking)은 프로젝트에서 사용되지 않는 코드를 제거하는 최적화 기법이에요. 마치 나무를 흔들어 불필요한 잎을 떨어뜨리는 것처럼, 실제로 사용하지 않는 코드(Dead Code)를 번들 파일에 포함되지 않게 해요.

예를 들어, lodash 라이브러리에서 `deepEqual` 함수 하나만 사용한다고 가정해 볼게요.

```js
import { deepEqual } from "lodash";
```

하지만 이렇게 가져오면, 실제 번들 파일에는`deepEqual` 함수 뿐만 아니라 사용하지 않는 lodash의 모든 함수들까지 포함되어 크기가 커지는 문제가 생겨요. 이럴 때 트리셰이킹을 적용해 `deepEqual` 함수만 번들에 포함되어 번들 파일을 최적화할 수 있어요.

트리셰이킹의 특징에 대해 살펴볼게요.

## 트리셰이킹이 동작하는 환경

트리셰이킹은 **정적 분석**(static analysis)을 기반으로 동작하는 최적화 기법이에요. 정적 분석이란 코드가 실행되는 런타임이 아닌 환경에서 분석하는 것을 말해요. 따라서 트리셰이킹은 번들러가 코드를 분석하고 번들링하는 빌드 타임에서 효과적으로 적용돼요.

트리셰이킹이 잘 동작하려면, 번들러가 모듈 간의 관계를 명확하게 분석할 수 있도록 모듈이 구성되어야 해요. 자바스크립트의 모듈 시스템에는 ESM(ECMAScript Module)과 CJS(CommonJS) 두 가지 방식이 있는데, ESM은 정적인 구조를 가지기 때문에 빌드 타임에 분석이 가능하고, 트리셰이킹이 효과적으로 적용돼요.

ESM과 CJS의 구조적인 특성을 비교하면서 트리셰이킹이 ESM에서 효과적인 이유를 더 자세히 살펴볼게요.

### ESM

ESM은 `import`와 `export` 구문으로 모듈 간의 관계를 분석해 의존성 그래프를 만들어요.
이를 통해 번들러가 불필요한 코드를 쉽게 판단하고 제거할 수 있어요.

::: info 의존성 그래프

의존성 그래프는 [AST](https://ko.wikipedia.org/wiki/%EC%B6%94%EC%83%81_%EA%B5%AC%EB%AC%B8_%ED%8A%B8%EB%A6%AC)를 기반으로 생성돼요. AST는 번들러가 문자열로 된 코드를 트리 형태로 변환한 자료구조로, 코드의 구조와 모듈 간 관계를 분석하는 데 활용되는 자료구조예요.

번들러는 AST를 분석해 의존성 그래프를 만들고, 이 정보를 바탕으로 참조되지 않는 코드를 찾아 제거해 최적화된 번들을 생성할 수 있어요.

:::

이러한 특성 때문에 ESM에서는 다음과 같은 제약이 있어요.

- `import`한 모듈은 다른 값으로 재할당할 수 없어요

  ESM의 `import`는 읽기 전용(immutable)이기 때문에 가져온 모듈을 재할당할 수 없어요.  
  이는 모듈 간의 의존성을 명확하게 유지하고, 정적 분석을 용이하게 하기 위한 설계예요.

  ```js
  import { math } from "./math.js";

  math = {}; // Error
  ```

- `import` 및 `export` 구문은 항상 파일의 최상단에 위치해야 해요

  ESM에서는 `import`와 `export`가 코드가 실행되기 전에 정적으로 분석되므로, 실행 도중 동적으로 평가될 수 없어요.
  따라서 조건문 안에서 import를 사용할 수 없으며, 항상 최상단에 위치해야 해요.

  ```ts
  if (condition) {
    import { func } from "./module.js"; // Error
  }
  ```

### CJS

CJS는 런타임에 `require` 구문을 사용해 모듈을 동적으로 로드하기 때문에, 빌드타임에 번들러가 불필요한 코드를 쉽게 판단하거나 제거하지 못해요.

예를 들어 다음과 같은 상황에서는 CJS의 동작을 정확히 예측하기 어려워요.

- 함수나 조건문 안에서 동적으로 모듈을 로드할 때

  ```js
  let foo;

  if (SOME_CONDITION) {
    foo = require("something");
  } else {
    foo = require("something_else");
  }
  ```

- 몽키 패칭등으로 예상하지 못한 동작이 생길 때

  몽키 패칭(Monkey Patching)은 기존 소스 코드를 직접 수정하지 않고, 런타임에 속성이나 동작을 변경하는 기술이에요.

  ```js
  Module.prototype.require = function (path) {
    if (!path.include("/toss/")) {
      return {};
    }
    return Module._load(path, this);
  };
  ```

## 사이드 이펙트가 없는 코드 제거

사이드 이펙트(Side-Effect)는 코드가 예상치 못한 방식으로 애플리케이션의 동작에 부작용을 줄 수 있는 가능성을 의미해요. 즉, 사이드 이펙트가 없는 코드란 **번들링된 코드가 실행될 때 동작에 영향을 주지 않는 코드**예요.

**사이드 이펙트가 있는 코드**를 몇 가지 예를 들어 볼게요.

1. 호출될 때 외부 상태를 변경하는 함수

```js
let count = 0;

function incrementCount() {
  count = count + 1; // 함수가 호출될 때마다 전역 변수 값이 변경됨 (사이드 이펙트 발생)
}

incrementCount();
```

2. 직접적으로 DOM 변경

```js
function updateDOM() {
  document.body.innerHTML = "<h1>Hi Toss!</h1>"; // DOM이 변경됨
}
```

3. 조회를 할 때마다 다른 결과 반환

```js
const user = {};

// Object.defineProperty를 이용한 속성 조작
Object.defineProperty(user, "name", {
  get() {
    console.log("이름이 뭐예요?");
    this._name = this._name ? this._name + "!" : "Hany"; // 값을 변경하는 부작용 발생
    return this._name;
  },
});

console.log(user.name); // "이름이 뭐에요?" 출력 후 "Hany"
console.log(user.name); // "이름이 뭐에요?" 출력 후 "Hany!"
console.log(user.name); // "이름이 뭐에요?" 출력 후 "Hany!!"
```

반대로 **사이드 이펙트가 없는 코드**는 다음과 같아요.

1. 순수함수: 외부 변수나 전역 상태를 변경하지 않고, 입력값에 따라 항상 동일한 결과 반환

```js
function add(a, b) {
  return a + b;
}

const result = add(2, 3);
console.log(result);
```

2. 조회 시 동일한 결과를 반환

```js
const user = {
  _name: "Hany",
  get name() {
    console.log("이름이 뭐예요?");
    return this._name; // 값을 변경하지 않고 그대로 반환
  },
};

console.log(user.name); // "이름이 뭐예요?" 출력 후 "Hany"
console.log(user.name); // "이름이 뭐예요?" 출력 후 "Hany"
console.log(user.name); // "이름이 뭐예요?" 출력 후 "Hany"
```

2. 원본 데이터를 변경하지 않고 새로운 값을 반환하는 내장 함수

```js
arr.slice(1);
arr.map((num) => num * 2);
arr.filter((num) => num > 1);

str.toUpperCase();
str.repeat(3);

Math.floor(4.8);
Math.abs(-10);
```

이처럼 사이드 이펙트가 없는 코드는 번들러가 안전하다고 판단하면, 최종 번들에서 제거돼요.

## 트리셰이킹 최적화를 위한 추가 설정

실제로 작성하는 코드에는 사이드 이펙트가 포함될 때가 많아요. 번들러가 이를 올바르게 처리할 수 있도록, **개발자가 직접 정보를 제공하거나, 번들러가 자동으로 최적화를 수행할 수도 있어요.**

대표적인 방법은 다음 두 가지예요.

### 주석 설정

**`/* @__PURE__ */`** 주석은 이 코드가 실행되더라도 사이드 이펙트가 없다는 것을 번들러에게 명시적으로 알리는 역할을 해요. 즉, 외부 상태에 영향을 주지 않는다고 단언하는 거예요. 트리셰이킹 최적화를 위해 번들러가 번들링 과정에서 자동으로 추가할 수도 있고, 개발자가 직접 명시적으로 추가할 수도 있어요.

다음과 같이 `/* @__PURE__ */` 주석이 포함된 코드를 번들링하면,

```js
const Icon = /* @__PURE__ */ React.createElement(...);
```

번들러는 해당 코드가 사이드 이펙트가 없다고 판단할 수 있어요. 그 결과, 최적화 과정에서 필요하지 않은 경우 아래처럼 제거될 수 있어요.

```js
const Icon = React.createElement(...);
```

### `sideEffects` 필드 활용

`package.json` 파일의 `sideEffects` 필드는 특정 파일이나 코드가 번들링 과정에서 제거되지 않도록 번들러에 알려주는 역할을 해요.

### 모든 파일에 사이드 이펙트가 없다고 선언하기

```jsx{3}
// package.json
{
  "sideEffects": false,
}
```

이렇게 설정하면, 번들러는 사용되지 않는 모든 파일을 안전하게 제거할 수 있어요.

이 설정은 CSS 파일과 특정 자바스크립트 파일이 제거되지 않도록 명시하는 방식이에요. 예를 들어, `global.js` 파일이 전역 변수를 설정하거나 애플리케이션의 초기화를 담당하는 경우, 트리셰이킹 과정에서 실수로 제거되지 않도록 보호할 수 있어요.

### 특정 파일이나 디렉토리를 제거하지 않도록 설정하기

```json{3}
// package.json
{
  "sideEffects": ["*.css", "./src/global.js"]
}
```

이렇게 필요한 파일을 지정하면, 트리셰이킹의 효과를 유지하면서도 필수적인 코드가 번들에서 빠지는 문제를 방지할 수 있어 빌드 성능을 최적화할 수 있어요.
