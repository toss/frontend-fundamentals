import { defineConfig, HeadConfig } from "vitepress";
import { DefaultTheme } from "vitepress";

const search: DefaultTheme.LocalSearchOptions["locales"] = {
  root: {
    translations: {
      button: {
        buttonText: "검색",
        buttonAriaLabel: "검색"
      },
      modal: {
        backButtonTitle: "뒤로가기",
        displayDetails: "더보기",
        footer: {
          closeKeyAriaLabel: "닫기",
          closeText: "닫기",
          navigateDownKeyAriaLabel: "아래로",
          navigateText: "이동",
          navigateUpKeyAriaLabel: "위로",
          selectKeyAriaLabel: "선택",
          selectText: "선택"
        },
        noResultsText: "검색 결과를 찾지 못했어요.",
        resetButtonTitle: "모두 지우기"
      }
    }
  }
};

export const sharedConfig = defineConfig({
  lastUpdated: true,
  head: [
    [
      "link",
      { rel: "icon", type: "image/x-icon", href: "/images/favicon.ico" }
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
  transformHead: ({ pageData }) => {
    const head: HeadConfig[] = [];
    const title =
      pageData.frontmatter.title || pageData.title || "Debug fundamentals";
    const description =
      pageData.frontmatter.description ||
      pageData.description ||
      "Practical Guide to Efficient Frontend Debug";

    head.push(["meta", { property: "og:title", content: title }]);
    head.push(["meta", { property: "og:description", content: description }]);

    return head;
  },

  themeConfig: {
    logo: "/images/ff-symbol.svg",
    socialLinks: [
      { icon: "github", link: "https://github.com/toss/frontend-fundamentals" }
    ],
    search: {
      provider: "local",
      options: {
        locales: {
          ...search
        }
      }
    }
  }
});
