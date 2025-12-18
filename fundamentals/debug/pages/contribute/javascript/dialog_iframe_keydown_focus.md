# Dialog가 켜지면 TV 리모콘이 작동하지 않는 문제 사례
## 부제: 에러메세지가 없는 문제의 디버깅 사례

<ContributorHeader
  name="BinsanSong"
  githubUrl="https://github.com/bingbing-ba"
  avatar="https://avatars.githubusercontent.com/u/40254931?v=4"
  date="2025.11.6"
/>

## 증상
저희가 만든 TV 앱에서 shadcn/ui의 Dialog가 켜지면 그 때부터 리모콘이 먹히지 않기 시작했어요.

### TV 앱 소개
TV 앱은 정적인 html파일 하나를 만든다고 생각하면 돼요. 이걸 부모라고 할게요.
리모컨의 입력은 부모(html)에서 `keydown` 이벤트를 통해 받을 수 있어요.
토스에서 웹뷰를 사용해서 앱 심사를 거치지 않고 빠른 업데이트를 하는 것 처럼, 저희도 제출한 html(부모) 안에 iframe(자식)을 심어서 빠른 업데이트를 하려고 했어요.

리모콘 입력을 자식(iframe)이 받아야할 때, 부모에서 `keydown` 이벤트를 받아, 자식에게 postMessage로 전달하는 방식으로 구현했어요. 자식(iframe)이 바로 `keydown` 이벤트를 들을 수는 없었거든요.
자식(iframe)에서 Dialog가 켜지면, 리모콘을 아무리 입력해도 부모의 `keydown` 이벤트 리스너가 동작하지 않았어요.
어떤 에러 메세지도 없었어요.😭

## 첫 시도
`keypress`나 `keyup`등 다른 이벤트는 동작하고 있을까 확인해봤는데, 그렇지 않았어요.
일단 출시가 바빠 한 달은 shadcn/ui의 Dialog를 사용하지 않고, 직접 만든 컴포넌트를 활용했어요.
찾아낸 원인

## 발견 과정
렌더링 된 Dialog를 개발자 도구로 살펴보고 있었는데, 컨테이너에 `tabIndex=-1` 속성이 설정되어 있는 게 눈에 띄었어요. 이게 왜 필요할까?🤔 생각하다가, 컨테이너에 포커싱을 해야하나보다 하고 생각하게 되었어요.
shadcn/ui의 Dialog가 내부적으로 사용하는 Radix ui의 Dialog 코드를 살펴보기 시작했어요.
Radix의 Dialog는 내부적으로 FocusScope를 사용했는데, 이 컴포넌트는 내부에 focus가능한 요소가 있다면 그 요소를 focus하고, 그렇지 않다면 컨테이너인 Dialog를 focus 했어요.
즉, Dialog가 mount 되면 포커스가 Dialog로 옮겨와요.

## 원인 설명
키보드 이벤트는 현재 포커스를 받고 있는 요소, `document.activeElement`가 수신하게 돼요.
원래는 부모의 body가 activeElement였어요. 기본값이거든요. 그래서 부모에서 `keydown` 이벤트를 받아서 자식(iframe)에 전달한거죠.
그런데 자식(iframe) 내부의 Dialog가 마운트 되면 `document.activeElement`가 자식(iframe)이 되어버려요. 그러면 부모에게 더 이상 `keydown` 이벤트가 전달되지 않아요. 리모콘도 작동하지 않게 돼요.

## 해결책
처음부터 자식(iframe)이 `keydown` 이벤트를 받는 것이 앞으로 편하겠다고 생각했어요.
자식의 body에 `tabIndex=-1`을 설정하고, 자식이 마운트 되면 body를 포커스했어요.
원래 부모에게 message로 받던 리모콘 입력은 자식(iframe)에서 직접 `keydown` 이벤트리스너로 받아요.
자식만 수정해 배포하면 되었기 때문에, 별도의 심사를 다시 받을 필요도 없었어요.