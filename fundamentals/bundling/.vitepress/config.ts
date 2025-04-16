import { defineConfig } from 'vitepress'
import footnote from "markdown-it-footnote";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Bundling Fundamentals",
  description: "프론트엔드 번들링의 모든 것",
  ignoreDeadLinks: false,
  lastUpdated: true,
  base: "/fundamentals/bundle",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "번들링이란", link: "./overview" },
      { text: "튜토리얼", link: "/tutorial/basic" },
      { text: "웹팩 깊이 이해하기", link: "/reference/overview" }
    ],

    sidebar: [
      {
        text: "시작하기",
        link: "/get-started",
      },
      {
        text: "번들링이란",
        link: "/overview",
      },
      {
        text: "튜토리얼",
        items: [
          {
            text: "1. 첫 번째 번들링 설정하기",
            link: "/tutorial/basic",
          },
          {
            text: "2. TypeScript와 사용하기",
            link: "/tutorial/typescript",
          },
          {
            text: "3. React와 함께 사용하기",
            link: "/tutorial/with-react",
          },
          {
            text: "4. CSS 파일 처리하기",
            link: "/tutorial/css",
          },
          {
            text: "5. 이미지와 폰트 다루기",
            link: "/tutorial/image-and-font",
          },
          {
            text: "6. 개발서버로 생산성 높이기",
            link: "/tutorial/dev-server",
          },
          {
            text: "7. 플러그인 추가하기",
            link: "/tutorial/plugin",
          },
          {
            text: "8. 최적화하기",
            link: "/tutorial/optimization",
          },
          {
            text: "실습: 라이브러리 예제 코드로 번들링 이해하기",
            link: "/library",
          },
        ],
      },
      {
        text: "웹팩 깊이 이해하기",
        items: [
          {
            text: "소개",
            link: "/reference/overview",
          },
          {
            text: "진입점",
            link: "/reference/entry",
          },
          {
            text: "경로 탐색",
            link: "/reference/resolution",
          },
          {
            text: "로더",
            link: "/reference/loader",
          },
          {
            text: "플러그인",
            link: "/reference/plugin",
          },
          {
            text: "출력",
            link: "/reference/output",
          },
          {
            text: "최적화 기능",
            link: "/reference/optimization",
          },
          {
            text: "개발환경",
            items: [
              {
                text: "소개",
                link: "/reference/dev/overview",
              },
              {
                text: "개발 서버",
                link: "/reference/dev/dev-server",
              },
              {
                text: "HMR",
                link: "/reference/dev/hmr",
              },
              {
                text: "소스맵",
                link: "/reference/dev/source-map",
              },
              {
                text: "환경 변수",
                link: "/reference/dev/env-variable",
              },
            ],
          },
          {
            text: "설정 템플릿 모음",
            link: "/setting-template",
          },
        ],
      },
      {
        text: "최적화 깊이 이해하기",
        items: [
          {
            text: "소개",
            link: "/reference/optimization",
          },
          {
            text: "트리셰이킹",
            link: "/reference/optimization/tree-shaking",
          },
          {
            text: "코드 스플리팅",
            link: "/reference/optimization/code-splitting",
          },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: '' }
    ]
  },
  markdown: {
    config: (md) => {
      md.use(footnote);
    },
  },
  mermaid: {
    fontFamily: "inherit",
    themeCSS: `
    p {
      line-height: revert;
    }
    `,
  },
})
