# 로더

로더(Loader)는 웹팩이 JavaScript 파일이 아닌 CSS, 이미지 등의 리소스를 JavaScript로 변환해, 모듈처럼 불러올 수 있도록 도와주는 도구예요.

예를 들어, 다음과 같이 JavaScript 파일에서 CSS를 `import`하는 코드를 작성해본 경험이 있을 거예요.

```jsx
// Main.tsx
import "./main.css";

export function Main() {
  return <div>hello!!</div>;
}
```

코드상으로는 문제가 없어 보이지만, 웹팩은 기본적으로 JavaScript만 해석할 수 있어요.
따라서 웹팩이 `.css` 파일은 처리하지 못해 다음과 같은 에러가 발생해요.

> Module parse failed: Unexpected token (1:5)
> You may need an appropriate loader to handle this file type, currently no
> loaders are configured to process this file.

이 문제를 해결하려면 웹팩이 CSS 파일을 처리할 수 있도록 `css-loader`를 추가해야 해요.
웹팩 설정 파일에서 `rules` 필드에 확장자와 사용할 로더를 지정하면 정상적으로 빌드되어 스타일이 적용돼요.

```js{7}
// webpack.config.js
module.exports = {
  //...
  rules: [
    {
      test: /\.css$/,
      use: "css-loader",
    },
  ],
};
```

이 설정을 적용하면 CSS 파일이 `css-loader`를 통해 변환된 후 번들에 포함돼요. 다음은 `css-loader`를 적용돼 변환된 코드의 일부예요.

```js{4,5,6}
___CSS_LOADER_EXPORT___.push([
  module.id,
  `body {
    padding: 0;
  }`,
  "",
]);
```

## 주요 로더

리액트 프로젝트를 구성할 때 자주 사용하는 로더를 소개해요.

### `babel-loader`

최신 JavaScript, 타입스크립트, JSX를 구형 브라우저에서도 동작하는 JavaScript로 변환하는 로더예요.

- **JSX 변환**: React의 JSX 문법을 브라우저가 이해할 수 있는 JavaScript로 변환

  `<Component />` → `React.createElement(Component)`

- **JavaScript 변환**: 최신 JavaScript 문법을 구형 브라우저에서 실행 가능한 코드로 변환

  `const`, `async/await`, `옵셔널 체이닝(obj?.prop)`, `null 병합 연산자(??)`

- **타입스크립트 변환**: 타입스크립트 코드를 JavaScript로 변환

다음과 같이 `babel-loader`를 사용해 `.js` 또는 `.jsx` 파일을 변환하도록 설정할 수 있어요. `presets`은 여러 개의 플러그인을 한 번에 적용할 수 있도록 도와주는 옵션이에요.

```js{11-13}
// webpack.config.js
module.exports = {
  //...
  rules: [
    {
      test: /\.(js|jsx)$/,
      use: {
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env", // 구형 브라우저가 지원되는 JavaScript 문법으로 변환
            "@babel/preset-react", // JSX → JavaScript
            "@babel/preset-typescript", // 타입스크립트 → JavaScript
          ],
        },
      },
    },
  ];
};
```

### `css-loader`

CSS 파일을 웹팩이 처리할 수 있도록 변환하는 로더예요. 로더를 사용하면 JavaScript에서 CSS 파일을 `import`하여 사용할 수 있어요.
단독으로는 DOM에 스타일을 적용할 수 없으며, `style-loader`와 함께 사용해요.

### `style-loader`

`css-loader`로 변환된 JavaScript 모듈을 DOM의 `<style>` 태그에 삽입해 스타일을 적용하는 로더예요.

### `file-loader`

이미지, 폰트 같은 정적 파일을 웹팩이 번들링할 수 있도록 파일로 저장하고, URL로 변환하는 로더예요.  
이렇게 변환된 URL을 JavaScript 코드에서 `import`하여 사용할 수 있어요.

다음과 같이 `file-loader`를 설정하면 이미지 파일을 처리할 수 있어요.

```js{6-14}
// webpack.config.js
module.exports = {
  //...
  rules: [
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]",
          },
        },
      ],
    },
  ],
};
```

::: tip 정적 리소스의 타입 오류 방지하기

이미지, 폰트 같은 정적 파일을 `import`하면 타입 오류가 발생할 수 있어요.  
이를 방지하려면 해당 파일 확장자에 대한 타입 정의를 추가해야 해요.

다음과 같이 `.d.ts` 파일을 추가하고, 다음과 같이 정의하세요.

```ts
// global.d.ts
declare module "*.svg" {
  const value: string;
  export default value;
}
```

그리고 `tsconfig.json`의 `include` 항목에 타입을 정의해주면 돼요.

```json
// tsconfig.json
{
  "include": ["global.d.ts"]
}
```

:::

## 로더 설정

웹팩에서 로더를 설정할 때는 파일 확장자별로 어떤 로더를 사용할지 지정해야 해요.
이 설정을 기반으로 웹팩은 번들링 전에 파일 확장자를 확인하고, 해당 파일에 적절한 로더를 적용해 변환할 수 있어요.

### 확장자 검사하기: [`test`](https://webpack.kr/configuration/module/#ruletest)

`test`는 어떤 파일에 로더를 적용할지 확장자로 지정하는 옵션이에요.
다음과 같이 작성하면 `test` 규칙에 걸리는 `.css` 확장자는 `css-loader`를 사용하여 변환해요.

```jsx
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/, // .css 확장자에만 적용
        use: "css-loader", // css-loader 사용
      },
    ],
  },
};
```

### 사용할 로더 지정: [`use`](https://webpack.kr/configuration/module/#ruleuse)

`use` 옵션은 **해당 파일을 처리할 로더를 지정**하는 역할을 해요.

예를 들어, `.css` 파일을 처리하려면 `css-loader`를 `use` 옵션에 지정하면 돼요.

```js{6}
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: "css-loader",
      },
    ],
  },
};
```

하나의 파일에 여러 로더를 사용해야 할 때는, `use` 옵션을 문자열이 아닌 **배열**로 지정하면 돼요. 이때 배열의 오른쪽에서 왼쪽 순서로 로더가 실행되기 때문에 실행 순서를 올바르게 지정해야 해요.

### 문제 해결하기: 로더 여러 개 사용하기

만약 로더의 순서를 잘못 정의하면 웹팩이 파일을 제대로 처리하지 못해 에러가 발생할 수 있어요. 예를 들어 CSS 파일을 처리할 때 다음과 같은 순서로 로더가 실행되어야 해요.

1. `css-loader`가 먼저 실행돼 CSS 파일을 JavaScript로 변환
2. 변환된 결과를 `style-loader`가 실행해서 DOM의 `<style>` 태그에 삽입

만약 반대로 작성하면, 웹팩은 CSS 파일을 JavaScript로 변환하기 전에 CSS를 DOM에 삽입하려고 시도해 에러가 발생해요.

```js
rules: [
  {
    test: /\.css$/,
    use: ["css-loader", "style-loader"], // [!code --]
    use: ["style-loader", "css-loader"], // [!code ++]
  },
];
```

따라서 여러 개의 로더를 사용할 때는 실행 순서를 고려해 올바르게 설정해야 해요.

### 제외할 파일 지정하기: [`exclude`](https://webpack.kr/configuration/module/#ruleexclude)

`exclude`은 **로더가 처리하지 않을 파일이나 디렉토리를 지정**하는 옵션이에요.
주로 외부 라이브러리 폴더인 `node_modules`를 제외할 때 많이 사용해요.

`node_modules` 폴더에 있는 파일은 이미 빌드된 상태이거나 외부에서 제공된 코드이기 때문에, 불필요하게 다시 변환하지 않도록 설정하는 것이 일반적이에요.

```js{6}
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
};
```

### 적용할 파일 지정하기: [`include`](https://webpack.kr/configuration/module/#ruleinclude)

`include`은 **로더를 적용할 파일이나 디렉토리를 지정**하는 옵션이에요.
이 속성을 사용하면 특정 디렉토리나 파일만 로더를 통해 변환하도록 설정할 수 있어요.

다음과 같이 `src` 폴더에만 로더를 적용할 수 있어요.

```js{6}
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        use: "babel-loader",
      },
    ],
  },
};
```
