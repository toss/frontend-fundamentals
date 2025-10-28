# Android에서 React Native 번들 로딩 시 SIGBUS 크래시 발생

<br/>
<ContributorHeader name="김희철" githubUrl="https://github.com/heecheolman" avatar="https://ca.slack-edge.com/E01JAGTHP8R-U01JVCVAP41-ea9f13e55dd5-512" />


## 진단하기

Android에서 React Native 번들을 불러오는 과정에서 앱이 크래시되는 현상이 발생했어요. 에러
이름은 `SIGBUS`였고, 항상 발생하는 것이 아니라 특정 상황에서만 발생하는 간헐적인 문제였어요.

### React Native 번들 캐시 시스템

토스 앱에서는 React Native 번들을 효율적으로 관리하기 위해 캐시 시스템을 사용하고 있어요:

- 번들 캐시는 `cache/toss_react_bundle_cache` 디렉토리에 저장돼요
    - 예: `cache/toss_react_bundle_cache/insurance-ads`
- 실행 가능한(실행 중인) 번들은 `cache/toss_react_bundle_cache/execute/*` 에 저장돼요
    - 예: `cache/toss_react_bundle_cache/execute/insurance-ads`

### 번들 캐시 동작 방식

1. 로컬에서 번들 찾기 및 검증 (`maxAge`, 시그니처 검증)
2. 검증 성공 시 캐시 디렉토리에서 `execute` 디렉토리로 복사
3. 백그라운드에서 `remote` 번들 확인
- `304 not modified`면 메타 파일만 업데이트
- 수정되었다면 `.pending_activation suffix`로 저장
4. 특정 조건이 되면 `.pending_activation` 파일을 `active` 상태로 전환

문제는 이 과정에서 이미 실행되고 있는 번들 파일에 동시에 write 작업이 발생하면서 `SIGBUS`
크래시가 발생한다는 것이었어요.

## 재현하기

### 재현 조건

Android 버그 리포트에서 발생한 userNo를 키바나(토스의 로그 추적 시스템)에서 찾아, 해당 사용자의 앱 이벤트 로그를
분석했어요. 어떤 서비스에서 어떤 행동을 하다가 크래시가 발생했는지 추적하여 재현에
성공했어요.

### 원인 파악

1. `cache/toss_react_bundle_cache/execute/insurance-ads` 번들이 이미 실행 중
2. 동시에 같은 파일에 write 작업이 발생
3. 물리적으로 격리하거나 파일명을 다르게 하면 발생하지 않음을 확인
4. 결론: File I/O 과정에서 발생한 동시성 이슈

### 추가 발견 사항

한 번 크래시가 발생하면 이후에는 발생하지 않는 특이한 패턴이 있었어요. 이유를 분석해보니:

- `maxAge가` 0이어서 항상 remote에서 번들을 받고 있었어요
- `verify` 로직에서 `maxAge`가 0이면 항상 `null`을 반환하고, 그래서 항상 remote에서 불러오게 돼요
- 초기 설계에서는 하루 캐시가 기본값이었고, 튜바 변수 `reactNative.scheme.maxage`를 참조해야
했어요
- 그런데 언젠가부터 이 튜바 변수가 사라져서 `maxAge`가 0으로 설정되고 있었어요

## 수정하기

문제의 핵심은 이미 사용 중인(use) 번들 파일에 다시 쓰기(write) 작업을 시도하는 것이었어요.
번들 파일이 이미 존재하는 경우에는 다시 쓰지 않도록 방어 로직을 추가했어요

```jsx
// 기존 코드: 무조건 파일 쓰기
execFile.write(...)

// 수정된 코드: 파일이 없는 경우에만 쓰기
if (!execFile.exists()) {
execFile.write(...)
}
```

이 간단한 조건문 추가로 크래시가 발생하지 않게 되었어요. 이미 execute 디렉토리에 번들이
존재한다면, 해당 번들이 실행 중일 가능성이 높으므로 덮어쓰지 않도록 한 거예요.

## 재발방지하기

### 간헐적 크래시의 재현 전략

항상 발생하는 버그가 아닌 특정 상황에서만 발생하는 간헐적 크래시는 재현이 어려워요. 이 경우
버그 리포트에서 발생한 사용자의 이벤트 로그를 키바나에서 추적하여 사용자의 행동 패턴을
분석하는 것이 효과적이에요. 어떤 서비스에서 어떤 행동을 했는지 파악하면 재현 가능성이
높아져요.

### 설정 변수 관리의 중요성

`maxAge` 튜바 변수가 사라지면서 의도하지 않게 0으로 설정된 것처럼, 외부 설정 변수에 의존하는
코드는 해당 변수가 삭제되거나 변경될 경우를 대비해야 해요. 기본값(`fallback`)을 명시적으로
설정하거나, 변수가 없을 때의 동작을 문서화해두는 것이 중요해요.

### 물리적 격리를 통한 문제 범위 좁히기

파일 이름을 다르게 하거나 물리적으로 격리시켰을 때 크래시가 발생하지 않는다는 것을 확인하여,
동시성 이슈임을 명확히 파악할 수 있었어요. 이처럼 문제를 격리시켜보는 실험은 원인을 빠르게
좁혀나가는 데 유용한 기법이에요.