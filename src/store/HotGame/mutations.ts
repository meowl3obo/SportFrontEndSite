import { MutationTree } from "vuex"
import { TState } from "./state"
import { IHotGame } from "@/type/Game"
import { IStringDict } from "@/type/Global"

export const enum MutauionType {
    SetHotGames = "SetHotGames",
    SetSiteGameMapping = "SetSiteGameMapping"
}

export type TMutations = {
    [MutauionType.SetHotGames](state: TState, gameDatas: IHotGame): void
    [MutauionType.SetSiteGameMapping](state: TState, siteGameMapping: IStringDict): void
}

export const mutations: MutationTree<TState> & TMutations = {
    [MutauionType.SetHotGames](state, hotGames) {
        state.HotGames = hotGames
    },
    [MutauionType.SetSiteGameMapping](state, siteGameMapping) {
        state.SiteGameMapping = siteGameMapping
    },
}