import { defineConfig, HeadConfig } from "vitepress";
import { search as koSearch } from "./ko.mts";

export const shared = defineConfig({
  lastUpdated: true,
  head: [
    ["link", { rel: "icon", href: "/images/favicon.ico" }],
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
    const title = pageData.frontmatter.title || pageData.title || 'Frontend Fundamentals';
    const description = pageData.frontmatter.description || pageData.description || 'Guidelines for easily modifiable frontend code';

    head.push(['meta', { property: 'og:title', content: title }]);
    head.push(['meta', { property: 'og:description', content: description }]);

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
          ...koSearch
        }
      }
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/toss/frontend-fundamentals" }
    ]
  }
});
