import { createRequire } from 'node:module';
import path from 'node:path';
import { defineConfig } from 'vitepress';
import footnote from 'markdown-it-footnote';
import { shared } from './shared.mts';
import { en } from './en.mts';
import { ko } from './ko.mts';

const require = createRequire(import.meta.url);

export default defineConfig({
  ...shared,
  locales: {
    en: { label: 'English', ...en },
    root: { label: '한국어', ...ko },
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