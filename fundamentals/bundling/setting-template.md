# 상황별 웹팩 설정 템플릿

웹팩 설정은 프로젝트의 요구 사항에 따라 다르게 구성할 수 있어요.  
아래는 자주 사용하는 5가지 설정 템플릿이에요.

## 1. 기본 번들링 설정

이 설정은 기본적인 번들링을 수행할 때 사용해요.  
파일을 `dist/bundle.js`로 출력하며, UMD(Universal Module Definition) 형식으로 라이브러리를 내보내요.

```javascript
const path = require("path");

module.exports = {
  entry: "./src/index.js", // 번들링 시작 파일
  output: {
    path: path.resolve(\_\_dirname, "dist"), // 결과물 저장 경로
    filename: "bundle.js", // 번들 파일 이름
    library: "ArithmeticLibrary", // 라이브러리 이름
    libraryTarget: "umd" // UMD 형식으로 번들링
  },
  mode: "production" // 최적화 적용
};
```

## 2. 코드 압축(최적화) 설정

이 설정은 번들 파일 크기를 줄이고 성능을 최적화할 때 사용해요.
`TerserPlugin`을 추가해 코드를 압축하고, 불필요한 내용을 제거해요.

```javascript
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    library: "ArithmeticLibrary",
    libraryTarget: "umd",
  },
  mode: "production",
  optimization: {
    minimize: true, // 코드 압축 활성화
    minimizer: [new TerserPlugin()], // TerserPlugin 사용
  },
};
```

## 3. 개발 환경 설정 (핫 리로드 포함)

이 설정은 개발할 때 편리한 환경을 구성해요.  
파일 변경 시 자동으로 새로고침되도록 `webpack-dev-server`를 사용해요.

```javascript
const path = require("path");

module.exports = {
entry: "./src/index.js",
  output: {
    path: path.resolve(\_\_dirname, "dist"),
    filename: "bundle.js"
  },
  mode: "development",
  devServer: {
    static: "./dist", // 정적 파일 제공
    hot: true, // 핫 리로드 활성화
    port: 3000 // 개발 서버 포트 지정
  },
};

```

## 4. CSS 및 SASS 번들링 설정

이 설정은 CSS 및 SASS(Scss) 파일을 번들링할 때 사용해요.
`style-loader`와 `css-loader`, `sass-loader`를 추가해서 스타일 파일도 번들링할 수 있어요.

```javascript
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.scss$/, // .scss 파일을 처리
        use: ["style-loader", "css-loader", "sass-loader"], // SASS 변환 및 스타일 적용
      },
    ],
  },
};
```

## 5. React 프로젝트 설정 (Babel 사용)

이 설정은 React 프로젝트에서 JSX 문법을 사용할 때 필요해요.  
`babel-loader`를 추가해서 JSX 및 최신 JavaScript 문법을 변환할 수 있어요.

```javascript
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // .js 또는 .jsx 파일을 처리
        exclude: /node_modules/, // node_modules 제외
        use: {
          loader: "babel-loader", // Babel로 변환
          options: {
            presets: ["@babel/preset-react"], // React 지원
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"], // import할 때 확장자 생략 가능
  },
};
```
