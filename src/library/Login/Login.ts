
import store from "@/store"
import { LoginForSite } from "@/api/user"
import { ILoginSiteData } from "@/type/User"
import { SetHint } from "@/library/global/Hint"
import { GetWallet } from "@/library/User/GetUserData"

export const SiteLogin = async (loginData: ILoginSiteData) => {
    await LoginForSite(loginData).then((res) => {
        const response = res?.response
        const request = res?.request
        if (!response && !request) {
            if (res?.code == 10200) {
                store.dispatch("User/SetUser", res)
                store.dispatch("User/SetStatus", true)
                store.dispatch("Component/CloseSingin", false)
                GetWallet()
                SetHint("登入成功", "歡迎回來", "success")
            } else SetHint("登入失敗", res.message, "error")
        } else SetHint("登入失敗", "伺服器錯誤，請聯繫系統管理員", "error")
    }).finally(() => {
        store.dispatch("Component/SetLoading", false)
    })
}