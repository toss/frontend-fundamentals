# 모듈 번들러
모듈 번들러(Module Bundler) 는 여러 개의 나뉘어진 JavaScript 파일과 외부 라이브러리 파일을 하나 또는 몇 개의 파일로 묶어주는 도구예요. 대표적인 모듈 번들러로는 Webpack, Vite, ESBuild, Rollup 등이 있어요.

현대 프론트엔드 개발에서는 기능 단위로 코드를 모듈화하고, 다양한 외부 라이브러리를 함께 사용하기 때문에 수백에서 수천 개의 JavaScript 파일이 생기기도 해요. 만약 브라우저가 이 많은 파일들을 하나씩 따로 요청하게 되면 네트워크 요청 횟수가 많아져 로딩 시간이 길어질 수 있어요.

이 문제를 해결하기 위해 모듈 번들러는 여러 파일을 하나로 묶는 번들링(Bundling)을 수행해요.
뿐만 아니라, 트랜스파일과 코드 최적화 같은 작업도 함께 처리해서 브라우저가 효율적으로 동작할 수 있도록 도와줘요. 이제부터 이 주요 과정을 하나씩 자세히 살펴볼게요.

##  번들링

예를 들어 다음 프로젝트는 기능마다 JavaScript 파일이 따로 나누어져 있어서, 여러 개의 파일이 존재해요. 실제로는 add 함수만 사용하고 있지만, 필요 없는 subtract 함수까지 불러오고 있어요. 
이렇게 파일이 여러 개로 나뉘어 있으면, 브라우저는 각 파일을 내려받기 위해 여러 번 네트워크 요청을 해야 하기 때문에 로딩 시간이 더 길어질 수 있어요.

```javascript
// utils/add.js
export function add(a, b) {
  return a + b;
}
```

```javascript
// utils/subtract.js
export function subtract(a, b) {
  return a + b;
}
```

```javascript
// utils/index.js
export { add } from './add.js';
export { subtract } from './subtract.js';
```

```javascript
// index.js
import { add } from './utils/index.js';

console.log(add(1, 2));
```

이렇게 나뉘어 있는 파일을 번들러를 사용해서 하나 또는 몇 개의 파일로 합치고 최적화할 수 있어요.

```javascript
// bundle.js (번들링 결과)
export function add(a, b) {
  return a + b;
}

console.log(add(1, 2));
```

실제 사용하지 않는 코드인 subtract 함수는 포함시키지 않아요. 따라서 브라우저가 다운로드해야 하는 파일 개수는 4개에서 1개로 줄어들고, 번들링 결과에서도 불필요한 코드는 제거되어 최적화돼요.

## 타입스크립트 트랜스파일

프론트엔드 개발자는 TypeScript나 최신 JavaScript 문법을 자주 사용해요. 하지만 브라우저는 이런 코드를 바로 이해하지 못하기 때문에, 실행 가능한 JavaScript로 변환해야 해요. 이 과정을 트랜스파일이라고 해요.

예를 들어, 다음과 같이 TypeScript로 작성된 코드는 브라우저가 직접 실행할 수 없어요. `: number`와 같은 타입 표시(Type Annotation)는 JavaScript에 없는 문법이라 브라우저는 이해하지 못하고 오류를 발생시켜요.

```typescript
// utils/add.ts
// 여기의 `:number` 같은 타입 표시가 있으면 브라우저가 실행할 수 없어요
function add(a: number, b: number): number {
  return a + b;
}
```

```typescript
// index.ts
import { add } from './utils/add.ts';

console.log(add(1, 2));
```

트랜스파일러는 TypeScript 코드를 브라우저가 이해할 수 있는 일반 JavaScript로 바꿔줘요. 
번들러는 트랜스파일러를 이용해서 위 예시처럼 나뉘어 있는 파일을 브라우저가 이해할 수 있는 하나의 JavaScript 파일로 만들 수 있어요.

```javascript
// bundle.js (번들링 결과)
function add(a, b) {
  return a + b;
}

console.log(add(1, 2));
```

이렇게 변환된 결과는 브라우저에서 바로 실행할 수 있어요.

즉, 번들러는 파일을 묶을 뿐 아니라, 트랜스파일러를 이용해서 최신 문법이나 다른 언어로 작성된 코드를 브라우저에 맞게 바꿔주는 중요한 역할도 해요.

##  JSX(TSX) 확장 문법 트랜스파일
React에서는 JavaScript 안에서 UI를 편리하게 표현하기 위해 확장 문법인 JSX(TSX)를 사용해요.
하지만 JSX도 타입스크립트와 마찬가지로 브라우저가 바로 이해하지 못하기 때문에 JavaScript로 변환하는 과정이 필요해요.

예를 들어, 아래와 같은 JSX 코드는 브라우저에서 그대로 실행할 수 없어요.

```javascript
// components/App.jsx
export function App() {
  // 다음 JSX 문법은 브라우저에서 실행할 수 없어요
  return <h1>Hello, world!</h1>;
}
```

```javascript
// index.jsx
import { App } from './components/App.jsx';

const domNode = document.getElementById('root');
ReactDOM.createRoot(domNode).render(
  // 다음 JSX 문법은 브라우저에서 실행할 수 없어요
  <App />
);
```

이때 번들러는 JSX 문법을 일반 JavaScript로 바꿔줘요. 예를 들어 위 코드에서 JSX는 다음과 같이 바뀌어요.

```javascript
function App() {
  // JSX 문법이 일반 JavaScript로 변환되었어요
  return React.createElement("h1", null, "Hello, world!");
}

const domNode = document.getElementById('root');
ReactDOM.createRoot(domNode).render(
  // JSX 문법이 일반 JavaScript로 변환되었어요
   React.createElement(App)
);
```
이렇게 변환된 코드는 브라우저에서 문제 없이 실행돼요.  
즉, 번들러는 JSX 같은 확장 문법을 일반 JavaScript로 바꿔서 React 애플리케이션이 브라우저에서 동작할 수 있게 도와줘요.

## 번들러가 필요한 이유

앞서 살펴본 내용을 바탕으로 번들러가 제공하는 핵심 이점을 간단히 정리해볼게요.

### 1. 네트워크 요청을 줄여 로딩 시간 단축

브라우저가 스크립트를 실행할 때, 불러와야 하는 JavaScript 파일이 많을수록 네트워크 요청 횟수가 늘어나고, 그만큼 로딩 속도가 느려질 수 있어요.

번들링을 하면 여러 개의 파일들을 하나로 합쳐 요청 수를 줄이고, 리소스를 더 빠르게 다운로드할 수 있어서 로딩 속도가 빨라져요.

### 2. 개발 편의성

번들러를 사용하면 TypeScript, JSX와 같은 특수 문법을 사용하거나, 오래된 브라우저에서 지원되지 않는 문법을 사용할 수 있어요. 번들러가 지원할 브라우저에 호환되는 문법으로 자동으로 바꿔 주기 때문이죠.


### 3. 코드 최적화

JavaScript 프로젝트를 개발할 때 여러 파일로 나누어 작업하다 보면 실제로는 사용하지 않는 코드가 남을 수 있어요.
번들러는 이렇게 사용하지 않는 코드를 찾아서 싹 제거해줘요. 이걸 [트리셰이킹](/reference/optimization/tree-shaking.md)(Tree Shaking)이라고 불러요.

또한 번들러는 코드를 더 짧게 만들어줘요. 소스 코드에서 공백이나 주석을 없애고, 긴 코드를 짧게 바꿔요. 예를 들어, `false`를 `!1`로, `1 + 2`를 `3`으로 표현해요.

이렇게 하면 파일 크기가 작아져서 웹사이트가 더 빨리 로딩되고 실행돼요.