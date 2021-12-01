<template>
    <div>
        <ul v-if="gettersList.length">
            <li v-for="(item, index) in gettersList" :key="index" :class="{'done' :checkedListId.indexOf(item.id) != -1}" class="todo__list">
                <!-- 리스트 내용 -->
                <a href="#" @click="listEdit($event, item, index)" class="todo__list__link">
                    <p class="todo__list__text">
                        {{ item.value }}
                    </p>
                </a>

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
                <div class="todo__list__edit" v-show="isShowEditIndex === index ? true : false">
                    <div class="edit__inner">
                        <label class="edit__label">
                            <!-- :value="item.value" -->
                            <input type="text" v-model="afterEditText"  @keyup.enter="editComplete(item)" class="edit__input">
                        </label>

                        <button type="button" class="edit__button" @click="editComplete(item)">수정완료</button>
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

        // localStorage 저장된 값 중 완료여부 true인 값이 있으면 해당 id 값 데이터에 넣어주기 @TODO foreach 안쓷기
        localData.forEach((todoList) => {
            todoList.completed === true ? this.checkedListId.push(todoList.id) : "";
        });
    },
    computed: {
        ...mapGetters([
            "gettersList"
        ]),
        watchStore: function() { 
            return this.gettersList.length; // getters 갯수에 변화가 생기면 감지
        }
    },
    watch: {
        watchStore() { // 변화된 store 로컬스토리지에 저장
            localStorage.setItem("todoData", JSON.stringify(this.gettersList));
        },
        checkedListId(newValue) { // 변화된 데이터 로컬스토리지에 저장 @TODO 더 좋은 방법 없나?
            let test = JSON.parse(localStorage.getItem("todoData")); 
         
            test.forEach((list, index) => {
                if (newValue.indexOf(list.id) != -1) {
                    list.completed = true;
                } else {
                    list.completed = false;
                }
            })

            localStorage.setItem("todoData", JSON.stringify(test));
        }
    },
    methods: {
        /* 리스트 수정 */
        listEdit($event, item, index) {
            $event.preventDefault();

            this.isShowEditIndex = index;
            this.afterEditText = item.value;
        },
        /* 리스트 수정완료 버튼 */
        editComplete(item) {
            if (!this.afterEditText.trim().length) return;

            const sendEditData = {
                id: item.id,
                value: this.afterEditText.trim(),
            }

            this.$store.dispatch("EDIT_TODO", sendEditData);
            this.isShowEditIndex = false;
        },
        /* 리스트 삭제버튼 */
        listDelete(item) {
            const response = confirm("삭제하시겠습니까?");
            if (!response) return;

            this.$store.dispatch("DELETE_TODO", item.id);
        },
    },
}
</script>
// @TODO scss 파일 따로 빼기
<style lang="scss">
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
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                padding: 20px 0;
                background: #fff;
                box-sizing: border-box;

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