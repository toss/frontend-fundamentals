<script setup lang="ts">
import { useFramework } from "../composables/useFramework";

const { framework, setFramework } = useFramework();
</script>

<template>
  <span class="framework-switch">
    <button
      :class="['framework-btn', { active: framework === 'react' }]"
      @click="setFramework('react')"
    >
      React
    </button>
    <button
      :class="['framework-btn', { active: framework === 'angular' }]"
      @click="setFramework('angular')"
    >
      Angular
    </button>
  </span>
</template>

<style scoped>
.framework-switch {
  display: inline-flex;
  gap: 4px;
  margin-left: 12px;
  vertical-align: middle;
  position: relative;
  top: -2px;
}

.framework-btn {
  padding: 2px 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  line-height: 1.6;
}

.framework-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.framework-btn.active {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: #fff;
}
</style>
