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

let sectionCounter = 0; // section-1, section-2 같은 ID를 만들기 위한 변수

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
        const customSlugMap: Record<string, string> = {
          "코드 예시": "code-example",
          "코드 냄새 맡아보기": "code-smell",
          개선해보기: "improve",
          "코드 예시 1: LoginStartPage": "code-example-1-loginstartpage",
          "코드 예시 2: FriendInvitation": "code-example-2-friendinvitation",
          "코드 예시 1: useUser": "code-example-1-useuser",
          "코드 예시 2: checkIsValid": "code-example-2-checkisvalid",
          "1. 가독성": "readability",
          "2. 예측 가능성": "predictability",
          "3. 응집도": "cohesion",
          "4. 결합도": "coupling",
          "코드 품질 여러 각도로 보기":
            "viewing-code-quality-from-multiple-angles",
          "이런 분들에게 추천해요": "who-is-this-for",
          저작자: "authors",
          "문서 기여자": "document-contributors",
          "Code Example": "code-example",
          "Smell the Code": "code-smell",
          "Work on Improving": "improve",
          "Code Example 1: useUser": "code-example-1-useuser",
          "Code Example 2: checkIsValid": "code-example-2-checkisvalid",
          "Code Example 1: LoginStartPage": "code-example-1-loginstartpage",
          "Code Example 2: FriendInvitation": "code-example-2-friendinvitation",
          "Featured Discussions": "featured-discussions",
          "Discussing Code Concerns": "discussing-code-concerns",
          "Adding Opinions on Good Code Standards": "good-code-standards",
          Readability: "readability",
          Predictability: "predictability",
          Cohesion: "cohesion",
          Coupling: "coupling",
          "Who Is This For?": "who-is-this-for",
          Authors: "authors",
          "Document Contributors": "document-contributors"
        };

        let slug =
          customSlugMap[str] ||
          str
            .toLowerCase() // 영어를 소문자로 변환
            .replace(/[^\w\s-]+/g, "") // 특수 문자 및 이모지 제거
            .replace(/\s+/g, "-") // 공백을 하이픈으로 변환
            .replace(/^-+|-+$/g, ""); // 앞뒤에 남아 있는 '-' 제거

        if (!slug) {
          slug = `section-${++sectionCounter}`; // 빈 값이면 기본 ID 자동 생성
        }

        return slug;
      }
    }
  }
});
