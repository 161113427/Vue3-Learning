<template>
  <div class="top-acc">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#007ac1" fill-opacity="1" d="M0,192L34.3,202.7C68.6,213,137,235,206,218.7C274.3,203,343,149,411,112C480,75,549,53,617,80C685.7,107,754,181,823,197.3C891.4,213,960,171,1029,144C1097.1,117,1166,107,1234,101.3C1302.9,96,1371,96,1406,96L1440,96L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"></path></svg>
  </div>
  <div class="home">
    <Login />
  </div>
</template>

<script>
// @ is an alias to /src
import Login from "@/components/Login.vue";

export default {
  name: "Home",
  components: {
    Login,
  },
};
</script>
<style scoped>
.home {
  /* margin-top: -22%; */
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
