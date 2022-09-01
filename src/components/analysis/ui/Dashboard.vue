<template>
  <div class="dashboard-content">
    <div v-for="key in keys" :key="key">
      <div class="title">{{ key }}</div>
      <div class="context">
        <table>
          <thead>
            <tr>
              <th v-for="head in OverviewDsahboardThead" :key="head.key">
                {{ head.name }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in data[key]" :key="index">
              <td v-for="head in OverviewDsahboardThead" :key="`body_${head.key}`">
                {{ item[head.key] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/_common.scss";

@include mixin-pc {
  .context {
    padding: 10px 20px;
  }
  .dashboard-content {
    padding-bottom: 20px;
  }
}
.context {
  overflow-x: auto;
}
.dashboard-content {
  border: 1px solid var(--op-main-border);
  box-shadow: 0px 0px 7px var(--main-shadow);
  & > div {
    width: 100%;
    text-align: center;
  }
  .title {
    background-color: var(--backdrop);
  }
}
table {
  width: 100%;
  border-collapse: collapse;
  th, td {
    white-space: nowrap;
    padding-inline: 5px;
  }

  tbody {
    tr{
      transition: all 0.2s ease;
      &:hover {
        background-color: var(--backdrop);
      }
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, PropType, toRefs, Ref, computed } from 'vue'
import { IDict } from "@/type/Global"
import { IOverviewDashborad } from "@/type/Analysis";
import { OverviewDsahboardThead } from "@/config/global/Thead"

export default defineComponent({
  props: {
    Data: {} as PropType<IDict<Array<IOverviewDashborad>>>
  },
  setup(props) {
    const data = toRefs(props).Data as Ref<IDict<Array<IOverviewDashborad>>>
    const keys = computed(() => { return Object.keys(data.value) })

    return { OverviewDsahboardThead,data, keys }
  },
})
</script>
