<template>
  <div>
    <Alert ref="alert" />
    <ObserverComponent
      v-show="!loading"
      :options="options"
      @intersect="getData"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import AssetDataService from '@/services/AssetDataService';
import ObserverComponent from '@/components/ObserverComponent.vue';
import Alert from '@/components/global/AlertPopup.vue';
import { Asset } from '@/types/Asset';
import { ALERT_TYPES } from '@/constants/AlertConstants';
import AssetJson from '@/assets/assets.json'
import { GetAssetsRequestData } from '@/types/Asset/RequestData';

interface Options { page: number, itemsPerPage: number }

const loading = ref<boolean>(true)
const options = reactive<Options>({ page: 1, itemsPerPage: 10 })
const alert = ref<InstanceType<typeof Alert> | null>(null)

const getData = (): void => {
  const start = (options.page - 1) * options.itemsPerPage
  const end = options.page * options.itemsPerPage
  const assetsSlug = AssetJson.sort((a, b) => a.localeCompare(b))
  const items = assetsSlug.slice(start, end)

  if (!items.length) {
    return
  }

  const body: GetAssetsRequestData = {
    assets: items
  }

  AssetDataService.getAssets(body).then((response) => {
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
    alert.value?.show(message, ALERT_TYPES.error)
  })
    .finally(() => {
      loading.value = false
    })
}

const emit = defineEmits<{
  (e: 'moreData', assets: Asset[]): void
}>()

onMounted(() => {
  getData()
})

</script>
