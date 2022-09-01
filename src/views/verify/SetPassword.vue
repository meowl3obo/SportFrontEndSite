<template>
  <div>
    <fieldset>
      <legend>{{ t("User.NewPassword") }}</legend>
        <input type="password" v-model="password" autocomplete="false">
      <div />
    </fieldset>
    <fieldset>
      <legend>{{ t("User.CheckPassword") }}</legend>
        <input type="password" v-model="checkPassword" autocomplete="false">
      <div />
    </fieldset>
    <div class="submit-div">
      <button @click="submit">{{ t("User.Submit") }}</button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.change-content {
  padding-inline: 20px;
}
fieldset {
  position: relative;
  margin-top: 10px;
  padding: unset;
  border-color: transparent;
  legend {
    margin-left: 20px;
    padding-inline: 10px;
    color: var(--main-font);
    background-color: var(--bg-color);
  }
  input {
    width: calc(100% - 40px);
    height: 24px;
    background-color: transparent;
    color: var(--main-font);
    border: unset;
    outline: unset;
    font-size: 16px;
    padding-inline: 20px;

    &:focus ~ div {
      border: 2px solid var(--input-border);
    }
  }
  & > div {
    height: calc(100% + 12px);
    width: 100%;
    position: absolute;
    top: -12px;
    left: 0;
    border: 2px solid var(--white-border);
    z-index: -1;
    transition: all 0.2s ease;
  }
}
.submit-div {
  margin-top: 20px;
  padding-inline: 20px;
  text-align: right;
  button {
    border: 2px solid var(--white-border);
    background-color: transparent;
    color: var(--main-font);
    padding: 4px 10px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: var(--input-border);
      background-color: var(--input-border);
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, ref, computed, reactive } from 'vue'
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { SetNewPassword } from "@/api/user"
import { ISetNewPasswordData } from "@/type/User"
import { SetHint } from "@/library/global/Hint"

export default defineComponent({
  setup() {
    const { t, te } = useI18n()
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const finger = computed(() => store.getters["User/GetFinger"]);
    const password = ref<string>("")
    const checkPassword = ref<string>("")
    const query = computed(() => { return route.query; });
    const token = ref<string>("");
    const email = ref<string>("");
    const passwordData = reactive({} as ISetNewPasswordData);

    const setDefault = () => {
      token.value = query.value.itoken as string;
      email.value = query.value.iemail as string;

      passwordData.authKey = token.value;
      passwordData.account = email.value;
      passwordData.finger = finger.value;

      console.log(finger.value);
    };

    const submit = async () => {
      if (password.value != checkPassword.value) {
        SetHint(t("Hint.UpdateFail"), t("Hint.PasswordNotSame"), "error")
        return
      }
      store.dispatch("Component/SetLoading", true)
      passwordData.password = password.value
      await SetNewPassword(passwordData).then((res) => {
        const response = res?.response;
        const request = res?.request;
        if (!response && !request && res) {
          console.log(res);
          if (res.code == 10310) {
            SetHint(t("Hint.UpdateSuccess"), t("Hint.UpdatePasswordSuccess"), "success");
            store.dispatch("Component/SetSingin", { status: true, component: "Login" });
            router.push("/")
          } else SetHint(t("Hint.UpdateFail"), te(`Msg.${res.code}`) ? t(`Msg.${res.code}`) : res.message, "error");
        } else SetHint(t("Hint.UpdateFail"), t("Hint.ServerError"), "error");
      }).finally(() => {
        store.dispatch("Component/SetLoading", false)
      })
    }

    setDefault()
    
    return { t, password, checkPassword, submit }
  },
})
</script>
