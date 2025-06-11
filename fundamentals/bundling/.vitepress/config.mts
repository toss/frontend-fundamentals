import { defineConfig } from 'vitepress'
import footnote from "markdown-it-footnote";
import path from "node:path";
import { createRequire } from "node:module";
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'
import { shared } from './shared.mjs';

const require = createRequire(import.meta.url);

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ...shared,
  title: "Bundling Fundamentals",
  description: "프론트엔드 번들링의 모든 것",
  ignoreDeadLinks: false,
  base: "/bundling/",
  locales: {
    // temporary
    en: {
      label: "English",
      lang: "en",
      themeConfig: { nav: [{ text: "Home", link: "/en/" }] }
    },
    ja: {
      label: "日本語",
      lang: "ja",
      themeConfig: { nav: [{ text: "ホーム", link: "/ja" }] }
    },
    "zh-hans": {
      label: "简体中文",
      lang: "zh-hans",
      themeConfig: { nav: [{ text: "首页", link: "/zh-hans" }] }
    },
    root: {
      label: "한국어",
      lang: "ko", themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        ...shared.themeConfig,
        nav: [{ text: "홈", link: "/" }],
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
                    text: "🚧 준비중",
                    link: "/rollup-tutorial/intro",
                  },
                ]  
                }
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
                text: "번들링 동작 이해하기",
                collapsed: true,
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
                collapsed: true,
                items: [
                  { text: "개발 서버", link: "/deep-dive/dev/dev-server" },
                  { text: "HMR", link: "/deep-dive/dev/hmr" },
                  { text: "소스맵", link: "/deep-dive/dev/source-map" },
                ],
              },
              {
                text: "번들 최적화",
                collapsed: true,
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
    }
  },
  markdown: {
    config: (md) => {
      md.use(footnote);
      md.use(tabsMarkdownPlugin);
    },
  },
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

