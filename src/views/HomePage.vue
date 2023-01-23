<template>
  <div class="flex flex-col">
    <Alert ref="alert" />
    <div class="fixed right-1 md:left-10 -top-3">
      <DarkMode />
    </div>
    <div class="flex flex-col lg:flex-row justify-between">
      <div class="hidden lg:block w-1/3">
        <!-- <DarkMode /> -->
      </div>
      <div class="flex lg:flex-col justify-center flex-items-center">

        <div class="flex justify-center flex-items-center pt-3 lg:pt-0">
          <a href="https://matias.ma/nsfw">
            <CoinSvg :width="32" />
          </a>
          <h1 class="flex-1 font-bold text-xl">{{ translate.TITLE }}</h1>
        </div>
        <div class="lg:hidden block lg:w-1/3"></div>
        <LocaleButton
          :width="20"
          class="hidden lg:block"
        />
      </div>

      <div class="flex overflow-clip lg:w-1/3 justify-center lg:justify-end items-center pb-3 m-2">
        <div class="pb-2">
          <label
            for="search"
            class="text-left font-bold text-sm lg:text-md"
          >{{ translate.SEARCH }}</label>
          <input
            v-model="search"
            name="search"
            type="text"
            autocomplete="off"
            class="block w-full py-1 pl-2 pr-10 mt-1 text-sm bg-gray-300 font-bold placeholder-gray-400 transition duration-150 ease-in-ou border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-black focus:border-b border-whitelack ring-2"
            @keyup="searchAssets"
          />

        </div>
        <div class="lg:hidden flex flex-col w-1/3">
          <LocaleButton :width="20" />
        </div>
      </div>
    </div>
    <AssetsTable
      ref="assetTable"
      @open-modal="openModal"
    />
    <AssetDialog
      v-if="dialog"
      :selected-asset="selectedAsset"
      @close="dialog = false"
      @error="error"
    />
  </div>
</template>

<script lang="ts" setup>

import { ref, computed, onMounted } from "vue"
import { Asset } from "@/types/models/Asset"
import AssetsTable from "@/components/asset/AssetsTable.vue"
import AssetDialog from "@/components/asset/AssetDialog.vue"
import DarkMode from "@/components/common/DarkMode.vue"
import { ALERT_TYPES } from "@/constants/AlertConstants"
import Alert from "@/components/common/AlertPopup.vue"
import LocaleButton from "@/components/common/LocaleButton.vue"
import { useLocaleStore } from "@/store/locale"
import { storeToRefs } from "pinia"
import { search as assetSearch } from "@/services/asset"
import { AxiosError } from "axios"
import CoinSvg from "@/components/common/Icons/CoinSvg.vue"

const localeStore = useLocaleStore()
const { translate } = storeToRefs(localeStore)

const selectedAsset = ref<Asset>({
  uuid: "",
  name: "",
  slug: "",
  symbol: "",
  price_brl: "0",
  price_usd: "0",
  image: ""
} as Asset)

const dialog = ref<boolean>(false)
const search = ref<string>("")
const assetTable = ref<InstanceType<typeof AssetsTable> | null>(null)
const alert = ref<InstanceType<typeof Alert> | null>(null)

computed(() => {
  return search.value
})


const searchAssets = async () => {
  if (search.value.length === 0) {
    assetTable.value?.refreshAssets([], true)
    return
  }
  try {
    const assets = await assetSearch({ search: search.value })
    assetTable.value?.refreshAssets(assets.data, false)
  } catch (error) {
    const err = error as AxiosError
    const message = Object.values(err.response?.data ?? {}).flat()
    alert.value?.show(message, ALERT_TYPES.ERROR)
  }
}

const openModal = (asset: Asset) => {
  selectedAsset.value = asset
  dialog.value = true
}

const error = (errors: unknown[]) => {
  alert.value?.show(errors.map(String), ALERT_TYPES.ERROR)
}

onMounted(() => {

  searchAssets()
})

</script>

<style scoped>
.main-container {
  height: 650px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
