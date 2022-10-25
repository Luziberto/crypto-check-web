<template>
  <div class="flex flex-col">
    <div class="grid grid-flow-row -my-2 overflow-x-auto auto-rows-max">
      <div class="overflow-hidden border-b border-gray-200 shadow lg:rounded-lg">
        <div>
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="min-w-full divide-y divide-gray-200">
            </thead>
            <tbody class="bg-white divide-y divide-gray-200 grid lg:grid-cols-2">
              <tr v-for="asset in assets" :key="`${asset.slug}`" class="flex items-center justify-between cursor-pointer hover:bg-gray-100" @click="openModal(asset)">
                <td class="px-4 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap flex-1">
                  <div class="flex justify-start">
                    <img class="w-12 h-12 rounded-full" :src="asset.image" alt="">
                    <span class="px-2 w-18 py-4 whitespace-nowrap font-bold text-md lg:text-lg leading-5 text-gray-900 whitespace-no-wrap">
                      {{asset.name}}
                      <span class="text-sm text-gray-400">
                        {{asset.symbol.toUpperCase()}}
                      </span>
                    </span>
                  </div>
                </td>
                <td class="text-end px-6 py-4 font-bold text-md lg:text-lg leading-5 text-gray-900 whitespace-no-wrap">{{
                  formatNumber(parseFloat((asset.price || 0).toString()))
                }}</td>
              </tr>
              <AssetListObserver @moreData="pushAssets" />
            </tbody>
          </table>
          <Loading/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Asset } from '@/types/Asset';
import { formatCurrency } from '@/utils/NumberUtils';
import AssetListObserver from '@/components/AssetsListObserver.vue'
import Loading from '@/components/Loading.vue'
import { reactive } from 'vue';

// const assetList = ref<Asset[]>([])
const formatNumber = formatCurrency
const assets = reactive<Asset[]>([])

const emit = defineEmits<{
  (e: 'openModal', asset: Asset ): void
}>()

const openModal = (asset: Asset) => {
  emit('openModal', asset)
}

const pushAssets = (newAssets: Asset[]) => {
  assets.push(...newAssets)
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
/* a {
  color: #42b983;
} */
</style>
