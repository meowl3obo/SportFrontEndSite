<template>
  <div class="footer">
    <div class="type">
      <div @click="router.push(`/docs/${Docs.docs['Help']}`)">{{ t("Footer.Help") }}</div>
      <div @click="router.push(`/docs/${Docs.docs['Feeback']}`)">{{ t("Footer.Feeback") }}</div>
      <div @click="router.push(`/docs/${Docs.docs['Promotions']}`)">{{ t("Footer.Promotions") }}</div>
      <div @click="router.push(`/docs/${Docs.docs['Policy']}`)">{{ t("Footer.Policy") }}</div>
      <div @click="router.push(`/docs/${Docs.docs['About']}`)">{{ t("Footer.About") }}<span class="pc-show">{{ t("Footer.Us") }}</span></div>
    </div>
    <div class="copy">
      <h3>Copy Right © 2021 zbdigital</h3>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/_common.scss";
.footer {
  height: 104px;
  width: 100%;
  border-top: 1px solid var(--op-main-border);
  color: var(--main-font);
  // position: fixed;
  // bottom: 0;
  // margin-top: 20px;
}

@include mixin-phone {
  .footer {
    font-size: 8px;
  }
  .type {
    padding: 20px 10px !important;
  }
  .pc-show {
    display: none;
  }
}

.type {
  display: flex;
  justify-content: space-between;
  padding: 20px 50px;
  & > div {
    cursor: pointer;
  }
  & > div:hover {
    transform: scale(1.1);
  }
}
.copy {
  display: flex;
  justify-content: center;
  align-items: center;

  h3 {
    margin: unset;
  }
}
</style>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { Docs } from "@/config/application/DocsRouter"
export default defineComponent({
  setup() {
    const store = useStore();
    const { t } = useI18n()
    const Width = computed(() => store.getters["Global/GetWidth"])
    const router = useRouter();

    return { t, Width, router, Docs }
  },
});
</script>