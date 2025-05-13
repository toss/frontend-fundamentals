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
    src: /images/bf-symbol.webp
    alt: Frontend Fundamentals symbol
  actions:
    - text: 시작하기
      link: /get-started
    - theme: alt
      text: 번들링이란
      link: /overview

features:
  - icon: 📦
    title: 번들링, 왜 필요할까요?
    details: 번들링이 무엇이고 왜 중요한지 쉽게 알려드려요.
    link: /overview
  - icon: 🚀
    title: 웹팩으로 실습해봐요
    details: 웹팩을 직접 따라 하며 번들링 과정을 익혀봐요.
    link: /webpack-tutorial/intro
  - icon: 🔍
    title: 더 깊이 배우고 싶다면
    details: 웹팩의 핵심 개념과 고급 기법까지 단계별로 배워봐요.
    link: /reference/overview
---
