<template>
  <div class="todo">
    <!-- todolist -->
    <div class="todo__wrapper">
        <!-- 헤더 영역 -->
        <header class="todo__header">
            <!-- 왼쪽 -->
            <div class="todo__header__left">
                <span class="todo__header__date">{{ date }}</span>

                <div class="todo__header__inner">
                    <span class="todo__header__month">{{ month }}</span> 
                    <span class="todo__header__year">{{ year }}</span>
                </div>
            </div>

            <!-- 오른쪽 -->
            <div class="todo__header__right">
                <span>{{ day }}</span>
            </div>
        </header>

        <!-- 리스트 영역 -->
        <ListView class="todo__inner"></ListView>

        <!-- 리스트 추가 버튼 -->
        <button type="button" @click="modalControl(true)" class="todo__add">add</button>
    </div>
    
    <!-- todolist 모달 -->
    <AddListView v-if="modalStatus" @modal:close="modalControl"></AddListView>
  </div>
</template>

<script>
import ListView from './ListView.vue';
import AddListView from './AddListView.vue';
import { mapGetters } from 'vuex';
import { todayMixin } from '../mixins/getTodayMixins';

export default {
  components: {
    ListView,
    AddListView,
  },
  mixins: [todayMixin],
  data() {
    return {
      date: "",
      day: "",
      modalStatus: false,
    }
  },
  computed: {
    ...mapGetters([
        "gettersList"
    ]),
  },
  created() {
    const localData = localStorage.getItem("todoData");
    if (localData) {
      this.$store.dispatch("GET_TODO", JSON.parse(localData));
    }

    window.addEventListener("beforeunload", this.saveLocalData); // 창닫기, 주소이동, 새로고침 감지
  },
  mounted() {
    this.date = this.getMoment.format("DD"); //날짜
    this.day = this.getMoment.format("dddd").toUpperCase(); //요일
  },
  beforeRouteLeave(to, from, next) { // 라우트 이동 감지
    this.saveLocalData();
    next();
  },
  beforeDestroy() {
    window.removeEventListener("beforeunload", this.saveLocalData); 
  },
  methods: {
    modalControl(bool) {
      this.modalStatus = bool;
    },
    saveLocalData() { //로컬스토리지 저장
      localStorage.setItem("todoData", JSON.stringify(this.gettersList));
    },
  }
}
</script>












// beforeunload 출처 ::: https://egg-programmer.tistory.com/290

/**
  네비게이션 가드 
    - 애플리케이션 전역에서 동작하는 전역가드
    - 특정 URL에서만 동작하는 라우터가드
    - 라우터 컴포넌트 안에 정의하는 컴포넌트 가드 

  (1) 전역 가드 [beforeEach]
    라우터 인스턴스를 참조하는 객체로 설정할 수 있음 

    var router = new VueRouter();
    router.beforeEach(function(to, from, next) {
      //to : 이동할 url
      //from : 현재 url
      //next : to에서 지정한 url로 이동하기 위해 꼭 호출해야 하는 함수 
    })

    router.beforeEach()를 호출하고 나면 모든 라우팅이 대기 상태가 된다. 
    원래 url이 변경되고 나면 해당 url에 따라 화면이 자연스럽게 전환되어야 하는데 전역 가드를 설정했기 때문에 화면이 전환되지 않는다. 여기서 해당 url로 라우팅 하기 위해서는 next()를 호출해줘야 한다. 

  
    ex) 마이페이지 로그인 인증
      var router = new VueRouter({
      routes: [
        // meta 정보에 authRequired라는 Boolean 값 추가
        { path: '/login', component: Login, meta: {authRequired: true} },
        { path: '/home', component: Home }
      ]
    });


  (2) 라우터 가드 (beforeEnter)
      beforeEnter: function(to, from, next) {
        // 인증값 검증 로직 추가
      }


  (3) 컴포넌트 가드 (beforeRouterEnter / beforeRouterUpdate / beforeRouterLeave)
    - beforeRouterEnter
        해당 컴포넌트가 아직 화면에 표시되기 전에 수정될 로직
        컴포넌트는 아직 새성되지 않은 시점

    - beforeRouterUpdate
        화면에 표시된 컴포넌트가 변경될 때 수행될 로직
        'this'로 Login 컴포넌트를 접근할 수 있음 

    - beforeRouterLeave
        컴포넌트를 화면에 표시한 url 값이 변경되기 직전의 로직 
        'this'로 Login 컴포넌트를 접근할 수 있음


  사용자에게 입력을 요구하는 페이지에서, 사용자의 실수로 인해(backspace, 잘 못 누름)등 작성 중인 페이지를 넘어갈 때가 있다.
  이런 상황을 막기 위해 beforeRouteLeave 이용하여 사용자에게 페이지를 넘어가기 전 확인을 요청받을 수 있다.
  반드시 next() 선언해야한다. 그렇지 않으면 이동을 막는다.
 */
