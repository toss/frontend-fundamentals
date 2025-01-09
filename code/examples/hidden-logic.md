# 숨은 로직 드러내기

<div style="margin-top: 16px">
<Badge type="info" text="예측 가능성" />
</div>

함수나 컴포넌트의 이름, 파라미터, 반환 값에 드러나지 않는 숨은 로직이 있다면, 함께 협업하는 동료들이 동작을 예측하는 데에 어려움을 겪을 수 있어요.

## 📝 코드 예시

다음 코드는 사용자의 계좌 잔액을 조회할 때 사용할 수 있는 `fetchBalance` 함수예요. 함수를 호출할 때마다 암시적으로 `balance_fetched`라는 로깅이 이루어지고 있어요.

```typescript 4
async function fetchBalance(): Promise<number> {  
  const balance = await http.get<number>('...');

  logging.log('balance_fetched');

  return balance;
}
```

## 👃 코드 냄새 맡아보기

### 예측 가능성

`fetchBalance` 함수의 이름과 반환 타입만을 가지고는 `balance_fetched` 라는 로깅이 이루어지는지 알 수 없어요. 그래서 로깅을 원하지 않는 곳에서도 로깅이 이루어질 수 있어요. 

또, 로깅 로직에 오류가 발생했을 때 갑자기 계좌 잔액을 가져오는 로직이 망가질 수도 있죠.

## ✏️ 개선해보기

함수의 이름과 파라미터, 반환 타입으로 예측할 수 있는 로직만 구현 부분에 남기세요.

```typescript
async function fetchBalance(): Promise<number> {
  const balance = await http.get<number>('...');

  return balance;
}
```

로깅을 하는 코드는 별도로 분리하세요.

```tsx
<Button 
  onClick={async () => {
    const balance = await fetchBalance();
    logging.log('balance_fetched');

    await syncBalance(balance);
  }}
>
  계좌 잔액 갱신하기
</Button>
```