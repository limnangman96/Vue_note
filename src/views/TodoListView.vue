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
    <AddListView v-show="modalStatus" @modal:close="modalControl"></AddListView>
  </div>
</template>

<script>
import HeaderView from './HeaderView.vue';
import ListView from './ListView.vue';
import AddListView from './AddListView.vue';
import { mapGetters } from 'vuex';
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
  created() {
    const localData = JSON.parse(localStorage.getItem("todoData"));
    if (!localData) return;
    this.$store.dispatch("INIT_TODO", localData);

    window.addEventListener("beforeunload", this.saveLocalData); // 창닫기, 주소이동, 새로고침 감지 이벤트 추가
  },
  beforeUnmount() {
    window.removeEventListener("beforeunload", this.saveLocalData); // 창닫기, 주소이동, 새로고침 감지 이벤트 삭제
  },
  beforeRouteLeave(to, from, next) { // 라우트 이동 감지 @TODO 공부
    this.saveLocalData();
    next();
  },
  computed: {
    ...mapGetters([
        "gettersList"
    ]),
  },
  methods: {
    modalControl(boolean) {
      this.modalStatus = boolean;
    },
    saveLocalData() { //로컬스토리지 저장
      localStorage.setItem("todoData", JSON.stringify(this.gettersList));
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/scss/todo.scss"; 
</style>


// 출처 ::: https://egg-programmer.tistory.com/290
