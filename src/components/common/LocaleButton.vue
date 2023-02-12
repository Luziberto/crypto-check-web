<template>
  <div class="flex justify-center w-full text-center" role="group">
    <button
      type="button"
      :class="`${
        locale.CODE === PT_BR ? 'bg-gray-600' : 'bg-gray-100'
      } py-1 px-2 text-sm font-medium text-gray-900 rounded-l border border-gray-200`"
      @click="changeLocale(PT_BR_LOCALE)"
    >
      <img
        src="/pt_br.svg"
        alt="English"
        :width="width"
        class="rounded-sm"
      />
    </button><button
      type="button"
      :class="`${
        locale.CODE === EN_US ? 'bg-gray-600' : 'bg-gray-100'
      } py-1 px-2 text-sm font-medium text-gray-900  rounded-r border-l-0 border border-gray-200`"
      @click="changeLocale(EN_US_LOCALE)"
    >
      <img
        src="/en_us.svg"
        alt="Português do Brasil"
        :width="width"
        class="rounded-sm"
      />
    </button>
  </div>
</template>

<script lang="ts" setup>
import {
  PT_BR_LOCALE,
  EN_US_LOCALE,
  PT_BR,
  EN_US,
  Locale,
} from '@/constants/LocaleConstants'
import { useLocaleStore } from '@/store/locale'
import { storeToRefs } from 'pinia'

const localeStore = useLocaleStore()
const { locale } = storeToRefs(localeStore)

defineProps<{
  width: number
}>()

const changeLocale = (locale: Locale) => {
  localeStore.changeLocale(locale)
  console.log(locale)
}
</script>
