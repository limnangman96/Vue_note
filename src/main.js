import Vue from 'vue'
import App from './App.vue'
import { router } from './routes/index.js'
import { store } from './store/index.js';
import testView from './views/testView.vue';

Vue.config.productionTip = false; 
Vue.component("testView", testView); //Vue API (1) 전역 컴포넌트 등록

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')


// Vue API (2) directive 사용자 정의 디렉티브 > 전역
// Vue.directive("focus", {
//   inserted: function(el) {
//     el.focus();
//   }    
// })


 /**
   * 
   * Vue API (2) 
   * 
   * 디렉티브 정의 훅
   *    bind: 디렉티브가 처음 엘리먼트에 바인딩될 때 한번만 호출 (일회성 설정 가능)
   *    inserted: 바인딩 된 엘리먼트가 부모 노드에 삽입되었을 때 호출 (부모 노드 존재를 반드시 보장하며 반드시 document 내에 있는 것은 아님)
   *    update: 포함하는 컴포넌트가 업데이트 된 후 호출. 그러나 자식이 업데이트 전일 가능성이 있다. 바인딩의 현재 값과 이전 값을 비교하여 불필요한 업데이트를 건너 뛸 수 있따.
   *    componentUpdated: 포함하고 있는 컴포넌트와 그 자식들이 업데이트 된 후에 호출된다. 
   *    unbind: 디렉티브가 일레먼트로부터 언바인딩 된 경우에만 한번 호출된다.
   *  
   * 
   * 디렉티브 훅 전달인자 
   *    (el 뿐만 아니라 모든 전달인자는 읽기 전용으로 사용하여야 한다. 절대 변경하면 안된다.)
   *    el: 디렉티브가 바인딩된 엘리먼트. 이것을 사용하면 DOM 조작할 수 있음
   * 
   *    binding: 아래의 속성을 가진 객체
   *        name: 디렉티브 이름, v-프리픽스가 없다. 
   *        value: 디렉티브에서 전달받은 값. 예를 들어 v-my-directive="1 + 1"이면, valu는 2이다.
   *        oldValue: 이전 값. update와 componentUpdated 에서만 사용할 수 있음 
   *        expression: 표현식 문자열. 예를들어 v-my-directive="1 + 1"이면, 표현식은 "1 + 1"이다.
   *        arg: 디렉티브 전달 인자, 있는 경우에만 존재한다. 예를 들어 v-my-directive:foo 이면 "foo" 이다.
   *        modifiers: 포함된 수식어 객체, 있는 경우에만 존재한다. 예를 들어 v-my-directive.foo.bar이면, 수식어 객체는 {foo: true, bar: true} 이다.
   * 
   *    vnode: Vue 컴파일러가 만든 버추얼 노드.  >>> filter, component, use(plugin), mixin(mixin), observable, version 
   *    oldNode: 이전의 버추얼 노드. update와 componentUpdated에서만 사용할 수 있다.
   * 
   * 
   * 
   */     