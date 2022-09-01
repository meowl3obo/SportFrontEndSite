<template>
  <div>
    <Table :Thead="StoredMethod" :Tbody="methods">
      <template v-slot:th_name="{ data }">
        <div>{{ t(data) }}</div>
      </template>
      <template v-slot:body_radio="{ body }">
        <td width="18">
          <input type="radio" name="option" :value="body.id" v-model="chooseMethod">
        </td>
      </template>
      <template v-slot:td_name="{ data, body }">
        <div @click="choose(body.id)">{{ data }}</div>
      </template>
    </Table>
    <div class="next-btn-div">
      <button @click="nextStep" :disabled="chooseMethod == null">{{ t("Stored.NextStep") }}</button>
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
import { defineComponent, PropType, Ref, toRefs, ref, onMounted, watch } from 'vue'
import { useI18n } from "vue-i18n";
import { StoredMethod } from "@/config/application/Thead"
import { IChannel } from "@/type/Payment"

export default defineComponent({
  props: {
    Methods: Array as PropType<Array<IChannel>>
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const methods = toRefs(props).Methods as Ref<Array<IChannel>>
    const chooseMethod = ref<number | null>(null)

    const setDefault = () => {
      if (methods.value.length > 0) chooseMethod.value = methods.value[0].id
    }

    const choose = (id: number) => {
      chooseMethod.value = id
    }

    const nextStep = () => {
      emit("next", "success", chooseMethod.value)
    }

    onMounted(() => {
      setDefault()
    })
    
    watch(
      () => { return methods.value },
      () => { setDefault() }
    )

    return { StoredMethod, t, methods, chooseMethod, choose, nextStep }
  },
})
</script>