<template>
  <div
    ref="root"
    class="observer"
  />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const root = ref<HTMLElement | null>()
let isOverViewport = null

const observer = new IntersectionObserver(([entry]) => {
  isOverViewport = entry.boundingClientRect.y + window.scrollY > screen.height
  if (entry && entry.isIntersecting) {
    emit('intersect', isOverViewport)
  }
})

const emit = defineEmits<{
    (e: 'intersect', isOverViewport: boolean): void
  }>()

onMounted(() => {
  if (root.value) {
    observer.observe(root.value)
  }
})
</script>
