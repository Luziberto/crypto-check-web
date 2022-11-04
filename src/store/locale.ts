import { defineStore } from "pinia"
import { Currency, Translate, getCurrency, getTranslate } from "@/constants/LocaleConstants"

interface State {
  currency: Currency,
  locale: string,
  translate: Translate
}

export const useLocaleStore = defineStore("locale", {
  state: (): State => ({
    locale: "",
    currency: {
      FIAT_SYMBOL: "",
      FIAT_NAME: "",
      FLOAT_SEPARATOR: "",
      THOUSAND_SEPARATOR: "",
      LOCALE: ""
    },
    translate: {
      TITLE: "",
      SEARCH: "",
      CURRENT_PRICE: ""
    }
  }),
  actions: {
    changeLocale(locale: string) {
      this.locale = locale
      this.currency = getCurrency(locale)
      this.translate = getTranslate(locale)
    }
  }
})
