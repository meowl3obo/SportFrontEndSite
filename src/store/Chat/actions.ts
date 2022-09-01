import { ActionContext, ActionTree } from "vuex"
import { TState } from "./state"
import { MutauionType, TMutations } from "./mutations"
import { IDict } from "@/type/Global"
import { IChatChannelStatus, IChatMessage, IChatChannelUsers } from "@/type/Chat"

const enum ActionType {
    SetChannels = "SetChannels",
    SetMessage = "SetMessage",
    SetOnlineUser = "SetOnlineUser",
    RemoveChannel = "RemoveChannel"
}

type TActions = {
    [ActionType.SetChannels](context: ActionAugments, channels: IDict<IChatChannelStatus>): void
    [ActionType.SetMessage](context: ActionAugments, message: IDict<IChatMessage>): void
    [ActionType.SetOnlineUser](context: ActionAugments, users: IDict<IChatChannelUsers>): void
    [ActionType.RemoveChannel](context: ActionAugments, channelID: string): void
}

type ActionAugments = Omit<ActionContext<TState, TState>, 'commit'> & {
    commit<K extends keyof TMutations>(
        key: K,
        payload: Parameters<TMutations[K]>[1]
    ): ReturnType<TMutations[K]>
}


export const actions: ActionTree<TState, TState> & TActions = {
    [ActionType.SetChannels]({ commit }, channels) {
        commit(MutauionType.SetChannels, channels)
    },
    [ActionType.SetMessage]({ commit }, message) {
        console.log(message)
        commit(MutauionType.SetMessage, message)
    },
    [ActionType.SetOnlineUser]({ commit }, users) {
        commit(MutauionType.SetOnlineUser, users)
    },
    [ActionType.RemoveChannel]({ commit }, id) {
        commit(MutauionType.RemoveChannel, id)
    },
}