<template>
  <div class="content">
    <UserSidebar v-if="width > 868" :Page="nowPage" />
    <PhoneBar v-else :Page="nowPage" />
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/_scroll.scss";
@import "@/styles/_common.scss";

@include mixin-pc {
  .content {
    display: flex;
  }
}

.content {
  width: 100%;
  min-height: calc(100vh - 80px);
}

.main {
  height: 100%;

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
import { defineComponent, defineAsyncComponent, computed , ref, watch} from "vue";
import { useStore } from "vuex"
import { useRoute } from "vue-router"

export default defineComponent({
  components: {
    UserSidebar: defineAsyncComponent(() => import("@/components/user/ui/Sidebar.vue")),
    PhoneBar: defineAsyncComponent(() => import("@/components/user/ui/PhoneBar.vue")),
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const name = computed(() => { return route.name })
    const width = computed(() => store.getters["Global/GetWidth"]);
    const nowPage = ref<string>("profile")

    const setNowPage = () => {
      if (name.value) nowPage.value = name.value as string
      else nowPage.value = 'profile'
    }

    setNowPage()

    watch(
      () => { name.value },
      () => setNowPage(),
      { deep: true }
    )

    return { width, nowPage }
  }
});
</script>