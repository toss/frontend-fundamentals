import defaultConfig from '@fe-document/vitepress/config';
import { defineConfig } from 'vitepress';

export default defineConfig({
  extends: defaultConfig,
  title: "Frontend Fundamentals",
  description: "프론트엔드 코드의 기준",
  base: '/code-quality',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
    ],

    sidebar: [
      {
        text: '좋은 코드의 기준',
        items: [
          { 
            text: '변경하기 쉬운 코드',
            link: '/introduction',
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
                    text: '1. SubmitButton',
                    link: '/examples/submit-button',
                  },
                  {
                    text: '2. FriendInvitation',
                    link: '/examples/friend-invitation',
                  },
                  {
                    text: '3. LoginStartPage',
                    link: '/examples/login-start-page',
                  },
                  {
                    text: '4. 쿼리 파라미터 관리하기',
                    link: '/examples/use-page-state',
                  },
                ],
                collapsed: true
              },
              {
                text: '이름 붙이기',
                items: [
                  {
                    text: '1. 복잡한 조건',
                    link: '/examples/condition-name',
                  },
                  {
                    text: '2. 매직 넘버',
                    link: '/examples/magic-number-readability',
                  },
                ],
                collapsed: true
              },
              {
                text: '위에서 아래로 읽히게 하기',
                items: [
                  {
                    text: '삼항 연산자 풀어서 쓰기',
                    link: '/examples/ternary-operator',
                  },
                  {
                    text: '시점 이동 줄이기',
                    link: '/examples/user-policy',
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
                text: '이름 겹치지 않게 관리하기',
                link: '/examples/http',
              },
            ],
            collapsed: true,
          },
          {
            text: '3. 응집도',
            items: [
              {
                text: '연관된 파일 같은 디렉토리에 두기',
                link: '/examples/code-directory',
              },
              {
                text: '매직 넘버 없애기',
                link: '/examples/magic-number-cohesion',
              },
              {
                text: '폼의 응집도 생각하기',
                link: '/examples/form-fields',
              }
            ],
            collapsed: true,
          },
          {
            text: '4. 결합도',
            items: [
              {
                text: '쿼리 파라미터는 하나씩 관리',
                link: '/examples/use-page-state',
              },
              {
                text: '중복 코드 허용하기',
                link: '/examples/use-bottom-sheet',
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
        link: 'https://github.toss.bz/toss/frontend-code-quality-committee',
      },
    ],
  }
})