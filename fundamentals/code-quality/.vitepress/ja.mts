import { type DefaultTheme, defineConfig } from "vitepress";

export const ja = defineConfig({
  lang: "ja",
  title: "Frontend Fundamentals",
  description: "変更しやすいフロントエンドコードのためのガイドライン",
  lastUpdated: true,
  themeConfig: {
    logo: "/images/ff-symbol.svg",
    nav: nav(),
    editLink: {
      pattern:
        "https://github.com/toss/frontend-fundamentals/edit/main/fundamentals/code-quality/:path",
      text: "GitHubで修正する"
    },
    outline: {
      label: "ページの内容"
    },
    docFooter: {
      prev: "前のページ",
      next: "次のページ"
    },
    lastUpdated: {
      text: "最後のアップデート"
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/toss/frontend-fundamentals"
      }
    ],
    sidebar: sidebar()
  }
});

function nav(): DefaultTheme.NavItem[] {
  return [{ text: "ホーム", link: "/ja" }];
}

function sidebar(): DefaultTheme.Sidebar {
  return [
    {
      text: "はじめに",
      items: [
        {
          text: "はじめる",
          link: "/ja/code/start"
        },
        {
          text: "みんなで作る",
          link: "/ja/code/community"
        },
        {
          text: "良いコードの4つの原則",
          link: "/ja/code/"
        }
      ]
    },
    {
      text: "実践ガイド",
      items: [
        {
          text: "1. 可読性",
          items: [
            {
              text: "コンテキストを減らす",
              items: [
                {
                  text: "A. 一緒に実行されないコードを分離する",
                  link: "/ja/code/examples/submit-button"
                },
                {
                  text: "B. 実装の詳細を抽象化する",
                  link: "/ja/code/examples/login-start-page"
                },
                {
                  text: "C. ロジックの種類に応じて一体化している関数を分ける",
                  link: "/ja/code/examples/use-page-state-readability"
                }
              ],
              collapsed: true
            },
            {
              text: "名前付け",
              items: [
                {
                  text: "A. 複雑な条件に名前を付ける",
                  link: "/ja/code/examples/condition-name"
                },
                {
                  text: "B. マジックナンバーに名前を付ける",
                  link: "/ja/code/examples/magic-number-readability"
                }
              ],
              collapsed: true
            },
            {
              text: "上から下へ読めるようにする",
              items: [
                {
                  text: "A. 視点の移動を減らす",
                  link: "/ja/code/examples/user-policy"
                },
                {
                  text: "B. 三項演算子をシンプルにする",
                  link: "/ja/code/examples/ternary-operator"
                }
              ],
              collapsed: true
            }
          ]
        },
        {
          text: "2. 予測可能性",
          items: [
            {
              text: "A. 名前が被らないように管理する",
              link: "/ja/code/examples/http"
            },
            {
              text: "B. 同じ種類の関数は返り値の型を統一する",
              link: "/ja/code/examples/use-user"
            },
            {
              text: "C. 隠れたロジックを露呈させる",
              link: "/ja/code/examples/hidden-logic"
            }
          ]
        },
        {
          text: "3. 凝集度",
          items: [
            {
              text: "A. 一緒に修正されるファイルは同じディレクトリに置く",
              link: "/ja/code/examples/code-directory"
            },
            {
              text: "B. マジックナンバーを排除する",
              link: "/ja/code/examples/magic-number-cohesion"
            },
            {
              text: "C. フォームの凝集度について考える",
              link: "/ja/code/examples/form-fields"
            }
          ]
        },
        {
          text: "4. 結合度",
          items: [
            {
              text: "A. 責任を一つずつ管理する",
              link: "/ja/code/examples/use-page-state-coupling"
            },
            {
              text: "B. 重複コードを許容する",
              link: "/ja/code/examples/use-bottom-sheet"
            },
            {
              text: "C. Props Drilling を解消する",
              link: "/ja/code/examples/item-edit-modal"
            }
          ]
        }
      ]
    }
  ];
}

export const search: DefaultTheme.LocalSearchOptions["locales"] = {
  ja: {
    translations: {
      button: {
        buttonText: "検索",
        buttonAriaLabel: "検索"
      },
      modal: {
        backButtonTitle: "戻る",
        displayDetails: "もっとみる",
        footer: {
          closeKeyAriaLabel: "閉じる",
          closeText: "閉じる",
          navigateDownKeyAriaLabel: "下へ",
          navigateText: "移動",
          navigateUpKeyAriaLabel: "上へ",
          selectKeyAriaLabel: "選択",
          selectText: "選択"
        },
        noResultsText: "検索結果がありませんでした。",
        resetButtonTitle: "すべて消去"
      }
    }
  }
};
