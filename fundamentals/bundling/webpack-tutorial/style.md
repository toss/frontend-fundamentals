# 스타일 관리하기

이번 단계에서는 '오늘의 이모지' 프로젝트의 스타일을 웹팩으로 관리하는 방법을 배워볼게요. 웹팩의 로더를 사용하면 CSS 파일도 JavaScript 모듈처럼 import해서 사용할 수 있어요.

## CSS를 모듈처럼 사용하기

기존에는 HTML 파일에서 `<link>` 태그로 CSS를 불러왔어요. 하지만 웹팩을 사용하면 JavaScript에서 CSS를 import할 수 있어요. 이렇게 하면 CSS도 모듈처럼 관리할 수 있고, 필요한 스타일만 번들에 포함시킬 수 있어요.

```javascript
// CSS를 import하면 웹팩이 알아서 처리해요
import "./style.css";
```

## 1. CSS 로더 설치하기

웹팩이 CSS를 처리할 수 있도록 필요한 로더들을 설치해볼게요.

```bash
npm install --save-dev style-loader css-loader
```

- `css-loader`: CSS 파일을 JavaScript에서 import할 수 있는 형태로 바꿔줘요.
- `style-loader`: 변환된 CSS를 브라우저 실행 시 `<style>` 태그로 만들어 동적으로 삽입해요.

## 2. 웹팩에 CSS 로더 설정 추가하기

`webpack.config.js` 파일에 CSS를 처리하는 로더를 추가해요:

```js{6-12}
module.exports = {
  // ... 기존 설정 유지
  module: {
    rules: [
      // ... 기존 rules 유지
      {
        test: /\.css$/, // .css 파일을 처리해요
        use: [
          'style-loader', // CSS를 <style> 태그로 주입해요
          'css-loader' // CSS를 JavaScript 모듈로 변환해요
        ]
      }
    ]
  }
};
```

로더는 배열의 뒤에서부터 앞으로 순서대로 실행돼요. 즉, `css-loader`가 먼저 실행되고, 그 다음 `style-loader`가 실행되는 거예요.

## 3. 스타일 파일을 HTML에서 JavaScript 파일로 옮기기

먼저 `index.html` 에서 `style link 태그`를 지워주세요.

```html{8-9}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Emoji of the Day</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap" rel="stylesheet">
  <!-- HTML에 넣었던 style을 지워주세요 -->
  <!-- <link rel="stylesheet" href="./style.css"> -->
</head>
<!-- 동일 -->
</html>
```

`App.tsx` 에 `style.css` 파일을 import 해주세요.

```jsx{4-4}
import React from 'react';
import { emojis } from './emoji';
import { format } from 'date-fns';
import './style.css';

// 동일
```

## 4. 빌드하기

이제 코드를 빌드해볼게요.

```bash
npm run build
```

브라우저에서 `index.html`을 열어보면, HTML 안에 스타일이 직접 보이지 않더라도 페이지에는 CSS가 잘 적용된 걸 확인할 수 있어요.

![](/images/style-less.png)

## 다음 단계

이제 우리 프로젝트의 스타일을 웹팩으로 관리할 수 있게 되었어요. CSS를 모듈처럼 사용하고, 전처리기를 활용하면 더 효율적인 스타일 관리가 가능할 거예요.

다음 단계에서는 이미지와 폰트 같은 정적 자원을 웹팩으로 관리하는 방법을 배워볼게요. 웹팩의 Asset Modules를 사용하면 이런 파일들도 모듈처럼 import해서 사용할 수 있답니다.
