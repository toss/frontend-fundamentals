# 상태 챙기기

상태값은 스크린리더가 컴포넌트의 동작 변화를 인식할 수 있도록 돕는 정보예요.

대표적으로 `aria-checked`, `aria-disabled`, `aria-expanded`, `aria-selected` 등이 있어요.

| 속성            | 의미                                                                 | 적용 예시                                                |
| --------------- | -------------------------------------------------------------------- | -------------------------------------------------------- |
| `aria-checked`  | 체크 여부                                                            | 체크박스, 스위치                                         |
| `aria-selected` | 선택 여부                                                            | 탭, 리스트                                               |
| `aria-expanded` | 펼침 여부                                                            | 아코디언, 드롭다운                                       |
| `aria-disabled` | 비활성화 여부                                                        | 버튼 등                                                  |
| `aria-current`  | 여러 개의 같은 위계 속에서 현재 위치 여부                            | 네비게이션에서 현재 페이지 표시, 달력에서 오늘 날짜 표시 |
| `aria-busy`     | 로딩 중 상태                                                         | 데이터 로드 시                                           |
| `aria-live`     | 현재 사용자에게 바로 전달해야하는 중요 정보가 포함된 컨텐츠 업데이트 | 에러 메세지, 알림 메세지, 로딩                           |

아래 예시는 아코디언 컴포넌트에 상태를 전달한 예시예요.

```tsx
function Accordion() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button aria-expanded={open} onClick={() => setOpen(!open)}>
        {open ? "내용 접기" : "내용 보기"}
      </button>
      {open && <p>내용</p>}
    </div>
  );
}
```
