<template>
    <!-- 모달 배경 (딤) -->
    <div v-if="isModalOpen" class="todo__addPop">
        <!-- 모달 -->
        <div class="todo__addPop__cont">
            <label class="todo__addPop__label">
                <input type="text" @keyup.enter="inputCheck" v-model="inputValue" placeholder="input your plan" class="todo__addPop__input">
            </label>

            <div class="todo__addPop__buttonWrap">
                <button type="button" @click="inputCheck" class="todo__addPop__add">추가하기</button>
                <button type="button" @click="modalClose" class="todo__addPop__cancle">취소하기</button>
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
            // @TODO default 값???
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
<style lang="scss">
    .todo {
        &__addPop {
            position: fixed;
            z-index: 2;
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,0.5);

            &__cont {
                position: absolute;
                top: 50%;
                left: 50%;
                padding: 30px;
                width: 500px;
                background: #fff;
                border-radius: 5px;
                transform: translate(-50%, -50%);
            }

            &__label {
                display: block;
                padding: 0 100px 0 0;
                box-sizing: border-box;
            }

            &__input {
                width: 100%;
                height: 30px;
                padding: 0;
                font-size: 15px;
                font-family: "Shippori Antique", sans-serif;
                border: none;
            }

            &__buttonWrap {
                position: absolute;
                top: 30px;
                right: 30px;
                font-size: 0;
            }

            &__add {
                display: inline-block;
                position: relative;
                width: 30px;
                height: 30px;
                margin-right: 8px;
                padding: 0;
                font-size: 0;
                background: #50e3a4  url('../assets/images/icon-checked.png') no-repeat center/ 15px auto; 
                border: none;
                border-radius: 50%;
            }

            &__cancle {
                display: inline-block;
                position: relative;
                width: 30px;
                height: 30px;
                padding: 0;
                font-size: 0;
                border: 0;
                background: #eee;
                border-radius: 50%;

                &:before {
                    content: "";
                    width: 15px;
                    height: 3px;
                    background: #b4b4b4;
                    border-radius: 5px;
                    display: block;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) rotate(45deg);
                }

                &:after {
                    content: "";
                    width: 3px;
                    height: 15px;
                    background: #b4b4b4;
                    border-radius: 5px;
                    display: block;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) rotate(45deg);
                }
            }
        }
    }
</style>