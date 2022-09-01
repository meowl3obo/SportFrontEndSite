<template>
  <div>
    <!-- <div class="title">123</div> -->
    <div class="container">
      <div class="docs-content" >
        <h2>{{ t(`Docs.${route.params.page}`) }}</h2>
        <div v-if="docsHtml != null" v-html="docsHtml" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 25px;
  min-height: calc(100vh - 235px);
  & > div {
    background-color: #4a4a4a70;
    background-clip: border-box;
    padding: 35px;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
    & > .heading {
      font-size: 24px;
    }
  }
  * {
    color: var(--main-font) !important;
  }
  table {
    border-collapse: collapse;
  }
  tr {
    border: 1px solid var(--main-font);
  }
  td {
    border-inline-start: 1px solid var(--main-font);
    padding: 1px;
  }
}
</style>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { Docs } from "@/config/application/DocsRouter";
import axios from "axios";
export default defineComponent({
  setup() {
    const route = useRoute();
    const store = useStore();
    const { t } = useI18n()
    let docsHtml = ref();
    let baseUrl = document.querySelector("meta[name='docs-url']")?.getAttribute("content") ?? "";
    const language = computed(() => {
      return store.getters["Global/GetLanguage"];
    });
    watch(
      () => {
        return route.params.page;
      },
      () => {
        initialize();
      }
    );
    watch(
      () => {
        return language.value;
      },
      () => {
        initialize();
      }
    );
    const initialize = async () => {
      let fileUrl = `${process.env.VUE_APP_DOCS_URL}/${language.value.replaceAll("-", "").toLowerCase()}/${Docs.DocsValue(route.params.page as string) ?? route.params.page}.html`;
      console.log(fileUrl);
      axios
        .get(fileUrl)
        .then((res) => {
          docsHtml.value = res.data;
        })
        .catch((res) => {
          if (res.statusCode != 200) {
            docsHtml.value = null;
          }
        });
    };
    initialize();
    return { t, docsHtml, route };
  },
});
</script>
