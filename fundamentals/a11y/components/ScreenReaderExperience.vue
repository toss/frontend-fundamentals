<script setup>
import { ref, onMounted, defineProps } from "vue";

defineProps({
  title: String,
  url: String
});

const isMobile = ref(true);

onMounted(() => {
  function handleResize() {
    isMobile.value = window.innerWidth < 768;
  }

  window.addEventListener("resize", handleResize);
  handleResize();

  return () => {
    window.removeEventListener("resize", handleResize);
  };
});
</script>

<template>
  <a :href="url" target="_blank" v-if="isMobile">
    {{ title }}
  </a>
  <iframe :src="url" frameborder="0" width="378" height="827" v-else></iframe>
</template>
