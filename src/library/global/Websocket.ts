import * as signalR from "@aspnet/signalr";
import Pako from "pako"

export default class Websocket {
    ConnectionObject: signalR.HubConnection | null = null;
    static ResponseMsg = new String();
    ConnectHub(url: string, group: string, type: string, key: string): void {
        //建立設定
        this.ConnectionObject = new signalR.HubConnectionBuilder()
            .withUrl(url)
            .build(); //設定路由
        //開始連線
        this.ConnectionObject.on("ReceiveMessage", this.onReceiveMessage);
        this.ConnectionObject.on("ReceiveGroupMessage", this.onReceiveMessage);
        const conn = this.ConnectionObject;
        this.ConnectionObject
            .start()
            .then(function() {
                conn
                    .invoke(group, type, key)
                    .catch(function(err) {
                        return console.error(err.toString());
                    });
                event?.preventDefault();
            })
            .catch(function(err) {
                // 連接失敗
                return console.error(err.toString());
            });
    }
    onReceiveMessage(result: string): void {
        Websocket.DeCompress(result);
    }
    DeConnection(): void {
        if (this.ConnectionObject != null) this.ConnectionObject.stop();
    }
    static DeCompress(message: string): void {
        //Step1.解Base64編碼
        const strData = atob(message);
        //Step2.將base64字串切割為binnary array
        const charData = strData.split('').map((x) => { return x.charCodeAt(0); });
        let binData = new Uint8Array(charData);
        //Step3.前四碼為壓縮前的字串長度,可忽略.
        binData = binData.slice(4);
        try {
            const data = Pako.inflate(binData)
            const strData = new TextDecoder('utf-8').decode(data)
            Websocket.ResponseMsg = strData
        } catch (e) {
            Websocket.ResponseMsg = "DeCompress Error";
        }
    }
}