import { ref } from "vue";
import * as signalR from "@aspnet/signalr";
import { MessagePackHubProtocol } from "@microsoft/signalr-protocol-msgpack";
import store from "@/store";
import { IDict } from "@/type/Global";
import { IChatChannelStatus, IChatMessage, IChatChannelUsers } from "@/type/Chat";

export default function () {
    const ConnectionObject = ref<signalR.HubConnection | null>();
    //eslint-disable-next-line
    let ConnectStatus = ref<boolean>(false);
    // let HeartBeatTimer = ref<ReturnType<typeof setInterval> | null>();
    // static properties
    //eslint-disable-next-line
    let channelID = ref<string | null>();
    //eslint-disable-next-line
    let userName = ref<string | null>();

    const ConnectHub = async (url: string): Promise<void> => {
        let connectStatus = false
        //建立設定
        try {
            ConnectionObject.value = new signalR.HubConnectionBuilder()
                .withHubProtocol(new MessagePackHubProtocol())
                .withUrl(url)
                .build(); //設定路由
        } catch (e) {
            console.log(e)
            return
        }
        //開始連線
        ConnectionObject.value.on("ReceiveAddChannel", ReceiveAddChannel);
        ConnectionObject.value.on("ReceiveMessage", ReceiveMessage);
        ConnectionObject.value.on("ReceiveChannelPopulation", ReceiveChannelPopulation);
        await ConnectionObject.value.start().then(function () {
            connectStatus = true
        }).catch(function (err) {
            // 連接失敗
            return console.error(err.toString());
        });
        ConnectionObject.value.onclose(CloseChannel)
        ConnectStatus.value = connectStatus
    }

    const AddChannel = async (username: string, ID: string) => {
        if (ConnectStatus.value && ConnectionObject) {
            channelID.value = ID;
            userName.value = username;
            await ConnectionObject.value?.invoke("AddChannel", username, ID);
        }
    }
    const ReceiveAddChannel = (...response: [channelID: string, status: boolean]) => {
        const [channelID, status] = response;
        const chatChannelStatus: IDict<IChatChannelStatus> = {}
        chatChannelStatus[channelID] = {
            status: status,
            onlineUsers: 0,
            lastHeartBeat: 0,
        }
        store.dispatch('Chat/SetChannels', chatChannelStatus);
    }
    const ReceiveMessage = (...messages: [time: string, username: string, channelID: string, message: string]) => {
        const [time, username, channelID, message] = messages;
        const chatChannelStatus: IDict<IChatMessage> = {}
        chatChannelStatus[channelID] = {
            time,
            username,
            channelID,
            message,
        }
        store.dispatch('Chat/SetMessage', chatChannelStatus);
    }
    const ReceiveChannelPopulation = (...response: [channelID: string, users: number]) => {
        const [channelID, users] = response;
        const chatChannelUsers: IDict<IChatChannelUsers> = {}
        chatChannelUsers[channelID] = {
            channelID,
            onlineUsers: users
        }
        store.dispatch('Chat/SetOnlineUser', chatChannelUsers);
    }
    const LeaveChannel = async (channelID: string) => {
        // window.clearInterval(HeartBeatTimer as ReturnType<typeof setInterval>);
        if (ConnectStatus.value && ConnectionObject) {
            await ConnectionObject.value?.invoke("LeaveChannel", channelID)
            store.dispatch('Chat/RemoveChannel', channelID);
        }
    }
    const SendMessage = async (channelID: string, Msg: string, name: string) => {
        if (ConnectionObject.value) {
            if (!userName.value) {
                userName.value = name
                AddChannel(userName.value as string, channelID)
            } else if (name != userName.value as string) {
                await LeaveChannel(channelID)
                userName.value = name
                AddChannel(userName.value as string, channelID)
            }
            ConnectionObject.value?.invoke("SendMessage", channelID, Msg);
        }
    }
    const CloseChannel = (e: Error | undefined) => {
        userName.value = null
    }
    const HeartBeat = (channelID: string) => {
        if (ConnectionObject.value) {
            AddChannel(userName.value as string, channelID)
            ConnectionObject.value?.invoke("HeartBeat", channelID);
        }
        // const unixTime = new Date().getTime();
        // store.commit('Chat/SetChannelLastHeartBeat', { channelID, unixTime });
    }
    const DeConnection = () => {
        if (ConnectionObject.value != null) ConnectionObject.value?.stop();
    }

    return {
        ConnectHub,
        AddChannel,
        ReceiveAddChannel,
        ReceiveMessage,
        ReceiveChannelPopulation,
        LeaveChannel,
        SendMessage,
        CloseChannel,
        HeartBeat,
        DeConnection,
    }
}