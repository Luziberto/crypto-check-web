import { Asset } from "@/models/Asset";

export interface AssetState {
    items: Array<Asset>
}

export default {
    namespaced: true,
    state: (): AssetState => ({
      items: Array<Asset>()
    }),
    mutations: {
        setApples: function(state: AssetState, assets: Array<Asset>): void {
          state.items = assets;
        }
    }
}