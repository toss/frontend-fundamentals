import { type DefaultTheme, defineConfig } from "vitepress";

export const zhHans = defineConfig({
  lang: "zh-hans",
  title: "Frontend Fundamentals",
  description: "易于修改的前端代码指南",
  lastUpdated: true,
  themeConfig: {
    logo: "/images/ff-symbol.svg",
    nav: nav(),
    editLink: {
      pattern:
        "https://github.com/toss/frontend-fundamentals/edit/main/fundamentals/code-quality/:path",
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
    sidebar: sidebar(),
    darkModeSwitchLabel: "外观"
  }
});

function nav(): DefaultTheme.NavItem[] {
  return [{ text: "首页", link: "/zh-hans" }];
}

function sidebar(): DefaultTheme.Sidebar {
  return [
    {
      text: "介绍",
      items: [
        {
          text: "开始使用",
          link: "/zh-hans/code/start"
        },
        {
          text: "一起构建",
          link: "/zh-hans/code/community"
        },
        {
          text: "编写优秀代码的四大原则",
          link: "/zh-hans/code/"
        }
      ]
    },
    {
      text: "实践指南",
      items: [
        {
          text: "1. 可读性",
          items: [
            {
              text: "减少语境",
              items: [
                {
                  text: "A. 分离不一起运行的代码",
                  link: "/zh-hans/code/examples/submit-button"
                },
                {
                  text: "B. 抽象实现细节",
                  link: "/zh-hans/code/examples/login-start-page"
                },
                {
                  text: "C. 根据逻辑类型拆分合并的函数",
                  link: "/zh-hans/code/examples/use-page-state-readability"
                }
              ],
              collapsed: true
            },
            {
              text: "命名",
              items: [
                {
                  text: "A. 为复杂条件命名",
                  link: "/zh-hans/code/examples/condition-name"
                },
                {
                  text: "B. 为魔数命名",
                  link: "/zh-hans/code/examples/magic-number-readability"
                }
              ],
              collapsed: true
            },
            {
              text: "使其从上到下顺利阅读",
              items: [
                {
                  text: "A. 减少视点转移",
                  link: "/zh-hans/code/examples/user-policy"
                },
                {
                  text: "B. 简化三元运算符",
                  link: "/zh-hans/code/examples/ternary-operator"
                },
                {
                  text: "C. 从左到右阅读",
                  link: "/zh-hans/code/examples/comparison-order"
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
              link: "/zh-hans/code/examples/http"
            },
            {
              text: "B. 统一同类函数的返回类型",
              link: "/zh-hans/code/examples/use-user"
            },
            {
              text: "C. 揭示隐藏的逻辑",
              link: "/zh-hans/code/examples/hidden-logic"
            }
          ]
        },
        {
          text: "3. 内聚性",
          items: [
            {
              text: "A. 需同时修改的文件位于同一目录下",
              link: "/zh-hans/code/examples/code-directory"
            },
            {
              text: "B. 消除魔数",
              link: "/zh-hans/code/examples/magic-number-cohesion"
            },
            {
              text: "C. 考虑表单的内聚性",
              link: "/zh-hans/code/examples/form-fields"
            }
          ]
        },
        {
          text: "4. 耦合性",
          items: [
            {
              text: "A. 单独管理责任",
              link: "/zh-hans/code/examples/use-page-state-coupling"
            },
            {
              text: "B. 允许重复代码",
              link: "/zh-hans/code/examples/use-bottom-sheet"
            },
            {
              text: "C. 消除 Props Drilling",
              link: "/zh-hans/code/examples/item-edit-modal"
            }
          ]
        }
      ]
    }
  ];
}

export const search: DefaultTheme.LocalSearchOptions["locales"] = {
  "zh-hans": {
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
