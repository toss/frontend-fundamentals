import { type DefaultTheme, defineConfig } from "vitepress";

export const ch = defineConfig({
  lang: "ch",
  title: "Frontend Fundamentals",
  description: "易于修改的前端代码指南",
  lastUpdated: true,
  themeConfig: {
    logo: "/images/ff-symbol.svg",
    nav: nav(),

    editLink: {
      pattern: "https://github.com/toss/frontend-fundamentals/edit/main/:path",
      text: "在GitHub编辑此页"
    },

    outline: {
      label: "页面内容"
    },
    docFooter: {
      prev: "上一页",
      next: "下一页"
    },
    lastUpdated: {
      text: "最后更新"
    },

    sidebar: sidebar()
  }
});

function nav(): DefaultTheme.NavItem[] {
  return [{ text: "首页", link: "/ch" }];
}

function sidebar(): DefaultTheme.Sidebar {
  return [
    {
      text: "好代码的标准",
      items: [
        {
          text: "开始使用",
          link: "/ch/code/start"
        },
        {
          text: "易于修改的代码",
          link: "/ch/code/"
        },
        {
          text: "社区",
          items: [
            {
              text: "介绍",
              link: "/ch/code/community"
            },
            {
              text: "⭐ 专题讨论",
              link: "https://github.com/toss/frontend-fundamentals/discussions?discussions_q=is%3Aopen+label%3A%22%EC%84%B1%EC%A7%80+%E2%9B%B2%22"
            },
            {
              text: "A vs B",
              link: "https://github.com/toss/frontend-fundamentals/discussions/categories/a-vs-b?discussions_q=is%3Aopen+category%3A%22A+vs+B%22+sort%3Adate_created"
            },
            {
              text: "公开论坛",
              link: "https://github.com/toss/frontend-fundamentals/discussions/categories/open-forum?discussions_q=is%3Aopen+sort%3Adate_created+category%3A%22Open+Forum%22"
            }
          ],
          collapsed: true
        }
      ]
    },
    {
      text: "编写好代码的策略",
      items: [
        {
          text: "1. 可读性",
          items: [
            {
              text: "减少语境",
              items: [
                {
                  text: "A. 拆分不同语境下的代码",
                  link: "/ch/code/examples/submit-button"
                },
                {
                  text: "B. 抽象实现细节",
                  link: "/ch/code/examples/login-start-page"
                },
                {
                  text: "C. 根据逻辑类型拆分合并的函数",
                  link: "/ch/code/examples/use-page-state-readability"
                }
              ],
              collapsed: true
            },
            {
              text: "命名",
              items: [
                {
                  text: "A. 为复杂条件命名",
                  link: "/ch/code/examples/condition-name"
                },
                {
                  text: "B. 为魔数命名",
                  link: "/ch/code/examples/magic-number-readability"
                }
              ],
              collapsed: true
            },
            {
              text: "使其从上到下顺利阅读",
              items: [
                {
                  text: "A. 减少视点转换",
                  link: "/ch/code/examples/user-policy"
                },
                {
                  text: "B. 简化三元运算符",
                  link: "/ch/code/examples/ternary-operator"
                }
              ],
              collapsed: true
            }
          ]
        },

        {
          text: "2. 可预测性",
          items: [
            {
              text: "A. 避免命名重复",
              link: "/ch/code/examples/http"
            },
            {
              text: "B. 统一同类函数的返回类型",
              link: "/ch/code/examples/use-user"
            },
            {
              text: "C. 揭示隐藏的逻辑",
              link: "/ch/code/examples/hidden-logic"
            }
          ]
        },
        {
          text: "3. 内聚性",
          items: [
            {
              text: "A. 需同时修改的文件位于同一目录下",
              link: "/ch/code/examples/code-directory"
            },
            {
              text: "B. 消除魔数",
              link: "/ch/code/examples/magic-number-cohesion"
            },
            {
              text: "C. 考虑表单的内聚性",
              link: "/ch/code/examples/form-fields"
            }
          ]
        },
        {
          text: "4. 耦合性",
          items: [
            {
              text: "A. 单独管理责任",
              link: "/ch/code/examples/use-page-state-coupling"
            },
            {
              text: "B. 允许重复代码",
              link: "/ch/code/examples/use-bottom-sheet"
            },
            {
              text: "C. 消除 Props Drilling",
              link: "/ch/code/examples/item-edit-modal"
            }
          ]
        }
      ]
    }
  ];
}

export const search: DefaultTheme.LocalSearchOptions["locales"] = {
  root: {
    translations: {
      button: {
        buttonText: "搜索",
        buttonAriaLabel: "搜索"
      },
      modal: {
        backButtonTitle: "返回",
        displayDetails: "更多",
        footer: {
          closeKeyAriaLabel: "关闭",
          closeText: "关闭",
          navigateDownKeyAriaLabel: "向下",
          navigateText: "移动",
          navigateUpKeyAriaLabel: "向上",
          selectKeyAriaLabel: "选择",
          selectText: "选择"
        },
        noResultsText: "没有搜索结果。",
        resetButtonTitle: "全部清除"
      }
    }
  }
};
