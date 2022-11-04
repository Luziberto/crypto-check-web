<template>
  <div class="flex flex-col">
    <Alert ref="alert" />
    <LocaleButton :width="20" />
    <div class="flex md:grid md:grid-cols-12">
      <div class="flex flex-1 md:col-start-11 md:col-end-13 m-2">
        <div class="text-left pb-2 w-full">
          <label
            for="search"
            class="font-bold"
          >{{ translate.SEARCH }}</label>
          <input
            v-model="search"
            name="search"
            type="text"
            class="block w-full py-1 pl-2 pr-10 mt-1 text-sm font-bold placeholder-gray-400 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-green-500 focus:border-green-500 ring-2"
            @keyup="searchAssets"
          />
        </div>
      </div>
    </div>

    <AssetsTable
      ref="assetTable"
      @open-modal="openModal"
    />
    <CryptoDialog
      v-if="dialog"
      :selected-asset="selectedAsset"
      @close="dialog = false"
      @error="error"
    />
  </div>
</template>

<script lang="ts" setup>

import { ref, computed, onMounted } from "vue"
import { Asset } from "@/types/Asset"
import AssetsTable from "@/components/AssetsTable.vue"
import CryptoDialog from "@/components/CryptoDialog.vue"
import { ALERT_TYPES } from "@/constants/AlertConstants"
import AssetDataService from "@/services/AssetDataService"
import Alert from "@/components/global/AlertPopup.vue"
import LocaleButton from "@/components/global/LocaleButton.vue"
import { PT_BR } from "@/constants/LocaleConstants"
import { useLocaleStore } from "@/store/locale"
import { storeToRefs } from "pinia"

const localeStore = useLocaleStore()
localeStore.changeLocale(PT_BR)
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

const searchAssets = () => {
  if (search.value.length === 0) {
    assetTable.value?.refreshAssets([], true)
    return
  }

  AssetDataService.searchAssets({ search: search.value }).then((response) => {
    assetTable.value?.refreshAssets(response.data, false)
  }).catch((e) => {
    alert.value?.show(e.response.data, ALERT_TYPES.ERROR)
  })
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
