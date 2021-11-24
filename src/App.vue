<template>
  <div id="app" class="note">
    <MenuView></MenuView>
    <transition name="page">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import MenuView from './views/MenuView.vue';
import TodoListView from './views/TodoListView.vue';

export default {
  name: 'App',
  components: {
    MenuView,
    TodoListView,
  },
  data() {
    return {
     
    }
  },
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Shippori+Antique&display=swap');
  @import url('~@/assets/scss/reset.scss'); 
  
  body {
    margin: 0;
    padding: 0;
    font-family: 'Shippori Antique', sans-serif;

    // @TODO 왜 reset.scss가 말을 안듣지?
    button {
      cursor: pointer;
    }
  }

  .note {
    position: relative;
    width: 100vw;
    height: 100vh;
    background: #f0efe9;
  }

  /* router transition */
  .page-enter-active, .page-leave-active { 
    transition: opacity .5s;
  }
 
  .page-enter, .page-leave-to { 
    opacity: 0;
  }
  
</style>
