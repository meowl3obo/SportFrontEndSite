<template>
  <div class="game-content">
    <div class="title">
      {{ t(title) }}
    </div>
    <div style="overflow-x: auto;">
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
              <td width="160" style="white-space: nowrap;">{{ game.gameDate }}</td>
              <td>
                <div class="play-against">
                  <div :class="game.scoreH > game.scoreA ? 'win' : ''">{{ game.teamH }}</div>
                  <div style="white-space: nowrap;">{{ game.scoreH == -1 ? '-' : game.scoreH }}：{{ game.scoreA == -1 ? '-' : game.scoreA }}</div>
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
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/_common.scss";

@include mixin-phone {
  .play-against {
    padding-inline: 10px !important;
  }
}

@include mixin-pc {
  .game-content {
    width: 49%;
  }
}

.game-content {
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
</style>

<script lang="ts">
import { defineComponent, PropType, toRefs, Ref } from 'vue'
import { IOverviewGame } from "@/type/Analysis";
import { useI18n } from "vue-i18n";

export default defineComponent({
  props: {
    Data: Array as PropType<Array<IOverviewGame>>,
    Title: String,
  },
  setup(props) {
    const { t } = useI18n()
    const data = toRefs(props).Data as Ref<Array<IOverviewGame>>
    const title = toRefs(props).Title as Ref<string>

    return { t, data, title }
  },
})
</script>