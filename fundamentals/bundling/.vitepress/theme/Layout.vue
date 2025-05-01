<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import Comments from "./components/Comments.vue";
import { useLocale } from "./hooks";

const { Layout } = DefaultTheme;
const { isKorean } = useLocale();
</script>

<template>
  <Layout>
    <template #doc-after>
      <Comments />
    </template>
  </Layout>
</template>

<style>
html {
  overflow-y: scroll;
  scrollbar-gutter: stable;
}
</style>
