# 타입스크립트 파일 다루기

타입스크립트는 자바스크립트에 타입 시스템을 추가한 언어예요. 하지만 브라우저는 타입스크립트를 직접 실행할 수 없기 때문에, 타입스크립트 코드는 반드시 자바스크립트로 변환(컴파일)해야 해요.

이번 단계에서는 기존의 '오늘의 이모지' 프로젝트에 타입스크립트를 적용하고, 웹팩을 사용해 타입스크립트 코드를 번들링하는 방법을 배워볼게요.

## 웹팩이 타입스크립트를 이해하게 만드는 법: 로더

웹팩은 기본적으로 `.js`와 `.json`만 이해할 수 있어요.  
그래서 `.ts`나 `.scss`, 이미지 같은 파일을 처리하려면 로더(loader)라는 도구가 필요해요. 로더가 웹팩에게 통역사 역할을 해주는거죠.

`ts-loader`라는 로더가 타입스크립트 파일을 웹팩이 이해할 수 있는 자바스크립트로 변환해줘요.

## 타입스크립트 개발 환경 설정하기

먼저 타입스크립트를 웹팩이 사용할 수 있도록 관련 패키지를 설치해볼게요:

```bash
npm install --save-dev typescript ts-loader
```

- `typescript`: 타입스크립트 언어 자체와 컴파일러를 포함해요.
- `ts-loader`: 웹팩이 `.ts` 파일을 읽을 수 있도록 도와주는 로더예요.

## 타입스크립트 설정 파일 만들기

웹팩 설정 파일로 `webpack.config.js`가 있듯이, 타입스크립트도 컴파일러에게 코드를 어떻게 처리할지 알려주는 설정 파일이 있어요.

루트 폴더에 아래와 같이 `tsconfig.json` 파일을 만들어주세요.

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "esnext",
    "strict": true,
    "skipLibCheck": true,
    "moduleResolution": "nodenext"
  },
  "include": ["./**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

::: details tsconfig 옵션 뜻 알아보기

- `target`: 어떤 버전의 JS로 변환할지 결정해요. ES5는 거의 모든 브라우저에서 동작해요.
- `module`: 모듈 시스템을 지정해요. 최신 ESM(ES Modules) 형식인 `ESNext`를 사용하면 트리 쉐이킹 등 웹팩의 최적화 기능을 더 잘 활용할 수 있어요.
- `skipLibCheck`: 라이브러리 파일의 타입 검사를 건너뛰어 빌드 속도를 높여요.
- `moduleResolution`: 모듈이 로컬 파일 시스템에 없으면, node_modules 디렉토리에서 모듈을 찾아요.
- `strict`: 엄격한 타입 체크를 켜서 실수를 줄여줘요.
- `include`: 컴파일러가 처리할 파일을 지정해요. `["./**/*.ts"]`로 지정하면 모든 타입스크립트 파일을 포함해요.
- `exclude`: 컴파일러가 무시할 파일을 지정해요. `["node_modules", "dist"]`는 외부 모듈과 빌드 결과물을 제외한다는 뜻이에요.
:::

## 웹팩에 로더 설정 추가하기

이제 웹팩에게 `.ts` 파일을 어떻게 처리할지 알려줄 차례예요. `ts-loader`는 타입스크립트 파일을 자바스크립트로 변환할 때 아까 만들었던 `tsconfig.json`의 설정을 참고해요.

`webpack.config.js`를 아래처럼 수정해주세요:

```js{5-5,10-21}
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './main.ts', // 웹팩이 읽기 시작할 파일을 .ts로 변경했어요.
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // .ts 파일들은
        use: 'ts-loader', // ts-loader를 거쳐 처리돼요.
        exclude: /node_modules/ // 외부 모듈은 제외해요.
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'] // 파일을 import할 때 확장자를 생략할 수 있어요. 타입스크립트와 자바스크립트를 혼용하는 프로젝트에서 설정해두면 좋아요.
  }
};
```



## JavaScript 파일을 TypeScript로 변환하기

기존 JS 파일들을 `.ts`로 바꾸고, 타입 정보를 조금씩 넣어볼게요.

### `emoji.ts`로 바꾸기

```ts{1-4,6-6}
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
```

`interface Emoji`를 선언해서 이모지 데이터 구조를 명확하게 만들었어요.  
이렇게 해두면 실수로 잘못된 형태의 데이터를 넣는 걸 막을 수 있어요.


### `main.ts`로 바꾸기

```ts{1-1,7-7,16-17}
import { emojis } from './emoji'; // webpack.config.js의 resolve설정 덕에 확장자 없이 import할 수 있어요.
import { format } from 'date-fns';

document.addEventListener('DOMContentLoaded', function() {
  const today = new Date();
  const formattedDate = format(today, 'MMMM d, yyyy');
  document.getElementById('dateDisplay')!.textContent = formattedDate; // 타입 문제를 임시로 해결해요
  
  showRandomEmoji();
});

function showRandomEmoji() {
  const randomIndex = Math.floor(Math.random() * emojis.length);
  const selectedEmoji = emojis[randomIndex];
  
  document.getElementById('emojiDisplay')!.textContent = selectedEmoji.icon; // 타입 문제를 임시로 해결해요
  document.getElementById('emojiName')!.textContent = selectedEmoji.name; // 타입 문제를 임시로 해결해요
}
```

## 타입스크립트 빌드하기

이제 코드를 빌드해볼게요.

```bash
npm run build
```

`index.html` 파일을 브라우저에서 열어보세요. 우리가 코드를 타입스크립트로 변환했지만, 브라우저에서 정상적으로 작동하는 것을 확인할 수 있어요 👏


## 다음 단계

이제 우리 프로젝트는 타입 안정성을 확보했어요. 작은 실수도 IDE가 잡아주고, 협업도 훨씬 수월해졌을 거예요.

다음은 리액트를 도입해서 컴포넌트 기반 UI를 만드는 법을 알아볼 거예요.  
타입스크립트와 리액트는 정말 잘 어울리는 조합이니 기대해주세요!