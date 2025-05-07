# 웹팩 도입하고 첫 번들 만들기

이번 단계에서는 앞서 다운로드한 '오늘의 이모지' 프로젝트에 웹팩을 설치하고 첫 번째 번들을 만들어 볼게요.

## 웹팩(Webpack)이란

웹팩은 가장 널리 사용되는 대표적인 번들러예요. 번들러에 대한 자세한 설명은 [번들러란](../bundler.md) 문서에서 확인할 수 있어요.

웹팩의 가장 기본적인 기능은 개발자의 편의와 생산성을 위해 여러 개로 조각내 개발한 자바스크립트 파일과 리소스(CSS, 이미지 등)를 브라우저가 이해할 수 있는 하나의 번들 파일로 만들어주는 거예요.

![](/images/browser-thinking.png)

이번엔 웹팩을 설치하고, `main.js` 파일을 번들링해서 `bundle.js`로 만들어보는 아주 기초적인 흐름을 경험해볼게요

## 기본 환경 준비하기

### Node.js 설치 확인하기

웹팩을 사용하기 위해서는 Node.js가 필요해요. 터미널에서 다음 명령어로 Node.js 및 npm이 설치되어 있는지 확인해보세요. Node.js 버전 22이상을 추천해요.

```bash
$ node -v 
# 명령어 입력시 v22.13.0 등 버전명이 보이면 설치된 거예요.

$ npm -v
# 명령어 입력시 10.9.0 등 버전명이 보이면 설치된 거예요.
```

만약 설치되어 있지 않다면, [Node.js 공식 사이트](https://nodejs.org/)에서 다운로드 해주세요.

### 프로젝트 초기화하기

이제 기존 프로젝트 폴더에서 npm을 초기화할게요. 터미널에서 example-project 폴더로 이동한 후 다음 명령어를 실행하세요.

```bash
$ cd example-project
$ npm init -y
```

이 명령어는 `package.json` 파일을 생성해요. `-y`옵션은 모든 필드를 기본값으로 생성하겠다(yes 의 약자)라는 의미예요. 
:::details `package.json`이 뭔가요?
Node.js 기반 프로젝트의 '설계도'라고 생각하면 돼요.
- 프로젝트 이름, 버전, 설명
- 설치된 패키지 목록 (dependencies)
- 실행 스크립트 (예: npm run dev)
- 저자 정보, 라이선스 등

와 같은 정보들을 담고있죠.
:::

## 웹팩 설치하기

이제 웹팩과 웹팩 CLI를 개발 의존성으로 설치해볼게요.

```bash
$ npm install --save-dev webpack webpack-cli
```

- `webpack`: 실제 번들링을 수행하는 도구
- `webpack-cli`: 터미널에서 webpack 명령어를 쓸 수 있게 해주는 CLI

웹팩은 빌드 도구라 실제 배포되는 코드에서는 필요 없기 때문에 `--save-dev` 옵션을 통해 개발 의존성으로 설치해요.

## 웹팩 설정 파일 만들기

이제 `main.js` 파일을 번들링해서 `bundle.js` 로 만들어보려고 해요.
이를 위해 프로젝트 루트에 `webpack.config.js` 이름의 파일을 생성하고 다음과 같이 작성해주세요.

```javascript
const path = require('path');

module.exports = {
  entry: './main.js', // 어떤 파일을 진입점으로 번들링할지
  output: {
    filename: 'bundle.js', // 번들로 만들어질 파일 이름
    path: path.resolve(__dirname, 'dist'), // 번들 파일이 어디에 저장될지
  },
};
```
이 설정 파일을 보고 웹팩은 `main.js` 파일을 번들링해서 `bundle.js` 파일로 만들어요.

## 첫 번들 만들기

이제 웹팩으로 번들을 만들어볼게요. 다음 명령어를 실행해주세요.

```bash
$ npx webpack
```

빌드가 완료되면 `dist` 폴더 안에 `bundle.js` 파일이 생성돼요.

:::tip
`npx`는 Node.js와 함께 설치된 도구로, 로컬에 설치된 패키지를 실행할 수 있게 해줘요.
:::

`/dist/bundle.js` 를 열어보면 우리가 `main.js` 에 적었던 코드가 한 줄로 압축되고, 변수명이 t, e같은 짧은 이름으로 바뀐걸 볼 수 있어요. 이처럼 웹팩은 기본적으로 추가 설정 없이도 어느 정도 코드를 최적화 해줘요.

```js
document.addEventListener("DOMContentLoaded",(function(){const t=new Date,e=dateFns.format(t,"MMMM d, yyyy");document.getElementById("dateDisplay").textContent=e,function(){const t=Math.floor(Math.random()*emojis.length),e=emojis[t];document.getElementById("emojiDisplay").textContent=e.icon,document.getElementById("emojiName").textContent=e.name}()}));
```
첫 번째 번들 파일을 만든것, 축하해요! 🥳

지금까지 만들어진 파일 구조를 돌아볼게요.
```
example-project/
├── index.html
├── style.css
├── main.js
├── emoji.js
├── package.json # npm init으로 생성됨
├── webpack.config.js # 직접 생성한 웹팩 설정 파일
├── node_modules/ # npm install로 생성된 폴더
├── dist/ # 웹팩이 생성한 폴더
│ └── bundle.js # 웹팩으로 번들링된 파일
└── assets/
  ├── logo.svg
  └── Inter-Regular.woff2
```

## package.json에 빌드 스크립트 추가하기

매번 `npx webpack` 명령어를 실행하는 대신, `package.json` 파일에 스크립트를 추가하면 프로젝트 관리가 더 체계적이게 돼요. 

프로젝트의 모든 명령어를 한 곳에서 관리할 수 있고, 나중에 빌드 과정이 복잡해져도 명령어는 간단하게 유지할 수 있답니다.

`package.json` 파일을 열고 "scripts" 부분을 다음과 같이 수정하세요:

```json
"scripts": {
  "build": "webpack"
}
```

이제 다음 명령어로 웹팩 빌드를 실행할 수 있어요:

```bash
npm run build
```

## HTML 파일 수정하기

마지막으로 HTML 파일을 수정하여 `main.js` 대신 웹팩으로 번들링된 `bundle.js` 파일을 사용하도록 변경해볼게요.

`index.html` 파일을 열고 스크립트 부분을 다음과 같이 수정해주세요.

```html
<!-- emoji.js는 그대로 유지해요 -->
<script src="./emoji.js"></script>

<!-- main.js 대신 번들링된 스크립트를 사용해요 -->
<!-- <script src="./main.js"></script> -->
<script src="./dist/bundle.js"></script>
```

브라우저에서 `index.html`를 확인해주세요. 번들된 스크립트가 잘 작동할 거예요!

## 👣 한 걸음 더: 웹팩 모드 설정

우리가 실행한 번들링 결과를 찬찬히 살펴보면, 다음과 같은 경고 문장을 볼 수 있어요.
```
WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value.
Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior.
```

이 경고는 우리가 웹팩 설정 파일에 `mode`를 넘기지 않아서, 웹팩이 기본적으로 프로덕션 모드로 빌드를 수행했음을 의미해요. 
 
웹팩은 크게 세 가지 모드를 지원해요.
- `development`: 코드를 완전히 압축하지는 않지만, 일부 기본적인 최적화를 수행해요. 변수명을 짧게 바꾸거나 공백을 제거하는 정도의 최소한의 압축이 이루어져요. 개발 모드에서는 디버깅이 쉽도록 소스맵을 제공하는 데 초점을 맞춰요.
- `production`: 훨씬 강력한 압축과 최적화가 자동으로 이루어져요. 코드 압축, 사용하지 않는 코드 제거 등이 기본적으로 적용되며, 파일 크기를 최소화하는 데 중점을 둬요.
- `none`: 어떤 기본 최적화도 적용되지 않아요. 자신만의 최적화를 완전히 커스터마이징하고 싶을 때 사용해요.

우리는 현재 개발환경에서만 작업하고 있으니, 개발 모드로 설정해주세요.

```javascript
// webpack.config.js
module.exports = {
  mode: 'development',
  // 기존과 동일
};
```

다시 빌드를 해보면 경고 문장이 사라지는 걸 볼 수 있어요.


## 다음 단계

이제 웹팩을 사용해서 첫 번째 번들을 만들었어요! 비록 현재는 단순한 설정이지만, 이것이 더 복잡한 애플리케이션을 구축하는 기초가 될 거예요.
다음 단계에서는 코드를 더 효율적으로 구조화하고, CDN 대신 npm으로 외부 라이브러리를 관리하는 방법을 배워볼게요. 
