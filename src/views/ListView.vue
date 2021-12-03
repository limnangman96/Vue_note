<template>
    <div>
        <ul v-if="gettersList.length">
            <li v-for="(item, index) in gettersList" :key="index" :class="{'done' :checkedListId.indexOf(item.id) != -1}" class="todo__list">
                <!-- 리스트 내용 -->
                <span @click="listEdit(item, index)" class="todo__list__link">
                    <p class="todo__list__text">
                        {{ item.value }}
                    </p>
                </span>

                <!-- 리스트 삭제/완료 -->
                <div class="todo__list__buttonWrap">
                    <button type="button" @click="listDelete(item)" class="todo__list__delete">
                        삭제하기
                    </button>

                    <label class="todo__list__check">
                        <input type="checkbox" v-model="checkedListId" :value="item.id">
                        <span>체크여부</span>
                    </label>
                </div>

                <!-- 리스트 수정 -->
                <div v-show="isShowEditIndex === index ? true : false" class="todo__list__edit">
                    <div class="edit__inner">
                        <label class="edit__label">
                            <input type="text" v-model="afterEditText"  @keyup.enter="editComplete(item)" class="edit__input">
                        </label>

                        <button type="button" @click="editComplete(item)" class="edit__button">수정완료</button>
                    </div>
                </div>
            </li>
        </ul>

        <p v-else>
            등록된 todo list가 없습니다.
        </p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            isShowEditIndex: null,
            afterEditText: "",
            checkedListId: [],
        }
    },
    created() {
        const localData = JSON.parse(localStorage.getItem("todoData"));
        if (!localData) return;

        // localStorage 저장 되어있는 값 store에 넣어주기
        this.$store.dispatch("INIT_TODO", localData); 

        // localStorage 저장된 값 중 완료여부 true인 값이 있으면 해당 id 값 데이터에 넣어주기 
        const getCompletedData = localData.filter( (list) => list.completed === true);
        getCompletedData.forEach(list => this.checkedListId.push(list.id));
    },
    computed: {
        ...mapGetters([
            "gettersList"
        ]),
        watchStoreLength: function() { 
            return this.gettersList.length; // getters 갯수에 변화가 생기면 감지
        },
    },
    watch: {
        watchStoreLength() { // store의 length가 변화면, 현재 store를 "로컬스토리지"에 저장
            localStorage.setItem("todoData", JSON.stringify(this.gettersList)); 
        },
        checkedListId(newValue) { // 데이터가 변하면 (완료 여부값) "store"에 저장
            this.$store.dispatch("STATUS_CHANGE", newValue);
        },
    },
    methods: {
        listEdit(item, index) {
            this.isShowEditIndex = index;
            this.afterEditText = item.value; //수정영역에 기존 텍스트 보여주기
        },
        editComplete(item) {
            if (!this.afterEditText.trim().length) {
                return alert("please check your answer !");   
            }

            const sendEditData = {
                id: item.id,
                value: this.afterEditText.trim(),
            }

            this.$store.dispatch("EDIT_TODO", sendEditData);
            this.isShowEditIndex = false;
        },
        listDelete(item) {
            const response = confirm("삭제하시겠습니까?");
            if (!response) return;

            this.$store.dispatch("DELETE_TODO", item.id);
        },
    },
}
</script>