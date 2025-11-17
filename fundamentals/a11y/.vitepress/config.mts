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
  title: "A11y Fundamentals",
  description: "프론트엔드 접근성의 모든 것",
  ignoreDeadLinks: false,
  base: "/a11y/",
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
      themeConfig: {
        nav: [{ text: "ホーム", link: "/ja/" }],
        sidebar: [
          {
            text: "紹介",
            items: [
              { text: "はじめに", link: "/ja/overview" },
              { text: "体験してみる", link: "/ja/playground" },
              { text: "アクセシビリティを守る理由", link: "/ja/why" },
              { text: "主要原則", link: "/ja/principles" }
            ]
          },
          {
            text: "実践ガイド",
            items: [
              {
                text: "1. 構造を明確にする",
                items: [
                  {
                    text: "ボタンの中にボタンを入れない",
                    link: "/ja/structure/button-inside-button"
                  },
                  {
                    text: "テーブル行に直接onClickを付けない",
                    link: "/ja/structure/table-row-link"
                  }
                ]
              },
              {
                text: "2. 意味を正確に伝える",
                items: [
                  {
                    text: "インタラクティブ要素に名前を付ける",
                    link: "/ja/semantic/required-label"
                  },
                  {
                    text: "同じ名前の要素には説明を追加する",
                    link: "/ja/semantic/duplicate-interactive-element"
                  }
                ]
              },
              {
                text: "3. 予測可能な動作を作る",
                items: [
                  {
                    text: "ボタンの役割と動作を一致させる",
                    link: "/ja/predictability/fake-button"
                  },
                  {
                    text: "入力要素は &lt;form&gt; で包む",
                    link: "/ja/predictability/form"
                  }
                ]
              },
              {
                text: "4. 視覚情報を補完する",
                items: [
                  {
                    text: "画像とアイコンに適切な代替テキストを提供する",
                    link: "/ja/alt-text/image-alt"
                  }
                ]
              }
            ]
          },
          {
            text: "発展ガイド",
            items: [
              {
                text: "ESLintでアクセシビリティを改善する",
                items: [
                  { text: "主要ルール紹介", link: "/ja/eslint/rules" },
                  {
                    text: "デザインシステムと組み合わせる",
                    link: "/ja/eslint/design-system"
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    "zh-hans": {
      label: "简体中文",
      lang: "zh-hans",
      themeConfig: { nav: [{ text: "首页", link: "/zh-hans" }] }
    },
    root: {
      label: "한국어",
      lang: "ko",
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
                link: "/overview"
              },
              {
                text: "체험하기",
                link: "/playground"
              },
              {
                text: "접근성을 지켜야 하는 이유",
                link: "/why"
              },
              {
                text: "주요 원칙",
                link: "/principles"
              }
            ]
          },
          {
            text: "접근성 개발 입문하기",
            items: [
              {
                text: "시작하기",
                link: "/basic-guide/overview"
              },
              {
                text: "역할",
                link: "/basic-guide/role"
              },
              {
                text: "레이블",
                link: "/basic-guide/label"
              },
              {
                text: "상태",
                link: "/basic-guide/state"
              }
            ]
          },
          {
            text: "UI 요소 별 접근성 기초",
            items: [
              {
                text: "탭",
                link: "/ui-foundation/tab"
              },
              {
                text: "아코디언",
                link: "/ui-foundation/accordion"
              },
              {
                text: "모달",
                link: "/ui-foundation/modal"
              },
              {
                text: "라디오",
                link: "/ui-foundation/radio"
              },
              {
                text: "체크박스",
                link: "/ui-foundation/checkbox"
              },
              {
                text: "스위치",
                link: "/ui-foundation/switch"
              }
            ]
          },
          {
            text: "실전 가이드",
            items: [
              {
                text: "1. 구조를 명확하게 만들기",
                items: [
                  {
                    text: "버튼 안에 버튼 넣지 않기",
                    link: "/structure/button-inside-button"
                  },
                  {
                    text: "테이블 행에 직접 onClick 붙이지 않기",
                    link: "/structure/table-row-link"
                  }
                ]
              },
              {
                text: "2. 의미를 정확히 전달하기",
                items: [
                  {
                    text: "인터렉티브 요소에 이름 붙이기",
                    link: "/semantic/required-label"
                  },
                  {
                    text: "같은 이름의 요소에는 설명 추가하기",
                    link: "/semantic/duplicate-interactive-element"
                  }
                ]
              },
              {
                text: "3. 예상 가능한 동작 만들기",
                items: [
                  {
                    text: "버튼의 역할과 동작이 일치하게 만들기",
                    link: "/predictability/fake-button"
                  },
                  {
                    text: "입력 요소는 &lt;form&gt; 으로 감싸기",
                    link: "/predictability/form"
                  }
                ]
              },
              {
                text: "4. 시각 정보 보완하기",
                items: [
                  {
                    text: "이미지와 아이콘에 적절한 대체 텍스트 제공하기",
                    link: "/alt-text/image-alt"
                  }
                ]
              }
            ]
          },
          {
            text: "심화 가이드",
            items: [
              {
                text: "eslint로 접근성 개선하기",
                items: [
                  {
                    text: "주요 규칙 소개",
                    link: "/eslint/rules"
                  },
                  {
                    text: "디자인 시스템과 결합하기",
                    link: "/eslint/design-system"
                  }
                ]
              }
            ]
          }
        ]
      }
    }
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
        href: "/a11y/images/favicon.ico"
      }
    ],
    [
      "meta",
      {
        property: "og:image",
        content: "https://static.toss.im/illusts/a11y-meta.jpg"
      }
    ],
    [
      "meta",
      {
        name: "twitter:image",
        content: "https://static.toss.im/illusts/a11y-meta.jpg"
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
    },
    ssr: {
      noExternal: ["vitepress-plugin-tabs"]
    }
  }
});
