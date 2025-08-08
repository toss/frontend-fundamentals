# Today I Learned - 소셜 미디어 플랫폼

## 📖 프로젝트 개요

Frontend Fundamentals를 위한 **트위터 스타일 학습 공유 플랫폼**

- **목적**: 개발자들이 오늘 배운 내용을 공유하고 소통
- **디자인**: [Frontend Fundamentals](https://frontend-fundamentals.com/code-quality/code/) 스타일 일관성
- **API**: GitHub Discussions API 활용 (`/api/github.js`)

### 공통 기능

- [x] **VitePress과 통일된 CSS** - 현재 FF 홈페이지(vitepress로 구현)와 일관된 디자인 시스템
- [x] **다크/라이트 모드** - 자동 감지 + 수동 토글
- [x] **React Query v5** - 상태 관리 및 캐싱
- [x] **반응형 레이아웃** - 모바일/데스크톱 대응
- [x] **github api 연동** - github api 연동 테스트

## 🚀 페이지별 기능 명세 (~07.21)

### 메인 페이지

- [x] **무한스크롤 피드** - 목업 데이터로 동작
- [x] **실시간 게시물 피드** - GitHub Discussions API 연동
- [x] **새 게시물 작성** - 모달/페이지 형태
- [x] **좋아요 기능** - GitHub Reactions 활용
- [x] **인기 게시물** - 상단 배치, 좋아요/댓글 수 기준
- [ ] **github 로그인** - github 로그인 기능 추가

### 상세 페이지

- [ ] **게시물 상세보기** - 전체 내용 표시
- [ ] **댓글/대댓글** - 트리 구조로 표시

### 내정보 페이지

- [ ] **사용자 프로필** - GitHub 계정 연동
- [ ] **내 게시물 관리** - 작성한 글 목록
- [ ] **활동 통계** - 작성 수, 좋아요 수 등
