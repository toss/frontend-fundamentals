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
  base: "/bundling/",
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
          {
            text: "번들러란",
            link: "/bundler",
          },
        ]
      },
      {
        text: "가이드",
        items: [
          {
            text: "웹팩으로 배우는 번들링",
            items: [
              {
                text: "1. 웹팩 시작하기",
                items: [
                  {
                    text: "첫 번들 만들기",
                    link: "/tutorial/basic",
                  },
                ]
              },
              {
                text: "2. 실전 프로젝트 구성하기",
                items: [
                  {
                    text: "TypeScript 프로젝트 설정",
                    link: "/tutorial/basic",
                  },
                  {
                    text: "React 애플리케이션 번들링",
                    link: "/tutorial/basic",
                  },
                  {
                    text: "스타일 관리하기",
                    link: "/tutorial/basic",
                  },
                  {
                    text: "리소스 관리하기",
                    link: "/tutorial/basic",
                  },
                ]
              },
              {
                text: "3. 프로덕션 최적화",
                items: [
                  {
                    text: "플러그인 활용하기",
                    link: "/tutorial/basic",
                  },
                  {
                    text: "성능 최적화하기",
                    link: "/tutorial/basic",
                  },
                  {
                    text: "개발 환경 개선하기",
                    link: "/tutorial/basic",
                  },
                ]
              },
            ]
          },
          {
            text: "롤업으로 배우는 라이브러리 번들링",
            items: [
              {
                text: "1. 롤업 시작하기",
                items: [
                  {
                    text: "첫 번들 만들기",
                    link: "/tutorial/basic",
                  },
                ]
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
            text: "1. 웹팩의 동작 원리",
            collapsed: true, 
            items: [
              { text: "웹팩 핵심 개념", link: "/reference/overview" },
              { text: "진입점", link: "/reference/entry-output" },
              { text: "모듈 해석 규칙", link: "/reference/resolution" },
              { text: "로더 활용", link: "/reference/loader" },
              { text: "에셋 모듈 관리", link: "/reference/asset-modules" },
              { text: "플러그인 구성", link: "/reference/plugin" },
              { text: "결과물", link: "/reference/output" },
            ],
          },
          {
            text: "2. 번들 최적화 기법",
            collapsed: true,
            items: [
              { text: "트리셰이킹", link: "/reference/optimization/tree-shaking" },
              { text: "코드 스플리팅", link: "/reference/optimization/code-splitting" },
              { text: "캐싱 최적화", link: "/reference/optimization/caching" },
              { text: "번들 분석", link: "/reference/optimization/bundle-analysis" },
            ],
          },
          {
            text: "3. 개발 환경 고도화",
            collapsed: true,
            items: [
              { text: "개발 서버", link: "/reference/dev/dev-server" },
              { text: "HMR", link: "/reference/dev/hmr" },
              { text: "소스맵", link: "/reference/dev/source-map" },
              { text: "환경 변수 관리", link: "/reference/dev/env-variable" },
              { text: "절대 경로 설정", link: "/reference/alias" },
              { text: "프록시 설정", link: "/reference/dev/proxy" },
              { text: "빌드 성능 개선", link: "/reference/dev/build-performance" },
            ],
          },
          {
            text: "4. 실전 활용 사례",
            collapsed: true,
            items: [
              { text: "라이브러리 번들링", link: "/reference/advanced/library" },
              { text: "모듈 페더레이션", link: "/reference/advanced/micro-frontend" }
            ],
          },
        ],
      }
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
    ['link', { rel: 'icon', href: 'images/favicon.ico' }],
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
