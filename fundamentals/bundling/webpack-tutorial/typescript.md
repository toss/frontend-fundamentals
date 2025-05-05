# 타입스크립트 파일 다루기

타입스크립트는 자바스크립트에 타입 시스템을 추가한 언어예요. 하지만 브라우저는 타입스크립트를 직접 실행할 수 없기 때문에, 타입스크립트 코드는 반드시 자바스크립트로 변환(컴파일)해야 해요.

이번 단계에서는 기존의 '오늘의 이모지' 프로젝트에 타입스크립트를 적용하고, 웹팩을 사용해 타입스크립트 코드를 번들링하는 방법을 배워볼게요.

## 웹팩이 타입스크립트를 이해하게 만드는 법: 로더

웹팩은 기본적으로 자바스크립트와 JSON 파일만 이해해요. 타입스크립트나 CSS 같은 다른 파일 형식을 처리하려면 '로더'라는 도구가 필요해요.
로더는 다양한 파일 형식을 웹팩이 이해할 수 있는 형태로 변환해줘요. 타입스크립트 파일을 처리할 때는 `ts-loader`가 이 역할을 담당하게 돼요.


## 타입스크립트 개발 환경 설정하기

먼저 타입스크립트와 관련 패키지를 설치해볼게요:

```bash
$ npm install --save-dev typescript ts-loader
```

- `typescript`: 타입스크립트 언어 자체와 컴파일러를 제공해요.
- `ts-loader`: 웹팩에서 타입스크립트 파일을 처리할 수 있게 해주는 로더예요.


## 타입스크립트 설정 파일 만들기

이제 타입스크립트 설정 파일을 만들어볼게요. 프로젝트 루트 폴더에 `tsconfig.json` 파일을 생성하고 다음 내용을 작성해주세요:

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist"
  },
  "include": ["./**/*.ts"],
  "exclude": ["node_modules"]
}
```

이 설정 파일은 타입스크립트 컴파일러에게 어떻게 코드를 처리할지 알려주는 역할을 해요:

- `target`: 컴파일된 자바스크립트 코드의 버전을 설정해요. ES5는 대부분의 브라우저에서 지원돼요.
- `module`: 모듈 시스템 형식을 정해요. commonjs는 Node.js에서 사용하는 표준이에요.
- `strict`: 엄격한 타입 검사를 활성화해서 더 많은 오류를 미리 찾아내요.
- `outDir`: 컴파일된 자바스크립트 파일이 저장될 위치를 지정해요.

## 웹팩 설정 수정하기

이제 웹팩 설정 파일을 수정해서 타입스크립트 파일(.ts)을 처리할 수 있도록 해볼게요. `webpack.config.js` 파일을 열고 다음과 같이 수정해주세요:

```javascript
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './main.ts', // 진입점을 .ts 파일로 변경
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // .ts 확장자를 가진 파일에 적용
        use: 'ts-loader', // ts-loader를 사용해 타입스크립트 파일 처리
        exclude: /node_modules/ // node_modules 폴더는 제외
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'] // .ts와 .js 확장자를 자동으로 처리
  }
};
```

여기서 추가된 부분을 살펴볼게요:

1. **entry**: 진입점 파일을 `.js`에서 `.ts`로 변경했어요.
2. **module.rules**: 웹팩이 파일을 처리할 때 사용할 로더를 정의하는 부분이에요. `.ts` 확장자를 가진 파일은 `ts-loader`를 사용해 처리하도록 설정했어요.
3. **resolve.extensions**: 모듈을 해석할 때 자동으로 처리할 확장자를 지정해요. 덕분에 `import` 문에서 확장자를 생략할 수 있어요.

## JavaScript 파일을 TypeScript로 변환하기

이제 기존의 JavaScript 파일들을 TypeScript로 변환해볼게요. 확장자를 `.js`에서 `.ts`로 바꾸고, 타입 정보를 추가해주면 돼요.

### emoji.ts 파일 만들기

`emoji.js` 파일을 `emoji.ts`로 이름을 바꾸고 다음과 같이 수정해주세요:

```typescript
// emoji.ts 파일
export interface Emoji {
  icon: string;
  name: string;
}

export const emojis: Emoji[] = [
  { icon: '😊', name: 'Smiling Face' },
  { icon: '🚀', name: 'Rocket' },
  { icon: '🍕', name: 'Pizza' },
  { icon: '🐱', name: 'Cat' },
  { icon: '🌈', name: 'Rainbow' },
  { icon: '🎸', name: 'Guitar' }
];

export function getRandomEmoji(): Emoji {
  const randomIndex = Math.floor(Math.random() * emojis.length);
  return emojis[randomIndex];
}
```

`interface Emoji`로 이모지 객체의 구조를 정의하고, `emojis` 배열에는 `Emoji[]` 타입을 지정했어요. 이렇게 하면 잘못된 형태의 이모지 데이터가 추가되는 것을 방지할 수 있어요.

### main.ts 파일 만들기

`main.js` 파일도 `main.ts`로 이름을 바꾸고 다음과 같이 수정해주세요:

```typescript
// main.ts 파일
import { emojis, Emoji } from './emoji';
import { format } from 'date-fns';

document.addEventListener('DOMContentLoaded', function() {
  const today = new Date();
  const formattedDate: string = format(today, 'MMMM d, yyyy');
  document.getElementById('dateDisplay')!.textContent = formattedDate;
  
  showRandomEmoji();
});

function showRandomEmoji(): void {
  const randomIndex: number = Math.floor(Math.random() * emojis.length);
  const selectedEmoji: Emoji = emojis[randomIndex];
  
  const emojiDisplay = document.getElementById('emojiDisplay');
  const emojiName = document.getElementById('emojiName');
  
  if (emojiDisplay && emojiName) {
    emojiDisplay.textContent = selectedEmoji.icon;
    emojiName.textContent = selectedEmoji.name;
  }
}
```

여기서도 변수와 함수에 타입을 추가했어요. 특히 `showRandomEmoji` 함수에서는 `getElementById`가 null을 반환할 가능성도 고려해서 안전하게 처리했어요.

## 타입스크립트 빌드하기

이제 타입스크립트로 작성된 코드를 웹팩으로 빌드해볼게요. 터미널에서 다음 명령어를 실행해주세요:

```bash
$ npm run build
```

빌드가 완료되면 `dist` 폴더에 `bundle.js` 파일이 생성돼요. 이 파일은 타입스크립트가 자바스크립트로 변환된 후 웹팩으로 번들링된 결과물이에요.

## HTML 파일 수정하기

빌드된 번들을 사용하기 위해 `index.html` 파일을 확인해주세요. 앞서 모듈 시스템 적용 때 이미 수정했기 때문에 변경할 필요가 없어요:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Emoji of the Day</title>
  <link rel="stylesheet" href="./style.css">
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

  <script src="./dist/bundle.js"></script>
</body>
</html>
```

브라우저에서 `index.html` 파일을 열어보세요. 이전과 똑같이 작동하지만, 이제 코드는 타입스크립트의 안전성을 갖추게 되었어요!

## 👣 한 걸음 더: 타입스크립트의 강력한 IDE 지원 활용하기

타입스크립트의 가장 큰 장점 중 하나는 개발 도구(IDE)와의 뛰어난 통합이에요. VS Code나 WebStorm 같은 에디터에서는 다음과 같은 기능을 제공해요:

1. **코드 자동 완성**: 객체의 속성이나 메소드를 입력할 때 가능한 옵션을 보여줘요.
2. **실시간 오류 검사**: 코드를 작성하는 중에 타입 오류를 바로 알려줘요.
3. **스마트 리팩토링**: 변수나 함수 이름을 안전하게 변경할 수 있어요.

예를 들어, `emojis` 배열에서 이모지를 사용할 때 어떤 속성이 있는지 IDE가 자동으로 알려주고, 잘못된 속성을 사용하면 경고해줘요:

```typescript
// IDE에서는 이런 코드를 작성할 때 자동 완성 제안이 나타나요
const emoji = emojis[0];
emoji.icon; // 자동 완성으로 제안됨
emoji.nonExistingProperty; // 빨간 밑줄로 오류 표시
```

이처럼 타입스크립트는 코드를 작성하는 순간부터 많은 실수를 방지할 수 있게 도와줘요.

## 다음 단계

이제 우리 프로젝트에 타입스크립트를 적용해 코드의 안정성을 높였어요. 타입 시스템을 통해 많은 잠재적 버그를 미리 잡아낼 수 있게 되었죠.

다음 단계에서는 React를 도입해 컴포넌트 기반의 UI를 구현하는 방법을 배워볼게요. React와 타입스크립트의 조합은 현대 웹 개발에서 매우 인기 있는 스택이랍니다!
