<template>
  <div>
    <div class="numDisplay">
      <span>{{ currentNum || '0' }}</span>
      <small v-if="selectedOperation">{{ prevNum }} {{ selectedOperation }} {{ currentNum }}</small>
    </div>
    <div class="calculator">
      <ul class="nums">
        <li class="num" v-for="num in 9" :key="num" @click="pressed(num.toString())">{{ num }}</li>
        <li class="num" @click="pressed('0')">0</li>
        <li class="num" @click="pressed('=')">=</li>
        <li class="num" @click="pressed('/')">/</li>
      </ul>
      <ul class="operations">
        <li class="operation" @click="pressed('c')">C</li>
        <li class="operation" @click="pressed('+')">+</li>
        <li class="operation" @click="pressed('-')">-</li>
        <li class="operation" @click="pressed('*')">x</li>
        
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
export default {
  name: 'Calculator',

  setup() {
    const currentNum = ref('');
    const prevNum = ref('');
    const selectedOperation = ref('');
    const operations = ['+', '-', '*', '/'];

    const sum = ()=>{
      currentNum.value = parseFloat(currentNum.value) + parseFloat(prevNum.value);
    }
    const sub = ()=>{
      currentNum.value = prevNum.value - currentNum.value;
    }
    const multiply = ()=>{
      currentNum.value = prevNum.value * currentNum.value;
    }
    const divide = ()=>{
      currentNum.value = prevNum.value / currentNum.value;
    }

    const appendNumber = (value) => {
      currentNum.value += value
    }

    const applyOperation = (value) => {
      if (selectedOperation.value !== '' && currentNum.value === ''){
        if (selectedOperation.value !== '+')
          if(value === '-')
            currentNum.value += '-'
          else
            selectedOperation.value = value
        else selectedOperation.value = value;
      }
      else if(selectedOperation.value !== ''){
        calculate();
        selectedOperation.value = value;
        prevNum.value = currentNum.value;
        currentNum.value = '';
      }
      else{
        selectedOperation.value = value;
        prevNum.value = currentNum.value;
        currentNum.value = '';
      }
    }

    const calculate = ()=>{
      if(isNaN(currentNum.value)){
        prevNum.value = currentNum.value = selectedOperation.value = '';
        alert('inputan tidak benar');
      }
      else{
        switch(selectedOperation.value){
          case '+':
            sum();
            break;
          case '-':
            sub();
            break;
          case '*':
            multiply();
            break;
          case '/':
            divide();
            break;
        }
        prevNum.value = '';
      }
    }

    const clear = () => {
      currentNum.value = '';
      selectedOperation.value = '';
    }

    const pressed = (value) => {
      if (value === '=') {
        calculate(); 
        selectedOperation.value = ''
      }
      else if (value === 'c') clear();
      else if (operations.includes(value)) applyOperation(value);
      else appendNumber(value);
    }

    const handleKey = (e)=>{
      if(e.key === 'Enter')
        pressed('=');
      else if(e.key === 'Backspace')
        pressed('c');
      else{
        for(let i = 0; i < 10; i++)
          if (e.key.toString() === i.toString() || 
          operations.includes(e.key.toString()) || 
          e.key.toString() === '=' || 
          e.key.toString() === 'c'){
            if (e.key.toString() === '-'){
              pressed(e.key);
              break;
            }
            pressed(e.key);
            break;
          }
      }
    }

    onMounted(() => window.addEventListener('keyup',handleKey));

    onUnmounted(()=>{
      window.removeEventListener('keyup', handleKey);
    })

    return {
      onMounted,
      currentNum,
      prevNum,
      selectedOperation,
      pressed
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ::-webkit-scrollbar{
    height:0.15em;
    z-index: 1;
  }
  ::-webkit-scrollbar-thumb{
    background:yellow;
  }
  .calculator{
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    z-index: 1;
  }
  .numDisplay{
    margin-bottom: 1rem;
    width: 9.7em;
    display: flex;
    justify-content: flex-end;
    font-size: 2em;
    scroll-behavior: smooth;
    flex-direction: column;
  }
  .numDisplay small{
    font-size: 0.6em;
    margin-top: 0.5rem;
    background-color: transparent;
    padding: 0 1rem;
  }
  .numDisplay span{
    display: flex;
    background: grey;
    flex-direction: column;
    text-align: right;
    font-weight: 500;
    padding: 0.3rem 1rem;
    overflow-x: scroll;
    scroll-behavior: smooth;
  }
  .nums{
    display: flex;
    flex-wrap: wrap;
    z-index: 1;
    margin-left: -7rem;
    justify-content: flex-end;
  }
  .operations{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
  .num{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    width: calc(100%/3 - 2.6rem);
    padding: 0.8rem 0rem;
    background: rgb(158, 240, 77);
    margin: 0.5rem 0.5rem;
    color:black;
    font-size: 1.2em;
  }
  .operation{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
    width: 100%;
    padding: 0.9rem 0.5rem;
    background: rgb(158, 240, 77);
    margin: 0.5rem 0.5rem;
    color:black;
    font-size: 1.2em;
  }
</style>
