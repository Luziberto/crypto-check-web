export const formatCurrency = (value: number): string => {
  let number = ''
  if (isExpNumber(value)) {
    number = getExponencialNumber(value)
  } else {
    const decimalDigits = getFloatPointLength(value)
    number = value.toLocaleString('pt-BR', { minimumFractionDigits: decimalDigits, style: 'currency', currency: 'BRL' })
  }

  return number;
}

export const getExponencialNumber = (value: number): string => {
    const expIndex = value.toString().indexOf('e')
    const zeros = '0'.repeat(Number(value.toString().charAt(expIndex + 2)))
    const numberPart = value.toString().substring(0, expIndex).replace('.', '')
    return 'R$ ' + zeros.charAt(0) + ',' + zeros.substring(1, expIndex) + numberPart
}

export const isExpNumber = (value: number): boolean => {
  return value.toString().indexOf('e') > 0
}

export const getFloatPointLength = (value: number): number => {
  return value && value.toString().split('.')[1] ? value.toString().split('.')[1].length : 2
}



