<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import Comments from "./components/Comments.vue";
import CustomBanner from "./components/CustomBanner.vue";
import OneNavigation from "./components/OneNavigation.vue";
import { useLocale } from "./composables";

const { Layout } = DefaultTheme;
const { isKorean } = useLocale();
</script>

<template>
  <OneNavigation />
  <div class="layout-wrapper">
    <Layout>
      <template #doc-after>
        <Comments />
      </template>
      <template #aside-bottom>
        <CustomBanner v-if="isKorean" />
      </template>
    </Layout>
  </div>
</template>

<style>
html {
  overflow-y: scroll;
  scrollbar-gutter: stable;
}

.layout-wrapper {
  padding-left: 50px; /* 네비게이션 바 너비만큼 여백 추가 */
}
</style>
