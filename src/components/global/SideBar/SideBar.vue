<template>
  <div>
    <div v-if="SideBar" class="backdrop" @click="controlSideBar(false)" />
    <div class="sidebar" :open="SideBar">
      <div class="login side-item">
        <h3 v-if="!Status" @click="login">Login</h3>
        <div v-else>
          <div class="user">
            <h3 >{{ User.Name }}</h3>
            <div class="logout" @click="Logout"><icon :icon="['fas', 'right-from-bracket']" /></div>
          </div>
          <div class="wallet">
            <div @click.stop="toStored"><icon :icon="['fas', 'coins']" class="fa-lg" /> {{ Wallet.Point }}</div>
            <div @click.stop="subscribe"><icon :icon="['fas', 'crown']" class="fa-lg" /> {{ Wallet.Subscriber }}</div>
          </div>
        </div>
      </div>
      <hr />
      <div v-if="Status" v-collapse="'user'" class="side-item dropdown">
        <h4>{{ t("Header.User") }}</h4>
        <icon id="icon_user" :icon="['fas', 'angle-down']" class="fa-lg" />
      </div>
      <div id="col_user" class="collapse sub-site-item">
        <div v-for="item in UserControl" :key="item" @click="uesrControl(item.link)">
          {{ t(item.name) }}
        </div>
      </div>
      <div class="side-item" @click="toDoc('BestExperts')"><h4>{{ t("Header.BestExperts") }}</h4></div>
      <div class="side-item" @click="toDoc('BestDeals')"><h4>{{ t("Header.BestDeals") }}</h4></div>
      <div class="side-item" @click="toDoc('Promotions')"><h4>{{ t("Header.Promotions") }}</h4></div>
      <div v-collapse="'feeback'" class="side-item dropdown">
        <h4>{{ t("Header.Feeback") }}</h4>
        <icon id="icon_feeback" :icon="['fas', 'angle-down']" class="fa-lg" />
      </div>
      <div id="col_feeback" class="collapse sub-site-item">
        <div v-for="item in Object.keys(HeaderControl['Feeback'])" :key="item" @click="clickSubItem(HeaderControl['Feeback'][item], 'Feeback')">
          {{ t(`Header.${item}`) }}
        </div>
      </div>
      <div v-collapse="'customer'" class="side-item dropdown">
        <h4>{{ t("Header.Customer") }}</h4>
        <icon id="icon_customer" :icon="['fas', 'angle-down']" class="fa-lg" />
      </div>
      <div id="col_customer" class="collapse sub-site-item">
        <div v-for="item in Object.keys(HeaderControl['Customer'])" :key="item" @click="clickSubItem(HeaderControl['Customer'][item], 'Customer')">
          {{ t(`Header.${item}`) }}
        </div>
      </div>
      <div v-collapse="'language'" class="side-item dropdown">
        <h4>{{ t("Header.Language") }}</h4>
        <icon id="icon_language" :icon="['fas', 'angle-down']" class="fa-lg" />
      </div>
      <div id="col_language" class="collapse sub-site-item">
        <div v-for="item in Object.keys(HeaderControl['Language'])" :key="item" @click="clickSubItem(HeaderControl['Language'][item], 'Language')">
            {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.backdrop {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #0f111070;
  z-index: 1;
}
.sidebar {
  position: fixed;
  height: calc(100vh - 80px);
  width: 250px;
  left: -250px;
  background-color: #0f1110;
  z-index: 1;
  overflow-y: auto;
  transition: left 0.25s ease;

  .side-item {
    display: flex;
    color: #dedede;
    padding-inline: 15px;
    align-items: center;
    h3,
    h4 {
      margin-block: 10px;
      text-align: left;
    }
  }
  .sub-site-item {
    color: var(--main-font);
    & > div {
      padding: 2px 20px;
    }
  }
  hr {
    width: calc(100% - 20px);
    opacity: 0.8;
  }
  .dropdown {
    justify-content: space-between;
  }
}
.login {
  & > div {
    width: 100%;
  }
}
.sidebar[open="true"] {
  left: 0px;
}
.user {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logout {
  padding: 5px;
}
.wallet {
  display: flex;
  div {
    min-width: 30%;
    font-size: 12px;
    &:nth-child(2) {
      padding-left: 3px;
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n";
import Cookies from "js-cookie";
import { IUserInfo } from "@/type/Vuex"
import { HeaderControl, UserControl } from "@/config/application/HeaderControl";
import Logout from '@/library/global/Logout'
export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter()
    const { t, locale } = useI18n()
    const Status = computed(() => store.getters['User/GetStatus'])
    const User = computed(() => store.getters['User/GetUserInfo'] as IUserInfo)
    const Wallet = computed(() => store.getters['User/GetWallet'])
    const SideBar = computed(() => store.getters['Component/GetSideBar'])
    const Width = computed(() => store.getters['Global/GetWidth'])

    const controlSideBar = (status: boolean) => {
      store.dispatch("Component/SetSideBar", status)
    }
    const login = () => {
      controlSideBar(false)
      store.dispatch("Component/SetSingin", {status: true, component: "Login"})
    };

    const clickSubItem = (event: string, currentControl: string) => {
      switch (currentControl) {
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
    
      store.dispatch("Component/SetSideBar", false)
    }

    const uesrControl = (action: string) => {
      if (action == 'LogOut') Logout()
      else router.push(action)
      
      store.dispatch("Component/SetSideBar", false)
    }

    const toStored = () => {
      store.dispatch("Component/SetSideBar", false)
      router.push("/stored")
    }

    const subscribe = () => {
      store.dispatch("Component/SetSideBar", false)
      store.dispatch("Component/SetSubscribe", true)
    }

    const toDoc = (link: string) => {
      router.push(`/docs/${link}`)
      store.dispatch("Component/SetSideBar", false)
    }

    watch(
      () => { return Width },
      () => { if (Width.value > 868) controlSideBar(false) }
    )

    return { HeaderControl, UserControl, t, SideBar, Status, User, Wallet, toDoc, controlSideBar, login, Logout, clickSubItem, uesrControl, toStored, subscribe }
  }
})
</script>