<template>
<!-- 完全沒資料 -->

    <div v-if="gameData == null || Object.keys(gameData).length == 0" class="odd" >
      <div></div>
      <div>N/A</div>
      <div></div>
    </div>
    <div v-else class="spread-odd">
      <div class="spread">
        <div>{{ gameData.match_H }} </div>
        <div>{{ getHA(gameData.mainSpread) }}</div>
      </div>
      <!-- <div></div> -->
      <div class="spread">
        <div>{{ gameData.match_A }} </div>
        <div>{{ getOU(gameData.mainSpread) }}</div>
      </div>
    </div>
<!-- HA為負 -->
    <!-- <div v-else-if="(gameData['HA']?.spread != undefined) && gameData['HA']?.spread.indexOf('-') == 0" class="odd">
      <div v-if="gameData['OU']?.spread == undefined">
        N/A
      </div>
      <div v-else>
        <div>{{ gameData["OU"].spread }}</div>
        <div>
          {{ gameData["OU"].o }} /
          {{ gameData["OU"].u }}
        </div>
      </div>
      <div v-if="gameData['1X2']?.spread == undefined">
        N/A
      </div>
      <div v-else>
        <div>{{ gameData["1X2"].spread }}</div>
        <div>
          {{ gameData["1X2"].h }} /
          {{ gameData["1X2"].a }}
        </div>
      </div>
      <div>
        <div>{{ gameData["HA"]?.spread.substring(1) }}</div>
        <div>
          {{ gameData["HA"].h }} /
          {{ gameData["HA"].a }}
        </div>
      </div>
    </div> -->
<!-- HA為正 -->
    <!-- <div v-else class="odd">
      <div v-if="gameData['HA']?.spread == undefined">
        N/A
      </div>
      <div v-else>
        <div>{{ gameData["HA"].spread }}</div>
        <div>
          {{ gameData["HA"].h }} /
          {{ gameData["HA"].a }}
        </div>
      </div>
      <div v-if="gameData['1X2']?.spread == undefined">
        N/A
      </div>
      <div v-else>
        <div>{{ gameData["1X2"].spread }}</div>
        <div>
          {{ gameData["1X2"].h }} /
          {{ gameData["1X2"].a }}
        </div>
      </div>
      <div v-if="gameData['OU']?.spread == undefined">
        N/A
      </div>
      <div v-else>
        <div>{{ gameData["OU"].spread }}</div>
        <div>
          {{ gameData["OU"].o }} /
          {{ gameData["OU"].u }}
        </div>
      </div>
    </div> -->
</template>

<style lang="scss" scoped>
@import "@/styles/component/_live.scss";
.spread-odd {
  height: 54px;
  justify-content: space-around !important;
}
.spread {
  display: flex;
  justify-content: space-between;
  & > div:nth-child(1) {
    width: 100%;
    text-align: right;
    padding-right: 5px;
  }
  & > div:nth-child(2) {
    width: 100%;
    text-align: left;
    padding-left: 5px;
  }
}
</style>

<script lang="ts">
import { defineComponent, toRefs, Ref, PropType } from 'vue'
import { IGameData } from "@/type/Game"
export default defineComponent({
  props: {
    data: {} as PropType<IGameData>
  },
  setup(props) {
    const gameData = toRefs(props).data as Ref<IGameData>

    const getHA = (spread: string) => {
      if (!spread) return "-"
      const data = JSON.parse(`{${spread?.replace("HA", "\"HA\"")?.replace("OU", "\"OU\"")?.replaceAll(":", ":\"")?.replaceAll(",", spread?.includes('OU') ? "\"," : "\"")}${spread?.includes('OU') ? "\"" : ''}}`)
      return data["HA"] ? data["HA"] : "-"
    } 
    
    const getOU = (spread: string) => {
      if (!spread) return "-"
      const data = JSON.parse(`{${spread?.replace("HA", "\"HA\"")?.replace("OU", "\"OU\"")?.replaceAll(":", ":\"")?.replaceAll(",", spread?.includes('OU') ? "\"," : "\"")}${spread?.includes('OU') ? "\"" : ''}}`)
      return data["OU"] ? `o${data["OU"]}` : "-"
    }


    return { gameData, getHA, getOU }
  }
})
</script>
