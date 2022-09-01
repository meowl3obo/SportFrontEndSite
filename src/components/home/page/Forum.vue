<template>
  <div>
    <div>
      <!-- <Loading class="wordpress-Forum loading" v-if="loading" /> -->
      <iframe
        :src="forum"
        class="Forum"
        v-if="serviceActive"
        :ref="el => {forumFrame = el}"
        :style="`display: ${!loading && !logining ? 'block' : 'none'}`"
      />
      <!-- -->
      <div v-if="!serviceActive" style="color: var(--main-font); text-align: center">
        該服務目前不可用!
        <!-- <b-button @click="looktest()"> look </b-button> -->
      </div>
    </div>
    <Modal v-if="showMessage">
      <template v-slot>
        <div style="padding: 5px">
          <div>
            <h3>您尚未獲取此文章！</h3>
            <h4>剩餘點數: {{ postPriceInfo.UserPoint ?? 0 }}</h4>
            <div>
              <h4>此貼文需花費 {{ postPriceInfo.PostPoint }} 點解鎖!</h4>
              <h4>您也可以 <a href="javascript:void(0)" style="color: var(--main-font)" @click="buyVIP()">訂閱月卡</a> 以瀏覽全部文章!</h4>
            </div>
          </div>
          <div>
            <button class="modal-button" @click="postPriceInfo.UserPoint >= postPriceInfo.PostPoint ? buyTopic() : alertNoMoney()">購買</button>
            <button class="modal-button" @click="showMessage = !showMessage">關閉</button>
          </div>
        </div>
      </template>
    </Modal>
    <Modal v-if="showAlert">
      <template v-slot>
        <div style="padding: 5px">
          <div>
            <h3>點數不足！是否前往儲值點數？</h3>
          </div>
          <div>
            <button class="modal-button" @click="router.push('/stored')">是</button>
            <button class="modal-button" @click="showAlert = !showAlert">否</button>
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, computed, nextTick, watch } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { ForumSettings } from "@/config/application/Forum";
import { ForumMessageSettings } from "@/config/application/ForumMessageSettings";
import { Heartbeat, Register, BuyArticle } from "@/api/forum";
import { GetMemberBalance, MemberArticle } from "@/api/payment";
// import { IWallet } from "@/type/Vuex";
import { SetHint } from "@/library/global/Hint"
import { IDict } from "@/type/Global";
import { Formatter } from "@/library/global/Formatter";
import { IPostBuyInfo, IReqBuyTopic } from "@/type/Forum";
import Modal from "@/components/global/modal/Modal.vue";
import { DateLibrary } from "@/library/global/Date";
import router from "@/router";
import { GetWallet } from "@/library/User/GetUserData";
export default defineComponent({
  components: {Modal},
  setup() {
    const store = useStore();
    const { t, te } = useI18n()
    const language = computed(() => { return store.getters["Global/GetLanguage"] })
    let serviceActive = ref<boolean>(false);
    let loading = ref<boolean>(false);
    let logining = ref<boolean>(false);
    let showMessage = ref<boolean>(false);
    let showAlert = ref<boolean>(false);
    let postPriceInfo = ref<IPostBuyInfo>({
      PostPoint: 0,
      UserPoint: 0,
      PostID: "",
      PostName: "",
      PostUrl: "",
    });
    let signinLoading = ref<boolean>(false);
    let forum = ref<string>("");
    let loginActive = computed(() => { return store.getters["User/GetStatus"] });
    let userInfo = computed(() => { return store.getters["User/GetUserInfo"] });
    let forumFrame = ref<HTMLIFrameElement>();
    let wallet = computed(() => store.getters["User/GetWallet"]);
    watch(
      () => {
        return loading.value;
      },
      () => {
        store.dispatch("Component/SetLoading", loading.value);
      }
    );
    watch(
      () => {
        return language.value;
      },
      () => {
        changeForumServiceLanguage();
      }
    );
    watch(
      () => {
        return loginActive.value;
      },
      () => {
        if (!loginActive.value) {
          requestMessage("logout", {});
          forum.value += "?foro=logout";
          loading.value = true;
        } else {
          initialize();
        }
      }
    );
    const forumServiceInitialize = async () => {
      signinLoading.value = true;
      loading.value = true;
      await Heartbeat().then((res) => {
        serviceActive.value = res.code == 10000;
      });
      if (serviceActive.value) {
        initialize();
      }
      signinLoading.value = false;
      loading.value = false;
    };
    const initialize = async () => {
      forum.value = `${ForumSettings.BaseUrl}`;
      if (loginActive.value) {
        await Register(userInfo.value.Account).then((res) => {
          if (res.code == 200) {
            // loading = true;
            forum.value = `${ForumSettings.BaseUrl}?forumsCode=${userInfo.value.Account}`;
            logining.value = true;
          }
        });
      }
      await nextTick();
      window.addEventListener("message", handleForumMessage);
    };
    const changeForumServiceLanguage = () => {
      const langMapping: IDict<string> = {
        "zh-TW": "zh-TW",
        "zh-CN": "zh-CN",
        "en-US": "en",
        "ja-JP": "ja",
        "th-TH": "th",
        "vi-VN": "vi",
      };
      let params = { Language: langMapping[language.value] };
      requestMessage("language", params);
    };
    const requestMessage = (
      cmd: string,
      params: IDict<IDict<string | number> | string | number>
    ) => {
      forumFrame.value?.contentWindow?.postMessage(
        {
          Cmd: cmd,
          Params: params,
        },
        location.href,
        undefined
      );
    };
    const handleForumMessage = async (event: MessageEvent) => {
      let forumServiceAction = ForumMessageSettings.Message[event.data.Cmd];
      if (forumServiceAction != undefined) {
        switch (forumServiceAction.type) {
          case "changeVuePage":
            if (forumServiceAction.event == "/login") {
              SetHint(t("Hint.Error"), t("Hint.PleaseLogin"), "error")
              store.dispatch("Component/SetSingin", {
                status: true,
                component: "Login",
              });
            } else {
              router.push(forumServiceAction.event);
            }
            break;
          case "changeForumsPage":
            forum.value = Formatter.NotNull(forumServiceAction.event)
              ? Formatter.NotNull(sessionStorage.getItem("forumsUrl") ?? "")
                ? sessionStorage.getItem("forumsUrl") ?? ""
                : forumServiceAction.event
              : event.data.Params.url;
            await nextTick();
            break;
          case "forumChangePage":
            if (!event.data.Params.url.includes("signin")) {
              loading.value = false;
              logining.value = false;
            }
            changeForumServiceLanguage();
            break;
          case "loadingStart":
            loading.value = true;
            if (event.data.Cmd == "loginLoading") {
              logining.value = true;
            }
            break;
          case "loginCheck":
            if (!loginActive.value) {
              SetHint(t("Hint.Error"), t("Hint.PleaseLogin"), "error")
              store.dispatch("Component/SetSingin", {
                status: true,
                component: "Login",
              });
            }
            break;
          case "destoryElement":
            if (event.data.Params.event == "login") {
              forumServiceInitialize();
            }
            break;
          case "gotoTopic":
            if (event.data.Params.price > 0) {
              if (loginActive.value) {
                checkBuyTopic(event.data.Params);
              } else {
                SetHint(t("Hint.Error"), t("Hint.PleaseLogin"), "error")
                store.dispatch("Component/SetSingin", { status: true, component: "Login" });
              }
            } else {
              requestMessage("gotoTopic", { url: event.data.Params.url });
            }
            break;
          case "getAuthKey":
            requestMessage("authKey", { authKey: userInfo.value.AuthKey });
        }
      }
    }
    const checkBuyTopic = async (params: any) => {
      await getMemberbalance();
      await GetWallet();
      let boughtTopic: IDict<string | number> = {};
      console.log(params);
      if (params.price > 0) {
        boughtTopic.authKey = userInfo.value.AuthKey;
        boughtTopic.p_id = params.topicID;
        boughtTopic.p_name = userInfo.value.Account;
        MemberArticle(boughtTopic).then(async (res) => {
          if (
            res.code == 10000 ||
            userInfo.value.Rank != 5 ||
            new Date(wallet.value.Subscriber).getTime() * 1000 >= new Date().getTime()
          ) {
            requestMessage("gotoTopic", { url: params.url });
          } else {
            // 詢問購買文章
            await GetWallet();
            postPriceInfo.value.PostPoint = Number(params.price);
            postPriceInfo.value.UserPoint = wallet.value.Point;
            postPriceInfo.value.PostID = `${params.topicID}`;
            postPriceInfo.value.PostID = `${params.topicID}`;
            postPriceInfo.value.PostUrl = `${params.url}`;
            showMessage.value = true;
          }
        });
      } else {
        requestMessage("gotoTopic", { url: params.url });
      }
    };
    const getMemberbalance = async () => {
      var wallet = await GetMemberBalance({ AuthKey: userInfo.value.AuthKey });
      wallet.subscribe = DateLibrary.UnixToDate(wallet.endTime);
      store.dispatch("User/SetWallet", wallet);
    };
    const buyTopic = async () => {
      let buyTopicData: IReqBuyTopic = {
        AuthKey: "",
        Account: "",
        PID: "",
        PName: "",
        Price: 0,
        Finger: ""
      };
      buyTopicData.AuthKey = userInfo.value.AuthKey;
      buyTopicData.Account = userInfo.value.Account;
      buyTopicData.PID = postPriceInfo.value.PostID;
      buyTopicData.PName = postPriceInfo.value.PostName;
      buyTopicData.Price = postPriceInfo.value.PostPoint
      buyTopicData.Finger = userInfo.value.Finger;
      if (postPriceInfo.value.UserPoint >= buyTopicData.Price) {
        await BuyArticle(buyTopicData).then(async (res) => {
          const response = res?.response
          const request = res?.request
          if (!response && !request && res) {
            if (res.code == 10000) {
              await getMemberbalance();
              await GetWallet();
              SetHint(t("Hint.BuySuccess"), `${t("Hint.YouLeftover")} ${wallet.value.Point} ${t("Hint.Point")}`, "success");
              requestMessage("gotoTopic", { url: postPriceInfo.value.PostUrl })
            } else SetHint(t("Hint.BuyFail"), te(`Msg.${res.code}`) ? t(`Msg.${res.code}`) : res.message, "error");
          } else SetHint(t("Hint.RequestFail"), t("Hint.ServerError"), "error")
        })
      } else SetHint(t("Hint.BuyFail"), t("Hint.PointInsufficient"), "error");
      showMessage.value = false;
    }
    const alertNoMoney = () => {
      showMessage.value = !showMessage.value;
      showAlert.value = !showAlert.value;
    }
    const buyVIP = () => {
      showMessage.value = !showMessage.value;
      store.dispatch("Component/SetSubscribe", true);
    }
    forumServiceInitialize();
    return {
      loading,
      logining,
      signinLoading,
      serviceActive,
      forumFrame,
      forum,
      postPriceInfo,
      showMessage,
      showAlert,
      router,
      buyVIP,
      buyTopic,
      alertNoMoney,
      checkBuyTopic,
    };
  },
});
</script>

<style lang="scss" scoped>
iframe {
  border: unset;
}
.forum-div {
  width: 100%;
  // height: calc(100vh - 430px);
  height: 100%;
  background-color: #222629;
  overflow: hidden;
  position: relative;
}
.Forum {
  width: 100%;
  position: absolute;
  top: 0px;
  height: 100%;
}
.loading {
  background: linear-gradient(
      1turn,
      rgba(34, 38, 41, 1),
      rgba(34, 38, 41, 0.1) 0.5%
    ),
    linear-gradient(0.25turn, rgba(34, 38, 41, 1), rgba(34, 38, 41, 0.1) 0.5%),
    linear-gradient(0.5turn, rgba(34, 38, 41, 1), rgba(34, 38, 41, 0.1) 0.5%),
    linear-gradient(0.75turn, rgba(34, 38, 41, 1), rgba(34, 38, 41, 0.1) 0.5%);
}
::v-deep .text-dark {
  color: #dedede !important;
}
</style>