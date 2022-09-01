<template>
  <transition name="login">
    <Loading v-if="isLoading"/>
  </transition>
  <div @click="closeAll">
    <transition name="login">
      <div v-if="subscribeStatus">
        <Subscribe />
      </div>
    </transition>
    <transition name="login">
      <div v-if="singin.status">
        <ISingin />
      </div>
    </transition>
    <template v-for="(item, index) in hint" :key="`${item.id}`">
      <Hint :Title="item.title" :Message="item.message" :Hint="item.hint" class="hint" :style="`top: ${120 * index + 10}px`" />
    </template>
    <Header />
    <SideBar />
    <div style="margin-top: 80px; width: 100vw">
      <router-view />
      <Footer />
    </div>
    <Chat />
  </div>
</template>

<style lang="scss" scoped>
.hint {
  transition: all 0.2s ease;
}
</style>

<script lang="ts">
import { computed, defineComponent, defineAsyncComponent } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { CloseAll } from "@/library/global/Close"
import Finger from "@/library/global/Finger";
import { GetWallet } from "@/library/User/GetUserData"
import Cookies from "js-cookie";
export default defineComponent({
  components: {
    Subscribe: defineAsyncComponent(() => import("@/components/subscribe/Modal.vue")),
  },
  setup() {
    const store = useStore();
    const { t, locale } = useI18n()
    const singin = computed(() => { return store.getters["Component/GetSingin"] });
    const hint = computed(() => { return store.getters["Component/GetHint"] })
    const isLoading = computed(() => { return store.getters["Component/GetLoading"]})
    const subscribeStatus = computed(() => { return store.getters["Component/GetSubscribe"] })

    const setDefault = () => {
      const cookiesLang = Cookies.get("Language")
      if (cookiesLang) {
        locale.value = cookiesLang;
        store.dispatch("Global/SetLanguage", cookiesLang)
      }
    }

    const setWidth = () => {
      store.dispatch("Global/SetWidth", window.innerWidth);
    };

    const checkLogin = () => {
      const userInfoStr = Cookies.get("user");
      const walletInfoStr = Cookies.get("wallet");
      if (userInfoStr && walletInfoStr) {
        try {
          const userInfo = JSON.parse(userInfoStr);
          const wallet = JSON.parse(walletInfoStr);
          store.dispatch("User/SetUserFromCookies", { userInfo: userInfo, wallet: wallet, });
          store.dispatch("User/SetStatus", true);
        } catch {
          console.log("parse fail");
        }
        GetWallet()
      }
    };

    const closeAll = () => {
      CloseAll()
    }

    Finger.Create();
    window.addEventListener("resize", setWidth);

    setDefault()
    setWidth();
    checkLogin();

    return { closeAll, singin, hint, isLoading, subscribeStatus };
  },
});
</script>
