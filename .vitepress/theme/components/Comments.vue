<script setup lang="ts">
import { watch } from "vue";
import { useData } from "vitepress";

const { frontmatter, title, isDark } = useData();
watch(isDark, () => {
  document.querySelector<HTMLIFrameElement>("iframe.giscus-frame")?.contentWindow?.postMessage(
    { giscus: { setConfig: { theme: isDark.value ? "noborder_dark" : "noborder_light" } } },
    "https://giscus.app"
  );
});
</script>

<template>
  <div v-if="frontmatter.comments !== false" :key="title" class="giscus" style="margin-top: 24px;">
    <component
      :is="'script'"
      :data-theme="isDark ? 'noborder_dark' : 'noborder_light'"
      src="https://giscus.app/client.js"
      data-repo="toss/frontend-fundamentals"
      data-repo-id="R_kgDONfHk5g"
      data-category="Commented Docs"
      data-category-id="DIC_kwDONfHk5s4ClUqX"
      data-mapping="title"
      data-strict="0"
      data-reactions-enabled="1"
      data-emit-metadata="0"
      data-input-position="bottom"
      data-lang="en"
      crossorigin="anonymous"
      data-loading="lazy"
      async
    />
  </div>
</template>