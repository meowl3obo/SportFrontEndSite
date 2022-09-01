<template>
  <div>
    <div class="backdrop" :class="backdropColor ? 'backdrop-color' : ''" @click="close" />
    <div class="modal">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.backdrop {
  position: fixed;
  z-index: 25;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.backdrop-color {
  background-color: var(--backdrop-color);
  backdrop-filter: blur(3px);
}
.modal {
  position: fixed;
  z-index: 30;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  min-width: 400px;
  text-align: center;
  // min-height: 200px;
  background-color: var(--modal-bg-color);
  color: var(--main-font);
  border-radius: 10px;
  box-shadow: 0px 0px 20px 0px var(--op-border-color);
}
</style>

<script lang="ts">
import { defineComponent, Ref, toRefs } from "vue";
export default defineComponent({
  props: {
    BackdropColor: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["closeModal"],
  setup(props, { emit }) {
    let backdropColor = toRefs(props).BackdropColor as Ref<boolean>;
    const close = () => {
      emit("closeModal");
    };

    return { backdropColor, close };
  },
});
</script>