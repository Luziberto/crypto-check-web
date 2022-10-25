<template>
  <div>
    <AlertPopup ref="alert"/>
    <ObserverComponent v-show="!loading" :options="options" @intersect="getData"/>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import AssetDataService from '@/services/AssetDataService';
import ObserverComponent from '@/components/ObserverComponent.vue';
import { Asset } from '@/types/Asset';
import { ALERT_TYPES } from '@/constants/AlertConstants';

interface Options { page: number, itemsPerPage: number }

const loading = ref(true)
const options = reactive<Options>({ page: 1, itemsPerPage: 50 })
const alert = ref(null as any)

const getData = () : void => {
  AssetDataService.getAllAssets(options.page, options.itemsPerPage).then((response) => {
    const responseData = response.data
    if (!responseData.length) {
      loading.value = false
    }
    emit('moreData', responseData)
    options.page++
    options.itemsPerPage++
  }).catch((e) => {
    let message = [e.message]
    if (e.response) {
      message = Object.values(e.response.data).flat()
    }
    alert.value.show(message, ALERT_TYPES.error)
  })
  .finally(() => {
    loading.value = false
  })
}

const emit = defineEmits<{
  (e: 'moreData', assets: Asset[] ): void
}>()

onMounted(() => {
  getData()
})

</script>
