<template>
    <div class="calendar">
        <header class="calendar__header">
            <button class="calendar__header__button prev" @click="getPrevMonth()">이전</button>

            <div class="calendar__header__title">
                <span class="title__month">{{ this.monthText }}</span>
                <span class="title__year">{{ this.year }}</span>
            </div>

            <button class="calendar__header__button next" @click="getNextMonth()">다음</button>
        </header>

        <table class="calendar__inner">
            <thead class="calendar__top">
                <th v-for="(item, index) in dayList" :key="index" class="calendar__item">
                    <span>{{ item }}</span>
                </th>
            </thead>

            <tbody class="calendar__cont">
                <tr>
                    <td v-for="(item, index) in lastDateArr" :key="index + 'l'" class="calendar__item calendar__date notThisMonth">
                        <input type="checkbox" class="calendar__date__input">                    
                        <span>{{ item }}</span>
                    </td>

                    <td v-for="(item, index) in currDateArr" :key="index + 'c'" class="calendar__item calendar__date">
                        <input type="checkbox" class="calendar__date__input">                    
                        <span>{{ item }}</span>
                    </td>

                    <td v-for="(item, index) in nextDateArr" :key="index + 'n'" class="calendar__item calendar__date notThisMonth">
                        <input type="checkbox" class="calendar__date__input">                    
                        <span>{{ item }}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { todayMixin } from '../mixins/getTodayMixins';

export default {
    mixins: [todayMixin],
    data() {
        return {
            monthText: "",
            otherMonth: 0,
            dayList: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            lastDateArr: [],
            currDateArr: [],
            nextDateArr: [],
        }
    },
    mounted() {
        this.monthText = this.getMoment.format("MMM"); //월 
        this.drawDayList(0);
        // console.log( this.getMoment.subtract(-5, "month").calendar() ) //이걸로 조작 가능
    },
    methods: {
        drawDayList(num) { //DayListView에서 쓰이는 함수
            let { currMonthFirstDay, currMonthLastDay, currMonthLastDate, lastMonthLastDate } = this.getCalendarDate(num);
            const lastDateArr = []; 
            const nextDateArr = [];
            const currDateArr = [];

            for (let i = currMonthFirstDay; i > 0; i--) {
                lastDateArr.push(Number(lastMonthLastDate));
                lastMonthLastDate -= 1;
            }

            for (let i = 1; i <= (6 - currMonthLastDay); i++) {
                nextDateArr.push(i);
            }

            for (let i = 1; i <= currMonthLastDate; i++) {
                currDateArr.push(i);
            }

            this.lastDateArr = lastDateArr.sort(function(a,b) {return a-b});
            this.nextDateArr = nextDateArr;
            this.currDateArr = currDateArr;
        },
        getPrevMonth() {
            let monthVal = this.otherMonth;
            monthVal -= 1;
            this.otherMonth = monthVal;

            this.drawDayList(monthVal);
        },
        getNextMonth() {
            let monthVal = this.otherMonth;
            monthVal += 1;
            this.otherMonth = monthVal;

            this.drawDayList(monthVal);
        },
    },
}
</script>