<template>
  <div class="custom-ad-container">
    <div class="custom-ad-box">
      <a
        :href="currentAd?.link"
        target="_blank"
        rel="noopener noreferrer"
        class="custom-ad-link"
        @click="currentAd && trackAdClick(currentAd)"
      >
        <div class="custom-ad-content">
          <div class="custom-ad-title">{{ currentAd?.title }}</div>
          <div class="custom-ad-description">{{ currentAd?.description }}</div>
        </div>
      </a>
      <div class="custom-ad-controls">
        <button
          v-for="(_, index) in ads"
          :key="index"
          :class="['custom-ad-dot', { active: currentAdIndex === index }]"
          @click="setAdIndex(index)"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAds } from "../composables";
import type { Ad } from "../data/adsData";

const { ads, currentAd, setAdIndex, trackAdClick, currentAdIndex } = useAds();
</script>

<style scoped>
.custom-ad-container {
  margin: 24px 0;
  border-radius: 8px;
  overflow: hidden;
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 224px;
  background-color: var(--vp-c-bg-soft);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  z-index: 10;
}

.custom-ad-container:hover {
  transform: translateY(-2px);
}

.custom-ad-box {
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.custom-ad-link {
  display: flex;
  text-decoration: none;
  color: inherit;
}

.custom-ad-image-wrapper {
  width: 64px;
  height: 64px;
  margin-right: 12px;
  overflow: hidden;
  border-radius: 6px;
}

.custom-ad-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.custom-ad-content {
  flex: 1;
}

.custom-ad-title {
  font-weight: 600;
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 4px;
  color: var(--vp-c-text-1);
}

.custom-ad-description {
  font-size: 13px;
  line-height: 1.4;
  color: var(--vp-c-text-2);
}

.custom-ad-label {
  margin-top: 8px;
  font-size: 11px;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
  text-align: right;
}

.custom-ad-controls {
  display: flex;
  justify-content: center;
  margin-top: 12px;
}

.custom-ad-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--vp-c-text-3);
  margin: 0 4px;
  padding: 0;
  border: none;
  opacity: 0.5;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.custom-ad-dot.active {
  opacity: 1;
  background-color: var(--vp-c-brand);
}

@media (max-width: 768px) {
  .custom-ad-container {
    position: static;
    width: 100%;
    margin-top: 24px;
  }
}
</style>
