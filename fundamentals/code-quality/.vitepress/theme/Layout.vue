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
:root {
  --one-navi-width: 50px;
}
html {
  overflow-y: scroll;
  scrollbar-gutter: stable;
}

@media (min-width: 960px) {
  .layout-wrapper {
    padding-left: var(--one-navi-width);
  }
  .VPSidebar, .divider, .container > .title, .VPNavBar.has-sidebar .content {
    margin-left: var(--one-navi-width);
  }
  .container > .title {
    background: var(--vp-sidebar-bg-color) !important;
  }
}
.curtain {
  /* background: grey !important; */
  margin-left: 0 !important;
  margin-right: 0 !important;
}
</style>
