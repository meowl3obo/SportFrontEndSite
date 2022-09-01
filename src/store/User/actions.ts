import { ActionContext, ActionTree } from "vuex"
import { TState } from "./state"
import { MutauionType, TMutations } from "./mutations"
import { IUserInfo, IWallet, IInputUser } from "@/type/Vuex"
import { DateLibrary } from "@/library/global/Date"
import Cookies from "js-cookie"

const enum ActionType {
    SetStatus = "SetStatus",
    SetFinger = "SetFinger",
    SetUserInfo = "SetUserInfo",
    SetWallet = "SetWallet",
    SetUser = "SetUser",
    SetUserFromCookies = "SetUserFromCookies"
}

type TActions = {
    [ActionType.SetStatus](context: ActionAugments, status: boolean): void
    [ActionType.SetFinger](context: ActionAugments, finger: string): void
    [ActionType.SetUserInfo](context: ActionAugments, user: IUserInfo): void
    [ActionType.SetWallet](context: ActionAugments, wallet: IWallet): void
    [ActionType.SetUser](context: ActionAugments, user: IInputUser): void
    [ActionType.SetUserFromCookies](context: ActionAugments, user: { userInfo: IUserInfo, wallet: IWallet }): void
}

type ActionAugments = Omit<ActionContext<TState, TState>, 'commit'> & {
    commit<K extends keyof TMutations>(
        key: K,
        payload: Parameters<TMutations[K]>[1]
    ): ReturnType<TMutations[K]>
}


export const actions: ActionTree<TState, TState> & TActions = {
    [ActionType.SetStatus]({ commit }, status) {
        commit(MutauionType.SetStatus, status)
    },
    [ActionType.SetFinger]({ commit }, finger) {
        commit(MutauionType.SetFinger, finger)
    },
    [ActionType.SetUserInfo]({ commit }, userInfo) {
        commit(MutauionType.SetUserInfo, userInfo)
        Cookies.set('user', JSON.stringify(userInfo))
    },
    [ActionType.SetWallet]({ commit }, wallet) {
        commit(MutauionType.SetWallet, wallet)
        Cookies.set('wallet', JSON.stringify(wallet))
    },
    [ActionType.SetUser]({ commit }, user) {
        const userInfo = {
            Account: user.account,
            Password: user.password,
            AddTime: user.addTime,
            Rank: user.rank,
            Token: user.token,
            Name: user.userName,
            Site: user.site,
            AuthKey: user.authKey,
        } as IUserInfo
        const wallet = {
            Point: user.wallet.point,
            Subscriber: DateLibrary.UnixToDate(user.wallet.endTime * 1000)
        } as IWallet
        commit(MutauionType.SetUserInfo, userInfo)
        commit(MutauionType.SetWallet, wallet)
        Cookies.set('user', JSON.stringify(userInfo))
        Cookies.set('wallet', JSON.stringify(wallet))
    },
    [ActionType.SetUserFromCookies]({ commit }, user) {
        commit(MutauionType.SetUserInfo, user.userInfo)
        commit(MutauionType.SetWallet, user.wallet)
    }
}