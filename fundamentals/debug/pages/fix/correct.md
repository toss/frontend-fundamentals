# 근본 원인 수정하기
에러를 수정할 때 종종 겉보기에만 문제를 해결한 코드를 작성하는 경우가 있어요. 이는 일시적으로 동작하더라도, 추후에 같은 문제가 다시 발생하거나 다른 곳에서 파급 효과를 일으킬 수 있어요. 진짜 중요한 건 “근본 원인을 찾아 수정하는 것” 이에요.

## 예시 1
배열에서 값을 찾을 때 undefined 에러가 나는 경우가 있어요. 사용자는 id === 3인 유저를 찾으려 했지만 배열에 해당 유저가 없으므로 undefined를 반환하고, 이후 .name에 접근하면서 에러가 발생해요.

```tsx 4
const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
const selectedUser = users.find((user) => user.id === 3);

console.log(selectedUser.name); 

```

#### 겉보기에만 해결된 코드
겉으로는 에러가 사라졌지만, 로직상 undefined.name이 undefined로 처리되어 잘못된 데이터가 조용히 넘어가요. 문제의 원인(해당 유저가 없다는 사실)을 숨기기만 하고, 애초에 find() 결과를 제대로 확인하지 않았다는 잘못된 가정을 그대로 유지한 셈이에요.
```tsx
const selectedUser = users.find((user) => user.id === 3) || {};

console.log(selectedUser.name);
```

#### 근본 원인을 해결한 코드
데이터의 불완전성을 명시적으로 확인하고, 문제가 생기면 명확하게 처리해요. 이 접근은 버그의 원인과 위치를 정확히 알 수 있게 해주고, 의도하지 않은 조용한 실패(silent fail)를 방지해요.
```tsx
const selectedUser = users.find((user) => user.id === 3);

if (!selectedUser) {
  throw new Error('User with ID 3 not found');
}

console.log(selectedUser.name);
```


## 예시 2
검색어 자동완성 API 요청 중 이전 요청 결과가 덮어써지는 문제를 예시로 들어볼게요.

검색창에서 빠르게 입력 시, 결과가 엉켜서 표시되는 상황이에요. 사용자가 "app", "apple", "apples"처럼 빠르게 입력하면 fetch 요청이 비동기적으로 여러 번 호출되요. 마지막 요청보다 먼저 끝난 이전 응답이 덮어쓰기 되는 현상 발생하고, 오래된 결과가 화면에 나타나는 현상이 발생해요.

```tsx
function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) return;

    fetch(`/api/search?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
      });
  }, [query]);

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {results.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </>
  );
}
```
#### 겉보기에 해결된 코드: 
setTimeout으로 딜레이를 주어서 겉보기에 깔끔해 보이도록 수정되었지만, 여전히 응답 순서가 꼬이면 이전 응답이 나중에 덮을 수 있어요. 근본 원인인 "응답 순서 관리" 를 하지 않았기 때문에 race condition은 그대로 존재해요.

```tsx
useEffect(() => {
  if (!query) return;

  const timeout = setTimeout(() => {
    fetch(`/api/search?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
      });
  }, 300); // debounce 흉내

  return () => clearTimeout(timeout);
}, [query]);
```

#### 근본 원인을 해결한 코드
AbortController 또는 요청 순서 관리하도록 수정했어요. useEffect가 재실행될 때 이전 요청을 명시적으로 abort(취소) 함으로써 race condition 방지해요. 사용자 입력이 빠르게 바뀌어도 마지막 요청만 유효한 결과로 인정되고, 의도한 흐름을 코드로 명확하게 제어되어요.

```tsx
function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) return;

    const controller = new AbortController();
    const signal = controller.signal;

    fetch(`/api/search?q=${query}`, { signal })
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          console.error(err);
        }
      });

    return () => {
      controller.abort(); // 이전 요청 취소
    };
  }, [query]);

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {results.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </>
  );
}
```

참고블로그: https://tecoble.techcourse.co.kr/post/2021-09-12-race-condition-handling/