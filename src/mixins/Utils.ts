export const NumberUtils = {
    methods: {
      round (value: number): number {
        return (Math.round(value * 100) / 100)
      },
      formatCurrency (value: number): string {
        const number = value.toLocaleString('pt-BR', { minimumFractionDigits: 2 , style: 'currency', currency: 'BRL' })
        return number;
      }
  }
}