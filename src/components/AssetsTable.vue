<template>
  <div class="flex flex-col">
    <div class="grid grid-flow-row -my-2 overflow-x-auto auto-rows-max">
      <div class="overflow-hidden border-b border-gray-200 shadow lg:rounded-lg">
        <div>
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="min-w-full divide-y divide-gray-200">
            </thead>
            <tbody class="bg-white divide-y divide-gray-200 grid lg:grid-cols-2">
              <tr
                v-for="asset in assets"
                :key="`${asset.slug}`"
                class="flex items-center justify-between cursor-pointer hover:bg-gray-100"
                @click="openModal(asset)"
              >
                <td class="px-4 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap flex-1">
                  <div class="flex justify-start">
                    <img
                      class="w-12 h-12 rounded-full"
                      :src="asset.image"
                      alt=""
                    >
                    <span
                      class="px-2 w-18 py-4 whitespace-nowrap font-bold text-md lg:text-lg leading-5 text-gray-900 whitespace-no-wrap"
                    >
                      {{ asset.name }}
                      <span class="text-sm text-gray-400">
                        {{ asset.symbol.toUpperCase() }}
                      </span>
                    </span>
                  </div>
                </td>
                <td class="text-end px-6 py-4 font-bold text-md lg:text-lg leading-5 text-gray-900 whitespace-no-wrap">
                  {{
                      formatNumber(Number(asset.price) || 0)
                  }}</td>
              </tr>
              <AssetListObserver
                v-if="!disableInfiniteScroll"
                @more-data="pushAssets"
              />
            </tbody>
          </table>
          <Loading v-show="!disableInfiniteScroll" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import Pusher from 'pusher-js';
import Echo from 'laravel-echo';
import { Asset } from '@/types/Asset';
import { formatCurrency } from '@/utils/NumberUtils';
import AssetListObserver from '@/components/AssetsListObserver.vue'
import Loading from '@/components/global/LoadingSpin.vue'
import { ref, reactive } from 'vue';

const formatNumber = formatCurrency
const assets = reactive<Asset[]>([])
const disableInfiniteScroll = ref<boolean>(false)

const emit = defineEmits<{
  (e: 'openModal', asset: Asset): void
}>()

const options = {
  broadcaster: "pusher",
  key: import.meta.env.VITE_PUSH_KEY,
  cluster: "sa1"
};

const echo = new Echo({
  ...options,
  client: new Pusher(options.key, options)
});

const updateAssets = (asset: Asset) => {
  const index = assets.findIndex(item => item.slug === asset.slug)
  if (index >= 0) {
    assets[index].price = asset.price
  }
}


const openModal = (asset: Asset) => {
  emit('openModal', asset)
}

const pushAssets = (newAssets: Asset[]) => {
  assets.push(...newAssets)
  subscribeAssets(newAssets)
}

const subscribeAssets = (newAssets: Asset[]) => {
  newAssets.forEach(newAsset => {
    echo.channel("coingecko").listen(`.asset_event_${newAsset.slug}`, (data: { asset: Asset }) => { updateAssets(data.asset) })
  });
}

const refreshAssets = (newAssets: Asset[]) => {
  disableInfiniteScroll.value = true
  assets.splice(0, assets.length)
  pushAssets(newAssets)
}

defineExpose({ refreshAssets, disableInfiniteScroll })

</script>
