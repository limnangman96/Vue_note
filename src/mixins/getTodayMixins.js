export const todayMixin = {
    mounted() {
        const moment = require('moment'); //moment 모듈불러오기
        const year = moment().format("YYYY");
        const month = moment().format("MM");
        const date = moment().format("DD");
        const dayArr = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
        const monthArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const today = new Date();
        const day = dayArr[today.getDay()]

        this.year = year;
        this.month = month;
        this.date = date;
        this.day = day;
        this.monthText = monthArr[month - 1]; //배열이라 index가 0부터
    }
}