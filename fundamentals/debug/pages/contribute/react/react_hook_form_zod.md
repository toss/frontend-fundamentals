# React Hook Form + Zod 유효성 검증 실패 시 무반응 문제 디버깅

<br/>
<ContributorHeader name="summer" githubUrl="https://github.com/sunmerrr" avatar="https://avatars.githubusercontent.com/u/65106740?v=4" date="2025.11.5"/>

## 증상
React Hook Form과 ZodResolver를 사용하여 작성한 상품 생성 페이지에서 "Submit" 버튼 클릭 시 아무런 반응이 없었으며, 필드 에러, 콘솔 에러도 출력되지 않아 동작이 멈춰보였습니다.

## 첫 시도(와 여러 시도..)
버튼에 onClick 로그를 삽입하여 클릭 이벤트 발생 여부를 확인하였습니다.
custom submit 함수 내부에도 로그를 삽입하여 호출 여부를 확인하였습니다.
콘솔, UI, API 요청 여부 등을 확인하며 원인을 추적하였습니다.

## 찾아낸 원인
"상품 생성" 영역의 `prizeConfig`에서 전달된 값의 타입이 스키마에서 기대한 타입과 일치하지 않아, Zod의 `transform` 로직이 실행되기 이전 단계에서 검증이 실패하였습니다. 이로 인해 `transform` 내부에서 `ctx.addIssue`로 정의해 둔 커스텀 에러 로직이 수행되지 못했고, 결국 제가 의도한 필드 단위의 에러 메시지가 생성되지 않았습니다. 이 때문에 UI에서도 해당 에러 메시지가 표시되지 않는 현상으로 이어져 에러를 확인하기 어렵게 되었습니다.
그리고 React Hook Form은 유효성 검증에 실패할 경우 `handleSubmit`의 `onSubmit` 콜백을 호출하지 않기 때문에, 유효성 에러가 발생했음에도 화면에서는 아무 동작이 없는 것처럼 보이게 된 것입니다.

## 해결책
React Hook Form의 handleSubmit에 `onError` 콜백을 추가하여 유효성 검증 실패 시 에러를 핸들링 할 수 있도록 조치하였습니다.

```tsx
<form onSubmit={handleSubmit(onSubmit, onError)}>
  <button type="submit">생성</button> 
</form>
```

문제 필드인 `prizeConfig`의 값 형태를 스키마와 일치하도록 조정했습니다.

## 재발 방지를 위한 대책
유효성 검증 실패 시 무반응이 아닌, 사용자에게 명확한 에러 안내가 노출되도록 공통 처리 로직을 만들어 두기로 했습니다.

Zod 스키마와 실제 form value 타입이 불일치하지 않도록 설계 단계에서 타입 정의를 명확히 하고, `select` 등 object 형태를 반환하는 UI 컴포넌트 사용 시 스키마와의 매핑 규칙을 사전에 정해두는 것이 재발 방지를 위해서도 좋을 것 같다고 생각했습니다.

submit 로직 디버깅 시 기본적으로 `onSubmit`과 `onError` 두 경로의 콘솔 로깅을 함께 두어, 어디에서 종료되고 있는지 즉시 파악할 수 있도록 해두는것도 좋을 것 같습니다.