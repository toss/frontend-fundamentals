import { defineConfig } from 'vitepress'
import footnote from "markdown-it-footnote";
import path from "node:path";
import { createRequire } from "node:module";
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'
import { sharedConfig } from './shared.mjs';

const require = createRequire(import.meta.url);

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ...sharedConfig,
  title: "Bundling Fundamentals",
  description: "프론트엔드 번들링의 모든 것",
  ignoreDeadLinks: false,
  base: "/bundling/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    ...sharedConfig.themeConfig,
    nav: [
      { text: "홈", link: "/" },
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
          {
            text: "번들러란",
            link: "/bundler",
          },
        ]
      },
      {
        text: "튜토리얼",
        items: [
          {
            text: "웹팩으로 배우는 번들링",
            items: [
              {
                text: "1. 소개",
                link: "/webpack-tutorial/intro",
              },
              {
                text: "2. 웹팩 도입하고 첫 번들 만들기",
                link: "/webpack-tutorial/make-first-bundle",
              },
              {
                text: "3. 모듈로 코드 구조화하기",
                link: "/webpack-tutorial/module-system",
              },
              {
                text: "4. TypeScript 적용하기",
                link: "/webpack-tutorial/typescript",
              },
              {
                text: "5. React 적용하기",
                link: "/webpack-tutorial/react",
              },
              {
                text: "6. 스타일 관리하기",
                link: "/webpack-tutorial/style",
              },
              {
                text: "7. 이미지 등 정적 자원 다루기",
                link: "/webpack-tutorial/assets",
              },
              {
                text: "8. 플러그인으로 빌드 확장하기",
                link: "/webpack-tutorial/plugin",
              },
              {
                text: "9. 개발 서버로 생산성 높이기",
                link: "/webpack-tutorial/dev-server",
              },
            ]
          },
          {
            text: "롤업으로 배우는 라이브러리 번들링",
            items: [
              {
                text: "1. 소개",
                link: "/rollup-tutorial/intro",
              },
            ]  
            },
          {
            text: "(Legacy) 웹팩 튜토리얼",
            collapsed: true,
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
            text: "(Leagacy) 실전 웹팩 예시",
            collapsed: true,
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
            text: "소개",
            link: "/deep-dive/overview",
          },
          {
            text: "번들링 작동 방식 이해하기",
            collapsed: false,
            items: [
              { text: "번들링, 꼭 필요할까요?", link: "/deep-dive/bundling-process/overview" },
              { text: "진입점", link: "/deep-dive/bundling-process/entry" },
              { text: "경로 탐색", link: "/deep-dive/bundling-process/resolution" },
              { text: "로더", link: "/deep-dive/bundling-process/loader" },
              { text: "플러그인", link: "/deep-dive/bundling-process/plugin" },
              { text: "출력", link: "/deep-dive/bundling-process/output" },
            ],
          },
          {
            text: "개발 환경",
            collapsed: false,
            items: [
              { text: "개발 서버", link: "/deep-dive/dev/dev-server" },
              { text: "HMR", link: "/deep-dive/dev/hmr" },
              { text: "소스맵", link: "/deep-dive/dev/source-map" },
            ],
          },
          {
            text: "번들 최적화",
            collapsed: false,
            items: [
              { text: "코드 스플리팅", link: "/deep-dive/optimization/code-splitting" },
              { text: "트리 셰이킹", link: "/deep-dive/optimization/tree-shaking" },
              { text: "번들 분석", link: "/deep-dive/optimization/bundle-analyzer" },
            ],
          },

        ],
      },
    ],
  },
  markdown: {
    config: (md) => {
      md.use(footnote);
      md.use(tabsMarkdownPlugin);
    },
  },
  head: [
    [
      "link",
      { rel: "icon", type: "image/x-icon", href: "/bundling/images/favicon.ico" }
    ],
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
        },
        {
          find: /^@shared/,
          replacement: path.resolve(__dirname, '../../shared'),
        }
      ]
    }
  },
})


