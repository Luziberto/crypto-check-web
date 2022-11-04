<template>
  <div>
    <Alert ref="alert" />
    <ObserverComponent
      :options="options"
      @intersect="getData"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import AssetDataService from '@/services/AssetDataService';
import ObserverComponent from '@/components/ObserverComponent.vue';
import Alert from '@/components/global/AlertPopup.vue';
import { Asset } from '@/types/Asset';
import { ALERT_TYPES } from '@/constants/AlertConstants';
import { ASSET_CONFIG } from '@/constants/AssetConstants';
import AssetJson from '@/assets/assets.json'
import { GetAssetsRequestData } from '@/types/Asset/RequestData';

interface Options { page: number, itemsPerPage: number }

const options = reactive<Options>({ page: 1, itemsPerPage: ASSET_CONFIG.ITEMS_PER_PAGE })
const alert = ref<InstanceType<typeof Alert> | null>(null)

const getData = (): void => {
  const start = (options.page - 1) * options.itemsPerPage
  const end = options.page * options.itemsPerPage
  const assetsSlug = AssetJson.sort((a, b) => a.localeCompare(b))
  const items = assetsSlug.slice(start, end)

  if (!items.length) {
    emit('finishData')
    return
  }

  const body: GetAssetsRequestData = {
    assets: items
  }

  AssetDataService.getAssets(body).then((response) => {
    const responseData = response.data
    emit('moreData', responseData)
    options.page++
    options.itemsPerPage++
  }).catch((e) => {
    let message = [e.message]
    if (e.response) {
      message = Object.values(e.response.data).flat()
    }
    alert.value?.show(message, ALERT_TYPES.ERROR)
  })
}

const emit = defineEmits<{
  (e: 'moreData', assets: Asset[]): void
  (e: 'finishData'): void
}>()

</script>
