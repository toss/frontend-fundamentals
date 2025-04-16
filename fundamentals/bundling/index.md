---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Bundling Fundamentals"
  tagline: "프론트엔드 번들링의 모든 것"
  image:
    loading: eager
    fetchpriority: high
    decoding: async
    src: /images/ff-symbol-gradient-webp-80.webp
    alt: Frontend Fundamentals symbol
  actions:
    - text: 첫 번째 번들링 설정해보기
      link: /tutorial/basic
    - theme: alt
      text: 소통하기
      link: /code/community

features:
  - icon: 📦
    title: 번들링이 처음이신가요?
    details: 실습하면서 웹팩의 기본 개념부터 차근차근 배워보세요.
    link: /tutorial/basic
  - icon: 🔧
    title: 웹팩을 깊이 이해하고 싶다면
    details: 진입점, 로더, 플러그인 등 웹팩의 핵심 개념을 상세히 알아보세요.
    link: /reference/overview
  - icon: ⚡
    title: 최적화에 관심이 있다면
    details: 트리 셰이킹, 코드 스플리팅 등 성능 최적화 기법을 살펴보세요.
    link: /reference/optimization
---
