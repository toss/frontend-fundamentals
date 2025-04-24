import { defineConfig } from 'vitepress'
import footnote from "markdown-it-footnote";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Bundling Fundamentals",
  description: "프론트엔드 번들링의 모든 것",
  ignoreDeadLinks: false,
  lastUpdated: true,
  base: "/fundamentals/bundling/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "번들링이란", link: "./overview" },
      { text: "가이드", link: "/tutorial/basic" },
      { text: "웹팩 깊이 이해하기", link: "/reference/overview" }
    ],

    sidebar: [
      {
        text: "소개",
        items: [
          {
            text: "시작하기",
            link: "/get-started",
          },
          {
            text: "번들링이란",
            link: "/overview",
          },
        ]
      },
      {
        text: "가이드",
        items: [
          {
            text: "웹팩 튜토리얼",
            items: [
              {
                text: "1. 번들링 시작하기",
                link: "/tutorial/basic",
              },
              {
                text: "2. 프로젝트 확장하기",
                items: [
                  {
                    text: "TypeScript 코드 번들링하기",
                    link: "/tutorial/typescript",
                  },
                  {
                    text: "React 코드 번들링하기",
                    link: "/tutorial/with-react",
                  },
                  {
                    text: "CSS 파일 번들링하기",
                    link: "/tutorial/css",
                  },
                  {
                    text: "이미지와 폰트 다루기",
                    link: "/tutorial/image-and-font",
                  },
                ]
              },
              {
                text: "3. 자주 쓰는 웹팩 설정들",
                items: [
                  
                  {
                    text: "플러그인 추가하기",
                    link: "/tutorial/plugin",
                  },
                  {
                    text: "최적화하기",
                    link: "/tutorial/optimization",
                  },
                  {
                    text: "개발서버로 생산성 높이기",
                    link: "/tutorial/dev-server",
                  },
                ]
              }
            ]
          },
          {
            text: "실전 웹팩 예시",
            items: [
              {
                text: "라이브러리 번들링하기",
                link: "/library",
              },
              {
                text: "상황별 웹팩 설정 템플릿",
                link: "/setting-template",
              },
            ]
          },
        ],
      },
      {
        text: "심화 학습",
        items: [
          {
            text: "웹팩 속성 이해하기",
            collapsed: true,
            items: [
              {
                text: "핵심 개념",
                link: "/reference/overview",
              },
              {
                text: "진입점 설정하기",
                link: "/reference/entry",
              },
              {
                text: "경로 탐색 규칙 이해하기",
                link: "/reference/resolution",
              },
              {
                text: "로더 구조 살펴보기",
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
            ],
          },
          {
            text: "개발 편의를 높이는 웹팩 설정",
            collapsed: true,
            items: [
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
            ]
          },
          {
            text: "웹팩 최적화하기",
            collapsed: true,
            items: [
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
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/toss/frontend-fundamentals' }
    ]
  },
  markdown: {
    config: (md) => {
      md.use(footnote);
    },
  },
  head: [
    [
      "meta",
      {
        property: "og:image",
        content: "https://static.toss.im/illusts/bf-meta.png"
      }
    ],
    [
      "meta",
      {
        name: "twitter:image",
        content: "https://static.toss.im/illusts/bf-meta.png"
      }
    ],
  ],
  vite: {
    resolve: {
      alias: [
        {
          find: /^vue$/,
          replacement: path.dirname(
            require.resolve("vue/package.json", {
              paths: [require.resolve("vitepress")]
            })
          )
        },
        {
          find: /^vue\/server-renderer$/g,
          replacement: path.dirname(
            require.resolve("vue/server-renderer", {
              paths: [require.resolve("vitepress")]
            })
          )
        }
      ]
    }
  },
})
