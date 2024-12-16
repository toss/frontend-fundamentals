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
                text: '모든 쿼리 파라미터를 한 번에 관리',
                link: '/examples/use-page-state',
              },
              {
                text: '다른 동작을 한 번에 관리',
                link: '/examples/submit-button',
              },
              {
                text: '적절한 수준의 추상화',
                link: '/examples/friend-invitation',
              },
              {
                text: '매직 넘버',
                link: '/examples/magic-number',
              },
            ],
            collapsed: true,
          },
          {
            text: '결합도',
            items: [
              {
                text: '모든 쿼리 파라미터를 한 번에 관리',
                link: '/examples/use-page-state',
              }
            ],
            collapsed: true,
          }
        ]
      }
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.toss.bz/toss/frontend-example-docs',
      },
    ],
  }
})