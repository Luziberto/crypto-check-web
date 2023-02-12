import { defineStore } from 'pinia'
import {
  Currency,
  Translate,
  getCurrency,
  getTranslate,
  PT_BR_LOCALE,
  PT_BR_CURRENCY,
  PT_BR_TRANSLATE,
  Locale,
} from '@/constants/LocaleConstants'

interface State {
  currency: Currency
  locale: Locale
  translate: Translate
}

export const useLocaleStore = defineStore('locale', {
  state: (): State => ({
    locale: PT_BR_LOCALE,
    currency: PT_BR_CURRENCY,
    translate: PT_BR_TRANSLATE,
  }),
  actions: {
    changeLocale(locale: Locale) {
      this.locale = locale
      this.currency = getCurrency(locale)
      this.translate = getTranslate(locale)
    },
  },
})
