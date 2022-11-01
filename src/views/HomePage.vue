<template>
  <div class="flex flex-col">
    <Alert ref="alert" />
    <div class="flex justify-end md:grid md:grid-cols-12">
      <div class="flex md:col-start-11 md:col-end-13 m-2 justify-end">
        <div class="text-left pb-2">
          <label
            for="search"
            class="font-bold"
          >Busca </label>
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

import { ref, computed } from 'vue';
import { Asset } from '@/types/Asset';
import AssetsTable from '@/components/AssetsTable.vue';
import CryptoDialog from '@/components/CryptoDialog.vue';
import { ALERT_TYPES } from '@/constants/AlertConstants';
import AssetDataService from '@/services/AssetDataService';
import Alert from '@/components/global/AlertPopup.vue';

const selectedAsset = ref<Asset>({
  uuid: '',
  name: '',
  slug: '',
  symbol: '',
  price: 0,
  image: ''
} as Asset)

const dialog = ref<boolean>(false)
const search = ref<string>('')
const assetTable = ref<InstanceType<typeof AssetsTable> | null>(null)
const alert = ref<InstanceType<typeof Alert> | null>(null)

computed(() => {
  return search.value
})

const searchAssets = () => {

  if (search.value.length < 3) {
    return
  }

  AssetDataService.searchAssets({ search: search.value }).then((response) => {
    assetTable.value?.refreshAssets(response.data)
  }).catch((e) => {
    alert.value?.show(e.response.data, ALERT_TYPES.error)
  });
}

const openModal = (asset: Asset) => {
  selectedAsset.value = asset
  dialog.value = true
}

const error = (errors: unknown[]) => {
  alert.value?.show(errors.map(String), ALERT_TYPES.error)
}


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
