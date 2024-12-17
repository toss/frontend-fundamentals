# 매직 넘버에 이름 붙이기

<Badge type="info" text="가독성" />
<Badge type="info" text="응집도" />

**매직 넘버**(Magic Number)란 정확한 뜻을 밝히지 않고 소스 코드 안에 직접 숫자 값을 넣는 것을 말해요. 

예를 들어, 찾을 수 없음(Not Found)을 나타내는 HTTP 상태 코드로 `404` 값을 바로 사용하는 것이나,
하루를 나타내는 `86400`초를 그대로 사용하는 것이 있어요.

## 📝 코드 예시

다음 코드는 좋아요 버튼을 눌렀을 때 좋아요 개수를 새로 내려받는 함수예요.

```typescript 3
async function onLikeClick() {
  await postLike(url);
  await delay(300);
  await refetchPostLike();
}
```

## 👃 코드 냄새 맡아보기

### 가독성

이 코드는 `delay` 함수에 전달된 `300`이라고 하는 값이 어떤 맥락으로 쓰였는지 알 수 없어요. 
원래 코드를 작성한 개발자가 아니라면, 어떤 목적으로 300ms동안 기다리는지 알 수 없죠.

- 애니메이션이 완료될 때까지 기다리는 걸까?
- 좋아요 반영에 시간이 걸려서 기다리는 걸까?
- 테스트 코드였는데, 깜빡하고 안 지운 걸까?

하나의 코드를 여러 명의 개발자가 함께 수정하다 보면 의도를 정확히 알 수 없어서 코드가 원하지 않는 방향으로 수정될 수도 있어요.

### 응집도

`300`이라고 하는 숫자를 애니메이션 완료를 기다리려고 사용했다면, 재생하는 애니메이션을 바꿨을 때 조용히 서비스가 깨질 수 있는 위험성이 있어요.
충분한 시간동안 애니메이션을 기다리지 않고 바로 다음 로직이 시작될 수도 있죠.

같이 수정되어야 할 코드 중 한쪽만 수정된다는 점에서, 응집도가 낮은 코드라고도 할 수 있어요.

## ✏️ 개선해보기

숫자 `300`의 맥락을 정확하게 표시하기 위해서 상수 `ANIMATION_DELAY_MS`로 선언할 수 있어요.

```typescript 1,5
const ANIMATION_DELAY_MS = 300;

async function onLikeClick() {
  await postLike(url);
  await delay(ANIMATION_DELAY_MS);
  await refetchPostLike();
}
```

