<template>
  <div class="todo">
    <!-- todolist -->
    <div class="todo__wrapper">
        <!-- 헤더 영역 -->
        <HeaderView></HeaderView>

        <!-- 리스트 영역 -->
        <div class="todo__inner">
        <ListView></ListView>
        </div>

        <!-- 리스트 추가 버튼 -->
        <button type="button" class="todo__add" @click="modalStatus = true">add</button>
    </div>
    
    <!-- todolist 모달 -->
    <AddListView :isModalOpen="modalStatus" @modal:cancel="modalStatus = false"></AddListView> 
  </div>
</template>

<script>
import HeaderView from './HeaderView.vue';
import ListView from './ListView.vue';
import AddListView from './AddListView.vue';
import bus from '../util/bus.js';

export default {
  components: {
    HeaderView,
    ListView,
    AddListView,
  },
  data() {
    return {
      modalStatus: false,
    }
  },
}
</script>

<style lang="scss">
  .todo {
    &__wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 500px;
      padding: 50px;
      background: #fff;
      box-sizing: border-box;
      box-shadow: 0 0 10px rgb(0 0 0 / 3%);
      border-radius: 10px;
      transform: translate(-50%, -50%);
    }

    &__inner {
      margin-top: 40px;
    }

    &__add {
      position: absolute;
      bottom: -40px;
      left: 50%;
      width: 80px;
      height: 80px;
      padding: 0;
      border-radius: 50%;
      border: none;
      background: #50e3a4;
      box-shadow: 0 0 5px rgb(0 0 0 / 20%);
      font-size: 0;
      transform: translate(-50%, 0);

      &:before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 4px;
        background: #40a97c;
        border-radius: 5px;
        transform: translate(-50%, -50%);
      }

      &:after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        display: inline-block;
        width: 4px;
        height: 20px;
        background: #40a97c;
        border-radius: 5px;
        transform: translate(-50%, -50%);
      }
    }
  }
  
</style>
