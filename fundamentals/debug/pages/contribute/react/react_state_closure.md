# React State Update의 비동기성과 Closure 관련 이슈 디버깅

<br/>
<ContributorHeader name="parkcoool" githubUrl="https://github.com/parkcoool" avatar="https://avatars.githubusercontent.com/u/110674777?v=4" date="2025.11.22"/>

## 증상

SNS 서비스의 피드 목록에 무한 스크롤을 구현했어요. 스크롤이 바닥에 닿으면 다음 데이터를 가져오는 기능이었는데, 스크롤을 조금만 빠르게 내리면, API 요청이 순식간에 3~4번씩 중복으로 전송되는 현상이 발생했어요. 결과적으로 받아온 데이터가 리스트에 중복으로 쌓이면서 `Warning: Encountered two children with the same key` 에러가 발생했고, 사용자 경험도 뚝뚝 끊기는 느낌이 들었죠.

## 첫 시도

이벤트가 너무 자주 발동되나 싶어서 lodash의 `throttle`을 걸어봤어요.

```tsx
const handleScroll = throttle(() => {
  // 스크롤 감지 로직
}, 500);
```

하지만 이건 `IntersectionObserver`를 사용하는 현재 로직이랑은 맞지 않았고, 오히려 사용자가 바닥에 닿았는데도 로딩이 늦게 뜨는 등 반응성만 나빠졌어요. 그다음엔 `isLoading` 상태를 만들어서 방어 코드를 짰어요.

```tsx
if (inView && !isLoading) {
  setIsLoading(true);
  fetchNextPage();
}
```

하지만 여전히 빠르게 스크롤 하면 요청이 두세 번씩 호출이 됐어요.

## 원인

로그를 찍어보고 리액트 공식 문서를 다시 보며 깨달았어요. 원인은 State Update의 비동기성과 Closure(클로저) 때문이었어요.

`setIsLoading(true)`를 호출한다고 해서 즉시 true가 되는 게 아니었어요. 리액트가 리렌더링을 스케줄링하는 그 찰나의 순간 동안, `isLoading`은 여전히 false 상태죠. 그 짧은 찰나 사이에 `IntersectionObserver`의 콜백이 한 번 더 실행되어 버린 거예요.

게다가 useEffect 안에서 생성된 옵저버 콜백 함수는 처음 생성될 당시의 isLoading 값인 false만을 기억하고 있죠.

## 해결책

리렌더링과 상관없이 즉시 값을 변경하고 참조할 수 있는 useRef를 사용해서 해결했어요.

```tsx
const isFetching = useRef(false);

const loadMore = async () => {
  if (isFetching.current) return;
  isFetching.current = true;

  try {
    const data = await api.getPosts(page);
    setPosts((prev) => [...prev, ...data]);
  } catch (e) {
    console.error(e);
  } finally {
    isFetching.current = false;
  }
};

useEffect(() => {
  if (inView) loadMore();
}, [inView]);
```

useRef의 값은 변경 즉시 반영되므로, 아무리 스크롤이 빨라도 첫 번째 요청이 시작되는 순간 `isFetching.current`가 true가 되어 후속 요청들을 확실하게 차단할 수 있었어요.

## 재발 방지를 위한 대책

비동기 요청 제어엔 Ref 고려하기: 단순히 UI를 보여주는 용도가 아니라, 로직의 실행 여부를 제어하는 변수는 useState보다 useRef가 훨씬 안전하다는 걸 배웠어요.

라이브러리의 힘 빌리기: 사실 이 모든 고민을 해결해 주는 React Query의 useInfiniteQuery가 있죠. 복잡한 기능을 구현할 때에는 이 기능을 이미 구현해놓은 라이브러리가 있는지 찾아보는 것도 좋은 것 같아요.

사실 지금 생각하면 정말 기초적인 부분인데, 당시에는 "분명 완벽한데 왜 오류가 나지?"라고 생각하며 끙끙 앓았던 기억이 있어요. 하지만 덕분에 React의 기초 동작 원리부터 다시 공부하는 시간을 가질 수 있어서 좋았어요.
