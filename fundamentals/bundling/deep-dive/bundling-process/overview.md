# 번들링, 꼭 필요할까요?

프로젝트 규모가 커지면 모듈 구조가 복잡해져요. 동일한 모듈을 여러 곳에서 참조하거나, 순환 참조가 발생해 실행 순서를 예측하기 어려워질 수 있어요. 만약 브라우저에서 각 모듈을 개별로 불러온다면, 모든 의존성을 직접 관리해야 하고, 이는 개발과 유지보수를 어렵게 만들어요.

번들링은 이런 복잡성을 해결하기 위한 방법이에요.
모듈 간 연결을 정리하고, 필요한 코드만 묶어 실행 흐름을 최적화해요. 덕분에 브라우저는 효율적으로 코드를 불러오고 안정적으로 실행할 수 있어요.

## 번들링 과정

번들링은 프로젝트에 흩어져 있는 모듈을 분석해, 실행에 필요한 순서와 구조를 정리하는 작업이에요.
번들러는 코드의 연결 관계를 파악하고, 이를 하나의 파일로 묶어 브라우저가 효율적으로 코드를 실행할 수 있도록 도와줘요.

이 과정은 다음 세 단계로 이루어져요.

### 1. 모듈 탐색 (Module Resolution)

번들러는 진입점(Entry Point)부터 시작해, import나 require 구문을 따라가며 연결된 모든 모듈을 탐색해요. 이 과정에서 애플리케이션 전체의 참조 구조를 파악하죠.

예를 들어, index.js에서 math.js 모듈을 가져와 사용하는 경우를 살펴볼게요.

번들러는 진입점(Entry Point)인 index.js에서 시작해, import나 require를 따라가며 연결된 모듈들을 하나씩 찾아가요.
코드 속 참조를 따라 이동하며 전체 애플리케이션이 어떤 식으로 구성되어 있는지 탐색해요.

```javascript
// index.js
import { add } from './math.js';
console.log(add(2, 3));

// math.js
export function add(a, b) {
  return a + b;
}
```

이렇게 모듈 간 연결 흐름을 수집하면, 각 파일이 어떤 파일과 연결되어 있는지 파악할 수 있어요.

### 2. 의존성 구조 정리

탐색한 정보를 바탕으로, 번들러는 의존성 그래프(Dependency Graph)를 만들어요.
이 그래프는 각 모듈이 어떤 다른 모듈에 의존하는지를 보여주고, 번들 파일 생성의 설계도가 돼요.

탐색 결과를 아래와 같은 형태로 정리할 수 있어요.
```json
{
  "index.js": {
    "dependencies": ["math.js"],
    "code": "console.log(add(2, 3));"
  },
  "math.js": {
    "dependencies": [],
    "code": "function add(a, b) { return a + b; }"
  }
}
```
정리된 객체를 보면, index.js는 math.js에 의존하고, math.js는 다른 의존성이 없음을 확인할 수 있어요.

### 3. 번들 파일 생성

마지막으로 번들러는 의존성 그래프를 바탕으로 필요한 모든 코드를 하나로 합쳐요.
이를 통해 브라우저가 여러 파일을 따로 요청하지 않고도 한 번에 코드를 불러올 수 있게 돼요.

```javascript
(function(modules) {
  function require(file) {
    const exports = {};
    modules[file](exports, require);
    return exports;
  }

  require('index.js');
})({
  'index.js': function(exports, require) {
    const { add } = require('math.js');
    console.log(add(2, 3));
  },
  'math.js': function(exports) {
    exports.add = function(a, b) {
      return a + b;
    };
  }
});
```

번들 파일은 각각의 모듈을 객체로 관리하고, require 함수를 통해 모듈 간 의존성을 연결해요. 
덕분에 브라우저는 별도의 파일 요청 없이 모든 코드를 순서대로 실행할 수 있어요.

:::details Q. 번들 파일에서는 왜 즉시 실행 함수(IIFE)를 사용할까요?
1. **스코프를 분리할 수 있어요**

   IIFE는 자체 스코프를 가지기 때문에, 내부 변수나 함수가 전역 스코프를 오염시키지 않아요.

2. **모듈 시스템을 안전하게 구성할 수 있어요**

   `require` 함수나 `modules` 객체 같은 모듈 로딩 로직을 IIFE 내부에서 정의하면 외부와 격리된 안전한 실행 환경을 만들 수 있어요.
:::

## 다음 단계

번들링은 "어디서부터 어떤 파일을 읽어야 할지"를 명확히 정하는 진입점(Entry Point) 설정에서 시작돼요.
다음 문서에서는 진입점이 번들 구조에 어떤 영향을 주는지 자세히 알아볼게요.