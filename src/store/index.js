// vuex는 상태관리 도구 (상태라는 것은 여러 컴포넌트 사이에 공유되는 데이터 속성)
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: { //state는 컴포넌트 간에 공유할 data 속성을 의미
        todoData: [],
    },
    getters: {
        gettersList(state) {
            return state.todoData
        }
    },
    mutations: { 
        SET_INIT_TODO(state, dataObj) {
            state.todoData = dataObj
        },
        /* store의 length 변화 > listView에서 감시중 */
        SET_ADD_TODO(state, dataObj) {
            state.todoData.push(dataObj);
        },
        SET_DELETE_TODO(state, listId) {
            const getArrIndex = (list) => list.id === listId;
            const getDeleteIndex = state.todoData.findIndex(getArrIndex);
            state.todoData.splice(getDeleteIndex, 1); 
        },
        /* store의 value 변화 > 각각 localstorage에 반영 */
        SET_EDIT_TODO(state, editData) {
            const getArrIndex = (list) => list.id === editData.id;
            const getEditIndex = state.todoData.findIndex(getArrIndex);
            state.todoData[getEditIndex].value = editData.value;

            // localStorage.setItem("todoData", JSON.stringify(state.todoData)); 
        },
        SET_STATUS_CHANGE(state, changeData) {
            state.todoData.forEach((list) => { // {[]} ::: []
                changeData.indexOf(list.id) != -1 ? list.completed = true : list.completed = false;
            });
            
            // localStorage.setItem("todoData", JSON.stringify(state.todoData));
        }
    },
    actions: { //비동기 처리 로직
        INIT_TODO({ commit }, dataObj) {
            commit("SET_INIT_TODO", dataObj);
        },
        ADD_TODO({ commit }, dataObj) {
            commit("SET_ADD_TODO", dataObj);
        },
        DELETE_TODO({commit}, listId) {
            commit("SET_DELETE_TODO", listId);
        },
        EDIT_TODO({commit}, editData) {
            commit("SET_EDIT_TODO", editData);
        },
        STATUS_CHANGE({commit}, changeData) {
            commit("SET_STATUS_CHANGE", changeData);
        }
    },
});