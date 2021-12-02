<template>
  <div class="todo">
    <!-- todolist -->
    <div class="todo__wrapper">
        <!-- 헤더 영역 -->
        <HeaderView></HeaderView>

        <!-- 리스트 영역 -->
        <ListView class="todo__inner"></ListView>

        <!-- 리스트 추가 버튼 -->
        <button type="button" @click="modalStatus = true" class="todo__add">add</button>
    </div>
    
    <!-- todolist 모달 -->
    <AddListView :is-modal-open="modalStatus" @modal:cancel="modalStatus = false"></AddListView> 
  </div>
</template>

<script>
import HeaderView from './HeaderView.vue';
import ListView from './ListView.vue';
import AddListView from './AddListView.vue';

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
  @import "@/assets/scss/todo.scss"; 
</style>
