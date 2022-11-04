import { BRL_CURRENCY } from "@/constants/CurrencyConstants";

export const formatCurrency = (value: number): string => {
  if (isExpNumber(value)) {
    return getExponencialNumber(value)
  }
  return convertToCurrency(value);
}

export const getExponencialNumber = (value: number): string => {
    const expIndex = value.toString().indexOf('e')
    const zeros = '0'.repeat(Number(value.toString().charAt(expIndex + 2)))
    const numberPart = value.toString().substring(0, expIndex).replace('.', '')
    return 'R$ ' + zeros.charAt(0) + BRL_CURRENCY.FLOAT_SEPARATOR + zeros.substring(1, expIndex) + numberPart
}

export const isExpNumber = (value: number): boolean => {
  return value.toString().indexOf('e') > 0
}

export const getFloatPointLength = (value: number): number => {
  return value && value.toString().split('.')[1] ? value.toString().split('.')[1].length : 2
}

export const convertToCurrency = (value: number): string => {
  const decimalDigits = getFloatPointLength(value)
  if (decimalDigits > 20) {
    return 'R$ ' + value.toString().replace('.', BRL_CURRENCY.FLOAT_SEPARATOR)
  }
  return value.toLocaleString(BRL_CURRENCY.LOCALE, { minimumFractionDigits: decimalDigits, style: 'currency', currency: BRL_CURRENCY.FIAT_NAME })
}



