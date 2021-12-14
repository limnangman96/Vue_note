// vuex는 상태관리 도구 (상태라는 것은 여러 컴포넌트 사이에 공유되는 데이터 속성)
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: { 
        todoData: [],
    },
    getters: {
        gettersList(state) {
            return state.todoData
        }
    },
    mutations: { 
        SET_GET_TODO(state, localData) { 
            state.todoData = localData;
        },
        SET_ADD_TODO(state, addedData) {
            state.todoData.push(addedData);
        },
        SET_DELETE_TODO(state, listIdx) {
            state.todoData.splice(listIdx, 1);
        },
        SET_EDIT_TODO(state, editedData) {
            state.todoData[editedData.index].value = editedData.value;
        },
    },
    actions: { 
        GET_TODO({ commit }, localData) {
            commit("SET_GET_TODO", localData);
        },
        ADD_TODO({ commit }, addedData) {
            commit("SET_ADD_TODO", addedData);
        },
        DELETE_TODO({commit}, listIdx) {
            commit("SET_DELETE_TODO", listIdx);
        },
        EDIT_TODO({commit}, editedData) {
            commit("SET_EDIT_TODO", editedData);
        },
    },
});