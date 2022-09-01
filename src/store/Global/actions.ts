import { ActionContext, ActionTree } from "vuex"
import { TState } from "./state"
import { MutauionType, TMutations } from "./mutations"

const enum ActionType {
    SetWidth = "SetWidth",
    SetGameType = "SetGameType",
    SetLanguage = "SetLanguage",
}

type TActions = {
    [ActionType.SetWidth](context: ActionAugments, width: number): void
    [ActionType.SetGameType](context: ActionAugments, gameType: string): void
    [ActionType.SetLanguage](context: ActionAugments, Language: string): void
}

type ActionAugments = Omit<ActionContext<TState, TState>, 'commit'> & {
    commit<K extends keyof TMutations>(
        key: K,
        payload: Parameters<TMutations[K]>[1]
    ): ReturnType<TMutations[K]>
}


export const actions: ActionTree<TState, TState> & TActions = {
    [ActionType.SetWidth]({ commit }, width) {
        commit(MutauionType.SetWidth, width)
    },
    [ActionType.SetGameType]({ commit }, gameType) {
        commit(MutauionType.SetGameType, gameType)
    },
    [ActionType.SetLanguage]({ commit }, gameType) {
        commit(MutauionType.SetLanguage, gameType)
    },
}