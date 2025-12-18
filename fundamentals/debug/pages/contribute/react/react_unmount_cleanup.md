# 실시간 차트 페이지 만들다가 메모리 터져서 브라우저 죽은 이야기

<br/>
<ContributorHeader name="yougenious95" githubUrl="https://github.com/yougenious95" avatar="https://avatars.githubusercontent.com/u/202038938?v=4" date="2025.11.5"/>

## 진단하기
주식 실시간 차트 페이지 만들었는데, QA팀에서 "30분만 켜놓으면 브라우저 죽어요"라고 제보가 들어왔어요. 직접 켜놓고 밥 먹고 왔더니 진짜 탭이 먹통이 되어 있더라구요.
Chrome DevTools 열어보니 메모리가 1GB 넘어가면서 계속 올라가고 있었어요. 메모리 누수구나 싶었어요!

## 재현하기
Memory Profiler로 스냅샷 찍어보니 5분만 지나도 detached DOM nodes랑 event listeners가 늘어나고 있었어요

```tsx
useEffect(() => {
  const ws = new WebSocket('wss://api.example.com/realtime');

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    setChartData(prev => [...prev, data]); // 데이터 계속 쌓임...
  };

  ws.connect();
  // return 빼먹음...
}, []);


useEffect(() => {
  const interval = setInterval(() => {
    fetchMarketData().then(setMarketData);
  }, 5000);
  // `clearInterval` 어디갔어...
}, []);
```

웹소켓이랑 인터벌 정리 안하고 냅뒀더니 컴포넌트 언마운트되도 계속 돌고 있었던거예요. 게다가 차트 데이터는 계속 쌓이기만 하궁

## 수정하기
cleanup 추가하고 데이터도 100개로 제한했어요.

```tsx
useEffect(() => {
  const ws = new WebSocket('wss://api.example.com/realtime');

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    setChartData(prev => {
      const updated = [...prev, data];
      return updated.slice(-100); // 최근 100개만
    });
  };

  ws.connect();

  return () => {
    ws.close(); // 이거 추가
  };
}, []);

useEffect(() => {
  const interval = setInterval(() => {
    fetchMarketData().then(setMarketData);
  }, 5000);

  return () => {
    clearInterval(interval); // 이것도 추가
  };
}, []);
```

AbortController로 API 요청도 취소되게 처리하고, `React.memo`로 쓸데없는 리렌더링도 막았어요.

## 재발방지하기
useEffect에서의 "끄기 행동"은 중요하다

`setInterval` 했으면 `clearInterval` 꼭
`addEventListener` 했으면 `removeEventListener` 꼭
WebSocket 열었으면 `close()` 꼭
API 호출했으면 `AbortController` 써서 취소 처리
ESLint에 react-hooks/exhaustive-deps 켜놓으면 빼먹으면 잔소리해줘서 좋아요.

실시간 데이터 다루는 페이지는 꼭 30분은 켜놓고 테스트해보세요. 안 그러면 또 QA팀한테 혼나요!