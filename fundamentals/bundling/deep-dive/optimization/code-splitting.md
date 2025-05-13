# 코드 스플리팅

코드 스플리팅(Code-splitting)은 하나의 큰 자바스크립트 파일을 여러 개의 작은 파일로 나누고, 필요한 시점에 필요한 코드만 로드할 수 있도록 하는 최적화 기술이에요.

모든 페이지의 코드를 한꺼번에 로드하면 사용하지 않는 리소스까지 불러와 성능이 저하될 수 있어요. 하지만 코드 스플리팅을 적용하면 사용자가 방문한 페이지에 필요한 코드만 **동적으로 로드**할 수 있어서, 초기 로딩 속도가 빨라지고 불필요한 리소스 낭비도 줄일 수 있어요.

이제 코드 스플리팅을 활용하는 다양한 기법과 웹팩 설정 방법을 구체적으로 살펴볼게요.

## 동적으로 함수 로드하기

`import()`는 특정 모듈을 필요한 시점에 비동기로 불러오는 방식이에요. 이를 활용하면 초기 로딩을 최소화하고, 사용자가 요청한 기능만 동적으로 로드할 수 있어 성능을 최적화할 수 있어요.

- 기존 방식: 모든 코드를 한 번에 로드

  ```js{7}
  import { myFunction } from "./module.js";

  myFunction();
  ```

- 코드 스플리팅 방식: 필요한 시점에 로드

  ```js{7}
  async function loadModule() {
    const { myFunction } = await import("./module.js");
    myFunction();
  }
  ```

  import()는 Promise를 반환하기 때문에, await 키워드를 사용하여 비동기적으로 처리할 수 있어요.

## 동적으로 리액트 컴포넌트 로드하기

리액트에서는 `React.lazy`와 `Suspense`를 활용해 컴포넌트를 동적으로 불러올 수 있어요.

```jsx{3}
import React, { Suspense } from "react";

const LazyComponent = React.lazy(() => import("./LazyComponent"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

이 방식은 초기 렌더링 시 필요한 컴포넌트만 로드하고, 나머지 컴포넌트는 실제로 필요한 순간에 로드하게 만들어서 퍼포먼스를 개선할 수 있어요.

뿐만 아니라 라우팅을 설정할 때도 유용해요. 페이지 단위로 청크를 나눠 필요한 페이지를 비동기로 로드할 수 있어요.

```jsx{4-5}
import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```
## 빌드 도구별 코드 스플리팅 설정

코드 스플리팅은 애플리케이션의 초기 로딩 속도를 개선하고, 필요한 파일만 로드하여 성능을 최적화하는 중요한 기술이에요.

:::tabs key:code-splitting-setup

== Webpack

웹팩에서는 다양한 옵션을 통해 코드 스플리팅을 쉽게 설정할 수 있어요. 대표적인 두 가지 방법을 소개할게요.

### dependOn 옵션 사용하기

dependOn 옵션을 사용하면 여러 진입점에서 공통으로 사용하는 모듈을 별도로 분리하여 한 번만 번들링할 수 있어요. 이렇게 하면 코드 중복을 줄이고, 브라우저 캐시를 효율적으로 활용할 수 있어서 빌드 속도와 로딩 성능이 개선돼요.

설정 방법과 예제는 [`dependOn` 옵션 문서](./code-splitting.md#공통-모듈로-코드-중복-줄이기-dependon)에서 확인할 수 있어요.

### SplitChunksPlugin 사용하기

[`SplitChunksPlugin`](https://webpack.kr/plugins/split-chunks-plugin/)을 사용하면 웹팩에서 코드 스플리팅을 자동화할 수 있어요. 이 플러그인을 활용하면 중복되는 모듈을 하나의 청크로 분리하거나, 특정 크기 이상의 파일을 자동으로 나눠 번들 크기를 최적화할 수 있어요.

```javascript
module.exports = {
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 20000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: "~",
      name: true,
    },
  },
};
```

== Vite

기본적으로 Rollup을 내부적으로 사용하기 때문에 코드 스플리팅이 자동으로 적용돼요. 
다만, 외부 라이브러리를 별도로 분리하거나 청크 전략을 직접 정의하고 싶다면 `build.rollupOptions.output.manualChunks` 옵션을 설정할 수 있어요.

변경 가능성이 적은 외부 라이브러리를 vendor.js로 분리하면 브라우저 캐시를 효율적으로 사용할 수 있어 초기 로딩 속도가 개선돼요.

```javascript
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});
```

:::
