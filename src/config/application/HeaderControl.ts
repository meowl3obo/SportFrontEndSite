import { IHeaderControl } from '@/type/Header'

export const HeaderControl: IHeaderControl = {
    Customer: {
        "Become an Expert": "BecomeAnExpert",
        "Become a Subscriber": "BecomeASubscriber",
        "Orders And Cancel Order": "OrdersAndCancelOrder",
        "Notification": "Notification",
        "Documents For API": "DocumentsForAPI",
        "Sample": "Samples",
        "Contact Support": "ContactSupport",
        "About Us": "AboutUs",
        "Use of the Site": "UseOfTheSite",
        "Posting Content on the Site": "PostingContentOnTheSite",
        "Registering for an account": "RegisteringForAnAccount",
        "Programs": "Programs",
        "Content on the Site": "ContentOnTheSite",
        "General Term": "GeneralTerms",
    },
    Feeback: {
        "Help And FAQ": "HelpAndFAQ",
    },
    Language: {
        "繁體中文": "zh-TW",
        "简体中文": "zh-CN",
        "English": "en-US",
        "日本語": "ja-JP",
        "Tiếng Việt": "vi-VN",
        "ยาสึฟุมิ": "th-TH",
    }
}

export const UserControl = [
    { name: "Header.Info", link: "/user/profile", key: "Info" },
    { name: "Header.Rank", link: "", key: "Rank" },
    { name: "Header.Order", link: "/user/order", key: "Order" },
    { name: "Header.Notifications", link: "", key: "Notifications" },
    { name: "Header.Export", link: "", key: "Export" },
    { name: "Header.LogOut", link: "LogOut", key: "LogOut" },
]