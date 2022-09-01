import { MutationTree } from "vuex"
import { TState } from "./state"

export const enum MutauionType {
    SetWidth = "SetWidth",
    SetGameType = "SetGameType",
    SetLanguage = "SetLanguage",
}

export type TMutations = {
    [MutauionType.SetWidth](state: TState, width: number): void
    [MutauionType.SetGameType](state: TState, gameType: string): void
    [MutauionType.SetLanguage](state: TState, Language: string): void
}

export const mutations: MutationTree<TState> & TMutations = {
    [MutauionType.SetWidth](state, width) {
        state.Width = width
    },
    [MutauionType.SetGameType](state, gameType) {
        state.GameType = gameType
    },
    [MutauionType.SetLanguage](state, Language) {
        state.Language = Language
    },
}