import { IDict } from "@/type/Global"
import { IChatChannelStatus, IChatMessage } from "@/type/Chat"

export type TState = {
    Channels: IDict<IChatChannelStatus>
    Message: IDict<Array<IChatMessage>>
}


export const state: TState = {
    Channels: {},
    Message: {},
}
