export const BRL = "BRL"
export const PT_BR = "PT_BR"
export const USD = "USD"
export const EN_US = "EN_US"

export interface Currency {
  FIAT_SYMBOL: string
  FIAT_NAME: string
  FLOAT_SEPARATOR: string
  THOUSAND_SEPARATOR: string
  LOCALE: string
}

export interface Translate {
  TITLE: string,
  SEARCH: string,
  CURRENT_PRICE: string
}

export enum PT_BR_CURRENCY {
  FIAT_SYMBOL = "R$",
  FIAT_NAME = "BRL",
  FLOAT_SEPARATOR = ",",
  THOUSAND_SEPARATOR = ".",
  LOCALE = "pt-BR"
}

export enum EN_US_CURRENCY {
  FIAT_SYMBOL = "$",
  FIAT_NAME = "USD",
  FLOAT_SEPARATOR = ",",
  THOUSAND_SEPARATOR = ".",
  LOCALE = "en-US"
}

export enum PT_BR_TRANSLATE {
  TITLE = "Lista de criptomoedas",
  SEARCH = "Buscar",
  CURRENT_PRICE = "Preço Atual"
}

export enum EN_US_TRANSLATE {
  TITLE = "Cryto list",
  SEARCH = "Search",
  CURRENT_PRICE = "Current Price"
}

export function getCurrency(locale: string) : Currency {
  if (locale === USD) {
    return EN_US_CURRENCY
  } else {
    return PT_BR_CURRENCY
  }
}


export function getTranslate(locale: string) : Translate {
  if (locale === EN_US) {
    return EN_US_TRANSLATE
  } else {
    return PT_BR_TRANSLATE
  }
}
