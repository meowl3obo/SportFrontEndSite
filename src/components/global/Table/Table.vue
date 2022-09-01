<template>
  <table>
    <thead>
      <tr>
        <template v-for="item in head" :key="item.key">
          <slot :name="`head_${item.key}`">
            <th>
              <slot :name="`th_${item.key}`" :data="item.name">{{ t(item.name) }}</slot>
            </th>
          </slot>
        </template>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in body" :key="index">
        <template v-for="item2 in head" :key="item2.key">
          <slot :name="`body_${item2.key}`" :body="item">
            <td>
              <slot :name="`td_${item2.key}`" :data="item[item2.key]" :body="item">{{ item[item2.key] }}</slot>
            </td>
          </slot>
        </template>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
table {
  width: 100%;
  color: var(--main-font);
  border-collapse: collapse;
  thead {
    tr {
      border-bottom: 1px solid var(--white-border);
    }
    th {
      white-space: nowrap;
      padding-inline: 5px;
    }
  }
  tbody {
    tr {
      transition: all 0.1s ease;
      &:hover {
        background-color: var(--hover-bg-color)
      }
    }
    td {
      text-align: center;
      white-space: nowrap;
      padding-inline: 5px;
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, PropType, Ref, toRefs } from 'vue'
import { IThead } from "@/type/Global"
import { useI18n } from "vue-i18n";

export default defineComponent({
  props: {
    Thead: Array as PropType<Array<IThead>>,
    Tbody: {
      type: Array as PropType<Array<any>>,
      default: [] as Array<any>,
    }
  },
  setup(props) {
    const { t } = useI18n()
    const head = toRefs(props).Thead as Ref<Array<IThead>>
    const body = toRefs(props).Tbody as Ref<Array<any>>

    return { t, head, body }
  },
})
</script>
