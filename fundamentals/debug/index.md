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
    src: /images/bf-symbol.webp
    alt: Frontend Fundamentals symbol
  actions:
    - text: 시작하기
      link: /get-started
    - theme: alt
      text: 접근성이란?
      link: /overview

features:
  - icon: 📦
    title: 1
    details: 1-설명
    link: /overview
  - icon: 🚀
    title: 2
    details: 2-설명
    link: /webpack-tutorial/intro
  - icon: 🔍
    title: 3
    details: 3-설명
    link: /deep-dive/bundling-process/overview
---
