# 최대한 간단한 코드로 재현하기

복잡한 로직에서는 문제가 어디서 생기는지 정확히 알기 어려워요. 그래서 문제를 일으키는 **핵심 코드만 남기고**, 나머지는 최대한 줄여서 단순하게 만드는 게 좋아요. 이렇게 하면 에러가 나는 부분을 더 쉽게 찾을 수 있어요.

또한 **재현 주기를 빠르게 만드는 것**도 중요해요. 코드를 수정하고, 실행하고, 다시 재현하는 과정을 가능한 한 빠르게 돌려보면, 어떤 부분이 문제인지 더 빨리 파악할 수 있어요. 이렇게 하면 디버깅을 훨씬 수월하게 할 수 있어요.

## 예시: 특정 함수의 확인이 필요할 때

예를 들어, 숫자 배열에서 짝수만 필터링하는 로직에 문제가 생겼다고 가정해볼게요. 원래 코드에서는 컴포넌트에서 하는 일이 많아서 어디서부터 문제가 발생한 건지 알기 어려워요.

현재 컴포넌트에서는 데이터 fetching, 필터링 로직, 상태 업데이트, 사용자 이벤트 처리가 하나의 함수 안에 모여 있어요. 이처럼 책임이 분리되지 않으면, 특정 결과(filteredNumbers)가 잘못되었을 때 어떤 로직에서 문제가 발생했는지 파악하기가 어려워요. 특히 여러 상태 변화가 엮여 있을 경우, 상태 간의 상호작용이나 렌더 타이밍까지 함께 고려해야 하므로 디버깅이 복잡해질 수 있어요.

```tsx
import React, { useState, useEffect } from "react";

function filterEvenNumbers(numbers) {
  return numbers.filter((num) => {
    return num % 2 === 1;
  });
}

function ComplexComponent() {
  const [inputValue, setInputValue] = useState("");
  const [numbers, setNumbers] = useState([]);
  const [filteredNumbers, setFilteredNumbers] = useState([]);

  useEffect(() => {
    const fetchNumbersFromAPI = async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([1, 2, 3, 4, 5, 6]);
        }, 1000);
      });
    };

    fetchNumbersFromAPI().then((data) => setNumbers(data));
  }, []);

  useEffect(() => {
    if (numbers.length > 0) {
      const filtered = filterEvenNumbers(numbers);
      setFilteredNumbers(filtered);
    }
  }, [numbers, inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleManualFilter = () => {
    const filtered = filterEvenNumbers(numbers);
    setFilteredNumbers(filtered);
  };

  return (
    <div>
      <h1>숫자 필터링 앱</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="입력해보세요"
      />
      <button onClick={handleManualFilter}>필터링 수동 실행</button>
      <h2>전체 숫자: {numbers.join(", ")}</h2>
      <h2>필터링된 숫자: {filteredNumbers.join(", ")}</h2>
    </div>
  );
}

export default ComplexComponent;
```

### 간단하게 줄여보기

위 코드를 아래 코드처럼 간단하게 줄여서 테스트해볼 수 있어요. 원래 컴포넌트의 상태 관리, 비동기 호출, UI 요소를 제거하고, 핵심 로직인 filterEvenNumbers 함수만 간단한 배열로 테스트할 수 있도록 최소한의 코드로 줄였어요.

이렇게 코드를 단순화하면 복잡한 상태 관리나 네트워크 요청 없이도 문제가 발생하는 조건만으로 에러를 재현할 수 있어요.
이런 방식으로 문제를 단순하게 재현하고, 원인을 찾은 다음 원래 코드에 다시 반영하면 돼요.

```tsx
import React, { useEffect } from "react";

function filterEvenNumbers(numbers) {
  return numbers.filter((num) => {
    return num % 2 === 1;
  });
}

const SimpleComponent = () => {
  useEffect(() => {
    const testArray = [1, 2, 3, 4, 5, 6];
    const result = filterEvenNumbers(testArray);
  }, []);

  return <div>테스트 중...</div>;
};

export default SimpleComponent;
```

이렇게 에러의 원인이 되는 **핵심 로직만 남기고**, 나머지 코드를 최대한 제거하면 **문제 재현이 단순하고 명확해져요**.
