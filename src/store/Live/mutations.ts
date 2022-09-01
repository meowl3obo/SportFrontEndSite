import { MutationTree } from "vuex"
import { TState } from "./state"
import { IGameData } from "@/type/Game"
import { IStringDict } from "@/type/Global"

export const enum MutauionType {
    SetGameDatas = "SetGameDatas",
    SetSiteLeagueMapping = "SetSiteLeagueMapping",
    SetSiteGameMapping = "SetSiteGameMapping"
}

export type TMutations = {
    [MutauionType.SetGameDatas](state: TState, gameDatas: IGameData): void
    [MutauionType.SetSiteLeagueMapping](state: TState, siteLeagueMapping: IStringDict): void
    [MutauionType.SetSiteGameMapping](state: TState, siteGameMapping: IStringDict): void
}

export const mutations: MutationTree<TState> & TMutations = {
    [MutauionType.SetGameDatas](state, gameDatas) {
        state.GameDatas = gameDatas
    },
    [MutauionType.SetSiteLeagueMapping](state, siteLeagueMapping) {
        state.SiteLeagueMapping = siteLeagueMapping
    },
    [MutauionType.SetSiteGameMapping](state, siteGameMapping) {
        state.SiteGameMapping = siteGameMapping
    },
}