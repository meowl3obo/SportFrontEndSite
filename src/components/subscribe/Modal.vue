<template>
  <Modal @closeModal="close()">
    <template v-slot>
      <div class="modal">
        <div class="modal-title"><h2>{{ t("Subscribe.Subscribe") }}</h2></div>
        <div>
          <div class="sub-title">
            <h2>{{ t("Subscribe.ChoosePlan") }}</h2>
          </div>
          <div class="d-flex">
            <div class="wallet">
              {{ t("Subscribe.LeftoverPoint") }}：{{ wallet.Point }}
            </div>
          </div>
          <div class="d-flex justify-center">
            <div class="paln-start">{{ t("Subscribe.Choose") }}</div>
            <div class="paln">{{ t("Subscribe.Plan") }}</div>
            <div class="paln">{{ t("Subscribe.Point") }}</div>
          </div>
          <hr>
          <div v-for="(plan, index) in paymentPlan" :key="index" class="d-flex justify-center" @click="selectedPlan = plan.id">
            <div class="paln-start">
              <input type="radio" :checked="plan.id == selectedPlan">
            </div>
            <div class="paln">{{ plan.name }}</div>
            <div class="paln">{{ plan.price }}</div>
          </div>
          <div style="margin-top: 30px;" />
          <div class="next-btn-div">
            <button class="buy" @click="buy">{{ t("Subscribe.Buy") }}</button>
          </div>
        </div>
      </div>
    </template>
  </Modal>
</template>

<style lang="scss" scoped>
@import "@/styles/component/_payment.scss";
.modal {
  padding: 10px 20px;
}
.modal-title {
  text-align: left;

  h2 {
    margin: unset;
  }
}
</style>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { GetPaymentPlan, Subscribe } from "@/api/payment";
import { IUserInfo } from "@/type/Vuex"
import { IPaymentPlay, ISubscribeBody } from "@/type/Payment";
import { SetHint } from "@/library/global/Hint"
import { GetWallet } from "@/library/User/GetUserData"
// import { IWallet } from "@/type/Vuex"
export default defineComponent({
  setup() {
    const store = useStore();
    const { t, te } = useI18n()
    const user = computed(() => { return store.getters["User/GetUserInfo"] as IUserInfo })
    const finger = computed(() => { return store.getters["User/GetFinger"] })
    let wallet = computed(() => store.getters["User/GetWallet"]);
    let paymentPlan = ref<Array<IPaymentPlay>>([]);
    let selectedPlan = ref<number>(-1);
    const initialize = async () => {
      await GetPaymentPlan({type: "subscribe"}).then((res) => {
        paymentPlan.value = res;
      });
    }
    const buy = async () => {
      if (selectedPlan.value <= -1) {
        SetHint(t("Hint.SubscribeFail"), t("Hint.LeastOnePlan"), "error")
        return
      } 
      store.dispatch("Component/SetLoading", true)
      const targetPlan: IPaymentPlay = paymentPlan.value?.filter((plan: IPaymentPlay) => {return plan.id == selectedPlan.value})[0];
      const request: ISubscribeBody = {
        AuthKey: user.value.AuthKey,
        Account: user.value.Account,
        PlanID: targetPlan.id,
        Finger: finger.value,
      }
      await Subscribe(request).then((res) => {
      const response = res?.response
      const request = res?.request
      if (!response && !request && res) {
        if (res.code == 10000) {
          SetHint(t("Hint.SubscribeSuccess"), t("Hint.SubscribeSuccess"), "success")
          GetWallet()
          close()
        } else SetHint(t("Hint.SubscribeFail"), te(`Msg.${res.code}`) ? t(`Msg.${res.code}`) : res.message, "error")
      } else SetHint(t("Hint.SubscribeFail"), t("Hint.ServerError"), "error")
      }).finally(() => {
        store.dispatch("Component/SetLoading", false)
      })
    }

    const close = () => {
      store.dispatch("Component/SetSubscribe", false);
    };
    initialize();
    return { t, buy, close, wallet, paymentPlan, selectedPlan };
  },
});
</script>