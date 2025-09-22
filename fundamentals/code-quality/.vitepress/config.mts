import { createRequire } from "node:module";
import path from "node:path";
import { defineConfig } from "vitepress";
import footnote from "markdown-it-footnote";
import { shared } from "./shared.mts";
import { en } from "./en.mts";
import { ko } from "./ko.mts";
import { ja } from "./ja.mts";
import { zhHans } from "./zhHans.mts";

const require = createRequire(import.meta.url);

export default defineConfig({
  ...shared,
  base: "/code-quality/",
  locales: {
    en: { label: "English", ...en },
    ja: { label: "日本語", ...ja },
    "zh-hans": { label: "简体中文", ...zhHans },
    root: { label: "한국어", ...ko }
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
          replacement: path.resolve(__dirname, "../../shared")
        }
      ]
    },
    ssr: {
      noExternal: ['vitepress-plugin-tabs']
    }
  },
  markdown: {
    config: (md) => {
      md.use(footnote);
    }
  },
  titleTemplate: ":title"
});
