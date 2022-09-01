import { IUserInfo, IWallet } from "@/type/Vuex"

export type TState = {
    Status: boolean,
    Finger: string | null,
    User: IUserInfo,
    Wallet: IWallet,
}


export const state: TState = {
    Status: false,
    Finger: null,
    User: {
        Account: "",
        Password: null,
        AddTime: null,
        Rank: 0,
        Token: "",
        Name: "",
        Site: "",
        AuthKey: "",
    },
    Wallet: {
        Point: 0,
        Subscriber: "",
        EndTime: 0,
    },
}
