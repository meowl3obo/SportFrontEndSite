<template>
  <div class="live-default">
    {{ t("Live.NoLive") }}
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/_common.scss";

@include mixin-pc {
  .live-default {
    height: 500px;
  }
}
@include mixin-phone {
  .live-default {
    height: 250px;
  }
}
.live-default {
  width: 100%;
  background-color: var(--notlive-bg-color);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  setup() {
    const { t } = useI18n()

    return { t }
  },
});
</script>