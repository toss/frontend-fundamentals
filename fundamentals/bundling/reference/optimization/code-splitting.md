# 코드 스플리팅

코드 스플리팅(Code-splitting)은 하나의 큰 자바스크립트 파일을 여러 개의 작은 파일로 나누고, 필요한 시점에 필요한 코드만 로드할 수 있도록 하는 기술이에요.

예를 들어, 애플리케이션의 모든 페이지에 해당하는 코드를 한꺼번에 로드하면 불필요한 리소스까지 불러와 성능이 저하될 수 있어요. 하지만 코드 스플리팅을 적용하면 사용자가 방문한 페이지에 필요한 코드만 **동적으로 로드**할 수 있어, 초기 로딩 속도가 빨라지고 불필요한 리소스 낭비를 줄일 수 있어요.  

이어서 코드 스플리팅의 기법들을 소개할게요.

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
