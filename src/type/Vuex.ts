export interface ISingin {
    status: boolean,
    component?: string
}

export interface IUserInfo {
    Account: string,
    Password: string | null,
    AddTime: string | null,
    Rank: number,
    Token: string,
    Name: string,
    Site: string,
    AuthKey: string,
}

export interface IWallet {
    Point: number,
    Subscriber: string,
    EndTime: number
}

export interface IInputUserInfo {
    account: string,
    password: string | null,
    addTime: string | null,
    rank: number,
    token: string,
    userName: string,
    site: string,
    authKey: string,
}

export interface IInputWallet {
    point: number,
    endTime: number,
}

export interface IInputUser extends IInputUserInfo {
    wallet: IInputWallet
}

export interface IHint {
    id?: string
    title: string
    message: string
    hint: "warning" | "success" | "error"
}