<template>
    <div class="calendar">
        <!-- 달력 헤더 -->
        <header class="calendar__header">
            <button class="calendar__header__button prev" @click="jumpMonth(false)">이전</button>

            <div class="calendar__header__title">
                <span class="title__month">{{ monthText }}</span>
                <span class="title__year">{{ year }}</span>
            </div>

            <button class="calendar__header__button next" @click="jumpMonth(true)">다음</button>
        </header>

        <!-- 달력 테이블 -->
        <table class="calendar__inner">
            <!-- 요일 -->
            <thead class="calendar__top">
                <th v-for="(item, index) in dayList" :key="index" class="calendar__item">
                    <span>{{ item }}</span>
                </th>
            </thead>

            <!-- 날짜 -->
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
import moment from 'moment';

export default {
    data() {
        return {
            year: null,
            month: null,
            date: null,
            monthText: "",
            moveMonth: 0,
            dayList: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            lastDateArr: [],
            currDateArr: [],
            nextDateArr: [],
        }
    },
    mounted() {
        this.drawDayList();
    },
    methods: {
        getCalendarDate() {
            let relativeDate = "";

            if (this.moveMonth === 0) {
                relativeDate = moment().format("M/D/YYYY");
            } else {
                relativeDate = moment().add(this.moveMonth, "month").calendar();
            }

            this.month = relativeDate.split("/")[0];
            this.date = relativeDate.split("/")[1];
            this.year = relativeDate.split("/")[2];
            this.monthText = moment(this.month).format("MMM");
            
            let calcMonth = Number(this.month) + this.moveMonth - 1; //0~11 이 범주가 아니면 NaN
            
            const currMonthFirstDay = moment([this.year, calcMonth, 1]).day(); //이번달 첫 요일 
            const currMonthLastDay = moment([this.year, 0, 31]).month(calcMonth).format("d"); //이번달 마지막 요일 
            const currMonthLastDate = moment([this.year, 0, 31]).month(calcMonth).format("DD"); //이번달 마지막 날짜 
            const lastMonthLastDate = moment([this.year, 0, 31]).month(calcMonth - 2).format("DD"); //지난달 마지막 날짜

            return {
                currMonthFirstDay,
                currMonthLastDay,
                currMonthLastDate,
                lastMonthLastDate
            }
        },
        drawDayList() { //DayListView에서 쓰이는 함수
            let { currMonthFirstDay, currMonthLastDay, currMonthLastDate, lastMonthLastDate } = this.getCalendarDate();
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
        jumpMonth(bool) {
            bool ? this.moveMonth++ : this.moveMonth--;
            this.drawDayList(bool);
        }
    },
}
</script>