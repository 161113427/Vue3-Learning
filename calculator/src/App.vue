<template>
  <div id="app">
    <h2>Casio</h2>
    <Calculator></Calculator>
  </div>
</template>

<script>
import Calculator from './components/Calculator'
export default {
  name: 'App',

  components: {
    Calculator
  }
}
</script>

<style>
#app {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 80vw;
  height: 90vh;
}
</style>
