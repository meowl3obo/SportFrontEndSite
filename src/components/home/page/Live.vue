<template>
  <div class="live" :ref="el => { thisDoc = el }">
    <LiveCanvas v-if="Memo"/>
    <div v-if="Object.keys(LiveDataCaches).length >= 1">
      <template v-for="(item, LID) in LiveDataCaches" :key="`oddtable_${LID}`" v-cloak>
        <div v-collapse:check="`${LID}_${Object.keys(LiveDataCaches).indexOf(LID)}`" class="title">{{ Object.values(item)[0].league[language] ? Object.values(item)[0].league[language] : Object.values(item)[0].leagueDefault }}</div>
        <div :id="`col_${LID}_${Object.keys(LiveDataCaches).indexOf(LID)}`" class="table-scroll collapse">
          <div class="live-div-table">
            <div class="live-div-tr live-div-thead">
              <div class="live-div-td" style="width: 0px; padding-inline: unset"></div>
              <div class="live-div-td" style="width: 60px"></div>
              <div class="live-div-td" style="width: 210px"></div>
              <div class="live-div-td" style="width: 35px"></div>
              <div class="live-div-td" style="width: 150px">ZB</div>
              <div class="live-div-td" style="width: 150px" v-if="GameType == 'SC'">HGA</div>
              <div class="live-div-td" style="width: 150px">Ku888</div>
              <div class="live-div-td" style="width: 150px">NK</div>
              <div class="live-div-td" style="width: 150px">KKK</div>
              <div class="live-div-td" style="width: 150px" v-if="GameType == 'SC'">188Bet</div>
              <div class="live-div-td" style="width: 150px">1xBET</div>
              <div class="live-div-td" style="width: 150px">PS3838</div>
              <div class="live-div-td">Status</div>
              <div class="live-div-td" style="width: 100px"></div>
            </div>
            <div
              class="live-div-tr live-div-tbody"
              v-cloak
              v-for="item2 in item"
              :key="`oddtr_${item2.gameID}`"
            >
              <div class="live-div-td">
                <div>
                  <div>{{ item2.gameDate.replace("-", "*").replace(/20.+\*/, "").replace("-", "/") }}</div>
                  <div>{{ item2.gameTime }}</div>
                </div>
              </div>
              <div class="live-div-td">
                <div class="odd">
                  <div>{{ item2.teamH[language] ? item2.teamH[language] : item2.teamHDefault }}</div>
                  <div></div>
                  <div>{{ item2.teamA[language] ? item2.teamA[language] : item2.teamADefault }}</div>
                </div>
              </div>
              <div class="live-div-td">
                <div class="odd">
                  <div>{{ item2.scoreH }}</div>
                  <div></div>
                  <div>{{ item2.scoreA }}</div>
                </div>
              </div>
              <div class="live-div-td">
                <Odd :data="item2.site['zba']"></Odd>
              </div>
              <div class="live-div-td" v-if="GameType == 'SC'">
                <Odd :data="item2.site['hga.com']"></Odd>
              </div>
              <div class="live-div-td">
                <Odd :data="item2.site['ku888']"></Odd>
              </div>
              <div class="live-div-td">
                <Odd :data="item2.site['nk.net']"></Odd>
              </div>
              <div class="live-div-td">
                <Odd :data="item2.site['kkk.net']"></Odd>
              </div>
              <div class="live-div-td" v-if="GameType == 'SC'">
                <Odd :data="item2.site['188bet']"></Odd>
              </div>
              <div class="live-div-td">
                <Odd :data="item2.site['1xbet.com']"></Odd>
              </div>
              <div class="live-div-td">
                <Odd :data="item2.site['ps3838.com']"></Odd>
              </div>
              <div class="live-div-td">
                <div>
                  <div v-for="(val, key) in item2.Status" :key="`${item2.gameID}_${key}`">
                    <span style="white-space: nowrap;"> {{val}} </span>
                  </div>
                </div>
              </div>
              <div class="live-div-td">
                <div class="links-div">
                  <div class="link">
                    <span @click="toLive(item2.gameID, item2.gameType)">{{ t("Home.Live") }}</span>
                  </div>
                  <div class="link">
                    <span @click="toAnalysis(item2.leagueID, item2.gameID, item2.gameDate, item2.gameType)">{{ t("Home.Analysis") }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div v-else class="no-game">
      <h2>
        No Games
      </h2>
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
import { computed, defineAsyncComponent, defineComponent, inject, ref, watch, Ref, onBeforeUnmount } from 'vue'
import { useStore } from "vuex"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n";
import { GetLiveGame } from "@/api/home"
import { IGameData, IReqLiveGame } from "@/type/Game"
import { tidyApiData } from "@/library/Live/TidyData"
import mitt from "@/library/global/Mitt"
import Websocket from "@/library/global/Websocket"
// import { WSConfig } from "@/config/application/Websocket"
import html2canvas from "html2canvas";
export default defineComponent({
  components: {
    Odd: defineAsyncComponent(() => import("../ui/Odd.vue")),
    LiveCanvas: defineAsyncComponent(() => import("../ui/LiveCanvas.vue")),
  },
  setup() {
    const store = useStore();
    const router = useRouter()
    const { t } = useI18n()
    const thisDoc = ref<HTMLElement>();
    const wsLive = new Websocket();
    const Memo = computed(() => store.getters["Component/GetMemo"]);
    const GameType = computed(() => store.getters["Global/GetGameType"]);
    const LiveDatas = computed(() => store.getters["Live/GetGameDatas"]);
    let LiveDataCaches = ref<any>({});
    const language = computed(() => store.getters["Global/GetLanguage"]);
    const hour = inject("hour") as Ref<number>;
    const interval = ref<ReturnType<typeof setInterval>>()
    const saveImgUrl = ref<string>("");
    const downloadDom = ref<HTMLElement>();
    watch(
      () => { return LiveDatas.value },
      () => {
        let newLeagues = Object.keys(LiveDatas.value);
        let oldLeagues = Object.keys(LiveDataCaches.value);
        let stopUpdate: Array<string> = oldLeagues.filter((league) => {return !newLeagues.includes(league)});
        newLeagues.forEach((key: string) => {
          LiveDataCaches.value[key] = LiveDatas.value[key];
        })
        stopUpdate.forEach((key: string) => {
          if (LiveDataCaches.value[key] != undefined) {
            delete LiveDataCaches.value[key];
          }
        })
      }
    )
    const getLiveData = async () => {
      const query: IReqLiveGame = {
        hourrange: hour.value as 3 | 6 | 12 | 24
      }
      await GetLiveGame(GameType.value, query).then((res) => {
        const response = res?.response
        const request = res?.request
        if (!response && !request && res?.length >= 1) {
          tidyApiData(res)
        } else {
          store.dispatch("Live/SetGameDatas", {} as IGameData)
        }
      })
    }

    // const connectWSLive = () => {
    //   wsLive.ConnectHub(WSConfig.url, WSConfig.group, `${GameType.value}_UI`, WSConfig.key);
    //   Object.defineProperty(Websocket, 'ResponseMsg', {
    //       set: (message: string) => {
    //         tidyWSData(message)
    //       }
    //   })
    // }

    const save = () => {
      if (thisDoc.value != undefined) {
        html2canvas(thisDoc.value, {backgroundColor: '#0F1110'}).then((res: HTMLCanvasElement) => {
          const dataURl = res.toDataURL("image/png")

          var aTag = document.createElement("a");
          aTag.id = 'download';
          aTag.download = 'SportDataMemo.png'
          aTag.href = dataURl
          aTag.click();
          aTag.parentNode?.removeChild(aTag)
          store.dispatch("Component/SetMemo", false)
        })
      }
    }

    const toAnalysis = (lid: string, gid: string, date: string, gType: string) => {
      const gDate = date.replaceAll('-', '')
      router.push(`/analysis/match/${gType}/${gDate}/${lid}/${gid}`)
    }

    const toLive = (gid: string, gType: string) => {
      router.push(`/livechat/${gType}/${gid}`)
    }

    interval.value = setInterval(() => {
      getLiveData()
    }, 300000)

    mitt.on("save", save)

    getLiveData()

    onBeforeUnmount(() => {
      if (interval.value) clearInterval(interval.value)
    })

    watch(
      () => { return hour.value },
      () => { getLiveData() }
    )

    watch(
      () => { return GameType.value },
      () => {
        LiveDataCaches.value = {}
        wsLive.DeConnection();
        getLiveData();
      }
    )

    // watch(
    //   () => { return Memo.value },
    //   () => {
    //     if (Memo.value) wsLive.DeConnection
    //     else connectWSLive()
    //   }
    // )

    return { t, thisDoc, Memo, LiveDataCaches, language, toAnalysis, toLive, GameType, saveImgUrl, downloadDom }
  }
})
</script>