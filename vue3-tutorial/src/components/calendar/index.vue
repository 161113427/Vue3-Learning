<template>
  <div class="calendar">
    <h1 class="title-1">Calendar</h1>
    <div>
      <ul class="years">
        <li class="year">{{ currentYear - 1 }}</li>
        <li class="year">{{ currentYear }}</li>
        <li class="year">{{ currentYear + 1 }}</li>
      </ul>
    </div>
    <div>
      <ul class="months">
        <li class="month">{{ prevMonth }}</li>
        <li class="month currentMonth">{{ currentMonth }}</li>
        <li class="month">{{ nextMonth }}</li>
      </ul>
    </div>
    <Days></Days>
  </div>
</template>

<script>
import Days from "./Days";

export default {
  setup() {
    const prevMonth = new Date(null,(new Date().getMonth() - 1)).toLocaleString('default', {month:"long"});
    const currentMonth = new Date().toLocaleString('default', {month:"long"});
    const nextMonth = new Date(null,(new Date().getMonth() + 1)).toLocaleString('default', {month:"long"});
    const currentYear = new Date().getFullYear();
    return {
      currentMonth,
      prevMonth,
      nextMonth,
      currentYear
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
    font-size: 2.5em;
    font-weight: 500;
  }
  .months{
    display: flex;
    margin: 0;
    padding: 0;
    margin-bottom: 1.5rem;
    justify-content: center;
  }
  .month{
    cursor: pointer;
    margin: 0 5rem;
    display: flex;
    justify-content: center;
    font-weight: 300;
    font-size: 1.5em;
    color: rgba(189, 186, 186, 0.726);
  }
  .currentMonth{
    font-weight: 500;
    color: rgb(255, 255, 255);
  }
  .year:nth-child(2){
    margin-top: 0em;
    font-size: 20em;
    color: rgba(255, 255, 255, 0.295);
    z-index: 0;
    display: flex;
    justify-content: center;
    writing-mode: unset;
    text-orientation: sideways;
    z-index: -1;
  }
  .year {
    font-weight: 700;
    font-size: 6em;
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    margin-top: 0.8em;
    color: rgba(255, 255, 255, 0.295);
    position: absolute;
    overflow: hidden;
    display: flex;
  }
  .year:nth-child(1){
    writing-mode: vertical-lr;
    text-orientation: upright;
    padding: 0;
    margin: 0;
    margin-left: 3rem;
  }
  .year:nth-child(3){
    margin: 0;
    padding:0;
    writing-mode: vertical-rl;
    text-orientation: upright;
    margin-left: -3rem;
  }
</style>
