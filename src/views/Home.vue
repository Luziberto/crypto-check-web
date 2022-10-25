<template>
  <div class="flex flex-col">
    <AssetsTable ref="assetTable" @open-modal="openModal"/>
    <CryptoDialog v-if="dialog" :assets="assets" :selected-asset="selectedAsset" @close="dialog = false" />
  </div>
</template>

<script lang="ts" setup>

import Pusher from 'pusher-js';
import Echo from 'laravel-echo';
import { ref } from 'vue';
import { Asset } from '@/types/Asset';
// import { ASSET_SLUG } from '@/constants/AssetsConstants';
import AssetsTable from '@/components/AssetsTable.vue';
import CryptoDialog from '@/components/CryptoDialog.vue';

  const assets = ref([] as Asset[])
  const selectedAsset = ref({} as Asset)
  const dialog = ref(false as boolean)


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

  const updateAsset = (asset: Asset) => {
    const index = assets.value.findIndex(item => item.slug === asset.slug)
    if (index >= 0) {
      assets.value[index].price = asset.price
    }
  }

  const openModal = (asset: Asset) => {
    selectedAsset.value = asset
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
  echo.channel("coingecko").listen(".asset_event", (data: any) => { updateAsset(data.asset) })

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
