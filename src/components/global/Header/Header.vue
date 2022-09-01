<template>
  <div>
    <div class="header">
      <div class="sidbar-control" @click="controlSideBar(!SideBar)">
        <icon :icon="['fas', 'align-justify']" class="fa-lg" />
      </div>
      <div class="title">
        <h2 @click="toHome">
          <img :src="titleLogo" alt="正邦">
        </h2>
      </div>
      <div class="control">
        <div @click="router.push('/docs/BestExperts')">{{ t("Header.BestExperts") }}</div>
        <span>|</span>
        <div @click="router.push('/docs/BestDeals')">{{ t("Header.BestDeals") }}</div>
        <span>|</span>
        <div @click="router.push('/docs/Promotions')">{{ t("Header.Promotions") }}</div>
        <span>|</span>
        <div @click.stop="openSubControl('Feeback')">{{ t("Header.Feeback") }}</div>
        <span>|</span>
        <div @click.stop="openSubControl('Customer')">{{ t("Header.Customer") }}</div>
        <span>|</span>
        <div @click.stop="openSubControl('Language')">{{ t("Header.Language") }}</div>
      </div>
      <div class="login-content">
        <h2 v-if="!Status" class="login" @click="login()">{{ t("Header.Login") }}</h2>
        <h2 v-else class="user" @click.stop="controlUser(!showUser)">
          {{ User.Name }} <icon :icon="['fas', 'caret-down']" class="fa-xs" />
        </h2>
      </div>
    </div>
    <transition name="sub">
      <div v-if="show" class="sub-control" @click.stop="">
        <div class="control-content">
          <div v-for="item in Object.keys(HeaderControl[currentControl])" :key="item" @click="clickSubItem(HeaderControl[currentControl][item])">
            <span v-if="currentControl != 'Language'">{{ t(`Header.${item}`) }}</span>
            <span v-else>{{ item }}</span>
          </div>
        </div>
        <div class="close">
          <span @click="closeSubControl()">✕</span>
        </div>
      </div>
    </transition>
    <transition name="usercontrol">
      <div v-if="showUser" class="user-control" @click.stop="">
        <div class="control-content">
          <div class="wallet">
            <div class="uesr-link" title="儲值點數" @click.stop="toStored"><icon :icon="['fas', 'coins']" class="fa-lg" /> {{ Wallet.Point }}</div>
            <div class="uesr-link" title="訂閱會員" @click.stop="subscribe"><icon :icon="['fas', 'crown']" class="fa-lg" /> {{ Wallet.EndTime == 0 ? t("User.NotSubscriber") : Wallet.Subscriber }}</div>
          </div>
          <hr />
          <div v-for="item in UserControl" :key="item.key" class="uesr-link" @click="uesrControl(item.link)">
            {{ t(item.name) }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/component/_header.scss";
</style>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { useStore } from "vuex"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n";
import Cookies from "js-cookie";
import { IUserInfo } from "@/type/Vuex"
import { HeaderControl, UserControl } from "@/config/application/HeaderControl";
import { CloseAll } from "@/library/global/Close"
import mitt from "@/library/global/Mitt"
import Logout from '@/library/global/Logout'
export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const { t, locale } = useI18n()
    const Status = computed(() => store.getters['User/GetStatus'])
    const User = computed(() => store.getters['User/GetUserInfo'] as IUserInfo)
    const Wallet = computed(() => store.getters['User/GetWallet'])
    const SideBar = computed(() => store.getters['Component/GetSideBar'])
    const Width = computed(() => store.getters["Global/GetWidth"]);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const titleLogo = require("@/assets/title.webp");
    
    let show = ref<boolean>(false);
    let showUser = ref<boolean>(false);
    let currentControl = ref<string>("");

    const openSubControl = (control: string) => {
      if (control == currentControl.value) {
        closeSubControl();
      } else {
        show.value = true;
        currentControl.value = control;
      }
      CloseAll("HeadControl")
    };
    const closeSubControl = () => {
      show.value = false;
      currentControl.value = "";
    };
    const login = () => {
      store.dispatch("Component/SetSingin", {status: true, component: "Login"})
    };

    const controlSideBar = (status: boolean) => {
      store.dispatch("Component/SetSideBar", status)
    }

    const controlUser = (status: boolean) => {
      CloseAll("UserControl")
      showUser.value = status
    }

    const logout = () => {
      controlUser(false)
      Logout()
    }

    const clickSubItem = (event: string) => {
      switch (currentControl.value) {
        case "Language":
          locale.value = event;
          store.dispatch("Global/SetLanguage", event)
          Cookies.set("Language", event)
          break;
        case "Customer":
          if (event) {
            router.push(`/docs/${event}`);
          }
          // console.log(`link: ${event}`);
          break;
        case "Feeback":
          if (event) {
            router.push(`/docs/${event}`);
          }
          // console.log(`link: ${event}`);
          break;
      }
      show.value = false
      currentControl.value = "";
    }

    const uesrControl = (action: string) => {
      controlUser(false)
      if (action == 'LogOut') logout()
      else router.push(action)
    }

    const toHome = () => {
      router.push("/")
    }

    const toStored = () => {
      controlUser(false)
      router.push("/stored")
    }

    const subscribe = () => {
      controlUser(false)
      store.dispatch("Component/SetSubscribe", true)
    }

    mitt.on("closeHeadControl", () => { closeSubControl() })
    mitt.on("closeUserControl", () => { showUser.value = false })

    watch(
      () => { return Status },
      () => { console.log(Status) }
    )

    watch(
      () => { return Width.value },
      () => { 
        if (Width.value < 868) closeSubControl()
        else controlSideBar(false)
      }
    )

    return { HeaderControl, UserControl, CloseAll, Status, User, Wallet, SideBar, t, locale, titleLogo, show, showUser, currentControl, router, subscribe, openSubControl, closeSubControl, login, controlSideBar, controlUser, logout, clickSubItem, uesrControl, toHome, toStored };
  },
});
</script>