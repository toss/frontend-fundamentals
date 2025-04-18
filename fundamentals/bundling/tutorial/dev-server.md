# 개발 서버로 생산성 높이기

지금까지는 코드를 수정할 때마다 `npm run build`를 실행하고, `dist/index.html` 파일을 브라우저에서 새로 열어야 했어요. 이런 방식은 반복 작업이 많고 개발 속도도 느려져요.

[웹팩 개발 서버(`webpack-dev-server`)](../reference/dev/dev-server.html)를 사용하면 이런 번거로운 과정을 자동화할 수 있어요. 코드를 수정하면 브라우저가 자동으로 새로고침되고, 결과도 바로 확인할 수 있어요.

## 1. 개발 서버 설치하기

먼저 웹팩 개발 서버를 설치해요.

```bash
npm install webpack-dev-server --save-dev
```

이 도구는 개발 중에만 사용하는 도구이기 때문에 `--save-dev` 옵션으로 설치해요.

## 2. 웹팩 설정에 개발 서버 추가하기

이제 `webpack.config.js` 파일을 열고 개발 서버 설정을 추가해요.

```javascript{15-23}
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true,  // 빌드할 때 dist 폴더를 자동으로 정리해요
  },
  mode: 'development',

  // 개발 서버 설정
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),  // 정적 파일 경로
    },
    open: true,   // 서버 시작 시 브라우저 자동 열기
    port: 9000,   // 사용할 포트 번호
    hot: true,    // 핫 모듈 교체(HMR) 활성화
  },

  // 소스맵 설정
  devtool: 'eval-source-map',  // 빠른 빌드를 위한 개발용 소스맵

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: '웹팩 튜토리얼',
    }),
  ],
};
```

- `static.directory`: HTML과 에셋 파일이 위치한 폴더를 지정해요.
- `open`: 개발 서버를 실행할 때 브라우저를 자동으로 열어요.
- `port`: 서버가 실행될 포트를 지정해요. (예: `http://localhost:9000`)
- `hot`: HMR을 설정해서 변경된 부분만 즉시 반영해요.
- `devtool`: 소스맵을 설정해서 브라우저 개발자 도구에서 원본 코드를 확인할 수 있어요.

## 3. 개발 서버 실행 스크립트 추가하기

이제 `package.json`에 개발 서버를 실행하는 스크립트를 추가해요.

```json
{
  "scripts": {
    "build": "webpack",
    "start": "webpack serve"
  }
}
```

## 4. 개발 서버 실행하기

이제 다음 명령어로 개발 서버를 실행할 수 있어요.

```bash
npm start
```

브라우저가 자동으로 열리고, `http://localhost:9000`에서 애플리케이션이 실행돼요. 코드를 수정하면 브라우저가 자동으로 새로고침돼서 결과를 바로 볼 수 있어요.

## 5. HMR(Hot Module Reload)로 더 빠르게 개발하기

[HMR](../reference/dev/hmr.md)은 전체 페이지를 새로고침하지 않고, 수정된 모듈만 다시 불러오는 기능이에요. CSS는 기본적으로 적용되지만, JavaScript 파일에는 직접 설정이 필요해요.

`src/index.js` 파일에 아래처럼 HMR 코드를 추가해 볼게요.

```javascript{27-35}
// src/index.js
import { getMessage } from './message';
import './style.css';
import LogoImage from './images/logo.png';

function component() {
  const element = document.createElement('div');
  element.textContent = getMessage();
  element.classList.add('message');

  const logo = new Image();
  logo.src = LogoImage;
  logo.alt = 'Logo';
  logo.width = 200;

  const container = document.createElement('div');
  container.appendChild(logo);
  container.appendChild(element);

  return container;
}

// 초기 렌더링
let element = component();
document.body.appendChild(element);

// HMR 활성화 설정
if (module.hot) {
  module.hot.accept('./message', () => {
    console.log('message.js 업데이트됨!');
    document.body.removeChild(element);
    element = component();
    document.body.appendChild(element);
  });
}
```

이제 `message.js` 파일을 수정하면 페이지 전체가 새로고침되지 않고, **변경된 메시지만 빠르게 반영돼요.** 이 기능은 개발할 때 매우 편리해요.

예를 들면 입력 폼 상태가 유지되게 하고, 스크롤 위치가 초기화되지 않아요. 이제 코드 수정 결과를 더 빠르게 확인할 수 있어요.

웹팩 개발 서버를 사용하면 개발 효율이 훨씬 높아져요. 이제는 매번 빌드하고 브라우저를 열 필요 없이, 저장만 하면 자동으로 확인할 수 있어요. 더 자세한 설명은 [개발 서버](../reference/dev/dev-server.md)에서 확인할 수 있어요.

