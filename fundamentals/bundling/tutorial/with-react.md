# React와 함께 웹팩 사용하기

지금까지는 순수 JavaScript 프로젝트를 위한 웹팩 설정을 살펴봤어요. 이번에는 실제 프론트엔드 프로젝트에서 React를 사용할 때 웹팩을 어떻게 사용할 수 있는지 배워볼게요.

[React](https://react.dev)는 사용자 인터페이스(UI)를 구성하기 위한 JavaScript 라이브러리예요. `JSX`라는 문법을 사용하는데, 이는 JavaScript 안에서 HTML처럼 코드를 작성할 수 있도록 도와줘요. 

```tsx 2
export function Component() {
  return <div>Hello, world!</div>;
}
```

하지만 브라우저는 JSX를 바로 이해할 수 없기 때문에, JSX를 일반 JavaScript로 변환하는 작업이 필요해요. 

## 1. React 프로젝트 만들기

먼저 React 프로젝트를 만들어 볼게요. 프로젝트를 만들고 React와 관련된 라이브러리를 설치해요.

```bash
npm init -y
npm install react react-dom
```

프로젝트에서 웹팩과 TypeScript도 사용하기 위해 설치해 주세요.

```bash
npm install webpack webpack-cli typescript --save-dev
```

`react`와 `react-dom`의 타입 정보를 불러오기 위해 타입 패키지도 설치해 주세요.

```bash
npm install @types/react @types/react-dom
```

다음과 같이 추천 TypeScript 설정을 `tsconfig.json`에 작성해 주세요.

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "esnext",
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "noEmit": true,
    "strict": true,
    "jsx": "react"
  },
  "include": ["src/**/*"],             
  "exclude": ["node_modules", "dist"]  
}
```

## 2. React 컴포넌트 만들기

`src/App.tsx` 파일을 만들고 간단한 React 컴포넌트를 작성해요.

```typescript
// src/App.tsx
import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app-container">
      <h1>React + 웹팩</h1>
      <div className="counter">
        <p>카운터: {count}</p>
        <button onClick={() => setCount(count + 1)}>증가</button>
        <button onClick={() => setCount(count - 1)}>감소</button>
      </div>
    </div>
  );
};
```

`src/index.tsx` 파일을 만들고 위에서 만든 `App` 컴포넌트를 브라우저에 렌더링하는 코드를 작성해 주세요.

```typescript
// src/index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<App />);
```

이때 파일 구조는 다음과 같아요.

```
webpack-tutorial/
├── src/
│   ├── index.ts
│   └── App.tsx
├── tsconfig.json
├── package.json
└── node_modules/
```

## 3. 웹팩 설정하기

웹팩이 React의 JSX 코드를 처리할 수 있도록 하기 위해 [로더](../reference/loader.md)를 활용해 볼게요. 로더를 사용하면 웹팩에게 JSX 같은 JavaScript 코드가 아닌 문법을 어떻게 다뤄야 하는지 알려줄 수 있어요.

[TypeScript 프로젝트를 만들 때](./typescript.md)와 같이, JSX 코드도 [Babel](./typescript.md#babel)을 활용해서 변환할 수 있어요.

### 필요한 패키지 설치하기

웹팩으로 JSX 및 TypeScript 코드를 불러오기 위해 `babel-loader`, `@babel/core`, `@babel/preset-react`, `@babel/preset-typescript` 패키지를 설치해 주세요.

```bash
npm install babel-loader @babel/core @babel/preset-react @babel/preset-typescript --save-dev
```

### Babel 설정하기

이제 `webpack.config.js` 파일을 열고, TypeScript와 JSX 코드를 처리할 수 있도록 `module.rules` 를 설정해 주세요.

```js 15-31
// webpack.config.js
const path = require('path');

module.exports = {
  // ./src/index.tsx 부터 시작해요.
  entry: './src/index.tsx',

  // 번들된 결과물은 ./dist/bundle.js에 저장해요.
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  mode: 'production',

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,  // .ts 또는 .tsx 확장자를 가진 파일에만 이 규칙을 적용해요
        use: [
          // Babel로 JSX 및 TypeScript 문법을 JavaScript로 변환해요
          { 
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-typescript'],
            },
          },
        ],
      },
    ],
  },
};
```

### 경로 탐색 규칙 설정하기

`import` 문에서 `.js`와 더불어 `.ts` 또는 `.tsx` 확장자를 생략하더라도 올바르게 파일을 찾을 수 있도록, 기본 확장자를 [`resolve.extensions`](/reference/resolution.md#확장자를-찾는-우선순위-설정하기-extensions)에 지정해 주세요.

```javascript 3
{
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
}
```

`import App from './App'`처럼 쓸 때, 실제 파일 이름이 `App.tsx`라도 `.tsx` 확장자를 생략해도 되게 해줘요.

### HTML 문서 만들기

React는 JavaScript로 사용자 인터페이스를 만들어서 HTML 문서 안에 끼워 넣는 방식으로 동작해요. 그래서 만들었던 React 프로젝트를 실행하기 위해서는 HTML 파일을 하나 만들고, `<App />` 컴포넌트를 렌더링할 루트 엘리먼트를 정의해야 해요.

다음과 같이 `src/template.html`에 React 서비스를 실행하는 데에 사용할 HTML 파일의 템플릿을 정의해 주세요.

```html
<!-- src/template.html -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

- `<div id="root"></div>`: React 앱이 실제로 렌더링될 공간이에요. `src/index.tsx`에서 `ReactDOM.createRoot(document.getElementById('root'))` 코드가 여기서 동작해요.

### `HtmlWebpackPlugin` 정의하기

웹팩 빌드가 될 때마다 번들된 결과물을 참조하는 HTML 파일이 생성되도록 하기 위해서는 [플러그인](../reference/plugin.md#htmlwebpackplugin) 설정이 필요해요. 먼저 `html-webpack-plugin` 패키지를 설치해 주세요.

```bash
npm install html-webpack-plugin --save-dev
```

그리고 `webpack.config.js`에 `HtmlWebpackPlugin`을 정의하세요.

```javascript 10-12
const HtmlWebpackPlugin = require('html-webpack-plugin');

/* ... */

// webpack.config.js
module.exports = {
  /* ... */ 

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html'  // 사용할 HTML 템플릿 파일 경로
    })
  ],
}

```

이렇게 템플릿을 지정하면 우리가 만든 HTML 구조를 유지하면서, 웹팩이 자동으로 번들된 JavaScript 파일을 가리키는 `<script src="...">`를 추가해줘요.

템플릿 파일에는 반드시 `<div id="root"></div>`가 있어야 React 앱이 그 안에 렌더링될 수 있어요.

이제 JSX가 잘 변환되고, React 앱이 HTML 안에 잘 삽입되도록 준비가 끝났어요.

## 4. 웹팩으로 빌드하기

이제 필요한 모든 웹팩 설정이 끝났어요! `webpack` 명령어를 쉽게 실행할 수 있도록 `package.json`에 다음과 같은 스크립트를 추가해요.

```json 3
{
  "scripts": {
    "build": "webpack"
  }
}
```

다음 명령어로 실제 번들링을 실행해요.

```bash
npm run build
```

그러면 `dist` 폴더에 `bundle.js`와 `index.html`이 생겨요. 
JavaScript 파일에는 우리가 만든 React 서비스가 번들링되어 있고, HTML 파일은 그 JavaScript 파일을 로드하죠.

브라우저에서 실행할 수 없는 JSX와 TypeScript 문법도 JavaScript 파일로 변환되어, 문제없이 실행이 가능해요.

`index.html` 파일을 열면 브라우저에서 카운터가 표시되나요? 버튼을 눌렀을 때 숫자가 증가/감소하나요?

모두 잘 작동한다면, **React + 웹팩 개발 환경 구축에 성공한 거예요! 🎉**