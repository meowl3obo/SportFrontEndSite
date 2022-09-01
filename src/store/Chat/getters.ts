import { GetterTree } from "vuex"
import { TState } from "./state"
import { IDict } from "@/type/Global"
import { IChatChannelStatus, IChatMessage } from "@/type/Chat"


type Getters = {
    GetChannels(state: TState): IDict<IChatChannelStatus>
    GetMessage(state: TState): IDict<Array<IChatMessage>>
}

export const getters: GetterTree<TState, TState> & Getters = {
    GetChannels(state) {
        return state.Channels
    },
    GetMessage(state) {
        return state.Message
    },
}