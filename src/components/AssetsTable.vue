<template>
  <div class="flex flex-col">
    <div class="grid grid-flow-row -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 auto-rows-max">
      <div class="overflow-hidden border-b border-gray-200 shadow lg:rounded-lg">
        <div>
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="min-w-full divide-y divide-gray-200">
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr class="cursor-pointer hover:bg-gray-100" v-for="asset in assetList" :key="`${asset.slug}`">
                <td class="px-4 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                  <div class="flex lg:justify-center">
                    <div class="flex justify-start w-36">
                      <img class="w-12 h-12 rounded-full" :src="asset.image" alt="">
                      <span class="px-2 w-18 py-4 whitespace-nowrap font-bold text-md lg:text-lg leading-5 text-gray-900 whitespace-no-wrap">
                        {{asset.name}}
                        <span class="text-sm text-gray-400">
                          {{asset.symbol.toUpperCase()}}
                        </span>
                      </span>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 font-bold text-md lg:text-lg leading-5 text-gray-900 whitespace-no-wrap">{{
                  formatCurrency(round(asset.price))
                }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Asset } from '@/types/Asset';
import { NumberUtils } from '@/mixins/Utils';

export default defineComponent({
  name: 'AssetsTable',
  mixins: [NumberUtils],
  props: {
    assets: {
      required: true,
      type: Array as PropType<Asset[]>
    }
  },
  data () {
    return {
      assetList: [] as Asset[]
    }
  },
  mounted () {
    this.assetList = this.assets
  },
  watch: {
    assets (val) {
      this.assetList = val
    }
  }
});
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
