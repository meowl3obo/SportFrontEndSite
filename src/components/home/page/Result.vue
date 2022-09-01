<template>
  <div class="result">
    <div class="filter-box d-flex">
      <div class="header-box">
        <h2>{{ t(`GameType.${GameTypes[GameType]}`) }}</h2>
      </div>
      <div class="datepicker">
        <div
          :class="`hide ${clickDatePicker ? 'active' : 'closed'}`"
          @click.stop="clickDatePicker = !clickDatePicker; CloseAll('Date')"
        >
          <icon
            :icon="[`${clickDatePicker ? 'fas' : 'far'}`, 'calendar']"
            class="fa-lg"
            style="margin-inline: 15px"
          />
          <label> {{ d(date, "short") }} </label>
        </div>
        <Transition name="date">
          <SinglePicker v-model="date" v-if="clickDatePicker" />
        </Transition>
      </div>
    </div>
    <div class="result-content">
      <DivTable>
        <template v-slot:thead>
          <div class="div-td">{{ t("Result.Date") }}</div>
          <div class="div-td">{{ t("Result.League") }}</div>
          <div class="div-td">{{ t("Result.TeamH") }}</div>
          <div class="div-td">{{ t("Result.TeamA") }}</div>
          <div class="div-td">{{ t("Result.Score") }}</div>
        </template>
        <template v-slot:tbody>
          <div
            class="div-tbody div-tr"
            v-for="(game, index) in resultDatas"
            :key="index"
          >
            <div class="div-td">{{ game.gameDate }}</div>
            <div class="div-td">{{ leagueMap[game.league]?.mapLang[language] ?? game.league }}</div>
            <div :class="`div-td ${game.score1 > game.score2 ? 'winner' : game.score1 == game.score2 ? 'tie' : 'loser'}`">
              <span class="d-flex">
                <icon :icon="['fas', `trophy`]" v-if="game.score1 > game.score2" title="贏家" />
                <span style="margin-inline: auto">{{ teamMap[game.team1]?.mapLang[language] ?? game.team1 }}</span>
              </span>
            </div>
            <div :class="`div-td ${game.score1 > game.score2 ? 'loser' : game.score1 == game.score2 ? 'tie' : 'winner'}`">
              <span class="d-flex">
                <icon :icon="['fas', `trophy`]" v-if="game.score2 > game.score1" title="贏家" />
                <span style="margin-inline: auto">{{ teamMap[game.team2]?.mapLang[language] ?? game.team2 }}</span>
              </span>
            </div>
            <div class="div-td" >
              <span style="width: 40%">{{ game.score1 }}</span>
              <span style="width: 20%">:</span>
              <span style="width: 40%">{{ game.score2 }}</span>
            </div>
          </div>
        </template>
      </DivTable>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/styles/component/_result.scss";
@import "@/styles/_common.scss";

@include mixin-phone {
  .result-content {
    overflow-x: auto;
  }
}
</style>

<script lang="ts">
import { defineComponent, defineAsyncComponent, computed, ref, watch, onMounted } from "vue";
import { GetResults } from "@/api/result";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import { GameTypes } from "@/config/global/GameType";
import { LanguageMapping } from "@/config/application/Mapping"
import { DateLibrary } from "@/library/global/Date";
import { IResultQuery, IResult } from "@/type/Result";
import { CloseAll } from "@/library/global/Close"
import mitt from "@/library/global/Mitt";
import { IDict } from "@/type/Global";
import { NameMap } from "@/type/NameMap";
export default defineComponent({
  components: {
    SinglePicker: defineAsyncComponent(() => import("@/components/datepicker/SingleDatePicker.vue")),
    DivTable: defineAsyncComponent(() => import("@/components/global/DivTable/DivTable.vue")),
  },
  setup() {
    const store = useStore();
    const { t, d } = useI18n()
    const GameType = computed(() => store.getters["Global/GetGameType"]);
    const language = computed(() => {
      return LanguageMapping[store.getters["Global/GetLanguage"]];
    });
    let resultDatas = ref<Array<IResult>>([]);
    let date = ref<string>(DateLibrary.UnixToJsDate(new Date().getTime()));
    let clickDatePicker = ref<boolean>(false);
    let leagueMap = ref<IDict<IDict<NameMap>>>();
    let teamMap = ref<IDict<IDict<NameMap>>>();
    watch(
      () => {
        return date.value;
      },
      () => {
        clickDatePicker.value = !clickDatePicker.value;
        getResultData();
      }
    );
    watch(
      () => {
        return GameType.value;
      },
      () => getResultData()
    );
    const getResultData = async () => {
      await GetResults({
        gameType: GameType.value,
        date: date.value.replaceAll("/", "").replaceAll("-", ""),
      } as IResultQuery).then((res) => {
        resultDatas.value = res?.gameResultData?.gameDtos;
        leagueMap.value = res?.gameResultData?.leagueMap;
        teamMap.value = res?.gameResultData?.teamMap;
      });
    };
    getResultData();

    onMounted(() => {
      mitt.on("closeDate", () => {
        clickDatePicker.value = false;
      });
    });
    return {
      GameTypes,
      GameType,
      CloseAll,
      t,
      d,
      date,
      clickDatePicker,
      resultDatas,
      language,
      leagueMap,
      teamMap,
    };
  },
});
</script>

