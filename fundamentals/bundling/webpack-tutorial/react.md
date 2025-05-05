# 리액트 적용하기

이번 단계에서는 '오늘의 이모지' 프로젝트에 리액트를 도입하고, 컴포넌트 기반으로 UI를 재구성해볼게요. 리액트는 자바스크립트 라이브러리지만, JSX라는 특별한 문법을 사용하기 때문에 웹팩의 도움이 필요해요.

## JSX란?

리액트는 JSX라는 특별한 문법을 사용해요. JSX는 자바스크립트 안에 HTML과 비슷한 문법을 쓸 수 있게 해주는 문법이에요. 하지만 브라우저는 JSX를 이해하지 못하기 때문에, 이를 일반 자바스크립트로 변환해야 해요.

```jsx
// JSX 문법
const element = <h1>Hello, {name}!</h1>;

// 변환된 자바스크립트
const element = React.createElement('h1', null, 'Hello, ', name, '!');
```

## 리액트 개발 환경 설정하기

먼저 리액트와 관련 패키지들을 설치해볼게요:

```bash
npm install react react-dom
npm install --save-dev @types/react @types/react-dom
```

- `react`: 리액트 코어 라이브러리예요.
- `react-dom`: 리액트를 웹 브라우저에서 사용할 수 있게 해주는 라이브러리예요.
- `@types/react`, `@types/react-dom`: 타입스크립트에서 리액트를 사용할 때 필요한 타입 정의예요.

## tsconfig.json에 JSX 설정 추가하기

타입스크립트가 JSX를 이해할 수 있도록 `tsconfig.json` 파일에 JSX 관련 설정을 추가해요:

```json
{
  "compilerOptions": {
    // ... 기존 설정 유지
    "jsx": "react", // JSX를 리액트 문법으로 변환해요
    "esModuleInterop": true // 리액트를 ESM으로 import할 수 있게 해줘요
  }
}
```

## 웹팩에 바벨 로더 설정 추가하기

JSX를 자바스크립트로 변환하기 위해 바벨과 리액트 프리셋을 설치하고 웹팩 설정을 수정해요:

```bash
npm install --save-dev @babel/core @babel/preset-react
```

그리고 `webpack.config.js` 파일을 수정해요:

```js
module.exports = {
  // ... 기존 설정 유지
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // .ts와 .tsx 파일을 처리해요
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
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

## HTML을 리액트 컴포넌트로 변환하기

이제 HTML을 리액트 컴포넌트로 변환해볼게요. 먼저 `index.html`을 수정해요:

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

const App: React.FC = () => {
  const [selectedEmoji, setSelectedEmoji] = React.useState(emojis[0]);

  const showRandomEmoji = () => {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    setSelectedEmoji(emojis[randomIndex]);
  };

  return (
    <div className="container">
      <h1>Emoji of the Day</h1>
      <div className="date-display">
        {format(new Date(), 'MMMM d, yyyy')}
      </div>
      <div className="emoji-container">
        <div className="emoji">{selectedEmoji.icon}</div>
        <div className="emoji-name">{selectedEmoji.name}</div>
        <button onClick={showRandomEmoji}>다른 이모지 보기</button>
      </div>
    </div>
  );
};

export default App;
```

마지막으로 `index.tsx`를 만들어 리액트 앱을 시작해요:

```tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## 리액트 앱 빌드하기

이제 코드를 빌드해볼게요:

```bash
npm run build
```

`index.html` 파일을 브라우저에서 열어보세요. 이전과 동일하게 작동하지만, 이제는 리액트 컴포넌트로 구성된 앱이에요! 

## 👣 한 걸음 더: 리액트와 웹팩의 조화

리액트와 웹팩은 서로 다른 역할을 하지만, 함께 사용하면 더욱 강력한 개발 환경을 만들 수 있어요:

1. **개발 경험 향상**
   - 웹팩의 HMR(Hot Module Replacement)을 통해 리액트 컴포넌트를 수정할 때마다 페이지를 새로고침하지 않고도 변경사항을 바로 확인할 수 있어요.

2. **코드 최적화**
   - 웹팩의 코드 스플리팅 기능을 활용하면 리액트 앱의 초기 로딩 시간을 줄일 수 있어요.
   - React.lazy와 Suspense를 사용하면 컴포넌트를 필요할 때만 로드할 수 있어요.

3. **타입스크립트 통합**
   - 웹팩과 타입스크립트, 리액트를 함께 사용하면 타입 안정성과 개발 생산성을 모두 높일 수 있어요.

## 다음 단계

이제 우리 프로젝트는 리액트 컴포넌트로 재구성되었어요. 컴포넌트 기반 개발의 장점을 경험해보셨나요?

다음 단계에서는 CSS와 스타일을 모듈처럼 관리하는 방법을 배워볼 거예요. 웹팩의 로더를 사용하면 CSS도 자바스크립트 모듈처럼 import해서 사용할 수 있답니다.
