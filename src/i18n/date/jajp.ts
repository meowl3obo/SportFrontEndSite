import { IDict } from "@/type/Global"

const JajpDate: IDict<IDict<string | boolean>> = {
    short: {
        year: '2-digit', month: 'narrow', day: '2-digit'
    },
    long: {
        year: '2-digit', month: 'narrow', day: '2-digit',
        weekday: 'narrow', hour: '2-digit', minute: '2-digit', hour12: false
    }
}

export default JajpDate