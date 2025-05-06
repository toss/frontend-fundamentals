# 플러그인으로 빌드 확장하기

이번에는 ‘오늘의 이모지’ 프로젝트에 웹팩 플러그인을 적용해볼 거예요.  
HTML, CSS, 정적 자원 같은 요소들을 더 편리하게 다루고, 빌드도 깔끔하게 정리할 수 있도록 말이죠.

## 플러그인

우리는 지금까지 필요한 파일을 변환할 때 '로더'를 사용했어요. 이에 반면 프로젝트 전체 빌드 흐름을 조금 더 유연하게 제어하고 싶을 땐 '플러그인'이 필요해요.

예를 들면,

- 빌드할 때마다 `index.html`을 새로 만들어야 한다면?
- CSS를 자바스크립트랑 분리해서 따로 관리하고 싶다면?
- dist 폴더에 쌓인 오래된 파일들을 지우고 싶다면?
- public 폴더 안의 이미지나 폰트를 그대로 복사하고 싶다면?

이런 작업들을 자동으로 처리해주는 게 바로 웹팩 플러그인이에요.

## HTML 자동 생성: HtmlWebpackPlugin

지금까지는 우리가 만든 `index.html`에 우리가 빌드한 `<script src="./dist/bundle.js">`경로를 직접 넣어서 자바스크립트 번들을 불러왔어요.  
이 방식도 괜찮지만, 나중에 프로젝트가 커지고 파일 이름이 바뀌거나 CSS가 추가되면 매번 HTML을 직접 고쳐야 할 수도 있어요.

이럴 때 유용한 게 `HtmlWebpackPlugin`이에요. HTML 파일을 템플릿으로 등록해두면, 웹팩이 알아서 필요한 자바스크립트와 CSS 파일을 자동으로 삽입해줘요.  

먼저 플러그인을 설치해볼게요.

```bash
$ npm install --save-dev html-webpack-plugin
```

`webpack.config.js` 에 플러그인 설정을 추가해주세요.

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // ...기존과 동일
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // 템플릿 HTML
      filename: 'index.html',   // 출력될 HTML 파일 이름
      inject: true              // <script> 태그 자동 삽입
    })
  ]
};
```

이제 index.html에서 `<script>` 태그는 지워도 돼요. 웹팩이 알아서 넣어줄 거예요.

```html{10-10}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Emoji of the Day</title>
</head>
<body>
  <div id="root"></div>
  <!-- <script src="./dist/bundle.js"></script> -->
</body>
</html>
```

## 빌드하기

이제 코드를 빌드해볼게요.

```bash
npm run build
```

기존과는 다르게, dist 폴더에 `index.html` 파일이 생긴걸 확인할 수 있어요.
```
dist/
├── assets/
│   └── Inter-Regular.woff2
├── bundle.js
└── index.html
```

`/dist/index.html`파일을 열어보면 `bundle.js` 스크립트가 추가된걸 확인할 수 있어요. 이제는 이 파일을 브라우저에서 열어서 테스트해주세요.
```html{7-7}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Emoji of the Day</title>
<script defer src="bundle.js"></script></head>
<body>
  <div id="root"></div>
</body>
</html>
```

:::details script에 있는 defer가 뭔가요?
HTML 파싱을 멈추지 않고, 브라우저가 HTML을 모두 읽은 후 스크립트를 실행하라는 옵션이에요.

즉, DOM이 다 만들어진 뒤에 실행되게 보장하는 방식이라 리액트 앱처럼 `document.getElementById('root')` 같은 코드를 쓸 때 안정적이에요.
:::

## 다음 단계

다음 단계에서는 웹팩 개발 서버를 설정해서, 매번 새로고침하지 않고도 실시간으로 코드 변경을 반영하는 방법을 배워볼게요!