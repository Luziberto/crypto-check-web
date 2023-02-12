export const BRL = 'brl'
export const PT_BR = 'pt-BR'
export const USD = 'usd'
export const EN_US = 'en-US'

type CurrencyKey = 'brl' | 'usd'

export interface Locale {
  CODE: string
  DATE_FORMAT: string
}
export interface Currency {
  FIAT_SYMBOL: string
  FIAT_NAME: CurrencyKey
  FLOAT_SEPARATOR: string
  THOUSAND_SEPARATOR: string
}

export interface Translate {
  TITLE: string
  SEARCH: string
  CURRENT_PRICE: string
  NO_RESULTS: string
  MARKET_CAP: string
  PRICE: string
  TOTAL_VOLUME: string
}

export enum PT_BR_LOCALE {
  CODE = 'pt-BR',
  DATE_FORMAT = 'dd/MM/YYYY',
}

export enum EN_US_LOCALE {
  CODE = 'en-US',
  DATE_FORMAT = 'MM/dd/YYYY',
}

export enum PT_BR_CURRENCY {
  FIAT_SYMBOL = 'R$',
  FIAT_NAME = 'brl',
  FLOAT_SEPARATOR = ',',
  THOUSAND_SEPARATOR = '.',
  LOCALE = 'pt-BR',
  DATE_FORMAT = 'dd/MM/YYYY',
}

export enum EN_US_CURRENCY {
  FIAT_SYMBOL = '$',
  FIAT_NAME = 'usd',
  FLOAT_SEPARATOR = ',',
  THOUSAND_SEPARATOR = '.',
  LOCALE = 'en-US',
  DATE_FORMAT = 'MM/dd/YYYY',
}

export enum PT_BR_TRANSLATE {
  TITLE = 'Lista de criptomoedas',
  SEARCH = 'Buscar',
  CURRENT_PRICE = 'Preço Atual',
  NO_RESULTS = 'Sem Resultados',
  MARKET_CAP = 'Capitalização de Mercado',
  PRICE = 'Preço',
  TOTAL_VOLUME = 'Volume Total',
}

export enum EN_US_TRANSLATE {
  TITLE = 'Crypto list',
  SEARCH = 'Search',
  CURRENT_PRICE = 'Current Price',
  NO_RESULTS = 'No Results',
  MARKET_CAP = 'Market Cap',
  PRICE = 'Price',
  TOTAL_VOLUME = 'Total Volume',
}

export function getCurrency(locale: Locale): Currency {
  if (locale.CODE === EN_US) {
    return EN_US_CURRENCY
  } else {
    return PT_BR_CURRENCY
  }
}

export function getTranslate(locale: Locale): Translate {
  if (locale.CODE === EN_US) {
    return EN_US_TRANSLATE
  } else {
    return PT_BR_TRANSLATE
  }
}
