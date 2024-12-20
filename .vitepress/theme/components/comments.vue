<script setup lang="ts">
import { useData } from 'vitepress'

const { title } = useData()
</script>

<template>
  <div :key="title" class="giscus">
    <component
      :is="'script'"
      data-repo="toss/frontend-fundamentals"
      data-repo-id="R_kgDONfHk5g"
      data-category="Announcements"
      data-category-id="DIC_kwDONfHk5s4ClUqT"
      data-mapping="pathname"
      data-strict="0"
      data-reactions-enabled="1"
      data-emit-metadata="0"
      data-input-position="bottom"
      data-theme="preferred_color_scheme"
      data-lang="ko"
      crossorigin="anonymous"
      data-loading="lazy"
      async
    />
  </div>
</template>