# 번들 분석

번들 분석(Bundle Analysis)은 번들의 크기와 구성 요소를 시각화해 불필요한 코드와 라이브러리를 제거하는 최적화 방법이에요. 

번들이 크면 로딩이 느려지고 성능이 떨어지기 때문에, 번들 분석을 사용해 문제를 찾고 성능을 높일 수 있어요.

![](/images/bundle-analyzer.png)

## 사전 준비: 번들 분석 도구 설치

먼저 번들 분석 도구를 설치해 볼게요.

:::tabs key:bundler-analyzer

== Webpack

**번들 분석 설정**

* `webpack-bundle-analyzer`를 사용해 번들 크기를 시각화할 수 있어요.
* 주요 옵션

  * `analyzerMode: 'server'`: 로컬 서버에서 분석 결과를 보여줘요.
  * `openAnalyzer: true`: 빌드 후 자동으로 브라우저를 열어줘요.

**설치 방법**

```bash
npm install --save-dev webpack-bundle-analyzer
```

**설정 예시**

```js
// webpack.config.js
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      openAnalyzer: true,
    }),
  ],
};
```

== Vite

**번들 분석 설정**

* `rollup-plugin-visualizer`를 사용해 번들 구성을 시각화할 수 있어요.
* 주요 옵션

  * `open: true`: 빌드 후 분석 결과를 브라우저에서 자동으로 열어요.
  * `filename`: 결과 파일 저장 위치를 지정할 수 있어요.
  * `template`: 시각화 형태(`treemap`, `sunburst`, `network`)를 선택할 수 있어요.

**설치 방법**

```bash
npm install --save-dev rollup-plugin-visualizer
```

**설정 예시**

```js
// vite.config.js
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  build: {
    rollupOptions: {
      plugins: [
        visualizer({
          open: true,
          filename: 'dist/stats.html',
          template: 'treemap',
        }),
      ],
    },
  },
});
```

== Esbuild

**번들 분석 설정**

* `esbuild-analyzer`를 사용해 메타파일을 분석할 수 있어요.
* 결과를 콘솔에 출력해 번들 크기와 구성을 확인할 수 있어요.

**설치 방법**

```bash
npm install --save-dev esbuild-analyzer
```

**설정 예시**

```js
// 분석 스크립트 예시
const esbuild = require('esbuild');
const { analyzeMetafile } = require('esbuild-analyzer');

esbuild.build({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  metafile: true,
  outfile: 'dist/bundle.js',
}).then((result) => analyzeMetafile(result.metafile));
```

:::

도구를 설치하고 설정을 완료했다면, 실제로 번들을 분석한 결과를 확인할 수 있어요.  
분석 결과를 보면, 어떤 모듈이 번들 크기에 많이 기여하고 있는지, 중복되거나 최적화되지 않은 부분이 있는지를 한눈에 파악할 수 있어요.

## 번들 분석 결과 활용하기

분석 결과를 바탕으로, 번들 크기를 줄이고 성능을 개선하는 방법을 살펴볼게요.

### 불필요한 라이브러리 제거하기

#### 가벼운 라이브러리 사용

전체 기능을 다 쓰지 않는 큰 라이브러리는 가벼운 라이브러리로 바꾸세요.

```bash
# moment.js → dayjs, date-fns로 교체
npm install dayjs date-fns

# lodash → es-toolkit으로 교체
npm install es-toolkit
```

#### 중복 모듈 제거하기

중복 설치된 모듈을 제거해 번들 크기를 줄이세요.

```bash
# npm 사용 시
npm dedupe

# yarn 사용 시 (Yarn v2 이상)
yarn dedupe
```

#### 설치 전 패키지 크기 확인하기

[Bundle Phobia](https://bundlephobia.com/)에서 패키지 크기를 확인하고 설치를 결정하세요.

### 부수 효과(side-effect) 관리하기

부수 효과가 있는 모듈은 트리 셰이킹 대상에서 제외돼요. 순수 모듈만 남겨 번들을 최적화하세요.

* 웹팩의 `webpack-cli --json` 또는 `StatsWriterPlugin`을 이용해 Side Effect 모듈을 찾으세요.
* `package.json`의 `sideEffects: true` 필드를 설정해 Side Effect가 없는 모듈만 남기세요.


