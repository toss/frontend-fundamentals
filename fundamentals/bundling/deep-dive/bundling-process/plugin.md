# 플러그인

플러그인(Plugin)은 번들링 과정에서 모듈을 추적하고 변환하는 흐름에 맞춰 추가 작업을 수행하는 도구예요.
경로 탐색(Module Resolution), 변환(Transformation), 출력(Output) 같은 다양한 단계에서 동작하며, 파일을 수정하거나 생성하고, 최종 빌드 결과를 최적화할 수 있어요.

다음과 같이 사용할 플러그인을 번들러 설정 파일의 `plugins` 필드에 배열로 정의하면 돼요.

:::tabs key:bundler-plugins-setup

=== Webpack

```tsx
// webpack.config.js
const { HotModuleReplacementPlugin, DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new HotModuleReplacementPlugin(),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      VERSION: JSON.stringify('1.0.0'),
    }),
  ],
};
```

=== Vite

```ts
// vite.config.js
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [
    createHtmlPlugin({
      minify: true,
      entry: 'src/index.tsx',
      template: 'src/index.html',
    }),
  ],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    VERSION: JSON.stringify('1.0.0'),
  },
});
```

:::


## 주요 플러그인

개발할 때 자주 사용하는 플러그인을 소개할게요. 공개된 플러그인은 `npm`이나 `yarn`으로 설치한 후, `plugins` 필드에 정의해 사용할 수 있어요.

### `HtmlWebpackPlugin`

웹팩이 빌드한 JavaScript 및 CSS 파일이 포함된 `index.html`을 자동으로 생성해요.  
템플릿 파일을 지정하면 해당 파일을 기반으로 HTML을 생성할 수 있어요.

### `HotModuleReplacementPlugin`

애플리케이션이 실행 중일 때 변경된 모듈만 갱신하는 [HMR](../dev/hmr.md) 기술 제공해요. 개발 중 코드 변경 시 브라우저를 새로고침하지 않고도 최신 상태를 유지할 수 있어요.

### `DefinePlugin`

빌드 시점에 전역 상수를 정의할 수 있는 플러그인이에요. `process.env.NODE_ENV`와 같은 환경 변수를 설정하거나, 빌드 정보(버전 등)를 코드에 삽입할 때 사용해요.  
웹팩 5부터는 런타임 값을 주입하는 기능도 제공돼요.

## 예제: HTML 생성 플러그인의 동작 방식

다음은 빌드 과정에 로그를 남기고, `index.html`을 생성하는 `HtmlBuildPlugin`의 동작방식이예요.

```tsx
class HtmlBuildPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    // 빌드 시작 전 확인
    compiler.hooks.beforeRun.tapAsync(
      "HtmlBuildPlugin",
      (compiler, callback) => {
        console.log("HTML 생성 빌드를 시작합니다...");
        callback();
      }
    );

    // `compilation` 단계에서 기본 정보 확인
    compiler.hooks.compilation.tap("HtmlBuildPlugin", (compilation) => {
      console.log("HTML 템플릿 컴파일 준비중...");
    });

    // `emit` 단계에서 실제 HTML 생성
    compiler.hooks.emit.tapAsync("HtmlBuildPlugin", (compilation, callback) => {
      const { title, bundle } = this.options;

      const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>${title}</title>
          </head>
          <body>
            <div id="app"></div>
            <script src="${bundle}"></script>
          </body>
        </html>
      `.trim();

      compilation.assets["index.html"] = {
        source: () => htmlContent,
        size: () => htmlContent.length,
      };

      // 다음 hook 진행
      callback();
    });

    // 빌드 완료 후 결과 확인
    compiler.hooks.done.tap("HtmlBuildPlugin", (stats) => {
      console.log(`HTML 생성 완료! (${stats.endTime - stats.startTime}ms)`);
    });
  }
}

module.exports = HtmlBuildPlugin;
```

다음과 같이 구현한 플러그인을 추가하여 빌드 과정에 로그를 남기고, `index.html`을 생성할 수 있어요.

```jsx
// webpack.config.js
plugins: [
  new EnhancedHtmlPlugin({ title: "my-app", bundle: "index_bundle.js" }),
],
```

## 플러그인의 구조와 동작 원리

제공하는 플러그인뿐만 아니라, 필요에 따라 커스텀 플러그인을 만들어 빌드 과정에서 원하는 작업을 추가하거나 기존 기능을 확장할 수 있어요. 플러그인이 어떻게 동작하는지 이해하면, 웹팩과 플러그인이 상호작용하는 원리를 더 쉽게 파악할 수 있어요.

플러그인은 기본적으로 클래스로 작성돼요. 다음은 클래스로 작성한 간단한 커스텀 플러그인 예시예요.

```js
class MyPlugin {
  // 외부에서 생성자를 통해 옵션을 주입받을 수 있어요.
  constructor(options) {
    this.options = options;
  }

  // 웹팩이 플러그인을 실행할 때 호출돼요.
  apply(compiler) {
    console.log("MyPlugin이 실행되었어요!");
    compiler.hooks.emit.tap("ExamplePlugin", (params) => {
      //
    });
  }
}

module.exports = MyPlugin;
```

<b>`compiler.Hooks`</b>는 **웹팩의 빌드 과정에서 특정 시점마다 실행되는 이벤트**[(라이프 사이클 훅)](https://webpack.kr/api/compiler-hooks/#hooks)를 제공하는 객체예요.

> `compiler.hooks.afterPlugins`, `compiler.hooks.beforeRun`, `compiler.hooks.watchRun`, `compiler.hooks.done`, `compiler.hooks.emit` ...

플러그인에서 라이프사이클 훅을 설정하면, 웹팩이 번들링을 진행하는 특정 시점에 자동으로 호출돼요.  
훅이 실행될 때 웹팩이 전달하는 객체에는 현재 컴파일 상태나 출력 결과에 대한 정보가 포함되어 있어요.  
이를 활용하면 빌드 과정에서 원하는 작업을 수행하거나, 결과를 변경할 수도 있어요.

## 다음 단계
플러그인을 사용해서 번들링 과정을 유연하게 제어할 수 있게 됐어요.
이제 경로 탐색 결과를 바탕으로, 실제로 브라우저가 실행할 수 있는 최종 번들 파일을 생성하는 **출력** 단계로 넘어가 볼게요.

출력 단계에서 번들러는 이전 단계에서 만들어진 모듈 맵을 활용해, 하나의 파일(또는 여러 청크 파일)로 코드를 묶어 최종 결과물을 만듭니다.