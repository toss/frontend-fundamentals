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

/* VitePress 기본 사이드바 조정 */
:root {
  --vp-sidebar-width: 280px; /* 기본 사이드바 너비 설정 */
}

.VPSidebar {
  margin-left: 50px; /* 네비게이션 바 너비만큼 왼쪽 마진 추가 */
  width: var(--vp-sidebar-width) !important; /* 너비 고정 */
}

.VPContent.has-sidebar {
  padding-left: calc(
    var(--vp-sidebar-width) + 50px
  ) !important; /* 사이드바 + 네비게이션 바 너비만큼 패딩 */
}

/* 모바일 화면에서 레이아웃 조정 */
@media (max-width: 768px) {
  .layout-wrapper {
    padding-left: 0; /* 좌측 패딩 제거 */
    padding-bottom: 56px; /* 모바일 네비게이션 바 높이만큼 패딩 추가 */
  }

  .VPSidebar {
    margin-left: 0 !important; /* 모바일에서는 마진 제거 */
    width: 100% !important; /* 모바일에서는 전체 너비 사용 */
  }

  .VPContent.has-sidebar {
    padding-left: 0 !important; /* 좌측 패딩 제거 */
  }
}

/* 태블릿 화면 대응 */
@media (min-width: 769px) and (max-width: 1200px) {
  .VPSidebar {
    margin-left: 50px; /* 네비게이션 바 너비만큼 마진 유지 */
    width: 240px !important; /* 태블릿에서는 사이드바 너비 축소 */
  }

  .VPContent.has-sidebar {
    padding-left: calc(
      240px + 50px
    ) !important; /* 조정된 사이드바 + 네비게이션 바 너비 */
  }
}
</style>
