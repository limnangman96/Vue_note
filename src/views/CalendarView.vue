<template>
    <div class="calendar">
        <div class="calendar__wrapper">
            <!-- 달력 헤더 -->
            <header class="calendar__header">
                <button type="button" @click="jumpMonth(false)" class="calendar__header__button prev">이전</button>

                <div class="calendar__header__title">
                    <span class="title__month">{{ monthText }}</span>
                    <span class="title__year">{{ year }}</span>
                </div>

                <button type="button" @click="jumpMonth(true)" class="calendar__header__button next">다음</button>
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
                        <!-- 지난달 -->
                        <td v-for="(item, index) in lastDateArr" :key="index + 'l'" class="calendar__item calendar__date notThisMonth">
                            <span>{{ item }}</span>
                        </td>

                        <!-- 이번달 -->
                        <td v-for="(item, index) in currDateArr" :key="index" :class="item == date ? 'today' : ''" class="calendar__item calendar__date">
                            <label class="calendar__date__label">
                                <input type="radio" @change="matchingScheduleList(index)" class="calendar__date__input" name="date">                    
                                <span>{{ item }}</span>
                            </label>
                        </td>

                        <!-- 다음달 -->
                        <td v-for="(item, index) in nextDateArr" :key="index + 'n'" class="calendar__item calendar__date notThisMonth">
                            <span>{{ item }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- 일정 영역 -->
            <template v-if="checkedDate"> 
                <div class="calendar__schedule">
                    <!-- 일정 리스트 -->
                    <div class="schedule">
                        <ul v-if="thisDateSchedule && thisDateSchedule.length" class="schedule__inner">
                            <li v-for="(item, index) in thisDateSchedule" :key="index + 's'" class="schedule__list">
                                {{ item.dataValue }}    
                            </li> 
                        </ul>

                        <p v-else class="schedule__empty">등록된 일정이 없습니다.</p>
                    </div>

                    <!-- 일정 추가 영역 -->
                    <div class="schedule__addList" v-show="addScheduleArea">
                        <label class="schedule__addList__label">
                            <input type="text" @keyup.enter="scheduleAdd()" v-model.trim="addScheduleText" class="schedule__addList__input">
                        </label>
                    </div>

                    <!-- 일정 관련 버튼 -->
                    <div class="schedule__buttonWrap">
                        <template v-if="!addScheduleArea">
                            <button type="button" class="schedule__buttonWrap__add" @click="addScheduleAreaControl(true)">일정추가</button>
                        </template>

                         <template v-else>
                            <button type="button" class="schedule__buttonWrap__cancel" @click="addScheduleAreaControl(false)">일정추가 취소</button>
                        </template>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
import moment from 'moment';
export default {
    data() {
        return {
            /* 달력 관련 데이터 */
            year: null,
            month: null,
            date: null,
            monthText: "",
            dayList: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            moveMonth: 0,
            lastDateArr: [],
            currDateArr: [],
            nextDateArr: [], 
            /* 일정 관련 데이터 */
            checkedDate: null,
            addScheduleText: "",
            addScheduleArea: false, 
            scheduleListArr: [], 
            thisDateSchedule: [], 
        }
    },
    mounted() {
        if (localStorage.getItem("scheduleList")) this.scheduleListArr = JSON.parse(localStorage.getItem("scheduleList"));
        this.drawDayList();
    },
    methods: {
        getCalendarDate() { //날짜 구할 때 필요한 데이터 계산
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
        drawDayList() { //날짜 뽑아내기
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
        matchingScheduleList(index) {
            this.checkedDate = index;
            const thisDateKey = `${this.year}-${this.month}-${this.checkedDate + 1}`;
            const resultData = this.scheduleListArr.filter((item) => item.dataKey == thisDateKey);
            this.thisDateSchedule = resultData;
        },
        addScheduleAreaControl(bool) {
            this.addScheduleArea = bool;
        },
        scheduleAdd() {
            if (!this.addScheduleText) {
                alert("pleas check your answer !");
                return ;
            }

            const scheduleData = {
                dataKey: `${this.year}-${this.month}-${this.checkedDate + 1}`,
                dataValue: this.addScheduleText,
            }
            this.scheduleListArr.push(scheduleData);

            localStorage.setItem("scheduleList", JSON.stringify(this.scheduleListArr));
            this.$router.go(); //현재 페이지 새로고침 @TODO
        },
    },
}
</script>