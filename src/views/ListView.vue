<template>
    <div>
        <template v-if="gettersList && gettersList.length">
            <ul>
                <li v-for="(todoList, index) in gettersList" :key="index" :class="todoList.completed ? 'done' : ''" class="todo__list">
                    <!-- 리스트 내용 -->
                    <span @click="listEdit(todoList.value, index)" class="todo__list__link">
                        <p class="todo__list__text">
                            {{ todoList.value }}
                        </p>
                    </span>

                    <!-- 리스트 삭제/완료 -->
                    <div class="todo__list__buttonWrap">
                        <button type="button" @click="listDelete(index)" class="todo__list__delete">
                            삭제하기
                        </button>

                        <label class="todo__list__check">
                            <input type="checkbox" v-model="todoList.completed">
                            <span>체크여부</span>
                        </label>
                    </div>

                    <!-- 리스트 수정 -->
                    <div v-show="editedIdx === index" class="todo__list__edit">
                        <div class="edit__inner">
                            <label class="edit__label">
                                <input type="text" v-model.trim="editedText"  @keyup.enter="editComplete(index)" class="edit__input">
                            </label>

                            <button type="button" @click="editComplete(index)" class="edit__button">수정완료</button>
                        </div>
                    </div>
                </li>
            </ul>
        </template>

        <template v-else>
            <p >
                등록된 todo list가 없습니다.
            </p>
        </template>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            editedIdx: null,
            editedText: "",
        }
    },
    computed: {
        ...mapGetters([
            "gettersList"
        ]),
    },
    methods: {
        listEdit(listValue, index) {
            this.editedIdx = index;
            this.editedText = listValue;
        },
        editComplete(index) {
            if (!this.editedText.length) {
                return alert("Please check your answer");   
            }
            const editedData = {
                index,
                value: this.editedText,
            }
            this.$store.dispatch("EDIT_TODO", editedData);
            this.editedIdx = null;
        },
        listDelete(index) {
            if (!confirm("Do you want to delete it ?")) return;
            this.$store.dispatch("DELETE_TODO", index);
        },
    },
}
</script>