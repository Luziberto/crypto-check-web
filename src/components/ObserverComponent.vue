<template>
  <div class="observer" ref="root" />
</template>

<script lang="ts" setup>
import { PropType, ref, onMounted } from 'vue';

interface Options { page: number, itemsPerPage: number }

const root = ref<HTMLElement | null>();

const props = defineProps({
  options: {
    required: true,
    type: Object as PropType<Options>
  }
})

const observer = new IntersectionObserver(([entry]) => {
    if (entry && entry.isIntersecting) {
      emit('intersect');
    }
  })

const destroyed = () => {
  observer.disconnect()
}

const emit = defineEmits<{
  (e: 'intersect'): void
}>()

onMounted(() => {
    if (root.value) {
      observer.observe(root.value)
    }
})

</script>
