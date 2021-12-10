<template>
    <!-- 모달 배경 (딤) -->
    <div class="todo__addPop">
        <!-- 모달 -->
        <div class="todo__addPop__cont">
            <label class="todo__addPop__label">
                <input type="text" v-model.trim="inputValue" @keyup.enter="listAdd()" placeholder="input your plan" class="todo__addPop__input">
            </label>

            <div class="todo__addPop__buttonWrap">
                <button type="button" @click="listAdd()" class="todo__addPop__add">추가하기</button>
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
        }
    },
    methods: {
        modalClose() {
            this.$emit("modal:close", false);
        },
        listAdd() {
            if (!this.inputValue.length) {
                alert("Please check your answer");
                return ;
            }

            const addedData = { 
                value: this.inputValue,
                completed: false,
            }

            this.$store.dispatch("ADD_TODO", addedData);
            this.modalClose(); 
        },
    },
}
</script>