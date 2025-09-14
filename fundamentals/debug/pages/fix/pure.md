# 순수 함수 분리하기

비즈니스 로직은 가능한 한 순수한 함수처럼 유지해서 쉽게 테스트할 수 있도록 해야해요. 순수 함수로 만들면 다양한 입력값에 대해 독립적으로 테스트할 수 있고, 재사용과 유지보수에도 유리해요.

간단한 예시로, 결제 금액에 따라 할인율을 적용하는 로직을 구현해볼게요.

## 예시 1

결제 금액에 따라 할인율을 적용하는 로직이 UI 컴포넌트 안에 섞여 있다면 테스트를 하려면 UI까지 함께 렌더링해야 해서 불편해요.

### 기존코드
```tsx
function OrderSummary({ totalAmount, discountRate }: { totalAmount: number; discountRate: number }) {
  const discountAmount = totalAmount >= 50000 ? totalAmount * discountRate : 0;
  const finalAmount = totalAmount - discountAmount;

  return (
    <div>
      <p>Total: {totalAmount}원</p>
      <p>Discount: {discountAmount}원</p>
      <p>Final: {finalAmount}원</p>
    </div>
  );
}

```

### 순수함수로 분리하기
비즈니스 로직을 분리해 순수 함수로 만들면 다양한 금액에 대해 독립적으로 테스트할 수 있어요. UI와 분리돼 있어 재사용성과 유지보수성도 높아져요.

```tsx
// util.ts
export function calculateDiscount(amount: number, discountRate: number) {
  return amount >= 50000 ? amount * discountRate : 0;
}

export function calculateFinalAmount(amount: number, discountAmount: number) {
  return amount - discountAmount;
}
```
```tsx
// OrderSummary.tsx
import { calculateDiscount, calculateFinalAmount } from './utils/discount';

function OrderSummary({ totalAmount, discountRate }: { totalAmount: number; discountRate: number }) {
  const discountAmount = calculateDiscount(totalAmount, discountRate);
  const finalAmount = calculateFinalAmount(totalAmount, discountAmount);

  return (
    <div>
      <p>Total: {totalAmount}원</p>
      <p>Discount: {discountAmount}원</p>
      <p>Final: {finalAmount}원</p>
    </div>
  );
}
```

## 예시 2
react의 hook예시도 들어볼게요. 모달을 보여주는 로직이에요.

### 기존코드
`localStorage`, `isTodayShown`등과 같은 여러 로직이 `useEffect` 내부에 흩어져 있어 모듈화되어 있지 않아요. 그래서 가독성도 떨어지고, 테스트도 어려워요3.

```tsx
const STORAGE_KEY = 'notification-modal-shownAt'
import { useEffect, useState } from 'react';

function Home() {
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    const lastShown = localStorage.getItem(STORAGE_KEY);
    const todayDateString = new Date().toDateString();
    const isTodayShown = lastShown === todayDateString
    
    if (!isTodayShown) {
      localStorage.setItem(STORAGE_KEY, todayDateString);
      setShowModal(true);
    }
  }, []);

  return (
    <>
      <h1>Modal</h1>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} />
      )}
    </>
  );
}

```

### 순수함수로 분리하기
`localStorage` 관련 로직을 유틸리티 파일로 분리하고, `isTodayShown`을 계산하는 로직도 별도의 유틸리티 함수로 만들었어요. 그리고 이 두 가지를 조합해서 모달을 보여줄지 여부를 판단하는 `useIsModalShow` 커스텀 훅을 구현했어요.  

**utils/localStorage.ts**
```tsx 
function getLocalStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch(err){
    console.error(err)
    return null;
  }
}

export function getLocalStorageValue(key: string): string | null {
  const localStorage = getLocalStorage();
  return localStorage ? localStorage.getItem(key) : null;
}

export function setLocalStorageValue(key:string, value: string): void {
  const localStorage = getLocalStorage();
  if (!localStorage) return;
  try {
    localStorage.setItem(key, value);
  } catch (err){
    console.error(err)
  }
}
```

**utils/modal.ts**
```tsx 
export function getIsModalShownToday(modalKey: string){
  const lastShown = getLocalStorageValue(modalKey);
  const todayDateString = new Date().toDateString();
  const isTodayShown = lastShown === todayDateString;
  return isTodayShown;
}

export function setModalShownToday(modalKey:string){
  const todayDateString = new Date().toDateString();
  setLocalStorageValue(modalKey, todayDateString)
}
```

**hooks/useIsModalShow.ts**
```tsx
import { useEffect, useState } from 'react';
import { useNotificationAgreementState } from './useNotificationAgreementState'; // 필요 시 경로 조정

const MODAL_KEY = 'test1';
export function useIsModalShow() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const isTodayShown = getIsModalShownToday(MODAL_KEY);
    if (!isTodayShown) {
      setModalShownToday(MODAL_KEY)
      setShowModal(true);
    }
  }, [isAgreed]);

  const close = () => {
    setShowModal(false);
  };

  return {
    showModal,
    close,
  };
}
```

**HomePage.tsx**
```tsx
import { useIsModalShow } from './hooks/useIsModalShow';

function HomePage() {
  const { showModal, close } = useIsModalShow();

  return (
    <>
      <h1>Welcome!</h1>
      <Modal isOpen={showModal} onAgree={agree} onClose={close} />}
    </>
  );
}
```

순수한 함수로 비즈니스 로직을 분리하면, 코드의 복잡도가 줄어들고 디버깅과 테스트가 쉬워져요. 특히 버그 수정 후 같은 문제가 다시 생기는 걸 막기 위해, 테스트 가능한 구조로 바꾸는 습관은 장기적으로 큰 도움이 돼요.
