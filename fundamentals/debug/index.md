---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Debug Fundamentals"
  tagline: "프론트엔드 디버깅의 모든 것"
  image:
    loading: eager
    fetchpriority: high
    decoding: async
    src: /images/ff-symbol-gradient-webp-80.webp
    alt: Frontend Fundamentals symbol
  actions:
    - text: 시작하기
      link: /pages/introduce.md

features:
  - icon: 🔍
    title: 문제를 정확히 이해하고 싶다면
    details: 에러 메시지를 분석하고 디버깅 로그를 정리해서 문제의 원인을 명확히 파악해요.
  - icon: 🧪
    title: 버그를 빠르게 재현하고 싶다면
    details: 간소화된 코드와 자동화된 테스트로 버그를 재현하고 검증 주기를 단축해요.
  - icon: 🛠️
    title: 코드를 확실히 고치고 싶다면
    details: 에러의 증상이 아닌 원인을 수정하고, 순수 함수를 활용해 테스트 가능하게 만들어요.
  - icon: 🔄
    title: 같은 실수를 반복하고 싶지 않다면
    details: 디버깅 경험을 문서화하고 팀과 공유해서 재발을 방지해요.
---
