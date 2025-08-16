# 프로젝트 구조 규칙

## 디렉토리 구조

```
src/
├── components/     # 컴포넌트 (기능별 분류)
│   ├── layout/     # 레이아웃 컴포넌트
│   ├── post/       # 게시글 관련
│   ├── profile/    # 프로필 관련
│   └── ui/         # 공통 UI 컴포넌트
├── hooks/           # 커스텀 hooks
├── lib/             # 유틸리티 함수
├── types/           # 타입 정의
├── contexts/        # React Context
├── constants/       # 상수 정의
└── styles/          # 스타일 토큰
```

## 파일 명명 규칙

- 컴포넌트: PascalCase (Button.tsx)
- hooks: camelCase + use 접두어 (useAuth.ts)
- 유틸리티: camelCase (utils.ts)
- 상수: UPPER_SNAKE_CASE

## 내보내기 규칙

- 디폴트 export를 사용합니다
- 인덱스 파일로 중앙 집중화
- 순환 의존성을 피합니다
