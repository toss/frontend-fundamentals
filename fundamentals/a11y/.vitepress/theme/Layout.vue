<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import Comments from "./components/Comments.vue";
import OneNavigation from "@shared/components/OneNavigation.vue";
import { useLocale } from "./hooks";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vitepress";

const { Layout } = DefaultTheme;
const { isKorean } = useLocale();
const route = useRoute();
const router = useRouter();

onMounted(() => {
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a[href^="/a11y/"]');

    if (link?.classList.value.startsWith("VPLink link")) {
      e.preventDefault();

      const href = link.getAttribute("href");
      const targetLangMatch = href?.match(/^\/a11y\/(en|ja|zh-hans)\//);
      const targetLang = targetLangMatch ? targetLangMatch[1] : "ko";

      const pathWithoutLang = route.path
        .replace(/^\/a11y\/(en|ja|zh-hans)\//, "/a11y/")
        .replace(/^\/a11y\//, "");
      const newPath =
        targetLang === "ko"
          ? `/a11y/${pathWithoutLang}`
          : `/a11y/${targetLang}/${pathWithoutLang}`;

      // VitePress needs time to clear its internal 404 state before routing to the new path
      setTimeout(() => {
        router.go(newPath);
      }, 100);
    }
  });
});
</script>

<template>
  <OneNavigation />
  <div class="layout-wrapper">
    <Layout>
      <template #doc-after>
        <Comments />
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

@media (min-width: 1024px) {
  .layout-wrapper {
    padding-left: var(--one-navi-width);
  }
  .VPSidebar,
  .divider,
  .container > .title,
  .VPNavBar.has-sidebar .content {
    margin-left: var(--one-navi-width);
  }
  .VPNavBar.has-sidebar > .title {
    background: var(--vp-sidebar-bg-color) !important;
  }
}
</style>
