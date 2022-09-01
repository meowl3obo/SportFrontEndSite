import * as signalR from "@aspnet/signalr";
import { MessagePackHubProtocol } from "@microsoft/signalr-protocol-msgpack";
import store from "@/store"
import { IDict } from "@/type/Global"
import { IChatChannelStatus, IChatMessage, IChatChannelUsers } from "@/type/Chat"

export default class Websocket {
    ConnectStatus = false
    static channelID: string | null = null
    static userName: string | null = null
    ConnectionObject: signalR.HubConnection | null = null;
    HeartBeatTimer: ReturnType<typeof setInterval> | null = null;
    async ConnectHub(url: string): Promise<void> {
        let connectStatus = false
        //建立設定
        try {
            this.ConnectionObject = new signalR.HubConnectionBuilder()
                .withHubProtocol(new MessagePackHubProtocol())
                .withUrl(url)
                .build(); //設定路由
        } catch (e) {
            console.log(e)
            return
        }
        //開始連線
        this.ConnectionObject.on("ReceiveAddChannel", this.ReceiveAddChannel);
        this.ConnectionObject.on("ReceiveMessage", this.ReceiveMessage);
        this.ConnectionObject.on("ReceiveChannelPopulation", this.ReceiveChannelPopulation);
        await this.ConnectionObject.start().then(function () {
            connectStatus = true
        }).catch(function (err) {
            // 連接失敗
            return console.error(err.toString());
        });
        this.ConnectionObject.onclose(this.CloseChannel)
        this.ConnectStatus = connectStatus
    }
    async AddChannel(username: string, ID: string) {
        if (this.ConnectStatus && this.ConnectionObject) {
            Websocket.channelID = ID;
            Websocket.userName = username;
            await this.ConnectionObject.invoke("AddChannel", username, ID);
        }
    }
    ReceiveAddChannel(...response: [channelID: string, status: boolean]) {
        const [channelID, status] = response;
        const chatChannelStatus: IDict<IChatChannelStatus> = {}
        chatChannelStatus[channelID] = {
            status: status,
            onlineUsers: 0,
            lastHeartBeat: 0,
        }
        store.dispatch('Chat/SetChannels', chatChannelStatus);
    }
    ReceiveMessage(...messages: [time: string, username: string, channelID: string, message: string]) {
        const [time, username, channelID, message] = messages;
        // if (channelID != Websocket.channelID) return
        const chatChannelStatus: IDict<IChatMessage> = {}
        chatChannelStatus[channelID] = {
            time,
            username,
            channelID,
            message,
        }
        store.dispatch('Chat/SetMessage', chatChannelStatus);
    }
    ReceiveChannelPopulation(...response: [channelID: string, users: number]) {
        const [channelID, users] = response;
        const chatChannelUsers: IDict<IChatChannelUsers> = {}
        chatChannelUsers[channelID] = {
            channelID,
            onlineUsers: users
        }
        store.dispatch('Chat/SetOnlineUser', chatChannelUsers);
    }
    async LeaveChannel(channelID: string) {
        // window.clearInterval(this.HeartBeatTimer as ReturnType<typeof setInterval>);
        if (this.ConnectStatus && this.ConnectionObject) {
            await this.ConnectionObject.invoke("LeaveChannel", channelID)
            store.dispatch('Chat/RemoveChannel', channelID);
        }
    }
    async SendMessage(channelID: string, Msg: string, name: string) {
        if (this.ConnectionObject) {
            if (!Websocket.userName) {
                Websocket.userName = name
                this.AddChannel(Websocket.userName as string, channelID)
            } else if (name != Websocket.userName as string) {
                await this.LeaveChannel(channelID)
                Websocket.userName = name
                this.AddChannel(Websocket.userName as string, channelID)
            }
            this.ConnectionObject.invoke("SendMessage", channelID, Msg);
        }
    }
    CloseChannel(e: Error | undefined) {
        Websocket.userName = null
    }
    HeartBeat(channelID: string) {
        if (this.ConnectionObject) {
            this.AddChannel(Websocket.userName as string, channelID)
            this.ConnectionObject.invoke("HeartBeat", channelID);
        }
        // const unixTime = new Date().getTime();
        // store.commit('Chat/SetChannelLastHeartBeat', { channelID, unixTime });
    }
    DeConnection() {
        if (this.ConnectionObject != null) this.ConnectionObject.stop();
    }
}