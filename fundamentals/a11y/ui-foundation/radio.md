# 라디오(Radio)

라디오 버튼은 여러 옵션 중 하나만 선택할 수 있도록 하는 컴포넌트예요. 
선택 옵션들이 서로 연관되어 있다는 것과 선택된 옵션을 명확하게 전달하는 게 핵심이에요.

**옵션들이 하나의 그룹으로 묶여 있다는 것과 어떤 옵션이 선택되어 있는지** 바로 이해하고 조작할 수 있도록 구현하는 게 중요해요.

아래 내용은 특히 `fieldset`, `legend`의 역할과 `name` 속성의 중요성, 그리고 라디오 버튼의 그룹핑과 선택 상태 관리 등 실무에서 실수하기 쉬운 부분을 구체적으로 다뤄요.

## 이런 라디오 버튼을 보여주려면 어떻게 구현해야 할까요?

![라디오 예시](../images/radio.png)

이 코드는 `fieldset`과 `legend`를 사용하지 않아 라디오 버튼들이 그룹으로 묶이지 않았고, `name` 속성이 없어 같은 그룹으로 인식되지 않아요.

```tsx
<div>
	<h3>안녕하세요! 사용하실 국가를 선택해주세요</h3>
	<input type="radio" />
	<label>대한민국</label>

	<input type="radio" />
	<label>호주</label>
</div>
```

겉보기에는 라디오 버튼이 구성되어 있지만, 스크린리더는 이를 개별적인 독립된 버튼으로만 인식하게 돼요.

::: danger ❌ 접근성을 지키지 않으면 이렇게 들려요.

안녕하세요! 사용하실 국가를 선택해주세요, 머리말<br />
대한민국, **라디오 버튼**, 선택되지 않음<br />
호주, **라디오 버튼**, 선택되지 않음<br />

:::

라디오 버튼의 경우 각각의 개별적인 선택지가 아닌, **하나의 질문에 대한 여러 답변들**이에요.

때문에 어떤 질문인지, 그리고 그 질문에 대한 여러 답변 중 어떤 것이 선택되어 있는지 사용자가 이해할 수 있어야 해요.

`fieldset`과 `legend`로 라디오 버튼 그룹을 묶고, `name` 속성으로 같은 그룹임을 명시할 수 있어요.

```tsx
<fieldset>
	<legend>안녕하세요! 사용하실 국가를 선택해주세요</legend>
	<input type="radio" name="country" id="ko" defaultChecked />
	<label htmlFor="light">대한민국</label>
	
	<input type="radio" name="country" id="au" />
	<label htmlFor="dark">호주</label>
</fieldset>
```

::: tip ✅ 접근성을 지키면 이렇게 들려요.

**안녕하세요! 사용하실 국가를 선택해주세요**, **그룹**<br />
대한민국, **라디오 버튼**, **선택됨**<br />
호주, **라디오 버튼**<br />

:::

### 이런 것들을 지켜야 해요

- 라디오 버튼 그룹은 `<fieldset>`로 감싸고, 그룹의 이름은 `<legend>`로 제공해요.
- 같은 그룹의 라디오 버튼에는 동일한 `name` 속성을 사용해요.
- 각 라디오 버튼에는 `<label>` 요소로 레이블을 연결하고, `id`와 `htmlFor`를 매칭해요.
- 화살표 키로 라디오 버튼 사이를 이동할 수 있어야 해요.

## 라디오 버튼의 역할은 어떻게 설정해야 할까요?

라디오 버튼을 구현할 때는 **옵션들을 그룹으로 묶는 영역**과 **각각의 선택 가능한 옵션** 두 부분이 필요해요.

이 두 영역을 `fieldset`, `legend`, `input[type="radio"]` 요소로 명확히 구분해주면 스크린리더가 라디오 그룹의 목적과 현재 선택 상태를 정확히 인식하고 전달할 수 있어요.

각 역할이 담당하는 영역과 연결 방식, 그리고 역할을 올바르게 사용했을 때의 이점을 살펴볼게요.

### fieldset과 legend

`<fieldset>`은 관련된 폼 요소들을 그룹으로 묶는 컨테이너 역할이에요.
`<legend>`는 이 그룹에 대한 설명이나 질문을 제공하는 역할이에요.

```tsx
<fieldset>
	<legend>테마 설정</legend>
	<input type="radio" name="theme" id="light" />
	<label htmlFor="light">라이트 모드</label>
	
	<input type="radio" name="theme" id="dark" />
	<label htmlFor="dark">다크 모드</label>
</fieldset>
```

::: tip ✅ fieldset과 legend를 사용하면 이런 이점이 있어요.

1. **그룹의 목적을 명확히 전달해요**
   - 스크린리더가 "테마 설정, 그룹"처럼 먼저 읽어줘요
   - 사용자가 선택하는 것의 의미를 바로 이해할 수 있어요
2. **선택 옵션의 개수를 알려줘요**
   - "1/3", "2/3"처럼 현재 선택된 옵션과 전체 옵션 개수를 전달해요
   - 사용자가 몇 가지 옵션 중에서 선택하는지 파악할 수 있어요
3. **키보드 네비게이션을 지원해요**
   - 화살표 키로 라디오 버튼 사이를 이동할 수 있어요
   - 그룹 내에서만 이동하므로 관련 없는 다른 폼 요소와 혼동되지 않아요

:::

### name 속성의 중요성

같은 그룹의 라디오 버튼에는 동일한 `name` 속성을 사용해야 해요. 이렇게 해야 브라우저가 같은 그룹임을 인식하고, 하나만 선택되도록 관리할 수 있어요.

서로 다른 그룹의 라디오 버튼은 다른 `name` 값을 사용하여 독립적으로 동작하도록 해요.

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

## radiogroup과 radio 역할의 차이

radiogroup은 라디오 버튼들의 컨테이너 역할로, 여러 라디오 버튼이 하나의 그룹임을 나타내요.
radio는 개별 라디오 버튼 요소로, 각각의 라디오 버튼이 어떤 옵션을 담당하는지 명시하는 역할이에요.

```tsx
<div role="radiogroup" aria-labelledby="payment-title">
	<input type="radio" name="payment" id="card" />
	<label htmlFor="card">카드 결제</label>
	
	<input type="radio" name="payment" id="bank" />
	<label htmlFor="bank">계좌 이체</label>
	
	<input type="radio" name="payment" id="cash" />
	<label htmlFor="cash">현금 결제</label>
</div>
```

::: tip ✅ radiogroup으로 radio를 묶어주면 이런 이점이 있어요.

1. 스크린리더로 효율적인 탐색이 가능해요
  - 라디오 그룹 전체를 한 번에 건너뛸 수 있어요
  - 현재 선택된 라디오 버튼과 전체 개수를 알려줘요
2. 키보드 네비게이션을 지원해요
  - 화살표 키로 라디오 버튼 간 이동이 가능해요
  - Home/End 키로 첫 번째/마지막 라디오 버튼으로 이동할 수 있어요
3. 상태 정보를 제공해요
  - radiogroup으로 묶어주는 것 만으로 현재 선택된 라디오 버튼과 선택되지 않은 라디오 버튼을 구분해서 읽어줘요
:::