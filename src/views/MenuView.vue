<template lang="">
    <nav class="menu">
      <router-link :to="`${item.path}`" class="menu__tab" v-for="(item, index) in this.menuList" :key="index">
        {{ item.name }}
      </router-link>
    </nav>
</template>
<script>
export default {
    data() {
      return {
        menuList: [],
      }
    },
    created() {
      const getRoutes = this.$router.options.routes;
      this.menuList = getRoutes.filter(route => !route.hasOwnProperty("redirect"))
    }
} 
</script>

<style lang="scss">
    .menu {
      position: absolute;
      top: 30px;
      left: 50%;
      min-width: 464px;
      background: rgba(255,255,255,.4);
      transform: translate(-50%, 0);
      border-radius: 10px;

      &__tab {
        display: inline-block;
        padding: 15px 20px;
        border-radius: 10px;
        font-size: 15px;
        color: #ddd;

        &.router-link-exact-active {
          background: #fff;
          color: #575757;
        }
      }
    }
</style>