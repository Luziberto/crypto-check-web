<template>
  <div class="flex flex-col">
    <AssetsTable ref="assetTable" :assets="assets" @open-modal="openModal"/>
    <CryptoDialog v-if="dialog" :assets="assets" :selected-asset="selectedAsset" @close="dialog = false" />
  </div>
</template>

<script lang="ts">

  import Pusher from 'pusher-js';
  import Echo from 'laravel-echo';
  import { defineComponent } from 'vue';

  import AssetDataService from '@/services/AssetDataService';
  import { Asset } from '@/types/Asset';
  import AssetsTable from '@/components/AssetsTable.vue';
  import CryptoDialog from '@/components/CryptoDialog.vue';

  export default defineComponent({
    name: 'HomePage',
    components: { AssetsTable, CryptoDialog },
    setup() {
        const options = {
            broadcaster: "pusher",
            key: "9bab1a855983775a621a",
            cluster: "sa1"
        };
        const echo = new Echo({
            ...options,
            client: new Pusher(options.key, options)
        });
        return {
            echo
        };
    },
    data () {
      return {
        assets: [] as Asset[],
        assetsForShow: ["bitcoin", "cosmos hub", "dacxi", "dogecoin"],
        selectedAsset: {} as Asset,
        dialog: false as boolean
      }
    },
    mounted() {
        this.getAssets(this.assetsForShow)
        this.echo.channel("coingecko")
            .listen(".asset_event", (data: any) => {
            this.updateAsset(data.asset)
        });
    },
    methods: {
      getAssets(assets: Array<string>) {
        const data = {
            assets: assets
        }
        AssetDataService.getAssets(data).then((response) => {
            this.assets = response.data;
        });
      },
      updateAsset(asset: Asset) {
        const index = this.assets.findIndex(item => item.slug === asset.slug)
        if (index >= 0) {
          this.assets[index].price = asset.price
        }
      },
      openModal(asset: Asset) {
        this.selectedAsset = asset
        this.dialog = true
      }
    }
});

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
