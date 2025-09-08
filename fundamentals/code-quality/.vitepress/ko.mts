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
      pattern:
        "https://github.com/toss/frontend-fundamentals/edit/main/fundamentals/code-quality/:path",
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
      text: "소개",
      items: [
        {
          text: "시작하기",
          link: "/code/start"
        },
        {
          text: "함께 만들기",
          link: "/code/community"
        },
        {
          text: "좋은 코드를 위한 4가지 기준",
          link: "/code/"
        }
      ]
    },
    {
      text: "실전 가이드",
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
    },
    {
      text: "커뮤니티",
      items: [
        {
          text: "🏆 명예의 전당",
          link: "/code/community/good-discussions"
        },
        {
          text: "토론하기",
          link: "/code/dicussions"
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
