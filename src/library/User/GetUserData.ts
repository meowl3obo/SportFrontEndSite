import store from '@/store'
import { GetMemberBalance } from '@/api/payment'
import { IBalanceQuery } from '@/type/Payment'
import { IWallet } from '@/type/Vuex'
import { UnixToDate } from "@/library/global/Unix"

export const GetWallet = async () => {
    const user = store.getters["User/GetUserInfo"]
    const query: IBalanceQuery = {
        AuthKey: user.AuthKey,
    }
    await GetMemberBalance(query).then((res) => {
        const response = res?.response
        const request = res?.request
        if (!response && !request && res) {
            const wallet: IWallet = {
                Point: res.point,
                Subscriber: UnixToDate(res.endTime),
                EndTime: res.endTime
            }
            store.dispatch("User/SetWallet", wallet)
        }
        return;
    })
    return;
}