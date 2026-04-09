import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import Layout from "./Layout.vue";
import * as amplitude from "@amplitude/analytics-browser";
import "./custom.css";
import GithubDiscussions from "./components/GithubDiscussions.vue";
import GithubDiscussionsDetail from "./components/GithubDiscussionsDetail.vue";
import FrameworkSwitch from "./components/FrameworkSwitch.vue";
import FrameworkContent from "./components/FrameworkContent.vue";

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
    app.component("FrameworkSwitch", FrameworkSwitch);
    app.component("React", {
      setup(_, { slots }) {
        return () => h(FrameworkContent, { name: "react" }, slots);
      }
    });
    app.component("Angular", {
      setup(_, { slots }) {
        return () => h(FrameworkContent, { name: "angular" }, slots);
      }
    });
  }
};
