<template>
  <div>
    <Alert ref="alert" />
    <ObserverComponent
      ref="observer"
      @intersect="getAssets"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, inject, watch, Ref, onMounted } from "vue"
import ObserverComponent from "@/components/common/ObserverComponent.vue"
import Alert from "@/components/common/AlertPopup.vue"
import { Asset } from "@/types/models/Asset"
import { ALERT_TYPES } from "@/constants/AlertConstants"
import { list as assetList } from "@/services/asset"
import { getTableScreenProps } from "@/utils/ScreenUtils"
import { AxiosError } from "axios"

const emit = defineEmits<{
  (e: "moreData", assets: Asset[], lastPage: boolean): void
  (e: "finishData"): void
}>()

const search = inject<Ref<string>>('search', ref<string>(''))
const alert = ref<InstanceType<typeof Alert> | null>(null)
let lastPage = false

const screen = getTableScreenProps()
const paginateOptions = ({ page: 1, perPage: screen.itemsPerPage, totalItems: 0, lastPage: 0 })

const observer = ref<InstanceType<typeof ObserverComponent> | null>(null)

const getAssets = async (isOverViewport = true) => {
  if (!isOverViewport || (paginateOptions.page !== 1 && lastPage)) return
  try {
    const response = await assetList({ search: search.value, page: paginateOptions.page, perPage: paginateOptions.perPage })
    paginateOptions.totalItems = response.data.total
    if (response.data.current_page === response.data.last_page) lastPage = true
    paginateOptions.lastPage = response.data.last_page
    emit("moreData", response.data.data, lastPage)
    paginateOptions.page++
  } catch (error) {
    const err = error as AxiosError
    // let message = [err.message]
    const message = Object.values(err.response?.data ?? {}).flat()
    alert.value?.show(message, ALERT_TYPES.ERROR)
  }
}

onMounted(() => {
  getAssets()
})

let searchtimer = 0

watch(() => search.value, () => {
  paginateOptions.page = 1
  paginateOptions.totalItems = 0
  paginateOptions.lastPage = 0

  clearTimeout(searchtimer);
  searchtimer = setTimeout(() => {
    getAssets()
  }, 1000);

}, { deep: true })

</script>
