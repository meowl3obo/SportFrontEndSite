<template>
  <div class="step">
    <div class="step-title">
      <span :active="nowStep == 'option'" class="link" @click="toOption">{{ t("Stored.OptionStep") }}</span>
      <span :active="nowStep == 'method'">{{ t("Stored.MethodStep") }}</span>
      <span :active="nowStep == 'success'">{{ t("Stored.SuccessStep") }}</span>
    </div>
    <div class="step-content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@mixin triangle {
  &:before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    top: 50%;
    right: -9px;
    transform: translateY(-50%);
    border-width: 8px 0px 8px 10px;
    border-style: solid;
    border-color: transparent transparent transparent #fff;
  }
}
.step {
  margin-inline: auto;
  margin-top: 20px;
  width: 90%;

  .step-title {
    color: var(--main-font);
    font-size: 18px;
    padding-block: 5px;

    & > span {
      padding-inline: 7px;
      &[active='true'] {
        background-color: var(--main-color);
        border-radius: 5px;
        &:before {
          border-color: transparent transparent transparent var(--main-color) !important;
          border-width: 11px 0px 11px 10px !important;
        }
      }
    }
    & > span:nth-child(1) {
      position: relative;
      @include triangle
    }
    & > span:nth-child(2) {
      position: relative;
      margin-left: 12px;
      @include triangle
    }
    & > span:nth-child(3) {
      margin-left: 12px;
    }
  }
  .step-content {
    color: var(--main-font);
  }
}
.link {
  cursor: pointer;
}
</style>

<script lang="ts">
import { defineComponent, Ref, toRefs } from 'vue'
import { useI18n } from "vue-i18n";

export default defineComponent({
  props: {
    NowStep: String
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const nowStep = toRefs(props).NowStep as Ref<string>

    const toOption = () => {
      if (nowStep.value != 'option') emit("next", "option")
    }

    return { nowStep, t, toOption }
  },
})
</script>
