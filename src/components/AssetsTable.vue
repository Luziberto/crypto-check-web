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
              <td
                class="flex flex-col text-start px-6 py-4 font-bold text-md lg:text-lg leading-5 text-gray-900 whitespace-no-wrap"
              >
                <span class="text-sm text-gray-400">24h</span>
                <span
                  :class="`text-md ${asset.price_change_percentage_24h > 0 ? COLOR_TEXT_CLASS.SUCCESS : COLOR_TEXT_CLASS.ERROR}`"
                >{{ Math.abs(asset.price_change_percentage_24h) }}%</span>
              </td>
              <td
                class="flex flex-col text-end px-6 py-4 font-bold text-md lg:text-lg leading-5 text-gray-900 whitespace-no-wrap"
              >
                <span class="text-sm text-gray-400">{{ translate.CURRENT_PRICE }}</span>
                <span class="w-40">{{ formatNumber(Number(asset[('price_' + currency.FIAT_NAME.toLocaleLowerCase()) as
                    keyof Asset]) || 0, currency)
                }}</span>
              </td>
            </tr>
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
                <img
                  class="w-12 h-12 rounded-full"
                  :src="asset.image"
                  alt=""
                >
                <span class="flex flex-1 space-x-2 truncate">
                  <span class="flex flex-col text-md text-gray-500 truncate">
                    <span class="flex flex-col truncate">
                      {{ asset.name }}
                      <span class="text-sm text-gray-400">
                        {{ asset.symbol.toUpperCase() }}
                      </span>
                    </span>
                  </span>
                </span>
                <RightArrowSvg :width="12" />
              </span>
              <div class="flex justify-between pt-2">
                <span class="flex flex-col text-left font-bold text- leading-5 text-gray-900 whitespace-no-wrap">
                  <span class="text-sm text-gray-400">{{ translate.CURRENT_PRICE }}</span>
                  {{ formatNumber(Number(asset[('price_' + currency.FIAT_NAME.toLocaleLowerCase()) as keyof Asset]) ||
                      0, currency)
                  }}
                </span>
                <span class="flex flex-col text-left font-bold leading-5 text-gray-900 whitespace-no-wrap">
                  <span class="text-sm text-gray-400">24h</span>
                  <span
                    :class="`text-md ${asset.price_change_percentage_24h > 0 ? COLOR_TEXT_CLASS.SUCCESS : COLOR_TEXT_CLASS.ERROR}`"
                  >{{ Math.abs(asset.price_change_percentage_24h) }}%</span>
                </span>
              </div>
            </a>
          </div>
        </div>
        <Loading v-show="activeInfiniteScroll" />
        <AssetListObserver
          v-if="activeInfiniteScroll"
          @more-data="pushAssets"
          @finish-data="activeInfiniteScroll = false"
        />
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>

import Pusher from "pusher-js"
import Echo from "laravel-echo"
import { Asset } from "@/types/Asset"
import { formatCurrency } from "@/utils/NumberUtils"
import AssetListObserver from "@/components/AssetsListObserver.vue"
import Loading from "@/components/global/LoadingSpin.vue"
import RightArrowSvg from "@/assets/svg/RightArrowSvg.vue"
import { ref, reactive, onMounted } from "vue"
import { COLOR_TEXT_CLASS } from "@/constants/ColorConstants"
import { useLocaleStore } from "@/store/locale"
import { storeToRefs } from "pinia"

const formatNumber = formatCurrency
const assets = reactive<Asset[]>([])
const activeInfiniteScroll = ref<boolean>(true)

const localeStore = useLocaleStore()
const { currency, translate } = storeToRefs(localeStore)

const emit = defineEmits<{
  (e: "openModal", asset: Asset): void
}>()

const options = {
  broadcaster: "pusher",
  key: import.meta.env.VITE_PUSH_KEY,
  cluster: "sa1"
}

const echo = new Echo({
  ...options,
  client: new Pusher(options.key, options)
})

const updateAssets = (asset: Asset) => {
  const index = assets.findIndex(item => item.slug === asset.slug)
  if (index >= 0) {
    assets[index].price_brl = asset.price_brl
    assets[index].price_usd = asset.price_usd
  }
}


const openModal = (asset: Asset) => {
  emit("openModal", asset)
}

const pushAssets = (newAssets: Asset[]) => {
  assets.push(...newAssets)
}

const refreshAssets = (newAssets: Asset[], infiniteScrollState: boolean) => {
  assets.splice(0, assets.length)
  activeInfiniteScroll.value = infiniteScrollState
  pushAssets(newAssets)
}

onMounted(() => {
  echo.channel("coingecko").listen(".asset_price_update", (data: { asset: Asset }) => { updateAssets(data.asset) })
})

defineExpose({ refreshAssets })

</script>
