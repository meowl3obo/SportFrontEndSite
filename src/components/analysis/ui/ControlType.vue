<template>
  <div class="control-type">
    <template v-if="Width > 868">
      <div :active="page == 'Overview'" @click="toOverview()">{{ t("Analysis.Overview") }}</div>
      <span>|</span>
      <div :active="page == 'Match'" @click="toMatch()">{{ t("Analysis.Match") }}</div>
    </template>
    <template v-else>
      <div v-show="!Memo" class="control-type-list" @click.stop="showList = !showList">
        {{ t(`Analysis.${page}`) }}
      </div>
      <transition name="analysis">
        <div v-if="showList" class="type-options">
          <div @click="toOverview()">{{ t("Analysis.Overview") }}</div>
          <div @click="toMatch()">{{ t("Analysis.Match") }}</div>
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
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n";
import Cookies from "js-cookie";
import mitt from "@/library/global/Mitt"

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter()
    const { t } = useI18n()
    const Width = computed(() => store.getters["Global/GetWidth"]);
    const Memo = computed(() => store.getters["Component/GetMemo"])
    let page = inject("page");
    let showList = ref<boolean>(false);
    
    const closeAll = () => {
      showList.value = false
    }

    const toOverview = () => {
      showList.value = false
      const matchData = JSON.parse(Cookies.get('match') as string)
      router.push(`/analysis/overview/${matchData.gtype}/${matchData.date}/${matchData.lid}`)
    }

    const toMatch = () => {
      showList.value = false
      const matchData = JSON.parse(Cookies.get('match') as string)
      router.push(`/analysis/match/${matchData.gtype}/${matchData.date}/${matchData.lid}/${matchData.gid}`)
    }

    mitt.on("closeAnalysis", closeAll)

    return { Width, Memo, t, page, showList, toOverview, toMatch }
  },
});
</script>