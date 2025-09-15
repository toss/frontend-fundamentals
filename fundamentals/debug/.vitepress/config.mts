import { defineConfig } from "vitepress";
import footnote from "markdown-it-footnote";
import path from "node:path";
import { createRequire } from "node:module";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";
import { sharedConfig } from "./shared.mjs";

const require = createRequire(import.meta.url);

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ...sharedConfig,
  title: "Debug Fundamentals",
  description: "프론트엔드 접근성의 모든 것",
  ignoreDeadLinks: false,
  base: "/debug/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    ...sharedConfig.themeConfig,
    nav: [{ text: "홈", link: "/" }],
    sidebar: [
      {
        text: "소개",
        items: [
          {
            text: "시작하기",
            link: "/pages/introduce.md",
          },
          {
            text: "효과적인 디버깅을 위한 4가지 단계",
            link: "/pages/start.md",
          },
        ]
      },
      {
        text: "실전 가이드",
        items: [
          {
            text: "진단하기",
            link: "/pages/diagnose/index.md",
            collapsed: false,
            items: [
              { text: "에러 메세지로 원인 추측하기", link: "/pages/diagnose/error-message.md" },
              { text: "작업 지도 그리기", link: "/pages/diagnose/map.md" },
             ],
          },
          {
            text: "재현하기",
            link: "/pages/reproduce/index.md",
            collapsed:false,
            items: [
              { text: "최대한 간단하게 재현하기", link: "/pages/reproduce/simply.md" },
              { text: "디버거 활용하기", link: "/pages/reproduce/debugger.md" },
              { text: "일반적인 범위에서 벗어난 값 재현하기", link: "/pages/reproduce/out-range.md" },
              { text: "반복적인 재현 과정을 자동화하기", link: "/pages/reproduce/repeat.md" },
              { text: "버그 발생 경로를 추적하기", link: "/pages/reproduce/trace.md" },
             ],
          },
          {
            text: "수정하기",
            link: "/pages/fix/index.md",
            collapsed:false,
            items: [
              { text: "근본 원인 수정하기", link: "/pages/fix/correct.md" },
              { text: "순수함수 만들기", link: "/pages/fix/pure.md" },
              { text: "데드코드 제거하기", link: "/pages/fix/dead-code.md" },
             ],
          },
          {
            text: "재발방지하기",
            link: "/pages/prevent/index.md",
            collapsed:false,
            items: [
              { text: "에러 로그 상세히 남기기", link: "/pages/prevent/error-log.md" },
              { text: "버그 리포트 남기기", link: "/pages/prevent/bug-report.md" },
              { text: "팀과 공유하고 공통 유틸에 반영하기", link: "/pages/prevent/util.md" },
             ],
          },
        ]
      },
      {
        text: "디버깅 인터뷰",
        items:[
          {text: "react-query 상태는 어떻게 돌아가는가?",
          link: "/pages/interview/react-query/index.md",
          collapsed:false,
          items: [
                { text: "진단하기", link: "/pages/interview/react-query/diagnose.md" },
                { text: "재현하기", link: "/pages/interview/react-query/reproduce.md" },
                { text: "수정하기", link: "/pages/interview/react-query/fix.md" },
                { text: "추가질문", link: "/pages/interview/react-query/tip.md" },
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
    }
  },
  head: [
    [
      "link",
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/bundling/images/favicon.ico"
      }
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
    [
      "meta",
      {
        name: "twitter:card",
        content: "summary"
      }
    ]
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
          replacement: path.resolve(__dirname, "../../shared")
        }
      ]
    }
  }
});
