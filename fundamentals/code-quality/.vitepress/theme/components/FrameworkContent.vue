<script setup lang="ts">
import { computed } from "vue";
import { useFramework } from "../composables/useFramework";

const props = defineProps<{ name: "react" | "angular" }>();
const { framework } = useFramework();
const visible = computed(() => framework.value === props.name);
</script>

<template>
  <slot v-if="visible" />
</template>
