# 데드코드를 삭제하여 깔끔한 코드베이스를 유지하기
데드코드는 실제로 사용되지 않는 변수, 함수, 스타일, 컴포넌트 등을 말해요. 실행에는 영향을 주지 않지만, 코드를 이해하고 유지보수하는 데 방해가 되고, 디버깅을 어렵게 만들어요.

예를 들어, 과거에 사용하던 유틸 함수가 지금은 어떤 컴포넌트에서도 사용되지 않는데 코드베이스에 그대로 남아 있다면, 여전히 중요한 역할을 하는 것처럼 보일 수 있어요. CSS 파일에 남아 있는 미사용 클래스도 마찬가지예요. 실제로는 적용되지 않지만, 개발자에게 혼란을 줄 수 있어요.

실험 코드도 예외는 아니에요. A/B 테스트나 기능 플래그 실험이 끝났다면, 관련된 분기 코드는 바로 제거하는 게 좋아요. 실험이 종료된 뒤에도 코드가 남아 있으면, 버그를 추적할 때 잘못된 조건 분기를 따라가거나, 이미 제거된 기능을 다시 구현하는 실수를 할 수 있어요.

## 사용되지 않는 유틸 함수

과거 특정 기획에 맞춰 만든 유틸이 기획 변경으로 더 이상 쓰이지 않을 수 있어요. 이런 코드가 남아 있으면 유지보수 중에 “아직 쓰나?” 하고 시간을 낭비해요. **기획 종료나 기능 제거 시점에 함께 지우는 것**이 좋아요.
```tsx
/** @deprecated 2024-12-31 이후 제거 예정. 크리스마스 이벤트 종료됨. 대체 없음 */
export function formatDateForChristmasEventUser(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `Merry Christmas ${year}-${month}-${day}`;
}
```
이런 데드코드 유틸 함수 등을 정리할 때는 도구를 함께 사용하면 좋아요. `ts-prune`은 사용되지 않는 export를 찾아주고, `knip`은 프로젝트 전체에서 미사용 파일이나 의존성을 정리할 수 있도록 도와줘요.


## 사용되지 않는 CSS 클래스 정리
사용되지 않는 클래스가 쌓이면 스타일시트 가독성이 떨어지고, 파싱 비용이 늘어요.

`stylelint`를 사용해 사용되지 않을 선택자가 저장되는 것을 예방할 수 도 있어요. 아래와 같이 `stylelintrc` 파일에 린트를 셋팅해 두면, 선언되었지만 사용되지 않은 클래스가 있으면 워닝을 띄워줘요. 단, 런타임에만 등장하는 클래스는 **오탐/미탐** 가능성이 있어요.

```cli
npm install --save-dev stylelint stylelint-no-unused-selectors
```

**.stylelintrc.json**
```js
{
  "extends": ["stylelint-config-standard"],
  "plugins": ["stylelint-no-unused-selectors"],
  "rules": {
    "plugin/no-unused-selectors": [true, {
      "files": ["src/**/*.html", "src/**/*.tsx", "src/**/*.jsx"],
    }]
  }
}
```


## 실험 종료 후 조건 분기
A/B 테스트가 끝났는데 분기 코드가 남아 있으면, 독자가 “아직 실험 중인가?”라고 오해해요. 종료 후에는 **채택안만 남기고 분기 삭제**가 원칙이에요.

이와같이 운영성으로 관리되어야 하는 코드는 개발자가 의지를 가지고 지워주어야 해요. 다른 업무로 바빠서 즉시 처리하지 못하는 경우, 주석을 남겨 추후 코드 제거에 도움이 될 수 있어요.
```tsx
export function RecommendationBanner({ variant }: { variant: 'A' | 'B' }) {
  //TODO:: 종료된 실험 제거 (실험안 A으로 종료)
  if (variant === 'A') {
    return <BannerA />;
  } else {
    return <BannerB />;
  }
}
```

주기적으로 데드코드를 정리하면 코드베이스가 더 단순하고 명확해져서, 디버깅과 유지보수가 훨씬 쉬워져요.
