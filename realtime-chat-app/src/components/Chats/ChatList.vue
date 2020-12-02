<template>
  <section class="chat-list">
    <slot></slot>
    <div class="search-list">
      <input type="text" class="inp-search"/>
    </div>
    <div class="list">
      <ul>
        <li v-for="friend in state.friends" :key="friend.email" class="contact">
          <div class="user-pict">
            <span>G</span>
          </div>
          <div class="user-name">
            <span>{{ friend.name }}</span>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  props:{
    state: Object
  },
  setup(props) {
    return {
      state: props.state
    }
  }
};
</script>

<style>
.chat-list {
  min-height: 90vh;
  border-right: 1px solid rgba(255, 255, 255, 0.8);
  min-width: 30%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  /* background: rgb(51 58 60); */
  background: white;
  text-transform: capitalize;
}

.list{
   background: white;
}

.search-list{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4.5rem;
}

.inp-search{
  width: 75%;
  height:2.5rem;
  border-radius: 3rem;
  border: none;
  padding: 0 1rem;
  background: rgb(231, 231, 231);
  transition: 0.1s all linear;
}

.inp-search:focus{
  background: rgb(240, 240, 240);
}

.contact {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 1rem 1.5rem;
  align-items: center;
  background: rgba(255, 255, 255, 0.3);
  margin-bottom: 1px;
  transition: 0.1s all linear;
  font-family: "Roboto",sans-serif !important;
  font-size: 0.9em;
  cursor: pointer;
}

.contact:hover {
  background: rgba(0, 0, 0, 0.1);
  transition: 0.1s all linear;
}

.user-pict{
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: grey;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1.5rem;
}

.user-name span{
  font-weight: 500;
  color: rgba(0, 0, 0, 0.87);
  text-transform: capitalize;
}

@media(max-width:600px){
  .chat-list {
    max-height: 90vh;
    width: 200px;
    margin-left: 3rem;
    /* overflow: hidden; */
  }
}
</style>