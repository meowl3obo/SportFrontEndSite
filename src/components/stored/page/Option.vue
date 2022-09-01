<template>
  <div>
    <Table :Thead="StoredOption" :Tbody="paymentPlan">
      <template v-slot:th_name="{ data }">
        <div>{{ t(data) }}</div>
      </template>
      <template v-slot:th_point="{ data }">
        <div>{{ t(data) }}</div>
      </template>
      <template v-slot:th_price="{ data }">
        <div>{{ t(data) }}</div>
      </template>
      <template v-slot:th_endTime="{ data }">
        <div>{{ t(data) }}</div>
      </template>
      <template v-slot:body_radio="{ body }">
        <td width="18">
          <input type="radio" name="option" :value="body.id" v-model="choosePlan">
        </td>
      </template>
      <template v-slot:td_name="{ data, body }">
        <div @click="choose(body.id)">{{ data }}</div>
      </template>
      <template v-slot:td_point="{ body }">
        <div @click="choose(body.id)">{{ body.value }}</div>
      </template>
      <template v-slot:td_price="{ data, body }">
        <div @click="choose(body.id)">{{ data }}</div>
      </template>
      <template v-slot:td_endTime="{ data, body }">
        <div @click="choose(body.id)">{{ UnixToDate(data) }}</div>
      </template>
    </Table>
    <div class="next-btn-div">
      <button @click="nextStep" :disabled="choosePlan == null">{{ t("Stored.NextStep") }}</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.next-btn-div {
  text-align: right;
  button {
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

    &:disabled {
      background-color: var(--disabled-color) !important;
      color: var(--minor-font) !important;
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, PropType, toRefs, Ref, ref, onMounted, watch } from 'vue'
import { useI18n } from "vue-i18n";
import { IPaymentPlay } from '@/type/Payment'
import { StoredOption } from "@/config/application/Thead"
import { UnixToDate } from "@/library/global/Unix"

export default defineComponent({
  props: {
    Plan: Array as PropType<Array<IPaymentPlay>>
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const paymentPlan = toRefs(props).Plan as Ref<Array<IPaymentPlay>>
    const choosePlan = ref<number | null>(null)

    const setDefault = () => {
      if (paymentPlan.value.length > 0) choosePlan.value = paymentPlan.value[0].id
    }

    const choose = (id: number) => {
      choosePlan.value = id
    }

    const nextStep = () => {
      emit("next", "method", choosePlan.value)
    }

    onMounted(() => {
      setDefault()
    })
    
    watch(
      () => { return paymentPlan.value },
      () => { setDefault() }
    )

    return { StoredOption, UnixToDate, t, paymentPlan, choosePlan, nextStep, choose }
  },
})
</script>
