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
    market_90_days: string
  }
  usd: {
    current_price: string
    market_90_days: string
  }
}
