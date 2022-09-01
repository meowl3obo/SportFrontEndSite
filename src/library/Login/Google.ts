import axios from 'axios';
import store from "@/store"
import { ILoginSiteData } from "@/type/User"
import { Delay } from "../global/Thread";

export const GoogleSdk = new class {
    ClientID = ''
    ClientSecret = ''
    GoogleOauth2 = ''
    RedirectUri = ''
    Scope = ''
    ResponseType = ''

    constructor() {
        this.ClientID = '946863130831-6478h6ivofcmp9f83qalitu1enb9f6if.apps.googleusercontent.com'
        this.ClientSecret = 's--X0D0HBqE36u0hEPu46dAT'
        this.GoogleOauth2 = 'https://www.googleapis.com/oauth2/v4/token'
        this.RedirectUri = `${window.location.origin}/Live`
        this.Scope = 'profile email openid'
        this.ResponseType = 'code'
    }

    async Login(): Promise<ILoginSiteData | null> {
        store.dispatch("Component/SetLoading", true)

        const googleLoginWindow = window.open(`https://accounts.google.com/o/oauth2/v2/auth?client_id=${this.ClientID}&redirect_uri=${this.RedirectUri}&scope=${this.Scope}&response_type=${this.ResponseType}&access_type=offline&include_granted_scopes=true`, 'Google', 'height=500,width=500')

        while (!googleLoginWindow?.closed) {
            let res: ILoginSiteData | null = null;
            if (googleLoginWindow?.location && Object.keys(googleLoginWindow.location).length > 0 && googleLoginWindow?.location.href?.includes("?code=")) {
                const search = googleLoginWindow?.location.search
                const params = new URLSearchParams(search)
                const code = params.get('code')
                if (!code) break;
                const accessToken = await this._handleOAuth2(code)
                if (!accessToken) break;
                const { name, email } = await this._getUserInfo(accessToken)
                if (!name || !email) break;
                res = this._getLoginData(name, email)
                googleLoginWindow?.window.close();

                return res;
            }

            await Delay(500);
        }
        googleLoginWindow?.close();
        store.dispatch("Component/SetLoading", false)
        return null;
    }

    async _handleOAuth2(code: string): Promise<string | null> {
        let accessToken: string | null = null
        const body = {
            code: code,
            client_id: this.ClientID,
            client_secret: this.ClientSecret,
            redirect_uri: this.RedirectUri,
            grant_type: 'authorization_code'
        }
        await axios.post(this.GoogleOauth2, body).then((res) => {
            if (res && res.status == 200) accessToken = res.data.access_token
        })
        return accessToken
    }

    async _getUserInfo(token: string): Promise<{ name: string; email: string; }> {
        const userInfo = {
            name: "",
            email: "",
        }
        await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`).then((res) => {
            if (res && res.status == 200) {
                userInfo.name = res.data.name
                userInfo.email = res.data.email
            }
        })
        return userInfo
    }

    _getLoginData(name: string, email: string): ILoginSiteData {
        const finger = store.getters["User/GetFinger"]
        const loginSiteData: ILoginSiteData = {
            account: email,
            userName: name,
            site: "google",
            finger: finger,
        }

        return loginSiteData
    }
}

// const ClientID = '946863130831-6478h6ivofcmp9f83qalitu1enb9f6if.apps.googleusercontent.com'
// const ClientSecret = 's--X0D0HBqE36u0hEPu46dAT'
// const GoogleOauth2 = 'https://www.googleapis.com/oauth2/v4/token'
// const RedirectUri = 'http://localhost:8001/Live'

// export const GetClientID = async () => {
//     store.dispatch("Component/SetLoading", true)
//     let intervalCount = 0
//     const scope = 'profile email openid'
//     const responseType = 'code'

//     const googleLoginWindow = window.open(`https://accounts.google.com/o/oauth2/v2/auth?client_id=${ClientID}&redirect_uri=${RedirectUri}&scope=${scope}&response_type=${responseType}&access_type=offline&include_granted_scopes=true`, 'Google', 'height=500,width=500')

//     const interval = setInterval(() => {
//         intervalCount++
//         if (intervalCount >= 60) {
//             window.clearInterval(interval)
//             googleLoginWindow?.close()
//             SetHint("驗證失敗", "驗證時間超過一分鐘", "error")
//             store.dispatch("Component/SetLoading", false)
//         } else if (googleLoginWindow?.closed) {
//             window.clearInterval(interval)
//             SetHint("驗證失敗", "驗證失敗", "error")
//             store.dispatch("Component/SetLoading", false)
//         }
//         const href = googleLoginWindow?.location.href
//         if (href?.includes('?code=')) {
//             window.clearInterval(interval)
//             const search = googleLoginWindow?.location.search
//             const params = new URLSearchParams(search)
//             const code = params.get('code')
//             googleLoginWindow?.close()
//             if (code) handleOAuth2(code)
//             else {
//                 SetHint("驗證失敗", "驗證失敗", "error")
//                 store.dispatch("Component/SetLoading", false)
//             }
//         }
//     }, 1000)
// }

// const handleOAuth2 = (code: string) => {
//     const body = {
//         code: code,
//         client_id: ClientID,
//         client_secret: ClientSecret,
//         redirect_uri: RedirectUri,
//         grant_type: 'authorization_code'
//     }
//     axios.post(GoogleOauth2, body).then((res) => {
//         if (res && res.status == 200) getUserInfo(res.data.access_token)
//         else {
//             SetHint("驗證失敗", "驗證失敗", "error")
//             store.dispatch("Component/SetLoading", false)
//         }
//     })
// }

// const getUserInfo = async (token: string) => {
//     axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`).then((res) => {
//         if (res && res.status == 200) {
//             console.log(res.data)
//             const name = res.data.name
//             const email = res.data.email
//             login(name, email)
//         }
//         else {
//             SetHint("驗證失敗", "驗證失敗", "error")
//             store.dispatch("Component/SetLoading", false)
//         }
//     })
// }

// const login = async (name: string, email: string) => {
//     const finger = store.getters["User/GetFinger"]
//     const loginData: ILoginSiteData = {
//         account: email,
//         userName: name,
//         site: "google",
//         finger: finger,
//     }
//     await LoginForSite(loginData).then((res) => {
//         const response = res?.response
//         const request = res?.request
//         if (!response && !request) {
//             if (res?.code == 10200) {
//                 store.dispatch("User/SetUser", res)
//                 store.dispatch("User/SetStatus", true)
//                 store.dispatch("Component/CloseSingin", false)
//                 GetWallet()
//                 SetHint("登入成功", "歡迎回來", "success")
//             } else SetHint("登入失敗", res.message, "error")
//         } else SetHint("登入失敗", "伺服器錯誤，請聯繫系統管理員", "error")
//     }).finally(() => {
//         store.dispatch("Component/SetLoading", false)
//     })
// }