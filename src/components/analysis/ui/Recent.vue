<template>
  <div class="recent-content">
    <div class="title">
      {{ t("Analysis.Recent") }}
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th>{{ t("Analysis.Date") }}</th>
            <th>{{ t("Analysis.HtoH") }}</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="data?.length > 0">
            <tr v-for="game in data" :key="`${game.gameDate}_${game.gameTime}`">
              <td width="160">{{ game.gameDate }}</td>
              <td>
                <div class="play-against">
                  <div :class="game.scoreH > game.scoreA ? 'win' : ''">{{ game.teamH }}</div>
                  <div>{{ game.scoreH }}：{{ game.scoreA }}</div>
                  <div :class="game.scoreA > game.scoreH ? 'win' : ''">{{ game.teamA }}</div>
                </div>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="2">
                {{ t("Analysis.NoGame") }}
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div v-if="data?.length > 0">
      <div class="score-bar-outside" >
        <div class="score-bar">
          <div v-show="hWin > 0" :style="`width: ${hWin/data.length*100}%`" class="hWin">{{ teamH }} {{ Math.round(hWin/data.length*10000)/100 }}%</div>
          <div v-show="tWin > 0" :style="`width: ${tWin/data.length*100}%`" class="tWin">平手 {{ Math.round(tWin/data.length*10000)/100 }}%</div>
          <div v-show="aWin > 0" :style="`width: ${aWin/data.length*100}%`" class="aWin">{{ teamA }} {{ Math.round(aWin/data.length*10000)/100 }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.recent-content {
  padding-bottom: 20px;
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

  tbody {
    .play-against {
      display: flex;
      justify-content: space-between;
      padding-inline: 40px;
      & > div {
        width: 100%;
      }
    }
    tr{
      transition: all 0.2s ease;
      &:hover {
        background-color: var(--backdrop);
      }
    }
  }
}
.win {
  color: var(--success-color);
  font-weight: bold;
}
.score-bar-outside {
  padding-inline: 40px; 
  margin-top: 10px;
  .score-bar {
    display: flex;
    // padding-inline: 20px;
    border-radius: 25px;
    overflow-x: hidden;
    .hWin {
      background-color: var(--main-color);
    }
    .tWin {
      background-color: var(--third-color);
    }
    .aWin {
      background-color: var(--minor-color);
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, PropType, Ref, toRefs, ref, onMounted, watch } from 'vue'
import { useI18n } from "vue-i18n";
import { IHeadToHeadGame } from '@/type/Analysis'

export default defineComponent({
  props: {
    RecentData: Array as PropType<Array<IHeadToHeadGame>>,
    Home: String,
    Away: String,
  },
  setup(props) {
    const { t } = useI18n()
    const data = toRefs(props).RecentData as Ref<Array<IHeadToHeadGame>>
    const teamH = toRefs(props).Home as Ref<string>
    const teamA = toRefs(props).Away as Ref<string>
    const hWin = ref<number>(0)
    const aWin = ref<number>(0)
    const tWin = ref<number>(0)

    const setWinScore = () => {
      data?.value?.forEach((game) => {
        if (game.scoreH > game.scoreA) {
          if (game.teamH == teamH.value) hWin.value ++
          else if (game.teamH == teamA.value) aWin.value ++
        } else if (game.scoreH < game.scoreA) {
          if (game.teamA == teamH.value) hWin.value ++
          else if (game.teamA == teamA.value) aWin.value ++
        } else if (game.scoreA == game.scoreH) tWin.value ++
      })
    }

    onMounted(() => {
      setWinScore()
    })

    watch(
      () => { return data.value },
      () => { setWinScore() },
      { deep: true }
    )
    

    return { t, data, teamH, teamA, hWin, aWin, tWin }
  },
})
</script>
