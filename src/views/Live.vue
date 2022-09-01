<template>
  <div class="content">
    <div class="live-content">
      <Live />
      <GameData />
    </div>
    <div class="chat-content">
      <Chat />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/_common.scss";

@include mixin-pc {
  .content {
    display: flex;
  }
  .live-content {
    width: 80%;
  }
  .chat-content {
    width: 20%;
  }
}
@include mixin-phone {
  .live-content {
    width: 100%;
  }
  .chat-content {
    width: 100%;
  }
}

.content {
  width: calc(100% - 20px);
  min-height: calc(100vh - 205px);
  padding: 10px 10px;
  color: var(--main-font);
}
</style>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'

export default defineComponent({
  components: {
    Chat: defineAsyncComponent(() => import("@/components/live/ui/Chat.vue")),
    Live: defineAsyncComponent(() => import("@/components/live/ui/Live.vue")),
    GameData: defineAsyncComponent(() => import("@/components/live/ui/GameData.vue")),
  },
  // setup() {
    
  // },
})
</script>
