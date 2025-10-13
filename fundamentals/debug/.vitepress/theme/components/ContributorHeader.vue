<script setup lang="ts">
const props = defineProps<{
  name: string
  avatar?: string
  size?: number
}>();
</script>

<template>
  <div style="display:flex; align-items:center; gap:12px; margin:8px 0 24px;">
    <img
      :src="avatar || ''"
      :width="size || 40"
      :height="size || 40"
      :alt="name"
      style="border-radius:50%; object-fit:cover;"
    />
    <strong>{{ name }}</strong>
  </div>
</template>