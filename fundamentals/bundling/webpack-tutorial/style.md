# CSS와 스타일 관리하기

이번 단계에서는 '오늘의 이모지' 프로젝트의 스타일을 웹팩으로 관리하는 방법을 배워볼게요. 웹팩의 로더를 사용하면 CSS 파일도 자바스크립트 모듈처럼 import해서 사용할 수 있어요.

## CSS를 모듈처럼 사용하기

기존에는 HTML 파일에서 `<link>` 태그로 CSS를 불러왔어요. 하지만 웹팩을 사용하면 자바스크립트에서 CSS를 import할 수 있어요. 이렇게 하면 CSS도 모듈처럼 관리할 수 있고, 필요한 스타일만 번들에 포함시킬 수 있어요.

```javascript
// CSS를 import하면 웹팩이 알아서 처리해요
import './style.css';
```

## CSS 로더 설치하기

웹팩이 CSS를 처리할 수 있도록 필요한 로더들을 설치해볼게요:

```bash
npm install --save-dev style-loader css-loader
```

- `css-loader`: CSS 파일을 자바스크립트 모듈로 변환해요.
- `style-loader`: 변환된 CSS를 `<style>` 태그로 만들어 HTML에 주입해요.

## 웹팩에 CSS 로더 설정 추가하기

`webpack.config.js` 파일에 CSS를 처리하는 로더를 추가해요:

```js
module.exports = {
  // ... 기존 설정 유지
  module: {
    rules: [
      // ... 기존 rules 유지
      {
        test: /\.css$/, // .css 파일을 처리해요
        use: [
          'style-loader', // CSS를 <style> 태그로 주입해요
          'css-loader' // CSS를 자바스크립트 모듈로 변환해요
        ]
      }
    ]
  }
};
```

로더는 배열의 뒤에서부터 앞으로 순서대로 실행돼요. 즉, `css-loader`가 먼저 실행되고, 그 다음 `style-loader`가 실행되는 거예요.

## CSS 모듈 사용하기

CSS 모듈을 사용하면 클래스 이름이 고유하게 만들어져서 스타일 충돌을 방지할 수 있어요. 웹팩 설정을 수정해서 CSS 모듈을 활성화해볼게요:

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true // CSS 모듈을 활성화해요
            }
          }
        ]
      }
    ]
  }
};
```

이제 CSS 파일을 모듈로 import해서 사용할 수 있어요:

```tsx
// App.module.css
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

// App.tsx
import styles from './App.module.css';

const App: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* ... */}
    </div>
  );
};
```

## 스타일 파일 구조화하기

프로젝트가 커지면 스타일 파일도 체계적으로 관리해야 해요. 일반적인 구조를 추천해드릴게요:

```
src/
├── styles/
│   ├── variables.css    # CSS 변수
│   ├── reset.css       # 브라우저 기본 스타일 초기화
│   └── global.css      # 전역 스타일
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   └── Button.module.css
│   └── Card/
│       ├── Card.tsx
│       └── Card.module.css
└── App.tsx
```

## 👣 한 걸음 더: CSS 전처리기 사용하기

웹팩은 SASS, LESS 같은 CSS 전처리기도 지원해요. 예를 들어 SASS를 사용하고 싶다면:

```bash
npm install --save-dev sass sass-loader
```

그리고 웹팩 설정에 추가해요:

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader' // SASS를 CSS로 변환해요
        ]
      }
    ]
  }
};
```

이제 `.scss` 파일을 import해서 사용할 수 있어요:

```scss
// variables.scss
$primary-color: #007bff;
$font-size-large: 1.5rem;

// App.scss
@import './variables.scss';

.container {
  color: $primary-color;
  font-size: $font-size-large;
}
```

## 다음 단계

이제 우리 프로젝트의 스타일을 웹팩으로 관리할 수 있게 되었어요. CSS를 모듈처럼 사용하고, 전처리기를 활용하면 더 효율적인 스타일 관리가 가능해졌죠.

다음 단계에서는 이미지와 폰트 같은 정적 자원을 웹팩으로 관리하는 방법을 배워볼 거예요. 웹팩의 Asset Modules를 사용하면 이런 파일들도 모듈처럼 import해서 사용할 수 있답니다.
