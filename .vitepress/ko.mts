import { type DefaultTheme, defineConfig } from "vitepress";

export const ko = defineConfig({
  lang: "ko",
  title: "Frontend Fundamentals",
  description: "변경하기 쉬운 프론트엔드 코드를 위한 지침서",
  lastUpdated: true,
  themeConfig: {
    logo: "/images/ff-symbol.svg",
    nav: nav(),

    editLink: {
      pattern: "https://github.com/toss/frontend-fundamentals/edit/main/:path",
      text: "GitHub에서 수정하기"
    },

    outline: {
      label: "페이지 내용"
    },
    docFooter: {
      prev: "이전 페이지",
      next: "다음 페이지"
    },
    lastUpdated: {
      text: "마지막 업데이트"
    },

    sidebar: sidebar()
  }
});

function nav(): DefaultTheme.NavItem[] {
  return [{ text: "홈", link: "/" }];
}

function sidebar(): DefaultTheme.Sidebar {
  return [
    {
      text: "좋은 코드의 기준",
      items: [
        {
          text: "시작하기",
          link: "/code/start"
        },
        {
          text: "변경하기 쉬운 코드",
          link: "/code/"
        },
        {
          text: "커뮤니티",
          items: [
            {
              text: "소개",
              link: "/code/community"
            },
            {
              text: "⭐ 좋은 논의 모아보기",
              link: "https://github.com/toss/frontend-fundamentals/discussions?discussions_q=is%3Aopen+label%3A%22%EC%84%B1%EC%A7%80+%E2%9B%B2%22"
            },
            {
              text: "A vs B",
              link: "https://github.com/toss/frontend-fundamentals/discussions/categories/a-vs-b?discussions_q=is%3Aopen+category%3A%22A+vs+B%22+sort%3Adate_created"
            },
            {
              text: "자유로운 이야기",
              link: "https://github.com/toss/frontend-fundamentals/discussions/categories/open-forum?discussions_q=is%3Aopen+sort%3Adate_created+category%3A%22Open+Forum%22"
            }
          ],
          collapsed: true
        }
      ]
    },
    {
      text: "좋은 코드를 만드는 전략",
      items: [
        {
          text: "1. 가독성",
          items: [
            {
              text: "맥락 줄이기",
              items: [
                {
                  text: "A. 같이 실행되지 않는 코드 분리하기",
                  link: "/code/examples/submit-button"
                },
                {
                  text: "B. 구현 상세 추상화하기",
                  link: "/code/examples/login-start-page"
                },
                {
                  text: "C. 로직 종류에 따라 합쳐진 함수 쪼개기",
                  link: "/code/examples/use-page-state-readability"
                }
              ],
              collapsed: true
            },
            {
              text: "이름 붙이기",
              items: [
                {
                  text: "A. 복잡한 조건에 이름 붙이기",
                  link: "/code/examples/condition-name"
                },
                {
                  text: "B. 매직 넘버에 이름 붙이기",
                  link: "/code/examples/magic-number-readability"
                }
              ],
              collapsed: true
            },
            {
              text: "위에서 아래로 읽히게 하기",
              items: [
                {
                  text: "A. 시점 이동 줄이기",
                  link: "/code/examples/user-policy"
                },
                {
                  text: "B. 삼항 연산자 단순하게 하기",
                  link: "/code/examples/ternary-operator"
                }
              ],
              collapsed: true
            }
          ]
        },

        {
          text: "2. 예측 가능성",
          items: [
            {
              text: "A. 이름 겹치지 않게 관리하기",
              link: "/code/examples/http"
            },
            {
              text: "B. 같은 종류의 함수는 반환 타입 통일하기",
              link: "/code/examples/use-user"
            },
            {
              text: "C. 숨은 로직 드러내기",
              link: "/code/examples/hidden-logic"
            }
          ]
        },
        {
          text: "3. 응집도",
          items: [
            {
              text: "A. 함께 수정되는 파일을 같은 디렉토리에 두기",
              link: "/code/examples/code-directory"
            },
            {
              text: "B. 매직 넘버 없애기",
              link: "/code/examples/magic-number-cohesion"
            },
            {
              text: "C. 폼의 응집도 생각하기",
              link: "/code/examples/form-fields"
            }
          ]
        },
        {
          text: "4. 결합도",
          items: [
            {
              text: "A. 책임을 하나씩 관리하기",
              link: "/code/examples/use-page-state-coupling"
            },
            {
              text: "B. 중복 코드 허용하기",
              link: "/code/examples/use-bottom-sheet"
            },
            {
              text: "C. Props Drilling 지우기",
              link: "/code/examples/item-edit-modal"
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
        buttonText: "검색",
        buttonAriaLabel: "검색"
      },
      modal: {
        backButtonTitle: "뒤로가기",
        displayDetails: "더보기",
        footer: {
          closeKeyAriaLabel: "닫기",
          closeText: "닫기",
          navigateDownKeyAriaLabel: "아래로",
          navigateText: "이동",
          navigateUpKeyAriaLabel: "위로",
          selectKeyAriaLabel: "선택",
          selectText: "선택"
        },
        noResultsText: "검색 결과를 찾지 못했어요.",
        resetButtonTitle: "모두 지우기"
      }
    }
  }
};
