<template>
  <Transition name="dropdown">
    <div v-show="active" class="grid grid-cols-2">
      <ul>
        <li>price</li>
        <li>
          {{ latestAsset.market_cap[currency.FIAT_NAME].current_price }}
        </li>
      </ul>
      <div class="bg-red-300" />
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Asset } from '@/types/models/Asset'
import { storeToRefs } from 'pinia'
import { useLocaleStore } from '@/store/locale'
const localeStore = useLocaleStore()
const { currency } = storeToRefs(localeStore)

const active = ref(false)

const latestAsset = ref({
  uuid: '',
  name: '',
  slug: '',
  symbol: '',
  market_cap: {
    brl: {
      current_price: '',
      market_90_days: '',
    },
    usd: {
      current_price: '',
      market_90_days: '',
    },
  },
  price_change_percentage_24h: 0,
  image: '',
})

const toggle = (asset: Asset): Promise<void> => {
  return new Promise(resolve => {
    if (latestAsset.value.uuid && latestAsset.value.uuid !== asset.uuid) {
      active.value = !active.value
      setTimeout(() => {
        active.value = !active.value
        resolve()
      }, 300)
    } else {
      active.value = !active.value
      resolve()
    }
    latestAsset.value = asset
  })
}

defineExpose({
  toggle,
})
</script>

<style scoped>
.dropdown-enter-active {
  animation: dropdown 0.3s ease-in-out forwards;
}

/* .dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.5s ease;
} */

.dropdown-enter-from,
.dropdown-leave-to {
  animation: dropdown 0.3s ease-in-out forwards reverse;
}

@keyframes dropdown {
  0% {
    transform: scaleY(0);
  }

  100% {
    transform: scaleY(1);
  }
}
</style>
