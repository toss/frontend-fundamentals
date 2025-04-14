<template>
  <div class="one-navigation">
    <div class="nav-top">
      <div
        class="nav-item"
        :class="{ active: isActive('/getting-started/') }"
        data-tooltip="코드퀄리티"
      >
        <a href="/getting-started/introduction">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.5 12.174v-.224c0-.131.067-.248.172-.311a54.614 54.614 0 014.653-2.52.75.75 0 00-.65-1.352 56.129 56.129 0 00-4.78 2.589 1.858 1.858 0 00-.859 1.228 49.803 49.803 0 00-4.634-1.527.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z"
            />
            <path
              d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 016 13.18v1.27a1.5 1.5 0 00-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.661a6.729 6.729 0 00.551-1.608 1.5 1.5 0 00.14-2.67v-.645a48.549 48.549 0 013.44 1.668 2.25 2.25 0 002.12 0z"
            />
            <path
              d="M4.462 19.462c.42-.419.753-.89 1-1.394.453.213.902.434 1.347.661a6.743 6.743 0 01-1.286 1.794.75.75 0 11-1.06-1.06z"
            />
          </svg>
        </a>
      </div>
      <div
        class="nav-item"
        :class="{ active: isActive('/components/') }"
        data-tooltip="번들링"
      >
        <a href="/components/introduction">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm4.5 7.5a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zm3.75-1.5a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0V12zm2.25-3a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0V9.75A.75.75 0 0113.5 9zm3.75-1.5a.75.75 0 00-1.5 0v9a.75.75 0 001.5 0v-9z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </div>
      <div
        class="nav-item"
        :class="{ active: isActive('/hooks/') }"
        data-tooltip="접근성"
      >
        <a href="/hooks/introduction">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M14.447 3.027a.75.75 0 01.527.92l-4.5 16.5a.75.75 0 01-1.448-.394l4.5-16.5a.75.75 0 01.921-.526zM16.72 6.22a.75.75 0 011.06 0l5.25 5.25a.75.75 0 010 1.06l-5.25 5.25a.75.75 0 11-1.06-1.06L21.44 12l-4.72-4.72a.75.75 0 010-1.06zm-9.44 0a.75.75 0 010 1.06L2.56 12l4.72 4.72a.75.75 0 11-1.06 1.06L.97 12.53a.75.75 0 010-1.06l5.25-5.25a.75.75 0 011.06 0z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </div>
      <div
        class="nav-item"
        :class="{ active: isActive('/utils/') }"
        data-tooltip="디버깅"
      >
        <a href="/utils/introduction">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12 6.75a5.25 5.25 0 016.775-5.025.75.75 0 01.313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 011.248.313 5.25 5.25 0 01-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 112.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0112 6.75zM4.117 19.125a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z"
              clip-rule="evenodd"
            />
            <path
              d="M10.076 8.64l-2.201-2.2V4.874a.75.75 0 00-.364-.643l-3.75-2.25a.75.75 0 00-.916.113l-.75.75a.75.75 0 00-.113.916l2.25 3.75a.75.75 0 00.643.364h1.564l2.062 2.062 1.575-1.297z"
            />
            <path
              fill-rule="evenodd"
              d="M12.556 17.329l4.183 4.182a3.375 3.375 0 004.773-4.773l-3.306-3.305a6.803 6.803 0 01-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 00-.167.063l-3.086 3.748zm3.414-1.36a.75.75 0 011.06 0l1.875 1.876a.75.75 0 11-1.06 1.06L15.97 17.03a.75.75 0 010-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </div>
    </div>
    <div class="nav-bottom">
      <div class="nav-item" data-tooltip="GitHub">
        <a
          href="https://github.com/toss/frontend-fundamentals"
          target="_blank"
          rel="noopener"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useData, useRoute } from "vitepress";

const route = useRoute();
const { site } = useData();

// 현재 경로가 주어진 경로로 시작하는지 확인하는 함수
function isActive(path: string): boolean {
  return route.path.startsWith(path);
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
  z-index: 40; /* VitePress 사이드바는 z-index: 30이므로 그 위에 배치 */
  background-color: var(--vp-c-bg-alt);
  padding-top: var(--vp-nav-height); /* 헤더와 겹치지 않도록 상단 패딩 추가 */
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

/* 툴팁 스타일 */
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

/* 모바일 대응 */
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
    z-index: 100; /* 모바일에서는 더 높은 z-index 설정 */
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

  .nav-item[data-tooltip]::after {
    display: none; /* 모바일에서 툴팁 숨김 */
  }
}
</style>
