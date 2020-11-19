<template>
  <div class="days">
    <ul class="day-container">
      <li class="day" v-for="(day, idx) in days" :key="idx">
        {{ day }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
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
      days,
    };
  },
};
</script>

<style scoped>
  .days {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .day-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }
  .day{
    display: flex;
    padding: 0.5rem 2rem;
  }
</style>