---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "A11y Fundamentals"
  tagline: "프론트엔드 접근성의 모든 것"
  image:
    loading: eager
    fetchpriority: high
    decoding: async
    src: /images/ff-symbol-gradient-webp-80.webp
    alt: Frontend Fundamentals symbol
  actions:
    - text: 시작하기
      link: /overview

features:
  - icon: 📦
    title: 접근성을 왜 지켜야 할까요?
    details: 장애인, 비장애인, 개발자 모두에게 더 나은 웹 경험을 제공할 수 있어요.
    link: /why
  - icon: 🚀
    title: 주요 원칙
    details: 올바른 구조, 명확한 의미, 예측 가능한 인터랙션, 시각 정보 보완의 4가지 핵심 원칙을 살펴봐요.
    link: /principles
  - icon: 🔍
    title: eslint로 접근성 개선하기
    details: 코드 작성 단계에서 접근성 문제를 미리 발견하고 해결하고 디자인 시스템과 결합하는 방법을 배워요.
    link: /eslint/rules
---
