import Vue from 'vue'
import Vuex from 'vuex'
import appleModule, { AssetsState } from './AssetModule'

Vue.use(Vuex)

export interface State {
  assets: AssetsState;
}

export default new Vuex.Store<State>({
  modules: {
    assets: appleModule
  }
})