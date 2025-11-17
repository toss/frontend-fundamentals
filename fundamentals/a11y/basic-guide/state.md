# 상태 지정하기

컴포넌트가 꺼졌는지 켜졌는지, 펼쳐졌는지 접혔는지 같은 동작 변화를 스크린 리더에 알려주려면 상태 속성을 설정해야 해요. HTML 기본 요소(`<button>`, `<input>` 등)는 일부 상태(`checked`, `disabled`)를 내장하고 있지만, `<div>`처럼 커스텀 요소를 쓸 때는 `aria-` 속성으로 상태를 명시적으로 알려야 해요.

아래 표는 자주 쓰는 `aria-` 상태 속성과 대표적인 사용 예시를 정리한 거예요. 각 속성은 스크린 리더가 요소의 현재 상태를 정확히 읽도록 돕습니다.

| 속성            | 의미                                            | 적용 예시                                                |
| --------------- | ----------------------------------------------- | -------------------------------------------------------- |
| `aria-checked`  | 체크된 상태인지 알려줘요                        | 체크박스, 스위치                                         |
| `aria-selected` | 선택된 항목인지 알려줘요                        | 탭, 리스트                                               |
| `aria-expanded` | 펼쳐졌는지 접혔는지 알려줘요                    | 아코디언, 드롭다운                                       |
| `aria-disabled` | 비활성화 상태인지 알려줘요                      | 버튼 등                                                  |
| `aria-current`  | 여러 항목 중 지금 위치한 항목인지 알려줘요      | 네비게이션에서 현재 페이지 표시, 달력에서 오늘 날짜 표시 |
| `aria-busy`     | 컨텐츠가 갱신 중임을 알려줘요                   | 데이터 로드 시                                           |
| `aria-live`     | 중요한 메시지/컨텐츠를 사용자에게 즉시 전달해요 | 에러 메세지, 알림 메세지, 로딩                           |

## 체크 여부: `aria-checked`

`aria-checked`는 체크박스, 스위치 등 체크 여부를 나타내는 상태 속성이에요. `<input>` 은 `checked` 로, 그 외의 요소에다가는 `aria-checked`를 사용해야 해요.

```tsx
// input 요소
<label>
  <input type="checkbox" checked={true} />
  체크박스
</label>

// input이 아닌 요소
<span role="checkbox" aria-checked={true} tabIndex={0}>
  <img src="./toggle-icon-on.png" alt="체크박스" />
</span>
```

## 선택 여부: `aria-selected`

`aria-selected`는 탭, 리스트 등 선택 여부를 나타내는 상태 속성이에요. `<option>`은 `selected`로, 그 외의 요소에다가는 `aria-selected`를 사용해야 해요.

```tsx
// option 요소
<select>
  <option value="1" selected>사과</option>
  <option value="2">딸기</option>
</select>

// option이 아닌 요소
<div role="listbox">
  <button role="option" aria-selected={true}>
    사과
  </button>
  <button role="option" aria-selected={false}>
    딸기
  </button>
</div>
```

## 펼침 여부: `aria-expanded`

`aria-expanded`는 아코디언, 드롭다운 등 펼침 여부를 나타내는 상태 속성이에요. `<details>`은 `open`으로, 그 외의 요소에다가는 `aria-expanded`를 사용해야 해요.

```tsx
// details 요소
<details open={true}>
  <summary>펼침</summary>
  <p>내용</p>
</details>

// details가 아닌 요소
<button aria-expanded={true}>
  펼침
</button>
<p hidden={false}>내용</p>
```

## 비활성화 여부: `aria-disabled`

`aria-disabled`는 버튼, 링크, 스위치 등 비활성화 여부를 나타내는 상태 속성이에요. `<button>`, `<input>`은 `disabled`로, 그 외의 요소에는 `aria-disabled`를 사용해야 해요.

```tsx
// button 요소
<button disabled={true}>
  비활성화
</button>

// input 요소
<input type="text" disabled={true} />

// input이 아닌 요소
<div role="switch" aria-checked={false} aria-disabled={true} tabIndex={0}>
  <img src="./toggle-icon-off.png" alt="스위치" />
</div>
```

## 현재 위치 여부: `aria-current`

`aria-current`는 네비게이션에서 현재 페이지 표시, 달력에서 오늘 날짜 표시 등 현재 위치 여부를 나타내는 상태 속성이에요.

### 네비게이션에서 현재 페이지 표시

```tsx
// 현재 페이지가 "홈" 일 때
<nav aria-label="메뉴">
  <a href="/" aria-current="page">
    홈
  </a>
  <a href="/about">소개</a>
  <a href="/contact">연락처</a>
</nav>
```

### 달력에서 오늘 날짜 표시

```tsx
// 오늘 날짜가 "2025-11-13" 일 때
<div role="listbox">
  <button role="option">2025-11-12</button>
  <button role="option" aria-current="date">
    2025-11-13
  </button>
  <button role="option">2025-11-14</button>
</div>
```

## 로딩 중 상태: `aria-busy`

`aria-busy`는 해당 요소가 곧 있으면 컨텐츠가 변경된다는 것을 알려요. 보통 로딩 컴포넌트에서 사용해요.

```tsx
// div 요소
<div aria-busy={true}>로딩 중</div>
```

## 중요 정보 업데이트 알림: `aria-live`

`aria-live`는 현재 사용자에게 바로 전달해야하는 중요 정보가 포함된 컨텐츠 업데이트를 나타내는 상태 속성이에요. 총 3가지 옵션이 있어요.

| 속성 값     | 읽는 타이밍                                         | 기존 읽기 흐름             | 사용자 경험                                      |
| ----------- | --------------------------------------------------- | -------------------------- | ------------------------------------------------ |
| `polite`    | **현재 읽던 내용을 마친 후** 업데이트된 내용을 읽음 | 방해하지 않음              | 덜 급한 정보에 적합 (검증 메세지, 업데이트 알림) |
| `assertive` | **즉시 읽기 중단 후 바로** 새로운 내용을 읽음       | 현재 읽기 중인 내용을 끊음 | 긴급한 정보에 적합 (오류 메세지, 실패 메세지)    |
| `off`       | 컨텐츠 업데이트를 알리지 않음                       |                            |                                                  |

```tsx
// 입력 중 에러 메세지를 알림
<input type="email" value="1234" aria-describedby="error-message" />
<p id="error-message" aria-live="polite">이메일 형식이 올바르지 않습니다.</p>

// 오류 메세지를 알림
<p aria-live="assertive">인터넷 연결이 끊어졌습니다.</p>
```

::: tip

- `role="alert"`을 사용하면 `aria-live="assertive"`와 똑같이 동작해요.
- `role="status"`를 사용하면 `aria-live="polite"`와 똑같이 동작해요.

:::
