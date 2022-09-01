<template>
  <div class="record-content">
    <Table :Thead="StoreRecordThead" :Tbody="data">
      <template v-slot:td_status="{ data }">
        {{ RecordStatusMap[data] }}
      </template>
    </Table>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/_common.scss";

@include mixin-pc {
  .record-content {
    padding-inline: 20px;
  }
}
.record-content {
  margin-top: 10px;
  overflow-x: auto;
}
</style>

<script lang="ts">
import { defineComponent, computed,ref } from 'vue'
import { useStore } from 'vuex'
import { IUserInfo } from "@/type/Vuex"
import { IStoredLogQuery, IStoredRecord } from "@/type/Payment"
import { StoreRecordThead } from '@/config/application/Thead'
import { RecordStatusMap } from '@/config/application/Mapping'
import { StoredLog } from "@/api/payment"

export default defineComponent({
  setup() {
    const store = useStore()
    const user = computed(() => { return store.getters["User/GetUserInfo"] as IUserInfo })
    const data = ref<Array<IStoredRecord>>([])

    const getStoredRecord = async () => {
      const query:IStoredLogQuery = {
        AuthKey: user.value.AuthKey
      }
      await StoredLog(query).then((res) => {
        const response = res?.response
        const request = res?.request
        if (!response && !request && res) {
          data.value = res
        }
      })
    }

    getStoredRecord()

    return { StoreRecordThead, RecordStatusMap, data }
  },
})
</script>

