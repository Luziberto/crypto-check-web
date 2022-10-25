<template>
  <div class="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center z-50">
      <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div class="relative bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-4xl sm:w-full sm:p-6">
          <div class="flex items-center justify-between text-xl font-bold">
            <div class="flex items-center">
              <img class="w-12" :src="props.selectedAsset.image"/>
              <span class="px-2">
                  {{selectedAsset.name}}
              </span>
            </div>

              <button class="fill-current h-5 w-5 font-3xl font-bold" @click="close">
                  <span class="sr-only">Close</span>
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
              </button>
          </div>
          <div class="flex items-center justify-center py-2 text-xl border-b font-bold">
            <CryptoHistoryForm :asset="selectedAsset" @asset-history="showAssetHistory"/>
            <div class="relative">
                <div
id="menuModal" class="hidden origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-40"
                    role="menu" aria-orientation="vertical" aria-labelledby="mentor-menu">
                    <div class="font-medium text-sm text-gray-500 text-center"> teste </div>
                    <hr class="ml-2 mr-2">
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Remove Mentor</a>
                </div>
            </div>
          </div>
          <div class="mt-4 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                  <thead>
                      <tr>
                          <th
                              class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                              Price
                          </th>
                          <th
                              class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                              Volume
                          </th>
                      </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-if="Object.keys(assetHistory).length" class="cursor-pointer hover:bg-gray-100">
                        <td class="text-center w-1/2 px-1 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                          {{formatNumber(assetHistory.market_data.price)}}
                        </td>
                        <td class="text-center px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                          {{formatNumber(assetHistory.market_data.total_volume)}}
                        </td>
                    </tr>
                  </tbody>
              </table>
          </div>
      </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, PropType } from 'vue'
import CryptoHistoryForm from '@/components/CryptoHistoryForm.vue';
import { Asset } from '@/types/Asset';
import { AssetHistory } from '@/types/AssetHistory';
import { formatCurrency } from '@/utils/NumberUtils';

const props = defineProps({
  assets: {
    required: true,
    type: Array as PropType<Asset[]>
  },
  selectedAsset: {
    required: true,
    type: Object as PropType<Asset>
  }
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const assetHistory  = ref<AssetHistory>({} as AssetHistory)

const showAssetHistory = (history: AssetHistory) => {
  assetHistory.value = history
}

const close = () => emit('close')

const formatNumber = formatCurrency

</script>

