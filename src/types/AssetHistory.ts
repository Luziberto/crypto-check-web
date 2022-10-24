export interface AssetHistory {
    name: string,
    market_data: {
        price: number,
        total_volume: number
    },
    image: {
        small: string,
        thumb: string
    }
}