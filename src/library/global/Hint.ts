import { IHint } from "@/type/Vuex"
import Store from "@/store/index";

export const SetHint = (title: string, message: string, hint: string) => {
    const Hint:IHint = {
        title: title,
        message: message,
        hint: hint as "warning" | "success" | "error"
    }
    Store.dispatch("Component/SetHint", Hint);
}