<template>
  <div class="card">
    <h1>{{ t("Login.Register") }}</h1>
    <section>
      <div class="input-div">
        <input type="text" :placeholder="t('Login.UserName')" v-model="registerData.userName" />
      </div>
      <div class="input-div">
        <input type="text" :placeholder="t('Login.Mail')" v-model="registerData.account" />
      </div>
      <div class="input-div">
        <input type="password" :placeholder="t('Login.Password')" v-model="registerData.password" />
      </div>
      <div class="input-div">
        <input type="password" :placeholder="t('Login.Check')" v-model="registerData.checkPwd" />
      </div>
      <div class="button-div">
        <div>
          <span v-show="registerData.pwdError">{{ t("Login.NotSame") }}</span>
        </div>
        <button class="register-button" @click="register">{{ t("Login.Register") }}</button>
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
import { defineComponent, reactive, watch } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { Register } from "@/api/user"
import { IRegisterData } from "@/type/User";
import { SetHint } from "@/library/global/Hint"
export default defineComponent({
  setup() {
    const store = useStore();
    const { t, te } = useI18n()
    let registerData = reactive({} as IRegisterData);

    const login = () => {
      store.dispatch("Component/SetSingin", { status: true, component: "Login" });
    };

    const register = async () => {
      if (!registerData.userName || !registerData.account || !registerData.password) {
        SetHint(t("Hint.RegisterFail"), t("Hint.RegisterNull"), "error")
        return
      }
      if (registerData.pwdError) {
        SetHint(t("Hint.RegisterFail"), t("Hint.PasswordNotSame"), "error")
        return
      }
      store.dispatch("Component/SetLoading", true)
      await Register(registerData).then((res) => {
        const response = res?.response
        const request = res?.request
        if (!response && !request && res) {
          if (res.code == 10100) {
            SetHint(t("Hint.RegisterSuccess"), t("Hint.EmailGetLetter"), "success")
            login()
          } else SetHint(t("Hint.RegisterFail"), te(`Msg.${res.code}`) ? t(`Msg.${res.code}`) : res.message, "error")
        } else SetHint(t("Hint.RegisterFail"), t("Hint.ServerError"), "error")
      }).finally(() => {
        store.dispatch("Component/SetLoading", false)
      })
    }

    const checkPWD = () => {
      return registerData.password != registerData.checkPwd;
    };

    watch(registerData, () => {
      registerData.pwdError = checkPWD();
    });

    return { t, registerData, login, register };
  },
});
</script>