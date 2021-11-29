<template>
    <ul>
        <li class="todo__list js__list" v-for="item in this.$store.state.todoData">
            <!-- 리스트 내용 -->
            <a class="todo__list__link js__list__link" @click="listEdit">
                <p class="todo__list__text js__list__text">
                    {{ item.value }}
                </p>
            </a>

            <!-- 리스트 삭제/완료 -->
            <div class="todo__list__buttonWrap">
                <button type="button" @click="listDelete(item)" class="todo__list__delete js__list__delete">
                    삭제하기
                </button>

                <label class="todo__list__check">
                    <input type="checkbox" @change="changeStatus($event, item)">
                    <span>체크여부</span>
                </label>
            </div>

            <!-- 리스트 수정 -->
            <div class="todo__list__edit js__edit">
                <div class="edit__inner">
                    <label class="edit__label">
                        <input @keyup.enter="editComplete" type="text" class="edit__input js__edit__input">
                    </label>

                    <button type="button" class="edit__button" @click="editComplete">수정완료</button>
                </div>
            </div>
        </li>
    </ul>
</template>
<script>

export default {
    mounted() {
        // DOM이 처음 그려졌을 때 완료한(done) 리스트 화면에 그려주기
        if( !this.$store.state.todoData.length ) return;

        const list = document.querySelectorAll(".js__list");

        this.$store.state.todoData.forEach((item, index)  => {
            if (item.completed) { //완료 상태면
                list[index].classList.add("done");
                list[index].querySelector(".todo__list__check input").checked = true;
            } 
        });
    },
    methods: {
        /* 완료/미완료 처리 */
        changeStatus($event, item) {
            item.completed = $event.target.checked; //input checkbox 값을 넣음 (true/false)
            $event.target.closest(".js__list").classList.toggle("done"); 
            this.$store.dispatch("STATUS_CHANGE", item); 
        },
        /* 리스트 수정 */
        listEdit(e) {
            const parent = e.target.closest(".js__list");
            parent.querySelector(".js__edit").classList.add("show");
            parent.querySelector(".edit__input").value = e.target.innerText;
        },
        /* 리스트 수정완료 */
        editComplete(e) {
            const parent = e.target.closest(".js__list");
            const editArea = parent.querySelector(".js__edit");
            const oriText = parent.querySelector(".js__list__text").innerText;
            const editText = parent.querySelector(".js__edit__input").value.trim();

            if (editText.length <= 0) {
                alert("please check your answer !");      
                return;
            }

            const editData = { 
                before: oriText, 
                after: editText 
            }

            this.$store.dispatch("EDIT_TODO", editData);
            editArea.classList.remove("show");
        },
        listDelete(item) {
            const response = confirm("삭제하시겠습니까?");
            if (!response) return;

            this.$store.dispatch("DELETE_TODO", item);
            this.update();
        },
        update() {
            if( !this.$store.state.todoData.length ) return;

            const list = document.querySelectorAll(".js__list");

            this.$store.state.todoData.forEach((item, index)  => {
                if (item.completed) { //완료 상태면
                    list[index].classList.add("done");
                    list[index].querySelector(".todo__list__check input").checked = true;
                } else {
                    list[index].classList.remove("done");
                    list[index].querySelector(".todo__list__check input").checked = false;
                }
            });
        }
    },
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

            &.done {
                .todo__list__link {
                    pointer-events: none;
                    cursor: default;
                }

                .todo__list__text {
                    color: #ddd;
                }
            }

            &__link {
                display: block;
                position: relative;
                width: calc(100% - 80px);
                cursor: pointer;
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