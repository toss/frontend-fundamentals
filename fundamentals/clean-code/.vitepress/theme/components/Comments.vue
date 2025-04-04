<script setup lang="ts">
import { useData } from "vitepress";
import { useGiscusTheme } from "../hooks/useGiscusTheme";
import { GISCUS_THEME, getGiscusLang } from "../utils";

const { frontmatter, title, lang, isDark } = useData();
useGiscusTheme();
</script>

<template>
  <div
    v-if="frontmatter.comments !== false"
    :key="title"
    class="giscus"
    style="margin-top: 24px"
  >
    <component
      :is="'script'"
      :data-theme="isDark ? GISCUS_THEME.dark : GISCUS_THEME.light"
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
      :data-lang="getGiscusLang(lang)"
      crossorigin="anonymous"
      data-loading="lazy"
      async
    />
  </div>
</template>
