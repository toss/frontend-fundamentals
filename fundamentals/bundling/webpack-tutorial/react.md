# React 적용하기

이번 단계에서는 '오늘의 이모지' 프로젝트에 React를 도입하고, 컴포넌트 기반으로 UI를 재구성해 볼게요. React는 JavaScript 라이브러리지만, JSX라는 특별한 문법을 사용하기 때문에 웹팩의 도움이 필요해요.

## JSX란

React는 JSX라는 특별한 문법을 사용해요. JSX는 JavaScript 안에 HTML과 비슷한 문법을 쓸 수 있게 해주는 문법이에요. 하지만 브라우저는 JSX를 이해하지 못하기 때문에, 이를 일반 JavaScript로 변환해야 해요.

```jsx
// JSX 문법
const element = <h1>Hello, {name}!</h1>;

// 변환된 JavaScript
const element = React.createElement('h1', null, 'Hello, ', name, '!');
```

## 1. React 개발 환경 설정하기

먼저 React와 관련 패키지들을 설치해 볼게요.

```bash
$ npm install react react-dom
$ npm install --save-dev @types/react @types/react-dom
```

- `react`: React 코어 라이브러리예요.
- `react-dom`: React를 웹 브라우저에서 사용할 수 있게 해주는 라이브러리예요.
- `@types/react`, `@types/react-dom`: 타입스크립트에서 React를 사용할 때 필요한 타입 정의예요.

## 2. tsconfig.json에 JSX 설정 추가하기

타입스크립트가 JSX를 이해할 수 있도록 `tsconfig.json` 파일에 JSX 관련 설정을 추가해요.

```json
{
  "compilerOptions": {
    // ... 기존 설정 유지
    "jsx": "react", // JSX를 React 문법으로 변환해요
    "esModuleInterop": true // React를 ESM으로 import할 수 있게 해줘요
  }
}
```

## 3. 웹팩에 바벨 로더 설정 추가하기

지금까지는 타입스크립트를 웹팩에서 다룰 때 `ts-loader`를 사용했어요. 이번엔 React의 JSX 문법도 함께 다뤄야 하기 때문에 바벨(Babel)을 사용하는 방식으로 바꿔볼 거예요.

다음과 같이 도구를 설치하고 웹팩에 연결해 볼게요.

```bash
$ npm install --save-dev @babel/core babel-loader @babel/preset-env @babel/preset-react @babel/preset-typescript
```

- `@babel/core`: JavaScript 코드를 변환해 주는 도구예요
- `babel-loader`: 웹팩에서 바벨을 사용할 수 있도록 연결해 주는 역할이에요.
- `@babel/preset-react`: 바벨에게 JSX를 어떻게 변환할지 알려주는 설정이에요.
- `@babel/preset-typescript`: 바벨에게 타입스크립트를 어떻게 변환할지 알려주는 설정이에요.
- `@babel/preset-env`: 최신 JavaScript 문법을 구버전 브라우저에서도 작동하게 변환해 줘요. React를 해석하는데 필수는 아니지만, 최신 JavaScript 문법을 쓸 계획이 있다면 넣는 걸 추천해요.

그리고 `webpack.config.js` 파일의 `entry`, `module.rules`, `resolve`를 다음과 같이 수정해 주세요.

```js
module.exports = {
  // ... 기존 설정 유지
  entry: './main.tsx', // 웹팩이 읽기 시작할 파일을 .tsx로 변경했어요.
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // .ts와 .tsx 파일을 대상으로
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env', // 최신 JS 문법을 변환해요
                '@babel/preset-react', // JSX를 변환해요
                '@babel/preset-typescript' // 타입스크립트를 변환해요
              ]
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'] // .tsx 확장자도 처리할 수 있게 해요
  }
};
```

:::info 바벨이란

바벨은 최신 JavaScript 코드를 이전 버전의 JavaScript로 변환해 주는 도구예요. 예를 들어, ES6+ 문법을 ES5로 변환해서 오래된 브라우저에서도 동작하게 만들어줘요.

성경에 나오는 '바벨탑'처럼, 많은 언어가 혼재하는 혼란스러운 상황을 상징해요. 

```js
// 변환 전 (ES6+)
const sum = (a, b) => a + b;

// 변환 후 (ES5)
var sum = function(a, b) {
  return a + b;
};
```

바벨은 코드를 다음과 같이 바꿔줘요.

- 화살표 함수 → `function` 키워드를 사용하는 일반 함수
- 클래스 문법 → 프로토타입 기반 생성자 함수
- 템플릿 리터럴 → 문자열을 `+` 기호로 이어 붙여 연결
- 구조 분해 할당 → 하나씩 값을 꺼내는 일반 변수 할당
- JSX 문법 → `React.createElement()` 함수 호출 코드

React에서는 JSX를 일반 JavaScript로 변환하는 데 바벨이 필수적이에요.
:::

:::details Q. module.rules와 resolve는 언제 수정해야 할까요?
**`module.rules`: "이런 파일도 웹팩이 이해했으면 좋겠는데?" 싶을 때**

- `.scss`, `.tsx` 같은 새로운 파일을 추가했는데 웹팩이 못 읽을 때
- 로더를 새로 추가할 때 (예: 이미지, 폰트, SVG 등 처리용)


**`resolve`: import, require문을 썼을 때 어떤 파일을 가리키는지 알려주고 싶을 때**

- `import A from './A.tsx'` → `import A from './A'`처럼 **확장자를 생략**하고 싶을 때
- `src/components/...` 이런 긴 경로를 `@components/...`처럼 **짧게 쓰고 싶을 때**
- 모듈을 찾는 기준 경로를 바꾸고 싶을 때 (`node_modules` 말고 `src`도 보게 만들기 등)

:::

## 4. HTML을 React 컴포넌트로 변환하기

이제 HTML을 React 컴포넌트로 변환해 볼게요. 먼저 `index.html`을 수정해요.

```html{11-12}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Emoji of the Day</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="./style.css">
</head>
<body>
  <!-- 기존 HTML을 모두 잘라냈어요 -->
  <div id="root"></div>
  <script src="./dist/bundle.js"></script>
</body>
</html>
```

그리고 `App.tsx` 컴포넌트를 만들어요:

```tsx
import React from 'react';
import { emojis } from './emoji';
import { format } from 'date-fns';

const App = () => {
  const [selectedEmoji, setSelectedEmoji] = React.useState(emojis[0]);

  // main.ts에 있던 showRandomEmoji 함수를 가져오되, React 상태에 저장하도록 수정했어요
  const showRandomEmoji = () => {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    setSelectedEmoji(emojis[randomIndex]);
  };

  return (
    <div className="container">
      <img src="./assets/logo.svg" alt="Logo" className="logo"></img>
      <h1>Emoji of the Day</h1>
      <div className="date-display">
        {format(new Date(), 'MMMM d, yyyy')}
      </div>
      <div className="emoji-container">
        <div className="emoji">{selectedEmoji.icon}</div>
        <div className="emoji-name">{selectedEmoji.name}</div>
        {/* 다른 이모지 보기 기능을 추가했어요 */}
        <button onClick={showRandomEmoji}>See other emoji</button>
      </div>
    </div>
  );
};

export default App;
```

마지막으로 `main.ts`파일 이름을 `main.tsx`로 변경하고, `App.tsx`에 만들었던 React 앱을 그리도록 수정해 줘요.

```tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')!).render(<App />);
```

## 5. React 앱 빌드하기

이제 코드를 빌드해 볼게요.

```bash
npm run build
```

`index.html` 파일을 브라우저에서 열어보세요. 'See other emoji' 버튼이 추가되고, 잘 동작한다면 이제 우리 프로젝트는 React 컴포넌트로 구성된 앱이 된 거예요!

![](/images/react-app.png)


## 다음 단계

이제 우리 프로젝트는 React 컴포넌트 기반으로 구조화돼서, UI를 더 효율적으로 만들고 관리할 수 있게 됐어요.

다음 단계에서는 CSS와 스타일을 모듈처럼 관리하는 방법을 배워볼 거예요. 웹팩의 로더를 사용하면 CSS도 JavaScript 모듈처럼 import해서 사용할 수 있답니다.
