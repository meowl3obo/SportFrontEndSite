import { MutationTree } from "vuex"
import { TState } from "./state"
import { IHint } from "@/type/Vuex"

export const enum MutauionType {
    SetSinginComponent = "SetSinginComponent",
    SetSingin = "SetSingin",
    SetMemo = "SetMemo",
    SetSideBar = "SetSideBar",
    SetHint = "SetHint",
    RemoveHint = "RemoveHint",
    SetSubscribe = "SetSubscribe",
    SetLoading = "SetLoading"
}

export type TMutations = {
    [MutauionType.SetSinginComponent](state: TState, component: string): void
    [MutauionType.SetSingin](state: TState, status: boolean): void
    [MutauionType.SetMemo](state: TState, status: boolean): void
    [MutauionType.SetSideBar](state: TState, status: boolean): void
    [MutauionType.SetHint](state: TState, data: IHint): void
    [MutauionType.RemoveHint](state: TState, index: number): void
    [MutauionType.SetSubscribe](state: TState, status: boolean): void
    [MutauionType.SetLoading](state: TState, status: boolean): void
}

export const mutations: MutationTree<TState> & TMutations = {
    [MutauionType.SetSinginComponent](state, component) {
        state.SinginComponent = component
    },
    [MutauionType.SetSingin](state, status) {
        state.Singin = status
    },
    [MutauionType.SetMemo](state, status) {
        state.Memo = status
    },
    [MutauionType.SetSideBar](state, sidebar) {
        state.SideBar = sidebar
    },
    [MutauionType.SetHint](state, data) {
        state.Hint.push(data)
    },
    [MutauionType.RemoveHint](state, index) {
        state.Hint.splice(index, 1)
    },
    [MutauionType.SetSubscribe](state, status) {
        state.Subscribe = status
    },
    [MutauionType.SetLoading](state, status) {
        state.Loading = status
    },
}