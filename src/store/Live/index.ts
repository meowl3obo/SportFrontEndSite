import { state, TState } from "./state"
import { mutations } from "./mutations"
import { actions } from "./actions"
import { getters } from "./getters"

const LiveModule = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}

export type LiveState = TState;

export default LiveModule;