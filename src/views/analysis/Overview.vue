<template>
  <div class="overview">
    <Dashboard style="margin-top: 20px;" :Data="dashBoard"/>
    <div class="games">
      <Game :Data="beforeGame" :Title="'Analysis.Before'" />
      <Game :Data="afterGame" :Title="'Analysis.After'" />
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
.overview {
  color: var(--main-font);
  width: 90%;
  margin-inline: auto;
}
.games {
  justify-content: space-between; 
  margin-top: 20px;
}
</style>

<script lang="ts">
import { defineComponent, defineAsyncComponent, computed, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { GetOverview } from "@/api/analysis";
import { IDict } from "@/type/Global"
import { IReqOverview, IOverviewDashborad, IOverviewGame } from "@/type/Analysis";

export default defineComponent({
  components: {
    Dashboard: defineAsyncComponent(() => import("@/components/analysis/ui/Dashboard.vue")),
    Game: defineAsyncComponent(() => import("@/components/analysis/ui/OverviewGame.vue")),
  },
  setup() {
    const route = useRoute();
    const params = computed(() => { return route.params; });
    const dashBoard = reactive({} as IDict<Array<IOverviewDashborad>>)
    const beforeGame = ref<Array<IOverviewGame>>([])
    const afterGame = ref<Array<IOverviewGame>>([])

    const getOverview = async () => {
      const query: IReqOverview = {
        date: params.value.date as string,
        gameType: params.value.gtype as string,
        leagueID: params.value.lid as string,
      };

      await GetOverview(query).then((res) => {
        // const fakeRes = {
        //   dashboard: {
        //     southeast: [
        //       {
        //         name: "ATL",
        //         win: 41,
        //         lose: 31,
        //         draw: 0,
        //         conf: "0.569",
        //         Conf: "24-18",
        //         div: "9-3",
        //         home: "25-11",
        //         road: "16-20",
        //       },
        //       {
        //         name: "MIA",
        //         win: 40,
        //         lose: 32,
        //         draw: 0,
        //         conf: "0.556",
        //         Conf: "24-18",
        //         div: "6-6",
        //         home: "21-15",
        //         road: "19-17",
        //       },
        //       {
        //         name: "WAS",
        //         win: 34,
        //         lose: 38,
        //         draw: 0,
        //         conf: "0.472",
        //         Conf: "16-26",
        //         div: "3-9",
        //         home: "19-17",
        //         road: "15-21",
        //       },
        //       {
        //         name: "CHA",
        //         win: 33,
        //         lose: 39,
        //         draw: 0,
        //         conf: "0.458",
        //         Conf: "20-22",
        //         div: "8-4",
        //         home: "18-18",
        //         road: "15-21",
        //       },
        //       {
        //         name: "ORL",
        //         win: 21,
        //         lose: 51,
        //         draw: 0,
        //         conf: "0.292",
        //         Conf: "13-29",
        //         div: "4-8",
        //         home: "11-25",
        //         road: "10-26",
        //       },
        //     ],
        //     pacific: [
        //       {
        //         name: "PHX",
        //         win: 51,
        //         lose: 21,
        //         draw: 0,
        //         conf: "0.708",
        //         Conf: "30-12",
        //         div: "7-5",
        //         home: "27-9",
        //         road: "24-12",
        //       },
        //       {
        //         name: "LAC",
        //         win: 47,
        //         lose: 25,
        //         draw: 0,
        //         conf: "0.653",
        //         Conf: "27-15",
        //         div: "9-3",
        //         home: "26-10",
        //         road: "21-15",
        //       },
        //       {
        //         name: "LAL",
        //         win: 42,
        //         lose: 30,
        //         draw: 0,
        //         conf: "0.583",
        //         Conf: "25-17",
        //         div: "4-8",
        //         home: "21-15",
        //         road: "21-15",
        //       },
        //       {
        //         name: "GSW",
        //         win: 39,
        //         lose: 33,
        //         draw: 0,
        //         conf: "0.542",
        //         Conf: "25-17",
        //         div: "5-7",
        //         home: "25-11",
        //         road: "14-22",
        //       },
        //       {
        //         name: "SAC",
        //         win: 31,
        //         lose: 41,
        //         draw: 0,
        //         conf: "0.431",
        //         Conf: "18-24",
        //         div: "5-7",
        //         home: "16-20",
        //         road: "15-21",
        //       },
        //     ],
        //   } as IDict<Array<IOverviewDashborad>>,
        //   beforegame: [
        //     {
        //       gameDate: "2021-12-17",
        //       gameTime: "10:00",
        //       teamH: "Washington Wizards",
        //       teamA: "Phoenix Suns",
        //       scoreH: 98,
        //       scoreA: 118,
        //     },
        //     {
        //       gameDate: "2021-12-17",
        //       gameTime: "09:00",
        //       teamH: "New York Knicks",
        //       teamA: "Houston Rockets",
        //       scoreH: 116,
        //       scoreA: 103,
        //     },
        //     {
        //       gameDate: "2021-12-17",
        //       gameTime: "08:30",
        //       teamH: "Chicago Bulls",
        //       teamA: "Toronto Raptors",
        //       scoreH: 0,
        //       scoreA: 0,
        //     },
        //     {
        //       gameDate: "2021-12-17",
        //       gameTime: "08:30",
        //       teamH: "Philadelphia 76ers",
        //       teamA: "Brooklyn Nets",
        //       scoreH: 105,
        //       scoreA: 114,
        //     },
        //     {
        //       gameDate: "2021-12-17",
        //       gameTime: "08:05",
        //       teamH: "Detroit Pistons",
        //       teamA: "Indiana Pacers",
        //       scoreH: 113,
        //       scoreA: 122,
        //     },
        //     {
        //       gameDate: "2021-12-16",
        //       gameTime: "11:00",
        //       teamH: "Los Angeles Clippers",
        //       teamA: "Utah Jazz",
        //       scoreH: 103,
        //       scoreA: 124,
        //     },
        //   ],
        //   aftergame: [
        //     {
        //       gameDate: "2021-12-20",
        //       gameTime: "07:00",
        //       teamH: "Miami Heat",
        //       teamA: "Detroit Pistons",
        //       scoreH: -1,
        //       scoreA: -1,
        //     },
        //     {
        //       gameDate: "2021-12-20",
        //       gameTime: "07:00",
        //       teamH: "Portland Trail Blazers",
        //       teamA: "Memphis Grizzlies",
        //       scoreH: -1,
        //       scoreA: -1,
        //     },
        //     {
        //       gameDate: "2021-12-20",
        //       gameTime: "07:00",
        //       teamH: "San Antonio Spurs",
        //       teamA: "SAC Kings",
        //       scoreH: -1,
        //       scoreA: -1,
        //     },
        //     {
        //       gameDate: "2021-12-20",
        //       gameTime: "08:30",
        //       teamH: "Cleveland Cavaliers",
        //       teamA: "Atlanta Hawks",
        //       scoreH: -1,
        //       scoreA: -1,
        //     },
        //     {
        //       gameDate: "2021-12-20",
        //       gameTime: "08:30",
        //       teamH: "Denver Nuggets",
        //       teamA: "Brooklyn Nets",
        //       scoreH: -1,
        //       scoreA: -1,
        //     },
        //     {
        //       gameDate: "2021-12-20",
        //       gameTime: "09:00",
        //       teamH: "New Orleans Pelicans",
        //       teamA: "Philadelphia 76ers",
        //       scoreH: -1,
        //       scoreA: -1,
        //     },
        //   ],
        // };
        // Object.keys(fakeRes.dashboard).forEach((key) => {
        //   dashBoard[key] = fakeRes.dashboard[key]
        // })
        // beforeGame.value = fakeRes.beforegame
        // afterGame.value = fakeRes.aftergame
        
        const response = res?.response
        const request = res?.request
        if (!response && !request && res) {
          if (res.dashboard) Object.keys(res.dashboard).forEach((key) => {
            dashBoard[key] = res.dashboard[key]
          })
          if (res.afterGame) afterGame.value = res.afterGame
          if (res.beforeGame) beforeGame.value = res.beforeGame
          console.log(res);
        }
        
      });
    };

    getOverview();

    return { dashBoard, beforeGame, afterGame }
  },
});
</script>
