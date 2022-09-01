<template>
  <div class="adv-bar">
    <template v-if="advData.length > 0">
      <div class="img-content" v-for="item in advData" :key="`adv_${item.id}`">
        <!-- {{ item }} -->
        <img :src="`${imgUrl}/${item.path}`" :title="item.title" @click="toAdv(item.url)" :onerror="errorImg()" >
      </div>
    </template>
    <!-- <template>
      <div class="img-content" v-for="item in 9" :key="`adv_${item}`">
        <div class="fake-img" />
      </div>
    </template> -->
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/_common.scss";
.adv-bar {
  color: var(--main-font);
  position: absolute;
  width: 200px;
  height: calc(100vh - 195px);
  background-color: transparent;
  overflow-y: auto;
  overflow-x: hidden;
  transition: right 0.25s ease;

  &::-webkit-scrollbar {
    background-color: transparent;
    width: 0px;
  }
}
@include mixin-phone {
  .adv-bar {
    right: -200px;
  }
}
@include mixin-pc {
  .adv-bar {
    right: 0;
  }
}
.img-content {
  padding: 10px 15px;
  img {
    cursor: pointer;
    width: 100%;
  }
}
.fake-img {
  width: 170px;
  height: 140px;
  background-color: var(--non-img);
}
</style>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from "vuex";
import { GetAdvData } from '@/api/adv'
import { IRequestAdvData, IAdvData } from '@/type/Adv'

export default defineComponent({
  setup() {
    const store = useStore();
    const language = computed(() => { return store.getters["Global/GetLanguage"] })
    const advData = ref<Array<IAdvData>>([])
    const imgUrl = ref<string>("/img")

    const getAdvData = async () => {
      const query: IRequestAdvData = {
        type: 'right',
        lang: language.value
      }
      await GetAdvData(query).then((res) => {
        const response = res?.response
        const request = res?.request
        if (!response && !request && res) {
          advData.value = res
        }
      })
    }

    const toAdv = (url: string) => {
      window.open(url)
    }

    const errorImg = () => {
      return `this.src="${require('@/assets/nonImg.png')}"`
    }

    getAdvData()

    return { advData, imgUrl, toAdv, errorImg }
  },
})
</script>
