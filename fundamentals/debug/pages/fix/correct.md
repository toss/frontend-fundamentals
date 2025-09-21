# 근본 원인 수정하기

에러를 수정할 때 종종 겉보기에만 문제를 해결한 코드를 작성하는 경우가 있어요. 이는 일시적으로 동작하더라도, 추후에 같은 문제가 다시 발생하거나 다른 곳에서 파급 효과를 일으킬 수 있어요. 진짜 중요한 건 “근본 원인을 찾아 수정하는 것” 이에요.

## 예시 1

배열에서 값을 찾을 때 undefined 에러가 나는 경우가 있어요. 사용자는 id === 3인 유저를 찾으려 했지만 배열에 해당 유저가 없으므로 undefined를 반환하고, 이후 .name에 접근하면서 에러가 발생해요.

```tsx
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];
const selectedUser = users.find((user) => user.id === 3);

console.log(selectedUser.name);
```

### 겉보기에만 해결된 코드

as로 타입 단언을 해버리거나, assert!를 사용하는 등, 겉으로는 타입에러가 발생하지 않도록 처리할 수 있어요. 하지만, 로직상 undefined.name이 undefined로 처리되어 잘못된 데이터가 조용히 넘어가요. 문제의 원인(해당 유저가 없다는 사실)을 숨기기만 하고, 애초에 find() 결과를 제대로 확인하지 않았다는 잘못된 가정을 그대로 유지한 셈이에요.

```tsx
const selectedUser = users.find((user) => user.id === 3) || {};
const selectedUser = users.find((user) => user.id === 3) as User;
const selectedUser = users.find((user) => user.id === 3)!;
```

### 근본 원인을 해결한 코드

데이터의 불완전성을 명시적으로 확인하고, 문제가 생기면 명확하게 처리해요. 또는, 타입 단언은 제거하고, 옵셔널 체이닝을 잘 사용하여 의도하지 않은 에러를 방지해요.

```tsx
const selectedUser = users.find((user) => user.id === 3);

if (!selectedUser) {
  throw new Error("User with ID 3 not found");
}

console.log(selectedUser.name);
```

```tsx
const selectedUser = users.find((user) => user.id === 3);
console.log(selectedUser?.name ?? "사용자 없음");
```

## 예시 2

검색어 자동완성 API 요청 중 이전 요청 결과가 덮어써지는 문제를 예시로 들어볼게요.

검색창에서 빠르게 입력 시, 결과가 엉켜서 표시되는 상황이에요. 사용자가 "app", "apple", "apples"처럼 빠르게 입력하면 fetch 요청이 비동기적으로 여러 번 호출되요. 마지막 요청보다 먼저 끝난 이전 응답이 덮어쓰기 되는 현상 발생하고, 오래된 결과가 화면에 나타나는 현상이 발생해요.

```tsx
function SearchBox() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    if (!query) return;

    fetch(`/api/search?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setResult(data);
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

### 겉보기에 해결된 코드:

`setTimeout`으로 딜레이를 주고, `clearTimeout`으로 이전 요청을 정리하는 것 같지만 실제로는 문제를 해결하지 못해요. `clearTimeout`은 다음 요청 전 대기 중인 타임아웃만 취소할 뿐, 이미 시작된 `fetch` 요청은 취소하지 않아요. 그래서 불필요한 요청이 계속 서버에 전달될 수 있어요. 근본 원인인 "응답 순서 관리" 를 하지 않았기 때문에 race condition은 그대로 존재해요.

```tsx
useEffect(() => {
  if (!query) return;

  const timeout = setTimeout(() => {
    fetch(`/api/search?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
      });
  }, 300);

  return () => clearTimeout(timeout);
}, [query]);
```

### 근본 원인을 해결한 코드

AbortController 또는 요청 순서 관리하도록 수정했어요. 디바운스로 불필요한 요청 자체를 줄이고, AbortController로 진행 중이던 이전 요청을 취소하여 레이스를 막았어요.

```tsx 6,7,15,16,22,35,37,38,39,40,41,42,43
import { useEffect, useRef, useState } from "react";
function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Item[]>([]);

  const controllerRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<number | null>(null);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }

    debounceRef.current = window.setTimeout(() => {
      controllerRef.current?.abort();

      const controller = new AbortController();
      controllerRef.current = controller;
      const { signal } = controller;

      const q = encodeURIComponent(query.trim());

      fetch(`/api/search?q=${q}`, { signal })
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then((data: Item[]) => setResults(data))
        .catch((err: unknown) => {
          //Abort Error는 조용히 무시해요
          if (err instanceof DOMException && err.name === "AbortError") return;
          console.error(err);
        });
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
      controllerRef.current?.abort();
    };
  }, [query]);

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search…"
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
