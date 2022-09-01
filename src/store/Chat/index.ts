import { state, TState } from "./state"
import { mutations } from "./mutations"
import { actions } from "./actions"
import { getters } from "./getters"

const ChatModule = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}

export type ChatState = TState;

export default ChatModule;