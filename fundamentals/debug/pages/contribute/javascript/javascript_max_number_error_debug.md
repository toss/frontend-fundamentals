# MAX_SAFE_INTEGER 정밀도 손실 디버깅

<br/>
<ContributorHeader name="이지수" githubUrl="https://github.com/lee-ji-soo-v2" avatar="https://ca.slack-edge.com/E01JAGTHP8R-U070UAECPSB-764e21afe6ca-512" />

## 진단하기

특정 푸시를 타고 들어온 사용자가 보너스 찬스를 받지 못하는 문제가 발생했어요. Push URL의
query parameter에 포함된 pushId 값을 그대로 서버에 보내야 하는데, 일부 사용자에게서 서버에
전달되는 pushId 값이 원본과 다른 값으로 변환되는 현상이 발견되었어요.

구체적인 증상:

- URL query param: pushId=17593310758458777
- API로 전송되는 값: 17593310758458776
- 마지막 자리가 7에서 6으로 변경됨

이 문제로 인해 서버에서 올바른 pushId를 찾지 못하고, 사용자가 보너스 혜택을 받지 못하는
상황이 발생했어요.

## 재현하기

문제가 발생하는 지점을 찾기 위해 queryParam으로 받아온 pushId가 API로 전송되기까지의 과정을
디버거로 추적했어요:

```jsx
const _pushId = useQueryParam("pushId");
debugger;

const pushId = Number(pushId);
debugger; // 여기서 값이 바뀜을 확인!

const result = await receiveBonusChanceByPushId({ pushId });
```
디버거를 통해 Number() 함수를 호출하는 순간 값이 변경된다는 것을 명확히 확인했어요.


### 원인파악 
JavaScript의 Number 타입은 IEEE 754 배정밀도(64-bit) 부동소수점 형식을 사용해요. 이 형식에서
정수의 안전 정밀 범위는 ≤ 2^53 - 1 = 9,007,199,254,740,991이에요.

pushId 값인 17593310758458777은 이 범위를 초과하므로, Number(pushId) 변환 시 끝자리 정밀도가
깨져서 17593310758458776처럼 변환되는 거예요.

```jsx
// JavaScript의 안전한 정수 범위
Number.MAX_SAFE_INTEGER // 9007199254740991

// 문제가 되는 pushId
17593310758458777 > Number.MAX_SAFE_INTEGER // true

// 변환 시 정밀도 손실
Number("17593310758458777") // 17593310758458776
```

## 수정하기
API에 전달할 때 string 값을 그대로 사용하도록 수정했어요. Number로 변환하지 않고 문자열
그대로 서버에 보내면 정밀도 손실 없이 정확한 값을 전달할 수 있어요.

```jsx
// 수정 전
const pushId = Number(queryParam); // 정밀도 손실 발생
await receiveBonusChanceByPushId({ pushId });

// 수정 후
const pushId = queryParam; // string 그대로 사용
await receiveBonusChanceByPushId({ pushId });

```

## 재발방지하기

### 큰 정수 값 처리 시 주의사항

JavaScript에서 2^53 - 1보다 큰 정수를 다룰 때는 Number 타입으로 변환하면 안 돼요. 특히 ID
값이나 타임스탬프처럼 큰 숫자가 사용될 수 있는 경우에는 다음과 같은 대안을 사용해야 해요:

1. 문자열로 유지: 서버 API에서 문자열을 받을 수 있다면 변환하지 않고 그대로 전달
2. BigInt 사용: 큰 정수 연산이 필요하다면 BigInt() 사용
3. 타입 검증: TypeScript를 사용한다면 string 타입으로 명시

### 타입 변환의 암묵적 가정 점검

코드를 작성할 때 "숫자처럼 보이니까 Number로 변환하자"는 암묵적인 가정을 하기 쉬워요. 하지만
데이터의 범위와 특성을 먼저 파악하고, 정말 Number 타입이 필요한지, 아니면 문자열로 충분한지
검토해야 해요.

### Query Parameter 처리 시 주의

URL query parameter는 항상 문자열이에요. 이를 다른 타입으로 변환할 때는 신중해야 해요. 특히
ID 값처럼 서버에서 생성된 고유 식별자는 원본 형식을 유지하는 것이 가장 안전해요