# 경로 탐색

번들링 과정에서 **모듈이 실제로 어떤 파일을 가리키는지 찾아 결정**하는 동작을 **리졸브**(Resolve)라고 하고, 설정된 규칙에 따라 리졸브하는 과정을 **리졸루션**(Resolution)이라 해요. 리졸브는 웹팩 내부 라이브러리인 **리졸버**(Resolver)가 담당해요.

웹팩의 리졸버는 `import` 및 `require` 구문에서 사용된 경로가 절대 경로 또는 상대 경로인지에 따라 **파일 시스템에서 모듈을 찾거나, 그렇지 않다면 설치된 패키지에서 모듈을 찾아요.**

리졸브 규칙은 웹팩 설정 파일의 **`resolve`** 필드에서 설정할 수 있어요.

## 파일시스템 경로

파일 시스템(File System)은 운영 체제가 파일과 디렉토리를 조직하고 관리하는 방식이에요. 운영 체제는 계층적으로 저장된 파일 구조에서 **절대 경로** 또는 **상대 경로**로 사용해 파일을 찾고 관리해요.

아래 표에서 절대 경로와 상대 경로의 차이를 살펴볼게요.

<!-- prettier-ignore-start -->

| 경로 종류 | 기호 | 설명 |
| --- | --- | --- | 
| 절대 경로 | `/` |  시스템의 루트부터 시작하는 경로<br />예시) `/public`은 `/Users/hany/toss/project/src` |
| 절대 경로 | 프로젝트 기준 |  프로젝트 디렉토리부터 시작하는 경로(설정 필요)<br />예시) `project/src`? |
| 상대 경로 | `./`  | 현재 파일이 위치한 디렉토리 <br />예시) `./components`는 현재 디렉토리 안에 있는 `components` |
| 상대 경로 | `../` | 현재 디렉토리의 상위 디렉토리 <br />예시) `../assets/`는 한 단계 위의 디렉토리에 있는 `assets` |

<!-- prettier-ignore-end -->

모듈이 절대 경로 또는 상대 경로로 선언되어 있으면, 웹팩은 프로젝트의 파일 시스템에서 해당 파일을 직접 찾아요.

### 절대 경로

웹팩은 절대 경로로 선언된 모듈을 루트 디렉토리부터 탐색해 리졸브해요.

```tsx
import { Header } from "src/components/Header.tsx";
```

```text{3}
├─ src
│  ├─ components
│  │  └─ Header.tsx
```

### 상대 경로

아무 설정도 하지 않으면 웹팩은 상대 경로를 사용해 의존성을 찾아요.

다음처럼 상대 경로로 정의된 경우, 현재 파일인 `Layout.tsx`이 위치한 디렉토리인 `components`에서 `Header.tsx`를 찾아요.

```tsx
// Layout.tsx
import { Header } from "./components/Header.tsx";
```

```text{3}
├─ src
│  ├─ components
│  │  ├─ Header.tsx
│  │  └─ Layout.tsx
```

## 모듈 경로

파일 시스템 경로가 아니라면, 웹팩은 다음과 같은 순서로 설치된 패키지에서 모듈을 찾고 해석해요.

1. `import` 및 `require` 구문으로 선언된 모듈이 Node.js 빌트인 모듈이거나, 브라우저 환경에서 기본 제공되는 API인지 확인해요.
2. 기본으로 제공되는 모듈이 아니라면, 패키지가 설치된 위치에서 해당 모듈의 `package.json` 을 찾아요.
3. 패키지의 `package.json`에는 진입점 역할을 하는 `"exports"` 또는 `"main"` 필드가 있어요. 리졸버는 이 진입점을 시작으로 리졸브해요.

## 리졸브 규칙

웹팩 설정 파일의 `resolve` 필드에서 모듈을 찾고 해석하는 규칙을 정의할 수 있어요.

### 탐색할 경로 설정하기: [`modules`](https://webpack.kr/configuration/resolve/#resolvemodules)

`modules`는 웹팩이 모듈을 탐색할 기준이 되는 디렉토리를 정의해요.

예를 들어, `modules`를 다음과 같이 설정해 볼게요.

- `path.resolve(__dirname)`: 프로젝트 루트 디렉토리를 기준으로 모듈을 탐색
- `node_modules`: 외부 패키지를 탐색하는 기본 경로

```tsx{5-8}
// webpack.config.js
module.exports = {
  //...
  resolve: {
    modules: [
      path.resolve(__dirname), // 프로젝트 루트 기준 탐색
      "node_modules", // 외부 패키지를 탐색하는 기본 경로
    ],
  },
};
```

이제 설정한 디렉토리를 기준으로, 절대 경로처럼 모듈을 가져올 수 있어요.

```tsx
import calculate from "src/helpers/calculate";
import _ from "lodash";
```

### 확장자를 찾는 우선순위 설정하기: [`extensions`](https://webpack.kr/configuration/resolve/#resolveextensions)

웹팩의 `extensions` 옵션을 설정하면, import 및 require 구문에서 확장자가 생략된 경우에도 지정된 확장자 목록의 순서대로 파일을 찾아 리졸브할 수 있어요.

예를 들어, `extensions` 옵션을 다음과 같이 설정하고, 확장자가 생략된 Header 컴포넌트를 가져오는 import 구문을 실행하면 웹팩이 어떻게 동작하는지 살펴볼게요.

```js{5}
// webpack.config.js
module.exports = {
  //...
  resolve: {
    extensions: [".tsx", "ts"],
  },
};
```

```tsx
import { Header } from "./components/Header";
```

확장자가 생략되어 있지만, 웹팩은 `extensions` 옵션에 정의된 확장자 목록 순서대로 파일을 찾고 해석해, `./components/Header.tsx`를 번들 파일에 포함해요.

```text{3}
/components
 ├── Header.ts
 ├── Header.tsx  (일치하는 파일 찾음)
 └── Button.tsx
```

### 경로의 별칭 만들기: [`alias`](https://webpack.kr/configuration/resolve/#resolvealias)

`alias`를 사용하면 특정 디렉토리에 별칭을 지정할 수 있어요. 이렇게 설정하면 길거나 복잡한 상대 경로 대신 간결한 경로로 가져올 수 있어 가독성을 높일 수 있어요.

다음과 같이 `src/components`에는 @components, `src/utils`에는 @utils라는 별칭을 설정할 수 있어요.

```tsx{5-8}
// webpack.config.js
module.exports = {
  //...
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
};
```

이제 별칭만 사용해서 모듈을 가져올 수 있어요.

```tsx
// src/components/Header.tsx를 가져오는 경우
import Header from "@components/Header";

// src/utils/getSum.ts를 가져오는 경우
import getSum from "@utils/getSum";
```

## 문제 해결하기: 컴파일러와 빌드 도구의 리졸브 규칙 맞추기

컴파일 환경과 빌드 환경에서는 각각 다른 방식으로 경로를 해석하기 때문에, 설정이 일치하지 않으면 문제가 발생할 수 있어요.

타입스크립트를 사용하는 경우, 빌드 도구(웹팩, Vite 등)와의 경로 해석하는 규칙을 맞추는 것이 중요해요.

- `tsconfig.json`에서 `baseUrl` 필드를 `./src`로 설정하면, src 폴더를 루트처럼 인식해서 다음처럼 작성해도 타입스크립트 컴파일러와 VSCode에서는 정상적으로 동작해요.

  ```tsx
  import Header from "components/Header";
  ```

  하지만 웹팩은 컴파일러가 알고 있는 규칙을 모르기 때문에, 웹팩이 `components`을 경로로 인식하지 못하고
  외부 패키지로 판단해 모듈을 찾으려 하기 때문에, Module not found 에러가 발생할 수 있어요.

  > Module not found: Error: Cannot resolve module ‘components/Header’ in '/Users/hany/Desktop/webpack/src'...

- 반대로 웹팩 설정의 `resolve.alias` 옵션으로 경로에 별칭을 설정하고, `tsconfig.json`를 수정하지 않으면, 다음과 같은 컴파일 에러가 발생해요.

  <img style="border-radius: 8px; opacity: 0.9" src="/images/knowledge/webpack/resolve_compile-error.png" alt="compile-error" />

  > error TS2307: Cannot find module 'pages/Main' or its corresponding type declarations.

이 문제를 해결하려면 컴파일 환경과 빌드 환경의 리졸브 설정을 동기화해 주어야 해요. 이를 위해 양쪽에 `alias` 또는 `modules` 옵션을 설정하거나, 빌드 도구에 특정 플러그인을 설치하여 경로가 일관되게 해석되게 할 수 있어요.

### 1. 환경설정

**타입스크립트 컴파일러가 모듈의 경로를 찾는 방식은 `tsconfig.json`에서 다음 옵션을 통해 설정**할 수 있어요.

- [`baseUrl`](https://www.typescriptlang.org/tsconfig/#baseUrl): 모듈을 찾을 때 기준이 되는 디렉토리를 설정해요.
- [`paths`](https://www.typescriptlang.org/tsconfig/#paths): 특정 디렉토리를 별칭(alias)로 매핑할 수 있어요. 이를 통해 복잡한 경로를 표기하는 대신 단순하게 모듈을 가져올 수 있어요.

```json{5-10}
// tsconfig.json
{
  "compilerOptions": {
    // tsconfig.json이 있는 현재 디렉토리는 루트 디렉토리
    "baseUrl": "./",
    "paths": {
      // @components 는 웹팩의 alias속성과 같은 별칭 역할을 해요.
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"]
    }
  }
}
```

위와 같이 `baseUrl`을 `./`로 설정하면, `tsconfig.json`이 위치한 디렉토리를 기준으로 모듈을 해석해요. 그리고 `src/components`의 경로는 @components로 `src/utils`의 경로는 @util으로 대체해서 사용할 수 있어요.

```tsx
import sleep from "@utils/sleep";
```

그리고 **웹팩도 동일한 규칙을 따르도록 `webpack.config.js`을 설정**해요.

```js{5-12}
// webpack.config.js
module.exports = {
  //...
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
    modules: [
      path.resolve(__dirname), // 프로젝트 루트 기준 탐색
      "node_modules", // 외부 패키지를 탐색하는 기본 경로
    ],
  },
};
```

::: tip path.resolve

Node.js가 제공하는 Path 함수인 [`path.resolve([...paths])`](https://nodejs.org/api/path.html#pathresolvepaths) 를 활용해 쉽게 절대경로를 작성할 수 있어요.

> The path.resolve() method resolves a sequence of paths or path segments into an absolute path.

:::
<br />

### 2. 웹팩 플러그인

웹팩에서 타입스크립트의 `baseUrl` 및 `paths` 설정을 자동으로 적용하려면,
[`tsconfig-paths-webpack-plugin`](https://github.com/dividab/tsconfig-paths-webpack-plugin) 플러그인을 사용할 수 있어요.

이 플러그인은 빌드 타임에 `tsconfig.json`에 정의된 경로 설정을 읽고, 웹팩의 `resolve.alias`에 자동으로 반영해줘요.

```js{8}
// webpack.config.js
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  //...
  resolve: {
    //...
    plugins: [new TsconfigPathsPlugin()],
  },
};
```

::: tip Vite 플러그인
Vite에서는 같은 역할을 하는 [`vite-tsconfig-paths`](https://github.com/aleclarson/vite-tsconfig-paths) 플러그인을 사용할 수 있어요.

:::
