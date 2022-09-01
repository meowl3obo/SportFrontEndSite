<template>
  <div>
    <HotGame v-if="Width > 868"/>
    <AdvBar v-if="Width > 868"/>
    <div class="content">
      <ControlBar />
      <div class="main">
        <div class="scroll">
          <div class="content-data">
            <Live v-if="page == 'Live'" />
            <Forum v-else-if="page == 'Forum'"/>
            <Result v-else-if="page == 'Results'"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/_scroll.scss";
@import "@/styles/_common.scss";

@include mixin-phone {
  .content {
    width: calc(100vw - 20px);
    min-height: calc(100vh - 165px);
    padding-top: 20px;
    padding-inline:10px;
  }
  .scroll {
    height: calc(100vh - 140px) !important;
  }
}

@include mixin-pc {
  .content {
    width: calc(100vw - 230px);
    min-height: calc(100vh - 300px);
    padding-inline: 20px 10px;
  }
}

.main {
    height:100%;

  & > .scroll {
    overflow-y: auto;
    overflow-x: hidden;
    height: calc(100vh - 235px);

    @extend %scroll !optional;
  }
}

.content-data {
  position: relative;
  min-height: calc(100% - 125px);
}
</style>

<script lang="ts">
import { computed, defineComponent, defineAsyncComponent, ref, provide, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import Cookies from "js-cookie";
import { TFunc, TInputFunc } from "@/type/Global"
import { UseEraserFunc, UsePenFunc, UseFontFunc, ChangeColorFunc, ChangeSizeFunc} from "@/symbols/Home"
export default defineComponent({
  components: {
    ControlBar: defineAsyncComponent(() => import("@/components/home/ui/ControlBar.vue")),
    Live: defineAsyncComponent(() => import("@/components/home/page/Live.vue")),
    AdvBar: defineAsyncComponent(() => import("@/components/advBar/AdvBar.vue")),
    Forum: defineAsyncComponent(() => import("@/components/home/page/Forum.vue")),
    Result: defineAsyncComponent(() => import("@/components/home/page/Result.vue")),
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const Width = computed(() => store.getters["Global/GetWidth"]);
    const liveHour = ref<number>(3)

    const params = computed(() => { return route.params.id })
    const query = computed(() => { return route.query })

    let page = ref<string>("")

    if (typeof route.params.id == 'string' && ["Live", "Forum", "Results"].includes(route.params.id)) {
      page.value = route.params.id;
    }
    provide("page", page)
    provide("hour", liveHour)

    let eraser = ref<boolean>(false);
    let pen = ref<boolean>(true);
    let font = ref<boolean>(false);
    const resetUse = () => {
      eraser.value = false
      pen.value = false
      font.value = false
    }
    const useEraser: TFunc = () => {
      resetUse();
      eraser.value = true;
    }
    const usePen: TFunc = () => {
      resetUse();
      pen.value = true;
    }
    const useFont: TFunc = () => {
      resetUse();
      font.value = true;
    }
    provide("eraser", eraser)
    provide("pen", pen)
    provide("font", font)
    provide(UseEraserFunc, useEraser)
    provide(UsePenFunc, usePen)
    provide(UseFontFunc, useFont)
    
    let color = ref<string>("#FFFFFF");
    let size = ref<number>(4);
    const changeColor: TInputFunc<string> = (newColor: string) => {
      color.value = newColor
    }
    const changeSize: TInputFunc<number> = (newSize: number) => {
      size.value = newSize
    }
    provide("color", color)
    provide("size", size)
    provide(ChangeColorFunc, changeColor)
    provide(ChangeSizeFunc, changeSize)

    onMounted(() => {
      if (query.value.code) Cookies.set('gcode', query.value.code)
    })

    watch(
      () => { return params.value },
      () => { page.value = params.value as string }
    )

    return { Width, liveHour, page };
  },
});
</script>