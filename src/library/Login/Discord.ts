import axios from 'axios';
import qs from "qs";
import store from "@/store"
import { ILoginSiteData } from "@/type/User"
import { Delay } from "../global/Thread";

export const DiscordSdk = new class {
    GrantType = ''
    ClientID = ''
    ClientSecret = ''
    Scope = ''
    ResponseType = ''
    BaseAuthUrl = ''
    RedirectUrl = ''

    constructor() {
        this.GrantType = 'authorization_code'
        this.ClientID = '859351116579209226'
        this.ClientSecret = 'BSwqX6PUgeTQFR2Jquhxy8bzWlbIf_jg'
        this.Scope = 'email identify guilds'
        this.ResponseType = 'code'
        this.BaseAuthUrl = 'https://discord.com/api/oauth2/authorize'
        this.RedirectUrl = `${window.location.origin}/Live`
    }

    async Login(): Promise<ILoginSiteData | null> {
        store.dispatch("Component/SetLoading", true)

        const discordLoginWindow = window.open(`${this.BaseAuthUrl}?client_id=${this.ClientID}&redirect_uri=${this.RedirectUrl}&response_type=${this.ResponseType}&scope=${this.Scope}`, 'Discord', 'height=500,width=500')
        
        while(!discordLoginWindow?.closed) {
            let res: ILoginSiteData | null = null;
            if (discordLoginWindow?.location && Object.keys(discordLoginWindow.location).length > 0 && discordLoginWindow?.location.href?.includes("?code=")) {
                const search = discordLoginWindow?.location.search
                const params = new URLSearchParams(search)
                const code = params.get('code')
                if (!code) break;
                const token = await this._getUserToken(code)
                if (!token) break;
                const { name, email } = await this._getUserData(token)
                if (!name || !email) break;
                console.log(res);
                res = this._getLoginData(name, email)

                discordLoginWindow?.window.close();

                return res;
            }

            await Delay(500);
        }
        discordLoginWindow?.close();
        store.dispatch("Component/SetLoading", false)
        return null;
    }

    async _getUserToken(code: string): Promise<string | null> {
        let token: string | null = null
        const body = qs.stringify({
            grant_type: this.GrantType,
            client_id: this.ClientID,
            client_secret: this.ClientSecret,
            redirect_uri: `${this.RedirectUrl}`,
            code: code,
        })
        const headers = { "Content-Type": "application/x-www-form-urlencoded" };
        const ajax = axios.create({
            baseURL: '',
            headers: headers,
        })
        await ajax.request({
            url: "https://discord.com/api/oauth2/token",
            method: "POST",
            data: body
        }).then((res) => {
            if (res.data?.access_token) token = res.data.access_token
        })

        return token
    }

    async _getUserData(token: string): Promise<{ name: string; email: string; }> {
        const userInfo = {
            name: "",
            email: "",
        }
        const headers = { Authorization: `Bearer ${token}` };
        const ajax = axios.create({
            baseURL: '',
            headers: headers,
        })
        await ajax.request({
            url: "https://discord.com/api/users/@me",
            method: "GET",
        }).then((res) => {
            console.log(res)
            if (res.data?.username && res.data?.email) {
                userInfo.email = res.data.email
                userInfo.name = res.data.username
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