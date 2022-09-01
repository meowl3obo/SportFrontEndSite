import { createI18n } from "vue-i18n";
import zhtw from "./language/zhtw"
import enus from "./language/enus"
import jajp from "./language/jajp"
import thth from "./language/thth"
import zhcn from "./language/zhcn"
import vivn from "./language/vivn"
import zhtwDate from "./date/zhtw"
import enusDate from "./date/enus"
import jajpDate from "./date/jajp"
import ththDate from "./date/thth"
import zhcnDate from "./date/zhcn"
import vivnDate from "./date/vivn"

const i18n = createI18n({
    legacy: false,
    locale: "zh-TW",
    fallbackLocale: "zh-TW",
    messages: {
        "zh-TW": zhtw,
        "en-US": enus,
        "zh-CN": zhcn,
        "ja-JP": jajp,
        "th-TH": thth,
        "vi-VN": vivn,
    },
    datetimeFormats: {
        "zh-TW": zhtwDate,
        "en-US": enusDate,
        "zh-CN": zhcnDate,
        "ja-JP": jajpDate,
        "th-TH": ththDate,
        "vi-VN": vivnDate,
    }
});

export default i18n