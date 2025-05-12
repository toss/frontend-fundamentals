# 번들 분석

번들 분석(Bundle Analysis)은 번들의 크기와 구성 요소를 시각화해 불필요한 코드와 라이브러리를 제거하는 최적화 방법이에요. 
번들이 크면 로딩이 느려지고 성능이 떨어지므로, 번들 분석을 통해 문제를 찾아 성능을 높일 수 있어요.

![](/images/bundle-analyzer.png)

이제 번들 분석 도구를 설치해 볼게요.

## 사전 준비: 번들 분석 도구 설치

번들 분석을 하려면 사용하는 번들러에 맞는 도구를 설치하세요.

| 번들러     | 설치 명령어                                            |
| ------- | ------------------------------------------------- |
| Webpack | `npm install --save-dev webpack-bundle-analyzer`  |
| Vite    | `npm install --save-dev rollup-plugin-visualizer` |
| Esbuild | `npm install --save-dev esbuild-analyzer`         |

설치가 끝났다면 각 번들러의 설정 방법을 확인하세요.

### Webpack 설정 예시

Webpack Bundle Analyzer의 주요 옵션은 다음과 같아요.

* `analyzerMode: 'server'`: 로컬 서버에서 분석 결과를 보여줘요.
* `openAnalyzer: true`: 브라우저에서 자동으로 분석 페이지를 열어줘요.

```javascript
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

### Vite 설정 예시

Rollup Visualizer의 주요 옵션은 다음과 같아요.

* `open: true`: 빌드 후 자동으로 분석 결과를 브라우저에서 열어줘요.
* `filename`: 분석 결과 파일을 저장할 위치를 지정해요.
* `template`: 결과 시각화 형태(예: 'treemap', 'sunburst', 'network')를 선택해요.

```javascript
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    visualizer({
      open: true,
      filename: 'dist/stats.html',
      template: 'treemap',
    }),
  ],
});
```

### Esbuild 설정 예시

```javascript
const esbuild = require('esbuild');
const { analyzeMetafile } = require('esbuild-analyzer');

esbuild.build({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  metafile: true,
  outfile: 'dist/bundle.js',
}).then(async (result) => {
  const analysis = await analyzeMetafile(result.metafile);
  console.log(analysis);
});
```

## 번들 분석 결과 활용하기

번들 분석 결과를 바탕으로 번들의 크기를 줄이고 성능을 개선할 수 있어요.

### 📦 불필요한 라이브러리 제거하기

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

### 🔍 부수 효과(side-effect) 관리하기

부수 효과가 있는 모듈은 트리 셰이킹 대상에서 제외돼요. 순수 모듈만 남겨 번들을 최적화하세요.

* webpack의 `webpack-cli --json` 또는 `StatsWriterPlugin`을 이용해 Side Effect 모듈을 찾으세요.
* `package.json`의 `sideEffects: true` 필드를 설정해 Side Effect가 없는 모듈만 남기세요.

---
