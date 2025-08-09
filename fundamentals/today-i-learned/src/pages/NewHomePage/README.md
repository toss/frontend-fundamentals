### NewHomePage 개발 규칙(제한사항)

이 문서는 NewHomePage(UI 전면 재구성) 작업 시 반드시 지켜야 할 제한사항을 정리합니다. 다음번에도 동일한 기준으로 작업할 수 있도록 합의된 결정을 문서화했습니다.

---

### 범위와 원칙
- **UI-only**: 비즈니스 로직(데이터 패칭, 상태관리, 인증 등)은 절대 넣지 않습니다. 필요한 데이터/상태/이벤트는 전부 **Props**로 주입받습니다.
- **폴더 고정**: 새로 만든 모든 파일은 `src/pages/NewHomePage/` 하위에만 둡니다.
- **기존 스타일/컴포넌트 재사용 금지**: 디자인/스타일/컴포넌트는 전부 새로 만듭니다.

### 전역 스타일 정책
- **전역은 Reset만 유지**: 전역 테마 변수, 다크모드, 브랜드 컬러, 타이포 스케일 등은 전부 제거했습니다.
  - `src/index.css`: Tailwind base/components/utilities + 현대적 reset만 포함합니다.
  - `tailwind.config.js`: 최소 설정(plugins/theme 확장 없음). 다크모드/커스텀 변수 미사용.
- **스코프 클래스(.nh-root) 미사용**: 페이지 전용 스코프 대신, 전역은 reset만 두고 각 컴포넌트가 Tailwind 유틸로 자체 스타일링합니다.

### 디자인/컴포넌트 규칙
- **단일 카드 밀도**: MVP는 디자인에 존재하는 카드 밀도 1가지로만 제공합니다. `compact/comfortable` 같은 추가 옵션 없음.
- **다크모드 제외**: 다크모드 토큰/스타일은 포함하지 않습니다. (추후 별도 스펙에서 재도입)
- **프리미티브 구성(권장)**: `class-variance-authority(cva)` + `tailwind-merge` + `clsx` + `@radix-ui/react-slot` + `lucide-react`로 미니 UI 키트를 구성합니다.
  - 예: `button`, `icon-button`, `badge`, `card`, `avatar`, `input`, `skeleton`, `section`
- **접근성(A11y) 기본**: 키보드 포커스 가능, 의미있는 `aria-*`, 시맨틱 role(`article`, `list`, `button`, 등) 반영.

### Props/인터페이스 가이드
- 모든 상호작용은 외부 콜백으로만 처리합니다. 예: `onClick`, `onChange`, `onLoadMore`, `onToggleLike`.
- 로딩/에러/빈 상태는 boolean 또는 대체 렌더러로 **외부에서 제어**합니다.
- 데이터 타입은 `utils/types.ts`에서만 정의하고, 컴포넌트 Props는 해당 타입을 직접 사용합니다.
- 컴포넌트 내부에 API 호출/전역 상태 접근 금지.

### 파일 구조(권장)
- `index.tsx`: 페이지 레이아웃(그리드) 및 컴포지션. 목데이터로만 시각 확인.
- `components/ui/*`: cva 기반 프리미티브.
- `components/*`: 페이지 전용 컴포넌트(헤더, 카드, 리스트, 라이트레일 등). 비즈니스 로직 없음.
- `utils/types.ts`: 데이터/이벤트 타입 정의(외부 주입을 위한 계약).

### 사용/비사용 목록
- **사용**: Tailwind(전역 reset + 유틸), cva, tailwind-merge, clsx, @radix-ui/react-slot, lucide-react, react-router-dom(Link 전용)
- **비사용**: 다크모드, 기존 레거시 스타일/컴포넌트

### 마이그레이션 참고(미래)
- 전 앱을 새 디자인으로 통일할 때는, 현재 전역이 reset-only이므로 별도 스코프 해제 작업 없이 **해당 페이지에서 완성된 UI 패턴을 점진 복제**하면 됩니다.
- 다크모드/토큰/테마가 필요해지면, 새로운 스펙에 맞춰 별도 PR에서 재도입합니다.


