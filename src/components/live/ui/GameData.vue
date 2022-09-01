<template>
  <div style="margin-top: 20px">
    <div class="live-div-table">
      <div class="live-div-tr live-div-thead">
        <div class="live-div-td" style="width: 0px; padding-inline: unset"></div>
        <div class="live-div-td" style="width: 60px"></div>
        <div class="live-div-td" style="width: 210px"></div>
        <div class="live-div-td" style="width: 35px"></div>
        <div class="live-div-td" style="width: 150px">ZB</div>
        <div class="live-div-td" style="width: 150px" v-if="gameType == 'SC'">HGA</div>
        <div class="live-div-td" style="width: 150px">Ku888</div>
        <div class="live-div-td" style="width: 150px">NK</div>
        <div class="live-div-td" style="width: 150px">KKK</div>
        <div class="live-div-td" style="width: 150px" v-if="gameType == 'SC'">188Bet</div>
        <div class="live-div-td" style="width: 150px">1xBET</div>
        <div class="live-div-td" style="width: 150px">PS3838</div>
        <div class="live-div-td">Status</div>
        <div class="live-div-td" style="width: 100px"></div>
      </div>
      <div
        class="live-div-tr live-div-tbody"
        v-for="item in gameData.gameLiveDtos"
        :key="`oddtr_${item.gameID}`"
      >
        <div class="live-div-td">
          <div>
            <div>{{ item.gameDate?.replace("-", "*").replace(/20.+\*/, "").replace("-", "/") }}</div>
            <div>{{ item.gameTime }}</div>
          </div>
        </div>
        <div class="live-div-td">
          <div class="odd">
            <div>{{ gameData.teamMap[item.team1]?.mapLang[language] ? gameData.teamMap[item.team1].mapLang[language] : item.team1 }}</div>
            <div></div>
            <div>{{ gameData.teamMap[item.team2]?.mapLang[language] ? gameData.teamMap[item.team2].mapLang[language] : item.team2 }}</div>
          </div>
        </div>
        <div class="live-div-td">
          <div class="odd">
            <div>{{ item.score1 }}</div>
            <div></div>
            <div>{{ item.score2 }}</div>
          </div>
        </div>
        <div class="live-div-td">
          <!-- <template v-if="item.siteGameDtos?.filter(x => x.site == 'zba')[0]"> -->
          <Odd :data="item.siteGameDtos?.filter(x => x.site == 'zba')[0]"></Odd>
          <!-- </template> -->
        </div>
        <div class="live-div-td" v-if="gameType == 'SC'">
          <!-- <template v-if="item.siteGameDtos?.filter(x => x.site == 'hga.com')[0]"> -->
          <Odd :data="item.siteGameDtos?.filter(x => x.site == 'hga.com')[0]"></Odd>
          <!-- </template> -->
        </div>
        <div class="live-div-td">
          <!-- <template v-if="item.siteGameDtos?.filter(x => x.site == 'ku888')[0]"> -->
          <Odd :data="item.siteGameDtos?.filter(x => x.site == 'ku888')[0]"></Odd>
          <!-- </template> -->
        </div>
        <div class="live-div-td">
          <!-- <template v-if="item.siteGameDtos?.filter(x => x.site == 'nk.net')[0]"> -->
          <Odd :data="item.siteGameDtos?.filter(x => x.site == 'nk.net')[0]"></Odd>
          <!-- </template> -->
        </div>
        <div class="live-div-td">
          <!-- <template v-if="item.siteGameDtos?.filter(x => x.site == 'kkk.net')[0]"> -->
          <Odd :data="item.siteGameDtos?.filter(x => x.site == 'kkk.net')[0]"></Odd>
          <!-- </template> -->
        </div>
        <div class="live-div-td" v-if="gameType == 'SC'">
          <!-- <template v-if="item.siteGameDtos?.filter(x => x.site == '188bet')[0]"> -->
          <Odd :data="item.siteGameDtos?.filter(x => x.site == '188bet')[0]"></Odd>
          <!-- </template> -->
        </div>
        <div class="live-div-td">
          <!-- <template v-if="item.siteGameDtos?.filter(x => x.site == '1xbet.com')[0]"> -->
          <Odd :data="item.siteGameDtos?.filter(x => x.site == '1xbet.com')[0]"></Odd>
          <!-- </template> -->
        </div>
        <div class="live-div-td">
          <!-- <template v-if="item.siteGameDtos?.filter(x => x.site == 'ps3838.com')[0]"> -->
          <Odd :data="item.siteGameDtos?.filter(x => x.site == 'ps3838.com')[0]"></Odd>
          <!-- </template> -->
        </div>
        <!-- <div class="live-div-td">
          <div>
            <div v-for="(val, key) in item.Status" :key="`${item.gameID}_${key}`">
              <span style="white-space: nowrap;"> {{val}} </span>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/component/_live.scss";
@import "@/styles/_common.scss";
@include mixin-phone {
  .title {
    font-size: 12px;
  }
}
.live {
  position: relative;
  overflow-x: hidden;
}

canvas {
  position: absolute;
  z-index: 10;
}

.canvas-input {
  position: absolute;
  z-index: -1;
  background-color: transparent;
  outline: unset;
  border: unset;
}
::v-deep [v-cloak] {
  display: none !important;
}

.no-game {
    display: flex;
    justify-content: center;
    color: var(--main-color);
}
</style>

<script lang="ts">
import { computed, defineComponent, defineAsyncComponent, ref, onBeforeUnmount } from 'vue'
import { useStore } from "vuex"
import { useRoute } from "vue-router"
import { GetOnlyGameData } from "@/api/liveChat"
import { IDict } from "@/type/Global"
import { IReqOnlyGame, IOnlyGame } from '@/type/LiveChat'

export default defineComponent({
  components: {
    Odd: defineAsyncComponent(() => import("./Odd.vue")),
  },
  setup() {
    const store = useStore();
    const route = useRoute()
    const langMap: IDict<string> = {
      "zh-TW": "tw",
      "zh-CN": "cn",
      "en-US": "us",
      "ja-JP": "jp",
      "th-TH": "th",
      "vi-VN": "vn",
    }
    const language = computed(() => { return langMap[store.getters["Global/GetLanguage"]] });
    const params = computed(() => { return route.params })
    const gameData = ref<IOnlyGame>({} as IOnlyGame)
    const gameType = ref<string>("")
    const gameID = ref<string>("")
    const interval = ref<ReturnType<typeof setInterval>>()

    const setDefault = () => {
      gameType.value = params.value.gtype as string
      gameID.value = params.value.gid as string
    }

    const getOnlyGame = async () => {
      const query: IReqOnlyGame = {
        gameType: gameType.value,
        gameID: gameID.value,
      }
      await GetOnlyGameData(query).then((res) => {
        const response = res?.response
        const request = res?.request
        if (!response && !request && res && res.code == 10000) {
          gameData.value = res
        }
      })
    }

    interval.value = setInterval(() => {
      getOnlyGame()
    }, 300000)


    onBeforeUnmount(() => {
      if (interval.value) clearInterval(interval.value)
    })

    setDefault()
    getOnlyGame()

    return { gameData, gameType, language }
  },
})
</script>
