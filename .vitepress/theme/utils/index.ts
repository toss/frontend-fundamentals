export const GISCUS_ORIGIN = "https://giscus.app" as const;

export const GISCUS_LANG_MAP = {
  ko: "ko",
  en: "en",
  ja: "ja",
  zh: "zh-Hans"
} as const;

export const GISCUS_THEME = {
  light: "light_tritanopia",
  dark: "dark_tritanopia"
};

export function getGiscusLang(lang) {
  return GISCUS_LANG_MAP[lang] || "en";
}

export function sendGiscusMessage<T>(message: T) {
  const iframe = document.querySelector<HTMLIFrameElement>(
    "iframe.giscus-frame"
  );
  if (!iframe) return;

  iframe.contentWindow?.postMessage({ giscus: message }, GISCUS_ORIGIN);
}
