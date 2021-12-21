<template>
    <div class="calendar">
        <div class="calendar__wrapper">
            <!-- 달력 헤더 -->
            <header class="calendar__header">
                <button type="button" @click="movePrevMonth()" class="calendar__header__button prev">이전</button>

                <div class="calendar__header__title">
                    <span class="title__month">{{ monthText }}</span>
                    <span class="title__year">{{ year }}</span>
                </div>

                <button type="button" @click="moveNextMonth()" class="calendar__header__button next">다음</button>
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
                        <td v-for="(item, index) in currDateArr" :key="index" :class="markToday(item)" class="calendar__item calendar__date">
                            <label class="calendar__date__label">
                                <input type="radio" v-model="checkedDateString" :value="`${month}/${item}/${year}`" class="calendar__date__input" name="date">                    
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
            <template v-if="checkedDateString"> 
                <div class="calendar__schedule">
                    <!-- 스케줄 리스트 -->
                    <div class="schedule">
                        <ul v-if="schedule.length" class="schedule__inner">
                            <li v-for="(item, index) in schedule" :key="index + 's'" class="schedule__list">
                                <span class="schedule__list__text">{{ item.dataValue }}</span>
                                <button type="button" @click="scheduleDelete(item.id)" class="schedule__list__delete">스케줄 삭제</button>    
                            </li> 
                        </ul>

                        <p v-else class="schedule__empty">등록된 스케줄이 없습니다.</p>
                    </div>

                    <!-- 스케줄 추가 영역 -->
                    <div v-show="addScheduleArea" class="schedule__addList">
                        <label class="schedule__addList__label">
                            <input type="text" @keyup.enter="scheduleAdd()" v-model.trim="addScheduleText" class="schedule__addList__input">
                        </label>

                        <button @click="scheduleAdd()" class="schedule__addList__button">추가하기</button>
                    </div>

                    <!-- 스케줄 관련 버튼 -->
                    <div class="schedule__buttonWrap">
                        <template v-if="addScheduleArea">
                            <button type="button" @click="showScheduleAdd(false)" class="schedule__buttonWrap__cancel">스케줄추가 취소</button>
                        </template>

                         <template v-else>
                            <button type="button" @click="showScheduleAdd(true)" class="schedule__buttonWrap__add">스케줄추가</button>
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
            relativeDate: '', //날짜 뿌려주기 위한 기준날짜
            dayList: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            todayDate: moment().format("M/D/YYYY"),
            lastDateArr: [],
            currDateArr: [],
            nextDateArr: [], 
            moveMonth: 0,
            /* 스케줄 관련 데이터 */
            scheduleListArr: [], //스케줄 있는날
            scheduleArea: false, 
            addScheduleArea: false,
            addScheduleText: "",
            checkedDateString: "", 
        }
    },
    computed: {
        schedule() {
            if(!this.checkedDateString) return [];

            return this.scheduleListArr.filter((item) => item.date == this.checkedDateString);
        },
        monthText() {
            if(!this.relativeDate) return '';

            return moment(this.relativeDate, 'MM/DD/YYYY').format("MMM");
        },
    },
    watch: {
        moveMonth() {
            this.checkedDateString = ""; 
            this.drawDayList(); 
        }
    },
    mounted() {
        if (localStorage.getItem("scheduleList")) this.scheduleListArr = JSON.parse(localStorage.getItem("scheduleList")); 
        this.drawDayList();
    },
    methods: {
        getCalendarDate() { 
            if (this.moveMonth === 0) {
                this.relativeDate = moment().format("M/D/YYYY");
            } else {
                this.relativeDate = moment().add(this.moveMonth, "month").calendar();
            }

            const relativeDatePice = this.relativeDate.split("/");

            this.month = relativeDatePice[0];
            this.date = relativeDatePice[1];
            this.year = relativeDatePice[2];

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
            this.lastDateArr = []; 
            this.nextDateArr = [];
            this.currDateArr = [];

            // 지난달 날짜 구하기 > 첫 요일 index가 0이 될 때까지 지난달 마지막 날짜에서 -1 하여 넣어주기
            for (let i = currMonthFirstDay - 1; i >= 0; i--) {
                this.lastDateArr.push(Number(lastMonthLastDate));
                lastMonthLastDate -= 1;
            }
            this.lastDateArr.sort(function(a,b) {return a-b});

            // 다음달 날짜 구하기 > 마지막 요일이 6부터 작거나 같을 때 1부터 +1 하여 넣어주기 
            for (let i = 1; i <= (6 - currMonthLastDay); i++) {
                this.nextDateArr.push(i);
            }

            // 이번달 날짜 구하기 > 1부터 마지막 날짜까지 +1 하여 넣어주기
            for (let i = 1; i <= currMonthLastDate; i++) {
                this.currDateArr.push(i);
            }
        },
        markToday(item) {
            return `${this.month}/${item}/${this.year}` == this.todayDate ? 'today' : '';
        },
        movePrevMonth() {
            this.moveMonth--;
        },
        moveNextMonth() {
            this.moveMonth++;
        },
        showScheduleAdd(bool) {
            this.addScheduleArea = bool;
        },
        scheduleAdd() { 
            const idIndex = localStorage.getItem("scheduleList") ? JSON.parse(localStorage.getItem("scheduleList")).length : 0;

            if (!this.addScheduleText) {
                alert("pleas check your answer !");
                return ;
            }

            const scheduleData = {
                id: idIndex,
                date: this.checkedDateString,
                dataValue: this.addScheduleText,
            }

            this.scheduleListArr.push(scheduleData);
            localStorage.setItem("scheduleList", JSON.stringify(this.scheduleListArr));

            this.addScheduleText = "";
            this.showScheduleAdd(false);
        },
        scheduleDelete(itemId) { 
            const deleteIndex =  this.scheduleListArr.findIndex((item) => item.id == itemId); 
            this.scheduleListArr.splice(deleteIndex, 1);
            localStorage.setItem("scheduleList", JSON.stringify(this.scheduleListArr));
        },
    },
}
</script>