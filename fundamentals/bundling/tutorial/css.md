# CSS 파일 번들링하기

이번에는 CSS 파일을 웹팩으로 어떻게 처리하는지 배워볼게요.

## CSS를 JavaScript 모듈처럼 다루기

웹팩의 강력한 기능 중 하나는 JavaScript뿐 아니라 CSS, 이미지, 폰트 등 다양한 자원도 하나의 JavaScript 모듈처럼 다룰 수 있다는 점이에요. CSS 파일을 JavaScript 모듈처럼 다룰 수 있다는 것은 무엇일까요? 

다음과 같이 스타일을 다루기 위해 [CSS Modules](https://css-tricks.com/css-modules-part-1-need/)를 사용하는 React 앱을 살펴볼게요. CSS Modules는 CSS 클래스 이름을 겹치지 않게 컴포넌트 단위로 사용할 수 있도록 도와주는 기술이에요.

`Component.js` 파일에서 `Component.module.css`를 import하고 있어요. 

```javascript 2,6
// src/Component.js
import css from './Component.module.css';

export function Component() {
  return (
    <h1 className={css.title}>
      Hello, world!
    </h1>
  )
}
```

```css 2-4
/* src/Component.module.css */
.title {
  color: red;
}
```

그런데 이렇게 JavaScript에서 CSS를 import하면 어떤 일이 일어날까요?
JavaScript는 본래 CSS를 직접 해석하거나 적용할 수 없기 때문에, 단순히 import한다고 해서 스타일이 자동으로 적용되지는 않아요.

이렇게 JavaScript가 아닌 파일을 import하면 무슨 일이 일어나는지 정의하기 위해서는 [로더](../reference/loader.md)가 필요해요. 

대표적인 로더 중 하나인 CSS 로더(`css-loader`)는 다음과 같이 CSS 파일을 JavaScript 객체로 변환해요. 
CSS Modules를 사용할 때, 원본 클래스 이름은 프로퍼티로, 겹치지 않도록 변환된 클래스 이름은 값이 되죠.

```javascript
// 변환된 Component.module.css
export default {
  title: '_styles__title_309571057',
};
```

## CSS 파일 웹팩에서 다루기

### 1. 새 프로젝트 폴더 만들고 npm 초기화하기

CSS 설정을 실습할 새 프로젝트를 만들어 볼게요. 프로젝트를 만들고 React와 관련된 라이브러리를 설치해요.

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

[React 프로젝트를 웹팩에서 사용](./with-react.md)하기 위한 패키지도 설치해 주세요.

```bash
npm install babel-loader @babel/core @babel/preset-react @babel/preset-typescript html-webpack-plugin --save-dev
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

### 2. CSS 파일 만들고 import하기

`src/Component.tsx`에 간단한 React 컴포넌트를 작성해요. 이 React 컴포넌트에서는 CSS Modules로 작성된 CSS 파일을 import해요.

```typescript 3
// src/Component.tsx
import React from 'react';
import css from './Component.module.css';

export function Component() {
  return (
    <h1 className={css.title}>
      Hello, world!
    </h1>
  )
}
```

`src/Component.module.css`에 사용할 CSS 파일을 만들어 주세요.

```css
/* src/Component.module.css */
.title {
  color: red;
}
```

`src/index.tsx` 파일을 만들고 위에서 만든 `Component` 컴포넌트를 브라우저에 렌더링하는 코드를 작성해 주세요.

```typescript
// src/index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(<App />);
```

마지막으로 React 서비스를 실행하는 데에 사용할 HTML 파일을 만들어 주세요.

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

이때 파일 구조는 다음과 같아요.

```
webpack-tutorial/
├── src/
│   ├── Component.tsx
│   ├── Component.module.css
│   ├── index.tsx
│   └── template.html
├── tsconfig.json
├── package.json
└── node_modules/
```

### 3. CSS 로더 설치하기

웹팩이 CSS 파일을 해석하고 JavaScript로 변환할 수 있도록 하기 위해 [로더](../reference/loader.md)를 활용해 볼게요.
다음 2가지 로더를 설치할 거예요.

```bash
npm install style-loader css-loader --save-dev
```

각 로더의 역할은 아래와 같아요.

- [`css-loader`](../reference/loader.md#css-loader): `.css` 파일의 내용을 읽고, JavaScript에서 사용할 수 있는 형식으로 바꿔줘요.
- [`style-loader`](../reference/loader.md#style-loader): JavaScript로 바뀐 CSS를 웹페이지에 `<style>` 태그로 삽입해서 실제로 스타일이 적용되도록 해줘요.

### 4. 웹팩 설정에 로더 추가하기

이제 `webpack.config.js` 파일을 열고 CSS를 처리할 수 있도록 `module.rules` 옵션을 추가해요.

```javascript{16-30}
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.tsx',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  mode: 'production',

  module: {
    rules: [
      // CSS를 사용하기 위한 웹팩 설정이에요
      {
        // .css 확장자를 가진 파일에만 이 규칙을 적용해요
        test: /\.css$/,           
        // 오른쪽 또는 아래부터 순서대로 적용돼요
        use: [
          'style-loader', 
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }  
        ],  
      },

      // React를 사용하기 위한 웹팩 설정이에요
      {
        test: /\.(ts|tsx)$/,  
        use: [
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

  // 빌드할 때마다 HTML 파일을 만들기 위한 설정이에요
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html' 
    })
  ],

  // .ts, .tsx 확장자를 생략해도 올바르게 파일을 찾을 수 있게 해주는 설정이에요
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
};
```

::: info 알아두세요

`use` 배열은 오른쪽(아래)에서 왼쪽(위) 순서로 작동해요. 먼저 `css-loader`가 CSS를 JavaScript로 바꾸고, 그다음 `style-loader`가 그걸 HTML에 삽입해요.

:::

이제 React 프로젝트에서 CSS 파일을 사용할 수 있는 준비가 끝났어요.

### 5. 다시 빌드하기

`webpack` 명령어를 쉽게 실행할 수 있도록 `package.json`에 다음과 같은 스크립트를 추가해요.

```json 3
{
  "scripts": {
    "build": "webpack"
  }
}
```

이제 다시 웹팩으로 번들링을 실행해요.

```bash
npm run build
```

그다음 `dist/index.html`을 브라우저에서 열어보면, 우리가 기대했던 것처럼 CSS 규칙이 적용되어 `Hello, world!` 글자가 빨간색으로 보이는 것을 볼 수 있어요.

## CSS가 처리되는 과정

한 번 정리해 볼게요. 웹팩이 CSS 파일을 어떻게 처리하는지 단계별로 설명하면 이래요.

1. `import css from './style.css'`를 만나면 웹팩이 CSS 파일을 로딩해야 한다고 판단해요.
2. `css-loader`가 CSS 코드를 JavaScript 모듈로 바꿔줘요.
3. `style-loader`가 이 문자열을 `<style>` 태그로 만들어서 HTML 문서에 동적으로 삽입해요.

즉, CSS 파일이 JavaScript 코드의 일부처럼 동작하게 되는 거예요.

이제 CSS 파일도 JavaScript처럼 `import`해서 사용할 수 있게 됐어요. 코드가 더 깔끔하고, 스타일도 모듈처럼 관리할 수 있어서 유지보수도 쉬워져요.

이제 이미지와 폰트 같은 정적 자원도 웹팩에서 처리해 볼게요.
