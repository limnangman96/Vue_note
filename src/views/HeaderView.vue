<template lang="">
    <header class="todo__header">
        <!-- 왼쪽 -->
        <div class="todo__header__left">
            <div class="todo__header__date">{{ date }}</div>

            <div class="todo__header__inner">
                <p class="todo__header__month">{{ month }}</p> 
                <p class="todo__header__year">{{ year }}</p>
            </div>
        </div>

        <!-- 오른쪽 -->
        <div class="todo__header__right">{{ day }}</div>
    </header>
</template>
<script>
export default {
    data() {
        return {
            year: "",
            day: "",
            date: "",
            day: ""
        }
        
    },
    created() {
        const moment = require('moment'); // moment 모듈불러오기
        const year = moment().format("YYYY");
        const month = moment().format("MM");
        const date = moment().format("DD");
        const dayArr = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
        const today = new Date();
        const day = dayArr[today.getDay()]

        this.year = year;
        this.month = month;
        this.date = date;
        this.day = day;
    }
}
</script>
<style lang="scss">
    .todo {
        &__header {
            display: flex;
            justify-content: space-between;
            align-items: center;

            &__left {
                display: flex;
                align-items: center;
                font-size: 0;
                color: #575757;
            }

            &__date {
                display: inline-block;
                font-size: 50px;
                line-height: 1;
                color: #575757;
            }

            &__inner {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                height: 50px;
                margin-left: 8px;
            }

            &__month {
                font-size: 15px;
                font-weight: bold;
                line-height: 1;
                color: #575757;
            }

            &__year {
                font-size: 15px;
                line-height: 1;
                color: #575757;
            }


            &__right {
                font-size: 15px;
                color: #575757;
            }
        }
    }
</style>