import moment from 'moment';

export const todayMixin = {
    data() {
        return {
            year: null,
            month: null,
            getMoment: function() {},
        }
    },
    created() {
        this.year = moment().format("YYYY");
        this.month = moment().format("MM");
        this.getMoment = moment();
    },
    methods: {
        getCalendarDate(moveMonth) {
            let relativeDate = "";
            if (moveMonth === 0) {
                relativeDate = this.getMoment.calendar();
            } else {
                relativeDate = this.getMoment.add(moveMonth, "month").calendar();
            }

            console.log(relativeDate);

            const calcMonth = this.month + moveMonth - 1;
            const currMonthFirstDay = moment([this.year, calcMonth, 1]).day(); //이번달 첫 요일 (일요일 0)
            const currMonthLastDay = moment([this.year, 0, 31]).month(calcMonth).format("d"); //이번달 마지막 요일
            const currMonthLastDate = moment([this.year, 0, 31]).month(calcMonth).format("DD"); //이번달 마지막 날짜
            const lastMonthLastDate = moment([this.year, 0, 31]).month(calcMonth - 2).format("DD"); //지난달 마지막 날짜

            return {
                currMonthFirstDay,
                currMonthLastDay,
                currMonthLastDate,
                lastMonthLastDate
            }
        }
    },
}