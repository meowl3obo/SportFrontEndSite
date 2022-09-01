import { GetterTree } from "vuex"
import { TState } from "./state"
import { IGameData } from "@/type/Game"
import { IStringDict } from "@/type/Global"


type Getters = {
    GetGameDatas(state: TState): IGameData,
    GetSiteLeagueMapping(state: TState): IStringDict
    GetSiteGameMapping(state: TState): IStringDict
}

export const getters: GetterTree<TState, TState> & Getters = {
    GetGameDatas(state) {
        return state.GameDatas
    },
    GetSiteLeagueMapping(state) {
        return state.SiteLeagueMapping
    },
    GetSiteGameMapping(state) {
        return state.SiteGameMapping
    },
}