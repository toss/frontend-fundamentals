# 이미지와 폰트 등 정적 자원 다루기

이번 단계에서는 '오늘의 이모지' 프로젝트의 이미지와 폰트 같은 정적 자원을 웹팩으로 관리하는 방법을 배워볼게요. 웹팩의 Asset Modules를 사용하면 이런 파일들도 자바스크립트 모듈처럼 import해서 사용할 수 있어요.

## Asset Modules란?

웹팩 5부터는 `file-loader`, `url-loader`, `raw-loader` 같은 로더들이 내장된 Asset Modules로 대체되었어요. Asset Modules는 이미지, 폰트, 아이콘 등의 파일을 자동으로 처리해주는 기능이에요.

## 이미지 파일 사용하기

이미지 파일을 자바스크립트에서 import해서 사용할 수 있어요:

```tsx
// App.tsx
import logo from './assets/logo.svg';

const App: React.FC = () => {
  return (
    <div>
      <img src={logo} alt="로고" />
    </div>
  );
};
```

## 웹팩에 Asset Modules 설정 추가하기

`webpack.config.js` 파일에 Asset Modules 설정을 추가해요:

```js
module.exports = {
  // ... 기존 설정 유지
  module: {
    rules: [
      // ... 기존 rules 유지
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // 이미지 파일 확장자
        type: 'asset', // Asset Modules 사용
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // 8kb 미만은 base64로 변환
          }
        }
      }
    ]
  }
};
```

Asset Modules의 `type` 옵션은 다음과 같아요:
- `asset/resource`: 파일을 별도 파일로 내보내고 URL을 반환해요.
- `asset/inline`: 파일을 base64로 인코딩된 data URL로 변환해요.
- `asset/source`: 파일의 내용을 문자열로 변환해요.
- `asset`: 파일 크기에 따라 자동으로 `asset/resource`와 `asset/inline` 중 하나를 선택해요.

## 폰트 파일 사용하기

폰트 파일도 같은 방식으로 사용할 수 있어요:

```css
/* style.css */
@font-face {
  font-family: 'Inter';
  src: url('./assets/Inter-Regular.woff2') format('woff2');
}

body {
  font-family: 'Inter', sans-serif;
}
```

웹팩 설정에 폰트 파일 처리를 추가해요:

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // 폰트 파일 확장자
        type: 'asset/resource' // 폰트는 항상 별도 파일로 내보내요
      }
    ]
  }
};
```

## 👣 한 걸음 더: 이미지 최적화하기

웹팩으로 이미지를 최적화하는 방법도 알아볼게요. `image-minimizer-webpack-plugin`을 사용하면 빌드 시 이미지를 자동으로 압축할 수 있어요:

```bash
npm install --save-dev image-minimizer-webpack-plugin imagemin imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo
```

그리고 웹팩 설정에 추가해요:

```js
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
  // ... 기존 설정 유지
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['mozjpeg', { quality: 80 }],
              ['pngquant', { quality: [0.6, 0.8] }],
              ['svgo']
            ]
          }
        }
      })
    ]
  }
};
```

이렇게 설정하면 빌드 시 이미지가 자동으로 최적화돼요. 파일 크기가 줄어들어 웹사이트 로딩 속도가 빨라질 거예요.

## 정적 자원 관리 팁

프로젝트가 커지면 정적 자원도 체계적으로 관리해야 해요:

1. **폴더 구조**
   ```
   src/
   ├── assets/
   │   ├── images/
   │   │   ├── logo.svg
   │   │   └── icons/
   │   └── fonts/
   │       └── Inter-Regular.woff2
   └── components/
   ```

2. **이름 규칙**
   - 이미지: `feature-name.png`
   - 아이콘: `icon-name.svg`
   - 폰트: `font-name-weight.woff2`

3. **최적화**
   - SVG는 가능한 인라인으로 사용해요
   - 작은 이미지는 base64로 변환해요
   - 큰 이미지는 별도 파일로 내보내요

## 다음 단계

이제 우리 프로젝트의 정적 자원을 웹팩으로 관리할 수 있게 되었어요. 이미지와 폰트를 모듈처럼 사용하고, 최적화까지 할 수 있게 되었죠.

다음 단계에서는 웹팩 플러그인을 사용해서 빌드 과정을 더 효율적으로 만드는 방법을 배워볼 거예요. HtmlWebpackPlugin과 MiniCssExtractPlugin을 사용하면 HTML과 CSS를 자동으로 처리할 수 있답니다.
