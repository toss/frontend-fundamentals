# 이미지 등 정적 자원 다루기

웹사이트를 만들다 보면 이미지, 아이콘, 폰트 같은 파일들을 자주 사용하게 돼요. 이런 파일은 JavaScript나 CSS처럼 코드로 변환하지 않고 '그대로' 브라우저에서 사용되는 파일이에요. 그래서 보통 '정적 자원'이라고 불러요.

이번 단계에서는 '오늘의 이모지' 프로젝트의 이미지와 폰트 같은 정적 자원을 웹팩으로 관리하는 방법을 배워볼게요. 웹팩의 `Asset Modules`를 사용하면 이런 파일들도 JavaScript 모듈처럼 import해서 사용할 수 있어요.

## Asset Modules란

예전에는 이미지나 폰트 같은 정적 자원을 웹팩에서 처리하기 위해 `file-loader`, `url-loader`, `raw-loader` 같은 별도 로더를 설치했어요.

하지만 웹팩 5부터는 이런 작업을 훨씬 쉽게 해주는 기능인 `Asset Modules`가 내장되었어요. 이제는 따로 로더를 설치하지 않아도 웹팩이 이미지, 폰트, 아이콘 같은 파일을 자동으로 처리하고, 필요하면 압축하거나 base64 형태로 변환해서 JavaScript 코드 안에 바로 포함시켜 주기도 해요.

## 웹팩에 Asset Modules 설정 추가하기

`webpack.config.js` 파일을 수정해주세요.

```js
module.exports = {
  // ... 기존 설정 유지
  module: {
    rules: [
      // ... 기존 rules 유지
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // 이미지 파일 확장자
        type: "asset" // Asset Modules 사용
      }
    ]
  }
};
```

::: details Q: Asset Modules의 `type` 옵션은 뭔가요?

- `asset/resource`: 파일을 별도 파일로 내보내고 URL을 반환해요.
- `asset/inline`: 파일을 base64로 인코딩된 data URL로 변환해요.
- `asset/source`: 파일의 내용을 문자열로 변환해요.
- `asset`: 파일 크기에 따라 자동으로 `asset/resource`와 `asset/inline` 중 하나를 선택해요.
  :::

## 이미지 파일 JS에서 import하기

`App.tsx`에서 logo 파일을 import하고 로고 이미지 태그 `src`에 넣어주세요.

```tsx
// logo.svg 를 import로 가져옴 (타입에러는 일단 무시해주세요)
import logo from "./assets/logo.svg";

// 가져온 logo 모듈을 src에 넣어줌
<img src={logo} alt="Logo" className="logo"></img>;
```

코드를 빌드하고 브라우저에서 로고 이미지가 잘 보이는지 확인해 주세요.

```bash
npm run build
```

## CSS에서 이미지와 폰트 사용하기

폰트 파일도 같은 방식으로 사용할 수 있어요. 먼저 `index.html`에서 폰트 파일을 지워주세요.

```html{7-8}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Emoji of the Day</title>
  <!-- HTML에 넣었던 폰트 파일 링크를 지워주세요 -->
  <!-- <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap" rel="stylesheet"> -->
</head>
<body>
  <div id="root"></div>
  <script src="./dist/bundle.js"></script>
</body>
</html>
```

`webpack.config.js`에 폰트 파일 처리를 추가할게요.

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // 폰트 파일 확장자
        type: "asset/resource", // 폰트는 항상 별도 파일로 내보내요
        generator: {
          filename: "assets/[name][ext]" // 원하는 폴더와 이름 형태로 설정
        }
      }
    ]
  }
};
```

이제 css 파일에서 폰트 파일을 직접 접근할 수 있어요.

```css
/* style.css */
@font-face {
  font-family: "Inter";
  src: url("./assets/Inter-Regular.woff2") format("woff2");
}

body {
  font-family: "Inter", sans-serif;
}
```

:::details Q. 왜 폰트는 별도 파일로 내보내는게 좋나요?

폰트는 이미지보다 훨씬 용량이 크고, 자주 바뀌지 않는 정적 자원이에요. 그래서 다음과 같은 이유로 항상 `asset/resource`처럼 별도 파일로 내보내는 것이 좋아요.

- **성능**: JavaScript에 inline하면 번들 크기가 커져서 초기 로딩 속도가 느려져요.
- **렌더링 시점 제어**: 브라우저는 외부 폰트를 병렬로 다운로드하고 캐시할 수 있지만, 폰트를 JavaScript 코드 안에 base64로 포함하면, HTML이 파싱되고 JavaScript가 실행된 뒤에야 폰트를 사용할 수 있어요.
- **캐싱 효율**: 번들에 포함되면 JS가 바뀔 때마다 다시 다운로드되지만, 외부 폰트 파일은 변경되지 않으면 브라우저가 캐시를 재사용할 수 있어요.
  :::

## 다음 단계

이제 웹팩이 이미지나 폰트 같은 정적 자원을 처리해주기 때문에, 파일을 직접 복사하거나 상대 경로를 일일이 관리할 필요가 거의 없어졌어요.

다음 단계에서는 HTML과 CSS 파일을 좀 더 똑똑하게 관리해주는 **웹팩 플러그인**을 배워볼 거예요.
