<template>
  <div class="content">
    <Step :NowStep="nowStep" @next="next">
      <template v-slot>
        <div class="stored-content">
          <Option v-if="nowStep == 'option'" :Plan="paymentPlan" @next="next" />
          <Method v-if="nowStep == 'method'" :Methods="methods" @next="next" />
          <Success v-if="nowStep == 'success'" />
        </div>
      </template>
    </Step>
  </div>
</template>

<style lang="scss" scoped>
.content {
  width: 100%;
  min-height: calc(100vh - 205px);
}
.stored-content {
  padding-inline: 5px;
}
</style>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref, computed } from 'vue'
import { useStore } from "vuex"
import { useI18n } from "vue-i18n";
import { GetPaymentPlan, StoredValue } from "@/api/payment"
import { IPaymentPlay, IPaymentPlanQuery, IChannel, IStoredBody } from "@/type/Payment"
import { SetHint } from "@/library/global/Hint"
import { GetWallet } from "@/library/User/GetUserData"

export default defineComponent({
  components: {
    Step: defineAsyncComponent(() => import("@/components/stored/ui/Step.vue")),
    Option: defineAsyncComponent(() => import("@/components/stored/page/Option.vue")),
    Method: defineAsyncComponent(() => import("@/components/stored/page/Method.vue")),
    Success: defineAsyncComponent(() => import("@/components/stored/page/Success.vue")),
  },
  setup() {
    const store = useStore()
    const { t, te } = useI18n()
    const user = computed(() => { return store.getters["User/GetUserInfo"] })
    const finger = computed(() => { return store.getters["User/GetFinger"] })
    const nowStep = ref<string>("option")
    const paymentPlan = ref<Array<IPaymentPlay>>([])
    const methods = ref<Array<IChannel>>([])
    const planID = ref<number | null>(null)
    const methodID = ref<number | null>(null)

    const next = (nextStep: string, id: number) => {
      if (nextStep == 'success') {
        methodID.value = id
        stored()
        return
      } else if (nextStep == 'method') {
        const plan = paymentPlan.value.filter(x => x.id == id)[0]
        planID.value = plan.id
        methods.value = plan.channel
      }
      nowStep.value = nextStep
    }

    const getPaymentPlan = async () => {
      store.dispatch("Component/SetLoading", true)
      const query: IPaymentPlanQuery = { type: "point" }
      await GetPaymentPlan(query).then((res) => {
        const response = res?.response
        const request = res?.request
        if (!response && !request && res) {
          paymentPlan.value = res
        }
      }).finally(() => {
        store.dispatch("Component/SetLoading", false)
      })
    }

    const stored = async () => {
      store.dispatch("Component/SetLoading", true)
      const request: IStoredBody = {
        AuthKey: user.value.AuthKey,
        Account: user.value.Account,
        PlanID: planID.value as number,
        ChannelID: methodID.value as number,
        Finger: finger.value,
      }
      await StoredValue(request).then((res) => {
        const response = res?.response
        const request = res?.request
        if (!response && !request && res) {
          if (res.code == 10000) {
            nowStep.value = "success"
            GetWallet()
          }
          else SetHint(t("Hint.StoredFail"), te(`Msg.${res.code}`) ? t(`Msg.${res.code}`) : res.message, "error")
        } else SetHint(t("Hint.StoredFail"), t("Hint.ServerError"), "error")
      }).finally(() => {
        store.dispatch("Component/SetLoading", false)
      })
    }

    getPaymentPlan()

    return { nowStep, paymentPlan, methods, next }
  },
})
</script>
