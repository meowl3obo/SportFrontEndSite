<template>
  <div class="control-bar">
    <ControlType />
    <div class="control-other">
      <ControlCanvas v-if="Width > 868 && page == 'Live'"/>
      <ControlHour v-if="page == 'Live'" />
      <ControlGameType />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.control-bar {
  position: relative;
  background-color: var(--minor-color);
  height: 40px;
  display: flex;
  justify-content: space-between;
}

.control-other {
  display: flex;
}
</style>

<script lang="ts">
import { computed, defineComponent, defineAsyncComponent, inject } from 'vue'
import { useStore} from "vuex"
export default defineComponent({
  components: {
    ControlType: defineAsyncComponent(() => import("@/components/home/ui/ControlType.vue")),
    ControlCanvas: defineAsyncComponent(() => import("@/components/home/ui/ControlCanvas.vue")),
    ControlGameType: defineAsyncComponent(() => import("@/components/home/ui/ControlGameType.vue")),
    ControlHour: defineAsyncComponent(() => import("@/components/home/ui/ControlHour.vue"))
  },
  setup() {
    const store = useStore();
    const Width = computed(() => store.getters["Global/GetWidth"])
    let page = inject("page");

    return { Width, page }
  }
})
</script>