<template>
  <div class="card">
    <h1>{{ t("Login.Forget") }}</h1>
    <section>
      <div class="input-div">
        <input type="text" v-model="forgetData.account" :placeholder="t('Login.Mail')" />
      </div>
      <div class="button-div">
        <div/>
        <button class="register-button" @click="request">{{ t("Login.Submit") }}</button>
      </div>
    </section>
    <hr />
    <section>
      <div class="have-account">
        <span>{{ t("Login.Have") }}? </span>
        <span @click="login()"> {{ t("Login.Sign") }}</span>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/component/_login.scss";
.button-div span {
  cursor: default;
}
.have-account {
  text-align: center;
  color: #dedede;
  font-size: 12px;

  & span:nth-child(2) {
    cursor: pointer;
  }
}
</style>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'
import { useStore } from "vuex"
import { useI18n } from "vue-i18n";
import { ForgetPassword } from "@/api/user"
import { IForgetData } from "@/type/User"
import { SetHint } from "@/library/global/Hint"

export default defineComponent({
  setup() {
    const store = useStore()
    const { t, te } = useI18n()
    const finger = computed(() => store.getters["User/GetFinger"])
    const forgetData = reactive({} as IForgetData);

    const login = () => {
      store.dispatch("Component/SetSingin", {status: true, component: "Login"})
    }

    const request = async () => {
      forgetData.finger = finger.value
      if (!forgetData.account) {
        SetHint(t("Hint.RequestFail"), t("Hint.VerifyNull"), "error")
        return
      }
      store.dispatch("Component/SetLoading", true)
      await ForgetPassword(forgetData).then((res) => {
        const response = res?.response
        const request = res?.request
        if (!response && !request && res) {
          if (res.code == 10300) {
            SetHint(t("Hint.RequestSuccess"), t("Hint.EmailGetLetter"), "success")
            login()
          } else SetHint(t("Hint.RequestFail"), te(`Msg.${res.code}`) ? t(`Msg.${res.code}`) : res.message, "error")
        } else SetHint(t("Hint.RequestFail"), t("Hint.ServerError"), "error")
      }).finally(() => {
        store.dispatch("Component/SetLoading", false)
      })
    }

    return { login, t, forgetData, request }
  }
})
</script>