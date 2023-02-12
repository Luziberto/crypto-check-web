export interface Asset {
  uuid: string
  name: string
  slug: string
  symbol: string
  market_cap: MarketCap
  price_change_percentage_24h: number
  image: string
}

interface MarketCap {
  brl: {
    current_price: string
    market_90_days: {
      market_caps: Array<number>
      prices: Array<number>
      total_volumes: Array<number>
    }
  }
  usd: {
    current_price: string
    market_90_days: {
      market_caps: Array<number>
      prices: Array<number>
      total_volumes: Array<number>
    }
  }
}
