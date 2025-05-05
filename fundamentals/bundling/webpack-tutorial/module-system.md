# 웹팩과 모듈 시스템으로 코드 구조화하기

이번 단계에서는 앞서 만든 '오늘의 이모지' 프로젝트의 코드를 모듈 시스템을 사용해 더 효율적으로 구조화하고, 웹팩으로 번들링하는 방법을 배워봐요.

## 모듈 시스템이란?

모듈 시스템은 코드를 여러 개의 작은 파일(모듈)로 나누고, 각 모듈에서 필요한 부분만 가져와 사용할 수 있게 해주는 방식이에요. 이런 접근 방식은 다음과 같은 장점이 있어요:

- **코드 재사용성**: 같은 기능을 여러 곳에서 반복 작성할 필요 없이 모듈로 분리해 재사용할 수 있어요.
- **유지보수성**: 작은 단위로 코드를 관리하면 문제가 생겼을 때 해당 모듈만 수정하면 돼요.
- **캡슐화**: 모듈 내부 변수와 함수가 전역 스코프를 오염시키지 않아요.
- **의존성 관리**: 각 모듈이 어떤 다른 모듈에 의존하는지 명시적으로 선언할 수 있어요.

## 웹팩이 모듈 시스템을 다루는 방식

최신 브라우저는 ES 모듈을 기본적으로 지원해요. `<script type="module">` 태그를 사용하면 import/export 구문을 직접 사용할 수 있죠. 
다만 다음과 같은 문제가 생길 수 있어요

1. **여러 네트워크 요청**: 모듈이 10개라면 브라우저는 10번의 요청을 보내야 해요. 이런 요청이 많아질수록 페이지 로딩 속도가 느려져요.
2. **호환성 문제**: 오래된 브라우저는 ES 모듈을 지원하지 않아요.
3. **최적화 부재**: 사용하지 않는 코드를 자동으로 제거해주진 않아요.

이럴 때 웹팩이 등장합니다. 웹팩은 모든 모듈을 분석해 하나의 파일(또는 원하는 수의 파일)로 묶어줍니다. 이 과정에서

- **의존성 관리**: 모듈 간의 복잡한 의존성을 자동으로 해결해요.
- **코드 변환**: TypeScript나 최신 JavaScript를 모든 브라우저에서 작동하는 코드로 변환해요.
- **최적화**: 사용하지 않는 코드를 제거하고(트리 쉐이킹), 코드를 압축해 파일 크기를 줄여요.

쉽게 말해, 웹팩은 **우리가 편하게 모듈 시스템을 사용할 수 있게 하면서도, 최종 사용자에게는 최적화된 파일을 제공할 수 있게 도와주는 도구**예요.


## 기존 코드의 문제점

현재 우리 프로젝트는 다음과 같은 문제가 있어요:

1. **전역 변수 사용**: `emoji.js`에서 정의한 `emojis` 변수는 전역 스코프에 노출되어 있어요.
2. **불명확한 의존성**: `main.js`가 `emoji.js`에 의존하고 있지만, 코드상으로 명시적이지 않아요.
3. **CDN 의존성**: date-fns 라이브러리를 CDN으로 불러오고 있어 오프라인 개발이 어렵고, 버전 관리가 불편해요.

:::details 전역 스코프 노출은 왜 문제가 될까요?
- **이름 충돌**: 다른 스크립트나 라이브러리가 같은 이름을 사용하면 덮어쓰기가 발생해요
- **의도치 않은 수정**: 코드 어디에서나 변수를 수정할 수 있어 디버깅이 어려워져요
- **의존성 불명확**: 어떤 코드가 어떤 데이터에 의존하는지 추적하기 어려워요

모듈 시스템을 사용하면 이런 문제를 피하고 더 견고한 코드를 작성할 수 있어요.
:::

이제 이 문제들을 모듈 시스템을 도입해 해결해볼게요.

## JS 파일을 모듈로 변환하기

### emoji.js 모듈화하기

기존의 `emoji.js` 파일을 모듈로 변환해봐요. 전역 변수 대신 `export`를 사용해 내보내주세요.

```javascript{1-1}
export const emojis = [
  { icon: '😊', name: 'Smiling Face' },
  { icon: '🚀', name: 'Rocket' },
  { icon: '🍕', name: 'Pizza' },
  { icon: '🐱', name: 'Cat' },
  { icon: '🌈', name: 'Rainbow' },
  { icon: '🎸', name: 'Guitar' }
];
```

이렇게 하면 `emojis` 배열은 더 이상 전역 스코프에 노출되지 않고, 이 모듈을 가져오는 파일에서만 사용할 수 있어요.



### main.js 모듈화하기

이제 `main.js` 파일도 모듈 시스템을 사용하도록 수정할게요:

```javascript
// emoji.js에서 필요한 것만 가져와요
import { getRandomEmoji } from './emoji.js';


document.addEventListener("DOMContentLoaded", function() {
  const today = new Date();
  // date-fns는 아직  CDN을 통해 불러오고 있어서 여기서는 직접 import하지 않아요. 곧 이 부분도 수정할 거예요!
  const formattedDate = dateFns.format(today, "MMMM d, yyyy");
  document.getElementById("dateDisplay").textContent = formattedDate;
  
  updateEmoji();
});

function showRandomEmoji() {
  const randomIndex = Math.floor(Math.random() * emojis.length);
  const selectedEmoji = emojis[randomIndex];
  
  document.getElementById('emojiDisplay').textContent = selectedEmoji.icon;
  document.getElementById('emojiName').textContent = selectedEmoji.name;
}
```

## 번들을 사용하기 위해 HTML 파일 수정하기

먼저 수정사항을 반영하기 위해 번들링을 해주세요.

```bash
$ npm run build
```

이제 HTML 파일에서 더 이상 `emoji.js`, `main.js`를 로드할 필요가 없어요. `index.html` 파일을 다음과 같이 수정해주세요:

```html{21-26}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Emoji of the Day</title>
  <link rel="stylesheet" href="./style.css">
  <script src="https://cdn.jsdelivr.net/npm/date-fns@3.6.0/cdn.min.js"></script>
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

  <!-- 개별 스크립트는 더 이상 필요 없어요 -->
  <!-- <script src="./emoji.js"></script> -->
  <!-- <script src="./main.js"></script> -->
  
  <!-- 번들링된 스크립트만 사용해요 -->
  <script src="./dist/bundle.js"></script>
</body>
</html>
```

이제 브라우저에서 `index.html` 파일을 열어보고, 이전과 동일하게 작동하는지 확인해보세요!



## date-fns 라이브러리를 모듈로 설치하기

이제 CDN으로 불러오던 date-fns 라이브러리를 npm으로 설치하고 모듈로 사용해볼게요.

```bash
$ npm install date-fns
```

이제 `main.js` 파일을 다시 수정해서 date-fns를 import로 가져오도록 바꿔봐요:

```javascript{2-2,6-7}
import { emojis } from './emoji.js';
import { format } from 'date-fns'; // date-fns에서 format 함수만 가져와요

document.addEventListener('DOMContentLoaded', function() {
  const today = new Date();
  // date-fns 모듈에서 가져온 format 함수를 호출해요
  const formattedDate = format(today, 'MMMM d, yyyy');
  document.getElementById('dateDisplay').textContent = formattedDate;
  
  showRandomEmoji();
});
// ...기존과 동일
```

## HTML 파일에서 cdn 로드 삭제하기

수정사항을 반영하기 위해 다시 번들링을 해주세요.

```bash
$ npm run build
```
`/dist/bundle.js` 파일을 열어서 `date-fns`를 검색해 우리 번들에 잘 포함된걸 확인해보세요.
```
// 이런 방식으로 포함되었다면 번들링 성공
/***/ "./node_modules/date-fns/_lib/addLeadingZeros.js":
```

이제 HTML 파일에서 더 이상 `date-fns` cdn을 로드할 필요가 없어요. `index.html` 파일을 다음과 같이 수정해주세요:

```html{8-9}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Emoji of the Day</title>
  <link rel="stylesheet" href="./style.css">
  <!-- cdn 스크립트도 더 이상 필요 없어요 -->
  <!-- <script src="https://cdn.jsdelivr.net/npm/date-fns@3.6.0/cdn.min.js"></script> -->
</head>
<body>
  <!-- 기존과 동일 -->
</body>
</html>
```

이제 브라우저에서 `index.html` 파일을 열어보고, 이전과 동일하게 작동하는지 확인해보세요.

그리고 개발자 도구의 네트워크 탭을 열어 요청 개수를 확인해보세요. 번들링이 제대로 되었다면 여러 모듈이 하나의 bundle.js 파일로 합쳐져 네트워크 요청 횟수가 줄어든 것을 확인할 수 있어요 👏

![](/images/network-minified.png)

네트워크 요청 감소 뿐 아니라, 기존 CDN 방식에서는 date-fns 라이브러리 전체를 불러왔지만, 웹팩의 모듈 시스템에서는 우리가 실제로 사용하는 `format` 함수만 번들에 포함시키고 불필요한 코드는 제거해 성능이 더 좋아졌어요. 이 기능은 '트리 쉐이킹'이라고 불러요. 나무를 흔들어 죽은 잎을 털어내듯, 사용하지 않는 코드를 털어내는거죠.


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

이제 모듈 시스템을 도입하고 웹팩으로 번들링하여 코드를 더 효율적으로 구조화했어요. 웹팩과 모듈 시스템의 조합은 현대 프론트엔드 개발의 필수 요소가 되었죠. 

다음 단계에서는 TypeScript를 적용해 코드의 타입 안전성을 높이는 방법을 배워볼게요. 웹팩은 다양한 파일 형식을 처리할 수 있는 기능을 갖고 있어 TypeScript 파일도 쉽게 처리할 수 있답니다. 

곧 배우게 될 웹팩의 '로더' 기능을 통해 TypeScript 코드를 일반 JavaScript로 변환하는 과정을 자동화할 수 있을 거예요.
