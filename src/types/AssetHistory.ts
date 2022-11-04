export interface AssetHistory {
    name: string,
    market_data: Array<MarketData>,
    image: {
        small: string,
        thumb: string
    }
}

export interface MarketData {
  price: number,
  total_volume: number,
  fiat: string
}
