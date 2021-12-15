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
                        <span>{{ item }}</span>
                    </td>

                    <td v-for="(item, index) in currDateArr" :key="index + 'c'" class="calendar__item calendar__date" :class="item == date ? 'today' : ''">
                        <label class="calendar__date__label">
                            <input type="radio" class="calendar__date__input" name="date" v-model="checkedData" :value="index + 'c'">                    
                            <span>{{ item }}</span>
                        </label>
                    </td>

                    <td v-for="(item, index) in nextDateArr" :key="index + 'n'" class="calendar__item calendar__date notThisMonth">
                        <span>{{ item }}</span>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- 
            @TODO
            해당하는 날짜에 일정 있으면 ul 보여주고 없으면 p 보여주기        
            일정은 localStorage에 저장..?    
        -->
        <template v-if="checkedData">
            <div>
                <div>
                    <ul v-if="false">
                        <li>일정리스트1</li> 
                        <li>일정리스트2</li> 
                        <li>일정리스트3</li> 
                    </ul>

                    <p else>등록된 일정이 없습니다.</p>
                </div>

                <button>일정추가</button>
            </div>
        </template>
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
            checkedData: null,
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
            this.monthText = moment(this.month).format("MMM"); //ISO에서 인식할 수 없다는 오류 @TODO
            
            const currMonthFirstDay = moment([this.year, 0, 1]).month(this.month - 1).format("d"); //이번달 첫 요일 (month는 배열이라 -1 필요)
            const currMonthLastDay = moment([this.year, 0, 31]).month(this.month - 1).format("d"); //이번달 마지막 요일 
            const currMonthLastDate = moment([this.year, 0, 31]).month(this.month - 1).format("DD"); //이번달 마지막 날짜 
            const lastMonthLastDate = moment([this.year, 0, 31]).month(this.month - 2).format("DD"); //지난달 마지막 날짜
            
            return {
                currMonthFirstDay,
                currMonthLastDay,
                currMonthLastDate,
                lastMonthLastDate,
            }
        },
        drawDayList() { 
            let { currMonthFirstDay, currMonthLastDay, currMonthLastDate, lastMonthLastDate } = this.getCalendarDate();
            const lastDateArr = []; 
            const nextDateArr = [];
            const currDateArr = [];

            // 지난달 날짜 구하기 > 첫 요일 index가 0이 될 때까지 지난달 마지막 날짜에서 -1 하여 넣어주기
            for (let i = currMonthFirstDay - 1; i >= 0; i--) {
                lastDateArr.push(Number(lastMonthLastDate));
                lastMonthLastDate -= 1;
            }

            // 다음달 날짜 구하기 > 마지막 요일이 6부터 작거나 같을 때 1부터 +1 하여 넣어주기 
            for (let i = 1; i <= (6 - currMonthLastDay); i++) {
                nextDateArr.push(i);
            }

            // 이번달 날짜 구하기 > 1부터 마지막 날짜까지 +1 하여 넣어주기
            for (let i = 1; i <= currMonthLastDate; i++) {
                currDateArr.push(i);
            }

            this.lastDateArr = lastDateArr.sort(function(a,b) {return a-b});
            this.nextDateArr = nextDateArr;
            this.currDateArr = currDateArr;
        },
        jumpMonth(bool) {
            bool ? this.moveMonth++ : this.moveMonth--;
            this.drawDayList();
        },
    },
}
</script>