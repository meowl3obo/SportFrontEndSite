import vuex from "@/store"
import Cookies from "js-cookie"
import { IInputUser, IInputWallet } from "@/type/Vuex"

const logout = () => {
    const url = document.URL
    const emptyUserData: IInputUser = {} as IInputUser;
    emptyUserData.wallet = {} as IInputWallet;
    vuex.dispatch("User/SetStatus", false)
    vuex.dispatch("User/SetUser", emptyUserData)
    Cookies.remove("user")
    if (url.includes("stored") || url.includes("user")) {
        document.location.href = '/'
    }
}

export default logout