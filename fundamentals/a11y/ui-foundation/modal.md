# 모달(Modal)

모달은 사용자의 주의를 끌어 중요한 정보나 작업을 처리할 때 사용하는 컴포넌트예요.

![모달 예시](../images/modal.png)

모달의 경우 일반적인 페이지 콘텐츠와 분리된 독립적인 영역이에요.

때문에 **모달이 열렸다는 것을 사용자가 인식하고, 모달 내부에서만 상호작용**할 수 있어야 해요.

아래 예제는 버튼을 클릭하면 모달이 열리는 예제에요.

```tsx
<button onClick={openModal}>모달 열기</button>;
<>
  {isOpen && (
    <div style={{ position: "fixed" }}>
      <h3>다음에 다시 시도해 주세요</h3>
      <button onClick={closeModal}>확인</button>
    </div>
  )}
</>;
```

겉보기에는 모달이 구성되어 있지만, 다음과 같은 문제가 있어요.

- 모달이 열렸다는 것을 사용자가 인식하지 못해요.
- 모달 바깥의 콘텐츠와 상호작용할 수 있어요.

::: danger ❌ 접근성을 지키지 않으면 모달 영역이 이렇게 탐색돼요.

다음에 다시 시도해 주세요, 머리말<br />
확인, **버튼**<br />

:::

## 모달 접근성을 지키기 위한 방법

가장 쉬운 방법은 html 표준 요소인 `<dialog>` 요소를 사용하는 것이에요.

```tsx
const ref = useRef<HTMLDialogElement>(null);
return (
  <>
    <button aria-haspopup="dialog" onClick={() => ref.current?.showModal()}>
      모달 열기
    </button>
    <dialog ref={ref} aria-labelledby="modal-title">
      <h3 id="modal-title">다음에 다시 시도해 주세요</h3>
      <button onClick={() => ref.current?.close()}>확인</button>
    </dialog>
  </>
);
```

::: tip ✅ 접근성을 지키면 모달 영역이 이렇게 들려요.

제목은 한 줄로 써주세요, **대화상자**<br />
확인, **버튼**<br />

:::

`<dialog>` 요소를 `showModal()` 을 이용해서 열면 다음과 기능들을 자동으로 브라우저에서 제공해줘요.

- 쌓임맥락(z-index)과 상관없이 화면의 최상위에 위치하게 돼요.
- 자동으로 다이얼로그 내부에 포커스를 이동시켜줘요.
- `<dialog>` 내부의 요소만 포커스할 수 있게 돼요.
- 키보드의 ESC 키로 다이얼로그를 닫을 수 있어요.
- 다이얼로그를 끄면 원래 포커스로 돌아가게 돼요.

::: info
버튼에 들어간 `aria-haspopup="dialog"` 속성은 해당 버튼이 다이얼로그를 열 수 있음을 나타내요.
:::

::: warning
`showModal()` 을 사용하지 않고 `show()` 를 사용하거나 `<dialog open={true}>` 를 통해 다이얼로그를 열면 브라우저에서는 "비대화형 다이얼로그" 라고 판단해서 최상위에 위치하게 되는 외의 기능들을 사용할 수 없어요.
:::

## role과 aria-modal 속성으로 모달 컴포넌트 표현하기

`<dialog>` 를 사용하지 않는다면 `role="dialog"` 와 `aria-modal="true"`를 사용하여 모달을 명확히 표시할 수 있어요. 그 외에 포커스 관리, ESC 키로 모달을 닫기, 배경 콘텐츠 숨기기 등의 기능을 구현해야 해요.

```tsx
<button onClick={openModal}>모달 열기</button>;
<>
  {isOpen && (
    <div role="dialog" aria-modal="true">
      <h3>다음에 다시 시도해 주세요</h3>
      <button onClick={closeModal}>확인</button>
    </div>
  )}
</>;
```

### 체크리스트

- 모달은 `role="dialog"`와 `aria-modal="true"`로 구현해요.
- 모달 제목은 `aria-labelledby` 로 연결하거나 `aria-label`로 제공해요.
- 모달이 열릴 때 포커스를 모달 내부로 이동시키고, 모달이 닫힐 때 원래 위치로 돌려보내요.
- `ESC` 키로 모달을 닫을 수 있도록 구현해요.
- 모달이 열려있는 동안 배경 콘텐츠와의 상호작용을 차단해요.

### 포커스 트랩과 속성 관리 구현하기

모달을 접근 가능하게 만들려면 다음 세 가지를 구현해야 해요.

#### 1. 포커스 저장과 복원

모달이 열릴 때 현재 포커스 위치를 기억해뒀다가, 닫힐 때 원래 위치로 돌려보내야해요.

```tsx
const buttonRef = useRef<HTMLButtonElement>(null);
const closeModal = () => {
  setIsOpen(false);
  requestAnimationFrame(() => {
    buttonRef.current?.focus();
  });
};

return (
  <>
    <button onClick={openModal} ref={buttonRef}>
      모달 열기
    </button>
    {isOpen && (
      <div role="dialog" aria-modal="true">
        <h3>다음에 다시 시도해 주세요</h3>
        <button onClick={closeModal}>확인</button>
      </div>
    )}
  </>
);
```

#### 2. ESC 키로 모달 닫기

사용자가 ESC 키를 눌렀을 때 모달이 닫히도록 해요.

`keydown` 이벤트 리스너를 등록하여 Escape 키 입력을 감지하고 모달을 닫아요.

```tsx
useEffect(() => {
  if (!isOpen) return;

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  document.addEventListener("keydown", handleEscape);
  return () => document.removeEventListener("keydown", handleEscape);
}, [isOpen, onClose]);
```

#### 3. 배경 콘텐츠 숨기기 (inert)

모달이 열려있을 때 모달 외의 배경 콘텐츠가 스크린 리더에 읽히지 않도록 해요.

배경 콘텐츠에 `inert` 를 `true` 로 설정하여 스크린 리더가 해당 영역을 모달이 열려있는 동안 인식하지 못하도록 해요.

```tsx
useEffect(() => {
  const main = document.querySelector("main");

  if (isOpen) {
    main?.setAttribute("inert", "true");
  } else {
    main?.removeAttribute("inert");
  }

  return () => main?.removeAttribute("inert");
}, [isOpen]);
```
