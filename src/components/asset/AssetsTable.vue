<template>
  <div class="flex flex-col">
    <div class="grid grid-flow-row overflow-x-auto auto-rows-max">
      <div class="relative overflow-hidden border-b border-gray-200 shadow lg:rounded-lg">
        <table class="hidden md:block min-w-full divide-y divide-gray-200">
          <thead class="min-w-full">
          </thead>
          <tbody class="grid lg:grid-cols-2">
            <TransitionGroup name="list">
              <tr
                v-for="asset in assets"
                :key="`${asset.slug}`"
                class="flex items-center justify-between cursor-pointer hover:bg-late-300 border-b-2 border-gray-300"
                @click="openModal(asset)"
              >


                <td class="px-4 py-4 text-sm leading-5 whitespace-no-wrap flex-1 divide-y divide-gray-200">
                  <div class="flex justify-start">
                    <img
                      class="w-12 h-12 rounded-full"
                      :src="asset.image"
                      alt=""
                    >
                    <span
                      class="px-2 w-18 py-4 whitespace-nowrap font-bold text-md lg:text-lg leading-5 whitespace-no-wrap crypto-name"
                    >
                      {{ asset.name }}
                      <span class="text-sm text-gray-500">
                        {{ asset.symbol.toUpperCase() }}
                      </span>
                    </span>
                  </div>
                </td>
                <td
                  class="flex flex-col text-start px-6 py-4 font-bold text-md lg:text-lg leading-5 whitespace-no-wrap">
                  <span class="text-sm text-gray-400">24h</span>
                  <span
                    :class="`text-md ${asset.price_change_percentage_24h > 0 ? COLOR_TEXT_CLASS.SUCCESS : COLOR_TEXT_CLASS.ERROR}`"
                  >{{
                  (asset.price_change_percentage_24h > 0 ? '+' : '') + asset.price_change_percentage_24h }}%</span>
                </td>
                <td class="flex flex-col text-end px-6 py-4 font-bold text-md lg:text-lg leading-5 whitespace-no-wrap">
                  <span class="text-sm text-gray-400">{{ translate.CURRENT_PRICE }}</span>
                  <span class="w-40 md:w-48">{{
                    asset[('price_' + currency.FIAT_NAME.toLocaleLowerCase()) as
                      keyof Asset]
                  }}</span>
                </td>

              </tr>
            </TransitionGroup>
          </tbody>
        </table>

        <div
          v-show="!showLoading && !assets.length"
          class="fixed inset-0 flex items-center justify-center"
        >
          <h2 class="text-xl">{{ translate.NO_RESULTS }} :(</h2>
        </div>

        <TransitionGroup name="list">
          <div
            v-for="asset in assets"
            :key="`${asset.slug}`"
            class="overflow-hidden shadow lg:hidden border-y"
            @click="openModal(asset)"
          >
            <div class="flex flex-col text-left">
              <a
                href="#"
                class="block px-4 py-4 hover:bg-late-900"
              >
                <span class="flex space-x-4">
                  <img
                    class="w-12 h-12 rounded-full"
                    :src="asset.image"
                    alt=""
                  >
                  <span class="flex flex-1 space-x-2 truncate">
                    <span class="flex flex-col text-md truncate">
                      <span class="flex flex-col truncate">
                        {{ asset.name }}
                        <span class="text-sm text-gray-400">
                          {{ asset.symbol.toUpperCase() }}
                        </span>
                      </span>

                    </span>
                  </span>
                  <div class="flex justify-between w-1/2">
                    <div class="flex flex-col text-left font-bold text- leading-5 whitespace-no-wrap">
                      <span class="text-sm text-gray-400">{{ translate.CURRENT_PRICE }}</span>
                      <span class="break-all">{{
                    asset[('price_' + currency.FIAT_NAME.toLocaleLowerCase()) as keyof
                      Asset] }}</span>
                    </div>
                    <div class="flex px-2 flex-col text-left font-bold leading-5 whitespace-no-wrap">
                      <span class="text-sm text-gray-400">24h</span>
                      <span
                        :class="`text-md ${asset.price_change_percentage_24h > 0 ? COLOR_TEXT_CLASS.SUCCESS : COLOR_TEXT_CLASS.ERROR}`"
                      >{{ (asset.price_change_percentage_24h > 0 ? '+' : '') + asset.price_change_percentage_24h
                      }}%</span>
                    </div>
                  </div>
                </span>
              </a>
            </div>
          </div>
        </TransitionGroup>
        <Loading v-show="showLoading" />
        <AssetListObserver
          @more-data="push"
          @finish-data="(isLastPage) => showLoading = !isLastPage"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import Pusher from "pusher-js"
import Echo from "laravel-echo"
import { Asset } from "@/types/models/Asset"
import AssetListObserver from "@/components/asset/AssetListObserver.vue"
import Loading from "@/components/common/LoadingSpin.vue"
import { ref, reactive, inject, Ref, watch } from "vue"
import { COLOR_TEXT_CLASS } from "@/constants/ColorConstants"
import { useLocaleStore } from "@/store/locale"
import { storeToRefs } from "pinia"

const assets = reactive<Asset[]>([])

const localeStore = useLocaleStore()
const { currency, translate } = storeToRefs(localeStore)

const search = inject<Ref<string>>('search', ref<string>(''))
const showLoading = ref<boolean>(true)

const emit = defineEmits<{
  (e: "openModal", asset: Asset): void
}>()

const options = {
  broadcaster: "pusher",
  key: import.meta.env.VITE_PUSHER_KEY,
  cluster: "sa1",
  wsHost: import.meta.env.VITE_WEBSOCKET_WS_HOST,
  wsPort: Number(import.meta.env.VITE_WEBSOCKET_PORT),
  forceTLS: !import.meta.env.DEV,
  disableStats: true,
}

const echo = new Echo({
  ...options,
  client: new Pusher(options.key, options)
})

const update = (asset: Asset) => {
  const index = assets.findIndex(item => item.slug === asset.slug)
  if (index) {
    assets[index].price_brl = asset.price_brl
    assets[index].price_usd = asset.price_usd
    assets[index].price_change_percentage_24h = asset.price_change_percentage_24h
  }
}

const openModal = (asset: Asset) => {
  emit("openModal", asset)
}

const push = (newAssets: Asset[]) => {
  newAssets.forEach((asset, index) => {
    setTimeout(() => {
      assets.push(asset)
    }, 50 * (index + 1))
  })

  subscribe(newAssets)
}

watch(() => search, () => {
  clear()
}, { deep: true })

const clear = () => {
  unSubscribe(assets)
  assets.splice(0, assets.length)
}

const subscribe = (newAssets: Asset[]) => {
  newAssets.forEach(newAsset => {
    echo.channel(`coin.${newAsset.slug}`).listen(`.asset_price_update`, (data: { asset: Asset }) => { update(data.asset) })
  })
}

const unSubscribe = (newAssets: Asset[]) => {
  newAssets.forEach(newAsset => {
    echo.leave(`coin.${newAsset.slug}`)
  })
}
</script>

<style scoped>
.list-enter-active {
  animation: bounce;
  animation-duration: 2s;
  animation-fill-mode: both;
}

@keyframes bounce {
  0% {
    transform: translateY(100vh);
  }

  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-30px);
  }

  60% {
    transform: translateY(-15px);
  }
}
</style>