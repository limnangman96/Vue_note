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
  .note {
    position: relative;
    width: 100vw;
    height: 100vh;
    background: #f0efe9;
  }

  .page-enter-active, .page-leave-active { 
    opacity: 1;
    transition: opacity 0.5s;
    // @NOTE feed: 떠날때 빨리 사라지고, 보여지는게 서서히 보여져야 하기 때문에 transition은 opacity 1에 배치함 
  }
 
  .page-enter, .page-leave-to { 
    opacity: 0;
  }
</style>
