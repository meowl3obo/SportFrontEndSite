export interface ILoginData {
    account: string,
    password: string,
    site: string,
    finger: string,
    username: string,
}

export interface ILoginSiteData {
    account: string
    userName: string
    site: string
    finger: string
}

export interface IRegisterData {
    checkPwd: string,
    pwdError: boolean,
    userName: string,
    account: string,
    password: string,
    finger: string,
}

export interface IForgetData {
    finger: string,
    account: string,
}

export interface IVerifyData {
    authKey: string,
    finger: string,
    account: string,
}

export interface ISetNewPasswordData {
    password: string,
    finger: string,
    authKey: string,
    account: string,
}

export interface IUpdateNameData {
    username: string,
    finger: string,
    token: string,
}

export interface IUpdatePassword {
    password: string,
    newPassword: string,
    token: string,
    finger: string,
}