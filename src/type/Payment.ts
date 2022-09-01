export interface IPaymentPlanQuery {
    type: "subscribe" | "point"
}

export interface IBalanceQuery {
    AuthKey: string
}

export interface IPointLogQuery {
    AuthKey: string
}

export interface IStoredLogQuery {
    AuthKey: string
}

export interface ISubscribeBody {
    AuthKey: string,
    Account: string,
    PlanID: number,
    Finger: string,
}

export interface IStoredBody {
    AuthKey: string,
    Account: string,
    PlanID: number,
    ChannelID: number,
    Finger: string,
}

export interface IPaymentPlay {
    addTime: number
    channel: Array<IChannel>
    enabled: number
    endTime: number
    id: number
    name: string
    price: number
    startTime: number
    type: string
    value: number
}

export interface IChannel {
    id: number
    enabled: number
    name: string
    addTime: number
    lastUpdateTime: number
}

export interface IRecord {
    addTime: number
    date: string
    orderID: string
    planName: string
    point: number
    price: number
}

export interface IBuyRecord extends IRecord {
    content: string
}

export interface IStoredRecord extends IRecord {
    channel: string
    status: number
}