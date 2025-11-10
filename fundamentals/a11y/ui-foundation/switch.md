# 스위치(Switch)

스위치는 두 가지 상태 중 하나를 선택할 때 사용하는 컴포넌트예요. 
현재 상태와 상태 변경 시 어떤 효과가 발생하는지 명확하게 전달하는 게 핵심이에요.

**스위치의 현재 상태와 스위치를 조작했을 때 어떤 변화가 일어나는지** 바로 이해하고 조작할 수 있도록 구현하는 게 중요해요.

이번 가이드에서는 `role="switch"`와 `aria-checked`, `aria-label`의 역할과 적절한 사용법, 그리고 스위치의 상태 관리 등 실무에서 실수하기 쉬운 부분을 구체적으로 다뤄요.

## 이런 스위치를 보여주려면 어떻게 구현해야 할까요?

![스위치 예시](../images/switch.png)

겉보기에는 스위치의 시각적 UI가 구성되어 있지만, `role="switch"`와 `aria-checked` 속성이 없어 스크린리더가 스위치를 인식하지 못해요.

```tsx
<span>
	<span>
    <img src="./toggle-icon.png" alt="" />
  </span>
</span>
```

::: danger ❌ 접근성을 지키지 않으면 이렇게 들려요.

이 정보를 알 수 없어요.<br />

:::

스위치의 경우 사용자가 현재 상태를 파악하고, 상태를 변경할 수 있어야 해요.

때문에 스위치가 현재 ON 상태인지 OFF 상태인지, 그리고 상태를 변경했을 때 어떤 효과가 일어나는지 사용자가 이해할 수 있어야 해요.

`role="switch"`, `aria-checked`, `aria-label` 속성을 사용하여 스위치의 역할, 상태, 목적을 명확히 전달할 수 있어요.

```tsx
<label htmlFor="notification-switch">
	<input 
		type="checkbox" 
		role="switch"
		id="notification-switch"
		aria-checked={true}
		aria-label="알림 설정"
	/>
  <img src="./toggle-icon.png" alt="" />
</label>
```

::: tip ✅ 접근성을 지키면 이렇게 들려요.

켜졌을 때<br />
알림 설정, **전환 버튼**, **켬**<br />
<br />
꺼졌을 때<br />
알림 설정, **전환 버튼**, **끔**, **설정을 끄거나 켜려면 두 번 탭하십시오**<br />

:::

### 이런 것들을 지켜야 해요

- 스위치는 `role="switch"`로 설정하고, `aria-checked`로 현재 상태를 명시해요 (켜짐=true, 꺼짐=false).
- 스위치의 이름이나 목적을 `aria-label`로 제공해요.
- 레이블 텍스트가 충분히 명확하면 추가 `aria-label`은 생략해도 돼요.
- Space 키로 상태를 변경할 수 있어야 해요.

## 스위치의 역할은 어떻게 설정해야 할까요?

스위치를 구현할 때는 **상태를 변경하는 컨트롤** 역할을 명확히 해야 해요.

`role="switch"`와 `aria-checked` 속성을 사용하면 스크린리더가 스위치의 현재 상태를 정확히 인식하고 전달할 수 있어요.

각 속성이 담당하는 역할과 올바른 사용법, 그리고 속성을 올바르게 사용했을 때의 이점을 살펴볼게요.

### role="switch"와 aria-checked

`role="switch"`는 요소가 ON/OFF 상태를 가지는 컨트롤임을 명시하는 역할이에요.
`aria-checked`는 현재 상태가 켜짐(true)인지 꺼짐(false)인지를 나타내는 속성이에요.

```tsx
<label htmlFor="darkmode-switch">
	<input 
		type="checkbox" 
		role="switch"
		id="darkmode-switch"
		aria-checked={false}
	/>
	다크 모드
</label>
```

::: tip ✅ role="switch"를 사용하면 이런 이점이 있어요.

1. **상태를 명확하게 전달해요**
   - 스크린리더가 "다크 모드, 스위치, 꺼짐"처럼 읽어줘요
   - 사용자가 현재 상태를 정확히 파악할 수 있어요
2. **키보드 네비게이션을 지원해요**
   - Tab 키로 스위치에 포커스를 이동할 수 있어요
   - Space 키로 상태를 토글할 수 있어요
3. **checkbox와 구분해서 사용할 수 있어요**
   - checkbox는 "선택됨/선택 안 됨" 상태를 나타내고, switch는 "켜짐/꺼짐" 상태를 나타내요
   - 스크린리더가 적절한 용어로 읽어줘요

:::

## 적재적소에 aria-label 사용하기

스위치의 레이블이 화면에 보이는 텍스트로 충분히 명확하다면 추가 `aria-label`은 필요 없어요. 다만 아이콘만 있거나 상태를 변경했을 때 발생하는 효과를 설명해야 할 때는 `aria-label`을 사용해요.

### label 안에 텍스트가 있는 경우

의미 있는 텍스트가 있다면 `aria-label`은 필요하지 않아요.
다만, 텍스트가 모호한 경우(예: "더보기")에는 `aria-label`를 보조적으로 활용해 문맥을 명확히 해야 해요.

```tsx
<label htmlFor="notification-switch">
	<input 
		type="checkbox" 
		role="switch"
		id="notification-switch"
		aria-checked={true}
	/>
	알림 설정
</label>
```

### label 밖에 텍스트가 있는 경우

label이 aria-label을 역할을 대신 하고 있기 때문에 설정하지 않아야 해요.

```tsx
<div>
	<label htmlFor="email-switch">이메일 알림</label>
	<input 
		type="checkbox" 
		role="switch"
		id="email-switch"
		aria-checked={true}
	/>
</div>
```

### 아이콘만 있고 텍스트가 없는 경우

`aria-label` 속성을 설정해, 어떤 기능의 스위치인지 설명이 필요해요.

```tsx
<label htmlFor="darkmode-switch">
	<input 
		type="checkbox" 
		role="switch"
		id="darkmode-switch"
		aria-checked={true}
		aria-label="다크 모드"
	/>
	<img src="./toggle-icon.png" alt="" />
</label>
```

::: tip ✅ aria-label을 적절히 사용하면 이런 이점이 있어요.

1. **상태 변경의 의미를 명확히 전달해요**
   - "이메일 알림을 받습니다"처럼 효과까지 함께 읽어줘요
   - 사용자가 스위치를 조작하면 어떤 변화가 일어나는지 미리 알 수 있어요
2. **컨텍스트를 제공해요**
   - 상태 변화와 연관된 추가 정보를 제공할 수 있어요
   - 예: "캐시를 비웁니다", "자동 저장을 활성화합니다"
3. **불필요한 중복을 피해요**
   - 시각적으로 이미 명확한 정보는 `aria-label`로 중복하지 않아요
   - 스크린리더가 같은 내용을 여러 번 읽지 않아도 돼요

:::
