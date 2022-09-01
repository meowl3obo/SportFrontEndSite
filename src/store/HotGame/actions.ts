import { ActionContext, ActionTree } from "vuex"
import { TState } from "./state"
import { MutauionType, TMutations } from "./mutations"
import { IHotGame } from "@/type/Game"
import { IStringDict } from "@/type/Global"

const enum ActionType {
    SetHotGames = "SetHotGames",
    SetSiteGameMapping = "SetSiteGameMapping"
}

type TActions = {
    [ActionType.SetHotGames](context: ActionAugments, hotGames: IHotGame): void
    [ActionType.SetSiteGameMapping](context: ActionAugments, siteGameMapping: IStringDict): void
}

type ActionAugments = Omit<ActionContext<TState, TState>, 'commit'> & {
    commit<K extends keyof TMutations>(
        key: K,
        payload: Parameters<TMutations[K]>[1]
    ): ReturnType<TMutations[K]>
}


export const actions: ActionTree<TState, TState> & TActions = {
    [ActionType.SetHotGames]({ commit }, hotGames) {
        commit(MutauionType.SetHotGames, hotGames)
    },
    [ActionType.SetSiteGameMapping]({ commit }, siteGameMapping) {
        commit(MutauionType.SetSiteGameMapping, siteGameMapping)
    },
}