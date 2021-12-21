<template>
    <div class="menu">
      <button type="button" :class="menuStatus ? 'close' : ''" @click="menuOpen()" class="menu__button">메뉴</button>

      <nav v-show="menuStatus" class="menu__wrapper">
        <router-link :to="`${item.path}`" v-for="(item, index) in this.menuList" :key="index" class="menu__tab">
          {{ item.name }}
        </router-link>
      </nav>
    </div>
</template>
<script>
import { bus } from '../util/bus.js';
export default {
    data() {
      return {
        menuStatus: false,
        menuList: [],
      }
    },
    created() {
      const routeList = this.$router.options.routes;
      this.menuList = routeList.filter(route => !Object.prototype.hasOwnProperty.call(route, "redirect"));
      
      bus.$on("menu:close", () => this.menuStatus = false);
    },
    methods: {
      menuOpen() {
        this.menuStatus = !this.menuStatus;
      },
    }
} 
</script>

<style lang="scss" scoped>
   .menu {
      position: relative;
      z-index: 2;
      
      &__button {
        position: absolute;
        top: rem(30px);
        left: rem(26px); 
        width: rem(50px);
        height: rem(50px);
        font-size: 0;
        background: #cecbc7 url("~@/assets/images/icon-menu.png")no-repeat center/ rem(25px) auto;
        border: none;
        border-radius: rem(8px);
        box-shadow: rem(0 0 10px) rgba(0, 0, 0, 0.1);

        &.close { //@TODO transition
          background-image: url("~@/assets/images/icon-close.png");
        }
      }

     &__wrapper {
      position: absolute;
      top: rem(100px);
      left: rem(26px);
      background: #cecbc7;
      border-radius: 10px;
      box-shadow: rem(0 0 10px) rgba(0, 0, 0, 0.1);
    }

    &__tab {
      display: block;
      width: rem(130px);
      border-radius: rem(10px);
      color: #fff;
      font-size: rem(15px);
      line-height: rem(50px);
      text-align: center;

      &.router-link-exact-active {
        background: #fff;
        color: #575757;
      }
    }
}
</style>