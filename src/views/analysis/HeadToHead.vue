<template>
  <div class="head-to-head">
    <Basic :BasicData="data.status" />
    <Recent :RecentData="data.recentGame" :Home="data.status?.teamH?.name" :Away="data.status?.teamA?.name" />
    <div class="games">
      <Game :GameData="data.beforeGame?.teamH" :Title="'Analysis.RecentGame'" />
      <Game :GameData="data.beforeGame?.teamA" :Title="'Analysis.RecentGame'" />
    </div>
    <div class="games">
      <Game :GameData="data.afterGame?.teamH" :Title="'Analysis.After'" />
      <Game :GameData="data.afterGame?.teamA" :Title="'Analysis.After'" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/_common.scss";

@include mixin-pc {
  .games {
    display: flex; 
  }
}
.games {
  justify-content: space-between; 
  margin-top: 20px;
}
.head-to-head {
  color: var(--main-font);
  width: 90%;
  margin-inline: auto;
}
</style>

<script lang="ts">
import { computed, defineComponent, defineAsyncComponent, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { GetHeadToHead } from '@/api/analysis'
import { IReqHeadToHead, IHeadToHeadData } from '@/type/Analysis'

export default defineComponent({
  components: {
    Basic: defineAsyncComponent(() => import("@/components/analysis/ui/Basic.vue")),
    Recent: defineAsyncComponent(() => import("@/components/analysis/ui/Recent.vue")),
    Game: defineAsyncComponent(() => import("@/components/analysis/ui/HtoHGame.vue")),
  },
  setup() {
    const route = useRoute()
    const params = computed(() => { return route.params })
    const data = reactive({} as IHeadToHeadData)

    const getHeadToHead = async () => {
      const query: IReqHeadToHead = {
        date: params.value.date as string,
        gameType: params.value.gtype as string,
        gameID: params.value.gid as string,
        leagueID: params.value.lid as string,
      }
      await GetHeadToHead(query).then((res) => {
        const response = res?.response
        const request = res?.request
        if (!response && !request && res) {
          data.status = res.status
          data.recentGame = res.recentGame
          data.beforeGame = res.beforeGame
          data.afterGame = res.afterGame
        }
      })
    }

    getHeadToHead()

    return { data }
  },
})
</script>
