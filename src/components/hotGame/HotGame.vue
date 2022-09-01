<template>
  <div
    class="hotgame"
    :ref="(el) => { carousel = el}"
    @mousedown="mousedown"
    @mousemove="mousemove"
    @mouseup="mouseup"
  >
    <div class="carousel">
      <div
        class="hotgame-card"
        v-for="(item, key) in hotGameDatas"
        :key="`hotgame_${key}`"
      >
        <div class="hotgame-league">{{ item.league[language] ? item.league[language] : item.leagueDefault }}</div>
        <div class="hotgame-team">
          <div :ref="`${item.gameID}`" class="hotgame-team-h" :title="item.teamH[language] ? item.teamH[language] : item.teamHDefault">{{ item.teamH[language] ? item.teamH[language] : item.teamHDefault }}</div>
          <div class="hotgame-score">{{ item.scoreH == -1 ? 0 : item.scoreH }} : {{ item.scoreA == -1 ? 0 : item.scoreA }}</div>
          <div :ref="`${item.gameID}`" class="hotgame-team-a" :title="item.teamA[language] ? item.teamA[language] : item.teamADefault">{{ item.teamA[language] ? item.teamA[language] : item.teamADefault }}</div>
        </div>
        <div>{{ item.gameDate?.replace("-", "*").replace(/20.+\*/, "").replace("-", "/") }} {{ item.gameTime }}</div>
        <div class="hotgame-analysis">
          <div class="analysis" @click="toAnalysis(item.leagueID, item.gameID, item.gameDate, item.gameType)">{{ t("Home.Analysis") }} <icon :icon="['fas', 'angles-right']" /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@mixin hotgame-team-mixin($team) {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @if ($team == "H") {
    text-align: left;
  } @else if ($team == "A") {
    text-align: right;
  } @else {
    text-align: center;
  }
}
.hotgame {
  width: calc(100vw - 40px);
  height: 95px;
  padding: 10px 20px;
  background-color: transparent;
  overflow-x: auto;
  user-select: none;

  &::-webkit-scrollbar {
    background-color: transparent;
    height: 0px;
  }
}

.carousel {
  display: flex;
  align-items: flex-start;
  grid-gap: 20px;
}

.hotgame-card {
  height: 90px;
  min-width: 300px;
  border-radius: 5px;
  border-left: 2px solid var(--minor-border);
  color: var(--main-font);
  background-color: var(--bg-card);
  padding: 2.5px 15px;
  box-shadow: 1.5px 1.5px 4px var(--main-shadow);
  font-size: 13px;

  & > div {
    display: flex;
    height: 25%;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
  & > div.hotgame-team {
    justify-content: space-between;

    .hotgame-score { 
      white-space: nowrap;
      padding-inline: 7px;
    }
  }

  & > div.hotgame-analysis {
    display: flex;
    .analysis {
      cursor: pointer;
      &:hover > svg {
        animation: hover-right 0.3s linear;
      }
    }
    // div:nth-child(1) {
    //   margin-right: 20px;
    // }
    // div:nth-child(2) {
    //   margin-left: 20px;
    // }
  }
}

.hotgame-league {
  font-weight: bold;
}

.hotgame-team-h {
  @include hotgame-team-mixin("H");
}

.hotgame-team-a {
  @include hotgame-team-mixin("A");
}
</style>

<script lang="ts">
import { defineComponent, ref, computed, onBeforeUnmount } from "vue";
import { useStore } from "vuex"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n";
import { HotGame } from "@/api/home"
import { tidyData } from "@/library/HotGame/TidyData"
// import Websocket from "@/library/global/Websocket"
// import { WSConfig } from "@/config/application/Websocket"
export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const { t } = useI18n()
    // const wsHotGame = new Websocket();
    const hotGameDatas = computed(() => store.getters["HotGame/GetHotGames"]);
    const language = computed(() => store.getters["Global/GetLanguage"]);
    let isDown = ref<boolean>(false);
    let start = ref<number>(0);
    let carousel =ref<HTMLElement>();
    let scrollLeft = ref<number>(0);
    const interval = ref<ReturnType<typeof setInterval>>()

    const getHotGame = async () => {
      await HotGame().then((res) => {
        const response = res?.response
        const request = res?.request
        if (!response && !request && res) {
          tidyData(res)
        }
      })
      // connectWSHotGame()
    }

    // const connectWSHotGame = () => {
    //   wsHotGame.ConnectHub(WSConfig.url, WSConfig.group, "Match_UI", WSConfig.key);
    //   Object.defineProperty(Websocket, 'ResponseMsg', {
    //       set: (message: string) => {
    //         tidyWSData(message)
    //       }
    //   })
    // }

    const mousedown = (e:MouseEvent) =>  {
      start.value = e.pageX;
      scrollLeft.value = carousel.value?.scrollLeft as number;
      isDown.value = true;
    }

    const mousemove = (e: MouseEvent) =>  {
      if (!isDown.value) return;
      e.preventDefault();
      if (carousel.value) {
        const x = e.pageX - carousel.value?.offsetLeft;
        const walk = (x - start.value) * 2;
        carousel.value.scrollLeft = scrollLeft.value - walk;
      }
    }

    const mouseup = () =>  {
      isDown.value = false;
    }

    const toAnalysis = (lid: string, gid: string, date: string, gType: string) => {
      const gDate = date.replaceAll('-', '')
      console.log(date)
      router.push(`/analysis/match/${gType}/${gDate}/${lid}/${gid}`)
    }

    getHotGame()

    interval.value = setInterval(() => {
      getHotGame()
    }, 300000)

    onBeforeUnmount(() => {
      if (interval.value) clearInterval(interval.value)
    })

    // watch(
    //   () => { return hotGameDatas.value },
    //   () => { console.log(hotGameDatas.value); }
    // )

    return { t, carousel, hotGameDatas, language,  mousedown, mousemove, mouseup, toAnalysis }
  },
});
</script>