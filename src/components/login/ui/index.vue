<template>
  <div class="login">
    <Modal @closeModal="close()">
      <template v-slot>
        <transition name="login">
          <Login v-if="singin.component == 'Login'" />
          <Register v-else-if="singin.component == 'Register'" />
          <ForgetPWD v-else-if="singin.component == 'Forget'" />
        </transition>
      </template>
    </Modal>
    <!-- <div class="backdrop" @click="close()" />
    <transition name="login">
      <Login v-if="singin.component == 'Login'" />
      <Register v-else-if="singin.component == 'Register'" />
      <ForgetPWD v-else-if="singin.component == 'Forget'" />
    </transition> -->
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/component/_login.scss";
</style>

<script lang="ts">
import { defineComponent, computed, defineAsyncComponent } from 'vue'
import { useStore } from "vuex"
export default defineComponent({
    components: {
        Login: defineAsyncComponent(() => import("./Login.vue")),
        Register: defineAsyncComponent(() => import("./Register.vue")),
        ForgetPWD: defineAsyncComponent(() => import("./ForgetPWD.vue")),
    },
    setup() {
        const store = useStore()
        const singin = computed(() => store.getters["Component/GetSingin"])

        const close = () => {
            store.dispatch("Component/SetSingin", { status: false })
        }

        return { singin, close }
    }
})
</script>
