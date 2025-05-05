# 모듈 시스템으로 코드 구조화하기

이번 단계에서는 앞서 만든 '오늘의 이모지' 프로젝트의 코드를 모듈 시스템을 사용해 더 효율적으로 구조화하는 방법을 배워봐요.

## 모듈 시스템이란?

모듈 시스템은 코드를 여러 파일로 나누고, 필요한 부분만 가져와 사용할 수 있게 해주는 방식이에요. 이를 통해 코드의 재사용성과 관리가 편해지고, 전역 스코프 오염 문제를 방지할 수 있어요.

자바스크립트에서는 ES 모듈(ESM), CommonJS 등 다양한 모듈 시스템이 있지만, 이번에는 현대 브라우저와 Node.js에서 모두 지원하는 ES 모듈을 사용해볼게요.

## 기존 코드의 문제점

현재 우리 프로젝트는 다음과 같은 문제가 있어요:

1. **전역 변수 사용**: `emoji.js`에서 정의한 `emojis` 변수는 전역 스코프에 노출되어 있어요.
2. **불명확한 의존성**: `main.js`가 `emoji.js`에 의존하고 있지만, 코드상으로 명시적이지 않아요.
3. **CDN 의존성**: date-fns 라이브러리를 CDN으로 불러오고 있어 오프라인 개발이 어렵고, 버전 관리가 불편해요.

이제 이 문제들을 모듈 시스템을 도입해 해결해볼게요.

## JS 파일을 모듈로 변환하기

### emoji.js 모듈화하기

기존의 `emoji.js` 파일을 모듈로 변환해봐요. 파일을 열고 다음과 같이 수정해주세요:

```javascript
// emoji.js
// 전역 변수 대신 export를 사용해 내보내요
export const emojis = [
  { icon: "😊", name: "웃는 얼굴" },
  { icon: "🚀", name: "로켓" },
  { icon: "🌈", name: "무지개" },
  { icon: "🎉", name: "파티" },
  { icon: "🍕", name: "피자" },
  { icon: "🌟", name: "별" },
  { icon: "🎵", name: "음표" },
  { icon: "🐱", name: "고양이" }
];

// 새로운 함수도 내보낼 수 있어요
export function getRandomEmoji() {
  const randomIndex = Math.floor(Math.random() * emojis.length);
  return emojis[randomIndex];
}
```

이렇게 하면 `emojis` 배열과 `getRandomEmoji` 함수는 더 이상 전역 스코프에 노출되지 않고, 이 모듈을 가져오는 파일에서만 사용할 수 있어요.

### main.js 모듈화하기

이제 `main.js` 파일도 모듈 시스템을 사용하도록 수정할게요:

```javascript
// main.js
// emoji.js에서 필요한 것만 가져와요
import { getRandomEmoji } from './emoji.js';

// 아직 date-fns는 CDN을 통해 불러오고 있어서 여기서는 직접 import하지 않아요
// 곧 이 부분도 수정할 거예요!

document.addEventListener("DOMContentLoaded", function() {
  // 현재 날짜 표시
  const today = new Date();
  const formattedDate = dateFns.format(today, "MMMM d, yyyy");
  document.getElementById("dateDisplay").textContent = formattedDate;
  
  // 랜덤 이모지 표시
  updateEmoji();
});

function updateEmoji() {
  // getRandomEmoji 함수를 사용해요
  const emoji = getRandomEmoji();
  document.getElementById("emojiDisplay").textContent = emoji.icon;
  document.getElementById("emojiName").textContent = emoji.name;
}
```

## date-fns 라이브러리를 모듈로 설치하기

이제 CDN으로 불러오던 date-fns 라이브러리를 npm으로 설치하고 모듈로 사용해볼게요.

```bash
$ npm install date-fns
```

이제 `main.js` 파일을 다시 수정해서 date-fns를 import로 가져오도록 바꿔봐요:

```javascript
// main.js
import { getRandomEmoji } from './emoji.js';
import { format } from 'date-fns'; // date-fns에서 format 함수만 가져와요

document.addEventListener("DOMContentLoaded", function() {
  // 현재 날짜 표시
  const today = new Date();
  const formattedDate = format(today, "MMMM d, yyyy");
  document.getElementById("dateDisplay").textContent = formattedDate;
  
  // 랜덤 이모지 표시
  updateEmoji();
});

function updateEmoji() {
  const emoji = getRandomEmoji();
  document.getElementById("emojiDisplay").textContent = emoji.icon;
  document.getElementById("emojiName").textContent = emoji.name;
}
```

## 웹팩 설정 업데이트하기

모듈 시스템으로 코드를 변경했으니, 이제 웹팩 설정도 업데이트해야 해요. `webpack.config.js` 파일을 다음과 같이 수정해주세요:

```javascript
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

설정은 이전과 같지만, 이제 웹팩이 import/export 구문을 이해하고 처리할 거예요.

## 모듈 번들링하기

이제 웹팩으로 모듈을 번들링해봐요:

```bash
$ npm run build
```

빌드가 완료되면 `dist/bundle.js` 파일이 생성돼요. 이 파일에는 우리가 작성한 코드뿐만 아니라 date-fns 라이브러리도 포함되어 있어요.

## HTML 파일 수정하기

이제 HTML 파일에서 더 이상 emoji.js와 date-fns CDN을 로드할 필요가 없어요. `index.html` 파일을 다음과 같이 수정해주세요:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Emoji of the Day</title>
  <link rel="stylesheet" href="./style.css">
  <!-- CDN 스크립트는 더 이상 필요 없어요 -->
  <!-- <script src="https://cdn.jsdelivr.net/npm/date-fns@3.6.0/cdn.min.js"></script> -->
</head>
<body>
  <div class="container">
    <img src="./assets/logo.svg" alt="Logo" class="logo">
    <h1>Emoji of the Day</h1>
    <div class="date-display" id="dateDisplay"></div>
    <div class="emoji-container">
      <div class="emoji" id="emojiDisplay">😊</div>
      <div class="emoji-name" id="emojiName">Today's Emoji</div>
    </div>
  </div>

  <!-- 개별 스크립트도 더 이상 필요 없어요 -->
  <!-- <script src="./emoji.js"></script> -->
  <!-- <script src="./main.js"></script> -->
  
  <!-- 번들링된 스크립트만 사용해요 -->
  <script src="./dist/bundle.js"></script>
</body>
</html>
```

이제 브라우저에서 `index.html` 파일을 열어보면, 이전과 동일하게 작동하는지 확인해보세요!

## 모듈 시스템의 장점

이렇게 모듈 시스템을 도입함으로써 다음과 같은 장점을 얻었어요:

1. **명확한 의존성**: 코드를 보면 어떤 파일이 어떤 모듈에 의존하는지 명확히 알 수 있어요.
2. **전역 스코프 보호**: 변수나 함수가 전역 스코프를 오염시키지 않아요.
3. **코드 재사용성**: 필요한 기능만 가져와 사용할 수 있어 코드 재사용이 쉬워져요.
4. **라이브러리 관리**: npm으로 라이브러리를 관리하면 버전 관리와 의존성 추적이 쉬워져요.
5. **트리 쉐이킹**: 웹팩은 사용하지 않는 코드를 제거해 번들 크기를 줄여줘요.

:::details 트리 쉐이킹이란?
트리 쉐이킹(Tree Shaking)은 사용하지 않는 코드를 제거하는 최적화 기법이에요. 예를 들어, 라이브러리에서 하나의 함수만 import 했다면, 나머지 함수들은 번들에 포함되지 않아요. 이렇게 하면 번들 크기가 작아져 웹 페이지 로딩 속도가 빨라져요.
:::

## 👣 한 걸음 더: 모듈 시스템 비교해보기 - ESM vs CommonJS

자바스크립트에는 여러 모듈 시스템이 있어요. 가장 많이 사용되는 두 가지는 ESM(ES Modules)과 CommonJS예요:

### ESM (ES Modules)
```javascript
// 내보내기
export const name = "값";
export default function() { ... }

// 가져오기
import { name } from './module.js';
import defaultFunction from './module.js';
```

### CommonJS (Node.js의 전통적인 모듈 시스템)
```javascript
// 내보내기
const name = "값";
function myFunction() { ... }
module.exports = { name, myFunction };

// 가져오기
const { name, myFunction } = require('./module.js');
```

웹팩은 두 가지 방식 모두 지원하지만, 최신 브라우저와의 호환성을 위해 ESM을 사용하는 것이 좋아요.

## 다음 단계

이제 모듈 시스템을 도입해 코드를 더 효율적으로 구조화했어요! 다음 단계에서는 TypeScript를 적용해 코드의 타입 안전성을 높이는 방법을 배워볼게요. TypeScript를 사용하면 개발 중에 많은 버그를 미리 발견할 수 있고, 코드를 더 명확하게 작성할 수 있어요.
