# 개발 환경 개선하기

이번 단계에서는 '오늘의 이모지' 프로젝트에 웹팩 개발 서버를 도입해서 개발 환경을 더 편리하게 만들어볼게요. 개발 서버는 코드를 수정할 때마다 자동으로 페이지를 새로고침하고, Hot Module Replacement(HMR)를 통해 상태를 유지한 채로 변경사항을 바로 확인할 수 있게 해줘요.

## 웹팩 개발 서버란?

웹팩 개발 서버는 개발 중에 사용하는 가상 서버예요. 다음과 같은 기능을 제공해요:
- 자동 새로고침
- Hot Module Replacement (HMR)
- 소스맵 지원
- 에러 메시지 표시
- 프록시 설정

## 개발 서버 설치하기

먼저 웹팩 개발 서버를 설치해요:

```bash
npm install --save-dev webpack-dev-server
```

## 개발 서버 설정하기

`webpack.config.js` 파일에 개발 서버 설정을 추가해요:

```js
module.exports = {
  // ... 기존 설정 유지
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // 정적 파일 제공 경로
    },
    port: 3000, // 서버 포트
    open: true, // 서버 시작 시 브라우저 자동 실행
    hot: true, // HMR 활성화
    historyApiFallback: true, // SPA를 위한 설정
    client: {
      overlay: true, // 에러 발생 시 브라우저에 오버레이 표시
    }
  }
};
```

## 개발 스크립트 추가하기

`package.json` 파일에 개발 서버 실행 스크립트를 추가해요:

```json
{
  "scripts": {
    "start": "webpack serve --mode development",
    "build": "webpack --mode production"
  }
}
```

이제 다음 명령어로 개발 서버를 실행할 수 있어요:

```bash
npm start
```

## Hot Module Replacement (HMR) 사용하기

HMR을 사용하면 페이지를 새로고침하지 않고도 변경사항을 바로 확인할 수 있어요. 리액트 컴포넌트를 수정할 때 특히 유용해요.

`App.tsx`에서 HMR을 활성화해요:

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

// HMR 활성화
if (module.hot) {
  module.hot.accept();
}

export default App;
```

## 👣 한 걸음 더: 개발 환경 최적화하기

1. **소스맵 설정**
```js
module.exports = {
  devtool: 'eval-source-map', // 개발 환경에서 상세한 소스맵 사용
  // ... 기존 설정 유지
};
```

2. **프록시 설정**
```js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        pathRewrite: { '^/api': '' }
      }
    }
  }
};
```

3. **환경 변수 설정**
```js
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
};
```

## 개발 서버 사용 팁

1. **에러 처리**
   - 개발 서버는 에러가 발생하면 브라우저에 오버레이로 표시해요
   - 콘솔에서도 자세한 에러 메시지를 확인할 수 있어요

2. **성능 최적화**
   - 개발 서버는 메모리에 번들을 저장해요
   - 실제 파일은 생성하지 않아서 빌드 시간이 단축돼요

3. **보안**
   - 개발 서버는 로컬에서만 접근 가능해요
   - 필요한 경우 `host` 옵션으로 접근 제한을 설정할 수 있어요

## 다음 단계

이제 우리 프로젝트에 웹팩 개발 서버를 적용해서 개발 환경을 더 편리하게 만들었어요. 자동 새로고침과 HMR을 통해 개발 생산성이 크게 향상되었죠.

다음 단계에서는 환경 변수와 보안을 관리하는 방법을 배워볼 거예요. `.env` 파일과 `dotenv-webpack`을 사용하면 환경별로 다른 설정을 적용할 수 있답니다.
