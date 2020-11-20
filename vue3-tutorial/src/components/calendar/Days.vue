<template>
  <div class="days">
    <section>
      <ul class="day-container">
        <li class="day week" v-for="(day, idx) in days" :key="idx">
          {{ day }}
        </li>
      </ul>
    </section>
    <section>
      <ul class="day-container">
        <li class="day" v-for="(start,idx) in startDay" :key="idx"></li>
        <li class="day" v-for="(date, index) in dates" :key="index">
          <span>{{ date }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  props:[
    'dates',
    'startDay',
  ],

  setup() {
    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    return {
      days
    };
  },
};
</script>

<style scoped>
  .days {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    z-index: 1;
  }
  .day-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 60vw;
    z-index: 1;
  }
  .day{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    width: calc(100%/7);
    padding: 1rem 0;
    font-size: 1.2em;
  }

  .week{
    font-size: 1.5em;
    font-weight: 500;
  }
</style>