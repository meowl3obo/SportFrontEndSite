import { IDict } from "@/type/Global"

const EnusDate: IDict<IDict<string | boolean>> = {
    short: {
        year: 'numeric', month: 'short', day: 'numeric'
    },
    long: {
        year: 'numeric', month: 'short', day: 'numeric',
        weekday: 'short', hour: 'numeric', minute: 'numeric'
    }
}

export default EnusDate