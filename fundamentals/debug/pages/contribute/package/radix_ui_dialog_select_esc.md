# Radix UI Dialog 내 Select 컴포넌트 ESC 키 충돌 버그 사례

<br/>
<ContributorHeader name="devtedlee" githubUrl="https://github.com/devtedlee" avatar="https://avatars.githubusercontent.com/u/17678485?v=4" date="2025.11.5"/>

## 증상

Radix UI Dialog 내부에 Select 컴포넌트를 배치했어요.
Select 드롭다운이 열려 있는 상태에서 ESC 키를 누르면, Select만 닫히는 대신 부모인 Dialog 전체가 닫혀버리는 현상이 발생했어요.
가끔 페이지 전체의 포커스가 깨지면서 사용자 액션이 먹통이 되는 문제도 있었어요.

## 첫 시도

`event.stopPropagation()`: Select의 `onEscapeKeyDown` 이벤트 핸들러에서 이벤트 전파를 차단하여 Dialog가 ESC 키 이벤트를 받지 못하게 하려고 시도했어요.

결과: 실패했어요. Dialog와 Select가 각각 다른 Portal을 통해 렌더링되기 때문에, 단순한 이벤트 버블링 차단으로는 둘의 상호작용을 제어할 수 없었어요.

이 외에도 Select의 상태를 부모에서 제어하는 제어 컴포넌트 패턴, 전역 `keydown` 리스너 등 다양한 방법을 시도했지만 모두 실패했답니다. 문제의 원인이 단순한 코드 로직 레벨이 아니라는 걸 짐작할 수 있었죠.

찾아낸 원인: 보이지 않는 두 개의 '레이어 관리자'

문제의 핵심을 파고들자 GitHub 이슈에서 결정적인 단서를 찾을 수 있었어요. 원인은 Radix UI의 내부 동작 방식과 패키지 매니저의 의존성 관리 방식이 맞물려 발생하고 있었어요.

### @radix-ui/react-dismissable-layer의 역할

Radix UI의 Dialog, Select, Popover 같은 컴포넌트들은 내부적으로 `@radix-ui/react-dismissable-layer` 라는 패키지를 공통으로 사용해요. 이 패키지는 이름처럼 '닫힐 수 있는 레이어'들을 관리하는 전문 매니저예요. 화면에 Modal이나 Popover가 열릴 때마다 이들을 스택(stack)처럼 차곡차곡 쌓아두죠. 그리고 사용자가 ESC 키를 누르거나 외부를 클릭하면, 스택의 가장 위에 있는 레이어부터 순서대로 닫는 역할을 해요. 덕분에 Modal 위에 Popover가 열렸을 때 Popover가 먼저 닫히는 자연스러운 동작이 가능해져요.

### 버전 충돌이 부른 비극

문제는 패키지 매니저(pnpm, npm 등)가 의존성을 설치할 때 시작돼요. `@radix-ui/react-dialog`가 의존하는 dismissable-layer 버전과 `@radix-ui/react-select`가 의존하는 버전이 미세하게 다를 수 있어요. 예를 들어, node_modules 안에 아래처럼 두 개의 버전이 동시에 설치되는 거죠.

```
@radix-ui/react-dialog -> uses @radix-ui/react-dismissable-layer@1.0.4
@radix-ui/react-select -> uses @radix-ui/react-dismissable-layer@1.0.5
```

이렇게 되면 우리 애플리케이션에는 **두 명의 독립적인 '레이어 관리자'**가 생겨버려요. 각 관리자는 자신만의 스택을 따로 관리하고, 서로의 존재를 전혀 알지 못해요.

Dialog가 열리면 -> 관리자 A의 스택에 [Dialog]가 쌓여요.

Select가 열리면 -> 관리자 B의 스택에 [Select]가 쌓여요.

이 상태에서 사용자가 ESC 키를 누르면, 관리자 A는 자신의 스택을 보고 "어, 내 스택 최상단은 Dialog네? 닫아야겠다!"라고 판단하고 Dialog를 닫아버려요. 관리자 B 역시 자신의 스택을 보고 Select를 닫죠. 결국 Dialog가 먼저 닫혀버리니 우리 눈에는 Modal 전체가 사라지는 현상으로 보였던 거예요.

## 해결책: '레이어 관리자'를 하나로 통일하기

원인을 알았으니 해결책은 명확해요. 우리 프로젝트에 존재하는 여러 명의 '레이어 관리자'를 해고하고, 단 한 명의 유능한 관리자만 남기는 거예요. 즉, `@radix-ui/react-dismissable-layer`가 단 하나의 버전만 사용되도록 강제하면 돼요.

package.json 파일에 overrides (pnpm, npm) 또는 resolutions (yarn) 설정을 추가해서 여러 버전으로 나뉜 의존성을 하나의 버전으로 통일시켜요.

package.json (pnpm 예시)

```js
{
  "pnpm": {
    "overrides": {
      "@radix-ui/react-dismissable-layer": "1.0.5"
    }
  }
}
```

설정을 추가한 뒤, node_modules와 lock 파일을 깨끗하게 지우고 다시 설치하면 문제가 해결돼요.

```
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

이제 모든 Radix UI 컴포넌트들이 단일 버전의 dismissable-layer를 공유하게 되고, 레이어 스택은 정상적으로 [Dialog, Select] 순서로 쌓여서 문제가 해결됐어요.

## 재발방지를 위한 대책

정기적인 의존성 검사: pnpm list [package-name] 같은 명령어로 주요 공통 내부 의존성들의 버전이 여러 개로 나뉘지 않았는지 주기적으로 확인하기로 했어요.

의심스러운 상호작용 버그 발생 시: 코드 레벨의 디버깅에만 집중하기보다, 의존성 트리부터 확인하는 습관을 들이는 것이 중요하다고 생각해요. 특히 UI 라이브러리 컴포넌트 간 충돌 시, 공통으로 사용하는 내부 패키지가 있는지 확인하고 버전 통일성을 검사하기로 했어요.

팀 내 공유: 비슷한 문제가 생겼을 때 빠르게 대처할 수 있도록 팀 내에 이번 이슈와 해결 과정을 문서화하고 공유하기로 했어요.
