<template>
  <Transition name="dropdown">
    <AssetMarketCharts
      v-if="active && latestAsset"
      class="grid grid-cols-2 border-y border-gray-800 overflow-hidden"
      :asset="latestAsset"
      mode="mobile"
    />
  </Transition>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Asset } from '@/types/models/Asset'
import AssetMarketCharts from '@/components/asset/AssetMarketCharts.vue'

const active = ref(false)

const latestAsset = ref<Asset | null>(null)

const toggle = (asset: Asset): Promise<void> => {
  return new Promise(resolve => {
    if (latestAsset.value?.uuid && latestAsset.value.uuid !== asset.uuid) {
      active.value = !active.value
      if (!active.value) {
        setTimeout(() => {
          active.value = !active.value
          resolve()
        }, 300)
      }
    } else {
      active.value = !active.value
    }
    latestAsset.value = asset
    resolve()
  })
}

defineExpose({
  toggle,
})
</script>

<style scoped>
.dropdown-enter-active {
  animation: dropdown 0.3s ease-in-out forwards;
}

/* .dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.5s ease;
} */

.dropdown-enter-from,
.dropdown-leave-to {
  animation: dropdown 0.3s ease-in-out forwards reverse;
}

@keyframes dropdown {
  0% {
    transform: scaleY(0);
  }

  100% {
    transform: scaleY(1);
  }
}
</style>
