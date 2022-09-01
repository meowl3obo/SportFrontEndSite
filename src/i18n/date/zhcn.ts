import { IDict } from "@/type/Global"

const ZhcnDate: IDict<IDict<string | boolean>> = {
    short: {
      year: 'numeric', month: 'short', day: 'numeric'
    },
    long: {
          year: 'numeric', month: 'long', day: '2-digit',
          weekday: 'long', hour: 'numeric', minute: 'numeric', hour12: true
    }
}

export default ZhcnDate