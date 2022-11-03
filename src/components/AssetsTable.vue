<template>
  <div class="flex flex-col">
    <div class="grid grid-flow-row -my-2 overflow-x-auto auto-rows-max">
      <div class="overflow-hidden border-b border-gray-200 shadow lg:rounded-lg">
        <table class="hidden md:block min-w-full divide-y divide-gray-200">
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

        <div
          v-for="asset in assets"
          :key="`${asset.slug}`"
          class="mt-2 overflow-hidden divide-y divide-gray-200 shadow lg:hidden"
          @click="openModal(asset)"
        >
          <div class="flex flex-col text-left">
            <a
              href="#"
              class="block px-4 py-4 bg-white hover:bg-gray-50"
            >
              <span class="flex space-x-4">
                <span class="flex flex-1 space-x-2 truncate">
                  <img
                    class="w-12 h-12 rounded-full"
                    :src="asset.image"
                    alt=""
                  >
                  <span class="flex flex-col text-md text-gray-500 truncate">
                    <span class="truncate"><i class="fas fa-user"></i>&nbsp;&nbsp;{{ asset.name }}
                      <span class="text-gray-400">
                        {{ asset.symbol.toUpperCase() }}
                      </span>
                    </span>
                  </span>
                </span>
                <svg
                  class="flex-shrink-0 w-5 h-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              <div class="pt-2">
                <span class="text-left font-bold text-md lg:text-lg leading-5 text-gray-900 whitespace-no-wrap">
                  {{ formatNumber(Number(asset.price) || 0) }}
                </span>
              </div>
            </a>
          </div>
        </div>
        <AssetListObserver
          v-if="!disableInfiniteScroll"
          @more-data="pushAssets"
        />
        <Loading v-show="!disableInfiniteScroll" />
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
