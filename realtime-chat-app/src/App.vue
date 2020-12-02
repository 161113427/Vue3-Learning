<template>
  <div class="container">
    <router-view />
  </div>
</template>

<style scoped>
  .container{
    display:flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    /* background: #202223; */
    background: rgba(0, 0, 0, 0.05);
    /* backdrop-filter: blur(20px); */
  }
</style>
