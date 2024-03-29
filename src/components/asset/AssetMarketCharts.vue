<template>
  <div>
    <AssetLineChart
      v-if="asset"
      :data="marketCap.prices"
      class="-mt-8 border-b md:border-b-0 border-gray-800 max-h-56"
      :title="translate.PRICE"
      :labels="dateInterval"
      :color="
        asset.price_change_percentage_24h < 0
          ? colors.decrease
          : colors.increase
      "
      :mode="mode"
    />
    <AssetLineChart
      v-if="asset"
      class="border-r md:border-r-0 border-b md:border-b-0 border-gray-800 pr-1 -mt-8 max-h-56"
      :data="marketCap.market_caps"
      :title="translate.MARKET_CAP"
      :labels="dateInterval"
      :color="
        asset.price_change_percentage_24h < 0
          ? colors.decrease
          : colors.increase
      "
      :mode="mode"
    />
    <AssetLineChart
      v-if="asset"
      class="col-span-2 h-56 -mt-8 max-h-56"
      :data="marketCap.total_volumes"
      :title="translate.TOTAL_VOLUME"
      :labels="dateInterval"
      :color="
        asset.price_change_percentage_24h < 0
          ? colors.decrease
          : colors.increase
      "
      :mode="mode"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { Asset } from '@/types/models/Asset'
import AssetLineChart from '@/components/common/LineChart.vue'
import { storeToRefs } from 'pinia'
import { useLocaleStore } from '@/store/locale'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import subDays from 'date-fns/subDays'
import { format } from 'date-fns'

type Mode = 'pc' | 'mobile'

const props = withDefaults(
  defineProps<{
    asset: Asset
    mode?: Mode
  }>(),
  {
    mode: 'pc',
  },
)

const localeStore = useLocaleStore()
const { locale, currency, translate } = storeToRefs(localeStore)

const dateInterval = eachDayOfInterval({
  start: subDays(new Date(), 90),
  end: new Date(),
}).map(day => format(day, locale.value.DATE_FORMAT.replace('/YYYY', '')))

const colors = {
  decrease: 'rgb(199, 61, 77)',
  increase: 'rgb(4, 116, 4)',
}

const completeMarketData = (values: Array<number>) => {
  if (values.length === 90) {
    return values
  }

  return [...Array.from({ length: 90 - values.length }, () => null), ...values]
}

const marketCap = computed(() => {
  return {
    prices: completeMarketData(
      props.asset.market_cap[currency.value.FIAT_NAME].market_90_days?.prices ||
        [],
    ),
    market_caps: completeMarketData(
      props.asset.market_cap[currency.value.FIAT_NAME].market_90_days
        ?.market_caps || [],
    ),
    total_volumes: completeMarketData(
      props.asset.market_cap[currency.value.FIAT_NAME].market_90_days
        ?.total_volumes || [],
    ),
  }
})
</script>
