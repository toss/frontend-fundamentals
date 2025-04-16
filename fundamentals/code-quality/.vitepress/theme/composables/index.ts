import { ref, computed } from "vue";
import { useData } from "vitepress";

export function useLocale() {
  const { lang } = useData();

  // 한국어 여부 확인
  const isKorean = computed(() => {
    return lang.value === "ko-KR" || lang.value === "ko";
  });

  return {
    isKorean
  };
}

export * from "./useBanner";
