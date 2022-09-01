<template>
  <div class="control-type">
    <template v-if="Width > 868">
      <div :active="page == 'Live'" @click="routerChange('Live')">{{ t("Home.Live") }}</div>
      <span>|</span>
      <div :active="page == 'Forum'" @click="routerChange('Forum')">{{ t("Home.Forum") }}</div>
      <span>|</span>
      <div :active="page == 'Results'" @click="routerChange('Results')">{{ t("Home.Results") }}</div>
    </template>
    <template v-else>
      <div v-show="!Memo" class="control-type-list" @click.stop="showList = !showList; CloseAll('HomeType')">
        {{ page }}
      </div>
      <transition name="home-type">
        <div v-if="showList" class="type-options">
          <div @click="routerChange('Live')">{{ t("Home.Live") }}</div>
          <div @click="routerChange('Results')">{{ t("Home.Results") }}</div>
        </div>
      </transition>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/component/_home.scss";
@import "@/styles/_common.scss";

@include mixin-phone {
  .control-type {
    align-items: unset !important;
  }
}
@include mixin-pc {
  .control-type > div {
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
    }
    &[active="true"] {
      transform: scale(1.1);
      font-weight: 600;
    }
  }
}

.control-type {
  display: flex;
  justify-content: left;
  align-items: center;
  margin-left: 20px;
  color: #dedede;

  span {
    padding-inline: 10px;
  }
}

.control-type-list {
  display: flex;
  align-items: center;
  margin-right: 20px;
  color: #dedede;
  cursor: pointer;
  padding-inline: 10px;
  margin-block: 5px;
  border-radius: 5px;
  box-shadow: 1.5px 1.5px 4px #00000090 inset;
}

.type-options {
  @extend %option-extend;
  width: 170px;
  left: 5px;
}
</style>

<script lang="ts">
import { defineComponent, computed, ref, inject } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { CloseAll } from "@/library/global/Close"
import mitt from "@/library/global/Mitt"

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const { t } = useI18n()
    const Width = computed(() => store.getters["Global/GetWidth"]);
    const Memo = computed(() => store.getters["Component/GetMemo"])
    let page = inject("page");
    let showList = ref<boolean>(false);
    const closeAll = () => {
      showList.value = false
    }
    const routerChange = (id: string) => {
      showList.value = false
      router.push(`/${id}`);
    }
    mitt.on("closeHomeType", closeAll)

    return { Width, Memo, t, page, showList, routerChange, CloseAll }
  },
});
</script>