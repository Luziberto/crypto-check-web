<template>
  <div class="flex col-span-1 col-start-3 mb-4">
    <Alert ref="Alert"/>
    <div class="flex flex-col ml-4">
      <!-- <label for="date" class="font-bold text-left">Date</label> -->
      <input v-model="date" name="date" type="date" class="block w-full py-2 pl-2 pr-10 mt-1 text-sm font-bold placeholder-gray-400 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-green-500 focus:border-green-500 ring-2"/>
    </div>
    <button class="h-10 bg-green-600 border rounded-md px-2 -py-2 ml-4 mt-auto font-bold text-white hover:bg-green-500" @click="getAssetHistory()">Search</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, PropType } from 'vue'
import AssetDataService from '@/services/AssetDataService';
import { Asset } from '@/types/Asset';
import { ALERT_TYPES } from '@/constants/AlertConstants';
import { AssetHistory } from '@/types/AssetHistory';

const props = defineProps({
  asset: {
    required: true,
    type: Object as PropType<Asset>
  }
})

const emit = defineEmits<{
  (e: 'assetHistory', response: AssetHistory ): void
}>()

const date  = ref<Date>(new Date());
// const messages  = ref<Array<string>>([]);
const alert = ref() as any;

const getAssetHistory = () => {
  AssetDataService.getAssetHistory(props.asset.uuid, date.value).then((response) => {
    emit('assetHistory', response.data)
  }).catch((e) => {
    alert.show(e.response.data, ALERT_TYPES.error);
  });
}
</script>
