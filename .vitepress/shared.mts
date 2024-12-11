import { defineConfig } from "vitepress";
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
        content: "https://static.toss.im/illusts/ff-meta.png"
      }
    ]
  ],

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
