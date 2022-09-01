<template>
  <div class="canvas-control">
    <div v-show="!Memo" class="control" @click="setMemo(true)">
      <icon :icon="['fas', 'pen']" />
    </div>
    <div v-show="Memo" class="control" @click="clear()">
      <icon :icon="['fas', 'trash-alt']" />
    </div>
    <div v-show="Memo" class="control" :class="`${eraser ? 'use-control' : ''}`" @click="useEraser()" >
      <icon :icon="['fas', 'eraser']" />
    </div>
    <div v-show="Memo" class="control" :class="`${font ? 'use-control' : ''}`" @click="useFont()" >
      <icon :icon="['fas', 'font']" />
    </div>
    <div v-show="Memo" class="control" :class="`${pen ? 'use-control' : ''}`" @click="usePen()" >
      <icon :icon="['fas', 'pen']" />
    </div>
    <div v-show="Memo" class="control" @click.stop="showSize = !showSize">
      <icon :icon="['fas', 'text-height']" />
    </div>
    <div v-show="Memo" class="control" @click.stop="showColor = !showColor">
      <icon :icon="['fas', 'fill-drip']" />
    </div>
    <div v-show="Memo" class="control" @click="save()">
      <icon :icon="['fas', 'save']" />
    </div>
    <div v-show="Memo" class="control" @click="setMemo(false)">
      <icon :icon="['fas', 'times']" />
    </div>
    <transition name="size">
      <div v-if="showSize" class="size-options" @click.stop="">
        <div v-for="item in FontSize" :key="`size_${item}`" @click="changeSize(item); showSize = false; " >
          {{ item }}
        </div>
      </div>
    </transition>
    <transition name="color">
      <div v-if="showColor" class="color-options" @click.stop="">
        <input v-model="inputColor" type="color" />
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/component/_home.scss";
@import "@/styles/_common.scss";

.size-options,
.color-options {
  @extend %option-extend;
}

.content-data {
  position: relative;
  min-height: calc(100% - 125px);
}

.canvas-control {
  display: flex;
  line-height: 40px;
  padding-inline: 10px;

  & > .control {
    padding-inline: 10px;
    cursor: pointer;
    color: #dedede;
    opacity: 0.9;
    margin-block: 5px;
    line-height: 26px;
    border-radius: 5px;

    &:hover {
      filter: drop-shadow(1px 1px 5px #b2ce8e);
    }
  }
}

.use-control {
  box-shadow: 0px 0px 6px 3px #00000080 inset;
}
</style>

<script lang="ts">
import { defineComponent, computed, ref, inject, watch } from 'vue'
import { useStore } from "vuex"
import { UseEraserFunc, UsePenFunc, UseFontFunc, ChangeColorFunc, ChangeSizeFunc} from "@/symbols/Home"
import { TFunc, TInputFunc} from "@/type/Global"
import { FontSize } from "@/config/application/Font"
import mitt from "@/library/global/Mitt"
export default defineComponent({
  setup() {
    const store = useStore();
    const Memo = computed(() => store.getters["Component/GetMemo"])
    const color = inject("color") as string;
    const size = inject("size") as number;
    const font = inject("font") as boolean;
    const eraser = inject("eraser") as boolean;
    const pen = inject("pen") as boolean;
    const useEraser = inject(UseEraserFunc) as TFunc;
    const usePen = inject(UsePenFunc) as TFunc;
    const useFont = inject(UseFontFunc) as TFunc;
    const changeColor = inject(ChangeColorFunc) as TInputFunc<string>;
    const changeSize = inject(ChangeSizeFunc) as TInputFunc<number>;
    let showSize = ref<boolean>(false);
    let showColor = ref<boolean>(false);
    let inputColor = ref(ref(color).value);

    const setMemo = (status: boolean) => {
      store.dispatch("Component/SetMemo", status)
    };

    const clear = () => {
      mitt.emit('clear')
    }

    const save = () => {
      mitt.emit('save')
    }

    const closeAll = () => {
      showSize.value = false
      showColor.value = false
    }

    mitt.on("closePen", closeAll)

    watch(
      () => { return inputColor.value },
      () => { changeColor(inputColor.value) }
    )
    watch(
      () => { return showSize.value },
      () => { if (showSize.value) showColor.value = false }
    )
    watch(
      () => { return showColor.value },
      () => { if (showColor.value) showSize.value = false }
    )

    return { FontSize, Memo, showSize, showColor, save, clear, font, eraser, pen, color, size, inputColor, setMemo, useEraser, usePen, useFont, changeColor, changeSize }
  }
})
</script>