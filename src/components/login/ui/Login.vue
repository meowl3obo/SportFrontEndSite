<template>
  <div class="card">
    <h1>{{ t("Login.Login") }}</h1>
    <section>
      <div class="input-div">
        <input type="text" :placeholder="t('Login.Mail')" v-model="loginData.account" />
      </div>
      <div class="input-div">
        <input type="password" :placeholder="t('Login.Password')" v-model="loginData.password" />
      </div>
      <div class="button-div">
        <div>
          <span @click="register()">{{ t("Login.Register") }}</span>
          <span @click="forget()">{{ t("Login.Forget") }}?</span>
        </div>
        <button class="login-button" @click="login()">{{ t("Login.Login") }}</button>
      </div>
    </section>
    <hr />
    <section>
      <div class="third-login">
        <button class="g-signin-button" @click="loginGoogle">Google</button>
        <button class="fb-signin-button" @click="loginFacebook">Facebook</button>
        <!-- <button class="twitter-signin-button">Twitter</button> -->
        <button class="discord-signin-button" @click="loginDiscord">Discord</button>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/component/_login.scss";
.card {
  // width: 450px;
  width: 340px;
}
</style>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import { useStore } from "vuex"
import { useI18n } from "vue-i18n";
import { Login, LoginForSite } from "@/api/user"
import { ILoginData } from "@/type/User"
import { SetHint } from "@/library/global/Hint"
import { GoogleSdk } from "@/library/Login/Google"
import { FacebookSdk } from "@/library/Login/Facebook"
import { DiscordSdk } from "@/library/Login/Discord"
import { GetWallet } from "@/library/User/GetUserData"
export default defineComponent({
  setup() {
    const store = useStore()
    const { t, te } = useI18n()
    const finger = computed(() => store.getters["User/GetFinger"])
    let loginData = reactive({} as ILoginData)

    const register = () => {
      store.dispatch("Component/SetSingin", {status: true, component: "Register"})
    }
    const forget = () => {
      store.dispatch("Component/SetSingin", {status: true, component: "Forget"})
    }
    const login = async () => {
      store.dispatch("Component/SetLoading", true)
      if (!loginData.account || !loginData.password) {
        SetHint(t("Hint.LoginFail"), t("Hint.APNull"), "error")
        store.dispatch("Component/SetLoading", false)
        return
      }
      loginData.finger = finger.value
      await Login(loginData).then((res) => {
        loginResponse(res)
      }).finally(() => {
        store.dispatch("Component/SetLoading", false)
      })
    }

    const loginGoogle = async () => {
      await GoogleSdk.Login().then(async (loginData) => {
        if (loginData) await LoginForSite(loginData).then((res) => { loginResponse(res) })
        else SetHint(t("Hint.VerifyFailed"), t("Hint.ThirdVerifyFailed"), "error")
      }).finally(() => {
        store.dispatch("Component/SetLoading", false)
      })
    }

    const loginFacebook = async () => {
      await FacebookSdk.Login().then(async (userProfile) => {
        if (userProfile) await LoginForSite(userProfile).then((res) => { loginResponse(res) })
        else SetHint(t("Hint.VerifyFailed"), t("Hint.ThirdVerifyFailed"), "error")
      }).finally(() => {
        store.dispatch("Component/SetLoading", false)
      });
    }

    const loginDiscord = async () => {
      await DiscordSdk.Login().then(async (loginData) => {
        if (loginData) await LoginForSite(loginData).then((res) => { loginResponse(res) })
        else SetHint(t("Hint.VerifyFailed"), t("Hint.ThirdVerifyFailed"), "error")
      }).finally(() => {
        store.dispatch("Component/SetLoading", false)
      });
    }

    const loginResponse = (res: any) => {
      const response = res?.response
      const request = res?.request
      if (!response && !request && res) {
        if (res?.code == 10200) {
          store.dispatch("User/SetUser", res)
          store.dispatch("User/SetStatus", true)
          store.dispatch("Component/CloseSingin", false)
          GetWallet()
          SetHint(t("Hint.LoginSuccess"), t("Hint.Welcome"), "success")
        } else SetHint(t("Hint.LoginFail"), te(`Msg.${res.code}`) ? t(`Msg.${res.code}`) : res.message, "error")
      } else SetHint(t("Hint.LoginFail"), t("Hint.ServerError"), "error")
    }

    return { t, loginData, register, forget, login, loginGoogle, loginFacebook, loginDiscord };
  },
});
</script>