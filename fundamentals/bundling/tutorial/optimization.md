# 운영 환경을 위한 최적화

개발할 땐 빠르게 빌드하고 바로 결과를 확인하는 게 중요하지만, 운영 환경에서는 성능과 최적화가 훨씬 더 중요해요. 그래서 운영용 빌드에서는 다음과 같은 작업이 필요해요.

- JavaScript와 CSS 압축
- 코드 분할 (필요한 코드만 불러오기)
- 캐시를 위한 파일 이름 해시
- 사용하지 않는 코드 제거 (Tree shaking)

이런 작업들을 웹팩으로 설정하려면, 개발용과 운영용 설정을 나눠서 관리하는 게 훨씬 편해요.

## 1. 웹팩 설정 분리하기

설정을 나누면 목적에 따라 관리가 쉬워지고, 실수도 줄어들어요. 보통 다음과 같은 3개의 설정 파일로 나눠요.

| 파일 이름 | 설명 |
|-----------|------|
| `webpack.common.js` | 공통 설정 (입력, 출력, 로더 등) |
| `webpack.dev.js`    | 개발 환경 전용 설정 (소스맵, devServer 등) |
| `webpack.prod.js`   | 운영 환경 전용 설정 (압축, 분할, 해시 등) |

### 공통 설정: `webpack.common.js`

이 파일은 개발이든 운영이든 **공통으로 사용하는 설정**을 담아요. 입력 파일, 출력 위치, 로더, HTML 템플릿 등을 여기서 설정해요.

```js{4,5,6,13,18,27}
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash].js',  // 파일 이름에 해시를 붙여 캐싱 문제 방지
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[hash][ext][query]', // 이미지 등 에셋 파일 이름 설정
    clean: true,  // 빌드할 때 dist 폴더를 먼저 비워요
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,       // JavaScript와 JSX 파일 처리
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,            // CSS 처리
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,  // 이미지 처리
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // 폰트 파일 처리
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // 확장자 생략 가능
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React + 웹팩',
      template: './src/template.html',
    }),
  ],
};
```

### 개발 전용 설정: `webpack.dev.js`

개발할 때는 빠른 빌드와 디버깅을 위해 소스맵과 개발 서버 설정이 필요해요.

```js{4,8,12,17}
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',  // 빠른 빌드를 위한 소스맵
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    open: true,  // 서버 시작 시 브라우저 자동 열기
    port: 9000,
    hot: true,   // HMR(핫 모듈 교체) 활성화
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.API_URL': JSON.stringify('http://localhost:3000/api'),
    }),
  ],
});
```

`DefinePlugin`은 코드 안에서 `process.env.NODE_ENV` 같은 변수를 사용할 수 있게 만들어줘요.

### 운영 전용 설정: `webpack.prod.js`

운영 환경에서는 성능을 높이기 위해 **압축, 코드 분할, 캐시 최적화** 등이 필요해요.

```js{11,12,18,22,30,36}
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',  // 운영용 디버깅을 위한 소스맵 (크기 작음)
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],  // CSS를 별도 파일로 추출
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css', // 캐싱을 위한 해시 포함
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.API_URL': JSON.stringify('https://api.example.com'),
    }),
  ],
  optimization: {
    minimize: true,  // 코드 압축
    minimizer: [
      new TerserPlugin(),         // JavaScript 압축
      new CssMinimizerPlugin(),   // CSS 압축
    ],
    splitChunks: {
      chunks: 'all',              // 코드 분할
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/, // 외부 라이브러리 분리
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
});
```

## 2. 스크립트 등록

이제 개발과 운영 빌드를 따로 실행할 수 있도록 `package.json`의 `scripts` 항목을 수정해요.

```json{3,4}
{
  "scripts": {
    "start": "webpack serve --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js"
  }
}
```

- `npm start`: 개발 서버를 실행해요.
- `npm run build`: 운영용으로 최적화된 빌드를 실행해요.

## 3. 환경 변수 관리: dotenv-webpack 사용

환경 변수를 `.env` 파일에 따로 관리하면 더 깔끔하고 안전해요. `dotenv-webpack` 플러그인을 사용하면 `.env` 파일 내용을 웹팩에서 자동으로 불러올 수 있어요.

다음과 같이 설치할 수 있어요.

```bash
npm install dotenv-webpack --save-dev
```

`.env.development`, `.env.production` 파일은 각각 다음과 같아요.

```bash
# .env.development
API_URL=http://localhost:3000/api
```

```bash
# .env.production
API_URL=https://api.example.com
```

웹팩 설정에는 다음과 같은 설정을 추가해요.

```js{4,9}
const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
  mode: 'development', // 또는 production
  plugins: [
    new Dotenv({
      path: './.env.development',  // 또는 .env.production
    }),
  ],
});
```

이제 코드 안에서는 이렇게 사용할 수 있어요.

```js{3}
const API_URL = process.env.API_URL;

fetch(`${API_URL}/data`);
```

웹팩 설정을 이렇게 개발과 운영 환경으로 나누면 훨씬 더 관리하기 쉽고, 성능도 좋아지고, 실수도 줄일 수 있어요.
운영용 빌드를 할 때는 코드도 압축되고, 필요한 파일만 나눠서 로드되며, 캐싱까지 고려된 결과물이 만들어져요. 🚀


