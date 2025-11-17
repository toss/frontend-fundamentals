# 아코디언(Accordion)

아코디언은 정보를 공간을 절약해서 단계적으로 제공할 때 사용하는 컴포넌트예요.

**아코디언 목록의 구조와 현재 활성 상태를 바로 이해하고 조작**할 수 있도록 구현하는 게 핵심이에요.

아래 내용은 아코디언을 html 표준 요소인 `<details>`와 `<summary>`를 사용하여 구현하는 방법과 `aria-expanded` 같은 상태 속성과 레이블 처리, 포커스 관리 등 실무에서 실수하기 쉬운 부분을 구체적으로 다뤄요.

## 상황: 스크린 리더가 잘 읽는 아코디언 만들기

![아코디언 예시](../images/accordion.png)

겉보기에는 아코디언을 위한 기본적인 골격이 만들어진 것처럼 보이지만, 실제 스크린 리더는 사용자에게 정확한 정보를 전달하지 못하게 돼요.

이 코드는 접근성 속성이 없어 스크린 리더가 아코디언의 상태를 인식하지 못해요.

```tsx
<div>
  <button onClick={handleClickAccordion1}>
    토스뱅크의 한도제한계좌는 어떻게 해제할 수 있나요?
  </button>
  <div hidden={!isOpen1}>
    금융거래목적을 확인할 수 있는 증빙서류를 제출하여 한도 계좌 해제 신청을 할
    수 있어요. 단, 증빙서류 직접 제출 시에는 영업일 기준 2~3일 소요될 수 있어요.
  </div>
  <button onClick={handleClickAccordion2}>
    토스증권 수수료와 세금이 궁금해요!
  </button>
  <div hidden={!isOpen2}>
    토스증권에서 국내 주식 거래 시 수수료는 0.015%, 제세금은 0.20%가 부과됩니다.
  </div>
  {/* 이하 생략 */}
</div>
```

::: danger ❌ 접근성을 지키지 않으면 이렇게 들려요.

토스뱅크의 한도제한계좌는 어떻게 해제할 수 있나요?, **버튼**<br />
금융거래목적을 확인할 수 있는 증빙서류를 제출하여 한도 계좌 해제 신청을 할 수 있어요.<br /> 단, 증빙서류 직접 제출 시에는 영업일 기준 2~3일 소요될 수 있어요.<br />
토스증권 수수료와 세금이 궁금해요!, **버튼**<br />
토스증권에서 국내 주식 거래 시 수수료는 0.015%, 제세금은 0.20%가 부과됩니다.<br />

:::

아코디언은 여러 개의 독립된 요소가 모여 있는 구조가 아니라, 펼쳐짐과 접힘 상태를 함께 관리하는 하나의 그룹이에요.
따라서 사용자가 현재 어떤 항목이 펼쳐져 있는지, 그 안에 어떤 내용이 있는지를 쉽게 이해할 수 있어야 해요.

## `<details>`와 `<summary>` 요소를 사용하여 아코디언 구현하기

`<details>`와 `<summary>` 요소를 사용하면 아코디언을 쉽게 구현할 수 있고, 접근성을 자연스럽게 챙길 수 있어요.

```tsx
<details open={isOpen1} onToggle={handleToggleAccordion1}>
  <summary>토스뱅크의 한도제한계좌는 어떻게 해제할 수 있나요?</summary>
  <p>금융거래목적을 확인할 수 있는 증빙서류를 제출하여 한도 계좌 해제 신청을 할 수 있어요. 단, 증빙서류 직접 제출 시에는 영업일 기준 2~3일 소요될 수 있어요.</p>
</details>
<details open={isOpen2} onToggle={handleToggleAccordion2}>
  <summary>토스증권 수수료와 세금이 궁금해요!</summary>
  <p>토스증권에서 국내 주식 거래 시 수수료는 0.015%, 제세금은 0.20%가 부과됩니다.</p>
</details>
```

:::: info 예제 코드 해설

- `<details>`: 아코디언의 그룹을 나타내는 요소로, 펼쳐짐과 접힘 상태를 함께 관리해요.
- `<summary>`: 아코디언의 제목과 펼침을 제어할 수 있는 요소로, 클릭하면 `<details>` 내에 `<summary>` 외의 영역이 보여지거나 숨겨져요.
- `open`: 아코디언이 펼쳐져 있는지 여부를 제어해요.
- `onToggle`: 아코디언이 펼쳐지거나 접히면 호출되는 이벤트로, 상태를 관리해요.
  ::::

## 커스텀 컴포넌트로 아코디언 구현하기

`<details>`와 `<summary>` 요소를 사용하여 아코디언을 구현할 수 없다면, `aria-expanded`, `aria-controls`, `aria-labelledby` 속성을 사용하여 아코디언의 상태와 구조를 명확히 전달해야해요.

```tsx{3-4,9,15-16,21}
<div>
  <button
    aria-expanded={isOpen}
    aria-controls="panel-1"
    onClick={handleClickAccordion}
  >
    토스뱅크의 한도제한계좌는 어떻게 해제할 수 있나요?
  </button>
  <div id="panel-1" role="region" aria-labelledby="button-1" hidden={!isOpen}>
    금융거래목적을 확인할 수 있는 증빙서류를 제출하여 한도 계좌 해제 신청을 할
    수 있어요. 단, 증빙서류 직접 제출 시에는 영업일 기준 2~3일 소요될 수 있어요.
  </div>

  <button
    aria-expanded={isOpen}
    aria-controls="panel-2"
    onClick={handleClickAccordion}
  >
    토스증권 수수료와 세금이 궁금해요!
  </button>
  <div id="panel-2" role="region" aria-labelledby="button-2" hidden={!isOpen}>
    토스증권에서 국내 주식 거래 시 수수료는 0.015%, 제세금은 0.20%가 부과됩니다.
  </div>
  {/* 이하 생략 */}
</div>
```

:::: info 예제 코드 해설

- `aria-expanded`: 버튼이 제어하는 패널의 펼침 상태를 알려요.
- `aria-controls`: 버튼과 연결된 패널의 `id`를 가리켜요.
- `aria-labelledby`: 패널이 어떤 버튼(헤더)에 의해 제목이 제공되는지 알려요.
- `hidden`: 패널 표시 여부를 실제 DOM 가시성과 동기화해요.
  ::::

::: tip ✅ 접근성을 지키면 이렇게 들려요.

토스뱅크의 한도제한계좌는 어떻게 해제할 수 있나요?, **버튼**, **펼쳐짐**<br />
금융거래목적을 확인할 수 있는 증빙서류를 제출하여 한도 계좌 해제 신청을 할 수 있어요. 단, 증빙서류 직접 제출 시에는 영업일 기준 2~3일 소요될 수 있어요.<br />
토스증권 수수료와 세금이 궁금해요!, **버튼**, **접힘**<br />

:::

### 체크리스트

- **역할:** 패널에는 `role="region"` 과 `aria-labelledby`로 버튼 id를 참조하면 문맥이 좋아요. 버튼의 `aria-controls`는 연관된 패널의 `id`로 연결해요.
- **상태:** 헤더는 **버튼**으로 구현한 뒤 `aria-expanded`로 열림/닫힘 상태를 전달해요.
  패널의 표시 여부는 `hidden` 속성으로 제어해요.

  ::: warning ⚠️ `aria-expanded`와 `hidden` 상태의 동기화
  두 값은 항상 동기화해야 해요. 즉, `aria-expanded="true"`면 패널이 표시되고, `aria-expanded="false"`면 패널이 `hidden`이어야 해요.
  :::

- **레이블:** 화면에 보이는 헤더 텍스트가 있다면 추가 `aria-label`은 보통 필요 없어요. 단, **아이콘만 있는 헤더**면 `aria-label`을 꼭 넣어주세요.
