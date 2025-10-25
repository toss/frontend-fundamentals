<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  name: string;
  avatar?: string;
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
  <div
    style="display: flex; align-items: center; gap: 12px; margin: 8px 0 24px"
  >
    <img
      :src="avatarSrc"
      :width="size ?? 40"
      :height="size ?? 40"
      :alt="name"
      style="border-radius: 50%; object-fit: cover"
    />
    <strong>{{ name }}</strong>
  </div>
</template>
