export const GISCUS_ORIGIN = "https://giscus.app" as const;

export const GISCUS_THEME = {
  light: "light_tritanopia",
  dark: "dark_tritanopia"
};

export function sendGiscusMessage<T>(message: T) {
  const iframe = document.querySelector<HTMLIFrameElement>(
    "iframe.giscus-frame"
  );
  if (!iframe) return;

  iframe.contentWindow?.postMessage({ giscus: message }, GISCUS_ORIGIN);
}
