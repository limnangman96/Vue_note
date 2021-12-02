<template>
    <nav class="menu">
      <router-link :to="`${item.path}`" v-for="(item, index) in this.menuList" :key="index" class="menu__tab">
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
      this.menuList = getRoutes.filter(route => !route.hasOwnProperty("redirect"));
    }
} 
</script>

<style lang="scss">
   @import "@/assets/scss/menu.scss"; 
</style>