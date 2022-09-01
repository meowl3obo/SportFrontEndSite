<template>
  <div class="basic-content">
    <div>
      <h3>{{ data?.teamH?.name }}</h3>
      <div>{{ t("Analysis.HighScore") }}：{{ data?.teamH?.hightscore }}</div>
      <div>{{ t("Analysis.AvgScore") }}：{{ data?.teamH?.avgscore }}</div>
      <div>
        <span :class="data?.teamH?.recentStatus.length > 0 ? 'record' : ''">
          <span class="record-item" :result="item" v-for="(item, index) in data?.teamH?.recentStatus" :key="`H_${index}`">
            {{ item }}
          </span>
        </span>
      </div>
    </div>
    <div>
      <div>{{ data?.gameDate }}</div>
      <div>{{ data?.gameTime }}</div>
    </div>
    <div>
      <h3>{{ data?.teamA?.name }}</h3>
      <div>{{ t("Analysis.HighScore") }}：{{ data?.teamA?.hightscore }}</div>
      <div>{{ t("Analysis.AvgScore") }}：{{ data?.teamA?.avgscore }}</div>
      <div>
        <span :class="data?.teamA?.recentStatus.length > 0 ? 'record' : ''">
          <span class="record-item" :result="item" v-for="(item, index) in data?.teamA?.recentStatus" :key="`A_${index}`">
            {{ item }}
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.basic-content {
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding-block: 20px;
  border: 1px solid var(--op-main-border);
  box-shadow: 0px 0px 7px var(--main-shadow);
  & > div {
    width: 100%;
    text-align: center;

    h3 {
      margin-block: 5px;
    }
  }
}
.record {
  padding-inline: 10px;
  position: relative;
  &::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 0px;
    border-bottom: 2px solid var(--op-main-border);
    top: 50%;
    right: 0;
  }
  &::after {
    position: absolute;
    content: "";
    width: 10px;
    height: 10px;
    top: 53%;
    right: 0;
    border-top: 2px solid var(--op-main-border);
    border-right: 2px solid var(--op-main-border);
    transform: translateY(-50%) rotateZ(45deg)
  }
}
.record-item {
  padding-inline: 5px;
  &[result='W'] {
    color: var(--success-color);
  }
  &[result='L'] {
    color: var(--dark-danger-color);
  }
  &[result='T'] {
    color: var(--warning-color);
  }
}
.win{
  color: var(--hint-success);
}
.lose{
  color: var(--hint-danger);
}
</style>

<script lang="ts">
import { defineComponent, PropType, toRefs, Ref } from 'vue'
import { useI18n } from "vue-i18n";
import { IHeadToHeadStatus } from '@/type/Analysis'

export default defineComponent({
  props: {
    BasicData: {} as PropType<IHeadToHeadStatus>
  },
  setup(props) {
    const { t } = useI18n()
    const data = toRefs(props).BasicData as Ref<IHeadToHeadStatus>

    return { t, data }
  },
})
</script>
