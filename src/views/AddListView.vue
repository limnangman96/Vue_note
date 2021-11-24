// 리스트 추가하는 페이지
<template lang="">
    <!-- 모달 배경 (딤) -->
    <div class="todo__addPop" v-if="isModalOpen">
        <!-- 모달 -->
        <div class="todo__addPop__cont">
            <label class="todo__addPop__label">
                <input type="text" class="todo__addPop__input" placeholder="input your plan" v-model="inputValue">
            </label>

            <div class="todo__addPop__buttonWrap">
                <button type="button" @click="saveInputValue" class="todo__addPop__add">추가하기</button>
                <button type="button" @click="$emit('modal:cancel')" class="todo__addPop__cancle js__cancel">취소하기</button>
            </div>
        </div>
    </div>
</template>
<script>
import bus from '../util/bus.js';

export default {
    data() {
        return {
            inputValue : '',
            todoDataArr: [],
        }
    },
    props: {
        isModalOpen: {
            type: Boolean,
            required: true,
        }
    },
    methods: {
        saveInputValue() {
            const value = this.inputValue.trim();

            if (value.length <= 0) {
                alert("please check your answer !");                
                return;
            } 
            
            this.todoDataArr.push(value); //새로운 데이터를 todoDataArr에 저장
            localStorage.setItem("todoList", JSON.stringify(this.todoDataArr)); //todoAr 통째로 로컬스토리지에 덮어쓰기
            
            bus.$emit("modal:add"); //ListView에 리스트 추가하기

            document.querySelector(".js__cancel").click(); //모달닫기

            this.inputValue = ""; //input 비우기
        }

        // @TODO enter치면 리스트추가 버튼 click();
        // @TODO 추가하기 모달에서 input 입력하고 닫기 버튼 누르면 input 내용 삭제되어야 한다. 
        // @TODO 추가하는 데이터랑 삭제하는 데이터가 서로 같은걸 공유하지 않다보니 맞물려서 오류가 생김
    },
    created() {
        const oriLocalStorage = localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : []
        this.todoDataArr = oriLocalStorage; //기존에 저장되어있던 로컬스토리지를 todoAr에 불러와 넣어줌
    }
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