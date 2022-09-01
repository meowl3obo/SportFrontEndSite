import { IDict } from "@/type/Global";
import { ForumSettings } from "./Forum";
export const ForumMessageSettings = new class {
    ForumService = ForumSettings.BaseUrl;
    Message: IDict<IDict<string>> = {
        [`loginRequest`]: { event: '/login', type: "changeVuePage" },
        [`registerRequest`]: { event: '/register', type: "changeVuePage" },
        [`changePage`]: { event: '', type: "forumChangePage" },
        [`url`]: { event: '', type: "changeForumsPage" },
        [`404Page`]: { event: ForumSettings.BaseUrl as string, type: "changeForumsPage" },
        [`loginSuccess`]: { event: ForumSettings.BaseUrl as string, type: "changeForumsPage" },
        [`reloadForums`]: { event: '', type: "destoryElement" },
        [`logoutSuccess`]: { event: '', type: "destoryElement" },
        [`loginLoading`]: { event: '', type: "loadingStart" },
        [`clickATag`]: { event: '', type: "loadingStart" },
        [`clickFormTag`]: { event: '', type: "loginCheck" },
        [`clickButtonTag`]: { event: '', type: "loginCheck" },
        [`gotoTopic`]: { event: '', type: "gotoTopic" },
        [`getAuthKey`]: { event: '', type: "getAuthKey" },
    }
}
