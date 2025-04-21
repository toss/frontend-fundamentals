# TypeScript 코드 번들링하기

현대 웹 개발은 JavaScript만 사용하지 않고, TypeScript도 사용해요.

그런데 브라우저에서는 JavaScript만을 지원하기 때문에 TypeScript 코드는 실행할 수 없어요. 웹팩을 활용하면 TypeScript로 작성된 프로젝트도 브라우저에서 실행할 수 있도록 번들링할 수 있어요.

## TypeScript 프로젝트 설정하기

실제로 TypeScript 프로젝트를 만들어 볼게요. [앞서서 숫자를 계산한 튜토리얼 코드](./basic.md#3-기본-폴더-구조-만들기)를 다음과 같이 TypeScript로 변환해 주세요.

```javascript
// src/utils/add.ts
export function add(a, b) {
  return a + b;
}
```

```javascript
// src/utils/subtract.ts
export function subtract(a, b) {
  return a + b;
}
```

```javascript
// src/utils/index.ts
export { add } from './add.ts';
export { subtract } from './subtract.ts';
```

```javascript
// src/index.ts
import { add } from './utils/index.ts';

console.log(add(1, 2));
```

프로젝트에서 TypeScript를 사용하기 위해 설치해 주세요.

```npm
npm install typescript --save-dev
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
    "strict": true
  },
  "include": ["src/**/*"],             
  "exclude": ["node_modules", "dist"]  
}
```

이때 파일 구조는 다음과 같아요.

```
webpack-tutorial/
├── src/
│   ├── index.ts
│   └── utils/
│       ├── add.ts
│       ├── index.ts
│       └── subtract.ts
├── webpack.config.js
├── tsconfig.json
├── package.json
└── node_modules/
```

## 로더 설정하기

웹팩도 기본적으로 JavaScript 코드만 처리할 수 있어요. TypeScript 같이 JavaScript가 아닌 파일을 웹팩에서 사용하려면 [로더](../reference/loader.md)라는 도구가 필요해요. 로더는 웹팩에게 "이런 종류의 파일을 어떻게 JavaScript로 변환해서 다뤄야 하는지"를 알려줘요.

### 필요한 패키지 설치하기

웹팩으로 TypeScript 파일을 불러오기 위해 `babel-loader`, `@babel/core`, `@babel/preset-typescript` 패키지를 설치해 주세요.

```bash
npm install babel-loader @babel/core @babel/preset-typescript --save-dev
```

### Babel

[Babel](https://babeljs.io)은 TypeScript 같은 문법을 JavaScript로 변환해주는 컴파일러예요. 예를 들어, 다음과 같은 TypeScript 코드를 일반 JavaScript 코드로 변환해 주죠.

```typescript
// input.ts (TypeScript 코드)
const one: number = 1;
const two: number = 2;

function add(x: number, y: number): number {
  return x + y;
}
```

```javascript
// output.js (JavaScript 코드)
const one = 1;
const two = 2;

function add(x, y) {
  return x + y;
}
```

Babel의 핵심 로직은 `@babel/core` 패키지에 포함되어 있고, Babel이 TypeScript를 이해하고 변환하기 위해서는 `@babel/preset-typescript` 패키지가 필요해요. 

### 웹팩 설정에 로더 추가하기

이제 `webpack.config.js` 파일을 열고 TypeScript를 처리할 수 있도록 `module.rules` 를 추가해요. 

```js 11-26
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,  // .ts 확장자를 가진 파일에만 이 규칙을 적용해요
        use: [
          // Babel로 TypeScript 파일을 JavaScript로 변환해요
          { 
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-typescript'],
            },
          },
        ],
      },
    ],
  },
};
```

## 다시 빌드하기 ​

이제 다시 웹팩으로 번들링을 실행해요.

```bash
npm run build
```

다시 `dist/bundle.js` 파일을 열어보면, TypeScript 코드가 JavaScript로 변환된 것을 확인할 수 있어요. 기존과 동일하게 하나의 JavaScript 파일로 묶여서 최적화되었어요.

```javascript
(()=>{"use strict";console.log(3)})();
```

🎉 축하해요! 웹팩으로 TypeScript 설정을 잘 완료했어요. 