export interface IPostBuyInfo {
    PostPoint: number;
    UserPoint: number;
    PostID: string;
    PostName: string;
    PostUrl: string;
}

export interface IReqBuyTopic {
    AuthKey: string;
    Account: string;
    PID: string;
    PName: string;
    Price: number;
    Finger: string;
}