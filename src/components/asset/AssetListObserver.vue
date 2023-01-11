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
import { ref, reactive } from "vue"
import ObserverComponent from "@/components/common/ObserverComponent.vue"
import Alert from "@/components/common/AlertPopup.vue"
import { Asset } from "@/types/models/Asset"
import { ALERT_TYPES } from "@/constants/AlertConstants"
import { ASSET_CONFIG } from "@/constants/AssetConstants"
import AssetJson from "@/assets/assets.json"
import { list as assetList } from "@/services/asset"
import { AxiosError } from "axios"

interface Options { page: number, itemsPerPage: number }

const options = reactive<Options>({ page: 1, itemsPerPage: ASSET_CONFIG.ITEMS_PER_PAGE })
const alert = ref<InstanceType<typeof Alert> | null>(null)

const getData = (): void => {
  const start = (options.page - 1) * options.itemsPerPage
  const end = options.page * options.itemsPerPage
  const assetsSlug = AssetJson.sort((a, b) => a.localeCompare(b))
  const items = assetsSlug.slice(start, end)

  if (!items.length) {
    emit("finishData")
    return
  }

  getAssets(items)
}

const getAssets = async (items: Array<string>) => {
  try {
    const assets = await assetList({ assets: items })
    emit("moreData", assets.data)
    options.page++
    options.itemsPerPage++
  } catch (error) {
    const err = error as AxiosError
    // let message = [err.message]
    const message = Object.values(err.response?.data ?? {}).flat()
    alert.value?.show(message, ALERT_TYPES.ERROR)
  }
}

const emit = defineEmits<{
  (e: "moreData", assets: Asset[]): void
  (e: "finishData"): void
}>()

</script>
