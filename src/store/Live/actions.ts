import { ActionContext, ActionTree } from "vuex"
import { TState } from "./state"
import { MutauionType, TMutations } from "./mutations"
import { IGameData } from "@/type/Game"
import { IStringDict } from "@/type/Global"

const enum ActionType {
    SetGameDatas = "SetGameDatas",
    SetSiteLeagueMapping = "SetSiteLeagueMapping",
    SetSiteGameMapping = "SetSiteGameMapping"
}

type TActions = {
    [ActionType.SetGameDatas](context: ActionAugments, gameDatas: IGameData): void
    [ActionType.SetSiteLeagueMapping](context: ActionAugments, siteLeagueMapping: IStringDict): void
    [ActionType.SetSiteGameMapping](context: ActionAugments, siteGameMapping: IStringDict): void
}

type ActionAugments = Omit<ActionContext<TState, TState>, 'commit'> & {
    commit<K extends keyof TMutations>(
        key: K,
        payload: Parameters<TMutations[K]>[1]
    ): ReturnType<TMutations[K]>
}


export const actions: ActionTree<TState, TState> & TActions = {
    [ActionType.SetGameDatas]({ commit }, gameDatas) {
        commit(MutauionType.SetGameDatas, gameDatas)
    },
    [ActionType.SetSiteLeagueMapping]({ commit }, siteLeagueMapping) {
        commit(MutauionType.SetSiteLeagueMapping, siteLeagueMapping)
    },
    [ActionType.SetSiteGameMapping]({ commit }, siteGameMapping) {
        commit(MutauionType.SetSiteGameMapping, siteGameMapping)
    },
}