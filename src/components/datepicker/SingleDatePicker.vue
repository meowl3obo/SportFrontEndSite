<template>
  <div class="picker-outside">
    <!-- <div class="search-date">
      {{ year }}/{{ getMonth(month) }}/{{ getDay(day) }} ({{ nowWeek }})
    </div> -->
    <div class="search-date-content">
      <div class="search-year-title" @click.stop="">
        <div class="year-picker" @click="changeYear(year - 1)">
          <icon :icon="['fas', 'angle-left']" />
          <icon :icon="['fas', 'angle-left']" />
        </div>
        <div class="year-picker" @click="changeMonth(month - 1)">
          <icon :icon="['fas', 'angle-left']" />
        </div>
        <div>{{ title }}</div>
        <div class="year-picker" @click="changeMonth(month + 1)">
          <icon :icon="['fas', 'angle-right']" />
        </div>
        <div class="year-picker" @click="changeYear(year + 1)">
          <icon :icon="['fas', 'angle-right']" />
          <icon :icon="['fas', 'angle-right']" />
        </div>
      </div>
      <hr />
      <table>
        <thead>
          <tr>
            <td>{{ t("Date.Sun") }}</td>
            <td>{{ t("Date.Mon") }}</td>
            <td>{{ t("Date.Tue") }}</td>
            <td>{{ t("Date.Wed") }}</td>
            <td>{{ t("Date.Thu") }}</td>
            <td>{{ t("Date.Fri") }}</td>
            <td>{{ t("Date.Sat") }}</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="index in weekLength" :key="`date_${index}`">
            <td
              v-for="(day, index2) in allWaek[index - 1]"
              :key="`aweak_${index2}`"
              :current="current(day, notCurrentMonth(index, day, weekLength))"
              :notCurrentMonth="notCurrentMonth(index, day, weekLength)"
              @click="changeDay(day, notCurrentMonth(index, day, weekLength))"
            >
              {{ day }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/component/_datepicker.scss";
</style>

<script lang="ts">
import { defineComponent, ref, toRefs, Ref, watch, computed } from "vue";
import { useI18n } from "vue-i18n";
import { WeekMapping } from "@/config/global/mapping"
import { GetCalendar } from "@/library/datePicker/Calendar";
import { GetWeek } from "@/library/global/Date"
export default defineComponent({
  props: {
    modelValue: String,
  },
  setup(props, { emit }) {
    const { t, d } = useI18n()
    const defaultValue = toRefs(props).modelValue as Ref<string>;
    let title = ref<string>("");
    let showDate = ref<string>("");
    let year = ref<number>(0);
    let month = ref<number>(0);
    let day = ref<number>(0);
    let lastDays = ref<number>(0);
    let days = ref<number>(0);
    let week = ref<number>(0);
    let weekLength = ref<number>(0);
    let allWaek = ref<Array<Array<number>>>([]);
    let nowWeek = computed(() => { return WeekMapping[GetWeek(year.value, month.value - 1, day.value)]})

    const init = () => {
      getToday();
      showDate.value = `${year.value}/${getMonth(month.value)}/${getDay(day.value)}`
      if (defaultValue.value != "" && defaultValue.value) setDedefault()
      emit("update:modelValue", showDate.value.replaceAll("/", "-"))
      getCalendar();
      getTitle();
    };

    const setDedefault = () => {
      showDate.value = defaultValue.value.replaceAll("-", "/").replace(/\s.+/, '');
      const getDate = defaultValue.value.match(/\d+/g);
      year.value = Number(getDate![0]);
      month.value = Number(getDate![1]);
      day.value = Number(getDate![2]);
    }

    const getToday = () => {
      const date = new Date();
      year.value = date.getFullYear();
      month.value = date.getMonth() + 1;
      day.value = date.getDate();
    };

    const getCalendar = () => {
      const calendar = GetCalendar(`${year.value}-${ month.value < 10 ? `0${month.value}` : month.value}`);
      year.value = calendar.year;
      month.value = calendar.month + 1;
      lastDays.value = calendar.lastDays;
      days.value = calendar.days;
      week.value = calendar.week;
      weekLength.value = calendar.weekLength;
      allWaek.value = calendar.allWaek;
    };

    const getMonth = (month: number) => {
      return month < 10 ? `0${month}` : month ;
    };

    const getDay = (day: number) => {
      return day < 10 ? `0${day}` : day;
    };
    const getHour = (hour: number) => {
      return hour < 10 ? `0${hour}` : hour;
    };

    const getMin = (min: number) => {
      return min < 10 ? `0${min}` : min;
    };
    const changeDay = (newDay: number, notCurrent: boolean) => {
      if (notCurrent) {
        if (newDay > 8) changeMonth(month.value - 1);
        else changeMonth(month.value + 1);
      }
      day.value = newDay;
      showDate.value = `${year.value}/${getMonth(month.value)}/${getDay(day.value)}`;
      emit("update:modelValue", showDate.value.replaceAll("/", "-"));
    };

    const changeMonth = (newMonth: number) => {
      if (newMonth <= 0) {
        changeYear(year.value - 1);
        month.value = 11;
      } else if (newMonth > 12) {
        changeYear(year.value + 1);
        month.value = 1;
      } else {
        month.value = newMonth;
      }
      const max = new Date(year.value, newMonth, 0).getDate();
      if (day.value > max) day.value = max;
      getCalendar();
      showDate.value = `${year.value}/${getMonth(month.value)}/${getDay(day.value)}`;
    };

    const changeYear = (newYear: number) => {
      year.value = newYear;
      const max = new Date(year.value, month.value, 0).getDate();
      if (day.value > max) day.value = max;
      getCalendar();
      showDate.value = `${year.value}/${getMonth(month.value)}/${getDay(day.value)}`;
    };

    const notCurrentMonth = (week: number, day: number, max: number) => {
      if (week == 1) {
        if (day > 7) return true;
        return false;
      } else if (week == max) {
        if (day < 10) return true;
        return false;
      } 
      return false;
    };

    const current = (day: number, notCurrent: boolean) => {
      if (notCurrent || `${year.value}/${getMonth(month.value)}/${getDay(day)}` != showDate.value) return false;
      return true;
    };

    const getTitle = () => {
      title.value = `${year.value}/${month.value < 10 ? `0${month.value}` : month.value }`;
    };

    const resetDate = () => {
      showDate.value = "";
    };

    init();

    watch(
      () => { return showDate.value },
      () => getTitle()
    )
    watch(
      () => { return defaultValue.value },
      () => {
        if (defaultValue.value != showDate.value.replaceAll('/', '-')) {
          setDedefault()
          getCalendar()
        }
      }
    )

    return { t, showDate, title, year, month, day, weekLength, allWaek, nowWeek, GetWeek, getMonth, getDay, getHour, getMin, notCurrentMonth, current, resetDate, changeDay, changeMonth, changeYear };
  },
});
</script>
