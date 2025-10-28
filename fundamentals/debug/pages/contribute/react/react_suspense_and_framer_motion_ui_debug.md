# React Suspense와 framer-motion useAnimate의 상호작용으로 인한 UI 충돌 디버깅

## 진단하기

비즈니스 앱에서 사이드바 메뉴를 클릭하여 페이지를 이동할 때, 이전 URL의 메뉴에 `active` CSS가
남아있는 현상이 발생했어요. 또한 `hover` style도 일부분만 작동하는 이상한 동작을 보였어요.

![](../../../images/contribute/react/react_suspense_and_framer_motion_ui_debug/1.gif)


### 컴포넌트 구조
```jsx
<Route
  path="/consumer-report"
  element={
    <SidebarLayout sidebar={<BusinessGroupSidebar />} contentMaxWidth="800px">
      <ConsumerReportPage />
    </SidebarLayout>
  }
/>
```

`BusinessGroupSidebar`에서 TDS의 `sidebar.menuItem`을 사용하는데, URL에 맞춰 `active` 스타일을
주고, `hover` 시에도 스타일을 주고 있었어요. 그런데 URL이 바뀌었는데도 이전 메뉴의 스타일이
그대로 남아있는 문제가 발생했어요.

## 재현하기

문제 재현 과정:

1. 사이드바에서 특정 메뉴 클릭
2. URL이 변경됨
3. 이전 URL의 메뉴에 `active` CSS가 여전히 남아있음
4. 새로운 메뉴의 `hover` 애니메이션도 일부만 작동

디버깅 과정:

처음에는 UI 에러다 보니 콘솔에 에러가 발생하는 것도 아니었고, 하필 `hover` 스타일과 `active`
스타일이 거의 흡사해서 무엇이 문제인지 파악하는 데 시간이 오래 걸렸어요. UI를 다르게 만들어서
어떤 부분이 문제인지 명확히 파악했어요.

근본 원인:

`BusinessGroupSidebar` 내의 `sidebar.menuItem` 컴포넌트에서 **framer-motion의 useAnimate**를
사용하여 ``hover`` 애니메이션을 실행하고 있었어요.

문제는 URL이 바뀔 때 컴포넌트 내에서 `useSuspenseQuery`를 사용하는데, 이때 suspend가 걸렸을 때
`useAnimate` 동작이 멈춰버리는 것이었어요.

더 구체적으로 파악한 원인:

- `Suspense`를 `ConsumerReportPage`안에서 설정하지 않고, 최상단에서 걸리도록 했어요
- `suspend`가 되면 `Layout` 전체가 언마운트됨
- 이로 인해 `useAnimate` 컨텍스트가 완전히 손실되어, 애니메이션이 중단된 상태로 남게 돼요

## 수정하기

여러 해결 방법을 시도했어요:

시도 1: 메뉴에 `key`를 주어 강제 리렌더링

```jsx
// 메뉴 깜빡임 발생
<MenuItem key={url} /> 
```

![](../../../images/contribute/react/react_suspense_and_framer_motion_ui_debug/2.gif)


시도 2: Suspense 위치 변경 (최종 해결책)

```jsx
// 수정 전: Layout 전체가 Suspense로 감싸짐
<Suspense fallback={<Loading />}>
  <SidebarLayout sidebar={<BusinessGroupSidebar />}>
    <ConsumerReportPage />
  </SidebarLayout>
</Suspense>

// 수정 후: ConsumerReportPage 내부에만 Suspense 적용
<SidebarLayout sidebar={<BusinessGroupSidebar />}>
  <ConsumerReportPage>
    <Suspense fallback={<Loading />}>
      {/* 페이지 내용 */}
    </Suspense>
  </ConsumerReportPage>
</SidebarLayout>
```
![](../../../images/contribute/react/react_suspense_and_framer_motion_ui_debug/3.gif)


이렇게 `Suspense`를 `ConsumerReportPage`안에 넣어서 `Layout` 전체가 언마운트되지 않도록 했어요.
이제 페이지 전환 시에도 `BusinessGroupSidebar`는 유지되고, `useAnimate` 컨텍스트가 손실되지
않아서 문제가 완전히 해결되었어요!


## 재발방지하기

TDS 패키지 내부에서 이 문제를 해결할 수 있는 방법이 있는지 파악 중이에요.

### Suspense 경계 설정의 중요성

React의 `Suspense`는 어디에 배치하느냐에 따라 언마운트되는 범위가 달라져요. `Layout`이나
`Navigation`같이 항상 유지되어야 하는 컴포넌트는 `Suspense` 경계 밖에 두어야 해요. 특히
애니메이션이나 상태를 가진 컴포넌트는 예기치 않게 언마운트되면 문맥이 손실될 수 있으므로,
`Suspense` 경계를 신중하게 설정해야 해요.

### framer-motion useAnimate와 컴포넌트 생명주기

`framer-motion`의 `useAnimate`는 컴포넌트가 언마운트되면 애니메이션 컨텍스트가 사라져요.
`Suspense`, `ErrorBoundary`, `React Router`등 컴포넌트를 언마운트시킬 수 있는 요소들과 함께 사용할
때는 생명주기를 면밀히 고려해야 해요.