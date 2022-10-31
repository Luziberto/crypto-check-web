<template>
  <div class="flex flex-col">
    <AlertPopup ref="alert" />
    <div class="grid grid-cols-12">
      <div class="flex col-start-11 col-end-13 m-2 justify-end">
        <div class="text-left pb-2">
          <label for="search" class="font-bold">Busca </label>
          <input v-model="search" @keyup="searchAssets" name="search" type="text" class="block w-full py-1 pl-2 pr-10 mt-1 text-sm font-bold placeholder-gray-400 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-green-500 focus:border-green-500 ring-2"/>
        </div>
      </div>
    </div>

    <AssetsTable ref="assetTable" @open-modal="openModal"/>
    <CryptoDialog v-if="dialog" :assets="assets" :selected-asset="selectedAsset" @close="dialog = false" />
  </div>
</template>

<script lang="ts" setup>

import Pusher from 'pusher-js';
import Echo from 'laravel-echo';
import { reactive, ref, computed } from 'vue';
import { Asset } from '@/types/Asset';
// import { ASSET_SLUG } from '@/constants/AssetsConstants';
import AssetsTable from '@/components/AssetsTable.vue';
import CryptoDialog from '@/components/CryptoDialog.vue';
import { ALERT_TYPES } from '@/constants/AlertConstants';
import AssetDataService from '@/services/AssetDataService';

const assets = ref([] as Asset[])
let selectedAsset = reactive({} as Asset)
const dialog = ref(false as boolean)
const search = ref<string>('');
const assetTable = ref() as any;
const alert = ref() as any;

const changeNameAsset = computed(() => {
  return search.value
})

const searchAssets = () => {

  if (search.value.length < 3) {
    return
  }

  AssetDataService.searchAssets({ search: search.value }).then((response) => {
    assetTable.value.refreshAssets(response.data, search.value)
  }).catch((e) => {
    alert.show(e.response.data, ALERT_TYPES.error)
  });
}

  // const assetsForShow = [
  //   ASSET_SLUG.BITCOIN,
  //   ASSET_SLUG.ETHEREUM,
  //   ASSET_SLUG.COSMOS_HUB,
  //   ASSET_SLUG.TERRA,
  //   ASSET_SLUG.DACXI,
  //   ASSET_SLUG.DOGECOIN
  // ] as Array<string>

  const options = {
      broadcaster: "pusher",
      key: "9bab1a855983775a621a",
      cluster: "sa1"
  };
  const echo = new Echo({
      ...options,
      client: new Pusher(options.key, options)
  });

  const updateAssets = (asset: Asset) => {
    const index = assets.value.findIndex(item => item.slug === asset.slug)
    if (index >= 0) {
      assets.value[index].price = asset.price
    }
  }

  const openModal = (asset: Asset) => {
    selectedAsset = asset
    dialog.value = true
  }


  // const getAssets = (assetsForShow: Array<string>) => {
  //   const data = {
  //     assets: assetsForShow
  //   }

    // AssetDataService.getAssets(data).then((response) => {
    // AssetDataService.getAllAssets().then((response) => {
    //     assets.value = response.data;
    //     alert.value.show([ALERT_MESSAGES.success])
    // }).catch((e) => {
    //   let message = [e.message]
    //   if (e.response) {
    //     message = Object.values(e.response.data).flat()
    //   }
    //   alert.value.show(message, ALERT_TYPES.error)
    // })
  // }

  // getAssets(assetsForShow)
  echo.channel("coingecko").listen(".asset_event", (data: any) => { updateAssets(data.asset) })

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
