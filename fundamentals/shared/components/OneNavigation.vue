<template>
  <div class="one-navigation">
    <div class="nav-top">
      <div
        v-for="item in ONE_NAVIGATION_ITEMS"
        :key="item.path"
        class="nav-item"
        :class="{ active: isActive(item.path) }"
        :data-tooltip="(isKorean ? item.tooltip.ko : item.tooltip.en)"
      >
        <a 
          href="javascript:void(0)" 
          @click="handleNavigation(item.href)"
        >
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
ㄴ
<script setup lang="ts">
import { useRoute } from "vitepress";
import { useLocale } from "../composables/useLocale";
import { ONE_NAVIGATION_ITEMS } from "../config/OneNavigationItems";
import { ref, onMounted } from "vue";

const route = useRoute();
const { isKorean } = useLocale();
const locationOrigin = ref("");

onMounted(() => {
  locationOrigin.value = window.location.origin;
});

function isActive(path: string): boolean {
  return route.path.startsWith(path);
}

function handleNavigation(href: string): void {
  // 현재 URL의 origin을 사용하여 전체 URL 생성
  const fullUrl = locationOrigin.value + href;
  // 현재 창에서 이동
  window.location.href = fullUrl;
}
</script>

<style scoped>
.one-navigation {
  position: fixed;
  top: 0;
  left: 0;
  width: 50px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-right: 1px solid var(--vp-c-divider);
  z-index: 40;
  background-color: var(--vp-c-bg-alt);
  padding-top: var(--vp-nav-height);
}

.nav-top {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1.5rem;
  width: 100%;
}

.nav-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1.5rem;
  width: 100%;
  margin-bottom: 1rem;
}

.nav-item {
  width: 100%;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
  position: relative;
}

.nav-item a {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: var(--vp-c-text-2);
  transition: color 0.2s;
}

.nav-item svg {
  width: 20px;
  height: 20px;
}

.nav-item:hover a {
  color: var(--vp-c-text-1);
}

.nav-item.active a {
  color: var(--vp-c-brand);
}

.nav-item.active::before {
  content: "";
  position: absolute;
  left: 0;
  top: 7px;
  height: 22px;
  width: 2px;
  background-color: var(--vp-c-brand);
}

.nav-item[data-tooltip]::after {
  content: attr(data-tooltip);
  position: absolute;
  left: 50px;
  top: 50%;
  transform: translateY(-50%);
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 41;
}

.nav-item[data-tooltip]:hover::after {
  opacity: 1;
  visibility: visible;
  left: 58px;
}

@media (max-width: 960px) {
  .one-navigation {
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 56px;
    flex-direction: row;
    border-right: none;
    border-top: 1px solid var(--vp-c-divider);
    z-index: 100; 
    padding-top: 0;
  }

  .nav-top,
  .nav-bottom {
    flex-direction: row;
    padding: 0;
    height: 100%;
    justify-content: space-around;
  }

  .nav-top {
    flex: 1;
  }

  .nav-bottom {
    margin-bottom: 0;
    margin-right: 1rem;
  }

  .nav-item {
    margin-bottom: 0;
  }

  .nav-item.active::before {
    left: 8px;
    top: 0;
    height: 2px;
    width: calc(100% - 16px);
  }
}
</style> 