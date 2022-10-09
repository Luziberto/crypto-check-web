<template>
  <div>
    <AssetsTable :assets="assets" ref="assetTable"/>
  </div>
</template>

<script lang="ts">

  import Pusher from 'pusher-js';
  import Echo from 'laravel-echo';
  import { defineComponent } from 'vue';
  
  import AssetDataService from '@/services/AssetDataService';
  import { Asset } from '@/types/Asset';
  import AssetsTable from '@/components/AssetsTable.vue';
  
  export default defineComponent({
    components: { AssetsTable },
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
        newAsset: {} as Asset,
        assets: [] as Asset[],
        assetsForShow: ["bitcoin", "ethereum", "cosmos hub", "terra", "dacxi", "dogecoin"]
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
      getAssets(assets: Array<String>) {
        const data = {
            assets: assets
        }
        AssetDataService.searchAssets(data).then((response) => {
            this.assets = response.data;
        });
      },
      updateAsset(asset: Asset) {
        const index = this.assets.findIndex(item => item.slug === asset.slug)
        if (index) {
          this.assets[index].price = asset.price
        }
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