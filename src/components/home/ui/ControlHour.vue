<template>
  <div v-show="!Memo" class="control-hour" @click.stop="showHourList = !showHourList; CloseAll('Hour')" >
    {{ hour }}小時
    <transition name="home-hour">
      <div v-if="showHourList" class="hour-options">
        <div @click.stop="changeHour(3)"> 3小時 </div>
        <div @click.stop="changeHour(6)"> 6小時 </div>
        <div @click.stop="changeHour(12)"> 12小時 </div>
        <div @click.stop="changeHour(24)"> 24小時 </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/component/_home.scss";
.control-hour {
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

.hour-options{
  @extend %option-extend;
  width: 70px;
}
</style>

<script lang="ts">
import { computed, defineComponent, ref, inject, Ref } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { CloseAll } from "@/library/global/Close"
import { GameTypes } from "@/config/global/GameType";
import mitt from "@/library/global/Mitt"

export default defineComponent({
  setup() {
    const store = useStore();
    const { t } = useI18n()
    const Memo = computed(() => store.getters["Component/GetMemo"]);
    let showHourList = ref<boolean>(false);
    const hour = inject("hour") as Ref<number>;

    const changeHour = (newHour: number) => {
      showHourList.value = false
      hour.value = newHour
    }

    const closeAll = () => {
      showHourList.value = false
    }

    mitt.on("closeHour", closeAll)

    return { GameTypes, Memo, CloseAll, t, showHourList, hour, changeHour }
  },
});
</script>