import { state, TState } from "./state"
import { mutations } from "./mutations"
import { actions } from "./actions"
import { getters } from "./getters"

const HotGameModule = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}

export type HotGameState = TState;

export default HotGameModule;