<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import Comments from "./components/Comments.vue";
import CustomAd from "./components/CustomAd.vue";
import { useLocale } from "./composables";

const { Layout } = DefaultTheme;
const { isKorean } = useLocale();
</script>

<template>
  <Layout>
    <template #doc-after>
      <Comments />
    </template>
    <template #aside-bottom>
      <CustomAd v-if="isKorean" />
    </template>
  </Layout>
</template>

<style>
html {
  overflow-y: scroll;
  scrollbar-gutter: stable;
}
</style>
