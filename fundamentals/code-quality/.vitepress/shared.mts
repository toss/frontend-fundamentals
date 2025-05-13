import { defineConfig, HeadConfig } from "vitepress";
import { search as koSearch } from "./ko.mjs";
import { search as jaSearch } from "./ja.mjs";
import { search as zhHansSearch } from "./zhHans.mjs";

export const shared = defineConfig({
  lastUpdated: true,
  head: [
    [
      "link",
      {
        rel: "preconnect",
        href: "https://static.toss.im",
        crossorigin: "anonymous"
      }
    ],
    [
      "link",
      { rel: "icon", type: "image/x-icon", href: "/code-quality/images/favicon.ico" }
    ],
    ["link", { rel: "manifest", href: "/images/site.webmanifest" }],
    ["link", { rel: "apple-touch-icon", href: "/images/apple-touch-icon.png" }],
    [
      "link",
      {
        rel: "stylesheet",
        fetchpriority: "low",
        href: "https://static.toss.im/tps/main.css",
        media: "none",
        onload: "this.onload=null; this.media='all'",
        crossorigin: "anonymous"
      }
    ],
    [
      "link",
      {
        rel: "stylesheet",
        fetchpriority: "low",
        href: "https://static.toss.im/tps/others.css",
        media: "none",
        onload: "this.onload=null; this.media='all'",
        crossorigin: "anonymous"
      }
    ],
    [
      "meta",
      {
        property: "og:image",
        content: "https://static.toss.im/illusts/ff-meta.png"
      }
    ],
    [
      "meta",
      {
        name: "twitter:image",
        content: "https://static.toss.im/illusts/ff-meta.png"
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
      pageData.frontmatter.title || pageData.title || "Frontend Fundamentals";
    const description =
      pageData.frontmatter.description ||
      pageData.description ||
      "Guidelines for easily modifiable frontend code";

    head.push(["meta", { property: "og:title", content: title }]);
    head.push(["meta", { property: "og:description", content: description }]);

    return head;
  },

  themeConfig: {
    logo: "/images/ff-symbol.svg",
    editLink: {
      pattern: "https://github.com/toss/frontend-fundamentals/edit/main/:path"
    },
    search: {
      provider: "local",
      options: {
        locales: {
          ...koSearch,
          ...jaSearch,
          ...zhHansSearch
        }
      }
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/toss/frontend-fundamentals" }
    ]
  }
});
