export interface IChatMessage {
    time: string
    username: string
    channelID: string
    message: string
    color?: string
}

export interface IChatStatus {
    channelID: string
    status: boolean
}

export interface IChatUsers {
    channelID: string
    users: string
}

export interface IChatChannelUsers {
    channelID: string
    onlineUsers: number,
}

export interface IChatChannelStatus {
    status: boolean,
    onlineUsers: number,
    lastHeartBeat: number,
}