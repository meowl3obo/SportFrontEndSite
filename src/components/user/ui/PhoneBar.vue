<template>
  <div class="sidebar">
    <div class="side-item" :active="nowPage == 'profile'" @click="toPage('profile')" > {{ t("User.Info") }} </div>
    <div class="side-item" :active="nowPage == 'order'" @click="toPage('order')" > {{ t("User.Order") }} </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  padding-top: 10px;
}
.side-item {
  position: relative;
  color: var(--main-font);
  text-align: center;
  padding: 7px 20px;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.25s ease;

  &[active="true"] {
    &::after {
      background-color: var(--minor-color);
    }
  }

  &::after {
    content: "";
    position: absolute;
    height: 80%;
    width: 3px;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    background-color: var(--minor-border);
  }

  &:hover {
    transform: scale(1.003) translateX(-3px);
  }
}
</style>

<script lang="ts">
import { defineComponent, Ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

export default defineComponent({
  props: {
    Page: String,
  },
  setup(props) {
    const router = useRouter();
    const { t } = useI18n();
    const nowPage = toRefs(props).Page as Ref<string>;

    const toPage = (page: string) => {
      router.push({
        path: `/user/${page}`,
      });
    };

    return { t, nowPage, toPage };
  },
});
</script>
