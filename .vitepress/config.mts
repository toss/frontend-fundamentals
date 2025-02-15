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

// titleMap
const titleMap: Record<string, string> = {
  "코드 예시": "code-example",
  代码示例: "code-example",
  コード例: "code-example",

  "코드 냄새 맡아보기": "smell-the-code",
  闻代码: "smell-the-code",
  コードの不吉な臭いを嗅いでみる: "smell-the-code",

  개선해보기: "work-on-improving",
  尝试改善: "work-on-improving",
  リファクタリングしてみる: "work-on-improving",

  "코드 품질 여러 각도로 보기": "viewing-code-quality-from-multiple-angles",
  コード品質を多角的に見る: "viewing-code-quality-from-multiple-angles",
  多角度审视代码质量: "viewing-code-quality-from-multiple-angles",

  "좋은 논의 모아보기": "featured-discussions",
  良い議論をまとめて見る: "featured-discussions",
  专题讨论: "featured-discussions",

  "고민되는 코드에 대해 논의하기": "discussing-code-concerns",
  悩んでいるコードについて議論する: "discussing-code-concerns",
  探讨代码疑虑: "discussing-code-concerns",

  "좋은 코드의 기준에 의견 더하기": "adding-opinions-good-code",
  良いコードの基準に意見を追加する: "adding-opinions-good-code",
  为好代码标准添加意见: "adding-opinions-good-code",

  "1. 가독성": "1-readability",
  "1. 可読性": "1-readability",
  "1. 可读性": "1-readability",

  "2. 예측 가능성": "2-predictability",
  "2. 予測可能性": "2-predictability",
  "2. 可预测性": "2-predictability",

  "3. 응집도": "3-cohesion",
  "3. 凝集度": "3-cohesion",
  "3. 内聚性": "3-cohesion",

  "4. 결합도": "4-coupling",
  "4. 結合度": "4-coupling",
  "4. 耦合性": "4-coupling",

  "이런 분들에게 추천해요": "who-is-this-for",
  こんな時に活用してみてください: "who-is-this-for",
  何时使用: "who-is-this-for",

  저작자: "authors",
  制作者: "authors",
  作者: "authors",

  "문서 기여자": "document-contributors",
  ドキュメント貢献者: "document-contributors",
  文档贡献者: "document-contributors",

  "더 알아보기": "learn-more",
  もっと調べる: "learn-more",
  深入了解: "learn-more",

  "필드 단위 응집도": "field-level-cohesion",
  フィールド単位の凝集度: "field-level-cohesion",
  字段级别的内聚性: "field-level-cohesion",

  "폼 전체 단위 응집도": "form-level-cohesion",
  フォーム全体の凝集度: "form-level-cohesion",
  表单级别的内聚性: "form-level-cohesion",

  "필드 단위 vs. 폼 전체 단위 응집도": "field-vs-form-cohesion",
  "フィールド単位 vs. フォーム全体の凝集度": "field-vs-form-cohesion",
  "字段级别 vs. 表单级别 内聚性": "field-vs-form-cohesion"
};

export default defineConfig({
  ...shared,
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
        }
      ]
    }
  },

  markdown: {
    config: (md) => {
      md.use(footnote);
    },
    anchor: {
      slugify: (str) => {
        // 1. Remove emojis and trim spaces
        let cleanedStr = str
          .normalize("NFKC")
          .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "")
          .trim();

        // 2. Check if the cleaned string exists in titleMap
        if (titleMap[cleanedStr]) {
          return titleMap[cleanedStr];
        }

        // // 3. If not found, split the string and check the first word in titleMap
        // let parts = cleanedStr.split(/[:\s]+/).filter(Boolean);
        // if (parts.length > 0 && titleMap[parts[0]]) {
        //   return titleMap[parts[0]];
        // }

        let matchedKey = Object.keys(titleMap)
          .filter((key) => cleanedStr.includes(key)) // cleanedStr에 포함된 key 찾기
          .sort((a, b) => b.length - a.length)[0]; // 가장 긴 매칭을 우선 사용

        if (matchedKey) {
          return titleMap[matchedKey];
        }

        // 4. Convert remaining string into a slug
        let slug = cleanedStr
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, "");

        // 5. If slug is empty, generate a fallback ID
        return slug || `section-${Math.floor(Math.random() * 10000)}`;
      }
    }
  }
});
