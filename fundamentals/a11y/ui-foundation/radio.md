# 라디오(Radio)

라디오 버튼은 여러 옵션 중 하나만 선택할 수 있도록 하는 컴포넌트예요.

**옵션들이 하나의 그룹으로 묶여 있다는 것과 어떤 옵션이 선택되어 있는지** 바로 이해하고 조작할 수 있도록 구현하는 게 중요해요.

아래 내용은 라디오 버튼의 그룹화와 선택 상태 관리 등 실무에서 실수하기 쉬운 부분을 구체적으로 다뤄요.

## 이런 라디오 버튼을 보여주려면 어떻게 구현해야 할까요?

<img style="max-width: 375px; width: 100%;" src="../images/radio.png" alt="라디오 예시">

```tsx
<div>
  <h3>안녕하세요! 사용하실 국가를 선택해주세요</h3>
  <label>대한민국</label>
  <input type="radio" />

  <label>호주</label>
  <input type="radio" />
</div>
```

이 코드는 `fieldset` 이나 `name` 속성을 지정하지 않은 상태예요. 겉보기에는 라디오 버튼이 구성되어 있지만, 이 코드는 라디오 버튼들이 그룹으로 묶이지 않았고, `name` 속성이 없어 같은 그룹으로 인식되지 않아요. 따라서 스크린 리더는 이를 개별적인 독립된 버튼으로만 인식하게 돼요.

::: danger ❌ 접근성을 지키지 않으면 이렇게 들려요.

안녕하세요! 사용하실 국가를 선택해주세요, 머리말<br />
대한민국, **라디오 버튼**, 선택되지 않음<br />
호주, **라디오 버튼**, 선택되지 않음<br />

:::

라디오 버튼의 경우 각각의 개별적인 선택지가 아닌, **하나의 질문에 대한 여러 답변들**이에요.

때문에 어떤 질문인지, 그리고 그 질문에 대한 여러 답변 중 어떤 것이 선택되어 있는지 사용자가 이해할 수 있어야 해요.

`fieldset` 과 `legend` 로 라디오 버튼 그룹을 묶고, `name` 속성으로 같은 그룹임을 명시할 수 있어요.

```tsx
<fieldset>
  <legend>안녕하세요! 사용하실 국가를 선택해주세요</legend>
  <label htmlFor="ko">대한민국</label>
  <input type="radio" name="country" id="ko" checked />

  <label htmlFor="au">호주</label>
  <input type="radio" name="country" id="au" />
</fieldset>
```

::: tip ✅ 접근성을 지키면 이렇게 들려요.

**안녕하세요! 사용하실 국가를 선택해주세요**, **그룹**<br />
대한민국, **라디오 버튼**, **선택됨**<br />
호주, **라디오 버튼**<br />

:::

### 체크리스트

- 라디오 버튼 그룹은 `<fieldset>`로 감싸고, 그룹의 이름은 `<legend>`로 제공해요.
- 같은 그룹의 라디오 버튼에는 동일한 `name` 속성을 사용해요.
- 각 라디오 버튼에는 `<label>` 요소로 레이블을 연결하고, `id`와 `htmlFor`를 매칭해요.
- 화살표 키로 라디오 버튼 사이를 이동할 수 있어야 해요.

## 라디오 버튼과 그룹의 역할은 어떻게 설정해야 할까요?

라디오 버튼을 구현할 때는 **옵션을 묶는 그룹**과 **각각 선택할 수 있는 옵션**이 필요해요.

이 두 가지를 `fieldset`, `legend`, `input[type="radio"]` 요소로 명확히 구분해주면 스크린 리더가 라디오 그룹의 목적과 현재 선택 상태를 정확히 인식하고 전달할 수 있어요.

각 역할이 담당하는 영역과 연결 방식, 그리고 역할을 올바르게 사용했을 때의 이점을 살펴볼게요.

### fieldset과 legend

`<fieldset>` 은 관련된 폼 요소들을 그룹으로 묶는 컨테이너 역할이에요. `<legend>` 는 이 그룹에 대한 설명이나 질문을 제공하는 역할이에요.

```tsx
<fieldset>
  <legend>테마 설정</legend>
  <input type="radio" name="theme" id="light" />
  <label htmlFor="light">라이트 모드</label>

  <input type="radio" name="theme" id="dark" />
  <label htmlFor="dark">다크 모드</label>
</fieldset>
```

:::: info 예제 코드 해설

- `fieldset`/`legend`: 하나의 질문과 그에 대한 여러 답변(라디오 옵션)을 묶어요.
- `name`: 같은 그룹으로 묶여 하나만 선택되도록 브라우저가 관리해요.
- `id`/`htmlFor`: 라디오와 레이블을 연결해 이름을 정확히 읽게 해요.
  ::::

::: tip ✅ fieldset과 legend를 사용하면 이런 이점이 있어요.

1. **그룹의 목적을 명확히 전달해요**
   - 스크린 리더가 "테마 설정, 그룹"처럼 먼저 읽어줘요
   - 사용자가 선택하는 것의 의미를 바로 이해할 수 있어요
2. **선택 옵션의 개수를 알려줘요**
   - "1/3", "2/3"처럼 현재 선택된 옵션과 전체 옵션 개수를 전달해요
   - 사용자가 몇 가지 옵션 중에서 선택하는지 파악할 수 있어요
3. **키보드 네비게이션을 지원해요**
   - 화살표 키로 라디오 버튼 사이를 이동할 수 있어요
   - 그룹 내에서만 이동하므로 관련 없는 다른 폼 요소와 혼동되지 않아요

:::

### fieldset을 사용할 수 없다면?

`<fieldset>` 을 사용할 수 없다면 대신에 `role="radiogroup"` 을 사용할 수 있어요. `radiogroup` 은 라디오 버튼들의 컨테이너 역할로, 여러 라디오 버튼이 하나의 그룹임을 나타내요.

아래 예제는 `<fieldset>` 대신 `<div>` 를 사용하여 라디오 버튼 그룹을 구현한 코드예요.

```tsx
<div role="radiogroup" aria-labelledby="payment-title">
  <h3 id="payment-title">결제 방법</h3>

  <input type="radio" name="payment" id="card" />
  <label htmlFor="card">카드 결제</label>

  <input type="radio" name="payment" id="bank" />
  <label htmlFor="bank">계좌 이체</label>

  <input type="radio" name="payment" id="cash" />
  <label htmlFor="cash">현금 결제</label>
</div>
```

:::: info 예제 코드 해설

- `role="radiogroup"`: 여러 라디오가 하나의 그룹임을 명확히 알려요.
- `aria-labelledby`: 그룹의 제목을 연결해 무엇을 선택하는지 먼저 전달해요.
- 각 `input[name]`: 동일한 `name`으로 하나만 선택되도록 동작해요.
  ::::

### name 속성의 중요성

같은 그룹의 라디오 버튼에는 동일한 `name` 속성을 사용해야 해요. 이렇게 해야 브라우저가 같은 그룹임을 인식하고, 하나만 선택되도록 관리할 수 있어요.

아래 예제는 **배송 방법**과 **결제 방법**처럼 서로 다른 그룹의 라디오 버튼에 서로 다른 `name` 값을 지정하는 코드예요.

```tsx
<fieldset>
	<legend>배송 방법</legend>
	<input type="radio" name="shipping" id="standard" />
	<label htmlFor="standard">일반 배송</label>

	<input type="radio" name="shipping" id="express" />
	<label htmlFor="express">익일 배송</label>

	<input type="radio" name="shipping" id="pickup" />
	<label htmlFor="pickup">직접 수령</label>
</fieldset>

<fieldset>
	<legend>결제 방법</legend>
	<input type="radio" name="payment" id="card" />
	<label htmlFor="card">카드 결제</label>

	<input type="radio" name="payment" id="account" />
	<label htmlFor="account">계좌 이체</label>
</fieldset>
```

::: tip ✅ name 속성을 올바르게 사용하면 이런 이점이 있어요.

1. **독립적인 그룹을 만들 수 있어요**
   - 배송 방법과 결제 방법이 서로 다른 그룹임을 명확히 구분해요
   - 한 그룹의 선택이 다른 그룹에 영향을 주지 않아요
2. **브라우저의 기본 동작을 활용할 수 있어요**
   - 같은 `name`을 가진 라디오 버튼 중 하나만 선택되도록 브라우저가 자동으로 처리해요
   - 추가 JavaScript 없이도 탭 키로 그룹 전체를 건너뛸 수 있어요
3. **폼 제출 시 올바른 값을 전달해요**
   - 선택된 라디오 버튼의 값만 서버로 전송돼요

:::

## `<input>` 을 쓰지 않고 라디오 버튼을 구현하기

디자인적으로 기본 `<input type="radio">`를 사용할 수 없을 때는 `role="radio"`와 `aria-checked`를 사용해야해요.

핵심은 `role="radio"`, `aria-checked`, `tabIndex={0}`과 Space 키 처리예요.

특히, `tabIndex={0}`를 지정해 키보드나 스크린 리더가 포커스할 수 있게 해야 해요, 또한 Space 키를 눌렀을 때 라디오 버튼 상태가 전환되도록 `onKeyDown`에 핸들러를 등록해야 해요.

```tsx
const [checked, setChecked] = useState(false);

<div
  role="radio"
  aria-checked={checked}
  tabIndex={0}
  onClick={() => setChecked(!checked)}
  onKeyDown={(e) => {
    if (e.key === " ") {
      e.preventDefault();
      setChecked(!checked);
    }
  }}
>
  <span>커스텀 라디오 버튼</span>
  {checked && <span>✓</span>}
</div>;
```

:::: info 예제 코드 해설

- `role="radio"`/`aria-checked`: 커스텀 요소를 라디오 버튼으로 인식시키고 선택 여부 상태를 전달해요.
- `tabIndex={0}`: 키보드 포커스를 받을 수 있게 해요.
- `Space` 키 처리: 키보드만으로도 상태를 토글할 수 있게 해요.
  ::::
