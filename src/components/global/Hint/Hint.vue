<template>
  <div class="hint">
    <div class="title">
      <icon v-if="hint == 'warning'" class="warning" :icon="['fas', 'circle-exclamation']" />
      <icon v-else-if="hint == 'success'" class="success" :icon="['fas', 'circle-check']" />
      <icon v-else-if="hint == 'error'" class="error" :icon="['fas', 'xmark']" />
      <span>{{ title }}</span>
    </div>
    <div class="content">{{ message }}</div>
  </div>
</template>

<style lang="scss" scoped>
.hint {
  position: fixed;
  width: 270px;
  height: 90px;
  padding: 10px 15px;
  top: 10px;
  right: 10px;
  background-color: var(--minor-bg-card);
  opacity: .95;
  border-radius: 10px;
  box-shadow: 1.5px 0.5px 10px var(--minor-shadow);
  color: var(--third-font);
  word-wrap: break-word;
  z-index: 999;

  .title {
    font-weight: bold;
    font-size: 18px;
    span {
      padding-left: 10px;
    }
  }
  .content {
      padding-left: 25px;
  }
}
.warning {
  color: var(--hint-warning)
}
.error {
  color: var(--hint-danger)
}
.success {
  color: var(--hint-success)
}
</style>

<script lang="ts">
import { defineComponent, Ref, toRefs } from 'vue'

export default defineComponent({
  props: {
    Title: {
      type: String,
      default: "title",
    },
    Message: {
      type: String,
      default: "message",
    },
    Hint: {
      type: String,
      default: "warning",
    },
  },
  setup(props) {
    const title = toRefs(props).Title as Ref<string>
    const message = toRefs(props).Message as Ref<string>
    const hint = toRefs(props).Hint as Ref<string>

    return { title, message, hint }
  },
})
</script>
