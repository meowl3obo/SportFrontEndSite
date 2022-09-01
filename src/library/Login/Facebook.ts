import { FBSetting } from "@/config/application/ThirdPartyServices";
// import { FacebookRequest } from "@/api/thirdPartyService";
import { ILoginSiteData } from "@/type/User";
import store from "@/store";
import { AuthService, FacebookLoginProvider, AuthConfig } from 'auth-social';
// import { Delay } from "../global/Thread";

export const FacebookSdk = new class {
    config: AuthConfig = new AuthConfig([
        {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(process.env.VUE_APP_FB_ID ?? FBSetting.AppID)
        }
    ]);

    authService: AuthService = new AuthService(this.config);

    async Login(): Promise<ILoginSiteData | null> {
        let resData: ILoginSiteData | null = null
        await this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((res) => {
            console.clear()
            const finger = store.getters["User/GetFinger"];
            if (res.id && res.email) {
                resData = {} as ILoginSiteData;
                resData.account = res?.email,
                resData.userName = res?.name as string,
                resData.site = "facebook",
                resData.finger = finger
            }
        }).catch((e) => { console.error(e) })
        return resData;
    }
}

// export const FacebookSdk = new class {
//     ClientID = ""
//     ClientSecret = ""
//     constructor() {
//         this.ClientID = FBSetting.AppID
//         this.ClientSecret = FBSetting.APPSecret
//     }
//     _generateLoginUrl(redrictUrl: string, state: Array<string> | null) {
//         let url = `https://www.facebook.com/v14.0/dialog/oauth?client_id=${this.ClientID}&redirect_uri=${window.location.origin}${redrictUrl}`
//         if (state !== null) {
//             url = `${redrictUrl}{${state.join(",")}}`
//         }
//         return url
//     }
//     async _generateAccessToken(code: string, redirect_uri: string): Promise<string | null> {
//         const res = await FacebookRequest(`https://graph.facebook.com/v14.0/oauth/access_token?client_id=${this.ClientID}&client_secret=${this.ClientSecret}&redirect_uri=${redirect_uri}&code=${code}`);
//         if (res.statusCode != 200) return null;
//         return res.data.access_token;
//     }
//     async _generateUserID(accessToken: string): Promise<string | null> {
//         const res = await FacebookRequest(`https://graph.facebook.com/debug_token?input_token=${accessToken}&access_token=${accessToken}`);
//         if (res.statusCode != 200) return null;
//         return res?.data?.data?.user_id;
//     }
//     async _generateUserProfile(accessToken: string, userID: string): Promise<ILoginSiteData | null> {
//         const res = await FacebookRequest(`https://graph.facebook.com/v14.0/${userID}?access_token=${accessToken}&fields=last_name,first_name,name,email&method=get&pretty=0&sdk=joey&suppress_http_code=1`);
//         if (res.statusCode != 200) return null;
//         const finger = store.getters["User/GetFinger"];
//         const userData: ILoginSiteData = {
//             account: res?.data?.email,
//             userName: res?.data?.name,
//             site: "facebook",
//             finger
//         };
//         return userData;
//     }
//     async Login(): Promise<ILoginSiteData | null> {
//         store.dispatch("Component/SetLoading", true)
//         const thirdLoginObject = window.open(this._generateLoginUrl(FBSetting.RedrictUrl, null), 'Google', 'height=500,width=500');
        
//         while(!thirdLoginObject?.closed) {
//             let res: ILoginSiteData | null = null;
//             if (thirdLoginObject?.location && Object.keys(thirdLoginObject.location).length > 0 && thirdLoginObject?.location.href?.includes("?code=")) {
//                 res = await this._getUserProfile(thirdLoginObject.location.href.split("?code=")[1]);
//                 thirdLoginObject.window.close();
//                 return res;
//             }

//             await Delay(500);
//         }
//         thirdLoginObject?.close();
//         store.dispatch("Component/SetLoading", false)
//         return null;
//     }
//     async _getUserProfile(code: string): Promise<ILoginSiteData | null> {
//         const accessToken = await this._generateAccessToken(code, `${window.location.origin}${FBSetting.RedrictUrl}`);
//         if (accessToken != null) {
//             const userID = await this._generateUserID(accessToken);
//             if (userID != null) {
//                 const userProfile = this._generateUserProfile(accessToken, userID);
//                 return userProfile;
//             }
//         }
//         return null;
//     }
// }