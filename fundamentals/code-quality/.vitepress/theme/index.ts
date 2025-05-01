import DefaultTheme from "vitepress/theme";
import Layout from "./Layout.vue";
import * as amplitude from "@amplitude/analytics-browser";
import "./custom.css";
import GithubDiscussions from "./components/GithubDiscussions.vue";
import GithubDiscussionsDetail from "./components/GithubDiscussionsDetail.vue";

export default {
  extends: DefaultTheme,
  Layout,
  async enhanceApp({ app }) {
    if (typeof window !== "undefined") {
      const amplitudeApiKey = (import.meta as any).env.VITE_AMPLITUDE_API_KEY;
      amplitude.init(amplitudeApiKey, { autocapture: true });
    }
    app.component("GithubDiscussions", GithubDiscussions);
    app.component("GithubDiscussionsDetail", GithubDiscussionsDetail);
  }
};
