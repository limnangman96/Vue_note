<template lang="">
    <div class="calendar">
        <header class="calendar__header">
            <button class="calendar__header__button prev">이전</button>
            <div class="calendar__header__title">
                <span class="title__month">Nov</span>
                <span class="title__year">2021</span>
            </div>
            <button class="calendar__header__button next">다음</button>
        </header>
        <DayListView></DayListView>
    </div>
</template>
<script>
import DayListView from './DayListView.vue'
export default {
    components: {
        DayListView,
    }
    // @TODO headerView에 있는 오늘날짜 계산값을 index.js로 빼든지 해서 공통으로 쓰자
}
</script>
<style lang="scss">
    .calendar {
        position: absolute;
        top: 50%;
        left: 50%;
        padding: 40px;
        background: #fff;
        box-sizing: border-box;
        box-shadow: 0 0 10px rgb(0 0 0 / 3%);
        border-radius: 10px;
        transform: translate(-50%, -50%);

        &__header {
            display: flex;
            position: relative;
            margin-bottom: 10px;
            padding-bottom: 20px;
            border-bottom: 1px solid #c8c8c8;
            box-sizing: border-box;
            justify-content: space-between;
            align-items: center;
            
            &__title {
                .title {
                    &__month {
                        color: #575757;
                        font-size: 22px;
                        font-weight: bold;
                    }

                    &__year {
                        margin-left: 5px;
                        color: #c8c8c8;
                        font-size: 22px;
                    }
                }
            }

            &__button {
                width: 30px;
                height: 30px;
                font-size: 0;
                background: url("../assets/images/icon-next.png")no-repeat center / auto 15px;
                border: none;
                border-radius: 50%;

                &.prev {
                    transform: rotate(180deg);
                }

                &:hover {
                    background: #e7e7e7 url("../assets/images/icon-next-white.png")no-repeat center / auto 15px;
                }
            }            
        }
    }
</style>