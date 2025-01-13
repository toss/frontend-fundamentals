import Layout from "./Layout.vue";
import * as amplitude from "@amplitude/analytics-browser";

export default {
  Layout,
  async enhanceApp() {
    const amplitudeApiKey = (import.meta as any).env.VITE_AMPLITUDE_API_KEY;

    amplitude.init(amplitudeApiKey, { autocapture: true });
  }
};
