<template>
  <div class="control-bar">
    <div class="link" :active="nowPage == 'username'" @click="changePage('username')">{{ t("User.ChangeUserName") }}</div>
    <span>|</span>
    <div class="link" :active="nowPage == 'password'" @click="changePage('password')">{{ t("User.ChangePassword") }}</div>
  </div>
</template>

<style lang="scss" scoped>
.control-bar {
  position: relative;
  display: flex;
  align-items: center;
  width: calc(100% - 40px);
  height: 40px;
  background-color: var(--minor-color);
  color: var(--main-font);
  margin-top: 20px;
  padding-inline: 20px;

  & > span {
    padding-inline: 10px;
  }

  .link {
    cursor: pointer;

    &:hover {
      transform: scale(1.03);
    }
    &[active='true'] {
      transform: scale(1.03);
      font-weight: bold;
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, Ref, toRefs } from 'vue'
import { useI18n } from "vue-i18n";

export default defineComponent({
  props: {
    modelValue: String
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const nowPage = toRefs(props).modelValue as Ref<string>

    const changePage = (page: string) => {
      emit("update:modelValue", page)
    }

    return { t, nowPage, changePage }
  },
})
</script>
