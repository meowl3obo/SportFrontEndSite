<template>
  <div class="verify-content">
    <div v-if="nowStatus == 'waiting'" style="text-align: center">
      <icon :icon="['fas', 'rotate']" class="fa-7x wait" />
      <h2>驗證中，請稍後</h2>
    </div>
    <div v-else-if="nowStatus == 'success'" style="text-align: center">
      <icon :icon="['far', 'check-circle']" class="fa-7x success" />
      <h2>驗證成功</h2>
      <button class="tohome-btn" @click="toHome">回主頁</button>
    </div>
    <div v-else-if="nowStatus == 'error'" style="text-align: center">
      <icon :icon="['fas', 'xmark']" class="fa-7x error" />
      <h2>驗證失敗</h2>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.verify-content {
  display: block;

  & h2 {
    color: var(--main-font);
  }

  & .success {
    color: var(--hint-success);
  }
  & .error {
    color: var(--hint-danger);
  }
  & .wait {
    color: var(--hint-warning);
    animation: rotate 5s linear infinite;
  }
}
.tohome-btn {
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid var(--minor-border);
  background-color: transparent;
  color: var(--minor-font);
  font-weight: bold;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--main-color);
    color: var(--bg-color);
  }
}
@keyframes rotate {
  0% {
    transform: rotateZ(0);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
</style>

<script lang="ts">
import { computed, defineComponent, ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { IVerifyData } from "@/type/User";
import { Validate } from "@/api/user";
import { SetHint } from "@/library/global/Hint";

export default defineComponent({
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const { t, te } = useI18n()
    const finger = computed(() => store.getters["User/GetFinger"]);
    const nowStatus = ref<string>("waiting");
    const query = computed(() => { return route.query; });
    const token = ref<string>("");
    const email = ref<string>("");
    const verifyData = reactive({} as IVerifyData);

    const setDefault = () => {
      token.value = query.value.itoken as string;
      email.value = query.value.iemail as string;

      verifyData.authKey = token.value;
      verifyData.account = email.value;
      verifyData.finger = finger.value;

      verify();
    };

    const verify = async () => {
      if (!token.value || !email.value) {
        SetHint(t("Hint.VerifyFailed"), t("Hint.CallManger"), "error");
        nowStatus.value = "error";
        return;
      }
      store.dispatch("Component/SetLoading", true)
      await Validate(verifyData).then((res) => {
        const response = res?.response;
        const request = res?.request;
        if (!response && !request && res) {
          if (res.code == 10000) {
            SetHint(t("Hint.VerifySuccess"), t("Hint.AccountVerifySuccess"), "success");
            nowStatus.value = "success";
          } else {
            SetHint(t("Hint.VerifyFailed"), te(`Msg.${res.code}`) ? t(`Msg.${res.code}`) : res.message, "error");
            nowStatus.value = "error";
          }
        } else {
          SetHint(t("Hint.VerifyFailed"), t("Hint.ServerError"), "error");
          nowStatus.value = "error";
        }
      }).finally(() => {
        store.dispatch("Component/SetLoading", false)
      });
    };

    const toHome = () => {
      router.push("/")
    }

    setDefault();

    return { nowStatus, toHome };
  },
});
</script>
