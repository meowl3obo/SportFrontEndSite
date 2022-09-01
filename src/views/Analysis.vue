<template>
  <div class="content">
    <ControlBar />
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
.content {
  // width: 100%;
  min-height: calc(100vh - 245px);
  padding: 20px 10px;
  // height: calc(100vh - 245px);
}
</style>

<script lang="ts">
import { defineComponent, defineAsyncComponent, provide, computed } from 'vue'
import { useRoute } from "vue-router"
import Cookies from "js-cookie";

export default defineComponent({
  components: {
    ControlBar: defineAsyncComponent(() => import("@/components/analysis/ui/ControlBar.vue")),
  },
  setup() {
    const route = useRoute()
    const page = computed(() => {
      if (route.path.includes("match")) return "Match"
      else return "Overview"
    })
    const setDefault = () => {
      if (route.path.includes("match")) {
        Cookies.set("match", JSON.stringify(route.params))
      }
    }
    setDefault()
    provide("page", page)
  },
})
</script>
