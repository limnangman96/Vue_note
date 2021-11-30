<template lang="">
    <nav class="menu">
      <router-link :to="`/${item}`" class="menu__tab js__menu" v-for="(item, index) in menu" :key="index">
        {{ item.toUpperCase() }}
      </router-link>
    </nav>
</template>
<script>
export default {
    data() {
      return {
        menu: ["todolist", "calendar", "timer", "weather"],
      }
    },
    created() {
      // 컴포넌트 생성 시 데이터를 패치
      this.fetchMenu()
    },
    watch: {
      // $route의 속성이 변경될 때 마다 getchMenu 함수가 실행되게끔
      '$route': 'fetchMenu'
    },
    methods: {
      fetchMenu() { //@TODO 라우트 이용하여 메뉴 보여주기
        console.log(this.$route.name)
      }
    },
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