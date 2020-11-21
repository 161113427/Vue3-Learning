<template>
  <div class="calendar">
    <h1 class="title-1">Kalender</h1>
    <div>
      <ul class="years">
        <li class="year" @click="yearState.funcPrevYear">{{ yearState.prevYear }}</li>
        <li class="year">{{ yearState.currentYear }}</li>
        <li class="year" @click="yearState.funcNextYear">{{ yearState.nextYear }}</li>
      </ul>
    </div>
    <div>
      <ul class="months">
        <li class="month" @click="monthState.prevMonth">{{ monthState.prevMonthStr }}</li>
        <li class="month currentMonth">{{ monthState.currentMonthStr }}</li>
        <li class="month" @click="monthState.nextMonth">{{ monthState.nextMonthStr }}</li>
      </ul>
    </div>
    <Days :dates="totalDays" :startDay="start" :info="info" class="days"></Days>
  </div>
</template>

<script>
import Days from "./Days";
import { ref, reactive, computed} from 'vue'

function dayInMonth(year, month){
  return new Date(year, month + 1, 0).getDate();
}

function startDay(year,month){
  return new Date(year, month, 1).getDay();
}

export default {
  setup() {
    //using Reactive
    let monthState = reactive({
      currentMonth: new Date().getMonth(),
      currentMonthStr: computed(() => new Date(null, monthState.currentMonth).toLocaleString('id-ID', {month:"long"})),
      nextMonthStr:  computed(() => new Date(null,(monthState.currentMonth + 1)).toLocaleString('id-ID', {month:"long"})),
      prevMonthStr:  computed(() => new Date(null,(monthState.currentMonth - 1)).toLocaleString('id-ID', {month:"long"})),
      prevMonth: () => {
        if (monthState.currentMonth === 0){
          monthState.currentMonth = 11;
          yearState.currentYear--;
        }
        else
          monthState.currentMonth--;
      },
      nextMonth: () => {
        if (monthState.currentMonth === 11){
          monthState.currentMonth = 0;
          yearState.currentYear++;
        }
        else
          monthState.currentMonth++;
      }
    });

    let yearState = reactive({
      currentYear: new Date().getFullYear(),
      prevYear: computed(() =>yearState.currentYear - 1),
      nextYear: computed(() => yearState.currentYear + 1),
      funcPrevYear: () => yearState.currentYear--,
      funcNextYear: () => yearState.currentYear++,
    })

    //Using Ref
    // let currentMonth = ref(new Date().getMonth());
    // let currentMonthStr = ref(computed(() => new Date(null, currentMonth.value).toLocaleString('default', {month:"long"})));
    // let nextMonthStr = ref(computed(() => new Date(null,(currentMonth.value + 1)).toLocaleString('default', {month:"long"})));
    // let prevMonthStr = ref(computed(() => new Date(null,(currentMonth.value - 1)).toLocaleString('default', {month:"long"})));
    // const prevMonth =  () => currentMonth.value--;
    // const nextMonth =  () => currentMonth.value++;

    // const currentYear = new Date().getFullYear();

    const totalDays = ref(computed(()=>dayInMonth(yearState.currentYear, monthState.currentMonth)));
    const start = ref(computed(() =>startDay(yearState.currentYear, monthState.currentMonth)));

    const info = ref({
      year: computed(()=>yearState.currentYear),
      month: computed(()=>monthState.currentMonth)
    })
    
    return {
      // currentMonth,
      // currentMonthStr,
      // nextMonthStr,
      // prevMonthStr,
      // prevMonth,
      // nextMonth,
      // currentYear,
      info,
      monthState,
      yearState,
      totalDays,
      start,
    }
  },
  components: {
    Days,
  },
};
</script>

<style scoped>
  .title-1{
    text-align: center;
    font-size: 3em;
    font-weight: 600;
    text-transform: uppercase;
    font-family: 'Quicksand', sans-serif;
  }
  .months{
    display: flex;
    margin: 0;
    padding: 0;
    margin-bottom: 1.5rem;
    justify-content: center;
    margin-top: -42rem;
  }
  .month{
    cursor: pointer;
    margin: 0 5rem;
    display: flex;
    justify-content: center;
    font-weight: 300;
    font-size: 2em;
    color: rgba(189, 186, 186, 0.726);
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
  }
  .currentMonth{
    font-weight: 500;
    color: rgb(255, 255, 255);
  }
  .years{
    max-width: 100vw;
    display: flex;
    margin-top: -1rem;
  }

  .year {
    cursor: pointer;
    font-weight: 700;
    font-size: 6em;
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    color: rgba(255, 255, 255, 0.507);
    display: flex;
    flex-direction: column;
    transition: 0.3s ease-in;
  }
  
  @media(min-width: 1170px){
    .year:nth-child(2){
      margin-top: 0em;
      font-size: 20em;
      color: rgba(255, 255, 255, 0.144);
      z-index: 0;
      display: flex;
      justify-content: center;
      writing-mode: unset;
      text-orientation: sideways;
      z-index: -1;
    }
    .year:nth-child(1){
      writing-mode: vertical-lr;
      text-orientation: upright;
      padding: 0;
      margin: 0;
      margin-left: 3rem;
      transition: after 1s ease-in;
      opacity: 1;
    }
    .year:nth-child(3){
      margin: 0;
      padding:0;
      writing-mode: vertical-rl;
      text-orientation: upright;
      margin-right: 3rem;
      opacity: 1;
    }
    .year:nth-child(1)::after{
      content:'<';
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      margin-top: -10rem;
      margin-left: -13rem;
      width: 15vw;
      background-color: rgb(54, 55, 56);
      -webkit-transition: all 0.2s;
      transition: all 0.2s;
    }
    .year:nth-child(3)::after{
      content:'>';
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      margin-top: -10rem;
      margin-right: -13rem;
      width: 15vw;
      background-color: rgb(54, 55, 56);
      -webkit-transition: all 0.2s;
      transition: all 0.2s;
    }
    .year:hover:nth-child(1).year:nth-child(1):after, .year:hover:nth-child(3).year:nth-child(3):after{
      opacity: 1;
    }
    .year:hover:nth-child(1), .year:hover:nth-child(3){
      opacity: 0.85;
    }
  }
  @media(max-width: 1170px){
    .year,.year:nth-child(1),.year:nth-child(3),.year:nth-child(3){
      font-size: 2em !important; 
      display: flex;
      text-align: center;
    }
    .year:nth-child(2){
      color:white;
    }
    .years{
      display: flex;
      justify-content: center;
    }
    .months{
      margin: 0;
      -webkit-transition: all 0.2s;
      transition: all 0.2s;
    }
  }
  @media(max-width:900px){
    .month{
      font-size: 1.2em;
      margin:0 3rem;
      -webkit-transition: all 0.2s;
      transition: all 0.2s;
    }
  }
  @media(max-width:600px){
    .month{
      margin:0 1.5rem;
      -webkit-transition: all 0.2s;
      transition: all 0.2s;
    }
  }
</style>
