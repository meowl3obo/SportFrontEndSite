<template>
  <div class="control-bar">
    <ControlType />
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
import { computed, defineComponent, defineAsyncComponent } from 'vue'
import { useStore} from "vuex"
export default defineComponent({
  components: {
    ControlType: defineAsyncComponent(() => import("@/components/analysis/ui/ControlType.vue")),
  },
  setup() {
    const store = useStore();
    const Width = computed(() => store.getters["Global/GetWidth"])

    return { Width }
  }
})
</script>