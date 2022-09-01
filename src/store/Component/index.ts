import { state, TState } from "./state"
import { mutations } from "./mutations"
import { actions } from "./actions"
import { getters } from "./getters"

const ComponentModule = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}

export type ComponentState = TState;

export default ComponentModule;