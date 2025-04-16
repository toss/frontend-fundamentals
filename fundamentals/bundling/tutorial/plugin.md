# 플러그인으로 더 강력한 개발 환경 만들기

앞서 본 것처럼 웹팩은 로더로 다양한 파일을 처리할 수 있지만, **빌드 과정 전체를 제어하거나 자동화하는 작업**은 [플러그인(plugin)](../reference/plugin.md)이 담당해요.

플러그인은 HTML 파일을 자동으로 만들어 주거나, CSS 파일을 별도로 추출하거나, 빌드 결과를 정리하고, 코드를 압축하고 최적화하는 등 **프로젝트 전체에 영향을 주는 작업**을 처리해요.

이번에는 웹팩에서 자주 사용하는 대표적인 플러그인들을 직접 사용해 볼게요.

## 1. [`HtmlWebpackPlugin`](../reference/plugin.md#htmlwebpackplugin) – HTML 파일 자동 생성하기

웹팩은 기본적으로 JavaScript만 처리할 수 있기 때문에, HTML 파일은 직접 만들어야 했어요. 하지만 `HtmlWebpackPlugin`을 사용하면 HTML도 자동으로 생성할 수 있어요. 이 플러그인은 **번들된 JavaScript 파일을 HTML에 자동으로 삽입**해 줘서 훨씬 편리해요.

다음 커맨드로 `HtmlWebpackPlugin`을 추가해요.

```bash
npm install html-webpack-plugin --save-dev
```

웹팩 설정 파일(`webpack.config.js`)에서 설치한 플러그인을 불러와서 등록해요.

```javascript
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // ...생략
  plugins: [
    new HtmlWebpackPlugin({
      title: '웹팩 튜토리얼',  // <title> 태그 내용
      template: './src/template.html', // 선택: HTML 템플릿 지정
    }),
  ],
};
```

이렇게 설정하면 웹팩은 지정된 템플릿을 기반으로 `dist/index.html` 파일을 자동으로 생성해요. `bundle.js` 같은 출력 파일도 `<script>` 태그로 자동 삽입돼요.

### 템플릿 예시

`src/template.html` 파일을 아래처럼 작성할 수 있어요.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title><%= htmlWebpackPlugin.options.title %></title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```

빌드하면 `dist/index.html` 파일이 자동 생성되고, 번들된 JavaScript 파일도 자동으로 포함돼요. 템플릿에는 EJS 문법을 사용할 수 있어서 `title` 같은 값을 동적으로 넣을 수도 있어요.

## 2. `MiniCssExtractPlugin` – CSS 파일 분리하기

지금과 같은 웹팩 기본 설정에서는 CSS가 JavaScript 코드 안에 포함되어 있고, 실행할 때 `<style>` 태그로 삽입돼요. 하지만 **운영 환경에서는 CSS를 별도의 `.css` 파일로 분리하는 것이 성능과 유지보수 측면에서 더 좋아요.**

이때 사용하는 것이 `MiniCssExtractPlugin`이에요. 이 플러그인은 **CSS를 별도 파일로 추출하고, HTML에서 자동으로 `<link>` 태그로 연결**해 줘요.

이런 용도로 `MiniCssExtractPlugin`을 사용해요. 다음 커맨드로 `MiniCssExtractPlugin`을 추가해요.

```bash
npm install mini-css-extract-plugin --save-dev
```

추가됐다면, `style-loader` 대신 `MiniCssExtractPlugin.loader`를 사용하고, 플러그인을 등록해요.

```javascript{2,9-12}
// webpack.config.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,  // 스타일을 <style>이 아닌 CSS 파일로 추출
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ title: '웹팩 튜토리얼' }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css', // 추출될 CSS 파일 경로
    }),
  ],
};
```

이제 빌드하면 `dist/styles/main.css` 같은 파일이 생성되고, 자동으로 `<link rel="stylesheet" ...>` 태그가 추가돼요. 이렇게하면 CSS 파일이 별도로 다운로드되기 때문에 브라우저 캐시 활용도 좋아지고, 로딩 성능도 향상돼요.

## 3. `CleanWebpackPlugin` – 빌드 결과 정리하기

웹팩은 기본적으로 매번 `dist` 폴더를 덮어쓰기만 해요. 그런데 예전 파일이 남아 있을 수도 있어서, **빌드 전에 기존 결과를 깨끗하게 정리하고 시작하는 게 더 안전해요.**

이런 기능은 `CleanWebpackPlugin`으로 처리할 수 있어요. 다음 커맨드로 `CleanWebpackPlugin`을 추가해요.

```bash
npm install clean-webpack-plugin --save-dev
```

이제 웹팩에 설정을 추가해요.

```javascript{2,8}
// webpack.config.js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({ title: '웹팩 튜토리얼' }),
    new MiniCssExtractPlugin({ filename: 'styles/[name].css' }),
    new CleanWebpackPlugin(),  // 빌드 전에 dist 폴더를 자동으로 정리해요
  ],
};
```

::: info 웹팩 5에서는 `output.clean: true`도 가능해요

웹팩 5부터는 플러그인 없이도 간단한 정리를 할 수 있어요.

```javascript
output: {
  path: path.resolve(__dirname, 'dist'),
  clean: true, // CleanWebpackPlugin 없이도 정리 가능
},
```

다만, 여러 폴더를 정리하거나 더 정교한 동작을 원한다면 여전히 `CleanWebpackPlugin`이 더 유용해요.
:::

## 4. [`DefinePlugin`](../reference/plugin.md#defineplugin) – 환경 변수 설정하기

개발 환경과 운영 환경에 따라 다르게 동작해야 할 때는 **환경 변수를 설정해서 코드 안에서 조건에 따라 분기할 수 있어요.**

웹팩 기본 플러그인인 `DefinePlugin`을 사용하면 빌드 시점에 전역 상수처럼 사용할 수 있어요. 다음과 같이 웹팩 설정에 추가하면 돼요.

```javascript{6-8}
// webpack.config.js
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
```

이렇게 하면 코드 안에서 `process.env.NODE_ENV` 값을 사용할 수 있어요.

```javascript
if (process.env.NODE_ENV === 'development') {
  console.log('개발 중입니다!');
}
```

위 코드는 `NODE_ENV` 값이 'development'일 때만 실행돼요. 이런 방식으로 로그를 숨기거나, 테스트 코드를 조건부로 실행할 수 있어요.

---

플러그인은 다양한 작업을 자동화하고, 웹팩을 더 강력하게 만들어 줘요. 아래는 자주 사용하는 플러그인 요약이에요.

| 목적 | 플러그인 |
|------|----------|
| HTML 파일 자동 생성 | `HtmlWebpackPlugin` |
| CSS 파일 분리 | `MiniCssExtractPlugin` |
| dist 폴더 정리 | `CleanWebpackPlugin` 또는 `output.clean: true` |
| 환경 변수 설정 | `DefinePlugin` 또는 `dotenv-webpack` |
| 코드 압축 | `TerserWebpackPlugin`, `CssMinimizerPlugin` 등 |

웹팩 플러그인을 사용하면 번들링 결과를 더 효율적으로 만들 수 있어요. 코드 최적화, 파일 정리, 환경 설정, 자동화 등 다양한 작업을 설정 한 번으로 처리할 수 있어서 개발 속도와 유지보수 품질을 동시에 높일 수 있어요.

다음 단계에서는 React 프로젝트에서 웹팩을 설정하는 방법을 배워볼게요.