import defaultConfig from '@fe-document/vitepress/config';
import { defineConfig } from 'vitepress';

export default defineConfig({
  extends: defaultConfig,
  title: "Code Quality",
  description: "프론트엔드 예시 문서",
  base: '/code-quality',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: '모든 문서', link: 'https://docs.alpha-i.toss.bz' },
    ],

    sidebar: [
      {
        text: '좋은 코드의 기준',
        items: [
          { 
            text: 'Frontend Fundamentals',
            link: '/introduction',
          },
        ]
      },
      {
        text: '예시',
        items: [
          {
            text: '가독성',
            items: [
              {
                text: '쿼리 파라미터는 하나씩 관리하기',
                link: '/examples/use-page-state',
              },
              {
                text: '한 번에 다루는 맥락 줄이기',
                link: '/examples/submit-button',
              },
              {
                text: '적절한 수준의 추상화 1',
                link: '/examples/friend-invitation',
              },
              {
                text: '적절한 수준의 추상화 2',
                link: '/examples/login-start-page',
              },
              {
                text: '매직 넘버에 이름 붙이기',
                link: '/examples/magic-number',
              },
              {
                text: '복잡한 조건에 이름 붙이기',
                link: '/examples/condition-name',
              },
              {
                text: '삼항 연산자 풀어서 쓰기',
                link: '/examples/ternary-operator',
              },
              {
                text: '시점 이동 줄이기',
                link: '/examples/user-policy',
              },
            ],
            collapsed: true,
          },

          {
            text: '예측 가능성',
            items: [
              {
                text: '이름 겹치지 않게 관리하기',
                link: '/examples/http',
              },
            ],
            collapsed: true,
          },
          {
            text: '응집도',
            items: [
              {
                text: '연관된 파일 같은 디렉토리에 두기',
                link: '/examples/code-directory',
              },
              {
                text: '매직 넘버에 이름 붙이기',
                link: '/examples/magic-number',
              },
              {
                text: '폼의 응집도 생각하기',
                link: '/examples/form-fields',
              }
            ],
            collapsed: true,
          },
          {
            text: '결합도',
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