# 웹팩의 최적화 기능

웹팩은 번들링 과정에서 여러 [최적화](/knowledge/optimization/overview.md) 기능을 제공해요. 이를 활용하면 불필요한 코드가 포함되는 것을 방지하고, 필요한 코드만 로드할 수 있어 성능을 개선할 수 있어요.

## 1. 코드 스플리팅

[코드 스플리팅](/knowledge/optimization/code-splitting)은 **코드를 나누어 번들링하는 최적화 기술로, 필요한 시점에 필요한 코드만 로드**할 수 있어요.

#### `dependOn` 옵션

`dependOn`을 사용하면 여러 진입점에서 공통으로 사용하는 모듈을 별도로 분리해 한 번만 번들링할 수 있어요. 이렇게 하면 불필요한 코드 중복을 줄이고, 브라우저 캐시를 효율적으로 활용할 수 있어 빌드 속도와 로딩 성능이 개선돼요.

설정 방법과 예제는 [`dependOn` 옵션 문서](/knowledge/webpack/entry#공통-모듈로-코드-중복-줄이기-dependon)에서 확인할 수 있어요.

#### `SplitChunkPlugin` 플러그인

[`SplitChunkPlugin`](https://webpack.kr/plugins/split-chunks-plugin/)을 사용하면 웹팩에서 코드 스플리팅을 자동화할 수 있어요.
이 플러그인을 사용하면 중복되는 모듈을 하나의 청크로 분리하거나, 특정 크기 이상의 파일을 자동으로 나눠 번들 크기를 최적화할 수 있어요.

다음은 웹팩 설정 파일에서 `SplitChunkPlugin`을 사용하는 예시예요.

```js{4-13}
module.exports = {
  // ...
  optimization: {
    splitChunks: {
      chunks: "all", // 처리할 청크 유형
      minSize: 20000, // 청크의 최소 크기
      maxSize: 0, // 청크의 최대 크기
      minChunks: 1, // 모듈이 분할되기까지 최소 몇 번 재사용되어야 하는지를 정의
      maxAsyncRequests: 30, // 비동기 로딩 시 최대 요청 수를 정의
      maxInitialRequests: 30, // 최대 로딩 시 최대 요청 수를 정의
      automaticNameDelimiter: "~", // 생성된 파일 이름의 구분자
      name: true, // 청크이름을 자동으로 설정하는지
    },
  },
};
```

## 2. 난독화

코드 난독화(Code Obfuscation)를 하면 **불필요한 공백과 주석을 제거하고, 변수명을 축약해 파일 크기를 줄일 수 있어요.** 이렇게 하면 로딩 속도가 개선되고, 브라우저에서 더 빠르게 실행될 수 있어요. 또한, 난독화된 코드는 원본보다 읽기 어려워져 코드 분석이 복잡해지고, 일정 수준의 보안 효과도 얻을 수 있어요.

#### `TerserWebpackPlugin` 플러그인

[`TerserWebpackPlugin`](https://webpack.js.org/plugins/terser-webpack-plugin/)을 사용해 웹팩에서 난독화를 적용할 수 있어요. 이 플러그인은 기본적으로 웹팩의 `mode`가 `production`일 때 활성화돼요.

다음은 웹팩 설정 파일에서 `TerserPlugin`을 사용하는 예시예요.

```js{1,6-10}
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  // ...
  optimization: {
    minimize: true, // 코드 압축 및 난독화 활성화
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: true, // 난독화 여부
        },
      }),
    ],
  },
};
```

## 3. 코드 압축

코드 압축(Code Minification)은 **불필요한 공백, 줄 바꿈, 주석 등을 제거해 번들 크기를 줄이는 기법**이에요.

#### `TerserWebpackPlugin` 플러그인

[TerserWebpackPlugin](https://webpack.js.org/plugins/terser-webpack-plugin/) 플러그인을 사용해 웹팩에서 코드 압축을 적용할 수 있어요. 추가 설정을 통해 동작을 세밀하게 조정할 수도 있어요.

다음은 웹팩 설정 파일에서 `TerserPlugin`을 사용하는 예시예요.

```js{1,6-12}
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  // ...
  optimization: {
    minimize: true, // 코드 압축 및 난독화 활성화
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: true, // 난독화 여부
          compress: { // 압축 세부 설정
            drop_console: true, // console.log 구문은 제거
          },
        },
      }),
    ],
  },
};
```

## 4. 캐시 무효화

캐시 무효화(Cache Busting)는 브라우저가 **최신 파일을 로드하도록 유도하는 기법**이에요. 브라우저는 동일한 파일 이름을 가진 리소스를 캐시에서 불러오기 때문에, 코드가 변경돼도 반영되지 않는 문제가 발생할 수 있어요.

이를 방지하려면 파일 이름에 해시 값을 추가해 변경된 파일을 새로운 파일로 인식하게 하면 돼요. 이렇게 하면 **불필요한 리소스 로드를 줄이고 성능을 최적화**할 수 있어요.

설정 방법과 예제는 [파일 이름을 동적으로 설정하는 문서](/knowledge/webpack/output#청크-파일-이름을-동적으로-설정하기-chunkfilename)에서 확인할 수 있어요.
