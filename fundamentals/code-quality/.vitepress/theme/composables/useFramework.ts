import { ref, readonly } from "vue";

type Framework = "react" | "angular";

const FRAMEWORKS: Framework[] = ["react", "angular"];
const STORAGE_KEY = "preferred-framework";

function getStoredFramework(): Framework {
  if (typeof window === "undefined") return "react";
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return FRAMEWORKS.includes(stored as Framework) ? (stored as Framework) : "react";
  } catch {
    return "react";
  }
}

const framework = ref<Framework>(getStoredFramework());

export function useFramework() {
  function setFramework(value: Framework) {
    if (framework.value === value) return;
    framework.value = value;
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {}
  }

  return {
    framework: readonly(framework),
    setFramework,
  };
}
