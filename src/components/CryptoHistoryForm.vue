<template>
  <div class="flex col-span-1 col-start-3 mb-4">
    <div class="flex flex-col">
      <label for="asset" class="font-bold text-left">Coin</label>
      <select name="asset" v-model="assetSelected" class="block w-full py-2 pl-2 pr-10 mt-1 text-sm font-bold placeholder-gray-400 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-green-500 focus:border-green-500 ring-2">
        <option value="">Select coin</option>
        <option v-for="asset in assets" :value="asset.uuid" :key="asset.uuid">{{asset.name}}</option>
      </select>
    </div>
    <div class="flex flex-col ml-4">
      <label for="date" class="font-bold text-left">Date</label>
      <input name="date" v-model="date" type="date" class="block w-full py-2 pl-2 pr-10 mt-1 text-sm font-bold placeholder-gray-400 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-green-500 focus:border-green-500 ring-2"/>
    </div>
    <button @click="getAssetHistory()" class="h-10 bg-green-600 border rounded-md px-2 -py-2 ml-4 mt-auto font-bold text-white">Search</button>
  </div>
</template>

<script lang="ts">
import AssetDataService from '@/services/AssetDataService';
import { Asset } from '@/types/Asset';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'AssetsTable',
  props: {
    assets: {
      required: true,
      type: Array as PropType<Asset[]>
    }
  },
  data () {
    return {
      assetSelected: '' as string,
      date: new Date() as Date
    }
  },
  methods: {
    getAssetHistory() {
        AssetDataService.getAssetHistory(this.assetSelected, this.date).then((response) => {
            console.log(response)
        });
      },
  }
})
</script>