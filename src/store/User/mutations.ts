import { MutationTree } from "vuex"
import { TState } from "./state"
import { IUserInfo, IWallet } from "@/type/Vuex"

export const enum MutauionType {
    SetStatus = "SetStatus",
    SetFinger = "SetFinger",
    SetUserInfo = "SetUserInfo",
    SetWallet = "SetWallet",
}

export type TMutations = {
    [MutauionType.SetStatus](state: TState, status: boolean): void
    [MutauionType.SetFinger](state: TState, finger: string): void
    [MutauionType.SetUserInfo](state: TState, user: IUserInfo): void
    [MutauionType.SetWallet](state: TState, wallet: IWallet): void
}

export const mutations: MutationTree<TState> & TMutations = {
    [MutauionType.SetStatus](state, status) {
        state.Status = status
    },
    [MutauionType.SetFinger](state, finger) {
        state.Finger = finger
    },
    [MutauionType.SetUserInfo](state, user) {
        state.User = user
    },
    [MutauionType.SetWallet](state, wallet) {
        state.Wallet = wallet
    },
}