# 개발 서버란?

개발 서버는 로컬 환경에서 코드 변경 사항을 실시간으로 반영하고 빠르게 테스트할 수 있게 도와주는 도구예요. 다양한 번들러에서 개발 서버를 제공하며, 이를 사용하면 브라우저 새로고침 없이 개발 효율을 높일 수 있어요.

## 개발 서버가 필요한 이유

프론트엔드 개발은 브라우저가 JavaScript와 에셋을 HTTP 요청으로 가져오기 때문에 웹 서버가 필수예요. 직접 웹 서버를 설정하면 파일 변경 시 매번 수동으로 빌드하고 새로고침해야 해서 불편해요. 개발 서버를 사용하면 이런 과정을 자동화해 효율적으로 개발할 수 있어요.

![개발 서버 구성도](/images/hmr-1.png)

## 개발 서버 유형

### 번들링 기반

번들링 기반의 서버는 시작하기 전에 모든 모듈의 의존성을 분석하고 하나의 번들로 묶어요. 프로젝트 규모가 클수록 번들링 과정에서 시간이 걸려 초기 서버 실행이 느릴 수 있어요. 대신, 변경된 모듈만 즉시 반영하는 HMR(Hot Module Replacement) 기능을 지원해 빠르게 테스트할 수 있어요.

대표적인 번들러로는 Webpack, Rollup이 있어요.

![](/images/bundle-dev-server.png)

### ESM 기반

ESM(ES Module)을 사용하는 서버는 번들을 만들지 않고 필요한 모듈만 요청할 때마다 로딩해요. 그래서 서버가 즉시 시작되며, 변경된 코드만 바로 갱신하는 HMR 성능도 뛰어나요.

대표적인 번들러로는 Vite, Esbuild가 있어요.

![](/images/esm-dev-server.png)


## 개발 서버 설정 방법

### Webpack 설정 예시

Webpack은 `webpack-dev-server`로 개발 서버를 제공하며, 다양한 옵션으로 최적화할 수 있어요.

```bash
npm install -D webpack-dev-server
```

```js
// webpack.config.js
const path = require("path");

module.exports = {
  devServer: {
    static: { directory: path.join(__dirname, "public") },
    compress: true,
    port: 9000,
    historyApiFallback: true,
    proxy: [
      {
        context: ["/api"],
        target: "http://localhost:3000",
      },
    ],
  },
};
```

### Vite 설정 예시

Vite는 ESM 기반으로 동작하며 빠른 시작 속도를 제공해요.

```bash
npm install -D vite
```

```js
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
});
```

### Esbuild 설정 예시

Esbuild도 빠른 빌드 속도를 제공하며, 간단한 개발 서버 설정을 지원해요.

```bash
npm install -D esbuild esbuild-serve
```

```js
// package.json
"scripts": {
  "dev": "esbuild src/index.js --bundle --servedir=public"
}
```

## 자주 사용하는 개발 서버 옵션

### 클라이언트 측 라우팅 문제 해결

단일 페이지 애플리케이션(SPA)에서는 클라이언트 측 라우팅을 위해 **History API**를 사용해요. 하지만 브라우저에서 특정 URL로 직접 접근하면 서버가 해당 경로를 찾지 못해 404 에러가 발생할 수 있어요.

이 문제를 해결하려면, 존재하지 않는 모든 경로에 대해 `index.html`을 반환하도록 설정하면 돼요. 이렇게 하면 어떤 경로로 접근해도 `index.html`이 제공되며, 이후 클라이언트 측에서 라우팅을 처리할 수 있어요. 이렇게 하면 모든 경로에 `index.html`이 제공되고, 이후 클라이언트 측에서 라우팅을 처리할 수 있어요.

* Webpack: `historyApiFallback: true`
* Vite: Default

### HTTPS 설정

로컬 개발 환경에서 HTTPS가 필요할 때 `server` 옵션으로 프로토콜을 HTTPS로 설정할 수 있어요. 기본값은 HTTP이지만, 로컬 인증서를 설정하면 HTTPS로 서비스할 수 있어요.

HTTPS를 사용하려면 로컬 인증서가 필요해요. `mkcert`를 사용하면 간편하게 인증서를 발급받을 수 있어요:

```bash
mkcert -install
mkcert localhost
```

위 명령으로 생성된 `localhost-key.pem`과 `localhost.pem`을 아래와 같이 `devServer`에 적용하세요.

```js
devServer: {
  server: {
    type: "https",
    options: {
      key: "./localhost-key.pem",
      cert: "./localhost.pem",
    },
  },
}
```

### API 프록시 설정

클라이언트와 서버 도메인이 다르면 브라우저는 보안상 다른 출처로 간주해 CORS(Cross-Origin Resource Sharing) 정책에 따라 요청을 차단할 수 있어요.

프론트엔드에서 `/api` 요청을 백엔드(`https://test.com`)로 전달해 CORS 문제를 우회할 수 있어요. 다음 예시를 참고하세요.

:::info CORS란?
브라우저가 프론트엔드 코드가 다른 출처(API 서버 등)에 요청을 보낼 때 기본적으로 차단하는 보안 정책이에요.이는 악의적 스크립트가 사용자의 인증 정보(쿠키, 토큰 등)를 훔치거나 조작하지 못하도록 보호하기 위함이에요.서버가 Access-Control-Allow-Origin 헤더에 허용할 도메인을 지정하면, 브라우저는 그 도메인에서 온 요청만 통과시켜요.
:::

**Webpack 예시:**

```js
// webpack.config.js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://test.com',
        changeOrigin: true,
        secure: false, 
      },
    },
  },
};
```

**Vite 예시:**

```js
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://test.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
```

## 추가 자료


`webpack-dev-server`는 Node.js를 통해 직접 서버를 구성할 수도 있어요. 자세한 방법은 아래 문서를 참고하세요.

- [웹팩 공식 문서](https://webpack.kr/api/webpack-dev-server/)
- [Github API 예제](https://github.com/webpack/webpack-dev-server/tree/master/examples/api/simple)


