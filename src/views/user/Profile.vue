<template>
  <div class="context">
    <ControlBar v-model="page" />
    <ChangeUserName v-show="page == 'username'" />
    <ChangePassword v-show="page == 'password'" />
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/_common.scss";
@include mixin-phone {
  .context {
    width: calc(100% - 40px);
  }
}
@include mixin-pc {
  .context {  
    width: calc(100% - 260px);
  }
}
.context {
  padding-inline: 20px;
}
</style>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref, watch } from 'vue'

export default defineComponent({
  components: {
    ControlBar: defineAsyncComponent(() => import("@/components/user/ui/ProfileControl.vue")),
    ChangeUserName: defineAsyncComponent(() => import("@/components/user/page/ChangeUserName.vue")),
    ChangePassword: defineAsyncComponent(() => import("@/components/user/page/ChangePassword.vue")),
  },
  setup() {
    const page = ref<string>("username")

    return { page }
  }
})
</script>
