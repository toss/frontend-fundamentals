import { enhanceAppToAddRecentDocs } from '@fe-document/vitepress/theme';
import Theme from 'vitepress/theme';
import Layout from '@fe-document/vitepress/theme/layout.vue';

export default {
  extends: Theme,
  Layout: Layout,
  enhanceApp: (ctx) => {
    enhanceAppToAddRecentDocs(ctx);
  }
}