# 개발 서버

개발 서버는 일반적으로 여러 개발자가 공유하는 환경에서 애플리케이션을 테스트하고, 운영 서버에 배포하기 전에 검증하는 용도로 사용되는 서버예요.
하지만 여기서 다룰 웹팩의 개발 서버(`webpack-dev-server`)는 각 개발자가 자신의 로컬 환경에서 실행하는 서버로, 코드 변경 사항을 실시간으로 반영해서 새로고침없이 빠르게 테스트할 수 있게 도와주는 서버예요.

## 개발 서버가 필요한 이유

프론트엔드 개발에서는 브라우저가 자바스크립트 파일(에셋)을 네트워크 요청을 통해 가져와야 하기 때문에 반드시 웹 서버가 필요해요. 그런데 웹 서버를 직접 띄워서 개발 환경을 구성하면 파일이 변경될 때마다 새로 빌드하고 브라우저를 새로고침해야 하는 번거로움이 생겨요.

만약 직접 개발 서버를 구성하려면 `webpack-dev-middleware`와 `webpack-hot-middleware`를 사용할 수 있어요. 하지만 이 방법은 복잡하고 일반적인 경우에는 권장하지 않아요. 서버를 직접 구성하면 아래와 같은 구조를 가지게 돼요.

![개발 서버 구성도](../../../images/webpack/hmr-1.png)

웹팩은 이런 불편함을 해소하기 위해 개발 서버인 `webpack-dev-server`를 제공해요. 이 서버는 웹팩과 통합되어 있어 변경된 부분만 다시 빌드하고 **HMR(Hot Module Replacement)** 기능을 사용해서 브라우저에 실시간으로 반영할 수 있어요.

## `devServer` 옵션으로 개발 환경에 최적화하기

개발 서버를 단순히 웹서버로 사용하는 게 아니라면 `devServer` 필드의 옵션을 수정해 개발 서버의 동작을 프론트엔드 개발환경에 최적화할 수 있어요. 자주 사용하는 옵션들을 소개할게요.

### 클라이언트 측 라우팅 문제 해결: [`historyApiFallback`](https://webpack.kr/configuration/dev-server/#devserverhistoryapifallback)

단일 페이지 애플리케이션(SPA)에서는 클라이언트 측 라우팅을 위해 **History API**를 사용해요. 하지만 브라우저에서 특정 URL로 직접 접근하면 서버가 해당 경로를 찾지 못해 404 에러가 발생할 수 있어요.

이 문제를 해결하려면, 존재하지 않는 모든 경로에 대해 `index.html`을 반환하도록 설정하면 돼요. 이렇게 하면 어떤 경로로 접근해도 `index.html`이 제공되며, 이후 클라이언트 측에서 라우팅을 처리할 수 있어요. 이렇게 하면 모든 경로에 `index.html`이 제공되고, 이후 클라이언트 측에서 라우팅을 처리할 수 있어요.

### HTTPS 서버 설정: [`server`](https://webpack.kr/configuration/dev-server/#devserverserver)

로컬 개발 환경에서 HTTPS가 필요할 때 `server` 옵션을 사용해서 프로토콜을 HTTPS로 설정할 수 있어요. 기본값은 HTTP이지만, 인증서를 추가로 설정하면 HTTPS를 지원하는 개발 서버를 사용할 수 있어요.

HTTPS를 사용하려면 로컬 인증서가 필요해요. 인증서는 `mkcert`를 사용하면 간단히 발급받을 수 있고, 발급받은 인증서를 아래와 같이 설정하면 HTTPS를 지원하는 개발 서버를 띄울 수 있어요. 로컬 인증서를 발급받는 방법은 다음과 같은 [자료](https://yung-developer.tistory.com/112)를 검색해서 쉽게 찾아볼 수 있어요.

```js{4-10}
module.exports = {
  //...
  devServer: {
    server: {
      type: "https",
      options: {
        key: "./path/to/server-key.pem",
        cert: "./path/to/server.pem",
      },
    },
  },
};
```

### API 요청 프록시 설정: [`proxy`](https://webpack.kr/configuration/dev-server/#devserverproxy)

`proxy` 옵션을 사용해서 개발 서버를 프록시 서버로 구성해 API 요청을 백엔드 서버로 전달할 수 있어요. 주로 CORS(Cross-Origin Resource Sharing) 문제를 해결하기 위해 사용해요.

#### 문제 해결하기

예를 들어, 프론트엔드 서버(`localhost:5000`)에서 백엔드 서버(`localhost:3000`)로 요청을 보내야 한다고 가정해 볼게요. 브라우저는 두 서버의 포트가 다르기 때문에 Cross-Origin 요청으로 간주하고 CORS 에러를 발생시킬 거예요.

이런 상황을 해결하기 위해서는 백엔드 서버의 CORS 설정을 통해서 모든 Origin 접근을 허용해주거나, `localhost:3000` Origin을 허용해주면 될거예요. 하지만 이 방법은 보안상 그렇게 좋은 방법은 아니예요.
대신 개발 환경에서는 웹팩의 proxy 옵션으로 프록시 서버를 설정해, 클라이언트가 같은 출처(Same Origin)에서 API 요청을 보내는 것처럼 만들어 CORS 문제를 우회할 수 있어요.

다음과 같이 설정하면 `localhost:5000/api` 로 보내는 요청을 `localhost:3000/api`로 보내주고 응답을 받을 수 있어요.

```js{4-11}
module.exports = {
  //...
  devServer: {
    proxy: [
      {
        context: ["/api"],
        target: "http://localhost:3000",
      },
    ],
  },
};
```

위 설정은 `localhost:5000/api`로 들어오는 요청을 모두 `localhost:3000/api`로 전달해요. 브라우저 입장에서는 요청과 응답이 동일한 Origin에서 처리된 것처럼 인식하기 때문에 CORS 문제가 발생하지 않아요.

## 사용하기

다음 명령어로 `webpack-dev-server` 패키지를 설치해 주세요.

```bash
yarn install -D webpack-dev-server @types/webpack-dev-server
```

설치 후, 다음 코드와 같이 `webpack.config.js` 파일에 `devServer` 필드를 추가하면 `webpack serve` 명령어로 개발 서버를 바로 사용할 수 있어요.

```js{5-14}
const path = require("path");

module.exports = {
  //...
  devServer: {
    // static으로 서빙할 파일의 디렉토리 지정
    static: {
      directory: path.join(__dirname, "public"),
    },
    // gzip 압축 활성화
    compress: true,
    // 사용할 포트 번호
    port: 9000,
  },
};
```

<!-- 진영님 Plugin 문서 링크하기 -->

개발 서버를 띄운다고 브라우저를 통해서 바로 접속할 수 있지는 않아요. 먼저 자바스크립트를 로드할 `index.html`이 필요해요. `HtmlWebpackPlugin`을 사용하면 HTML 파일을 자동으로 생성하고 서빙할 수 있어요.

::: info 서버를 직접 띄우기

`webpack-dev-server`는 Node.js를 통해 직접 서버를 구성할 수도 있어요. 자세한 방법은 아래 문서를 참고하세요.

- [웹팩 공식 문서](https://webpack.kr/api/webpack-dev-server/)
- [Github API 예제](https://github.com/webpack/webpack-dev-server/tree/master/examples/api/simple)

:::
