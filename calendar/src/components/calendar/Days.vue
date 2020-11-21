<template>
  <div class="days">
    <section>
      <ul class="day-container">
        <li class="day week" v-for="(day, idx) in shortenDay" :key="idx">
          {{ day }}
        </li>
      </ul>
    </section>
    <section>
      <ul class="day-container">
        <li class="day" v-for="(start,idx) in startDay" :key="idx"></li>
        <li class="day" v-for="(date, index) in dates" :key="index">
          <span :class="currentDate(date) === new Date(Date.now()).toLocaleDateString() ? 'currentDate' : ''">
            {{ date }}
          </span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { computed } from 'vue';
export default {
  props:[
    'dates',
    'startDay',
    'info'
  ],

  setup(props) {
    const days = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
    const currentDate = (date)=>{
      return new Date(props.info.year, props.info.month, date).toLocaleDateString()
    }
    const shortenDay = computed(()=>{
      const shortDay = [];
      if(window.innerWidth < 600){
        days.forEach((day)=>{
          shortDay.push(day.substring(0,1));
        })
        return shortDay;
      }
      else
        return days;
    })

    // const resizeDay = window.addEventListener('resize',function(){
    //   console.log(shortenDay)
    // })

    return {
      // days,
      // resize,
      shortenDay,
      currentDate
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
  .currentDate{
    color:rgb(241, 255, 50);
    font-weight: 500;
  }
  @media(max-width: 1170px){
    .day-container{
      width: 90vw !important;
    }
  }
  @media(max-width:900px){
    .day{
      font-size: 1em;
    }
  }
</style>