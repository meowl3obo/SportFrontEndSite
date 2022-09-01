import { createStore } from 'vuex'
import { modules, TState } from "./modules"

export default createStore<TState>({
  modules
})
