import { IDict } from "@/type/Global"

const ThthDate: IDict<IDict<string>> = {
    short: {
        year: 'numeric', month: 'short', day: 'numeric'
    },
    long: {
        year: 'numeric', month: 'short', day: 'numeric',
        weekday: 'short', hour: 'numeric', minute: 'numeric'
    }
}

export default ThthDate