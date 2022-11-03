export const formatCurrency = (value: number): string => {
    const decimalDigits = value && value.toString().split('.')[1] ? value.toString().split('.')[1].length : 2
    const number = value.toLocaleString('pt-BR', { minimumFractionDigits: decimalDigits, style: 'currency', currency: 'BRL' })
    return number;
}
