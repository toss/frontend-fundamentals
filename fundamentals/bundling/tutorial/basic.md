# 번들링 시작하기

## 1. 새 프로젝트 폴더 만들고 npm 초기화하기

먼저 웹팩 설정을 실습할 새 폴더를 만들어 주세요. Node.js 버전은 [가이드](https://nodejs.org/ko/download)를 참고해서 `22.14.0` 버전으로 설치해 주세요.

```bash
mkdir webpack-tutorial
```

프로젝트 폴더로 이동한 뒤 터미널에 다음 명령어를 입력해 npm을 초기화해요

```bash
cd webpack-tutorial
npm init -y
```

`npm init -y` 명령어는 기본 설정으로 `package.json` 파일을 자동으로 만들어줘요. `package.json` 파일은 프로젝트의 정보와 사용 중인 패키지를 기록하는 역할을 해요.

## 2. 웹팩과 웹팩 CLI 설치하기

웹팩을 실행하려면 두 가지 패키지를 설치해야 해요.

- `webpack`: 웹팩의 핵심 기능을 제공해요.
- `webpack-cli`: 터미널에서 `webpack` 명령어를 사용할 수 있도록 해줘요.

```bash
npm install webpack webpack-cli --save-dev
```

`--save-dev` 옵션은 이 도구들이 앱 코드가 아니라 **개발 도구**라는 의미로 설치해요. 설치가 끝나면 `node_modules` 폴더와 `package-lock.json` 파일이 생겨요.

::: details 개발 도구로 설치하는 것의 의미

라이브러리를 `--save-dev` 옵션으로 개발 도구로 설치하면, 실제 운영 환경이나 라이브러리 코드로 사용될 때 설치를 건너뜀으로써 설치 시간과 공간을 아낄 수 있어요.

- `npm install` 명령어를 `--production` 옵션과 함께 실행하거나, `NODE_ENV` 환경 변수가 `"production"` 으로 설정되었을 때, devDependencies 에 명시된 패키지들은 설치되지 않아요.
- 내가 만든 패키지를 다른 프로젝트에서 다운로드 하더라도, devDependencies에 명시된 패키지들은 함께 설치되지 않아요.

:::

## 3. 기본 폴더 구조 만들기

아래와 같이 간단한 4개 파일을 만들어 보세요.

```javascript
// src/utils/add.js
export function add(a, b) {
  return a + b;
}
```

```javascript
// src/utils/subtract.js
export function subtract(a, b) {
  return a - b;
}
```

```javascript
// src/utils/index.js
export { add } from "./add.js";
export { subtract } from "./subtract.js";
```

```javascript
// src/index.js
import { add } from "./utils/index.js";

console.log(add(1, 2));
```

이때 파일 구조는 다음과 같아요.

```
webpack-tutorial/
├── src/
│   ├── index.js
│   └── utils/
│       ├── add.js
│       ├── index.js
│       └── subtract.js
├── webpack.config.js
├── package.json
└── node_modules/
```

## 4. 웹팩 설정 파일 만들기

웹팩을 사용하려면 [어떤 파일부터 읽고](../deep-dive/bundling-process/entry.md), [결과를 어디에 저장할지](../deep-dive/bundling-process/output.md) 알려줘야 해요. 이걸 설정하는 파일이 `webpack.config.js`예요.

프로젝트 루트에 다음처럼 작성해요.

```javascript{6,9-12}
// webpack.config.js
const path = require('path');

module.exports = {
  // 웹팩이 시작할 파일 경로예요.
  entry: './src/index.js',

  // 번들된 결과 파일을 저장할 위치와 파일 이름이에요.
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  // 배포용 설정이에요. 코드 압축이나 최적화를 수행해요.
  mode: 'production',
};
```

여기서 중요한 설정 두 가지는 `entry`와 `output`이에요. 각 설정에 대한 더 자세한 내용은 링크에서 학습할 수 있어요.

- [`entry`](../deep-dive/bundling-process/entry.md): 웹팩이 처음으로 불러올 파일이에요. 이 파일에서부터 필요한 모든 모듈을 찾아요.
- [`output`](../deep-dive/bundling-process/output.md): 번들 파일을 어느 위치에 어떤 이름으로 저장할지 정해요.

### 5. `npm run build` 명령어 등록하기

이제 `webpack` 명령어를 쉽게 실행할 수 있도록 `package.json`에 다음과 같은 스크립트를 추가해요.

```json
{
  "scripts": {
    "build": "webpack"
  }
}
```

이제 터미널에서 아래처럼 간단하게 실행할 수 있어요.

```bash
npm run build
```

이 명령어는 웹팩을 실행해서 `src/index.js`부터 시작해 모든 의존 파일을 분석하고, `dist/bundle.js`로 하나로 묶어요.

### 6. 웹팩으로 빌드하기

이제 아래 명령어로 실제 번들링을 실행해요.

```bash
npm run build
```

그러면 `dist` 폴더에 `bundle.js` 파일이 생겨요. 이 파일은 4개 파일의 내용을 합쳐서 최적화된 형태로 만든 거예요.
원래 소스 코드와 동작은 같지만, 훨씬 최적화되었어요. 불필요한 공백이 없고, 사용하지 않는 코드들은 모두 삭제되었어요.

```javascript
(() => {
  "use strict";
  console.log(3);
})();
```

이제 폴더 구조는 다음과 같을 거예요.

```{4}
webpack-tutorial/
├── dist/
│   └── bundle.js       # 웹팩이 만든 번들 파일
├── src/
│   ├── index.js
│   └── utils/
│       ├── add.js
│       ├── index.js
│       └── subtract.js
├── package.json
├── webpack.config.js
└── node_modules/
```

🎉 축하해요! 웹팩 설정을 성공적으로 마쳤어요. 이제 다음 단계로 넘어가 볼까요?
