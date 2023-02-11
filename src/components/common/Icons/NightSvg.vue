<template>
  <svg
    viewBox="0 0 24 24"
    :fill="color"
    stroke="#000"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    :width="width"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
</template>
<script lang="ts" setup>
withDefaults(
  defineProps<{
      color?: string
      width?: number
    }>(),
  {
    color: '#ffffff',
    width: 20,
  },
)
</script>

<style scoped>
  svg {
    transform: scaleX(-1);
  }
</style>
