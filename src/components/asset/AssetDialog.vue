<template>
  <div class="fixed inset-0 flex justify-center z-20">
    <div class="col-span-none transition-opacity">
      <div class="absolute inset-0 bg-gray-500 opacity-75" />
    </div>
    <div
      v-if="selectedAsset"
      class="container relative rounded-lg p-4 shadow-xl my-auto transform transition-all w-full mx-2 md:w-1/2 sm:p-6 z-50"
    >
      <div class="flex items-center justify-between text-xl font-bold">
        <div class="flex items-center">
          <img class="w-12" :src="selectedAsset.image" />
          <span class="px-2">
            {{ selectedAsset.name }}
          </span>
        </div>

        <button class="fill-current h-5 w-5 font-3xl font-bold" @click="close">
          <span class="sr-only">Close</span>
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <AssetMarketCharts
        v-if="selectedAsset"
        class="grid grid-cols-2 overflow-hidden"
        :asset="selectedAsset"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Asset } from '@/types/models/Asset'
import { AssetHistory } from '@/types/models/AssetHistory'
import AssetMarketCharts from '@/components/asset/AssetMarketCharts.vue'

defineProps<{
  selectedAsset: Asset | undefined
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'error', errors: unknown[]): void
}>()

const assetHistory = ref<AssetHistory>({} as AssetHistory)

const showAssetHistory = (history: AssetHistory) => {
  assetHistory.value = history
}

const close = () => emit('close')

const error = (errors: unknown[]) => emit('error', errors)
</script>
