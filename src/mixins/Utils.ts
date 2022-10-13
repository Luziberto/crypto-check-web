export const NumberUtils = {
    methods: {
      formatCurrency (value: number): string {
        const number = value.toLocaleString('pt-BR', { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })
        return number;
      }
  }
}