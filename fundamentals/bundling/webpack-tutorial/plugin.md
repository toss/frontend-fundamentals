# 플러그인으로 기능 확장하기

이번 단계에서는 '오늘의 이모지' 프로젝트에 웹팩 플러그인을 적용해서 빌드 과정을 더 효율적으로 만들어볼게요. 플러그인은 웹팩의 빌드 과정 전체에 영향을 주는 도구예요.

## 플러그인이란?

로더가 파일 단위로 변환을 처리한다면, 플러그인은 번들링된 결과물의 형태를 바꾸거나 최적화하는 등의 작업을 수행해요. 예를 들어:
- HTML 파일 자동 생성
- CSS 파일 분리
- 번들 파일 압축
- 환경 변수 주입
- 빌드 결과물 정리

## HtmlWebpackPlugin 적용하기

지금까지는 `index.html`을 수동으로 관리했어요. HtmlWebpackPlugin을 사용하면 번들링된 자바스크립트 파일을 자동으로 HTML에 주입할 수 있어요.

먼저 플러그인을 설치해요:

```bash
npm install --save-dev html-webpack-plugin
```

그리고 `webpack.config.js`에 플러그인을 추가해요:

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  // ... 기존 설정 유지
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // 템플릿으로 사용할 HTML 파일
      filename: 'index.html', // 생성될 HTML 파일 이름
      inject: true // 자동으로 번들 파일을 주입할지 여부
    })
  ]
};
```

이제 `index.html`에서 스크립트 태그를 제거할 수 있어요:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Emoji of the Day</title>
</head>
<body>
  <div id="root"></div>
  <!-- 스크립트 태그는 HtmlWebpackPlugin이 자동으로 추가해요 -->
</body>
</html>
```

## MiniCssExtractPlugin 적용하기

지금까지는 CSS가 자바스크립트 번들 안에 포함되어 있었어요. MiniCssExtractPlugin을 사용하면 CSS를 별도의 파일로 분리할 수 있어요.

먼저 플러그인을 설치해요:

```bash
npm install --save-dev mini-css-extract-plugin
```

그리고 `webpack.config.js`를 수정해요:

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // ... 기존 설정 유지
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // style-loader 대신 사용
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css' // 생성될 CSS 파일 이름
    })
  ]
};
```

이렇게 하면 CSS가 별도의 파일로 분리되어 캐싱이 더 효율적으로 동작해요.

## 👣 한 걸음 더: 플러그인 조합하기

여러 플러그인을 조합하면 더 강력한 빌드 과정을 만들 수 있어요:

1. **DefinePlugin**: 환경 변수 주입
```js
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};
```

2. **CleanWebpackPlugin**: 빌드 전 dist 폴더 정리
```bash
npm install --save-dev clean-webpack-plugin
```
```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  plugins: [
    new CleanWebpackPlugin()
  ]
};
```

3. **CopyWebpackPlugin**: 정적 파일 복사
```bash
npm install --save-dev copy-webpack-plugin
```
```js
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public', to: 'public' }
      ]
    })
  ]
};
```

## 플러그인 사용 팁

1. **플러그인 순서**
   - 플러그인은 배열 순서대로 실행돼요
   - CleanWebpackPlugin은 보통 맨 앞에 두어요
   - HtmlWebpackPlugin은 보통 맨 뒤에 두어요

2. **환경별 설정**
   - 개발 환경과 운영 환경에서 다른 플러그인을 사용할 수 있어요
   - `process.env.NODE_ENV`로 환경을 구분해요

3. **성능 고려**
   - 너무 많은 플러그인은 빌드 시간을 늘려요
   - 필요한 플러그인만 사용해요

## 다음 단계

이제 우리 프로젝트에 웹팩 플러그인을 적용해서 빌드 과정을 더 효율적으로 만들었어요. HTML과 CSS를 자동으로 처리하고, 환경 변수를 주입할 수 있게 되었죠.

다음 단계에서는 웹팩 개발 서버를 사용해서 개발 환경을 개선하는 방법을 배워볼 거예요. Hot Module Replacement(HMR)를 사용하면 코드를 수정할 때마다 페이지를 새로고침하지 않고도 변경사항을 바로 확인할 수 있답니다.
