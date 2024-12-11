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
        text: '예시 문서 목록',
        items: [
          { 
            text: '예시 문서 1',
            link: '/example/doc1',
          },
          { 
            text: '예시 문서 2',
            link: '/example/doc2',
          }
        ]
      },
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.toss.bz/toss/frontend-example-docs',
      },
    ],
  }
})