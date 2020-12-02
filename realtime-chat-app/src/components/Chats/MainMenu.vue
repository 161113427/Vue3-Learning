<template>
  <section class="main-menu">
    <div class="user-info">
      <div class="user-pict">G</div>
      <div class="user-name">
        <span>User2</span>
      </div>
    </div>
    <div class="menu">
      <div class="add-friend">
        <a href="#">A</a>
      </div>
      <div class="some-menu">
        <a href="#">:</a>
      </div>
      <div class="logout">
        <button @click="logout">Out</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    logout: Function
  },

  setup() {
    return {}
  }
};
</script>

<style scoped>
  .main-menu{
    display: flex;
    padding: 1rem;
    justify-content: space-between;
    align-items: center;
  }

  .user-info{
    display: flex;
    align-items: center;
  }

  .menu{
    display: flex;
  }
  .menu>div{
    margin-right:1rem;
    font-weight: 500;
  }

  .logout>button{
    padding: 0.4rem 0.7rem;
    transition: all linear 0.2s;
  }

  .logout:hover>button{
    background: rgba(0,0,0,0.3);
    transition: all linear 0.2s;
  }
</style>