# 역할 챙기기

요소가 어떤 **의미를 가진 UI 컴포넌트**인지 스크린리더가 인식하게 하려면 `role` 속성을 명확히 지정하는 것이 중요해요.

HTML의 기본 요소(`<button>`, `<input>`, `<a>` 등)는 기본적인 역할이 내장돼 있지만, 기본 요소를 활용하지 않고 `<div>` 로 커스텀하게 만들 때는 `role`을 명시적으로 선언해야 해요. 또한 탭(tab), 스위치(switch)와 같이 기본 요소가 없는 컴포넌트들은 명시적으로 `role`을 선언해야 해요.

| 컴포넌트                    | HTML 요소                 | role 속성                           | 설명                                          |
| --------------------------- | ------------------------- | ----------------------------------- | --------------------------------------------- |
| 텍스트, 아이콘 등 장식 요소 | `<span>`, `<div>`         | 없음[^1]                            | **정보 전달 시 그에 맞는 역할 지정 필요**     |
| 입력창(Input)               | `<input>`                 | `role="textbox"`                    | 사용자가 텍스트를 입력하는 요소               |
| 체크박스(Checkbox)          | `<input type="checkbox">` | `role="checkbox"`                   | 여러 옵션 중 원하는 항목을 모두 선택하는 요소 |
| 라디오 버튼(Radio)          | `<input type="radio">`    | `role="radiogroup"`, `role="radio"` | 여러 옵션 중 하나 선택하는 요소               |
| 링크(Link)                  | `<a>`                     | `role="link"`                       | 페이지 이동 요소                              |
| 버튼(Button)                | `<button>`                | `role="button"`                     | 실행 동작을 수행하는 요소                     |
| 다이얼로그(Dialog)          | `<dialog>`                | `role="dialog"`                     | 다이얼로그                                    |
| 아코디언(Accordion)         | `<details>` `<summary>`   | `role="group"`                      | 아코디언                                      |

[^1]: 명시적으로 `role="generic"` 이 선언되어 있지만 접근성 트리에서는 인지하지 않습니다.

## 컴포넌트의 의미를 코드에 담는 법

컴포넌트의 의미를 명확히 전달하기 위해서는 **역할, 상태, 레이블**을 적절하게 설정하는 것이 중요해요.

아래 코드는 `tablist`와 `tab` 역할, 상태(`aria-selected`)와 레이블을 적절히 조합하여 탭을 구현한 예시예요. 탭을 구성하는 역할에 대한 보다 자세한 설명은 [여기](../ui-foundation/tab.html#role-속성으로-탭-컴포넌트-표현하기)서 확인할 수 있어요.

```tsx
<div role="tablist" aria-label="메뉴">
  <button role="tab" aria-selected={true}>
    첫번째 항목
  </button>
  <button role="tab" aria-selected={false}>
    두번째 항목
  </button>
</div>
```

::: tip ✅ 스크린리더는 이렇게 읽어요

메뉴, **탭그룹**

첫번째 항목, **탭**, **선택됨**

두번째 항목, **탭**

:::
