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

export default {
  name: 'App',
  components: {
    MenuView,
  },
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Shippori+Antique&display=swap'); //폰트
  @import "@/assets/scss/reset.scss"; //reset

  .note {
    position: relative;
    width: 100vw;
    height: 100vh;
    background: #f0efe9;
  }

  /* router transition */
  .page-enter-active, .page-leave-active { 
    transition: opacity 0.5s;
  }
 
  .page-enter, .page-leave-to { 
    opacity: 0;
  }
</style>
