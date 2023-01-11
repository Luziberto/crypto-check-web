export interface AssetHistory {
    name: string,
    market_data: Array<{
      price: number,
      total_volume: number,
      fiat: string
    }>,
    image: {
        small: string,
        thumb: string
    }
}