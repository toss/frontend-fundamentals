import { ref, watch, computed, onMounted } from "vue";
import { useData } from "vitepress";
import { GISCUS_ORIGIN, GISCUS_THEME, sendGiscusMessage } from "../utils";

export function useGiscusTheme() {
  const { isDark } = useData();
  const isIframeLoaded = ref(false);

  const syncTheme = () => {
    sendGiscusMessage({
      setConfig: {
        theme: isDark.value ? GISCUS_THEME.dark : GISCUS_THEME.light
      }
    });
  };

  const setupThemeHandler = () => {
    window.addEventListener("message", (event) => {
      if (event.origin === GISCUS_ORIGIN && event.data?.giscus != null) {
        isIframeLoaded.value = true;
        syncTheme();
      }
    });
  };

  onMounted(() => {
    setupThemeHandler();
  });

  watch(isDark, () => {
    if (isIframeLoaded.value) {
      syncTheme();
    }
  });

  return {
    theme: computed(() =>
      isDark.value ? GISCUS_THEME.dark : GISCUS_THEME.light
    )
  };
}
