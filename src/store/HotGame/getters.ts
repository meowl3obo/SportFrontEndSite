import { GetterTree } from "vuex"
import { TState } from "./state"
import { IHotGame } from "@/type/Game"
import { IStringDict } from "@/type/Global"


type Getters = {
    GetHotGames(state: TState): IHotGame,
    GetSiteGameMapping(state: TState): IStringDict
}

export const getters: GetterTree<TState, TState> & Getters = {
    GetHotGames(state) {
        return state.HotGames
    },
    GetSiteGameMapping(state) {
        return state.SiteGameMapping
    },
}