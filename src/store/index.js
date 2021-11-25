// vuex는 상태관리 도구 (상태라는 것은 여러 컴포넌트 사이에 공유되는 데이터 속성)
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: { //state는 컴포넌트 간에 공유할 data 속성을 의미
        todoData: [],
    },
    mutations: { //동기처리 로직
        SET_TODO(state, sendData) {
            state.todoData.push(sendData);
        },
        SET_DELETE_TODO(state, index) {
            state.todoData.splice(index, 1);
        },
        SET_EDIT_TODO(state, dataObj) {
            state.todoData[dataObj.index] = dataObj.value;
        },
    },
    actions: { //비동기 처리 로직 (setTimeout 이나 서버와의 http 통신 처리 같이 결과 받는 타이밍이 예측되지 않는 로직)
        GET_TODO({ commit }, sendData) {
            return commit("SET_TODO", sendData);
        },
        DELETE_TODO({commit}, index) {
            return commit("SET_DELETE_TODO", index);
        },
        EDIT_TODO({commit}, dataObj) {
            return commit("SET_EDIT_TODO", dataObj);
        },
    },
    plugins: [ //플러그인 출처 : https://kyounghwan01.github.io/blog/Vue/vuex/vuex-persistedstate/
        createPersistedState()
    ]
});