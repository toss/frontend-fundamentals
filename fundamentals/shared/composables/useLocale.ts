import { useData } from "vitepress";
import { computed } from "vue";

export function useLocale() {
  const { lang } = useData();

  const isKorean = computed(() => lang.value === "ko" || lang.value === "root");

  return {
    isKorean
  };
}
