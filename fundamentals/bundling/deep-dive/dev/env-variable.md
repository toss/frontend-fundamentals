# 환경 변수

애플리케이션에서 사용하는 환경변수를 웹팩을 통해 주입할 수 있어요. 하지만 환경변수에는 민감한 정보(API 키, 비밀번호 등)를 포함하지 않도록 주의해야 해요. 번들된 파일에 평문으로 노출될 수 있기 때문이에요. 그래서 민감한 정보는 별도의 API를 호출하는 방식 등으로 처리해 숨기는 것이 안전해요.

웹팩에서 사용하는 환경변수는 **빌드타임 환경변수**와 **런타임 환경변수**로 나눌 수 있어요.

## 빌드타임 환경변수

빌드타임 환경변수는 웹팩이 빌드될 때 Node.js 런타임에서 접근할 수 있는 환경변수예요. 그래서 `webpack.config.js` 파일에서 환경변수를 직접 참조하거나, `dotenv`를 사용해 주입할 수 있어요.

다음은 `dotenv`로 환경변수를 설정하는 예제예요. 먼저 `.env` 파일을 통해서 환경 변수를 구성해줘요.

```bash
# .env 파일
APP_ENV=development
API_URL=http://localhost:3000
```

그리고 `webpack.config.js`를 통해서 환경변수를 참조하여 웹팩 설정에 사용할 수 있어요.

```js
require("dotenv").config();

module.exports = {
  mode: process.env.APP_ENV,
  output: {
    publicPath: process.env.API_URL
  }
};
```

터미널에서 환경변수를 주입하려면 아래처럼 실행할 수도 있어요:

```bash
APP_ENV=production API_URL=https://api.example.com webpack
```

## 런타임 환경변수

런타임 환경변수는 웹팩에서 기본 제공하는 [`DefinePlugin`](https://webpack.kr/plugins/define-plugin/#root)을 사용해 설정할 수 있어요. 이 플러그인은 번들링 과정에서 환경변수를 **문자열로 치환**해 코드에 적용해요.

::: warning 민감한 정보는 절대 포함하면 안 돼요!
런타임 환경변수는 번들된 JavaScript 코드에 **평문으로 저장**되기 때문에, 민감한 정보(API 키, 비밀번호 등)를 포함하면 안 돼요.
:::

### DefinePlugin 사용 방법

`DefinePlugin`을 등록하려면 환경변수를 객체로 정의하고, 문자열 리터럴로 전달해야 해요. 안전하게 설정하려면 `JSON.stringify`를 사용하세요.

```js{5-8}
const webpack = require("webpack");

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      "process.env.APP_ENV": JSON.stringify("production"),
    }),
  ],
};
```

### DefinePlugin의 동작 원리

`DefinePlugin`은 환경변수를 문자열로 치환하고, 코드 최적화 단계에서 코드의 불필요한 부분을 제거해요. 다음 과정에서는 조건문이 항상 `true`로 평가되기 때문에, 최적화 단계에서 불필요한 `if`문이 제거될 수 있어요.

```js
// 원본 코드
if (PRODUCTION) {
  console.log(`current env: ${process.env.APP_ENV}`);
}

// DefinePlugin이 치환한 코드
if (true) {
  console.log(`current env: ${"production"}`);
}

// 최적화 단계 결과
console.log(`current env: ${"production"}`);
```

::: warning 리터럴 형태로 전달하세요
환경변수를 설정할 때, 문자열은 반드시 **리터럴 형식**으로 전달해 주세요. 잘못된 설정은 런타임 오류를 발생시킬 수 있어요. 아래는 올바른 예제와 잘못된 예제를 비교한 내용이에요.

**올바른 설정**

```js
new webpack.DefinePlugin({
  PRODUCTION: JSON.stringify(true),
  "process.env.APP_ENV": JSON.stringify("production")
});
```

**잘못된 설정**

```js
new webpack.DefinePlugin({
  PRODUCTION: JSON.stringify(true),
  "process.env.APP_ENV": "production" // 문자열 리터럴이 아니므로 오류 발생
});
```

**결과 코드**

```js
// DefinePlugin이 치환한 잘못된 코드
if (true) {
  console.log(`current env: ${production}`);
  // ReferenceError: production is not defined
}
```

`DefinePlugin`은 설정한 값의 따옴표 안에 있는 내용을 그대로 코드에 삽입해요.
따라서 `"process.env.APP_ENV": "production"` 처럼 설정하면 `"production"`이 문자열이 아니라 변수로 인식되어 오류가 발생할 수 있어요.
이를 방지하려면 `JSON.stringify`로 감싸서 문자열 리터럴임을 보장하면, 안전하게 환경 변수를 적용할 수 있어요.
:::
