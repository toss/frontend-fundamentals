# 이미지와 폰트 다루기

웹사이트에서는 JavaScript와 CSS뿐 아니라 이미지, 폰트 같은 정적 자원도 많이 사용해요. 이런 파일들도 로더를 이용해 모듈처럼 불러와서 사용할 수 있어요.

## 이미지와 폰트를 웹팩에서 다루는 방법

이미지, 폰트같은 정적 자원도 [CSS 파일을 로드하는 예시](./css.md)처럼 JavaScript에서 import해서 사용할 수 있어요.

```typescript
import LogoImage from './images/LogoImage.png';

export function Image() {
  return <img src={LogoImage} alt="로고" />
}
```

이미지같이 정적 파일을 import했을 때 일어날 동작은 웹팩의 [Asset Modules](https://webpack.js.org/guides/asset-modules/) 로더로 정의할 수 있어요.

Asset Modules를 사용하면, 웹팩은 정적 자원을 자원이 있는 위치를 가리키는 JavaScript 문자열로 변환해요.
그래서 `<img />` 태그의 `src` 값을 그대로 제공해도 되죠.

```typescript
export default `{로고 이미지가 있는 위치}`;
```

## 1. 웹팩 설정에 애셋 처리 규칙 추가하기

이제 `webpack.config.js` 파일에 이미지와 폰트 파일을 처리하는 규칙을 추가해 볼게요.

`type: 'asset/resource'`는 해당 파일을 번들에 포함하지 않고, 복사만 한 뒤 [파일 경로(URL)](../deep-dive/bundling-process/resolution.html#파일시스템-경로)를 반환해 줘요. JavaScript나 CSS에서 이 경로를 사용할 수 있어요.

```javascript{18-25}
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[hash][ext][query]', // 에셋 파일의 출력 경로 형식
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,  // 이미지 확장자
        type: 'asset/resource',              // 파일 복사 + 경로 반환
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // 폰트 확장자
        type: 'asset/resource',
      },
    ],
  },
};
```

## 2. 이미지 파일 사용하기

먼저 `src/images` 폴더를 만들고 `logo.png` 같은 이미지를 넣어요. 이제 JavaScript 파일에서 이 이미지를 `import` 구문으로 불러올 수 있어요.

`LogoImage`에는 웹팩이 생성한 실제 이미지 파일 경로가 들어 있어요. 브라우저에서 직접 접근 가능한 경로예요.

```javascript{4}
// src/index.js
import { getMessage } from './message';
import './style.css';
import LogoImage from './images/logo.png';  // 이미지 파일을 불러와요

function component() {
  const element = document.createElement('div');
  element.textContent = getMessage();
  element.classList.add('message');

  const logo = new Image();
  logo.src = LogoImage;    // 불러온 이미지 경로를 src로 설정해요
  logo.alt = 'Logo';
  logo.width = 200;

  const container = document.createElement('div');
  container.appendChild(logo);
  container.appendChild(element);

  return container;
}

document.body.appendChild(component());
```

## 3. CSS에서 이미지와 폰트 사용하기

CSS에서도 이미지와 폰트를 바로 사용할 수 있어요. 웹팩은 CSS 파일 안에 있는 `url()` 경로도 분석해서 자동으로 처리해 줘요.

`src/style.css` 파일을 아래처럼 수정해 볼게요.

```css
/* src/style.css */
@font-face {
  font-family: "MyCustomFont";
  src: url("./fonts/custom-font.woff2") format("woff2");
  font-weight: 600;
  font-style: normal;
}

body {
  font-family: "MyCustomFont", "Arial", sans-serif;
  background-color: #f5f5f5;
}

.message {
  padding: 20px;
  background-color: #e9f7fe;
  border: 1px solid #b3e5fc;
  border-radius: 4px;
  color: #0288d1;
  margin: 20px;

  background-image: url("./images/icon.png");
  background-repeat: no-repeat;
  background-position: 10px center;
  padding-left: 40px;
}
```

폰트를 사용하려면 `src/fonts` 폴더를 만들고 `custom-font.woff2` 파일을 직접 넣어야 해요.

## 4. 빌드하고 결과 확인하기

이제 웹팩으로 다시 번들링해 볼게요.

```bash
npm run build
```

빌드가 완료되면 `dist/assets/` 폴더에 이미지와 폰트 파일이 복사되어 있고, JavaScript와 CSS에서는 이 파일들을 올바른 경로로 사용할 수 있어요.

브라우저에서 `dist/index.html` 파일을 열면, 이미지가 화면에 나타나고 폰트도 적용된 걸 볼 수 있어요.

이렇게 하면 **JavaScript, CSS 이미지, 폰트까지 모두 웹팩에서 자동으로 관리할 수 있는 개발 환경**이 완성된 거예요 🎉

::: info 웹팩 5부터는 Asset Modules를 사용해요

이전 웹팩 버전에서는 이미지나 폰트를 불러오기 위해 `file-loader`, `url-loader` 같은 로더를 설치해야 했어요. 하지만 **웹팩 5부터는 별도 로더 없이 내장 기능인 Asset Modules를 사용할 수 있어요.**

Asset Modules는 정적 파일을 자동으로 분석해서 적절하게 처리해 줘요. 파일을 복사해서 결과 폴더에 넣고, 파일 경로(URL)를 JavaScript 코드에서 사용할 수 있도록 해줘요.

:::
