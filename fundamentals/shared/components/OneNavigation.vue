<template>
  <div class="one-navigation">
    <div class="nav-top">
      <div
        v-for="item in navigationItems"
        :key="item.path"
        class="nav-item"
        :class="{ active: isActive(item.path) }"
        :data-tooltip="isKorean ? item.tooltip.ko : item.tooltip.en"
      >
        <a href="javascript:void(0)" @click="handleNavigation(item.href)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            v-html="item.icon"
          ></svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useData } from "vitepress";
import { useLocale } from "../composables/useLocale";
import { ONE_NAVIGATION_ITEMS } from "../config/OneNavigationItems";
import { ref, onMounted, computed } from "vue";
import "./styles/OneNavigation.css";

const { lang } = useData();

const navigationItems = computed(() =>
  ONE_NAVIGATION_ITEMS.map((item) => ({
    ...item,
    href: item.href.replace("/{lang}", `/${lang.value}`).replace("/ko", "")
  }))
);

const route = useRoute();
const { isKorean } = useLocale();
const locationOrigin = ref("");

onMounted(() => {
  if (typeof window !== "undefined") {
    locationOrigin.value = window.location.origin;
  }
});

function isActive(path: string): boolean {
  return route.path.startsWith(path);
}

function handleNavigation(href: string): void {
  if (typeof window !== "undefined") {
    // 현재 URL의 origin을 사용하여 전체 URL 생성
    const fullUrl = locationOrigin.value + href;
    // 현재 창에서 이동
    window.location.href = fullUrl;
  }
}
</script>
