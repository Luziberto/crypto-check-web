<template>
  <div class="flex flex-col">
    <Alert ref="alert" />
    <nav class="fixed w-full flex flex-col md:flex-row justify-between border-b-2 border-gray-300 z-10">
      <div class="absolute right-2 md:left-10 -top-3">
        <DarkMode />
      </div>
      <div class="hidden md:block w-1/3">
        <!-- <DarkMode /> -->
      </div>
      <div class="flex md:flex-col justify-around md:justify-center flex-items-center">
        <div class="flex flex-items-center pt-3 md:pt-0">
          <a href="https://matias.ma/nsfw">
            <CoinSvg :width="32" />
          </a>
          <h1 class="flex-1 font-bold text-xl">{{ translate.TITLE }}</h1>
        </div>
        <div class="md:hidden block md:w-1/3" />
        <LocaleButton
          :width="20"
          class="hidden md:block"
        />
      </div>

      <div class="flex overflow-clip md:w-1/3 justify-around md:justify-end items-center m-2">
        <div class="">
          <label
            for="search"
            class="text-left font-bold text-sm md:text-md"
          >{{ translate.SEARCH }}</label>
          <input
            v-model="search"
            name="search"
            type="text"
            autocomplete="off"
            class="block w-full py-1 pl-2 pr-10 mt-1 text-sm bg-gray-300 font-bold placeholder-gray-400 transition duration-150 ease-in-ou border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-black focus:border-b border-whitelack ring-2"
          />
        </div>
        <div class="md:hidden mt-auto pb-1">
          <LocaleButton :width="20" />
        </div>
      </div>
    </nav>
    <AssetsTable
      ref="assetTable"
      class="mt-28 md:mt-16 pt-1"
      @open-modal="openModal"
    />
    <AssetDialog
      v-if="dialog"
      :selected-asset="selectedAsset"
      @close="dialog = false"
      @error="error"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, provide, readonly } from 'vue'
import { Asset } from '@/types/models/Asset'
import AssetsTable from '@/components/asset/AssetsTable.vue'
import AssetDialog from '@/components/asset/AssetDialog.vue'
import DarkMode from '@/components/common/DarkMode.vue'
import { ALERT_TYPES } from '@/constants/AlertConstants'
import Alert from '@/components/common/AlertPopup.vue'
import LocaleButton from '@/components/common/LocaleButton.vue'
import { useLocaleStore } from '@/store/locale'
import { storeToRefs } from 'pinia'
import CoinSvg from '@/components/common/Icons/CoinSvg.vue'

const localeStore = useLocaleStore()
const { translate } = storeToRefs(localeStore)

const selectedAsset = ref<Asset>()
const dialog = ref<boolean>(false)
const search = ref<string>('')
const assetTable = ref<InstanceType<typeof AssetsTable> | null>(null)
const alert = ref<InstanceType<typeof Alert> | null>(null)

provide('search', readonly(search))

const openModal = (asset: Asset) => {
  selectedAsset.value = asset
  dialog.value = true
}

const error = (errors: unknown[]) => {
  alert.value?.show(errors.map(String), ALERT_TYPES.ERROR)
}
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
