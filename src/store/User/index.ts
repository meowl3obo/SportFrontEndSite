import { state, TState } from "./state"
import { mutations } from "./mutations"
import { actions } from "./actions"
import { getters } from "./getters"

const UserModule = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}

export type UserState = TState;

export default UserModule;