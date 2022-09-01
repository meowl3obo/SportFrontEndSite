<template>
  <div class="change-content">
    <fieldset>
      <legend>{{ t("User.UserName") }}</legend>
      <input type="text" v-model="userName">
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
import { defineComponent, ref } from 'vue'
import { useStore } from "vuex"
import { useI18n } from "vue-i18n";
import { UpdateUserName } from "@/api/user"
import { IUserInfo } from "@/type/Vuex"
import { IUpdateNameData } from '@/type/User'
import { SetHint } from "@/library/global/Hint"

export default defineComponent({
  setup() {
    const store = useStore()
    const { t , te} = useI18n()
    const userName = ref<string>("");

    const serDefault = () => {
      const userInfo: IUserInfo = store.getters['User/GetUserInfo'] as IUserInfo
      userName.value = userInfo.Name
    }

    const submit = async () => {
      store.dispatch("Component/SetLoading", true)
      const userInfo: IUserInfo = store.getters['User/GetUserInfo'] as IUserInfo
      const finger: string = store.getters['User/GetFinger'] as string
      const updateData: IUpdateNameData = {
        username: userName.value,
        finger: finger,
        token: userInfo.Token
      }
      await UpdateUserName(updateData).then((res) => {
        const response = res?.response
        const request = res?.request
        if (!response && !request) {
          if (res.code == 10400) {
            SetHint(t("Hint.UpdateSuccess"), t("Hint.UpdateNameSuccess"), "success")
            userInfo.Name = userName.value
            store.dispatch("User/SetUserInfo", userInfo);
          }
          else SetHint(t("Hint.UpdateFail"), te(`Msg.${res.code}`) ? t(`Msg.${res.code}`) : res.message, "error")
        } else SetHint(t("Hint.UpdateFail"), t("Hint.ServerError"), "error")
      }).finally(() => {
        store.dispatch("Component/SetLoading", false)
      })
    }

    serDefault()

    return { t, userName, submit }
  },
})
</script>
