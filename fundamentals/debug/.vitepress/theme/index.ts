import DefaultTheme from "vitepress/theme";
import Layout from "./Layout.vue";
import * as amplitude from "@amplitude/analytics-browser";
import "./custom.css";
import { enhanceAppWithTabs } from "vitepress-plugin-tabs/client";
import ContributorHeader from '../theme/components/ContributorHeader.vue'

export default {
  extends: DefaultTheme,
  Layout,
  async enhanceApp({ app }) {
    if (typeof window !== "undefined") {
      app.component('ContributorHeader', ContributorHeader)
      const amplitudeApiKey = (import.meta as any).env.VITE_AMPLITUDE_API_KEY;
      amplitude.init(amplitudeApiKey, { autocapture: true });
      enhanceAppWithTabs(app);
    }
  }
};
