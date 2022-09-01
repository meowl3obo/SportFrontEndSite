<template>
  <div class="record-content">
    <Table :Thead="BuyRecordThead" :Tbody="data">
      
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
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { IUserInfo } from "@/type/Vuex"
import { IBuyRecord, IPointLogQuery } from "@/type/Payment"
import { BuyRecordThead } from '@/config/application/Thead'
import { PointLog } from "@/api/payment"

export default defineComponent({
  setup() {
    const store = useStore()
    const user = computed(() => { return store.getters["User/GetUserInfo"] as IUserInfo })
    const data = ref<Array<IBuyRecord>>([])

    const getBuyRecord = async () => {
      const query:IPointLogQuery = {
        AuthKey: user.value.AuthKey
      }
      await PointLog(query).then((res) => {
        const response = res?.response
        const request = res?.request
        if (!response && !request && res) {
          data.value = res
        }
      })
    }

    getBuyRecord()

    return { BuyRecordThead, data }
  },
})
</script>

