# Safari에서 TradingView iframe 메모리 누수 현상 디버깅

<br/>
<ContributorHeader name="서상희" githubUrl="https://github.com/tbvjaos510" avatar="https://ca.slack-edge.com/E01JAGTHP8R-U077KGSAD4N-768549fffdd5-512" />

## 진단하기

iOS Safari에서만 발생하는 메모리 누수 문제가 발견되었어요. TradingView 차트를 사용하는
iframe이 제거된 후에도 메모리에서 해제되지 않고 계속 쌓이는 현상이 발생했어요.

이 문제는 다른 브라우저에서는 발생하지 않고 오직 iOS Safari 환경에서만 나타났기 때문에,
Safari의 특수한 메모리 관리 방식이나 버그와 관련이 있을 것으로 추정되었어요.

### 기술적 원인 분석

심층 분석 결과, TradingView 내부에서 사용하는 `AbortController`가 다음과 같은 방식으로 문제를
일으킨다는 것을 밝혀냈어요:

```jsx
const controller = new AbortController();
const handler = () => { ... };
controller.signal.addEventListener('abort', handler);
```

TradingView 내부에서 이렇게 `AbortController`를 사용한 후, abort()가 호출되지 않은 상태로
코드가 종료되면 Safari에서 메모리에 계속 남게 되고, TradingView가 닫히더라도 메모리가
해제되지 않았어요.

더 깊이 파고들어 `WebKit`의 소스 코드를 분석한 결과, [이 함수](https://github.com/WebKit/WebKit/blob/main/Source/WebCore/bindings/js/JSAbortSignalCustom.cpp#L45-L62)가 핵심이었어요. 이 함수는
해당 객체를 메모리에 남겨야 하는지 여부를 판단하는데, aborted되지 않은 상태에서 이벤트
리스너가 있으면 무조건 reachable하다고 판단해요. 즉, 이벤트 리스너를 해제하지 않으면 영원히
메모리에 남아있게 되는 거예요.

흥미로운 점은 비슷한 API인 `XMLHttpRequest`는 다르게 동작한다는 거예요. `XMLHttpRequest`는 [이렇게 동작해요](https://github.com/WebKit/WebKit/blob/main/Source/WebCore/xml/XMLHttpRequest.cpp#L1210-L1228). `XMLHttpRequest`는 API를 호출하면 성공이든 실패든 언젠가 완료 상태가 되어 GC가 되지만,
`AbortSignal`은 `abort()`가 호출되지 않고 코드가 끝나는 경우가 발생할 수 있어서 이런 문제가 생긴
거예요.

사실 `AbortController` 객체 하나만 메모리에 남아있다면 큰 문제가 아닐 수 있어요. 하지만 우리
경우에는 TradingView iframe 내부에서 `AbortController`를 사용하고 있어서, iframe 전체가
해제되지 않는 심각한 문제로 이어졌어요.

## 재현하기

메모리 누수를 재현하고 확인하기 위해 다음과 같은 방법을 사용했어요:

### 재현 조건

1. TradingView 차트가 포함된 iframe을 생성
2. 해당 iframe을 제거
3. 위 과정을 반복

### 디버깅 도구 활용

- JavaScript의 `WeakRef`를 사용하여 객체가 메모리에서 실제로 해제되는지 추적했어요
- Safari 개발자 도구의 메모리 프로파일러를 통해 메모리 누수를 명확히 확인했어요

## 수정하기

문제를 해결하기 위해 단계적으로 접근했어요

### 1단계

임시 해결책 (긴급 대응)문제가 되는 코드는 TradingView의 내부 코드였기 때문에 직접 수정할 수 없었어요. 급한 대로 `AbortController`의 폴리필을 주입하여 Safari의 버그를 우회하는 방식으로 임시 해결했어요. 이를 통해 사용자들이 겪는 메모리 누수 문제를 빠르게 완화할 수 있었어요.

### 2단계

근본적인 해결책하지만 폴리필은 어디까지나 임시방편일 뿐이에요. 근본적인 문제를 해결하기 위해 Safari의 렌더링 엔진인 `WebKit`의 소스 코드를 직접 분석했어요.
그리고 `WebKit` 저장소에 직접 [Pull Request](https://github.com/WebKit/WebKit/pull/50419%EB%A5%BC)를 제출하여 `AbortController`의 메모리 누수 문제를 브라우저 엔진 레벨에서 해결했어요.

### 올바른 AbortController 사용법

WebKit 구현을 바꾸지 않고 `AbortSignal`을 안전하게 사용하려면 다음과 같이 해야 해요

```jsx
const controller = new AbortController();
const handler = () => console.log("aborted");
controller.signal.addEventListener("abort", handler);

// 사용 후 반드시 다음 중 하나를 수행
controller.signal.removeEventListener("abort", handler); // 이벤트 리스너 제거
// 또는
controller.abort(); // abort 명시적 호출
```

이벤트 리스너를 제거하거나 abort()를 명시적으로 호출해줘야만 메모리가 정상적으로 해제돼요.

## 재발방지하기

### 메모리 모니터링

서드파티 라이브러리의 메모리 관리 모니터링 TradingView처럼 직접 수정할 수 없는 서드파티
라이브러리를 사용할 때는, 특히 iframe과 같은 무거운 리소스를 다루는 경우 메모리 누수에 대한
지속적인 모니터링이 필요해요. `WeakRef`와 메모리 프로파일러를 활용한 정기적인 점검을 통해
문제를 조기에 발견할 수 있어요.

### 브라우저별 동작 테스트

Chrome에서 잘 작동한다고 해서 Safari에서도 동일하게 동작한다고
가정하면 안 돼요. 특히 메모리 관리, 가비지 컬렉션과 관련된 기능은 브라우저마다 구현 방식이
다를 수 있으므로, iOS Safari를 포함한 다양한 환경에서 테스트가 필수예요.

### 오픈소스 기여

오픈소스 기여를 통한 근본 해결문제의 근본 원인이 브라우저 엔진이나 오픈소스 라이브러리에
있다면, 폴리필이나 workaround로 임시 해결하는 것에 그치지 말고 해당 프로젝트에 직접 기여하는
것을 고려해야 해요. 이를 통해 같은 문제를 겪는 전 세계 개발자들에게 도움을 줄 수 있고,
장기적으로는 더 안정적인 생태계를 만들 수 있어요.
