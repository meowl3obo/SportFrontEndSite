import { MutationTree } from "vuex"
import { TState } from "./state"
import { IDict } from "@/type/Global"
import { IChatChannelStatus, IChatMessage, IChatChannelUsers } from "@/type/Chat"

export const enum MutauionType {
    SetChannels = "SetChannels",
    SetMessage = "SetMessage",
    SetOnlineUser = "SetOnlineUser",
    RemoveChannel = "RemoveChannel",
}

export type TMutations = {
    [MutauionType.SetChannels](state: TState, channels: IDict<IChatChannelStatus>): void
    [MutauionType.SetMessage](state: TState, message: IDict<IChatMessage>): void
    [MutauionType.SetOnlineUser](state: TState, users: IDict<IChatChannelUsers>): void
    [MutauionType.RemoveChannel](state: TState, channelID: string): void
}

export const mutations: MutationTree<TState> & TMutations = {
    [MutauionType.SetChannels](state, channels) {
        Object.keys(channels).forEach(key => {
            state.Channels[key] = channels[key]
        })
    },
    [MutauionType.SetMessage](state, message) {
        Object.keys(message).forEach(key => {
            if (!state.Message[key]) state.Message[key] = []
            state.Message[key].push(message[key])
        })
    },
    [MutauionType.SetOnlineUser](state, users) {
        Object.keys(users).forEach(key => {
            if (state.Channels[key]) state.Channels[key].onlineUsers = users[key].onlineUsers
        })
    },
    [MutauionType.RemoveChannel](state, channelID) {
        delete state.Channels[channelID]
        delete state.Message[channelID]
    },
}