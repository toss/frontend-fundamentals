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
- **컴포넌트 반응형 대응**: 되도록이면 컴포넌트의 width 같은 경우는 고정 픽셀로 하지말고, 외부에 의존해서 대응해서 변경될 수 있도록 구현.

### 📱 Mobile-First 디자인 철학

이 프로젝트는 **Mobile-First 반응형 디자인 접근법**을 따릅니다. 새로운 기능이나 컴포넌트를 개발할 때 다음 가이드라인을 준수해주세요:

#### 반응형 브레이크포인트
```javascript
// tailwind.config.js
{
  screens: {
    md: "768px",   // 태블릿 시작점
    lg: "1280px"   // 데스크톱 시작점
  }
}
```

#### 화면 크기별 정의
- **모바일** (0-767px): 기본 스타일, prefix 없음
- **태블릿** (768px-1279px): `md:` prefix 사용
- **데스크톱** (1280px 이상): `lg:` prefix 사용

#### 개발 가이드라인

**1. 모바일 베이스 스타일부터 시작**
```tsx
// ✅ 좋은 예: Mobile-first
<div className="px-6 lg:px-[222px]">  // 모바일: 24px, 데스크톱: 222px
<div className="grid grid-cols-1 lg:grid-cols-[5fr_3fr]">  // 모바일: 1열, 데스크톱: 2열

// ❌ 나쁜 예: Desktop-first
<div className="px-[222px] max-lg:px-6">  // max-* 유틸리티 사용 지양
```

**2. 점진적 향상 (Progressive Enhancement)**
- 핵심 콘텐츠는 모든 화면에서 표시
- 부가 기능은 큰 화면에서만 표시: `hidden lg:block`
- 모바일에서 단순하게 시작, 데스크톱에서 기능 확장

**3. 콘텐츠 우선순위**
```tsx
// 필수 콘텐츠: 항상 표시
<main className="block">

// 선택적 향상: 모바일에서 숨김
<aside className="hidden lg:block">  // 사이드바
<div className="hidden lg:flex">      // 검색바
```

**4. 일관된 패턴**
- **여백/간격**: 작게 시작, 큰 화면에서 확장
- **그리드 레이아웃**: 1열 → 다중 열
- **타이포그래피**: 반응형 텍스트 스케일링 없이 일관된 폰트 크기 사용
- **내비게이션**: 하단 내비게이션(모바일) → 사이드 내비게이션(데스크톱)

#### 컴포넌트 예시
```tsx
// Mobile-first 컴포넌트 구조
function Component() {
  return (
    <div className="
      // 모바일 베이스 (0-767px)
      p-4 
      text-base
      grid grid-cols-1
      
      // 태블릿 (768px+)
      md:p-6
      
      // 데스크톱 (1280px+)
      lg:p-8
      lg:grid-cols-2
    ">
      {/* 모든 화면에서 표시되는 필수 콘텐츠 */}
      <div className="block">...</div>
      
      {/* 데스크톱에서만 표시되는 향상 기능 */}
      <div className="hidden lg:block">...</div>
    </div>
  );
}
```

#### 테스트 체크리스트
- [ ] 모바일 뷰포트 먼저 테스트 (320px - 767px)
- [ ] 태블릿 레이아웃 확인 (768px - 1279px)
- [ ] 데스크톱 향상 기능 검증 (1280px+)
- [ ] 모바일에서 터치 타겟 ≥44px 확인
- [ ] 가로 스크롤 없이 콘텐츠 접근 가능한지 확인

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
