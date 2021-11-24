// 리스트 삭제하고 수정하는 페이지
<template>
    <ul>
        <li class="todo__list js__list" v-for="item in this.todoDataArr">
            <!-- 리스트 내용 -->
            <a class="todo__list__link js__list__link" @click="listEdit">
                <p class="todo__list__text js__list__text">
                    {{ item }}
                </p>
            </a>

            <!-- 리스트 삭제/완료 -->
            <div class="todo__list__buttonWrap">
                <button type="button" @click="listDelete" class="todo__list__delete js__list__delete">
                    삭제하기
                </button>

                <label class="todo__list__check">
                    <input type="checkbox" @change="isChecked">
                    <span>체크여부</span>
                </label>
            </div>

            <!-- 리스트 수정 -->
            <div class="todo__list__edit js__edit">
                <div class="edit__inner">
                    <label class="edit__label">
                        <input type="text" class="edit__input js__edit__input">
                    </label>

                    <button type="button" class="edit__button" @click="editComplete">수정완료</button>
                </div>
            </div>
        </li>
    </ul>
</template>
<script>
import bus from '../util/bus.js';

export default {
    data() {
        return {
            checked: false,
            todoDataArr: [],
        }
    },
    methods: {
        isChecked(e) {
            const parent = e.target.closest(".js__list");
            if (e.target.checked) {
                parent.querySelector(".js__list__link").classList.add("done");
                
            } else {
                parent.querySelector(".js__list__link").classList.remove("done");
            }
        },
        drawList () {
            if (localStorage.getItem("todoList")) {
                this.todoDataArr = JSON.parse(localStorage.getItem("todoList"));
            }
        },
        listEdit(e) {
            const parent = e.target.closest(".js__list");
            parent.querySelector(".js__edit").classList.add("show");
            parent.querySelector(".edit__input").value = e.target.innerText
        },
        editComplete(e) {
            const parent = e.target.closest(".js__list");
            const editArea = parent.querySelector(".js__edit");
            const oriIText = parent.querySelector(".js__list__text");
            const editText = parent.querySelector(".js__edit__input");

            if (editText.value.trim().length <= 0) {
                alert("please check your answer !");      
                return;
            }

            const arrIndexNum = this.todoDataArr.indexOf(oriIText.innerText);
            this.todoDataArr[arrIndexNum] = editText.value; //데이터에서 값 바꿔치기
            
            localStorage.setItem("todoList", JSON.stringify(this.todoDataArr)); //로컬스토리지에 데이터 업데이트!

            oriIText.innerText = editText.value; //입력한 input값 <p>태그에 넣어주기

            editArea.classList.remove("show");
        },
        listDelete(e) {
            const response = confirm("삭제하시겠습니까?");
            if (!response) return;

            const parent = e.target.closest(".js__list");
            const targetText = parent.querySelector(".js__list__text");
            const arrIndexNum = this.todoDataArr.indexOf(targetText.innerText);

            this.todoDataArr.splice(arrIndexNum, 1); //데이터에서 값 제거

            localStorage.setItem("todoList", JSON.stringify(this.todoDataArr)); //로컬스토리지에 데이터 업데이트!

            parent.remove(); //해당리스트 삭제
        }
    },
    created() {
        const oriLocalStorage = localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : []
        this.todoDataArr = oriLocalStorage;
        bus.$on("modal:add", this.drawList);
    }
}
</script>
<style lang="scss" scope>
    $black: #575757;

    .todo {
        &__list {
            position: relative;
            min-height: 60px;
            padding: 20px 0;
            box-sizing: border-box;

            &__link {
                display: block;
                position: relative;
                width: calc(100% - 80px);
                cursor: pointer;

                &.done {
                    pointer-events: none;
                    cursor: default;

                    .todo__list__text {
                        color: #ddd;
                    }
                }
            }

            &__text {
                color: $black;
                font-size: 16px;
                line-height: 20px;
                word-break: break-all;
            }

            &__buttonWrap {
                display: flex;
                position: absolute;
                top: 50%;
                right: 0;
                width: 62px;
                align-items: center;
                justify-content: space-between;
                transform: translate(0, -50%);
            }

            &__delete {
                position: relative;
                width: 24px;
                height: 24px;
                background: url('../assets/images/icon-delete.png')no-repeat center/ auto 100%;
                border: none;
                font-size: 0;

                &:hover {
                    background-image: url('../assets/images/icon-delete-active.png');
                }
            }

            &__check {
                display: inline-block;
                width: 26px;
                height: 26px;
                font-size: 0;

                input {
                    display: none;
                }

                span {
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                    border: 4px solid #eee;
                    border-radius: 50%;
                    box-sizing: border-box;
                    font-size: 0;
                    cursor: pointer;
                }

                input:checked + span {
                    border: 4px solid #50e3a4;
                }
            }

            &__edit {
                display: none;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                padding: 20px 0;
                background: #fff;
                box-sizing: border-box;

                &.show {
                    display: block;
                }

                .edit {
                    &__inner {
                        display: flex;
                        position: absolute;
                        top: 50%;
                        left: 0;
                        width: 100%;
                        font-size: 0;
                        align-items: center;
                        justify-content: space-between;
                        transform: translate(0, -50%);
                    }

                    &__label {
                        display: inline-block;
                        width: calc(100% - 50px);
                        border-bottom: 1px solid #50e3a4;
                    }

                    &__input {
                        width: 100%;
                        height: 24px;
                        padding: 0;
                        border: none;
                        box-sizing: border-box;
                        color: #50e3a4;
                        font-size: 16px;
                        font-family: "Shippori Antique", sans-serif;
                        line-height: 20px;
                        word-break: break-all;
                    }

                    &__button {
                        width: 26px;
                        height: 26px;
                        background: #fff;
                        border: 4px solid #50e3a4; 
                        border-radius: 5px;
                        font-size: 0;
                    }

                }
            }
        }
    }
</style>