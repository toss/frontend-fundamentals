# 번들링이란

번들링은 **여러 개의 파일을 하나로 묶고 최적화하는 과정**이에요.[^1] 현대 프론트엔드 서비스는 JavaScript를 수십, 수백 개의 파일로 모듈화해서 개발해요. 라이브러리 안에 있는 JavaScript 파일까지 합치면 수천 개의 파일이 사용되기도 해요. 번들링은 여러 JavaScript 파일들을 한 번에 묶고 최적화함으로써, 사용자가 더 빠르게 프론트엔드 서비스를 불러올 수 있도록 해요. 

[^1]: 이렇게 묶인 JavaScript 파일을 번들(Bundle)이라고 불러요.

## 하나의 파일로 묶고 최적화

다음 프로젝트에서는 여러 개의 JavaScript 파일이 개별적으로 존재해요.

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

이렇게 나뉘어 있는 파일을 Webpack, Vite, ESBuild, Rollup과 같은 번들러를 사용하면 하나의 최적화된 파일로 합치고 최적화할 수 있어요.

```javascript
// bundle.js (번들링 결과)
export function add(a, b) {
  return a + b;
}

console.log(add(1, 2));
```

결과적으로 브라우저가 스크립트를 실행할 때 네트워크 요청 횟수가 4번에서 1번으로 줄어들고, 사용하지 않는 코드(`subtract`)가 사라져요.

## 브라우저가 이해할 수 있는 코드로 변환

번들링은 브라우저가 이해할 수 없는 코드를 브라우저가 이해할 수 있는 코드로 변환해주는 역할도 해요.

예를 들어, 다음과 같이 TypeScript로 작성된 코드는 브라우저가 직접 실행할 수 없어요. `: number`와 같은 타입 표시(Type Annotation)는 JavaScript에 없는 문법이라 브라우저는 이를 이해하지 못하고 오류를 발생시켜요.

```typescript
// utils/add.ts
function add(a: number, b: number): number {
  return a + b;
}
```

```typescript
// index.ts
import { add } from './utils/add.ts';

console.log(add(1, 2));
```

번들러는 TypeScript 코드를 브라우저가 이해할 수 있는 일반 JavaScript로 바꿔줘요. 
위 예시처럼 나뉘어 있는 파일을 번들러를 사용하면 브라우저가 이해할 수 있는 하나의 JavaScript 파일로 만들 수 있어요.

```javascript
// bundle.js (번들링 결과)
function add(a, b) {
  return a + b;
}

console.log(add(1, 2));
```

## React 프로젝트에서 번들링

현대 프론트엔드 서비스는 React로 개발되는 경우가 많아요. React로 서비스를 개발하면 JSX라고 하는 특수 문법을 사용해요. 
JSX는 표준 JavaScript가 아니기 때문에 브라우저가 이해할 수 없어요. 예를 들어, 다음 코드는 브라우저에서 그대로 실행했을 때 에러를 발생시켜요.

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

번들러는 JSX 같은 특수 문법을 브라우저가 이해할 수 있는 일반 JavaScript로 바꿔줘요.

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

## 번들링이 필요한 이유

### 1. 네트워크 요청을 줄여 로딩 시간 단축

브라우저가 스크립트를 실행할 때, 불러와야 하는 JavaScript 파일이 많을수록 네트워크 요청 횟수가 증가하고, 그에 따라 추가적인 비용이 발생해요. 지연이 발생할 수도 있어요.

번들링을 하면 여러 개의 파일들을 하나로 합쳐 요청 수를 줄이고, 리소스를 더 빠르게 다운로드할 수 있어요.

### 2. 코드 최적화

JavaScript 프로젝트를 개발할 때 여러 파일로 나누어 작업하면 실제로는 쓰지 않는 코드가 남아있을 수 있어요. 
번들러는 이런 안 쓰는 코드를 찾아서 싹 제거해줘요. 이걸 [Tree Shaking](./optimization/tree-shaking.md)이라고 불러요.

또한 번들러는 코드를 더 짧게 만들어줘요. 소스 코드에서 공백이나 주석을 없애고, 긴 코드를 짧게 바꿔요. 예를 들어, `false`를 `!1`로, `1 + 2`를 `3`으로 표현해요.

이렇게 하면 파일 크기가 작아져서 웹사이트가 더 빨리 로딩되고 실행돼요.

### 3. 개발 편의성

번들러를 사용하면 TypeScript, JSX와 같은 특수 문법을 사용하거나, 오래된 브라우저에서 지원되지 않는 문법을 사용할 수 있어요. 번들러가 지원할 브라우저에 호환되는 문법으로 자동으로 바꿔 주기 때문이죠.
