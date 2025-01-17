import { type DefaultTheme, defineConfig } from "vitepress";

export const en = defineConfig({
  lang: "en",
  title: "Frontend Fundamentals",
  description: "A guide for easily modifiable frontend code",
  lastUpdated: true,
  themeConfig: {
    nav: nav(),

    sidebar: sidebar()
  }
});

function nav(): DefaultTheme.NavItem[] {
  return [{ text: "Home", link: "/" }];
}

function sidebar(): DefaultTheme.Sidebar {
  return [
    {
      text: "Criteria for Good Code",
      items: [
        {
          text: "Getting Started",
          link: "/en/code/start"
        },
        {
          text: "Easily Modifiable Code",
          link: "/en/code/"
        },
        {
          text: "Community",
          items: [
            {
              text: "Introduction",
              link: "/en/code/community"
            },
            {
              text: "⭐ Featured Discussions",
              link: "https://github.com/toss/frontend-fundamentals/discussions?discussions_q=is%3Aopen+label%3A%22%EC%84%B1%EC%A7%80+%E2%9B%B2%22"
            },
            {
              text: "A vs B",
              link: "https://github.com/toss/frontend-fundamentals/discussions/categories/a-vs-b?discussions_q=is%3Aopen+category%3A%22A+vs+B%22+sort%3Adate_created"
            },
            {
              text: "Open Forum",
              link: "https://github.com/toss/frontend-fundamentals/discussions/categories/open-forum?discussions_q=is%3Aopen+sort%3Adate_created+category%3A%22Open+Forum%22"
            }
          ],
          collapsed: true
        }
      ]
    },
    {
      text: "Strategies for Writing Good Code",
      items: [
        {
          text: "1. Readability",
          items: [
            {
              text: "Reducing Context",
              items: [
                {
                  text: "A. Separating Code That Doesn’t Run Together",
                  link: "/en/code/examples/submit-button"
                },
                {
                  text: "B. Abstracting Implementation Details",
                  link: "/en/code/examples/login-start-page"
                },
                {
                  text: "C. Splitting Functions Combined by Logic Type",
                  link: "/en/code/examples/use-page-state-readability"
                }
              ],
              collapsed: true
            },
            {
              text: "Naming",
              items: [
                {
                  text: "A. Naming Complex Conditions",
                  link: "/en/code/examples/condition-name"
                },
                {
                  text: "B. Naming Magic Numbers",
                  link: "/en/code/examples/magic-number-readability"
                }
              ],
              collapsed: true
            },
            {
              text: "Reading from Top to Bottom",
              items: [
                {
                  text: "A. Reducing Eye Movement",
                  link: "/en/code/examples/user-policy"
                },
                {
                  text: "B. Simplifying Ternary Operators",
                  link: "/en/code/examples/ternary-operator"
                }
              ],
              collapsed: true
            }
          ]
        },

        {
          text: "2. Predictability",
          items: [
            {
              text: "A. Managing Unique Names",
              link: "/en/code/examples/http"
            },
            {
              text: "B. Unifying Return Types for Similar Functions",
              link: "/en/code/examples/use-user"
            },
            {
              text: "C. Revealing Hidden Logic",
              link: "/en/code/examples/hidden-logic"
            }
          ]
        },
        {
          text: "3. Cohesion",
          items: [
            {
              text: "A. Keeping Files That Are Modified Together in the Same Directory",
              link: "/en/code/examples/code-directory"
            },
            {
              text: "B. Eliminating Magic Numbers",
              link: "/en/code/examples/magic-number-cohesion"
            },
            {
              text: "C. Considering Form Cohesion",
              link: "/en/code/examples/form-fields"
            }
          ]
        },
        {
          text: "4. Coupling",
          items: [
            {
              text: "A. Managing Responsibilities Individually",
              link: "/en/code/examples/use-page-state-coupling"
            },
            {
              text: "B. Allowing Duplicate Code",
              link: "/en/code/examples/use-bottom-sheet"
            },
            {
              text: "C. Eliminating Props Drilling",
              link: "/en/code/examples/item-edit-modal"
            }
          ]
        }
      ]
    }
  ];
}
