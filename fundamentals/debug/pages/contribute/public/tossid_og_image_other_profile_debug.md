# 토스아이디 OG 이미지에 타인의 프로필이 표시되는 현상 디버깅

<br/>
<ContributorHeader name="김형규" githubUrl="https://github.com/khg0" avatar="https://ca.slack-edge.com/E01JAGTHP8R-U03KVUYTXK4-5de0e0f7f2f1-512" />

## 진단하기

토스아이디를 디스코드나 카카오톡에 공유할 때, 간헐적으로 자신의 프로필이 아닌 타인의 프로필이 담긴 OG 이미지가 표시되는 문제가 발생했어요. 이 문제는 자주 발생하지 않는 간헐적인 현상이었고, 과거에도 여러 차례 비슷한 사례가 보고된 적이 있었어요. `timestamp`를 추가해서 OG 캐싱을 방지했어야 했는데도 문제가 계속 발생했어요.

사용자 입장에서는 자신의 송금 링크를 공유했는데 다른 사람의 프로필이 보이는 매우 혼란스러운 상황이었어요.

OG 이미지 생성 프로세스:

1. 브라우저에서 `https://toss.me/og?`... 에 요청을 보냄
2. `Public Gateway`가 요청을 받음
3. `Public Gateway` → OG 서버로 전달
4. OG 서버가 `Selenium`으로 서버에서 브라우저를 실행하여 이미지 생성
5. 생성된 이미지가 응답됨

## 재현하기

### 초기 가설: OG 캐시 문제?

처음에는 OG 이미지가 캐시되어서 발생하는 문제인가 싶어 OG 이미지 URL에 타임스탬프를 추가하여
캐시되지 않도록 했지만, 문제가 해결되지 않았어요.

### 디버깅 전략: 재현에 집중

서진님과 함께 재현에 집중하기로 했어요. 같은 URL로 디스코드에서 반복적으로 테스트하면
디버깅이 훨씬 유리해질 거라 판단했어요.

### 핵심 발견

실제로 A 유저의 프로필을 요청하는 Request에 대한 응답이 B 유저의 프로필로 내려가는 것을
확인했어요. Response에 담긴 `etag`를 통해 어떤 이미지가 실제로 내려갔는지 유추할 수 있었어요.

문제가 발생한 시점의 요청 로그를 분석한 결과, 두 요청이 0.1초 차이로 거의 동시에 들어온 것을 확인했어요. 이를 통해 로직에 동시성 문제가
있다고 판단했어요.

- 2024-02-09 20:17:05.672: `https://..?cashtag=lmc9999&timestamp=170747720422`
- 2024-02-09 20:17:05.770: `https://..?cashtag=toztoz8&timestamp=1707360602971`

### 근본 원인

OG 이미지를 그리는 로직이 `Selenium`으로 서버에서 브라우저를 실행하는 방식인데, 이 브라우저
인스턴스가 공유 자원이라는 사실이 고려되지 않았어요.

이전 OG 생성 요청이 끝나기 전에 다음 OG 생성 요청이 들어오면, 이전 요청이 다음 요청으로 override되는 문제였어요. 즉, `lmc9999`의 프로필을 그리고 있는 도중에 `toztoz8`의 요청이 들어오면, 같은 브라우저 인스턴스에서 `toztoz8`의 페이지로 이동하고, 결과적으로 `lmc9999` 요청에 `toztoz8`의 이미지가 응답되는 거예요.

## 수정하기

공유 자원(`Selenium` 브라우저 인스턴스)에 대한 동시 접근을 제어하기 위해 [Semaphore](https://github.com/Shopify/quilt/blob/main/packages/semaphore/README.md) 패턴을 적용했어요.

`Semaphore`를 사용하여 이전 OG 생성 요청이 처리 중일 때 새로운 요청이 들어오면, 이전 요청이 완전히 Resolve 될 때까지 대기하도록 변경했어요.

```jsx
// 수정 전: 동시에 여러 요청이 같은 브라우저 인스턴스 사용
async function generateOG(params) {
  const browser = await getBrowser(); // 공유 리소스
  const image = await captureScreen(browser, params);
  return image;
}

// 수정 후: Semaphore로 순차 처리 보장
const ogSemaphore = new Semaphore(1); // 한 번에 하나의 요청만 처리

async function generateOG(params) {
  return await ogSemaphore.run(async () => {
    const browser = await getBrowser();
    const image = await captureScreen(browser, params);
    return image;
  });
}
```

이렇게 하면 OG 생성 요청들이 순차적으로 처리되어, 서로 다른 요청이 같은 브라우저 인스턴스를 간섭하지 않게 돼요.
