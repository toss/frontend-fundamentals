# 팀과 공유하고 공통 유틸에 반영하기

자주 나오는 실수는 혼자만 알지 말고 **팀과 공유해서 다 같이 배워요.** 같은 실수가 반복되지 않도록 공통 코드에 안전장치를 추가하거나 린터 규칙 등을 통해 재발 방지를 확산시켜요.

## 공통 컴포넌트 업데이트

### 문제

TextInput 컴포넌트에서는 `isDisabled`라는 이름으로 비활성 상태를 처리하고 있었어요. `disabled`는 타입상 제거되어 전달 자체가 불가능한 상황이에요. 그런데 어떤 개발자가 실수로 HTML 속성인 `disabled`를 넘기면서, 아무 동작도 하지 않는 버그가 발생했어요.

```tsx
<TextInput disabled={true} />
```

### 해결방법

이런 실수를 방지하려고, 공통 컴포넌트의 타입 정의에서 `isDisabled` 속성을 아예 제거하고, `disabled`만 사용할 수 있도록 수정했어요. 팀 내에서도 `disabled`만 사용하도록 명확한 컨벤션 확립을 해요. 이제 잘못된 prop을 넘기면 타입 에러가 나서 실수를 미리 잡을 수 있어요.

```tsx 5
import React from "react";

type Props = {
  value: string;
  // isDisabled?: boolean; 제거
  onChange: (value: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const TextInput: React.FC<Props> = ({
  disabled,
  value,
  onChange,
  ...rest
}) => {
  return (
    <input
      disabled={disabled}
      {...rest}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
```

## 린트 룰에 맞춤법 확인 추가

### 문제

팀 내에서 작성하는 텍스트에 자주 발생하는 맞춤법 오류가 있어요. 예를 들어, "~ 아니에요"를 "~ 아니예요"로 잘못 표기하는 경우가 대표적인 맞춤법 오류에요.

### 해결 방법

ESLint에 금지 단어 패턴을 등록해, 잘못된 표현이 등장했을 때 자동으로 에러 또는 워닝을 발생시키도록 설정해요. .eslintrc.js에서 맞춤법 린트 룰을 적용해요.

```js 6, 10
module.exports = {
  rules: {
    "no-restricted-syntax": [
      "error",
      {
        selector: 'Literal[value="아니예요"]',
        message: '👉 "아니예요"는 "아니에요"로 수정해야 합니다.'
      },
      {
        selector: "Literal[value=/[^ ]+에요/]",
        message: '👉 명사 + "에요" 표현은 "이에요/예요"로 수정해야 합니다.'
      }
    ]
  }
};
```

## 린린트 룰에 더미텍스트 확인 추가

### 문제

UI 개발 도중 사용한 더미 이름, 가짜 텍스트(“김토스님”, “홍길동”, “ㅇㅇㅇ” 등) 이 실제 PR에 포함돼 배포되거나 유저에게 노출되는 경우가 있어요. 특히 QA 환경에서는 가짜 이름이 버그처럼 보여 혼란을 유발하고, 실무에서 신뢰도를 해칠 수 있어요.

### 해결방법

ESLint로 특정 문자열(“김토스”, “홍길동”, “테스트용” 등) 포함 시 에러 발생하도록 설정해요. `no-restricted-syntax`는특정 구문(Syntax)을 아예 사용하지 못하도록 제한하는 ESLint 규칙이에요.

```js 6
module.exports = {
  rules: {
    "no-restricted-syntax": [
      "error",
      {
        selector: "Literal[value=/김토스|홍길동|테스트용|ㅇㅇㅇ/]",
        message:
          "👉 더미 텍스트가 포함되어 있어요. 실제 이름/데이터로 교체해주세요."
      }
    ]
  }
};
```

Literal이나 selector string 기반의 static rule 외에도, JS AST 노드를 직접 순회하거나 분석하는 커스텀 ESLint rule을 작성하면, 복잡한 조건이나 문자열 조합, 동적 로직, 함수를 기준으로도 검사를 할 수 있어요. ESLint 플러그인이나 커스텀 룰을 만들고, 해당 룰의 `create()` 함수 내에서 AST 노드를 코드로 조작할 수 있어요.

```js
module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "잘못된 국문 표현 사용 방지"
    },
    messages: {
      avoidWrongSpelling:
        '"아니예요"는 잘못된 표현입니다. "아니에요"로 바꿔주세요.'
    }
  },
  create(context) {
    return {
      Literal(node) {
        if (typeof node.value === "string" && node.value.includes("아니예요")) {
          context.report({
            node,
            messageId: "avoidWrongSpelling"
          });
        }
      }
    };
  }
};
```
