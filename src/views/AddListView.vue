<template>
    <!-- 모달 배경 (딤) -->
    <div v-if="isModalOpen" class="todo__addPop">
        <!-- 모달 -->
        <div class="todo__addPop__cont">
            <label class="todo__addPop__label">
                <input type="text" v-model="inputValue" @keyup.enter="inputCheck()" placeholder="input your plan" class="todo__addPop__input">
            </label>

            <div class="todo__addPop__buttonWrap">
                <button type="button" @click="inputCheck()" class="todo__addPop__add">추가하기</button>
                <button type="button" @click="modalClose()" class="todo__addPop__cancle">취소하기</button>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            inputValue : '',
            idValue: localStorage.getItem("todoData") ? JSON.parse(localStorage.getItem("todoData"))[JSON.parse(localStorage.getItem("todoData")).length - 1].id + 1 : 0,
        }
    },
    props: {
        isModalOpen: {
            type: Boolean,
            required: true,
            default: true,
        }
    },
    methods: {
        inputCheck() {
            const value = this.inputValue.trim();

            if (value.length <= 0) {
                alert("please check your answer !");                
                return;
            }
            
            const valueInfo = { //추후 input checked 정보를 status에 넣기 위해 객체로 형태로 만듦
                id: Number(this.idValue),
                value: value,
                completed: false,
            }

            this.saveTodo(valueInfo); //입력한 값 store에 저장
            this.modalClose(); 
        },
        saveTodo(valueInfo) {
            this.$store.dispatch("ADD_TODO", valueInfo); //input 스토어에 저장
            this.idValue++;
        },
        modalClose() {
            this.inputValue = ""; //input 비우기
            this.$emit('modal:cancel'); //모달 닫기
        },
    },
}
</script>