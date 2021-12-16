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

                        <!-- 이번달 (index + 1 배열이라 0부터 시작) -->
                        <td v-for="(item, index) in currDateArr" :key="index" :class="item == date ? 'today' : ''" class="calendar__item calendar__date">
                            <label class="calendar__date__label">
                                <input type="radio" @change="matchingScheduleList(index + 1)" ref="dateInput" class="calendar__date__input" name="date">                    
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

            <!-- 스케줄 영역 -->
            <template v-if="checkedDate"> 
                <div class="calendar__schedule">
                    <!-- 스케줄 리스트 -->
                    <div class="schedule">
                        <ul v-if="thisDateSchedule && thisDateSchedule.length" class="schedule__inner">
                            <li v-for="(item, index) in thisDateSchedule" :key="index + 's'" class="schedule__list">
                                <span class="schedule__list__text">{{ item.dataValue }}</span>
                                <button type="button" class="schedule__list__delete" @click="scheduleDelete(item)">스케줄 삭제</button>    
                            </li> 
                        </ul>

                        <p v-else class="schedule__empty">등록된 스케줄이 없습니다.</p>
                    </div>

                    <!-- 스케줄 추가 영역 -->
                    <div class="schedule__addList" v-show="addScheduleArea">
                        <label class="schedule__addList__label">
                            <input type="text" @keyup.enter="scheduleAdd()" v-model.trim="addScheduleText" class="schedule__addList__input">
                        </label>
                    </div>

                    <!-- 스케줄 관련 버튼 -->
                    <div class="schedule__buttonWrap">
                        <template v-if="!addScheduleArea">
                            <button type="button" class="schedule__buttonWrap__add" @click="controlScheduleAddArea(true)">스케줄추가</button>
                        </template>

                         <template v-else>
                            <button type="button" class="schedule__buttonWrap__cancel" @click="controlScheduleAddArea(false)">스케줄추가 취소</button>
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
            lastDateArr: [],
            currDateArr: [],
            nextDateArr: [], 
            moveMonth: 0,
            /* 스케줄 관련 데이터 */
            scheduleListArr: [], //스케줄 있는날
            thisDateSchedule: [], //해당일 스케줄
            scheduleArea: false, 
            checkedDate: null, //선택날짜
            addScheduleText: "",
            addScheduleArea: false, 
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

            console.log(relativeDate, "relativeDate")

            this.month = relativeDate.split("/")[0];
            this.date = relativeDate.split("/")[1];
            this.year = relativeDate.split("/")[2];
            this.monthText = moment(relativeDate, 'MM/DD/YYYY').format("MMM"); 

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
        jumpMonth(bool) { //달 이동
            bool ? this.moveMonth++ : this.moveMonth--;
            this.checkedDate = null; //체크값 비워서 스케줄 영역 숨기기
            this.$refs.dateInput.forEach(el => el.checked = false); //체크값 풀어서 css해제 TODO
            this.drawDayList(); //날짜 다시 그리기
        },
        matchingScheduleList(index) { //날짜와 스케줄리스트 매칭 > 뿌려주기
            this.checkedDate = Number(index);
            const thisDateKey = `${this.year}-${this.month}-${this.checkedDate}`;
            const resultData = this.scheduleListArr.filter((item) => item.date == thisDateKey);
            this.thisDateSchedule = resultData;
        },
        controlScheduleAddArea(bool) { //스케줄 추가영역 show/hide
            this.addScheduleArea = bool;
        },
        scheduleAdd() { //스케줄 추가
            if (!this.addScheduleText) {
                alert("pleas check your answer !");
                return ;
            }

            const scheduleData = {
                date: `${this.year}-${this.month}-${this.checkedDate}`,
                dataValue: this.addScheduleText,
            }

            this.scheduleListArr.push(scheduleData);
            localStorage.setItem("scheduleList", JSON.stringify(this.scheduleListArr));

            this.matchingScheduleList(this.checkedDate);
            this.addScheduleText = "";
            this.addScheduleArea = false;
        },
        scheduleDelete(listInfo) { //스케줄 삭제
            const deleteIndex =  this.scheduleListArr.findIndex((item) => item.date == listInfo.date && item.dataValue == listInfo.dataValue); //날짜와 value까지 맞아떨어지면
            this.scheduleListArr.splice(deleteIndex, 1);
            localStorage.setItem("scheduleList", JSON.stringify(this.scheduleListArr));
            this.matchingScheduleList(this.checkedDate);
        },
    },
}
</script>