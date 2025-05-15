# 진입점

번들링을 시작하려면, 먼저 어디서부터 애플리케이션 코드를 읽어야 할지를 정해야 해요.
이 출발점이 바로 진입점(Entry Point)예요.

진입점은 번들러가 애플리케이션을 분석하기 시작하는 최초의 파일이에요.
번들러는 진입점을 기준으로 `import`나 `require` 구문을 따라가며 연결된 모든 파일을 탐색해요.
탐색하며 수집한 파일 간 연결 관계를 정리해 의존성 그래프를 만들고, 최종적으로 실행 가능한 번들 파일을 생성해요.

## 구문 방식 비교

진입점을 설정하는 방식에는 **단일 엔트리 구문**과 **객체 구문** 두 가지가 있어요.

둘 간의 차이를 이해하면 프로젝트의 구조와 필요에 따라 단일 엔트리 또는 객체 구문 방식을 선택할 수 있어요.

<!-- prettier-ignore-start -->
|            | 단일 엔트리 구문                            | 객체 구문                                 |
| ------------------  | --------------------------------------- | --------------------------------------- |
| **번들 파일 개수**     | 하나의 번들 파일                             | 여러 개의 번들 파일                        |
| **성능 영향**         | 규모가 커질수록 번들 파일이 커져 로딩 속도 저하 가능 | 필요한 코드만 로드하여 성능 최적화 가능          |
| **적합한 프로젝트 규모** | 규모가 작은 애플리케이션, 라이브러리              | 규모가 큰 애플리케이션                      |
| **사용 사례**         | 간단한 웹사이트, 라이브러리                    | 다중 페이지 애플리케이션, 기능별 번들 분리 필요 시 |
<!-- prettier-ignore-end -->

## 단일 엔트리 구문

단일 엔트리 구문(Single Entry Syntax)은 **번들 파일을 하나만 생성**하도록 진입점을 지정하는 방식이에요.

브라우저가 번들 파일을 로드할 때 파일 하나만 요청하기 때문에 설정과 관리가 간단해요.

설정 파일의 `entry` 필드에서 **문자열** 또는 **배열**을 지정하여 진입점을 설정할 수 있어요.

:::info 기본 시작 경로
진입점을 따로 설정하지 않으면, `src/index.js`파일을 기본 진입점으로 사용해요.
:::

### 문자열로 지정하기

`entry` 필드에 특정 경로를 작성하면, 해당 파일을 번들링하여 단일 번들 파일을 생성해요.

:::tabs key:bundler-single-entry-setup

=== Webpack

```tsx
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};
```

=== Vite

```ts
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: './src/index.tsx',
      output: {
        entryFileNames: 'bundle.js',
      },
    },
  },
});
```

:::

`yarn build` 명령을 실행하면, output 경로에 번들 파일이 출력된 것을 확인할 수 있어요.

```text{2}
├─ dist
│   └─ bundle.js
├─ src
│   ├─ index.tsx
│   ├─ log.js
│   └─ utils
│       └─ helper.js 
├─ public
│   └─ index.html
```

![단일 엔트리 결과물 다이어그램](/images/bundling/single-entry.png)

### 배열로 지정하기

`entry` 필드에 여러 개의 경로를 배열로 작성하면, 각 파일을 개별적으로 번들링하고 이를 하나의 단일 번들 파일로 병합해요.
주로 실행 순서를 보장해야 할 때, 배열 순서대로 로드하도록 지정할 수 있어요.

:::tabs key:bundler-multi-entry-array-setup

=== Webpack

```tsx
// webpack.config.js
const path = require('path');

module.exports = {
  entry: ['./src/index1.tsx', './src/index2.tsx'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};
```

=== Vite

```ts
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: ['./src/index1.tsx', './src/index2.tsx'],
      output: {
        entryFileNames: 'bundle.js',
      },
    },
  },
});
```

:::

`yarn build` 명령을 실행하면, output 경로에 번들 파일이 출력된 것을 확인할 수 있어요.

```text{2}
├─ dist
│   └─ bundle.js
├─ src
│   ├─ index1.tsx
│   ├─ index2.tsx
├─ public
│   └─ index.html
```

![](/images/bundling/array-entry.png)
