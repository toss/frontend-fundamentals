# 진입점

번들러는 진입점을 기준으로 `import`나 `require` 구문을 따라가며 연결된 모든 파일을 탐색해요.
탐색하며 수집한 파일 간 연결 관계를 정리해 의존성 그래프를 만들고, 최종적으로 실행 가능한 번들 파일을 생성해요.

## 진입점 구성 방식

진입점을 설정하는 방식에는 **단일 엔트리 구문**과 **객체 구문** 두 가지가 있어요.

두 방식의 차이를 이해하면, 프로젝트의 구조와 필요에 따라 단일 엔트리 또는 객체 구문 방식을 선택할 수 있어요.

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


## 객체 구문

여러 개의 진입점을 명시하고, 각 진입점마다 별도의 번들 파일을 생성하는 방식이에요.

객체 구문 방식을 사용하면 페이지별로 독립적인 번들링이 가능해서, 각 페이지에서 필요한 코드만 로드할 수 있어 불필요한 코드 로드를 줄이고 초기 로딩 속도를 개선할 수 있어요. 또한, 기능별로 번들 파일을 나누어 불필요한 코드 로드를 줄일 수 있어 대규모의 애플리케이션에 적합해요.

예를 들어, 사용자 페이지와 관리자 페이지를 각각 독립된 번들 파일로 분리하면, 필요할 때만 로드할 수 있어 성능이 향상돼요.

설정 파일의 `entry` 필드에서 key에 생성될 번들 파일의 이름을, value 객체에는 해당 번들 파일의 진입점과 관련된 설정을 정의할 수 있어요.

### 시작 파일 지정하기: [`import`](https://webpack.kr/concepts/entry-points/#entrydescription-object)

`import` 옵션에는 진입점으로 사용할 시작 **파일의 경로 또는 모듈**을 작성해 주세요.

예를 들어, 다음과 같이 두 개의 번들 파일의 이름과 경로를 설정해볼게요.

:::tabs key:bundler-multiple-entry-setup

=== Webpack

```tsx
// webpack.config.js
module.exports = {
  entry: {
    app: {
      import: './src/index.tsx',
    },
    adminApp: {
      import: './src/admin.tsx',
    },
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
      input: {
        app: './src/index.tsx',
        adminApp: './src/admin.tsx',
      },
    },
  },
});
```

:::


`yarn build` 명령을 실행하면, output 경로인 dist 폴더에 설정한 이름으로 두 개의 번들 파일이 생성돼요.

```text{2-3}
├─ dist
│  ├─ adminApp.js
│  └─ app.js
├─ src
│   ├─ app.tsx
│   └─ admin.tsx
├─ public
│   └─ index.html
```

![](/images/bundling/multiple-entry.png)

### 공통 모듈로 코드 중복 줄이기: [`dependOn`](https://webpack.kr/configuration/entry-context/#dependencies)

`dependOn` 옵션은 여러 진입점에서 공통 모듈을 공유할 때 사용해요. 이 옵션을 사용하면 공통 모듈이 한 번만 번들링되며, 각 진입점에서 중복으로 포함되지 않아요. 그 결과 번들 크기가 줄어들어 로딩 속도를 최적화할 수 있어요.

다음과 같이 `app`에 `dependOn` 옵션으로 `shared`를 지정하면, 공통 함수가 중복되지 않고, 별도의 shared 번들로 관리돼 번들 크기를 줄이고 성능을 높일 수 있어요.

:::tabs key:bundler-dependon-entry-setup

=== Webpack

```js
const path = require('path');

module.exports = {
  entry: {
    app: {
      import: './src/index.tsx',
      dependOn: 'shared',
    },
    shared: {
      import: './src/shared.js',
    },
  },
};
```

=== Vite

```ts
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        app: './src/index.tsx',
        shared: './src/shared.js',
      },
      output: {
        manualChunks: {
          shared: ['./src/shared.js'],
        },
      },
    },
  },
});
```

:::

![](/images/bundling/depend-on.png)