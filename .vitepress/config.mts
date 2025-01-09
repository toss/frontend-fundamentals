import { createRequire } from 'node:module';
import path from 'node:path';
import { defineConfig } from 'vitepress';
import footnote from 'markdown-it-footnote';

const require = createRequire(import.meta.url);

export default defineConfig({
  title: "Frontend Fundamentals",
  description: "프론트엔드 코드의 기준",
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: '홈', link: '/' },
    ],

    outline: {
      label: '페이지 내용',
    },
    docFooter: {
      prev: '이전 페이지',
      next: '다음 페이지',
    },
    lastUpdated: {
      text: '마지막 업데이트',
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '검색',
            buttonAriaLabel: '검색',
          },
          modal: {
            backButtonTitle: '뒤로가기',
            displayDetails: '더보기',
            footer: {
              closeKeyAriaLabel: '닫기',
              closeText: '닫기',
              navigateDownKeyAriaLabel: '아래로',
              navigateText: '이동',
              navigateUpKeyAriaLabel: '위로',
              selectKeyAriaLabel: '선택',
              selectText: '선택',
            },
            noResultsText: '검색 결과를 찾지 못했어요.',
            resetButtonTitle: '모두 지우기',
          },
        },
      },
    },

    sidebar: [
      {
        text: '좋은 코드의 기준',
        items: [
          { 
            text: '시작하기',
            link: '/code/start',
          },
          { 
            text: '변경하기 쉬운 코드',
            link: '/code',
          },
          { 
            text: '기여하기',
            link: '/code/contributing',
          },
        ]
      },
      {
        text: '좋은 코드를 만드는 전략',
        items: [
          {
            text: '1. 가독성',
            items: [
              {
                text: '맥락 줄이기',
                items: [
                  {
                    text: 'A. 같이 실행되지 않는 코드 분리하기',
                    link: '/code/examples/submit-button',
                  },
                  {
                    text: 'B. 구현 상세 추상화하기',
                    link: '/code/examples/login-start-page',
                  },
                  {
                    text: 'C. 로직 종류에 따라 합쳐진 함수 쪼개기',
                    link: '/code/examples/use-page-state-readability',
                  },
                ],
                collapsed: true
              },
              {
                text: '이름 붙이기',
                items: [
                  {
                    text: 'A. 복잡한 조건',
                    link: '/code/examples/condition-name',
                  },
                  {
                    text: 'B. 매직 넘버',
                    link: '/code/examples/magic-number-readability',
                  },
                ],
                collapsed: true
              },
              {
                text: '위에서 아래로 읽히게 하기',
                items: [
                  {
                    text: 'A. 시점 이동',
                    link: '/code/examples/user-policy',
                  },
                  {
                    text: 'B. 삼항 연산자',
                    link: '/code/examples/ternary-operator',
                  },
                ],
                collapsed: true
              }
            ],
            collapsed: true,
          },

          {
            text: '2. 예측 가능성',
            items: [
              {
                text: 'A. 이름 겹치지 않게 관리하기',
                link: '/code/examples/http',
              },
              {
                text: 'B. 같은 종류의 함수는 반환 타입 통일하기',
                link: '/code/examples/use-user',
              },
            ],
            collapsed: true,
          },
          {
            text: '3. 응집도',
            items: [
              {
                text: '같이 수정되는 파일을 같은 디렉토리에 두기',
                link: '/code/examples/code-directory',
              },
              {
                text: '매직 넘버 없애기',
                link: '/code/examples/magic-number-cohesion',
              },
              {
                text: '폼의 응집도 생각하기',
                link: '/code/examples/form-fields',
              }
            ],
            collapsed: true,
          },
          {
            text: '4. 결합도',
            items: [
              {
                text: '책임을 하나씩 관리',
                items: [
                  {
                    text: '1. usePageState',
                    link: '/code/examples/use-page-state-coupling',
                  }
                ],
                collapsed: true,
              },
              {
                text: '중복 코드 허용하기',
                items: [
                  {
                    text: '1. useBottomSheet',
                    link: '/code/examples/use-bottom-sheet',
                  }
                ],
                collapsed: true,
              },
              {
                text: 'Props Drilling 지우기',
                items: [
                  {
                    text: '1. ItemEditModal',
                    link: '/code/examples/item-edit-modal',
                  }
                ],
                collapsed: true,
              }
            ],
            collapsed: true,
          },
        ]
      }
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/toss/frontend-fundamentals',
      },
    ],
  },
  vite: {
    resolve: {
      alias: [
        {
          find: /^vue$/,
          replacement: path.dirname(
            require.resolve('vue/package.json', {
              paths: [require.resolve('vitepress')],
            })
          ),
        },
        {
          find: /^vue\/server-renderer$/g,
          replacement: path.dirname(
            require.resolve('vue/server-renderer', {
              paths: [require.resolve('vitepress')],
            })
          ),
        },
      ],
    },
  },
  markdown: {
    config: (md) => {
      md.use(footnote);
    },
  },
})