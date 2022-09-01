<template>
  <div v-show="!Memo" class="control-gametype" @click.stop="showGameTypeList = !showGameTypeList; CloseAll('GameType')" >
    {{ t(`GameType.${GameTypes[GameType]}`) }}
    <transition name="gametype">
      <div v-if="showGameTypeList" class="gametype-options">
        <div v-for="(item, key) in GameTypes" :key="key" @click.stop="changeGameType(key)" >
          {{ t(`GameType.${item}`) }}
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/component/_home.scss";
.control-gametype {
  position: relative;
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

.gametype-options{
  @extend %option-extend;
}
</style>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { GameTypes } from "@/config/global/GameType";
import { CloseAll } from "@/library/global/Close"
import mitt from "@/library/global/Mitt"

export default defineComponent({
  setup() {
    const store = useStore();
    const { t } = useI18n()
    const GameType = computed(() => store.getters["Global/GetGameType"]);
    const Memo = computed(() => store.getters["Component/GetMemo"]);
    let showGameTypeList = ref<boolean>(false);
    let gameType = ref<string>("BasketBall");

    const changeGameType = (newGameType: string) => {
      showGameTypeList.value = false
      gameType.value = GameTypes[newGameType]
      store.dispatch("Global/SetGameType", newGameType)
    }

    const closeAll = () => {
      showGameTypeList.value = false
    }

    mitt.on("closeGameType", closeAll)

    return { GameType, GameTypes, Memo, CloseAll, t, showGameTypeList, gameType, changeGameType }
  },
});
</script>