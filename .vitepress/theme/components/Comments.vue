<script setup lang="ts">
import { useData } from 'vitepress'

const { frontmatter, title } = useData()
</script>

<template>
  <div v-if="frontmatter.comments !== false" :key="title" class="giscus" style="margin-top: 24px;">
    <component
      :is="'script'"
      src="https://giscus.app/client.js"
      data-repo="toss/frontend-fundamentals"
      data-repo-id="R_kgDONfHk5g"
      data-category="Commented Docs"
      data-category-id="DIC_kwDONfHk5s4ClUqX"
      data-mapping="pathname"
      data-strict="0"
      data-reactions-enabled="1"
      data-emit-metadata="0"
      data-input-position="bottom"
      data-theme="preferred_color_scheme"
      data-lang="en"
      crossorigin="anonymous"
      data-loading="lazy"
      async
    />
  </div>
</template>