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
            link: "/get-started"
          }
        ]
      },
      {
        text: "튜토리얼"
      },
      {
        text: "심화 학습"
      }
    ]
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
