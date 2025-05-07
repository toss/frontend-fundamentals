# 모듈로 코드 구조화하기

이번 단계에서는 앞서 만든 '오늘의 이모지' 프로젝트의 코드를 모듈 시스템을 사용해 더 효율적으로 구조화하는 방법을 배워요.

## 모듈 시스템

하나의 파일에 모든 기능을 몰아넣으면 수정할 때도 어렵고, 협업도 불편해요. 그래서 우리는 코드를 작은 조각들(모듈)로 나눠서 필요한 부분만 가져다 쓰는 방식, 즉 **모듈 시스템**을 사용해요.

모듈 시스템을 사용하면 이런 점이 좋아요.

- **코드 재사용성**: 기능을 모듈로 쪼개놓으면 여러 곳에서 쉽게 다시 쓸 수 있어요.
- **유지보수성**: 어디에서 문제가 생겼는지 빠르게 찾고 고칠 수 있어요.
- **캡슐화**: 모듈 내부 코드가 전역 스코프를 어지럽히지 않아서 안전해요.
- **의존성 관리**: 각 파일이 어떤 모듈을 사용하는지 명확하게 알 수 있어요. 

## 웹팩으로 모듈 시스템 효율적으로 관리하기

요즘 브라우저는 `import`와 `export`를 지원해서 ES 모듈을 그대로 쓸 수도 있어요. 하지만 실무에서 이렇게 사용하기엔 다음과 같은 문제가 있어요.

1. **네트워크 요청이 많아져요**: 모듈이 여러 개로 나뉘면, 브라우저가 각 파일을 따로 요청해서 로딩 속도가 느려질 수 있어요.

2. **브라우저 호환성 문제**: 오래된 브라우저에서는 ES 모듈을 아예 지원하지 않아서, 코드가 실행되지 않을 수 이썽요.

3. **최적화가 부족해요**: 사용하지 않는 코드를 자동으로 제거하거나 압축하지 않기 때문에, 번들링 도구 없이 그대로 배포하면 비효율적인 코드가 포함될 수 있어요.

웹팩을 사용하면 위 문제를 해결하고 모듈 시스템을 효율적으로 관리할 수 있어요.

## 기존 코드의 문제점

지금 우리 프로젝트에는 몇 가지 구조적인 문제가 있어요.

1. **전역 변수 사용**: `emoji.js`의 변수가 전역에 노출되어 있어서, 다른 코드와 충돌할 수 있어요.

2. **불명확한 의존성**: `main.js`는 `emoji.js`에 의존하고 있지만 코드에 그 관계가 명시적으로 드러나지 않아요.

3. **CDN 의존성**:`date-fns`를 CDN으로 불러오고 있어서 오프라인 환경에서 개발이 어렵고 버전 관리도 힘들어요.

:::details 전역 스코프 노출은 왜 문제가 될까요?

- 이름 충돌: 다른 스크립트에서 같은 이름을 쓰면 기존 값을 덮어쓸 수 있어요.
- 의도치 않은 수정: 어디서든 접근할 수 있어서, 실수로 값이 바뀌기 쉬워요.
- 의존성 불명확: 이 값이 어떤 흐름에서 생성되고 사용하는지 파악하기가 어려워요.

:::

이 문제를 해결하기 위해 모듈 시스템을 적용해보도록 할게요.

## JS 파일을 모듈로 변환하기

### 1. emoji.js 모듈화하기

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

### 2. main.js 모듈화하기

이제 `main.js` 파일도 모듈 시스템을 사용하도록 수정할게요.

```javascript
// emoji.js에서 필요한 것만 가져와요
import { emojis } from './emoji.js';

document.addEventListener('DOMContentLoaded', function() {
  const today = new Date();
  // date-fns는 아직  CDN을 통해 불러오고 있어서 여기서는 직접 import하지 않아요. 곧 이 부분도 수정할 거예요!
  const formattedDate = dateFns.format(today, 'MMMM d, yyyy');
  document.getElementById('dateDisplay').textContent = formattedDate;
  
  showRandomEmoji();
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

이제 HTML 파일에서 `emoji.js`, `main.js`를 로드할 필요가 없어요. `index.html` 파일을 다음과 같이 수정해 주세요.

```html{22-27}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Emoji of the Day</title>
  <link rel="stylesheet" href="./style.css">
  <script src="https://cdn.jsdelivr.net/npm/date-fns@3.6.0/cdn.min.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap" rel="stylesheet">
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

이제 브라우저에서 `index.html` 파일을 열어보고, 이전과 동일하게 작동하는지 확인해 보세요!

## date-fns 라이브러리를 모듈로 설치하기

이제 CDN으로 불러오던 date-fns 라이브러리를 npm으로 설치하고 모듈로 사용해 볼게요.

```bash
$ npm install date-fns
```

이제 `main.js` 파일을 다시 수정해서 date-fns를 import로 가져오도록 바꿔봐요.

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

## HTML 파일에서 CDN 로드 삭제하기

수정사항을 반영하기 위해 다시 번들링을 해주세요.

```bash
$ npm run build
```

`/dist/bundle.js` 파일을 열어서 `date-fns`를 검색해 우리 번들에 잘 포함된걸 확인해 보세요.

```
// 이런 방식으로 포함되었다면 번들링 성공
/***/ "./node_modules/date-fns/_lib/addLeadingZeros.js":
```

이제 HTML 파일에서 더 이상 `date-fns` CDN을 로드할 필요가 없어요. `index.html` 파일을 다음과 같이 수정해 주세요.

```html{9-10}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Emoji of the Day</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="./style.css">
  <!-- CDN 스크립트도 더 이상 필요 없어요 -->
  <!-- <script src="https://cdn.jsdelivr.net/npm/date-fns@3.6.0/cdn.min.js"></script> -->
</head>
<body>
  <!-- 기존과 동일 -->
</body>
</html>
```

이제 브라우저에서 `index.html` 파일을 열어보고, 이전과 동일하게 작동하는지 확인해 보세요.

그리고 개발자 도구의 네트워크 탭을 열어 요청 개수를 확인해 보세요. 번들링이 제대로 되었다면 여러 모듈이 하나의 `bundle.js` 파일로 합쳐져 네트워크 요청 횟수가 줄어든 것을 확인할 수 있어요 👏

![](/images/network-minified.png)

네트워크 요청 감소 뿐 아니라, 기존 CDN 방식에서는 date-fns 라이브러리 전체를 불러왔지만, 웹팩의 모듈 시스템에서는 우리가 실제로 사용하는 `format` 함수만 번들에 포함시키고 불필요한 코드는 제거해 성능이 더 좋아졌어요. 이 기능은 [트리 쉐이킹(Tree-shaking)](../reference/optimization/tree-shaking.md)이라고 불러요. 나무를 흔들어 죽은 잎을 털어내듯, 사용하지 않는 코드를 털어내는거죠.

## 👣 한 걸음 더: 모듈 시스템 비교해보기 - ESM vs CommonJS

JavaScript에는 여러 모듈 시스템이 있어요. 가장 많이 사용되는 두 가지는 ESM(ES Modules)과 CommonJS예요.

각각 어떻게 사용하는지 살펴보세요.

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

이제 모듈 시스템을 도입하고 웹팩으로 번들링해서 코드를 더 효율적으로 구조화 했어요. 웹팩과 모듈 시스템의 조합은 현대 프론트엔드 개발에 꼭 필요한 기본 도구예요.

다음 단계에서는 TypeScript를 적용해 코드의 타입 안전성을 높여볼 거예요. 웹팩은 다양한 파일 형식을 처리할 수 있는 기능을 갖고 있어 TypeScript 파일도 쉽게 처리할 수 있답니다.

곧 배우게 될 웹팩의 '로더(laoder)' 기능을 통해 TypeScript 코드를 일반 JavaScript로 변환하는 과정을 자동화할 수 있을 거예요.
