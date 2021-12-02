<template>
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
import { todayMixin } from '../mixins/getTodayMixins';

export default {
    data() {
        return {
            year: "",
            month: "",
            date: "",
            day: "",
        }
    },
    mixins: [todayMixin]
}
</script>