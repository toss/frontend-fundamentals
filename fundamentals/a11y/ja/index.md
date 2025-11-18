---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "A11y Fundamentals"
  tagline: "フロントエンド・アクセシビリティのすべて"
  image:
    loading: eager
    fetchpriority: high
    decoding: async
    src: /images/ff-symbol-gradient-webp-80.webp
    alt: Frontend Fundamentals symbol
  actions:
    - text: はじめる
      link: /ja/overview

features:
  - icon: 📦
    title: なぜアクセシビリティを守るべきなのでしょうか？
    details: 障害の有無にかかわらず、開発者を含むすべての人により良いWeb体験を提供できます。
    link: /ja/why
  - icon: 🚀
    title: 主要原則
    details: 正しい構造、明確な意味、予測可能なインタラクション、視覚情報の補完という4つのコア原則を見ていきます。
    link: /ja/principles
  - icon: 🔍
    title: eslintでアクセシビリティを改善する
    details: コード作成段階でアクセシビリティの問題を事前に発見・解決し、デザインシステムと組み合わせる方法を学びます。
    link: /ja/eslint/rules
---
