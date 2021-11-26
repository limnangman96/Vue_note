// vuex는 상태관리 도구 (상태라는 것은 여러 컴포넌트 사이에 공유되는 데이터 속성)
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: { //state는 컴포넌트 간에 공유할 data 속성을 의미
        todoData: [],
    },
    mutations: { 
        SET_TODO(state, dataObj) {
            state.todoData.push(dataObj);
        },
        SET_DELETE_TODO(state, item) {
            state.todoData.forEach((ele, index) => {
                if (ele.value === item.value) {
                    state.todoData.splice(index, 1);
                }
            });
        },
        SET_EDIT_TODO(state, editData) {
            state.todoData.forEach(ele => {
                if (ele.value === editData.before) {
                    ele.value = editData.after;
                }
            })
        },
        CHECK_STATUS(state, item) {
            // ....
        }
    },
    actions: { //비동기 처리 로직
        GET_TODO({ commit }, dataObj) {
            commit("SET_TODO", dataObj);
        },
        DELETE_TODO({commit}, item) {
            commit("SET_DELETE_TODO", item);
        },
        EDIT_TODO({commit}, editData) {
            commit("SET_EDIT_TODO", editData);
        },
        STATUS_CHANGE({commit}, item) {   
            commit("CHECK_STATUS", item);
        }
    },
    plugins: [ //플러그인 출처 : https://kyounghwan01.github.io/blog/Vue/vuex/vuex-persistedstate/
        createPersistedState()
    ]
});


/**
 * 데이터 통신 및 형태 
 * 모든걸 store에서 추가하고 변경하고 삭제한다. 
 * store는 localstorage와 통신한다. 
 * sotre에 저장되는 데이터는
 *      "todoData" : [{
 *          value: status 로 저장한다.
 *      }]
 * 
 */