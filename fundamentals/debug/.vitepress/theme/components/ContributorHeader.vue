<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  name: string;
  avatar?: string;
  githubUrl?: string;
  date?: string;
  readingTime?: string;
  size?: number;
}>();

const avatarSrc = computed(() => {
  if (!props.avatar) {
    return "";
  }

  if (props.avatar.startsWith("/")) {
    return props.avatar;
  }

  const images = (import.meta as any).glob(
    "/images/contribute/**/*.{png,jpg,jpeg,webp,avif,gif,svg}",
    { eager: true, import: "default" }
  );

  const fileName = props.avatar.split("/").pop();
  const matchedEntry = Object.entries(images).find(([path]) =>
    path.endsWith(fileName ?? "")
  );

  if (matchedEntry) {
    const [_, buildURL] = matchedEntry;
    return buildURL;
  }

  return props.avatar;
});
</script>

<template>
  <div class="contributor-header">
    <img
      :src="avatarSrc"
      :width="size || 50"
      :height="size || 50"
      :alt="name"
      class="contributor-avatar"
    />
    <div class="contributor-info">
      <a
        v-if="githubUrl"
        :href="githubUrl"
        target="_blank"
        class="contributor-name"
      >
        {{ name }}
        <svg
          viewBox="0 0 16 16"
          width="14"
          height="14"
          fill="currentColor"
          style="margin-left: 4px"
        >
          <path
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
          />
        </svg>
      </a>
      <strong v-else class="contributor-name">{{ name }}</strong>
      <div class="contributor-meta">
        <span v-if="date" class="meta-item">{{ date }}</span>
        <span v-if="readingTime" class="meta-item">{{ readingTime }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contributor-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  margin: 24px 0 32px;
}

.contributor-avatar {
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  order: 2;
}

.contributor-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  align-items: flex-end;
  order: 1;
}

.contributor-name {
  display: inline-flex;
  align-items: center;
  font-size: 1.1em;
  font-weight: 600;
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.2s;
}

.contributor-name:hover {
  color: var(--vp-c-text-2);
}

.contributor-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.9em;
  color: var(--vp-c-text-2);
}

.meta-item {
  display: inline-block;
}
</style>
