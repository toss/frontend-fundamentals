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

이 방식을 사용하면 초기 로딩을 줄이고, 필요한 컴포넌트만 로드할 수 있어요.

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

## 웹팩으로 코드 스플리팅 설정하기

웹팩에서는 다양한 옵션을 통해 코드 스플리팅을 쉽게 설정할 수 있어요. 대표적인 두 가지 방법을 소개할게요.

### 1. dependOn 옵션 사용하기

dependOn 옵션을 사용하면 여러 진입점에서 공통으로 사용하는 모듈을 별도로 분리하여 한 번만 번들링할 수 있어요. 이렇게 하면 코드 중복을 줄이고, 브라우저 캐시를 효율적으로 활용할 수 있어서 빌드 속도와 로딩 성능이 개선돼요.

설정 방법과 예제는 [`dependOn` 옵션 문서](./code-splitting.md#공통-모듈로-코드-중복-줄이기-dependon)에서 확인할 수 있어요.

### 2. SplitChunksPlugin 플러그인 사용하기

[`SplitChunkPlugin`](https://webpack.kr/plugins/split-chunks-plugin/)을 사용하면 웹팩에서 코드 스플리팅을 자동화할 수 있어요.
이 플러그인을 사용하면 중복되는 모듈을 하나의 청크로 분리하거나, 특정 크기 이상의 파일을 자동으로 나눠 번들 크기를 최적화할 수 있어요.

웹팩 설정 파일에서 사용하는 예시는 다음과 같아요.

```javascript
module.exports = {
  // ...
  optimization: {
    splitChunks: {
      chunks: "all", // 처리할 청크의 유형 (모든 유형 처리)
      minSize: 20000, // 청크가 나뉘는 최소 크기
      maxSize: 0, // 청크의 최대 크기 (0은 제한 없음)
      minChunks: 1, // 모듈이 분할되기 위해 최소 몇 번 재사용되는지 지정
      maxAsyncRequests: 30, // 비동기 로딩 시 최대 요청 수
      maxInitialRequests: 30, // 초기 로딩 시 최대 요청 수
      automaticNameDelimiter: "~", // 생성된 파일 이름의 구분자
      name: true, // 청크 이름을 자동으로 설정할지 여부
    },
  },
};
```

웹팩의 SplitChunksPlugin과 같은 고급 기능을 함께 사용하면, 코드 스플리팅을 더욱 효율적으로 활용할 수 있어요. 이렇게 하면 사용자가 실제로 필요한 코드만 빠르게 로드할 수 있어서 웹 애플리케이션의 성능이 눈에 띄게 개선돼요.